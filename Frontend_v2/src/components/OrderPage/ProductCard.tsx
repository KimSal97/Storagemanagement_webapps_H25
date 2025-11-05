"use client";

interface ProductCardProps {
    title: string;
    price: number;
    image: string;
    baseStock: number;
    minimumStock: number;
    dailySales: number;
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
    supplyTimeDays = 7,
    Status
}: ProductCardProps) { 

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mb-6">
            <div className="flex justify between items-center mb-4">
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
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">minimumStock</span>
                    <span className="font-semibold">{minimumStock}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">dailySales</span>
                    <span className="font-semibold">{dailySales}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">supplyTimeDays</span>
                    <span className="font-semibold">{supplyTimeDays}</span>
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