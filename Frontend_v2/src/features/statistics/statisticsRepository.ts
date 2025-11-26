// src/features/statistics/statisticsRepository.ts
import { db } from "@/db";
import { sales } from "@/db/schema/sales-schema";
import { orders } from "@/db/schema/orders-schema";
import { products } from "@/db/schema/products-schema";
import { sql, eq } from "drizzle-orm";

export class StatisticsRepository {
  async getDailySales(start?: string, end?: string) {
    return db
      .select({
        date: sql<string>`DATE(${sales.soldAt})`,
        quantity: sql<number>`SUM(${sales.quantity})`,
      })
      .from(sales)
      .where(
        sql`(${start ? sql`${sales.soldAt} >= ${start}` : sql`1=1`})
            AND (${end ? sql`${sales.soldAt} <= ${end}` : sql`1=1`})`
      )
      .groupBy(sql`DATE(${sales.soldAt})`)
      .orderBy(sql`DATE(${sales.soldAt})`);
  }

  async getWeeklySales(start?: string, end?: string) {
    return db
      .select({
        week: sql<string>`STRFTIME('%Y-%W', ${sales.soldAt})`,
        quantity: sql<number>`SUM(${sales.quantity})`,
      })
      .from(sales)
      .where(
        sql`(${start ? sql`${sales.soldAt} >= ${start}` : sql`1=1`})
            AND (${end ? sql`${sales.soldAt} <= ${end}` : sql`1=1`})`
      )
      .groupBy(sql`STRFTIME('%Y-%W', ${sales.soldAt})`)
      .orderBy(sql`STRFTIME('%Y-%W', ${sales.soldAt})`);
  }

  async getMonthlySales(start?: string, end?: string) {
    return db
      .select({
        month: sql<string>`STRFTIME('%Y-%m', ${sales.soldAt})`,
        quantity: sql<number>`SUM(${sales.quantity})`,
      })
      .from(sales)
      .where(
        sql`(${start ? sql`${sales.soldAt} >= ${start}` : sql`1=1`})
            AND (${end ? sql`${sales.soldAt} <= ${end}` : sql`1=1`})`
      )
      .groupBy(sql`STRFTIME('%Y-%m', ${sales.soldAt})`)
      .orderBy(sql`STRFTIME('%Y-%m', ${sales.soldAt})`);
  }

  async getDailyOrders(start?: string, end?: string) {
    return db
      .select({
        date: sql<string>`DATE(${orders.createdAt})`,
        total: sql<number>`SUM(${orders.totalCost})`,
      })
      .from(orders)
      .where(
        sql`(${start ? sql`${orders.createdAt} >= ${start}` : sql`1=1`})
            AND (${end ? sql`${orders.createdAt} <= ${end}` : sql`1=1`})`
      )
      .groupBy(sql`DATE(${orders.createdAt})`)
      .orderBy(sql`DATE(${orders.createdAt})`);
  }

  async getWeeklyOrders(start?: string, end?: string) {
    return db
      .select({
        week: sql<string>`STRFTIME('%Y-%W', ${orders.createdAt})`,
        total: sql<number>`SUM(${orders.totalCost})`,
      })
      .from(orders)
      .where(
        sql`(${start ? sql`${orders.createdAt} >= ${start}` : sql`1=1`})
            AND (${end ? sql`${orders.createdAt} <= ${end}` : sql`1=1`})`
      )
      .groupBy(sql`STRFTIME('%Y-%W', ${orders.createdAt})`)
      .orderBy(sql`STRFTIME('%Y-%W', ${orders.createdAt})`);
  }

  async getMonthlyOrders(start?: string, end?: string) {
    return db
      .select({
        month: sql<string>`STRFTIME('%Y-%m', ${orders.createdAt})`,
        total: sql<number>`SUM(${orders.totalCost})`,
      })
      .from(orders)
      .where(
        sql`(${start ? sql`${orders.createdAt} >= ${start}` : sql`1=1`})
            AND (${end ? sql`${orders.createdAt} <= ${end}` : sql`1=1`})`
      )
      .groupBy(sql`STRFTIME('%Y-%m', ${orders.createdAt})`)
      .orderBy(sql`STRFTIME('%Y-%m', ${orders.createdAt})`);
  }
}
