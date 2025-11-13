"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import ProductTable from "./ProductTable";
import AddEditProductModal from "./AddEditProductModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import type { Product } from "./ProductTypes";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // 🔹 Hent produkter fra API
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
    setShowDelete(false);
  };

  const handleSave = async (product: Product) => {
    if (selected) {
      // Oppdater eksisterende
      await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      // Nytt produkt
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
    setSelected(null);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Produkter</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Legg til produkt
          </button>
        </div>

        <input
          type="text"
          placeholder="Søk etter produkt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-72 mb-4"
        />

        <ProductTable
          products={filtered}
          onEdit={(p) => {
            setSelected(p);
            setShowModal(true);
          }}
          onDelete={(p) => {
            setSelected(p);
            setShowDelete(true);
          }}
        />

        {showModal && (
          <AddEditProductModal
            product={selected}
            onClose={() => {
              setShowModal(false);
              setSelected(null);
            }}
            onSave={handleSave}
          />
        )}

        {showDelete && selected && (
          <DeleteConfirmModal
            product={selected}
            onClose={() => setShowDelete(false)}
            onConfirm={() => handleDelete(selected.id)}
          />
        )}
      </div>
    </div>
  );
}
