"use client";

export default function FilterBar({
  filters,
  setFilters,
}: {
  filters: { startDate: string; endDate: string; category: string };
  setFilters: React.Dispatch<React.SetStateAction<{ startDate: string; endDate: string; category: string }>>;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 justify-between">
      <div className="flex gap-3 items-center">
        <label className="text-sm text-gray-600">Fra:</label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
          className="border px-2 py-1 rounded-lg"
        />
        <label className="text-sm text-gray-600">Til:</label>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
          className="border px-2 py-1 rounded-lg"
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        className="border px-2 py-1 rounded-lg"
      >
        <option value="">Alle kategorier</option>
        <option value="frukt">Frukt</option>
        <option value="meieri">Meieri</option>
        <option value="drikke">Drikke</option>
      </select>
    </div>
  );
}
