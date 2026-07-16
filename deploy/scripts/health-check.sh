#!/usr/bin/env bash
set -uo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "FAIL timestamp=$(date --iso-8601=seconds) check=execution detail=root-required"
  exit 2
fi

umask 077

readonly PUBLIC_IP="${PUBLIC_IP:-52.74.68.63}"
readonly FRONTEND_CURRENT="${FRONTEND_CURRENT:-/srv/dualcorelink/frontend/current}"
readonly BUCKET="${BACKUP_BUCKET:-dualcorelink-production-backups-sg-f3a03bde}"
readonly AWS_BIN="${AWS_BIN:-/usr/local/bin/aws}"
readonly AWS_SHARED_CREDENTIALS_FILE="${AWS_SHARED_CREDENTIALS_FILE:-/etc/dualcorelink-backup/credentials}"
readonly AWS_CONFIG_FILE="${AWS_CONFIG_FILE:-/etc/dualcorelink-backup/config}"
readonly DISK_WARN_PERCENT="${DISK_WARN_PERCENT:-80}"
readonly DISK_FAIL_PERCENT="${DISK_FAIL_PERCENT:-90}"
readonly MEMORY_WARN_MIB="${MEMORY_WARN_MIB:-512}"
readonly MEMORY_FAIL_MIB="${MEMORY_FAIL_MIB:-256}"
readonly BACKUP_WARN_HOURS="${BACKUP_WARN_HOURS:-36}"
readonly BACKUP_FAIL_HOURS="${BACKUP_FAIL_HOURS:-60}"

export AWS_SHARED_CREDENTIALS_FILE AWS_CONFIG_FILE AWS_REGION="ap-southeast-1"

warn_count=0
fail_count=0

emit() {
  local level="$1"
  local check="$2"
  local detail="$3"
  printf '%s timestamp=%s check=%s detail=%s\n' \
    "$level" "$(date --iso-8601=seconds)" "$check" "$detail"
  case "$level" in
    WARN) warn_count=$((warn_count + 1)) ;;
    FAIL) fail_count=$((fail_count + 1)) ;;
  esac
}

check_active() {
  local unit="$1"
  if systemctl is-active --quiet "$unit"; then
    emit OK "service-${unit}" active
  else
    emit FAIL "service-${unit}" inactive
  fi
}

for unit in nginx mariadb php8.3-fpm fail2ban certbot.timer; do
  check_active "$unit"
done

runner_unit="$(systemctl list-unit-files 'actions.runner.*.service' --no-legend \
  | awk 'NR == 1 { print $1 }')"
if [[ -z "$runner_unit" ]]; then
  emit FAIL github-runner service-not-found
elif systemctl is-active --quiet "$runner_unit" \
  && systemctl is-enabled --quiet "$runner_unit"; then
  emit OK github-runner "active-enabled:${runner_unit}"
else
  emit FAIL github-runner "inactive-or-disabled:${runner_unit}"
fi

disk_percent="$(df -P / | awk 'NR == 2 { gsub(/%/, "", $5); print $5 }')"
if (( disk_percent >= DISK_FAIL_PERCENT )); then
  emit FAIL disk-root "used=${disk_percent}%"
elif (( disk_percent >= DISK_WARN_PERCENT )); then
  emit WARN disk-root "used=${disk_percent}%"
else
  emit OK disk-root "used=${disk_percent}%"
fi

memory_available_mib="$(awk '/^MemAvailable:/ { printf "%d", $2 / 1024 }' /proc/meminfo)"
if (( memory_available_mib < MEMORY_FAIL_MIB )); then
  emit FAIL memory "available=${memory_available_mib}MiB"
elif (( memory_available_mib < MEMORY_WARN_MIB )); then
  emit WARN memory "available=${memory_available_mib}MiB"
else
  emit OK memory "available=${memory_available_mib}MiB"
fi

read -r swap_total_mib swap_used_mib < <(
  free -m | awk '/^Swap:/ { print $2, $3 }'
)
if (( swap_total_mib == 0 )); then
  emit WARN swap not-configured
else
  emit OK swap "used=${swap_used_mib}MiB,total=${swap_total_mib}MiB"
fi

