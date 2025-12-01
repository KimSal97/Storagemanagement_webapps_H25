import { describe, vi, type Mocked, beforeEach, expect, it } from "vitest";


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
        it("Kaster Error hvis felter mangler", async () => {
            await expect(suppliersService.createSupplier({ ...goodData, name: "" })).rejects.toThrow("Alle obligatoriske felter må fylles ut");
            await expect(suppliersService.createSupplier({ ...goodData, contact_person: "" })).rejects.toThrow("Alle obligatoriske felter må fylles ut");
            await expect(suppliersService.createSupplier({ ...goodData, email: "" })).rejects.toThrow("Alle obligatoriske felter må fylles ut");
            await expect(suppliersService.createSupplier({ ...goodData, phone: "" })).rejects.toThrow("Alle obligatoriske felter må fylles ut");
            await expect(suppliersService.createSupplier({ ...goodData, address: "" })).rejects.toThrow("Alle obligatoriske felter må fylles ut");
            expect(mockRepo.create).not.toHaveBeenCalled();
        });


    });

});