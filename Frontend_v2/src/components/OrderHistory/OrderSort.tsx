export default function OrderSort({ sortBy, setSortBy }: any) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm bg-white"
    >
      <option value="eldst">Eldst</option>
      <option value="nyest">Nyest</option>
    </select>
  );
}
