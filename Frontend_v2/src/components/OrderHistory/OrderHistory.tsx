"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import OrderTable from "./OrderTable";
import OrderFilter from "./OrderFilter";
import OrderSort from "./OrderSort";
import { OrderHistoryTypes, OrderStatus } from "./OrderHistoryTypes";
import OrderDetailsModal from "./OrderDetailsModal";

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderHistoryTypes[]>([]);
  const [sortBy, setSortBy] = useState("nyest");
  const [filterStatus, setFilterStatus] = useState<OrderStatus[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryTypes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // SORTERING
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "eldst") return a.createdAt.localeCompare(b.createdAt);
    if (sortBy === "nyest") return b.createdAt.localeCompare(a.createdAt);
    return 0;
  });

  // FILTER
  const filteredOrders =
    filterStatus.length > 0
      ? sortedOrders.filter((o) => filterStatus.includes(o.status))
      : sortedOrders;

  const handleOrderClick = (order: OrderHistoryTypes) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

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

        <OrderTable orders={filteredOrders} onOrderClick={handleOrderClick} />

        {isModalOpen && selectedOrder && (
          <OrderDetailsModal order={selectedOrder} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
