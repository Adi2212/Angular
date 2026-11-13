export interface CartItem {
  id: number;
  productId?: number;
  name: string;
  price: number;
  imgUrl: string;
  qty: number;
}

export interface CartSyncItem {
  id: number;
  qty: number;
}
