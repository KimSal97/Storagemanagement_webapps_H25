"use client";

import { useState } from "react";
import type { Product } from "@/components/Products/ProductTypes";

export default function RegisterSaleModal({
  products,
  onSubmit,
  onClose,
}: {
  products: Product[];
  onSubmit: (data: { productId: string; quantity: number }) => void;
  onClose: () => void;
}) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const submit = () => {
    if (!productId || quantity <= 0) return;

    onSubmit({ productId, quantity });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Registrer salg</h2>

        <label className="text-sm font-medium">Produkt</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border w-full p-2 rounded-lg mb-4"
        >
          <option value="">Velg produkt</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Lager: {p.stock})
            </option>
          ))}
        </select>

        <label className="text-sm font-medium">Antall solgt</label>
        <input
          type="number"
          className="border w-full p-2 rounded-lg mb-4"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Avbryt
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Registrer salg
          </button>
        </div>
      </div>
    </div>
  );
}
