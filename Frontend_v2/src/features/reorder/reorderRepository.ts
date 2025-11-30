// src/features/reorder/reorderRepository.ts
import { db } from "@/db";
import { products } from "@/db/schema/products-schema";
import { sales } from "@/db/schema/sales-schema";
import { and, eq, gte, sql } from "drizzle-orm";

export class ReorderRepository {
  async getProductsWithSales(lookbackDays: number) {
    const since = new Date();
    since.setDate(since.getDate() - lookbackDays);

    const sinceISO = since.toISOString();

    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        stock: products.stock,
        minStock: products.minStock,
        maxStock: products.maxStock,
        supplier: products.supplier,
        location: products.location,

        totalSales: sql<number>`COALESCE(SUM(${sales.quantity}), 0)`
      })
      .from(products)
      .leftJoin(
        sales,
        and(
          eq(products.id, sales.productId),
          gte(sales.soldAt, sinceISO)
        )
      )
      .groupBy(products.id);

    return rows;
  }
}
