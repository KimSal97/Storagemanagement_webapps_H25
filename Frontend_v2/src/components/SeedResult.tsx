// src/app/components/SeedResult.tsx
'use client';
import { useEffect, useState } from "react";

export default function SeedResult() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Laster data...</p>;

  return (
    <div className="p-4 border rounded bg-gray-100">
      <h2>📊 Database status</h2>
      <p>Antall brukere: {data.users}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
