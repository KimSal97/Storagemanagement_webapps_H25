// src/features/reorder/reorderService.ts
import { ReorderRepository } from "./reorderRepository";

export class ReorderService {
  private repo = new ReorderRepository();

  async getSuggestions() {
    const LOOKBACK_DAYS = 30; 
    const items = await this.repo.getProductsWithSales(LOOKBACK_DAYS);

    return items
      .map((p) => {
        const stock = p.stock ?? 0;
        const minStock = p.minStock ?? 0;
        const maxStock = p.maxStock ?? 0;

        const suggestedQty =
          maxStock > 0 ? Math.max(0, maxStock - stock) : 0;

        let status: "critical" | "warning" | "ok" = "ok";

        if (stock <= minStock) {
          status = "critical";
        } else if (stock <= minStock + 3) {
          status = "warning";
        }

        return {
          productId: p.id,
          name: p.name,
          supplier: p.supplier,
          location: p.location,
          stock,
          minStock,
          maxStock,
          avgDailySales: p.totalSales / LOOKBACK_DAYS,
          suggestedQty,
          status,
        };
      })
      .filter((s) => s.status !== "ok" || s.suggestedQty > 0);
  }
}
