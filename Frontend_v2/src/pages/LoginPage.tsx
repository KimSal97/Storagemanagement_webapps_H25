"use client";
import React, { useState } from "react";
import type { Result } from "../types/result";
import { navigate } from "rwsdk/client";

const LoginPage = () => {
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
      navigate("/dashboard");
    } catch {
      setError("Kunne ikke koble til serveren");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#E8F0FA] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4B76DB]/20 rounded-bl-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#2E374B]/20 rounded-tr-full blur-3xl"></div>
      <div className="relative bg-white w-full max-w-md rounded-2xl p-10 shadow-xl border border-[#D9E4F2]">
        <h1 className="text-center text-3xl font-bold text-[#2E374B] tracking-wide mb-2">
          Storage Management
        </h1>
        <p className="text-center text-sm text-[#4B76DB] mb-8 font-medium">
          Logg inn
        </p>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full border border-[#94B3B9] rounded-lg px-4 py-2 
              bg-white focus:ring-2 focus:ring-[#4B76DB] outline-none
            "
          />
          <input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full border border-[#94B3B9] rounded-lg px-4 py-2 
              bg-white focus:ring-2 focus:ring-[#4B76DB] outline-none
            "
          />
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#4B76DB] hover:bg-[#3556A5] 
              text-white py-2 rounded-lg font-semibold
              transition shadow-sm
            "
          >
            {loading ? "Logger inn..." : "Logg inn"}
          </button>
        </form>
        <div className="flex justify-between mt-6 text-sm">
          <span
            onClick={() => navigate("/register")}
            className="text-[#4B76DB] cursor-pointer hover:underline"
          >
            Registrer bruker
          </span>
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-[#4B76DB] cursor-pointer hover:underline"
          >
            Glemt passord?
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
