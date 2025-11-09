"use client";
import SupplierRow from "./SupplierRow";
import { SuppliersTypes } from "./SuppliersTypes";

interface SuppliersTableProps {
  suppliers: SuppliersTypes[];
  onEdit: (supplier: SuppliersTypes) => void;
  onDelete: (id: string) => void;
}

export default function SuppliersTable({ suppliers, onEdit, onDelete }: SuppliersTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-medium">Leverandørnavn</th>
              <th className="px-4 py-3 font-medium">Kontaktperson</th>
              <th className="px-4 py-3 font-medium">Telefon</th>
              <th className="px-4 py-3 font-medium">E-post</th>
              <th className="px-4 py-3 font-medium text-right">Handlinger</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <SupplierRow
                  key={supplier.id}
                  supplier={supplier}
                  onEdit={() => onEdit(supplier)}
                  onDelete={() => onDelete(supplier.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  Ingen leverandører funnet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {suppliers.length > 0 && (
        <div className="text-xs text-gray-500 px-4 py-2 border-t bg-gray-50">
          Viser {suppliers.length} leverandør{suppliers.length > 1 ? "er" : ""}
        </div>
      )}
    </div>
  );
}
