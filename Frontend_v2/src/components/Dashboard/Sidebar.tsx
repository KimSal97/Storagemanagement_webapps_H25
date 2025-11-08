"use client";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Clock,
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import { navigate } from "rwsdk/client";
import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashbord", icon: LayoutDashboard, href: "/dashboard" },
    { id: "products", label: "Produkter", icon: Package, href: "/products" },
    { id: "orderHistory", label: "Bestillingshistorikk", icon: Clock, href: "/order-history" },
    { id: "statistics", label: "Statistikk", icon: BarChart3, href: "/statistics" },
    { id: "suppliers", label: "Leverandører", icon: Star, href: "/suppliers" },
    { id: "settings", label: "Innstillinger", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col min-h-screen">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-blue-600">StorageManagement</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(({ id, label, icon: Icon, href }) => (
          <button
            key={id}
            onClick={() => {
              setActive(id);
              navigate(href);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition cursor-pointer ${
              active === id
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }`}
          >
            <Icon size={18} />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-gray-500 hover:text-red-500 p-4 border-t cursor-pointer transition"
      >
        <LogOut size={18} /> Logg ut
      </button>
    </aside>
  );
}
