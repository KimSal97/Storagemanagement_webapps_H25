// src/components/Dashboard/Sidebar.tsx
"use client";
import { Home, Package, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-blue-600">StorageManagement</h2>
      </div>

      <nav className="flex-1 p-4 space-y-3">
        <a href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <Home size={18} /> Oversikt
        </a>
        <a href="/products" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <Package size={18} /> Produkter
        </a>
        <a href="/order" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <Package size={18} /> Bestillinger
        </a>
      </nav>

      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 p-4 border-t">
        <LogOut size={18} /> Logg ut
      </button>
    </aside>
  );
}
