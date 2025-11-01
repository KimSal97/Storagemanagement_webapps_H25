"use client";
import React, { useState } from "react"
import type { Result } from "@/types/result"; 

type RegisterResponse = {
  id: string;
  username: string;
  email: string;
};

const Registerpage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")
        setSuccess("")
        setLoading(true)

        if (!username.trim()) {
            setError("Brukernavn-felt mangler")
            return;
        }

        if (!email.trim()) {
            setError("E-mail mangler")
            return;
        }

        if (!password.trim()) {
            setError("Passord mangler")
            return;
        }

        try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data: Result<RegisterResponse> = await response.json();

      if (!data.success) {
        setError(data.error?.message ?? "Noe gikk galt under registrering");
        return;
      }

      setSuccess(`Bruker opprettet: ${data.data.username}`);
    } catch (err) {
      setError("Kunne ikke koble til serveren.");
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Opprett konto
                </h2>

                {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
                {success && <div className="text-green-600 text-sm mb-3">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Brukernavn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Bekreft passord"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white py-2 rounded-lg transition duration-200 ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Registrerer..." : "Registrer"}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Registerpage;
