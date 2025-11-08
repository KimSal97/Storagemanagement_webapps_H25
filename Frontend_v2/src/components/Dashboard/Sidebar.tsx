// src/components/Dashboard/Sidebar.tsx
"use client";
import { LayoutDashboard, Package, BarChart3, Clock, Star, Settings, ChevronDown, LogOut} from "lucide-react";
import { navigate } from "rwsdk/client";import { useState } from "react";

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
    { id: "dashboard", label: "Dashbord", icon: LayoutDashboard, href: "/dashboard"},
    { id: "products", label: "Produkter", icon: Package, href: "/products"},
    { id: "orderHistory", label: "Bestillingshistorikk", icon: Clock, href: "/orderHistory"},
    { id: "statistics", label: "Statistikk", icon: BarChart3, href: "/statistics"},
    { id: "suppliers", label: "Leverandører", icon: Star, href: "/suppliers"},
    { id: "settings", label: "Innstillinger", icon: Settings, href: "/settings"},
  ];

  return (
    <aside className="w-64 bg-blue-500 text-white flex flex-col min-h-screen">
      <div className="p-4 border-b border-blue-400">
        <h2 className="text-lg font-semibold">Storagemanagement</h2>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map(({ id, label, icon: Icon, href }) => (
          <button
            key={id}
            onClick={() => {
              setActive(id);
              navigate(href);
            }}
            className={`w-full flex items-center justify-start gap-2 px-3 py-2 rounded-md transition ${
              active === id
                ? "bg-blue-400 text-white"
                : "text-blue-50 hover:bg-blue-400 hover:text-white"
            }`}>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                active === id ? "rotate-180" : "opacity-0"
              }`}
            />
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-3 text-blue-100 hover:text-white hover:bg-blue-400 border-t border-blue-400 cursor-pointer">
        <LogOut size={18} /> Logg ut
      </button>
    </aside>
  );
}