import { OrderStatus } from "./OrderHistoryTypes";

export default function OrderFilter({
  filterStatus,
  setFilterStatus,
}: {
  filterStatus: OrderStatus[];
  setFilterStatus: (s: OrderStatus[]) => void;
}) {
  const statuses: OrderStatus[] = ["pending", "completed", "cancelled"];

  const toggle = (status: OrderStatus) => {
    if (filterStatus.includes(status)) {
      setFilterStatus(filterStatus.filter((s) => s !== status));
    } else {
      setFilterStatus([...filterStatus, status]);
    }
  };

  return (
    <div className="flex gap-2">
      {statuses.map((s) => (
        <button
          key={s}
          onClick={() => toggle(s)}
          className={`px-3 py-1 rounded-lg border text-sm ${
            filterStatus.includes(s)
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
