"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import ProductCard from "@/components/OrderPage/ProductCard";

import type { OrderProduct, OrderStatus } from "@/components/OrderPage/OrderTypes";
import type { Product } from "@/components/Products/ProductTypes";

export default function OrderPage() {
  const [products, setProducts] = useState<OrderProduct[]>([]);

  const computeStatus = (p: Product): OrderStatus => {
    if (p.stock <= p.minStock) return "critical";
    if (p.stock <= p.minStock * 1.5) return "warning";
    return "good";
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();

        const mapped: OrderProduct[] = data.map((p) => ({
          id: p.id,
          title: p.name,
          price: p.price,
          baseStock: p.stock ?? 0,
          minimumStock: p.minStock ?? 0,
          dailySales: 0,    
          supplyTimeDays: 7, 
          Status: computeStatus(p),
          image: p.image ?? "/src/app/shared/missing.png",
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Kunne ikke hente produkter:", err);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Ny Bestilling</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
