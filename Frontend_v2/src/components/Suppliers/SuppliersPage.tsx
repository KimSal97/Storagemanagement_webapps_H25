"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import SuppliersTable from "./SuppliersTable";
import { SuppliersTypes } from "./SuppliersTypes";
import AddSupplierForm from "./AddSupplierForm";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<SuppliersTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SuppliersTypes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = async () => {
    try {
      setError(null);
      const res = await fetch("/api/suppliers");
      if (!res.ok) throw new Error("Kunne ikke hente leverandører");
      const data: SuppliersTypes[] = await res.json();
      setSuppliers(data);
    } catch (err) {
      console.error("Feil ved lasting av leverandører:", err);
      setError("Kunne ikke hente leverandører fra serveren.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne leverandøren?")) return;

    try {
      const res = await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Kunne ikke slette leverandør");
      await fetchSuppliers();
    } catch (err) {
      console.error(err);
      alert("Feil: Kunne ikke slette leverandør.");
    }
  };

  const handleSave = async (data: SuppliersTypes) => {
    try {
      const method = editingSupplier ? "PUT" : "POST";
      const url = editingSupplier
        ? `/api/suppliers/${editingSupplier.id}`
        : "/api/suppliers";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Feil ved lagring av leverandør");

      setShowForm(false);
      setEditingSupplier(null);
      await fetchSuppliers();
    } catch (err) {
      console.error(err);
      alert("Kunne ikke lagre leverandør.");
    }
  };
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        {loading && (
          <p className="text-gray-500">Laster leverandører...</p>
        )}
        {!loading && error && (
          <p className="text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Leverandører</h1>

              <button
                onClick={() => {
                  setEditingSupplier(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                + Ny leverandør
              </button>
            </div>

            {showForm && (
              <AddSupplierForm
                initialData={editingSupplier}
                onCancel={() => setShowForm(false)}
                onSave={handleSave}
              />
            )}

            <SuppliersTable
              suppliers={suppliers}
              onEdit={(s) => {
                setEditingSupplier(s);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>
    </div>
  );
}
