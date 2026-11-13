import { Address } from './user.model';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';
export type PaymentMethod = 'STRIPE' | 'COD';

export interface OrderItemProductRef {
  productId: number;
  productName: string;
  imgUrl?: string;
}

export interface OrderItem {
  id?: number;
  product: OrderItemProductRef;
  quantity: number;
  price: number;
  lineTotal: number;
  pickUpAddress?: Address;
}

export interface OrderHistoryItem {
  id: number;
  status: OrderStatus;
  changedAt: string;
  createdAt?: string;
}

export interface Order {
  orderId: number;
  id?: number; // alias in some responses
  buyerName?: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  status?: OrderStatus; // alias
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  deliveryAddress: Address;
  items: OrderItem[];
  createdAt: string;
  updatedAt?: string;
  history?: OrderHistoryItem[];
}

export interface CreateOrderItemRequest {
  product: {
    productId: number;
    productName: string;
  };
  quantity: number;
}

export interface CreateOrderRequest {
  paymentMethod: PaymentMethod;
  items: CreateOrderItemRequest[];
}
