"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import ProductsGrid from "@/components/OrderPage/ProductsGrid";
import CartBox from "@/components/OrderPage/CartBox";

import type { Product } from "@/components/Products/ProductTypes";

type CartItem = {
  productId: string;
  productName: string;
  orderedQty: number;
  unitCost: number;
};

export default function OrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json() as Promise<Product[]>)
      .then((data) => setProducts(data))
      .catch(() => alert("Kunne ikke hente produkter"));
  }, []);

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.productId === item.productId);

      if (existing) {
        return prev.map((p) =>
          p.productId === item.productId
            ? { ...p, orderedQty: p.orderedQty + item.orderedQty }
            : p
        );
      }

      return [...prev, item];
    });
  };
  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleIncrease = (productId: string) => {
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, orderedQty: i.orderedQty + 1 }
          : i
      )
    );
  };

  const handleDecrease = (productId: string) => {
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, orderedQty: Math.max(1, i.orderedQty - 1) }
          : i
      )
    );
  };

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      alert("Handlekurven er tom.");
      return;
    }

    const payload = { items: cart };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Kunne ikke opprette ordre");
      }

      setCart([]);
      alert("Bestilling sendt!");
    } catch (err) {
      console.error(err);
      alert("Kunne ikke sende bestilling.");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 relative">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Ny Bestilling</h1>
        <CartBox
          cart={cart}
          products={products}
          onRemove={handleRemoveFromCart}
          onSubmit={handleSubmitOrder}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
        <div className="mr-96">
          <ProductsGrid products={products} onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}
