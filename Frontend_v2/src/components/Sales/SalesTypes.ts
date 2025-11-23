export type Sale = {
  id: string;
  productId: string;
  quantity: number;
  soldAt: string;
};

export type SaleWithProduct = Sale & {
  productName: string;
};
