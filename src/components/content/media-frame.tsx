import Image from "next/image";

type MediaFrameProps = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  label?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export function MediaFrame({
  src,
  alt,
  width = 1200,
  height = 900,
  label = "Media preview unavailable",
  loading = "lazy",
  fetchPriority = "auto",
}: MediaFrameProps) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 50vw, 100vw"
          decoding="async"
          loading={loading}
          fetchPriority={fetchPriority}
          className="h-full w-full object-contain p-6"
        />
      ) : (
        <div className="grid h-full place-items-center p-6 text-center text-sm font-medium text-muted">
          {label}
        </div>
      )}
    </div>
  );
}
