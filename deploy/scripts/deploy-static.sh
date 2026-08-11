#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -eq 0 ]]; then
  echo "Refusing to deploy as root" >&2
  exit 1
fi

if [[ "$#" -lt 2 || "$#" -gt 3 ]]; then
  echo "Usage: $0 <out-directory> <source-sha> [external-health-url]" >&2
  exit 1
fi

source_dir="$(realpath "$1")"
source_sha="$2"
external_health_url="${3:-https://aws.dualcorelink.com/en/}"

release_root="${RELEASE_ROOT:-/srv/dualcorelink/frontend/releases}"
current_link="${CURRENT_LINK:-/srv/dualcorelink/frontend/current}"
release_activator="${RELEASE_ACTIVATOR:-/usr/local/sbin/dualcorelink-activate-release}"
local_health_host="${LOCAL_HEALTH_HOST:-aws.dualcorelink.com}"
local_health_url="${LOCAL_HEALTH_URL:-https://aws.dualcorelink.com/en/}"
expected_products="${EXPECTED_PRODUCTS:-36}"
expected_resources="${EXPECTED_RESOURCES:-15}"
expected_sitemap_urls="${EXPECTED_SITEMAP_URLS:-283}"
expected_ar_pages="${EXPECTED_AR_PAGES:-69}"
expected_zh_pages="${EXPECTED_ZH_PAGES:-69}"
expected_de_pages="${EXPECTED_DE_PAGES:-0}"
expected_es_pages="${EXPECTED_ES_PAGES:-0}"
expected_vi_pages="${EXPECTED_VI_PAGES:-69}"
expected_fa_pages="${EXPECTED_FA_PAGES:-0}"
expected_articles="${EXPECTED_ARTICLES:-15}"
expected_breadcrumbs="${EXPECTED_BREADCRUMBS:-15}"
expected_product_schemas="${EXPECTED_PRODUCT_SCHEMAS:-36}"

if [[ ! "$source_sha" =~ ^[0-9a-fA-F]{7,40}$ ]]; then
  echo "Source SHA is invalid" >&2
  exit 1
fi

if [[ ! -x "$release_activator" ]]; then
  echo "Release activator is unavailable: $release_activator" >&2
  exit 1
fi

case "$source_dir" in
  /|/srv|/srv/dualcorelink|"$release_root")
    echo "Refusing unsafe source directory: $source_dir" >&2
    exit 1
    ;;
esac

for required in index.html 404.html sitemap.xml en/products/index.html en/resources/index.html; do
  if [[ ! -f "$source_dir/$required" ]]; then
    echo "Missing export artifact: $required" >&2
    exit 1
  fi
done

validate_localized_paths() {
  local locale="$1"
  local expected_count="$2"
  local count=0
  local relative
  local localized_url
  if [[ ! -d "$source_dir/$locale" ]]; then
    if [[ "$expected_count" == "0" ]]; then
      return
    fi
    echo "Release gate failed: published locale is missing: $locale" >&2
    exit 1
  fi
  while IFS= read -r -d '' file; do
    relative="${file#"$source_dir/$locale/"}"
    relative="${relative%/index.html}"
    localized_url="https://dualcorelink.com/$locale/$relative/"
    if ! grep -F -q "<loc>$localized_url</loc>" "$source_dir/sitemap.xml"; then
      echo "Release gate failed: localized page is absent from sitemap: $locale/$relative" >&2
      exit 1
    fi
    count=$((count + 1))
  done < <(find "$source_dir/$locale" -name index.html -print0)
  if [[ "$count" != "$expected_count" ]]; then
    echo "Release gate failed: $locale pages=$count, expected $expected_count" >&2
    exit 1
  fi
}

validate_localized_paths ar "$expected_ar_pages"
validate_localized_paths zh "$expected_zh_pages"
validate_localized_paths de "$expected_de_pages"
validate_localized_paths es "$expected_es_pages"
validate_localized_paths vi "$expected_vi_pages"
validate_localized_paths fa "$expected_fa_pages"

count_detail_files_with() {
  local pattern="$1"
  local directory="$2"
  local count=0
  while IFS= read -r -d '' file; do
    if grep -I -q "$pattern" "$file"; then
      count=$((count + 1))
    fi
  done < <(find "$directory" -mindepth 2 -maxdepth 2 -name index.html -print0)
  printf '%s\n' "$count"
}

