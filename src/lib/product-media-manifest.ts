import {
  productGalleries,
  type ProductGalleryImageType,
  type ProductGalleryImageSource,
  type ProductGalleryMediaType,
  type ProductGalleryReviewStatus,
} from "../config/product-galleries";

export const productMediaTypes = [
  "hero",
  "front",
  "side",
  "rear",
  "detail",
  "interface",
  "mounting",
  "dimensions",
  "application",
  "packaging",
  "label",
  "accessory",
] as const;

export type ProductMediaType = (typeof productMediaTypes)[number];
export type ProductMediaSource = ProductGalleryImageSource;
export type ProductMediaReviewStatus = ProductGalleryReviewStatus;

export type ProductMediaEntry = {
  productSlug: string;
  src: string;
  thumbnailSrc: string;
  type: ProductMediaType;
  alt: string;
  order: number;
  width: number;
  height: number;
  bytes?: number;
  source: ProductMediaSource;
  reviewStatus: ProductMediaReviewStatus;
};

const galleryTypeToMediaType: Record<ProductGalleryImageType, ProductGalleryMediaType> = {
  front: "front",
  side: "side",
  back: "rear",
  detail: "detail",
  interface: "interface",
  application: "application",
};

export function createProductMediaManifest(): ProductMediaEntry[] {
  return Object.entries(productGalleries).flatMap(([productSlug, product]) => [
    {
      productSlug,
      ...product.featuredImage,
      type: "hero" as const,
      order: 0,
      source: product.featuredImage.source ?? "legacy",
      reviewStatus: product.featuredImage.reviewStatus ?? "confirmed",
    },
    ...product.gallery.map((image, index) => ({
      productSlug,
      ...image,
      type: image.mediaType ?? galleryTypeToMediaType[image.type],
      order: index + 1,
      source: image.source ?? "legacy",
      reviewStatus: image.reviewStatus ?? "confirmed",
    })),
  ]);
}

export const productMediaManifest = createProductMediaManifest();

export function getProductMedia(productSlug: string): ProductMediaEntry[] {
  return productMediaManifest.filter((entry) => entry.productSlug === productSlug);
}
