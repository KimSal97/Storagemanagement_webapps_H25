"use client";

export default function ProductCardSlider() { 
    return (
    <>
        <div>
            <label htmlFor="productCardSlider" className="block mb-2 text-sm font-medium text-gray-900">Product Card Slider</label>
            <input type="range" id="productCardSlider" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        </div>
    </>)
}