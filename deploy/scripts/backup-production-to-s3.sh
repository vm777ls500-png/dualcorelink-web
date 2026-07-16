#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "This backup must run as root" >&2
  exit 1
fi

umask 077

readonly BUCKET="${BACKUP_BUCKET:-dualcorelink-production-backups-sg-f3a03bde}"
readonly REGION="${AWS_REGION:-ap-southeast-1}"
readonly WP_ROOT="${WP_ROOT:-/srv/dualcorelink/wordpress/current}"
readonly FRONTEND_ROOT="${FRONTEND_ROOT:-/srv/dualcorelink/frontend}"
readonly STAGING_ROOT="${BACKUP_STAGING_ROOT:-/srv/dualcorelink/backups/offsite-staging}"
readonly AWS_BIN="${AWS_BIN:-/usr/local/bin/aws}"
readonly AWS_SHARED_CREDENTIALS_FILE="${AWS_SHARED_CREDENTIALS_FILE:-/etc/dualcorelink-backup/credentials}"
readonly AWS_CONFIG_FILE="${AWS_CONFIG_FILE:-/etc/dualcorelink-backup/config}"
readonly TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
readonly DAILY_PREFIX="production/daily/${TIMESTAMP}"
readonly MONTHLY_PREFIX="production/monthly/$(date -u +%Y-%m)"
readonly RUN_DIR="${STAGING_ROOT}/${TIMESTAMP}"
readonly LOCK_FILE="${STAGING_ROOT}/.backup.lock"

export AWS_SHARED_CREDENTIALS_FILE AWS_CONFIG_FILE AWS_REGION="$REGION"

for required in "$AWS_BIN" /usr/local/bin/wp /usr/bin/tar /usr/bin/sha256sum /usr/bin/flock; do
  if [[ ! -x "$required" ]]; then
    echo "Required executable is unavailable: $required" >&2
    exit 1
  fi
done

for required in "$WP_ROOT" "$WP_ROOT/wp-content/uploads" "$FRONTEND_ROOT/current" \
  "$AWS_SHARED_CREDENTIALS_FILE" "$AWS_CONFIG_FILE"; do
  if [[ ! -e "$required" ]]; then
    echo "Required backup source is unavailable: $required" >&2
    exit 1
  fi
done

install -d -o root -g root -m 0700 "$STAGING_ROOT"
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Another offsite backup is already running" >&2
  exit 1
fi

if [[ -e "$RUN_DIR" ]]; then
  echo "Backup staging directory already exists: $RUN_DIR" >&2
  exit 1
fi
install -d -o root -g root -m 0700 "$RUN_DIR"

cleanup() {
  local exit_code=$?
  if [[ "$exit_code" -eq 0 ]]; then
    rm -rf -- "$RUN_DIR"
  else
    echo "Backup failed; staging evidence retained at $RUN_DIR" >&2
  fi
  exit "$exit_code"
}
trap cleanup EXIT

wp() {
  /usr/local/bin/wp --allow-root --path="$WP_ROOT" "$@"
}

echo "Creating production database export"
wp db export "$RUN_DIR/wordpress-database.sql" \
  --single-transaction \
  --quick \
  --skip-lock-tables \
  --add-drop-table

if [[ ! -s "$RUN_DIR/wordpress-database.sql" ]]; then
  echo "Database export is empty" >&2
  exit 1
fi
if ! grep -q 'CREATE TABLE.*wp_' "$RUN_DIR/wordpress-database.sql"; then
  echo "Database export does not contain active wp_ tables" >&2
  exit 1
fi

echo "Archiving WordPress uploads"
tar \
  --exclude='uploads/.htaccess' \
  --exclude='*.php' \
  -C "$WP_ROOT/wp-content" \
  -czf "$RUN_DIR/wordpress-uploads.tar.gz" \
  uploads
tar -tzf "$RUN_DIR/wordpress-uploads.tar.gz" >/dev/null

echo "Archiving Nginx configuration"
nginx_sources=(nginx/nginx.conf nginx/conf.d nginx/sites-available nginx/sites-enabled nginx/snippets)
existing_nginx_sources=()
for source in "${nginx_sources[@]}"; do
  [[ -e "/etc/$source" ]] && existing_nginx_sources+=("$source")
done
tar -C /etc -czf "$RUN_DIR/nginx-config.tar.gz" "${existing_nginx_sources[@]}"
tar -tzf "$RUN_DIR/nginx-config.tar.gz" >/dev/null

echo "Writing WordPress and application state"
{
  printf 'captured_at_utc=%s\n' "$TIMESTAMP"
  printf 'home=%s\n' "$(wp option get home)"
  printf 'siteurl=%s\n' "$(wp option get siteurl)"
  printf 'core_version=%s\n' "$(wp core version)"
  printf 'table_prefix=%s\n' "$(wp db prefix)"
  printf 'products=%s\n' "$(wp post list --post_type=product --post_status=publish --format=count)"
  printf 'solutions=%s\n' "$(wp post list --post_type=solution --post_status=publish --format=count)"
  printf 'media=%s\n' "$(wp post list --post_type=attachment --post_status=inherit --format=count)"
  printf 'product_categories=%s\n' "$(wp term list product_category --format=count)"
  printf 'wp_config_mode=%s\n' "$(stat -c '%a' "$WP_ROOT/wp-config.php")"
  printf 'wp_config_sha256=%s\n' "$(sha256sum "$WP_ROOT/wp-config.php" | awk '{print $1}')"
  for constant in FORCE_SSL_ADMIN WP_DEBUG WP_DEBUG_DISPLAY DISALLOW_FILE_EDIT; do
    value="$(wp config get "$constant" 2>/dev/null || true)"
    printf '%s=%s\n' "$constant" "$value"
  done
} >"$RUN_DIR/wordpress-state.txt"

