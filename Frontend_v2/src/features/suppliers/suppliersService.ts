import { suppliersRepository } from "./suppliersRepository";

export const suppliersService = {
  async createSupplier(data: {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address?: string;
  }) {
    if (!data.name || !data.contactPerson || !data.email || !data.phone) {
      throw new Error("Alle obligatoriske felter må fylles ut");
    }

    const existing = await suppliersRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("En leverandør med denne e-posten finnes allerede");
    }

    await suppliersRepository.create(data);
  },

  async getAllSuppliers() {
    return await suppliersRepository.findAll();
  },
};
