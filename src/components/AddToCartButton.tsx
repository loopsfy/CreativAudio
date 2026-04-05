import { useState } from "react";
import { addToCart, $cartLoading } from "../stores/cart";
import { useStore } from "@nanostores/react";

export default function AddToCartButton() {
  const [added, setAdded] = useState(false);
  const loading = useStore($cartLoading);

  async function handleClick() {
    if (loading) return;

    await addToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);

    // Meta Pixel: AddToCart event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "AddToCart", {
        content_name: "Orbital",
        content_type: "product",
        value: 49,
        currency: "USD",
      });
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-full inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-[15px] font-semibold text-white tracking-[1px] transition-all duration-300 ${
        added
          ? "bg-green-500 scale-[1.02]"
          : loading
          ? "bg-gray-400 cursor-wait"
          : "bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] hover:opacity-90"
      }`}
    >
      {added ? (
        <>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          ADDED!
        </>
      ) : loading ? (
        "ADDING..."
      ) : (
        <>
          ADD TO CART
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </>
      )}
    </button>
  );
}
