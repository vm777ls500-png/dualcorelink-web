#!/usr/bin/env bash
set -euo pipefail

readonly site_name="dualcorelink.com"
readonly live_site="/etc/nginx/sites-available/${site_name}"
readonly enabled_site="/etc/nginx/sites-enabled/${site_name}"
readonly release_root="/srv/dualcorelink/frontend/releases"
readonly current_link="/srv/dualcorelink/frontend/current"
readonly nginx_bin="/usr/sbin/nginx"
readonly systemctl_bin="/usr/bin/systemctl"
readonly git_bin="/usr/bin/git"
readonly curl_bin="/usr/bin/curl"

fail() {
  echo "Nginx site activation failed: $*" >&2
  exit 1
}

if [[ "${EUID}" -ne 0 ]]; then
  fail "this helper must run as root"
fi

if [[ "$#" -ne 2 ]]; then
  fail "usage: $0 <repository-root> <source-sha>"
fi

repository_root="$(/usr/bin/realpath "$1")"
source_sha="${2,,}"

if [[ ! "$source_sha" =~ ^[0-9a-f]{40}$ ]]; then
  fail "source SHA must be a full 40-character commit SHA"
fi

checked_out_sha="$("$git_bin" -C "$repository_root" rev-parse --verify HEAD)"
if [[ "${checked_out_sha,,}" != "$source_sha" ]]; then
  fail "repository HEAD does not match the requested source SHA"
fi

relative_candidate="deploy/nginx/dualcorelink.com.conf.template"
expected_candidate="${repository_root}/${relative_candidate}"
candidate="$(/usr/bin/realpath "$expected_candidate")"

if [[ "$candidate" != "$expected_candidate" || ! -f "$candidate" || -L "$candidate" ]]; then
  fail "candidate must be the regular repository DualCoreLink site template"
fi

if ! "$git_bin" -C "$repository_root" diff --quiet "$source_sha" -- "$relative_candidate"; then
  fail "candidate differs from the committed source SHA"
fi

current_release="$(/usr/bin/readlink -f "$current_link")"
canonical_release_root="$(/usr/bin/realpath "$release_root")"
if [[ ! -d "$current_release" || "$(dirname "$current_release")" != "$canonical_release_root" ]]; then
  fail "current static release is outside the approved release root"
fi

for target in \
  "en/solutions/oem-odm-custom-panel-solution/index.html" \
  "en/resources/hotel-rcu-wiring-system-architecture-guide/index.html"; do
  if [[ ! -f "${current_release}/${target}" ]]; then
    fail "redirect target artifact is missing: ${target}"
  fi
done

if [[ ! -f "$live_site" || -L "$live_site" ]]; then
  fail "live site configuration must be a regular file: ${live_site}"
fi

if [[ ! -L "$enabled_site" ]]; then
  fail "enabled site must be a symbolic link: ${enabled_site}"
fi

resolved_live_site="$(/usr/bin/realpath "$live_site")"
resolved_enabled_site="$(/usr/bin/readlink -f "$enabled_site")"
if [[ "$resolved_enabled_site" != "$resolved_live_site" ]]; then
  fail "enabled site does not resolve to the approved live site configuration"
fi

candidate_hash="$(/usr/bin/sha256sum "$candidate" | /usr/bin/awk '{print $1}')"
live_hash="$(/usr/bin/sha256sum "$live_site" | /usr/bin/awk '{print $1}')"

if [[ "$candidate_hash" == "$live_hash" ]]; then
  echo "nginx_config_changed=no"
  echo "nginx_config_sha256=${live_hash}"
  echo "nginx_config_path=${live_site}"
  exit 0
fi

timestamp="$(/usr/bin/date -u +%Y%m%d-%H%M%S)"
backup="${live_site}.backup-${source_sha:0:12}-${timestamp}"
candidate_temp="$(/usr/bin/mktemp "${live_site}.candidate.XXXXXX")"
restore_temp=""

