import Image from "next/image";

type MediaFrameProps = {
  src?: string;
  alt: string;
  label?: string;
};

export function MediaFrame({
  src,
  alt,
  label = "Media preview unavailable",
}: MediaFrameProps) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6"
        />
      ) : (
        <div className="grid h-full place-items-center p-6 text-center text-sm font-medium text-muted">
          {label}
        </div>
      )}
    </div>
  );
}
