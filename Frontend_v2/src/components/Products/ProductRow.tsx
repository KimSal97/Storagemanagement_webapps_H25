import StockIndicator from "../Dashboard/StockIndicator";
import { Product } from "@/components/Products/ProductTypes";

export default function ProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  const { name, stock, minStock, location, category, price, supplier } = product;

  return (
    <tr className="border-b hover:bg-gray-50 transition">

      <td className="py-3 px-4 flex items-center gap-3">
        <StockIndicator stock={stock} min={minStock} />
        <span className="font-medium text-gray-800">{name}</span>
      </td>
      <td className="py-3 px-4 text-gray-700">{category}</td>
      <td className="py-3 px-4 text-gray-700">{stock} stk</td>
      <td className="py-3 px-4 text-gray-700">{price} kr</td>
      <td className="py-3 px-4 text-gray-600">{supplier}</td>
      <td className="py-3 px-4 text-right space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Rediger
        </button>

        <button
          onClick={() => onDelete(product)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Slett
        </button>
      </td>
    </tr>
  );
}
