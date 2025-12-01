import { describe, vi, type Mocked, beforeEach } from "vitest";


//Fake the repository module
vi.mock("./suppliersRepository", async () => ({
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

describe("suppliersService", () => {
    beforeEach(() => {
    vi.clearAllMocks();
    });
    describe("createSupplier", () => {
        const goodData = {
            name: "Supplier John",
            contact_person: "John Doe",
            email: "johnA@mail.com",
            phone: "12345678",
            address: "123 Street",
            status: "Aktiv" as const,
        };


    });

});