export type OrderStatus = "Mottatt" | "Underveis" | "Kansellert";

export type OrderTypes = {
  id: string;
  date: string;
  products: string[];
  supplier: string;
  status: OrderStatus;
};
