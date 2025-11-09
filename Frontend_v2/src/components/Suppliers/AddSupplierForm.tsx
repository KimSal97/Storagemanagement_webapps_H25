"use client";
import { useState, useEffect } from "react";
import { SuppliersTypes } from "./SuppliersTypes";

interface AddSupplierFormProps {
  supplier?: SuppliersTypes | null;
  onCancel: () => void;
  onSave: (data: SuppliersTypes) => void;
}

export default function AddSupplierForm({ supplier, onCancel, onSave }: AddSupplierFormProps) {
  const [form, setForm] = useState<SuppliersTypes>({
    id: supplier?.id || "",
    name: supplier?.name || "",
    contact_person: supplier?.contact_person || "",
    email: supplier?.email || "",
    phone: supplier?.phone || "",
    address: supplier?.address || "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (supplier) {
      setForm({
        id: supplier.id,
        name: supplier.name,
        contact_person: supplier.contact_person,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address || "",
      });
    }
  }, [supplier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.contact_person || !form.email || !form.phone) {
      setMessage("Alle obligatoriske felt må fylles ut.");
      return;
    }

    try {
      await onSave(form);
      setMessage(supplier ? "Leverandør oppdatert!" : "Ny leverandør lagt til!");
      setForm({ id: "", name: "", contact_person: "", email: "", phone: "", address: "" });
    } catch (err: any) {
      setMessage("Kunne ikke lagre leverandør. Prøv igjen.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-xl max-w-lg border mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">
        {supplier ? "Rediger leverandør" : "Legg til ny leverandør"}
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Navn *"
          className="border rounded-md w-full px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Kontaktperson *"
          className="border rounded-md w-full px-3 py-2"
          value={form.contact_person}
          onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="E-post *"
          className="border rounded-md w-full px-3 py-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Telefonnummer *"
          className="border rounded-md w-full px-3 py-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Adresse (valgfritt)"
          className="border rounded-md w-full px-3 py-2"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {supplier ? "Oppdater" : "Lagre"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Avbryt
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </form>
  );
}
