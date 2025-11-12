import { productsRepository } from "./productsRepository";
import type { NewProduct } from "@/db/schema/products-schema";

export const productsService = {
  async getAll() {
    return await productsRepository.findAll();
  },

  async getById(id: string) {
    const product = await productsRepository.findById(id);
    if (!product) throw new Error("Produkt ikke funnet");
    return product;
  },

  async create(data: NewProduct) {
    if (!data.name || !data.category || !data.price)
      throw new Error("Navn, kategori og pris er obligatorisk");
    return await productsRepository.create(data);
  },

  async update(id: string, data: Partial<NewProduct>) {
    const existing = await productsRepository.findById(id);
    if (!existing) throw new Error("Produkt ikke funnet");
    await productsRepository.update(id, data);
    return { ...existing, ...data };
  },

  async delete(id: string) {
    await productsRepository.remove(id);
    return { success: true };
  },
};
