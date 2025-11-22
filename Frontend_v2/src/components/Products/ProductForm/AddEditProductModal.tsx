"use client";

import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import type { Product } from "@/components/Products/ProductTypes";

export default function AddEditProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Product | null;
  onClose: () => void;
  onSave: (data: Product) => void;
}) {
  const [form, setForm] = useState<Product>(
    product ?? {
      id: "",
      name: "",
      category: "",
      stock: 0,
      minStock: 0,
      price: 0,
      supplier: "",
      location: "",
      image: "",
    }
  );

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (key: keyof Product, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => onSave(form);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">
          {product ? "Rediger produkt" : "Legg til produkt"}
        </h2>

        <ProductForm form={form} onChange={handleChange} />

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Avbryt
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {product ? "Lagre endringer" : "Legg til produkt"}
          </button>
        </div>
      </div>
    </div>
  );
}
