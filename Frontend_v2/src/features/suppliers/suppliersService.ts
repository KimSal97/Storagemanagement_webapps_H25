import { suppliersRepository } from "./suppliersRepository";

export const suppliersService = {
  async createSupplier(data: {
    name: string;
    contact_person: string;
    email: string;
    phone: string;
    address?: string;
  }) {
    if (!data.name || !data.contact_person || !data.email || !data.phone) {
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

  async getSupplierById(id: string) {
    const supplier = await suppliersRepository.findById(id);
    if (!supplier) throw new Error("Leverandør ikke funnet");
    return supplier;
  },

  async updateSupplier(id: string, data: Partial<{
    name: string;
    contact_person: string;
    email: string;
    phone: string;
    address?: string;
  }>) {
    const supplier = await suppliersRepository.findById(id);
    if (!supplier) throw new Error("Leverandør ikke funnet");

    await suppliersRepository.updateById(id, data);
  },

  async deleteSupplier(id: string) {
    const supplier = await suppliersRepository.findById(id);
    if (!supplier) throw new Error("Leverandør ikke funnet");

    await suppliersRepository.deleteById(id);
  },
};
