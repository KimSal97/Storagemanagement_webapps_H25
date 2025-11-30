import { OrderHistoryTypes } from "./OrderHistoryTypes";

export default function OrderDetailsModal({
  order,
  onClose,
}: {
  order: OrderHistoryTypes;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-xl font-bold mb-3">Ordredetaljer</h2>

        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Dato:</strong>{" "}
          {new Date(order.createdAt).toLocaleString("no-NO")}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Total:</strong> {order.totalCost} kr
        </p>

        <h3 className="font-semibold mt-4 mb-2">Produkter:</h3>
        <ul className="list-disc pl-6">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.productId} – {item.orderedQty} stk ({item.unitCost} kr/stk)
            </li>
          ))}
        </ul>

        <button
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          Lukk
        </button>
      </div>
    </div>
  );
}
