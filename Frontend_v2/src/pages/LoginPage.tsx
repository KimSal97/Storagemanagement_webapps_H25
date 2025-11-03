"use client";
import React, { useState } from "react";
import type { Result } from "../types/result";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Fyll inn e-post og passord");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: Result<any> = await response.json();

      if (!data.success) {
        setError(data.error.message);
        return;
      }

      navigate("/");
    } catch {
      setError("Kunne ikke koble til serveren");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Logg inn
        </h2>

        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
          />
          <input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg transition duration-200 ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
          >
            {loading ? "Logger inn..." : "Logg inn"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Har du ingen konto?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            <a href="/register" className="text-blue-600 hover:underline">
             Registrer deg her
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
