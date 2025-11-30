"use client";
import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import RecentSoldProducts from "./RecentSoldProducts";
import ProductWidget from "./ProductWidget";
import type { Product } from "@/components/Products/ProductTypes";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Kunne ikke hente produkter");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Feil ved lasting av produkter:", err);
      }
    };

    loadProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-6 p-6">
        <Header onSearch={setSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductWidget products={products} />
          <RecentSoldProducts products={filtered.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
