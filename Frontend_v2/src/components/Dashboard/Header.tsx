import { Bell, Plus } from "lucide-react";

export default function Header({ onSearch }: { onSearch: (v: string) => void }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Storage Management</h1>
        <p className="text-sm text-gray-500">Nylige solgte varer</p>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Søk etter produkter / ordre..."
          onChange={(e) => onSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64 text-sm"
        />
        <Bell className="text-gray-500" />
        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={16} /> Ny bestilling
        </button>
      </div>
    </header>
  );
}
