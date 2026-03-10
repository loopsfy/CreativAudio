import { useStore } from "@nanostores/react";
import { $cartOpen, $cartCount } from "../stores/cart";

export default function CartButton() {
  const count = useStore($cartCount);

  return (
    <button
      onClick={() => $cartOpen.set(true)}
      className="relative text-[#555555] hover:text-[#111111] transition-colors"
      aria-label="Open cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
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
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#FF5C00] text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full min-w-[18px] min-h-[18px]">
          {count}
        </span>
      )}
    </button>
  );
}
