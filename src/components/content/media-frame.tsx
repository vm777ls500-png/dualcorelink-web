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
    <div className="media-shell aspect-[4/3] shadow-[0_24px_60px_rgba(23,32,42,0.09)]">
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
          className="relative z-10 h-full w-full object-contain p-6"
        />
      ) : (
        <div className="relative z-10 grid h-full place-items-center p-6 text-center text-sm font-medium text-muted">
          {label}
        </div>
      )}
    </div>
  );
}
