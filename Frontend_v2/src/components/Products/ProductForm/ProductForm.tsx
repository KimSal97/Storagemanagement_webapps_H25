"use client";

import ProductFormField from "./ProductFormField";
import type { Product } from "@/components/Products/ProductTypes";

type Props = {
  form: Product;
  onChange: (key: keyof Product, value: any) => void;
};

export default function ProductForm({ form, onChange }: Props) {
  return (
    <div className="space-y-4">

      <ProductFormField
        label="Navn"
        value={form.name}
        onChange={(v) => onChange("name", v)}
      />

      <ProductFormField
        label="Kategori"
        value={form.category}
        onChange={(v) => onChange("category", v)}
      />

      <div className="grid grid-cols-2 gap-4">
        <ProductFormField
          label="Lagerbeholdning"
          type="number"
          value={form.stock}
          onChange={(v) => onChange("stock", Number(v))}
        />

        <ProductFormField
          label="Minimum beholdning"
          type="number"
          value={form.minStock}
          onChange={(v) => onChange("minStock", Number(v))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ProductFormField
          label="Maksimum beholdning"
          type="number"
          value={form.maxStock}
          onChange={(v) => onChange("maxStock", Number(v))} // 👈 NY
        />
      </div>

      <ProductFormField
        label="Pris (kr)"
        type="number"
        value={form.price}
        onChange={(v) => onChange("price", Number(v))}
      />

      <ProductFormField
        label="Leverandør"
        value={form.supplier}
        onChange={(v) => onChange("supplier", v)}
      />

      <ProductFormField
        label="Lokasjon"
        value={form.location}
        onChange={(v) => onChange("location", v)}
      />

      <ProductFormField
        label="Bilde-URL"
        value={form.image}
        onChange={(v) => onChange("image", v)}
      />

    </div>
  );
}
