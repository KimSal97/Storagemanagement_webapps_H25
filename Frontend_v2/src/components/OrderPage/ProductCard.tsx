"use client";

import React from "react";

type Props = {
  id: string;
  title: string;
  price: number;
  image?: string;
  onAddToCart: (item: {
    productId: string;
    orderedQty: number;
    unitCost: number;
  }) => void;
};

export default function ProductCard({
  id,
  title,
  price,
  image = "/placeholder.png",
  onAddToCart,
}: Props) {
  const [qty, setQty] = React.useState(1);

  const handleAdd = () => {
    onAddToCart({
      productId: id,
      orderedQty: qty,
      unitCost: price,
    });
  };

  return (
    <div className="bg-white shadow-md border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
        <img src={image} alt={title} className="object-contain h-full w-full" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4">{price} kr</p>

        <label className="block text-sm text-gray-600 mb-1">Antall</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={150}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-lg font-semibold">{qty}</span>
        </div>

        <button
          onClick={handleAdd}
          className="mt-5 w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 font-medium"
        >
          Legg til
        </button>
      </div>
    </div>
  );
}
