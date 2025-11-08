import SupplierRow from "./SupplierRow";
import { SupplierTypes } from "./SupplierTypes";

export default function SuppliersTable({ suppliers }: { suppliers: SupplierTypes[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 font-medium">Leverandørnavn</th>
            <th className="px-4 py-3 font-medium">Kontaktperson</th>
            <th className="px-4 py-3 font-medium">Telefon</th>
            <th className="px-4 py-3 font-medium">E-post</th>
            <th className="px-4 py-3 font-medium">Produkter</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((s) => <SupplierRow key={s.id} supplier={s} />)
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-4">
                Ingen leverandører funnet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
