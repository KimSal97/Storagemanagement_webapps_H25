// src/components/Sales/RegisterSaleModal.tsx
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

  const handleSubmit = () => {
    if (!productId || quantity <= 0) {
      alert("Velg et produkt og et gyldig antall.");
      return;
    }

    onSubmit({ productId, quantity });
  };

  const selectedProduct = products.find((p) => p.id === productId);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Registrer salg</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Produkt</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border w-full p-2 rounded-lg"
            >
              <option value="">Velg produkt...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {typeof p.stock === "number" ? `(Lager: ${p.stock})` : ""}
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              <div><strong>Kategori:</strong> {selectedProduct.category}</div>
              {typeof selectedProduct.stock === "number" && (
                <div><strong>Lager nå:</strong> {selectedProduct.stock}</div>
              )}
              {typeof selectedProduct.minStock === "number" && (
                <div><strong>Minimum lager:</strong> {selectedProduct.minStock}</div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Antall solgt</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border w-full p-2 rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
          >
            Avbryt
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-sm"
          >
            Registrer salg
          </button>
        </div>
      </div>
    </div>
  );
}
