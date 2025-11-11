"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import OrderTable from "./OrderTable";
import OrderFilter from "./OrderFilter";
import OrderSort from "./OrderSort";
import { OrderHistoryTypes, OrderStatus } from "./OrderHistoryTypes";


export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderHistoryTypes[]>([]);
  const [sortBy, setSortBy] = useState("nyest");
  const [filterStatus, setFilterStatus] = useState<OrderStatus[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Kunne ikke hente ordrer");
        const data: OrderHistoryTypes[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Feil ved lasting av ordrer:", err);
      }
    };

    fetchOrders();
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "eldst") return a.date.localeCompare(b.date);
    if (sortBy === "nyest") return b.date.localeCompare(a.date);
    return 0;
  });

  const filteredOrders =
    filterStatus.length > 0
      ? sortedOrders.filter((o) => filterStatus.includes(o.status))
      : sortedOrders;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <OrderSort sortBy={sortBy} setSortBy={setSortBy} />
            <OrderFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
          </div>
          <input
            type="text"
            placeholder="Søk etter produkter / ordre..."
            className="border rounded-lg px-3 py-2 w-72 text-sm"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-6">Bestillingshistorikk</h1>
        <OrderTable orders={filteredOrders} />
      </div>
    </div>
  );
}
