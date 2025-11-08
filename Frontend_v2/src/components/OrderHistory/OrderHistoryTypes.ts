export type OrderStatus = "Mottatt" | "Underveis" | "Kansellert";

export type OrderHistoryTypes = {
  id: string;
  date: string;
  products: string[];
  supplier: string;
  status: OrderStatus;
};
