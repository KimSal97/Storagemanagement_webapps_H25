export type OrderItem = {
  name: string;
  quantity: number;
};

export type OrderStatus = "Behandlet" | "Sendt" | "Fullført" | "Kansellert";

export type OrderHistoryTypes = {
  id: string;
  date: string;
  supplier: string;
  total: number;
  status: OrderStatus;
  items?: OrderItem[]; // 👈 lagt til
};
