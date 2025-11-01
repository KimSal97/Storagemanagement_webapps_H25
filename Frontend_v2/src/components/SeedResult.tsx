'use client';
import { useEffect, useState } from "react";
import type { User } from "@/db/schema/user-schema";

type HealthResponse = {
  ok: boolean;
  count: number;
  users: User[];
};

export default function SeedResult() {
  const [data, setData] = useState<HealthResponse | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/health");
        const json = (await res.json()) as HealthResponse;
        setData(json);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  if (!data) return <p>Laster data...</p>;

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="text-lg font-semibold">Database status</h2>
      <p>Antall brukere: {data.count}</p>

      <h3 className="mt-2 font-medium">Brukere:</h3>
      <ul className="list-disc ml-6">
        {data.users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>

      <pre className="text-xs mt-3 p-2 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
