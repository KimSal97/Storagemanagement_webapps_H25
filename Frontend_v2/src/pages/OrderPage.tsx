"use client";

import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import ProductCard from "@/components/OrderPage/ProductCard";
import type { OrderProduct } from "@/components/OrderPage/OrderTypes";

export default function OrderPage() {
  const exampleProducts: OrderProduct[] = [
    {
      title: "Bananer",
      price: 19,
      baseStock: 40,
      minimumStock: 10,
      dailySales: 6,
      Status: "warning",
      image: "/images/products/bananas.jpg",
    },
    {
      title: "Melk 1L",
      price: 18,
      baseStock: 80,
      minimumStock: 20,
      dailySales: 12,
      Status: "good",
      image: "/images/products/milk.jpg",
    },
    {
      title: "Egg 12pk",
      price: 39,
      baseStock: 10,
      minimumStock: 12,
      dailySales: 5,
      Status: "critical",
      image: "/images/products/eggs.jpg",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Ny Bestilling</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {exampleProducts.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
