"use client";

import type { Product } from "@/components/Products/ProductTypes";

type CartItem = {
  productId: string;
  orderedQty: number;
  unitCost: number;
};

type Props = {
  cart: CartItem[];
  products: Product[];
  onRemove: (id: string) => void;
  onSubmit: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
};

export default function CartBox({
  cart,
  products,
  onRemove,
  onSubmit,
  onIncrease,
  onDecrease,
}: Props) {
  const total = cart.reduce(
    (sum, item) => sum + item.orderedQty * item.unitCost,
    0
  );

  return (
    <div className="fixed right-8 top-24 w-80 bg-white shadow-xl rounded-2xl p-4 border z-50">
      <h2 className="text-xl font-semibold mb-4">Handlekurv</h2>

      {cart.length === 0 && (
        <p className="text-gray-500">Handlekurven er tom.</p>
      )}
      {cart.length > 0 && (
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {cart.map((item) => {
            const product = products.find((p) => p.id === item.productId);

            return (
              <div
                key={item.productId}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-lg font-bold">
                    {product?.name?.[0] ?? "?"}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium">{product?.name}</span>
                    <span className="text-sm text-gray-600">
                      {item.orderedQty} stk
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDecrease(item.productId)}
                    className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    disabled={item.orderedQty <= 1}
                  >
                    -
                  </button>

                  <button
                    onClick={() => onIncrease(item.productId)}
                    className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onRemove(item.productId)}
                  className="text-red-600 hover:text-red-800 text-sm ml-2"
                >
                  Fjern
                </button>
              </div>
            );
          })}
        </div>
      )}

      {cart.length > 0 && (
        <>
          <div className="flex justify-between items-center font-semibold mt-4">
            <span>Total:</span>
            <span>{total.toFixed(2)} kr</span>
          </div>

          <button
            onClick={onSubmit}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
          >
            Send bestilling
          </button>
        </>
      )}
    </div>
  );
}
