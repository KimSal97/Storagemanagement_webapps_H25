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

//--------------------------------------------------------
// Tests for suppliersService
//--------------------------------------------------------

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

            // Sørg for at create ikke blir kalt når det mangler felt
            expect(mockRepo.create).not.toHaveBeenCalled();
        });


        it("Kaster Error hvis leverandør med e-post allerede finnes", async () => {
            mockRepo.findByEmail.mockResolvedValueOnce({ id: "1" } as any);
            await expect(
                suppliersService.createSupplier(goodData)
            ).rejects.toThrow("En leverandør med denne e-posten finnes allerede");

            // Her også, sørg for at create ikke blir kalt når leverandør med e-post allerede finnes
            expect(mockRepo.create).not.toHaveBeenCalled();
        });
        
        it("skaper leverandør når data er gyldig og e-post er ledig", async () => {
            mockRepo.findByEmail.mockResolvedValueOnce(undefined);
            await suppliersService.createSupplier(goodData);
            expect(mockRepo.findByEmail).toHaveBeenCalledWith(goodData.email);
            expect(mockRepo.create).toHaveBeenCalledWith(goodData);
        });

    });

    //--------------------------------------------------------
    //Test for updateSupplier
    //--------------------------------------------------------
    describe("updateSupplier", () => {
        const id = "supplier-john";
        const existingSupplier = {
            id,
            name: "John the Supplier",
            contact_person: "John Doe",
            email: "johnA@mail.com",
            phone: "87654321",
            address: "321 Avenue",
            status: "Aktiv" as const,
        };
        //Nye verdier for oppdatering
        const updateData = {
            name: "Supplier John the Updated",
            contact_person: "John Updated",
            email: "john_update@mail.com",
            phone: "123123123",
            address: "New Address 456",
            status: "Inaktiv" as const,
        };

        it("Kaster Error hvis leverandør blir funnet", async () => {
            mockRepo.findById.mockResolvedValueOnce(undefined);
            await expect(
                suppliersService.updateSupplier(id, updateData)
            ).rejects.toThrow("Leverandør ikke funnet");

            expect(mockRepo.updateById).not.toHaveBeenCalled();
        });
        it("kaller repository og returnerer oppdatert leverandør når supplier finnes", async () => {
            mockRepo.findById.mockResolvedValueOnce(existingSupplier as any);
            mockRepo.updateById.mockResolvedValueOnce({
                ...existingSupplier,
                ...updateData,
            } as any);
            const result = await suppliersService.updateSupplier(id, updateData);
            expect(mockRepo.findById).toHaveBeenCalledWith(id);
            expect(mockRepo.updateById).toHaveBeenCalledWith(id, updateData);
            expect(result).toEqual({ ...existingSupplier, ...updateData });
        });
    });
});