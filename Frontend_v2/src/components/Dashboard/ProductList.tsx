"use client";
import ProductRow from "./ProductRow";

interface Product {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  location: string;
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <section className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Mine produkter</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-gray-600 border-b bg-gray-50">
            <tr>
              <th className="py-3 px-4">Produktnavn</th>
              <th className="py-3 px-4">Antall på lager</th>
              <th className="py-3 px-4">Minimumsnivå</th>
              <th className="py-3 px-4">Plassering i lageret</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((p) => <ProductRow key={p.id} product={p} />)
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Ingen produkter funnet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}