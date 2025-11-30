"use client";
import { useState } from "react";

export default function PreferenceSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);

  return (
    <section className="bg-white shadow rounded-xl p-6 border border-[#D9E4F2]">
      <h2 className="text-xl font-semibold text-[#2E374B] mb-4">Preferanser</h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Mørkt tema
        </label>

        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            checked={lowStockAlerts}
            onChange={() => setLowStockAlerts(!lowStockAlerts)}
          />
          Varsle ved lav beholdning
        </label>
      </div>
    </section>
  );
}
