"use client";

interface ProductCardProps {
    title: string;
    price: number;
    image: string;
    baseStock?: number;
    minimumStock?: number;
    dailySales?: number;
    supplyTimeDays?: number;
    Status: "good" | "warning" | "critical";
}

export default function ProductCard({
    title,
    price,
    image,
    baseStock,
    minimumStock,
    dailySales,
    supplyTimeDays,
    Status
}: ProductCardProps) { 

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
            <div className="flex justify between items-center w-full mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Manage
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">baseStock</span>
                    <span className="font-semibold">{baseStock}</span>
                </div>
            </div>
        </div>
    );
}