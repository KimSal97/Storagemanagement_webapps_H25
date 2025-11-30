export type ReorderStatus = "critical" | "warning";

export type ReorderSuggestion = {
  productId: string;
  name: string;
  stock: number;
  minStock: number;
  suggestedQty: number;
  supplier: string;
  location: string;
  status: ReorderStatus;
};
