import { describe, vi, type Mocked } from "vitest";

vi.mock("./suppliersrepository", async () => ({
  suppliersRepository: {
    findByEmail: vi.fn(),
    create: vi.fn(),
    findAll: vi.fn(),
    findById: vi.fn(),
    updateById: vi.fn(),
    deleteById: vi.fn(),
  },
}));

import { suppliersService } from "./suppliersService";
import { suppliersRepository } from "./suppliersRepository";

const mockRepo = suppliersRepository as Mocked<typeof suppliersRepository>;

