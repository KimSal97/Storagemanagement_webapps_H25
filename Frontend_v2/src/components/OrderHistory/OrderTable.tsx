import OrderRow from "./OrderRow";
import { OrderHistoryTypes } from "./OrderHistoryTypes";

export default function OrderTable({
  orders,
  onOrderClick,
}: {
  orders: OrderHistoryTypes[];
  onOrderClick: (order: OrderHistoryTypes) => void;
}) {
  return (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3 text-sm font-semibold">ID</th>
          <th className="p-3 text-sm font-semibold">Dato</th>
          <th className="p-3 text-sm font-semibold">Status</th>
          <th className="p-3 text-sm font-semibold">Totalpris</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} onClick={() => onOrderClick(order)} />
        ))}
      </tbody>
    </table>
  );
}
