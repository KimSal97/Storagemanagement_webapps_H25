// src/components/Sales/SalesTable.tsx
"use client";

import type { SaleWithProduct } from "./SalesTypes";

export default function SalesTable({
  sales,
  onDelete,
}: {
  sales: SaleWithProduct[];
  onDelete?: (id: string) => void;
}) {
  const totalQty = sales.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dagens salg</h2>
        <span className="text-sm text-gray-600">
          Totalt antall solgt: <strong>{totalQty}</strong>
        </span>
      </div>

      {sales.length === 0 ? (
        <p className="text-gray-500 text-sm">Ingen salg registrert i dag.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Produkt</th>
              <th className="py-2">Antall</th>
              <th className="py-2">Tidspunkt</th>
              {onDelete && <th className="py-2 text-right">Handling</th>}
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="py-2">{s.productName}</td>
                <td className="py-2">{s.quantity}</td>
                <td className="py-2">
                  {new Date(s.soldAt).toLocaleTimeString("no-NO", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                {onDelete && (
                  <td className="py-2 text-right">
                    <button
                      onClick={() => onDelete(s.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Slett
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