wp plugin list --fields=name,status,version,update --format=json >"$RUN_DIR/wordpress-plugins.json"
wp theme list --fields=name,status,version,update --format=json >"$RUN_DIR/wordpress-themes.json"

echo "Writing deployment and runner state"
{
  printf 'captured_at_utc=%s\n' "$TIMESTAMP"
  printf 'current_release=%s\n' "$(readlink -f "$FRONTEND_ROOT/current")"
  printf 'release_count=%s\n' "$(find "$FRONTEND_ROOT/releases" -mindepth 1 -maxdepth 1 -type d ! -name '.*' | wc -l | tr -d ' ')"
  find "$FRONTEND_ROOT/releases" -mindepth 1 -maxdepth 1 -type d ! -name '.*' -printf 'release=%TY-%Tm-%TdT%TH:%TM:%TS %p\n' | sort
  runner_service="$(systemctl list-unit-files 'actions.runner.*' --no-legend | awk 'NR == 1 { print $1 }')"
  printf 'runner_service=%s\n' "$runner_service"
  printf 'runner_enabled=%s\n' "$(systemctl is-enabled "$runner_service" 2>/dev/null || true)"
  printf 'runner_active=%s\n' "$(systemctl is-active "$runner_service" 2>/dev/null || true)"
  printf 'nginx_active=%s\n' "$(systemctl is-active nginx)"
  printf 'mariadb_active=%s\n' "$(systemctl is-active mariadb)"
  printf 'php_fpm_active=%s\n' "$(systemctl is-active php8.3-fpm)"
  printf 'certbot_timer_active=%s\n' "$(systemctl is-active certbot.timer)"
  printf 'failed_services=%s\n' "$(systemctl --failed --no-legend | wc -l | tr -d ' ')"
  printf 'activation_wrapper_sha256=%s\n' "$(sha256sum /usr/local/sbin/dualcorelink-activate-release | awk '{print $1}')"
  printf 'activation_wrapper_mode=%s\n' "$(stat -c '%U:%G %a' /usr/local/sbin/dualcorelink-activate-release)"
} >"$RUN_DIR/deployment-state.txt"

{
  printf 'hostname=%s\n' "$(hostname)"
  printf 'kernel=%s\n' "$(uname -r)"
  printf 'os='; . /etc/os-release; printf '%s %s\n' "$NAME" "$VERSION_ID"
  printf 'nginx='; nginx -v 2>&1
  printf 'php='; php -r 'echo PHP_VERSION, PHP_EOL;'
  printf 'mariadb='; mariadb --version
  printf 'aws_cli='; "$AWS_BIN" --version 2>&1
  printf 'disk='; df -P / | tail -1
  printf 'memory='; free -b | awk '/^Mem:/ { print $2, $3, $7 }'
} >"$RUN_DIR/environment.txt"

cat >"$RUN_DIR/manifest.md" <<EOF
# DualCoreLink production offsite backup

- Captured at (UTC): $TIMESTAMP
- Source host: $(hostname)
- WordPress root: $WP_ROOT
- Frontend current release: $(readlink -f "$FRONTEND_ROOT/current")
- Database export: wordpress-database.sql
- Uploads archive: wordpress-uploads.tar.gz
- Nginx configuration: nginx-config.tar.gz
- WordPress configuration: sanitized state and plugin/theme inventories
- Runner and release configuration: deployment-state.txt
- Secrets included: no AWS credentials, SSH keys, certificate private keys, database passwords, WordPress salts, or runner tokens
EOF

(
  cd "$RUN_DIR"
  find . -maxdepth 1 -type f ! -name SHA256SUMS -printf '%P\0' \
    | sort -z \
    | xargs -0 sha256sum >SHA256SUMS
  sha256sum -c SHA256SUMS
)

upload_prefix() {
  local prefix="$1"
  local file name sha remote_sha
  while IFS= read -r -d '' file; do
    name="$(basename "$file")"
    sha="$(sha256sum "$file" | awk '{print $1}')"
    "$AWS_BIN" s3 cp "$file" "s3://${BUCKET}/${prefix}/${name}" \
      --region "$REGION" \
      --sse AES256 \
      --metadata "sha256=${sha}" \
      --only-show-errors \
      --no-progress
    remote_sha="$("$AWS_BIN" s3api head-object \
      --bucket "$BUCKET" \
      --key "${prefix}/${name}" \
      --region "$REGION" \
      --query 'Metadata.sha256' \
      --output text)"
    if [[ "$remote_sha" != "$sha" ]]; then
      echo "Remote checksum metadata mismatch: $name" >&2
      exit 1
    fi
    printf 'verified s3://%s/%s/%s\n' "$BUCKET" "$prefix" "$name"
  done < <(find "$RUN_DIR" -maxdepth 1 -type f -print0 | sort -z)
}

echo "Uploading daily backup"
upload_prefix "$DAILY_PREFIX"

if [[ "$(date -u +%d)" == "01" ]]; then
  echo "Uploading monthly retention copy"
  upload_prefix "$MONTHLY_PREFIX"
fi

echo "Backup completed: s3://${BUCKET}/${DAILY_PREFIX}/"
