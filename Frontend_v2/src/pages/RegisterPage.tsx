"use client";
import React, { useState } from "react";
import type { Result } from "@/types/result";
import { navigate } from "rwsdk/client";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation criteria
  const validateEmail = (email: string) => {
    const hasAt = email.includes("@");
    const hasDot = email.includes(".");
    const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return hasAt && hasDot && validFormat;
  };

  const isEmailValid = email.trim() === "" || validateEmail(email);

  // Måler Passordstyrke basert på criteria
  // små bokstaver, store bokstaver, tall, spesialtegn, lengde.
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 1) return { strength: 1, label: "Svak", color: "bg-red-500" };
    if (strength === 2) return { strength: 2, label: "Middels", color: "bg-yellow-500" };
    if (strength === 3) return { strength: 3, label: "God", color: "bg-blue-500" };
    return { strength: 4, label: "Sterk", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Alle feltene må fylles ut.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Ugyldig e-postadresse.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passordene matcher ikke.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data: Result<any> = await response.json();

      if (!data.success) {
        setError(data.error.message);
        return;
      }

      setSuccess("Bruker registrert!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Kunne ikke koble til serveren.");
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
          Opprett konto
        </h1>
        <p className="text-center text-sm text-[#4B76DB] mb-8 font-medium">
          Lag en ny brukerkonto
        </p>
        {error && (
          <div className="text-red-500 text-sm mb-3 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-sm mb-3 text-center">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Brukernavn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full border border-[#94B3B9] rounded-lg px-4 py-2 
              bg-white focus:ring-2 focus:ring-[#4B76DB] outline-none
            "
          />
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              w-full border rounded-lg px-4 py-2 
              bg-white focus:ring-2 outline-none transition
              ${
                isEmailValid
                  ? "border-[#94B3B9] focus:ring-[#4B76DB]"
                  : "border-red-500 focus:ring-red-500 bg-red-50"
              }
            `}
          />
            {!isEmailValid && email.trim() !== "" && (
            <p className="text-xs text-red-500 mt-1">
              E-postadressen må inneholde @ og top domenenavn.
            </p>
          )}
          <div>
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
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        level <= passwordStrength.strength
                          ? passwordStrength.color
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Passordstyrke:{" "}
                  <span className="font-medium">{passwordStrength.label}</span>
                </p>
              </div>
            )}
          </div>
          <input
            type="password"
            placeholder="Bekreft passord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
              w-full border border-[#94B3B9] rounded-lg px-4 py-2 mb-2
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
            {loading ? "Registrerer..." : "Registrer"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Har du allerede en konto?
          <span
            onClick={() => navigate("/login")}
            className="ml-1 text-[#4B76DB] cursor-pointer hover:underline"
          >
            Logg inn her
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
