// src/components/Dashboard/Header.tsx
"use client";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white shadow-sm px-6 py-3 border-b">
      <h1 className="text-lg font-medium text-gray-800">StorageManagement</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Søk..."
          className="border rounded-lg px-3 py-1.5 text-sm w-60"
        />
        <Bell className="text-gray-500 cursor-pointer" size={20} />
      </div>
    </header>
  );
}
