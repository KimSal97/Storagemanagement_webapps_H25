// src/features/reorder/reorderService.ts
import { ReorderRepository } from "./reorderRepository";

export class ReorderService {
  private repo = new ReorderRepository();

  async getSuggestions() {
    const LOOKBACK_DAYS = 30;
    const LEAD_TIME_DAYS = 7;

    const items = await this.repo.getProductsWithSales(LOOKBACK_DAYS);

    return items
      .map((p) => {
        const stock = p.stock ?? 0;
        const minStock = p.minStock ?? 0;
        const maxStock = p.maxStock ?? 0;

        const avgDailySales =
          LOOKBACK_DAYS > 0 ? p.totalSales / LOOKBACK_DAYS : 0;

        const projectedNeed = Math.ceil(avgDailySales * LEAD_TIME_DAYS);

        const targetStock = maxStock > 0
          ? Math.min(maxStock, projectedNeed)
          : projectedNeed;

        const suggestedQty = Math.max(0, targetStock - stock);

        let status: "critical" | "warning" | "ok" = "ok";

        if (stock <= 0 || stock < minStock / 2) {
          status = "critical";
        } else if (stock < minStock) {
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
          avgDailySales,
          suggestedQty,
          status,
        };
      })
      .filter((s) => s.status !== "ok" || s.suggestedQty > 0);
  }
}