cleanup() {
  [[ -z "$candidate_temp" ]] || /usr/bin/rm -f -- "$candidate_temp"
  [[ -z "$restore_temp" ]] || /usr/bin/rm -f -- "$restore_temp"
}
trap cleanup EXIT

/usr/bin/cp -a -- "$live_site" "$backup"
/usr/bin/install -o root -g root -m 0644 -- "$candidate" "$candidate_temp"
/usr/bin/mv -fT -- "$candidate_temp" "$live_site"
candidate_temp=""

restore_previous() {
  local reason="$1"
  local validation_status=0
  local reload_status=0

  echo "Nginx activation error: ${reason}; restoring ${backup}" >&2
  restore_temp="$(/usr/bin/mktemp "${live_site}.restore.XXXXXX")"
  /usr/bin/install -o root -g root -m 0644 -- "$backup" "$restore_temp"
  /usr/bin/mv -fT -- "$restore_temp" "$live_site"
  restore_temp=""

  "$nginx_bin" -t >/dev/null || validation_status=$?
  if [[ "$validation_status" -eq 0 ]]; then
    "$systemctl_bin" reload nginx || reload_status=$?
  fi

  if [[ "$validation_status" -ne 0 || "$reload_status" -ne 0 ]]; then
    echo "CRITICAL: previous Nginx configuration was restored on disk but could not be validated and reloaded" >&2
  else
    echo "Previous Nginx configuration restored and reloaded" >&2
  fi
  exit 1
}

verify_local_redirect() {
  local source_path="$1"
  local target_url="$2"
  local source_url="https://dualcorelink.com${source_path}"
  local headers
  local status
  local location
  local final_result

  headers="$("$curl_bin" --silent --show-error --dump-header - --output /dev/null \
    --max-redirs 0 --resolve dualcorelink.com:443:127.0.0.1 "$source_url")"
  status="$(/usr/bin/awk '/^HTTP\// { code=$2 } END { print code }' <<< "$headers")"
  location="$(/usr/bin/awk 'BEGIN { IGNORECASE=1 } /^Location:/ { sub(/\r$/, ""); print substr($0, 11) }' <<< "$headers" | /usr/bin/tail -n 1)"

  if [[ "$status" != "301" || "$location" != "$target_url" ]]; then
    return 1
  fi

  final_result="$("$curl_bin" --silent --show-error --output /dev/null \
    --write-out '%{http_code} %{url_effective} %{num_redirects}' \
    --location --max-redirs 1 --resolve dualcorelink.com:443:127.0.0.1 \
    "$source_url")"
  [[ "$final_result" == "200 ${target_url} 1" ]]
}

if ! "$nginx_bin" -t >/dev/null; then
  restore_previous "nginx -t rejected the candidate configuration"
fi

if ! "$systemctl_bin" reload nginx; then
  restore_previous "Nginx reload failed"
fi

if ! verify_local_redirect \
  "/solutions/oem-odm-custom-panel-solution/" \
  "https://dualcorelink.com/en/solutions/oem-odm-custom-panel-solution/"; then
  restore_previous "local verification rejected the OEM/ODM solution redirect"
fi

if ! verify_local_redirect \
  "/resources/hotel-rcu-wiring-system-architecture-guide/" \
  "https://dualcorelink.com/en/resources/hotel-rcu-wiring-system-architecture-guide/"; then
  restore_previous "local verification rejected the RCU wiring resource redirect"
fi

active_hash="$(/usr/bin/sha256sum "$live_site" | /usr/bin/awk '{print $1}')"
if [[ "$active_hash" != "$candidate_hash" ]]; then
  restore_previous "active site hash does not match the committed candidate"
fi

echo "nginx_config_changed=yes"
echo "nginx_config_sha256=${active_hash}"
echo "nginx_config_backup=${backup}"
echo "nginx_config_path=${live_site}"
