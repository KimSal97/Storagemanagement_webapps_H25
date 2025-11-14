import StockIndicator from "../Dashboard/StockIndicator";
import { Product } from "@/components/Products/ProductTypes";

export default function ProductRow({ product }: { product: Product }) {
  const { name, stock, minStock, location } = product;

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="py-3 px-4 flex items-center gap-3">
        <StockIndicator stock={stock} min={minStock} />
        <span className="font-medium text-gray-800">{name}</span>
      </td>

      <td className="py-3 px-4 text-gray-700">{stock}</td>
      <td className="py-3 px-4 text-gray-700">{minStock}</td>
      <td className="py-3 px-4 text-gray-600">{location}</td>
    </tr>
  );
}
