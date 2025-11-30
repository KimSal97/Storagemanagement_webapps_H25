"use client";

type Props = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
};

export default function ProductFormField({
  label,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
}
