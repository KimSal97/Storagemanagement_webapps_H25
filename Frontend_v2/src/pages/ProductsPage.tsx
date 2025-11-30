"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import ProductTable from "@/components/Products/ProductTable";
import type { Product } from "@/components/Products/ProductTypes";
import AddEditProductModal from "@/components/Products/ProductForm/AddEditProductModal";
import DeleteConfirmModal from "@/components/Products/DeleteConfirmModal";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Feil ved lasting av produkter:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (product: Product) => {
    if (product.id) {
      await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    } else {
 
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    }

    setShowModal(false);
    setSelected(null);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setShowDelete(false);
    loadProducts();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Produkter</h1>

          <button
            onClick={() => {
              setSelected(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
           Legg til produkt
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
