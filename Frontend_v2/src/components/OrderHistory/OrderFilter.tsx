import React from "react";

export default function OrderFilter({ filterStatus, setFilterStatus }: any) {
  const statuses = ["Mottatt", "Underveis", "Kansellert"];

  const toggleStatus = (status: string) => {
    if (filterStatus.includes(status))
      setFilterStatus(filterStatus.filter((s: string) => s !== status));
    else setFilterStatus([...filterStatus, status]);
  };

  return (
    <div className="flex gap-3">
      {statuses.map((status) => (
        <label key={status} className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={filterStatus.includes(status)}
            onChange={() => toggleStatus(status)}
          />
          {status}
        </label>
      ))}
    </div>
  );
}
