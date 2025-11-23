// src/components/Sales/SalesPage.tsx
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hent produkter + alle sales (du kan senere bytte til /api/sales/today)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [pRes, sRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/sales"),
        ]);

        if (!pRes.ok) throw new Error("Kunne ikke hente produkter");
        if (!sRes.ok) throw new Error("Kunne ikke hente salg");

        const pData: Product[] = await pRes.json();
        const sData: Sale[] = await sRes.json();

        const combined: SaleWithProduct[] = sData.map((s) => ({
          ...s,
          productName: pData.find((p) => p.id === s.productId)?.name ?? "Ukjent produkt",
        }));

        setProducts(pData);
        setSales(combined);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Noe gikk galt ved henting av data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const reloadSales = async () => {
    try {
      const sRes = await fetch("/api/sales");
      if (!sRes.ok) throw new Error("Kunne ikke hente salg");
      const sData: Sale[] = await sRes.json();

      const combined: SaleWithProduct[] = sData.map((s) => ({
        ...s,
        productName: products.find((p) => p.id === s.productId)?.name ?? "Ukjent produkt",
      }));

      setSales(combined);
    } catch (err) {
      console.error("Kunne ikke oppdatere salg:", err);
    }
  };

  const handleRegisterSale = async (data: { productId: string; quantity: number }) => {
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Kunne ikke registrere salg");
      }

      await reloadSales();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Kunne ikke registrere salg.");
    }
  };

  const handleDeleteSale = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette dette salget?")) return;

    try {
      const res = await fetch(`/api/sales/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Kunne ikke slette salg");
      }

      await reloadSales();
    } catch (err) {
      console.error(err);
      alert("Kunne ikke slette salg.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Registrer salg</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            + Registrer salg
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500 text-sm">Laster data...</p>
        ) : (
          <SalesTable sales={sales} onDelete={handleDeleteSale} />
        )}

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
