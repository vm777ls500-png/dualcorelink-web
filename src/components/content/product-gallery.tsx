"use client";

import Image from "next/image";
import { useState } from "react";
import type {
  ProductGallery as ProductGalleryModel,
  ProductGalleryImageType,
} from "@/config/product-galleries";
import type { Locale } from "@/config/i18n";

type ProductGalleryProps = ProductGalleryModel & {
  productTitle: string;
  locale?: Locale;
};

type GalleryItem = Omit<ProductGalleryModel["gallery"][number], "type"> & {
  type: ProductGalleryImageType | "hero";
};

const imageTypeLabels: Record<GalleryItem["type"], string> = {
  hero: "Primary view",
  front: "Front view",
  side: "Side view",
  back: "Back view",
  detail: "Product detail",
  interface: "Interface detail",
  application: "Application view",
};

export function ProductGallery({
  featuredImage,
  gallery,
  productTitle,
  locale = "en",
}: ProductGalleryProps) {
  const images: GalleryItem[] = [
    { ...featuredImage, type: "hero" },
    ...gallery,
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const activeImage = images[activeIndex] ?? images[0];
  const activeImageFailed = failedImages.includes(activeImage.src);
  const isChinese = locale === "zh";
  const isArabic = locale === "ar";
  const isVietnamese = locale === "vi";

  function markImageFailed(src: string) {
    setFailedImages((current) =>
      current.includes(src) ? current : [...current, src],
    );
  }

  return (
    <div
      className="product-gallery"
      aria-label={isArabic ? `معرض صور ${productTitle}` : isChinese ? `${productTitle}产品图库` : isVietnamese ? `Thư viện ảnh ${productTitle}` : `${productTitle} image gallery`}
    >
      <div className="media-shell aspect-[4/3] shadow-[0_24px_60px_rgba(23,32,42,0.09)]">
        {activeImageFailed ? (
          <div className="relative z-10 grid h-full place-items-center p-6 text-center text-sm font-medium text-muted">
            {isArabic ? "الصورة غير متاحة" : isChinese ? "图片暂不可用" : isVietnamese ? "Hình ảnh không khả dụng" : "Image unavailable"}
          </div>
        ) : (
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            width={activeImage.width}
            height={activeImage.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            decoding="async"
            loading={activeIndex === 0 ? "eager" : "lazy"}
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
            className="relative z-10 h-full w-full object-contain p-6"
            onError={() => markImageFailed(activeImage.src)}
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase text-muted">
        <span>
          {isArabic
            ? activeImage.type === "hero"
              ? "الصورة الرئيسية"
              : `صورة المنتج ${activeIndex + 1}`
            : isChinese
            ? activeImage.type === "hero"
              ? "主图"
              : `产品图 ${activeIndex + 1}`
            : isVietnamese
            ? activeImage.type === "hero"
              ? "Ảnh chính"
              : `Ảnh sản phẩm ${activeIndex + 1}`
            : imageTypeLabels[activeImage.type]}
        </span>
        <span>
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 ? (
        <div
          className="product-gallery-thumbnails mt-3"
          role="group"
          aria-label={isArabic ? "اختر صورة المنتج" : isChinese ? "选择产品图片" : isVietnamese ? "Chọn ảnh sản phẩm" : "Choose a product image"}
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            const failed = failedImages.includes(image.thumbnailSrc);

            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                aria-label={isArabic ? `عرض ${image.alt}` : isChinese ? `查看${image.alt}` : isVietnamese ? `Xem ${image.alt}` : `View ${image.alt}`}
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className="product-gallery-thumbnail"
              >
                {failed ? (
                  <span className="grid h-full place-items-center px-1 text-[10px] font-semibold text-muted">
                    {isArabic ? "غير متاحة" : isChinese ? "不可用" : isVietnamese ? "Không khả dụng" : "Unavailable"}
                  </span>
                ) : (
                  <Image
                    src={image.thumbnailSrc}
                    alt=""
                    width={320}
                    height={320}
                    sizes="96px"
                    loading="lazy"
                    className="h-full w-full object-contain"
                    onError={() => markImageFailed(image.thumbnailSrc)}
                  />
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
