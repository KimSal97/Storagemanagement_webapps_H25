"use client";
import { useState } from "react";

export default function AddSupplierForm() {
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.contactPerson || !form.email || !form.phone) {
      setMessage("Alle feltene må fylles ut før du kan lagre");
      return;
    }

    try {
      const res = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Leverandør lagt til!");
        setForm({ name: "", contactPerson: "", email: "", phone: "", address: "" });
      } else {
        const error = await res.text();
        setMessage(`Feil: ${error}`);
      }
    } catch {
      setMessage("Kunne ikke koble til serveren");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-xl max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Legg til ny leverandør</h2>

      <input
        type="text"
        placeholder="Navn *"
        className="border rounded-md w-full px-3 py-2 mb-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Kontaktperson *"
        className="border rounded-md w-full px-3 py-2 mb-3"
        value={form.contactPerson}
        onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="E-post *"
        className="border rounded-md w-full px-3 py-2 mb-3"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Telefonnummer *"
        className="border rounded-md w-full px-3 py-2 mb-3"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Adresse (valgfritt)"
        className="border rounded-md w-full px-3 py-2 mb-4"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Lagre
      </button>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </form>
  );
}
