"use client";
import { OrderHistoryTypes } from "./OrderHistoryTypes";

type Props = {
  order: OrderHistoryTypes;
  onClose: () => void;
};

export default function OrderDetailsModal({ order, onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Detaljer for ordre #{order.id}</h2>

        <div className="space-y-2">
          <p><strong>Dato:</strong> {order.date}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Leverandør:</strong> {order.supplier}</p>
          <p><strong>Totalt beløp:</strong> {order.total} kr</p>
        </div>

        <hr className="my-4" />

        <h3 className="font-medium mb-2">Produkter:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {order.items?.map((item, idx) => (
            <li key={idx}>
              {item.name} – {item.quantity} stk
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
