export default function OrderSort({
  sortBy,
  setSortBy,
}: {
  sortBy: string;
  setSortBy: (s: string) => void;
}) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border rounded-lg px-3 py-2 text-sm"
    >
      <option value="nyest">Nyeste først</option>
      <option value="eldst">Eldste først</option>
    </select>
  );
}
