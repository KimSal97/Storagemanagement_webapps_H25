"use client";
import { useState } from "react";

export default function PasswordSettings() {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Passord</h2>

      <div className="flex flex-col gap-3 max-w-md">
        <input
          type="password"
          placeholder="Nåværende passord"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />

        <input
          type="password"
          placeholder="Nytt passord"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />

        <input
          type="password"
          placeholder="Bekreft nytt passord"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg self-start">
          Oppdater passord
        </button>
      </div>
    </section>
  );
}
