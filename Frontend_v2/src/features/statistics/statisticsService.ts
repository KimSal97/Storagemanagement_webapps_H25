import { StatisticsRepository } from "./statisticsRepository";

export class StatisticsService {
  private repo = new StatisticsRepository();

  async getStatistics(filters: {
    startDate?: string;
    endDate?: string;
    range?: "daily" | "weekly" | "monthly";
  }) {
    const { startDate, endDate, range = "daily" } = filters;

    let salesData;
    let orderData;

    switch (range) {
      case "weekly":
        salesData = await this.repo.getWeeklySales(startDate, endDate);
        orderData = await this.repo.getWeeklyOrders(startDate, endDate);
        break;

      case "monthly":
        salesData = await this.repo.getMonthlySales(startDate, endDate);
        orderData = await this.repo.getMonthlyOrders(startDate, endDate);
        break;

      default:
        salesData = await this.repo.getDailySales(startDate, endDate);
        orderData = await this.repo.getDailyOrders(startDate, endDate);
    }

    return {
      range,
      sales: salesData,
      orders: orderData,
    };
  }
}
