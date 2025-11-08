"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import RecentSoldProducts from "./RecentSoldProducts";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";

type Product = {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  location: string;
  image: string;
};

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
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
        <RecentSoldProducts products={products.slice(0, 5)} />
        <ProductList products={filtered} />
      </div>
    </div>
  );
}
