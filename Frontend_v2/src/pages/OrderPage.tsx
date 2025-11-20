"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import ProductCard from "@/components/OrderPage/ProductCard";

import type { OrderProduct } from "@/components/OrderPage/OrderTypes";
import type { Product } from "@/components/Products/ProductTypes";

type CartItem = {
  productId: string;
  quantity: number;
  calculatedQuantity: number;
};

export default function OrderPage() {

  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const computeStatus = (p: Product) => {
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

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;

    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ items: cart }),
    });

    setCart([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Ny Bestilling</h1>
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Handlekurv</h2>

          {cart.length === 0 && (
            <p className="text-gray-500">Ingen varer i handlekurven.</p>
          )}
          {cart.length > 0 && (
            <>
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span>Produkt: {item.productId}</span>
                  <span>Qty: {item.quantity}</span>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Fjern
                  </button>
                </div>
              ))}
              <button
                onClick={handleSubmitOrder}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Send bestilling
              </button>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
