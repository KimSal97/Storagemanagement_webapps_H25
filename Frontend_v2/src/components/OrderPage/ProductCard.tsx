"use client";

import { Sliders } from "lucide-react";
import ProductCardSlider from "./ProductCardSlider";
import React from "react";

interface ProductCardProps {
    title: string;
    price: number;
    image?: string;
    baseStock: number;
    minimumStock: number;
    dailySales: number;
    supplyTimeDays?: number;
    Status: "good" | "warning" | "critical";
}

export default function ProductCard({
    title,
    price,
    image = "src/app/shared/missing.png",
    baseStock,
    minimumStock,
    dailySales,
    supplyTimeDays = 7,
    Status
}: ProductCardProps) {
    const [sliderValue, setSliders] = React.useState({
        baseStock: baseStock,
        minimumStock: minimumStock,
        dailySales: dailySales,
        supplyTimeDays: supplyTimeDays,
    });
      const handleSliderChange = (name: keyof typeof sliderValue, value: number) => {
    setSliders(prev => ({
      ...prev,
      [name]: value,
    }));
  }; 

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mb-6">
            <div className="flex gap-4 items-center mb-4">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full rounded"
                />
            </div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Manage
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">baseStock</span>
                    <span className="font-semibold">{baseStock}</span>
                    <ProductCardSlider value={sliderValue}/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">minimumStock</span>
                    <span className="font-semibold">{minimumStock}</span>
                    <ProductCardSlider/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">dailySales</span>
                    <span className="font-semibold">{dailySales}</span>
                    <ProductCardSlider/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">supplyTimeDays</span>
                    <span className="font-semibold">{supplyTimeDays}</span>
                    <ProductCardSlider/>
                </div>
            </div>
            <div className="mt-4 flex items-center">
                <span className="text-xl font-bold text-gray-800">Status: </span>
                <span className={`font-medium ml-2 ${
                    Status === "good" ? "text-green-600" :
                    Status === "warning" ? "text-yellow-600" :
                    "text-red-600"
                }`}>{Status}
                </span>
            </div>
        </div>
    );
}