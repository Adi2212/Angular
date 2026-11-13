export interface Review {
  id: number;
  rating: number;
  comment: string;
  buyerName: string;
  createdAt: string;
}

export interface AddReviewRequest {
  rating: number;
  comment: string;
}
