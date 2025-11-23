"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import RegisterSaleModal from "./RegisterSaleModal";
import SalesTable from "./SalesTable";
import type { Product } from "@/components/Products/ProductTypes";
import type { Sale, SaleWithProduct } from "./SalesTypes";

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<SaleWithProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products + today's sales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const pRes = await fetch("/api/products");
    const sRes = await fetch("/api/sales/today");

    const pData: Product[] = await pRes.json();
    const sData: Sale[] = await sRes.json();

    // Link sales → product names
    const combined: SaleWithProduct[] = sData.map((s) => ({
      ...s,
      productName: pData.find((p) => p.id === s.productId)?.name || "Ukjent produkt",
    }));

    setProducts(pData);
    setSales(combined);
  };

  const handleRegisterSale = async (data: { productId: string; quantity: number }) => {
    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Kunne ikke registrere salg.");
      return;
    }

    await loadData();
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Registrer salg</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Registrer salg
        </button>

        <SalesTable sales={sales} />

        {isModalOpen && (
          <RegisterSaleModal
            products={products}
            onSubmit={handleRegisterSale}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
