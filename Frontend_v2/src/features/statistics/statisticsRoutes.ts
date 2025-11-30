import { route } from "rwsdk/router";
import { statisticsController } from "./statisticsController";

export const statisticsRoutes = [
  route("/api/statistics", async ({ request }) => {
    if (request.method === "GET") {
      return statisticsController.get(request);
    }

    return new Response("Method not allowed", { status: 405 });
  }),
];
