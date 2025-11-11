export default function OrderRow({ order }: any) {
  const statusColors: Record<string, string> = {
    Mottatt: "text-green-600 bg-green-100",
    Underveis: "text-yellow-600 bg-yellow-100",
    Kansellert: "text-red-600 bg-red-100",
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-2">{order.date}</td>
      <td className="px-4 py-2 font-medium text-gray-800">{order.id}</td>
      <td className="px-4 py-2">
        {order.products[0]}
        {order.products.length > 1 && (
          <span className="text-gray-400"> +{order.products.length - 1}</span>
        )}
      </td>
      <td className="px-4 py-2">{order.supplier}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </td>
    </tr>
  );
}
