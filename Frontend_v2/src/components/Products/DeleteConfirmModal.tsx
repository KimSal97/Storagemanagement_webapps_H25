"use client";

import type { Product } from "@/components/Products/ProductTypes";

export default function DeleteConfirmModal({
  product,
  onClose,
  onConfirm,
}: {
  product: Product;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Slett produkt</h2>

        <p className="text-gray-700 mb-6">
          Er du sikker på at du vil slette{" "}
          <span className="font-semibold">{product.name}</span>?  
          Dette kan ikke angres.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Avbryt
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            Slett
          </button>
        </div>
      </div>
    </div>
  );
}
