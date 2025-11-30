import { OrderHistoryTypes } from "./OrderHistoryTypes";

export default function OrderRow({
  order,
  onClick,
}: {
  order: OrderHistoryTypes;
  onClick: () => void;
}) {
  return (
    <tr
      className="border-b cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <td className="p-3 text-sm">{order.id}</td>
      <td className="p-3 text-sm">
        {new Date(order.createdAt).toLocaleDateString("no-NO")}
      </td>
      <td className="p-3 text-sm capitalize">{order.status}</td>
      <td className="p-3 text-sm">{order.totalCost} kr</td>
    </tr>
  );
}
