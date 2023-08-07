export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export interface C_customerReviews {
  customerName?: string;
  customerReview?: string;
}

export enum LinkType {
  OTHER = "Other",
  URL = "URL",
  PHONE = "Phone",
  EMAIL = "Email",
}

export interface CTA {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface C_promotion1 {
  promotionTitle?: string;
  description?: any;
  cTA?: CTA;
  image?: Image;
}

export interface C_promotion2 {
  promotionTitle?: string;
  description?: any;
  cTA?: CTA;
  image?: Image;
}

export interface C_storeCreditCard {
  name?: string;
  image?: Image;
  description?: string;
  url?: string;
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export interface C_trendingProducts {
  sectionHeader?: string;
  products?: EntityReference[];
}

export default interface Ce_intentPages {
  primaryPhoto?: ComplexImage;
  name: string;
  c_customerReviews?: C_customerReviews[];
  c_icon?: Image;
  c_promotion1?: C_promotion1;
  c_promotion2?: C_promotion2;
  c_storeCreditCard?: C_storeCreditCard;
  c_trendingProducts?: C_trendingProducts;
  photoGallery?: ComplexImage[];
  id: string;
}
