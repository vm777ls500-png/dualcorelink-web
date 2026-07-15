#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "This release activator must run as root" >&2
  exit 1
fi

if [[ "$#" -ne 2 ]]; then
  echo "Usage: $0 <activate|rollback> <release-directory>" >&2
  exit 1
fi

action="$1"
requested_release="$2"
release_root="/srv/dualcorelink/frontend/releases"
current_link="/srv/dualcorelink/frontend/current"

case "$action" in
  activate|rollback) ;;
  *)
    echo "Unsupported release action" >&2
    exit 1
    ;;
esac

canonical_root="$(realpath "$release_root")"
canonical_release="$(realpath "$requested_release")"

if [[ "$(dirname "$canonical_release")" != "$canonical_root" ]]; then
  echo "Release must be a direct child of the approved release directory" >&2
  exit 1
fi

if [[ ! -d "$canonical_release" || ! -f "$canonical_release/index.html" || ! -f "$canonical_release/sitemap.xml" ]]; then
  echo "Release is missing required static export artifacts" >&2
  exit 1
fi

previous_release="$(readlink -f "$current_link" 2>/dev/null || true)"
temporary_link="${current_link}.activate.$$"
trap 'rm -f "$temporary_link"' EXIT

restore_previous() {
  if [[ -n "$previous_release" && -d "$previous_release" ]]; then
    ln -s "$previous_release" "$temporary_link"
    mv -Tf "$temporary_link" "$current_link"
    /usr/sbin/nginx -t >/dev/null
    /usr/bin/systemctl reload nginx
  fi
}

ln -s "$canonical_release" "$temporary_link"
mv -Tf "$temporary_link" "$current_link"

if ! /usr/sbin/nginx -t >/dev/null; then
  restore_previous
  echo "Nginx configuration validation failed; previous release restored" >&2
  exit 1
fi

if ! /usr/bin/systemctl reload nginx; then
  restore_previous
  echo "Nginx reload failed; previous release restored" >&2
  exit 1
fi

trap - EXIT
printf 'action=%s\n' "$action"
printf 'previous_release=%s\n' "$previous_release"
printf 'current_release=%s\n' "$(readlink -f "$current_link")"
