"use client";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Result} from "@/types/result"

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email.trim() || !password.trim()) {
            setError("E-post og passord må fylles ut.");
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

            localStorage.setItem("user", JSON.stringify(data.data)); 
            navigate("/home"); 
        } catch (err) {
            console.error(err);
            setError("Kunne ikke koble til serveren.");
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

                <p className="text-center text-sm text-gray-600 mt-4">
                    Har du ikke konto?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Registrer deg
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
