import OrderRow from "./OrderRow";
import { OrderTypes } from "./OrderTypes";

export default function OrderTable({ orders }: { orders: OrderTypes[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Dato</th>
            <th className="px-4 py-2">Bestilling ID</th>
            <th className="px-4 py-2">Produkt(er)</th>
            <th className="px-4 py-2">Leverandør</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
