"use client";

import type { SaleWithProduct } from "./SalesTypes";

export default function SalesTable({ sales }: { sales: SaleWithProduct[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Dagens salg</h2>

      {sales.length === 0 ? (
        <p className="text-gray-500 text-sm">Ingen salg registrert i dag.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Produkt</th>
              <th className="py-2">Antall</th>
              <th className="py-2">Tid</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="py-2">{s.productName}</td>
                <td className="py-2">{s.quantity}</td>
                <td className="py-2">
                  {new Date(s.soldAt).toLocaleTimeString("no-NO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
