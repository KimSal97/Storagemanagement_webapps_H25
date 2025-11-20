"use client";

import React from "react";
import ProductCardSlider from "./ProductCardSlider";
import type { OrderProduct } from "./OrderTypes";

type CartItem = {
  productId: string;
  quantity: number;
  calculatedQuantity: number;
};

export default function ProductCard({
  id,
  title,
  price,
  image = "/src/app/shared/missing.png",
  baseStock,
  minimumStock,
  dailySales,
  supplyTimeDays = 7,
  Status,
  onAddToCart,
}: OrderProduct & { onAddToCart: (item: CartItem) => void }) {
  
  const [sliderValue, setSliders] = React.useState({
    baseStock,
    minimumStock,
    dailySales,
    supplyTimeDays,
  });

  const handleSliderChange = (
    name: keyof typeof sliderValue,
    value: number
  ) => {
    setSliders((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    const quantity = sliderValue.minimumStock - sliderValue.baseStock;
    const calculatedQuantity = sliderValue.dailySales * sliderValue.supplyTimeDays;

    onAddToCart({
      productId: id,
      quantity: Math.max(quantity, 0),
      calculatedQuantity,
    });
  };

  return (
    <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
      <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-white text-xl rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between items-center px-4 pt-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <button
          onClick={handleAdd}
          className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Legg til
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 py-4">
        <ProductCardSlider
          label="baseStock"
          value={sliderValue.baseStock}
          onChange={(v) => handleSliderChange("baseStock", v)}
        />

        <ProductCardSlider
          label="minimumStock"
          value={sliderValue.minimumStock}
          max={1000}
          onChange={(v) => handleSliderChange("minimumStock", v)}
        />

        <ProductCardSlider
          label="dailySales"
          value={sliderValue.dailySales}
          onChange={(v) => handleSliderChange("dailySales", v)}
        />

        <ProductCardSlider
          label="supplyTimeDays"
          value={sliderValue.supplyTimeDays}
          max={60}
          onChange={(v) => handleSliderChange("supplyTimeDays", v)}
        />
      </div>

      <div className="px-4 pb-4">
        <span className="font-semibold text-gray-800">Status: </span>
        <span
          className={
            Status === "good"
              ? "text-green-600 font-medium"
              : Status === "warning"
              ? "text-yellow-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {Status}
        </span>
      </div>
    </div>
  );
}
