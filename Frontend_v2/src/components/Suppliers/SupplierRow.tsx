"use client";
import { useState, useEffect, useRef } from "react";
import { SuppliersTypes } from "./SuppliersTypes";
import { MoreVertical } from "lucide-react";

export default function SupplierRow({
  supplier,
  onEdit,
  onDelete,
}: {
  supplier: SuppliersTypes;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">{supplier.name}</td>
      <td className="px-4 py-3">{supplier.contact_person}</td>
      <td className="px-4 py-3">{supplier.phone}</td>
      <td className="px-4 py-3">
        <a
          href={`mailto:${supplier.email}`}
          className="text-blue-600 hover:underline"
        >
          {supplier.email}
        </a>
      </td>

      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded text-xs ${supplier.status === "Aktiv"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
          }`}>
          {supplier.status}
        </span>
      </td>


      <td className="px-4 py-3 text-right relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1 hover:bg-gray-200 rounded"
          aria-label="Åpne handlinger"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-36 z-10 animate-fade-in">
            <button
              onClick={() => {
                setMenuOpen(false);
                onEdit();
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Endre
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                onDelete();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Slett
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
