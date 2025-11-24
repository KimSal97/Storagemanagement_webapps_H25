"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import ReorderTable from "./ReorderTable";
import type { ReorderSuggestion, ReorderStatus } from "./ReorderTypes";

export default function ReorderPage() {
  const [suggestions, setSuggestions] = useState<ReorderSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReorderStatus | "all">("all");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/reorder-suggestions");
      if (!res.ok) throw new Error("Kunne ikke hente bestillingsforslag");

      const data: ReorderSuggestion[] = await res.json();
      setSuggestions(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Noe gikk galt ved henting av bestillingsforslag.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered =
    filter === "all"
      ? suggestions
      : suggestions.filter((s) => s.status === filter);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Bestillingsforslag
            </h1>
            <p className="text-sm text-gray-500">
              Viser produkter som er under minimumslager og hvor systemet foreslår bestilling.
            </p>
          </div>

        <div className="flex gap-2 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Alle</option>
            <option value="critical">Kritisk</option>
            <option value="warning">Lav</option>
          </select>
          <button
            onClick={load}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Oppdater
          </button>
        </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-500">Laster bestillingsforslag...</p>
        ) : (
          <ReorderTable suggestions={filtered} />
        )}
      </div>
    </div>
  );
}
