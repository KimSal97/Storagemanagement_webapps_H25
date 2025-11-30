"use client";

import ProductCard from "./ProductCard";
import type { Product } from "@/components/Products/ProductTypes";

type Props = {
  products: Product[];
  onAddToCart: (item: any) => void;
};

export default function ProductsGrid({ products, onAddToCart }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          title={p.name}
          price={p.price}
          image={p.image}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
