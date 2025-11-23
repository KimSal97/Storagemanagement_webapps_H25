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
  createdAt: string;     // backend ISO timestamp
  status: OrderStatus;
  totalCost: number;
  items: OrderItem[];
};
