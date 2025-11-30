import { StatisticsService } from "./statisticsService";

const service = new StatisticsService();

export const statisticsController = {
  async get(request: Request) {
    const url = new URL(request.url);

    const filters = {
      startDate: url.searchParams.get("startDate") ?? undefined,
      endDate: url.searchParams.get("endDate") ?? undefined,
      range:
        (url.searchParams.get("range") as "daily" | "weekly" | "monthly") ??
        "daily",
    };

    try {
      const data = await service.getStatistics(filters);
      return Response.json(data);
    } catch (err: any) {
      console.error("Statistics error:", err);
      return new Response(err.message ?? "Could not fetch statistics", {
        status: 400,
      });
    }
  },
};
