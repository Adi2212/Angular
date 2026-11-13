export interface AdminStats {
  farmers: number;
  buyers: number;
  products: number;
  orders: number;
  revenue: number;
}

export interface FarmerListItem {
  id: number;
  name: string;
  phone: string;
  productCount: number;
  accStatus: 'ACTIVE' | 'INACTIVE';
}

export interface BuyerListItem {
  id: number;
  name: string;
  email: string;
  orderCount: number;
  totalSpent: number;
  accStatus: 'ACTIVE' | 'INACTIVE';
}

export interface AdminProductItem {
  id: number;
  name: string;
  farmerName?: string;
  price: number;
  stock: number;
  offerTitle?: string;
  discountPercentage?: number;
  discountedPrice?: number;
  isApproved?: boolean;
}

export interface AdminOrderItem {
  id: number;
  buyerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface OrderStatusStat {
  date: string;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last?: boolean;
  pageable?: {
    pageNumber: number;
    pageSize: number;
  };
}
