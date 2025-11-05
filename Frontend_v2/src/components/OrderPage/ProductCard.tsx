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
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img src={image} alt={title} className="w-32 h-32 object-cover mb-4" />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">${price.toFixed(2)}</p>
        </div>
    );
}