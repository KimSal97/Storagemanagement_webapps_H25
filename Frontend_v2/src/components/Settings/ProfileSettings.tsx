"use client";
import { useState } from "react";

export default function ProfileSettings() {
  const [name, setName] = useState("");

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Profil</h2>

      <div className="flex flex-col gap-3 max-w-md">
        <label className="text-sm font-medium text-gray-600">Navn</label>
        <input
          type="text"
          value={name}
          placeholder="Ditt navn"
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg self-start">
          Oppdater profil
        </button>
      </div>
    </section>
  );
}
