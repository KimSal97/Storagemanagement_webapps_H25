// src/components/OrderPage/OrderTypes.ts

export type OrderStatus = "good" | "warning" | "critical";

export type OrderProduct = {
  id: string;
  title: string;
  price: number;
  baseStock: number;
  minimumStock: number;
  dailySales: number;
  supplyTimeDays?: number;
  Status: OrderStatus;
  image?: string;
};
