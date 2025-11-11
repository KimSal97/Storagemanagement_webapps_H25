"use client";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Ugyldig eller manglende token.");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });

    if (res.ok) setMessage("Passordet er oppdatert! Du kan nå logge inn.");
    else setError("Kunne ikke oppdatere passordet. Prøv igjen.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Tilbakestill passord</h2>
        <input
          type="password"
          placeholder="Nytt passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Lagre nytt passord
        </button>
        {message && <p className="text-green-600 mt-3 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
      </form>
    </div>
  );
}
