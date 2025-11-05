"use client";

interface ProductCardProps {
    title: string;
    price: number;
    image: string;
    baseStock?: number;
    minimumStock?: number;
    dailySales?: number;
    supplyTimeDays?: number;
    Status: "good | warning | critical";
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
        <div>ProductCard</div>
    );
}