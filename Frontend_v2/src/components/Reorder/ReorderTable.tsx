"use client";

import type { ReorderSuggestion } from "./ReorderTypes";

export default function ReorderTable({
  suggestions,
}: {
  suggestions: ReorderSuggestion[];
}) {
  if (suggestions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-500">
          Ingen produkter er under minimumsnivå akkurat nå.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Produkt</th>
            <th className="py-2">Leverandør</th>
            <th className="py-2">Lokasjon</th>
            <th className="py-2 text-right">Lager</th>
            <th className="py-2 text-right">Min.lager</th>
            <th className="py-2 text-right">Foreslått</th>
            <th className="py-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((s) => {
            const badgeClass =
              s.status === "critical"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700";

            const badgeLabel =
              s.status === "critical" ? "Kritisk" : "Lav";

            return (
              <tr key={s.productId} className="border-b">
                <td className="py-2">{s.name}</td>
                <td className="py-2">{s.supplier}</td>
                <td className="py-2">{s.location}</td>
                <td className="py-2 text-right">{s.stock}</td>
                <td className="py-2 text-right">{s.minStock}</td>
                <td className="py-2 text-right font-semibold">
                  {s.suggestedQty}
                </td>
                <td className="py-2 text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${badgeClass}`}
                  >
                    {badgeLabel}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