products="$(find "$source_dir/en/products" -mindepth 2 -maxdepth 2 -name index.html | wc -l | tr -d ' ')"
resources="$(find "$source_dir/en/resources" -mindepth 2 -maxdepth 2 -name index.html | wc -l | tr -d ' ')"
sitemap_urls="$(grep -o '<loc>' "$source_dir/sitemap.xml" | wc -l | tr -d ' ')"
articles="$(count_detail_files_with 'Article' "$source_dir/en/resources")"
breadcrumbs="$(count_detail_files_with 'BreadcrumbList' "$source_dir/en/resources")"
product_schemas="$(count_detail_files_with 'Product' "$source_dir/en/products")"

declare -A actual=(
  [products]="$products"
  [resources]="$resources"
  [sitemap_urls]="$sitemap_urls"
  [articles]="$articles"
  [breadcrumbs]="$breadcrumbs"
  [product_schemas]="$product_schemas"
)
declare -A expected=(
  [products]="$expected_products"
  [resources]="$expected_resources"
  [sitemap_urls]="$expected_sitemap_urls"
  [articles]="$expected_articles"
  [breadcrumbs]="$expected_breadcrumbs"
  [product_schemas]="$expected_product_schemas"
)

for gate in products resources sitemap_urls articles breadcrumbs product_schemas; do
  if [[ "${actual[$gate]}" != "${expected[$gate]}" ]]; then
    echo "Release gate failed: $gate=${actual[$gate]}, expected ${expected[$gate]}" >&2
    exit 1
  fi
done

if grep -R -I -E -q 'https?://(localhost|127\.0\.0\.1)|siteground|staging2\.cms|pages\.dev' "$source_dir"; then
  echo "Release gate failed: forbidden environment reference found" >&2
  exit 1
fi

if [[ "${VALIDATE_ONLY:-0}" == "1" ]]; then
  echo "Static export validation passed"
  printf '%s=%s\n' \
    products "$products" \
    resources "$resources" \
    sitemap_urls "$sitemap_urls" \
    articles "$articles" \
    breadcrumbs "$breadcrumbs" \
    product_schemas "$product_schemas"
  exit 0
fi

mkdir -p "$release_root"
exec 9>"$release_root/.deploy.lock"
if ! flock -n 9; then
  echo "Another deployment is already running" >&2
  exit 1
fi

short_sha="${source_sha:0:12}"
timestamp="$(date +%Y%m%d-%H%M%S)"
release_dir="$release_root/${short_sha}-${timestamp}"
temporary_release="$release_root/.${short_sha}-${timestamp}.tmp.$$"
previous_release="$(readlink -f "$current_link" 2>/dev/null || true)"
switched=0

rollback() {
  local exit_code=$?
  if [[ "$switched" -eq 1 && -n "$previous_release" && -d "$previous_release" ]]; then
    echo "Deployment failed; restoring $previous_release" >&2
    sudo -n "$release_activator" rollback "$previous_release"
  fi
  exit "$exit_code"
}
trap rollback ERR

mkdir "$temporary_release"
rsync -a --delete "$source_dir/" "$temporary_release/"
find "$temporary_release" -type d -exec chmod 2755 {} +
find "$temporary_release" -type f -exec chmod 0644 {} +
mv "$temporary_release" "$release_dir"

sudo -n "$release_activator" activate "$release_dir"
switched=1

health_check() {
  local description="$1"
  shift
  for attempt in {1..10}; do
    if curl --fail --silent --show-error --max-time 15 "$@" >/dev/null; then
      echo "$description passed on attempt $attempt"
      return 0
    fi
    sleep 2
  done
  echo "$description failed" >&2
  return 1
}

health_check "Local HTTPS health check" \
  --resolve "${local_health_host}:443:127.0.0.1" "$local_health_url"
health_check "External HTTPS health check" "$external_health_url"

trap - ERR
switched=0

echo "source_sha=$source_sha"
echo "previous_release=$previous_release"
echo "release_path=$release_dir"
echo "current_release=$(readlink -f "$current_link")"
echo "release_count=$(find "$release_root" -mindepth 1 -maxdepth 1 -type d ! -name '.*' | wc -l | tr -d ' ')"

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "release_path=$release_dir" >> "$GITHUB_OUTPUT"
fi
