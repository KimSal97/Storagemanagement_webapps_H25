"use client";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { SalesData, OrderStats } from "./StatisticsTypes";

export default function ExportButtons({ salesData, orderStats }: { salesData: SalesData[]; orderStats: OrderStats[] }) {
  const exportCSV = () => {
    const wb = utils.book_new();
    utils.book_append_sheet(wb, utils.json_to_sheet(salesData), "Sales");
    utils.book_append_sheet(wb, utils.json_to_sheet(orderStats), "Orders");
    writeFile(wb, "rapport.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rapport – Statistikk", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Produkt", "Antall solgt"]],
      body: salesData.map((d) => [d.product, d.quantity]),
    });
    doc.save("rapport.pdf");
  };

  return (
    <div className="flex gap-3 justify-end">
      <button onClick={exportCSV} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Eksporter til CSV
      </button>
      <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
        Eksporter til PDF
      </button>
    </div>
  );
}
