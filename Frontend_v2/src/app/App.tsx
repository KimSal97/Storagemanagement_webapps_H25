"use client";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterPage from "@/pages/RegisterpageTEMP";
import LoginPage from "@/pages/LoginPage";
import OrderPage from "@/pages/OrderPage";

// Denne komponenten rendres både på server (RWSDK) og klient
export default function App() {
  // Det finnes bare "window" i browseren
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) {
    // Hvis vi er på server, ikke bruk BrowserRouter
    const { StaticRouter } = require("react-router-dom/server");
    return (
      <StaticRouter location="/">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order" element= {<OrderPage />} />
        </Routes>
      </StaticRouter>
    );
  }

  // 🚀 I browseren — bruk BrowserRouter
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element= {<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
