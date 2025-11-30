import ProductRow from "./ProductRow";
import type { Product } from "./ProductTypes";

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Navn</th>
            <th className="px-4 py-2">Kategori</th>
            <th className="px-4 py-2">Lagerstatus</th>
            <th className="px-4 py-2">Pris</th>
            <th className="px-4 py-2">Leverandør</th>
            <th className="px-4 py-2 text-right">Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
