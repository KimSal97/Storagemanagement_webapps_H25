"use client";

import type { ProductCardSliderProps } from "./OrderTypes";

export default function ProductCardSlider({
  label,
  value,
  min = 0,
  max = 200,
  step = 1,
  onChange,
}: ProductCardSliderProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-medium mb-1">{value}</span>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
    </div>
  );
}
