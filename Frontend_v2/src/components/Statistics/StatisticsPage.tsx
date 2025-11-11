"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import SalesChart from "./SalesChart";
import OrdersChart from "./OrdersChart";
import FilterBar from "./FilterBar";
import ExportButtons from "./ExportButtons";
import type { SalesData, OrderStats } from "./StatisticsTypes";

export default function StatisticsPage() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [orderStats, setOrderStats] = useState<OrderStats[]>([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", category: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/statistics");
        if (!res.ok) throw new Error("Kunne ikke hente statistikk");
        const data = await res.json();
        setSalesData(data.sales);
        setOrderStats(data.orders);
      } catch (err) {
        console.error("Feil ved henting av statistikk:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-center">Statistikk og rapporter</h1>

        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="grid md:grid-cols-2 gap-6">
          <SalesChart data={salesData} />
          <OrdersChart data={orderStats} />
        </div>

        <ExportButtons salesData={salesData} orderStats={orderStats} />
      </div>
    </div>
  );
}
