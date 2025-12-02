import { beforeAll, afterAll, describe, it, expect } from "vitest";
import {  suppliersRepository, setSuppliersRepositoryDb, resetSuppliersRepositoryDb, } from "../src/features/suppliers/suppliersRepository";
import { createTestDb } from "../test_utils/createTestDb";


const testDb = createTestDb();
describe("suppliersRepository (integration)", () => {
  //Lager Testdatabase og bytter til den før testene kjører

  beforeAll(() => {
    setSuppliersRepositoryDb(testDb);
  });
  afterAll(() => {
    resetSuppliersRepositoryDb();
  });

  it("Lager og leser leverandør", async () => {
    await suppliersRepository.create({
      name: "John Supplies",
      contact_person: "John Doe",
      email: "john.supplies@example.com",
      phone: "12345678",
      address: "Testveien 1",
      status: "Aktiv",
    });

    const all = await suppliersRepository.findAll();

    expect(all.length).toBe(1);
    expect(all[0].email).toBe("john.supplies@example.com");
  });
});