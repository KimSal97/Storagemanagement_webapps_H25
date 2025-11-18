"use client";

type ProductCardSliderProps = {
    label?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
};

export default function ProductCardSlider({
    label,
    value,
    min = 0,
    max = 200,
    step = 1,
    onChange,
}: ProductCardSliderProps) {
    return (
    <>
        <div className="flex flex-col">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="font-semibold">{value}</span>
            <input
                type="range"
                min={min}
                max={max}
                step = {step}
                className="w-full"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
             />
        </div>
    </>
    );
}