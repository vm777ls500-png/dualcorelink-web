const LOCAL_WORDPRESS_UPLOADS =
  /^http:\/\/(?:127\.0\.0\.1|localhost):8080\/wp-content\/uploads\/(.+)$/;

export function toStaticMediaUrl(sourceUrl?: string | null) {
  if (!sourceUrl) return sourceUrl ?? "";
  if (sourceUrl.startsWith("/media/wordpress/")) return sourceUrl;

  const match = sourceUrl.match(LOCAL_WORDPRESS_UPLOADS);

  if (!match) return sourceUrl;

  return `/media/wordpress/${match[1]}`;
}
