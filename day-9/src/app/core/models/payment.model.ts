export interface CheckoutSessionRequest {
  orderId: number;
  items: {
    product: {
      productId: number;
      productName: string;
    };
    quantity: number;
  }[];
}

export interface CheckoutSessionResponse {
  sessionId: string;
  sessionUrl: string;
  status: string;
  message: string;
}

export interface RetryPaymentResponse {
  sessionUrl: string;
}
