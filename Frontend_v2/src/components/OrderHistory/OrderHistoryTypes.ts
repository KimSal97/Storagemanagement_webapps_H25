export type OrderStatus = "pending" | "completed" | "cancelled";

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  orderedQty: number;
  unitCost: number;
};

export type OrderHistoryTypes = {
  id: string;
  createdAt: string;   
  totalCost: number;     
  status: OrderStatus;
  items: OrderItem[];     
};
