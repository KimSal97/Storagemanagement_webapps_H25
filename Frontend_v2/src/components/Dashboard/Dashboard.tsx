// src/components/Dashboard/Dashboard.tsx
"use client";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Lorem ipsum
          </p>
        </main>
      </div>
    </div>
  );
}
