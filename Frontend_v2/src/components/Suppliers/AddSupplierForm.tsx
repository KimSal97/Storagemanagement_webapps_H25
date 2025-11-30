"use client";

import { useState } from "react";
import type { SuppliersTypes } from "./SuppliersTypes";

export default function AddSupplierForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: SuppliersTypes | null;
  onSave: (data: SuppliersTypes) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<SuppliersTypes>({
    id: initialData?.id ?? "",
    name: initialData?.name ?? "",
    contact_person: initialData?.contact_person ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    address: initialData?.address ?? "",
    status: initialData?.status ?? "Aktiv",
  });

  const update = (key: keyof SuppliersTypes, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => onSave(form);

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow max-w-md border">
      <div>
        <label className="block text-sm font-medium mb-1">Leverandørnavn</label>
        <input
          className="w-full border rounded-lg p-2"
          value={form.name ?? ""}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Kontaktperson</label>
        <input
          className="w-full border rounded-lg p-2"
          value={form.contact_person ?? ""}
          onChange={(e) => update("contact_person", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">E-post</label>
        <input
          className="w-full border rounded-lg p-2"
          type="email"
          value={form.email ?? ""}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telefon</label>
        <input
          className="w-full border rounded-lg p-2"
          value={form.phone ?? ""}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Adresse</label>
        <input
          className="w-full border rounded-lg p-2"
          value={form.address ?? ""}
          onChange={(e) => update("address", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          className="w-full border rounded-lg p-2"
          value={form.status ?? "Aktiv"}
          onChange={(e) => update("status", e.target.value as any)}
        >
          <option value="Aktiv">Aktiv</option>
          <option value="Inaktiv">Inaktiv</option>
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {initialData ? "Oppdater" : "Lagre"}
        </button>

        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Avbryt
        </button>
      </div>
    </div>
  );
}
