import { OrderHistoryTypes } from "./OrderHistoryTypes";

type Props = {
  orders: OrderHistoryTypes[];
  onOrderClick: (order: OrderHistoryTypes) => void;
};

export default function OrderTable({ orders, onOrderClick }: Props) {
  return (
    <table className="w-full bg-white border rounded-lg shadow-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Ordre-ID</th>
          <th className="p-3">Dato</th>
          <th className="p-3">Status</th>
          <th className="p-3">Leverandør</th>
          <th className="p-3">Beløp</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order.id}
            onClick={() => onOrderClick(order)}
            className="cursor-pointer hover:bg-gray-50 transition"
          >
            <td className="p-3">{order.id}</td>
            <td className="p-3">{order.date}</td>
            <td className="p-3">{order.status}</td>
            <td className="p-3">{order.supplier}</td>
            <td className="p-3">{order.total} kr</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
