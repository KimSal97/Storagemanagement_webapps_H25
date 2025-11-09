"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import SuppliersTable from "./SuppliersTable";
import {SupplierTypes} from "./SupplierTypes"

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<SupplierTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("/api/suppliers");
        if (!res.ok) throw new Error("Kunne ikke hente leverandører");
        const data: SupplierTypes[] = await res.json();
        setSuppliers(data);
      } catch (err) {
        console.error("Feil ved lasting av leverandører:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">Laster leverandører...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Leverandører</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Ny leverandør
          </button>
        </div>

        <SuppliersTable suppliers={suppliers} />
      </main>
    </div>
  );
}
