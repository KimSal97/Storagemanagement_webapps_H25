"use client";

type SliderValues = {
    baseStock: number;
    minimumStock: number;
    dailySales: number;
    supplyTimeDays: number;
};

type ProductCardSliderProps = {
    name: keyof SliderValues
    label: string;
    value: number;
    onChange: (name: keyof SliderValues, value: number) => void;
};

export default function ProductCardSlider({
    name,
    label,
    value,
    onChange,
}: ProductCardSliderProps) {
    return (
    <>
        <div className="flex flex-col">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="font-semibold">{value}</span>
            <input
                type="range"
                min="0"
                max="200"
                className="w-full"
                value={value}
                onChange={(e) => onChange(name, Number(e.target.value))}
             />
        </div>
    </>
    );
}