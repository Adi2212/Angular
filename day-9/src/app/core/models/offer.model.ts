export interface OfferProductItem {
  id: number;
  name: string;
  farmerName?: string;
  price: number;
  stock: number;
  offerTitle?: string;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Offer {
  id: number;
  title: string;
  description?: string;
  discountPercentage: number;
  bannerUrl: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  productCount?: number;
  productIds?: number[];
  products?: OfferProductItem[];
}

export interface AdminOfferRequest {
  title: string;
  description?: string;
  discountPercentage: number;
  bannerUrl: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  productIds?: number[];
  categoryIds?: number[];
}
