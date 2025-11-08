"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import RecentSales from "./RecentSoldProducts";
import ProductList from "./ProductList";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Feil ved lasting av produkter:", err));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <Header onSearch={setSearch} />
      <RecentSales products={products.slice(0, 5)} />
      <ProductList products={filtered} />
    </div>
  );
}
