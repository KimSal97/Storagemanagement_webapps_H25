export default function SupplierRow({ supplier }: any) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium text-gray-800">{supplier.name}</td>
      <td className="px-4 py-3">{supplier.contactPerson}</td>
      <td className="px-4 py-3">{supplier.phone}</td>
      <td className="px-4 py-3 text-blue-600">{supplier.email}</td>
      <td className="px-4 py-3">{supplier.products}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            supplier.status === "Aktiv"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {supplier.status}
        </span>
      </td>
    </tr>
  );
}
