import { route } from "rwsdk/router";
import { ReorderController } from "./reorderController";

const controller = new ReorderController();

export const reorderRoutes = [
  route("/api/reorder-suggestions", async () => {
    try {
      const data = await controller.getSuggestions();
      return Response.json(data);
    } catch (err) {
      console.error("Reorder error:", err);
      return new Response("Kunne ikke hente reorder data", { status: 500 });
    }
  }),
];
