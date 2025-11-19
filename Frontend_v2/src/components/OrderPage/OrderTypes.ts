// src/components/OrderPage/OrderTypes.ts

export type OrderStatus = "good" | "warning" | "critical";

export type OrderProduct = {
  title: string;
  price: number;
  baseStock: number;
  minimumStock: number;
  dailySales: number;
  supplyTimeDays?: number;
  Status: OrderStatus;
  image?: string;
};

export type ProductCardSliderProps = {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};