mapfile -t mariadb_listeners < <(
  ss -ltnH | awk '$4 ~ /:3306$/ { print $4 }'
)
if [[ "${#mariadb_listeners[@]}" -eq 1 \
  && "${mariadb_listeners[0]}" == "127.0.0.1:3306" ]]; then
  emit OK mariadb-listener 127.0.0.1:3306
else
  listener_detail="$(IFS=,; echo "${mariadb_listeners[*]:-none}")"
  emit FAIL mariadb-listener "$listener_detail"
fi

if timeout 5 bash -c "exec 3<>/dev/tcp/${PUBLIC_IP}/3306" 2>/dev/null; then
  emit FAIL public-3306 reachable
else
  emit OK public-3306 closed
fi

current_release="$(readlink -f "$FRONTEND_CURRENT" 2>/dev/null || true)"
case "$current_release" in
  /srv/dualcorelink/frontend/releases/*)
    if [[ -d "$current_release" ]]; then
      emit OK frontend-current "$current_release"
    else
      emit FAIL frontend-current target-missing
    fi
    ;;
  *) emit FAIL frontend-current invalid-target ;;
esac

for cert_name in dualcorelink.com cms.dualcorelink.com; do
  cert_path="/etc/letsencrypt/live/${cert_name}/fullchain.pem"
  if [[ ! -r "$cert_path" ]]; then
    emit FAIL "certificate-${cert_name}" missing
  elif openssl x509 -checkend 2592000 -noout -in "$cert_path" >/dev/null; then
    expiry="$(openssl x509 -enddate -noout -in "$cert_path" | cut -d= -f2-)"
    emit OK "certificate-${cert_name}" "expires=${expiry// /_}"
  else
    expiry="$(openssl x509 -enddate -noout -in "$cert_path" | cut -d= -f2-)"
    emit WARN "certificate-${cert_name}" "under-30-days:${expiry// /_}"
  fi
done

if [[ ! -x "$AWS_BIN" || ! -r "$AWS_SHARED_CREDENTIALS_FILE" ]]; then
  emit FAIL s3-backup aws-cli-or-credentials-unavailable
else
  latest_record="$($AWS_BIN s3api list-objects-v2 \
    --bucket "$BUCKET" \
    --prefix production/daily/ \
    --query 'sort_by(Contents,&LastModified)[-1].[Key,LastModified]' \
    --output text 2>/dev/null || true)"
  read -r latest_key latest_modified <<<"$latest_record"
  if [[ -z "${latest_key:-}" || "$latest_key" == "None" \
    || -z "${latest_modified:-}" || "$latest_modified" == "None" ]]; then
    emit FAIL s3-backup no-daily-restore-point
  else
    backup_prefix="${latest_key%/*}"
    backup_epoch="$(date -d "$latest_modified" +%s 2>/dev/null || echo 0)"
    now_epoch="$(date +%s)"
    backup_age_hours=$(( (now_epoch - backup_epoch) / 3600 ))
    if (( backup_epoch == 0 || backup_age_hours >= BACKUP_FAIL_HOURS )); then
      emit FAIL s3-backup-age "hours=${backup_age_hours},prefix=${backup_prefix}"
    elif (( backup_age_hours >= BACKUP_WARN_HOURS )); then
      emit WARN s3-backup-age "hours=${backup_age_hours},prefix=${backup_prefix}"
    else
      emit OK s3-backup-age "hours=${backup_age_hours},prefix=${backup_prefix}"
    fi

    for object_name in wordpress-database.sql wordpress-uploads.tar.gz nginx-config.tar.gz; do
      object_key="${backup_prefix}/${object_name}"
      remote_sha="$($AWS_BIN s3api head-object \
        --bucket "$BUCKET" \
        --key "$object_key" \
        --query 'Metadata.sha256' \
        --output text 2>/dev/null || true)"
      if [[ -n "$remote_sha" && "$remote_sha" != "None" ]]; then
        emit OK "s3-object-${object_name}" sha256-metadata-present
      else
        emit FAIL "s3-object-${object_name}" missing-or-unverified
      fi
    done
  fi
fi

if (( fail_count > 0 )); then
  emit FAIL summary "failures=${fail_count},warnings=${warn_count}"
  exit 2
fi

if (( warn_count > 0 )); then
  emit WARN summary "failures=0,warnings=${warn_count}"
else
  emit OK summary failures=0,warnings=0
fi
