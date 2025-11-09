@ -0,0 +1,10 @@
export default function StockIndicator({ stock, min }: { stock: number; min: number }) {
  const ratio = stock / min;
  let color = "bg-gray-400";

  if (ratio <= 1) color = "bg-red-500";
  else if (ratio <= 2) color = "bg-yellow-400";
  else color = "bg-green-500";

  return <div className={`w-3 h-3 rounded-full ${color}`}></div>;
}