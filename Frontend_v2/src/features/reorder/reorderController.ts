// src/features/reorder/reorderController.ts
import { ReorderService } from "./reorderService";

const service = new ReorderService();

export class ReorderController {
  async getSuggestions() {
    const list = await service.getSuggestions();
    return list;
  }
}
