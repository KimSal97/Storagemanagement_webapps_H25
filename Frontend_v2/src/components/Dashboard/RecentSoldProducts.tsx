"use client";

type Product = {
  id: string;
  name: string;
  image?: string;
  stock: number;
  minStock: number;
}

export default function RecentSoldProducts({ products }: { products: Product[] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Nylige solgte varer</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { name, image, stock, minStock } = product;
  const ratio = stock / minStock;

  let color = "bg-gray-400";
  if (ratio <= 1) color = "bg-red-500";
  else if (ratio <= 2) color = "bg-yellow-400";
  else color = "bg-green-500";

  return (
    <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col items-center hover:shadow-md transition">
      <div className={`w-3 h-3 rounded-full self-end ${color}`} />

      <img
        src={image || "/placeholder.png"}
        alt={name}
        className="w-full h-28 object-cover rounded-md mb-2"
      />

      <h3 className="text-sm font-semibold text-gray-700 text-center">{name}</h3>
      <p className="text-xs text-gray-500">{stock} stk på lager</p>
    </div>
  );
}
