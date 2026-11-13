export interface ProductCategoryRef {
  id: number;
  name: string;
}

export interface ProductOfferRef {
  id: number;
  title: string;
  description?: string;
  discountPercentage: number;
  bannerUrl?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: ProductCategoryRef;
  parentCategory?: ProductCategoryRef | null;
  imgUrl: string;
  offer?: ProductOfferRef | null;
  discountedPrice?: number;
  farmerName?: string;
  farmerId?: number;
  isApproved?: boolean;
}

export interface AddProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imgUrl: string;
  stockQuantity: number;
}

export interface FarmerStats {
  totalProducts: number;
  pendingOrders: number;
  completedOrders: number;
}
