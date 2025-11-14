"use client";

import { Product } from "../Products/ProductTypes";

export default function ProductWidget({ products }: { products: Product[] }) {
  const lowStock = products
    .filter((p) => p.stock <= p.minStock)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Lav beholdning</h2>

        <a
          href="/products"
          className="text-blue-600 text-sm hover:underline"
        >
          Se alle
        </a>
      </div>

      {lowStock.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Ingen produkter med lav beholdning 🎉
        </p>
      ) : (
        <ul className="space-y-4">
          {lowStock.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-4"
            >
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name}
                className="w-12 h-12 object-cover rounded-md border"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-500">
                  {p.category} • {p.location}
                </p>
              </div>

              <span
                className={`
                  text-sm px-2 py-1 rounded-lg min-w-[50px] text-center
                  ${
                    p.stock === 0
                      ? "bg-red-100 text-red-700"
                      : p.stock <= p.minStock
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }
                `}
              >
                {p.stock} stk
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
