"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { SalesData } from "./StatisticsTypes";

export default function SalesChart({ data }: { data: SalesData[] }) {
  console.log("SalesChart data:", data);
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">Salg over tid</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}