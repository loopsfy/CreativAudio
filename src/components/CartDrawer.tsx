import { useStore } from "@nanostores/react";
import { useEffect, Fragment } from "react";
import {
  $cartOpen,
  $cartItems,
  $cartCount,
  $cartTotal,
  $cartLoading,
  removeFromCart,
  updateQuantity,
  getCheckoutUrl,
  initCart,
} from "../stores/cart";
import { ORBITAL_VARIANTS } from "../lib/shopify";

const VARIANT_IMAGES: Record<string, string> = {
  [ORBITAL_VARIANTS.basic]: "https://cdn.shopify.com/s/files/1/1030/1797/2049/files/Variant_1.png?v=1776706194",
  [ORBITAL_VARIANTS.bundle]: "https://cdn.shopify.com/s/files/1/1030/1797/2049/files/Variant_2.png?v=1776706194",
};

const BUNDLE_EXTRAS = [
  { name: "+500 Samples Collection", image: "https://cdn.shopify.com/s/files/1/1030/1797/2049/files/5_melody_loops.png?v=1776523199" },
  { name: "$20 Gift Card", image: "https://cdn.shopify.com/s/files/1/1030/1797/2049/files/Diseno_sin_titulo_31.png?v=1776597518" },
];

export default function CartDrawer() {
  const isOpen = useStore($cartOpen);
  const items = useStore($cartItems);
  const count = useStore($cartCount);
  const total = useStore($cartTotal);
  const loading = useStore($cartLoading);

  // Restore Shopify cart on mount
  useEffect(() => {
    initCart();
  }, []);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          onClick={() => $cartOpen.set(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E7] bg-[#F0F0F2]">
          <h2 className="text-lg font-semibold text-[#111111]">
            Your Cart ({count})
          </h2>
          <button
            onClick={() => $cartOpen.set(false)}
            className="text-[#888888] hover:text-[#111111] transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <span className="text-5xl">🛒</span>
              <p className="text-[#888888] text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => {
                const isBundle = item.id === ORBITAL_VARIANTS.bundle;
                return (
                  <Fragment key={item.id}>
                    <div className="flex gap-4">
                      {/* Product image */}
                      <img
                        src={VARIANT_IMAGES[item.id] || "/orbital-plugin.webp"}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-[#111111]">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#888888]">
                            Audio Synthesizer Plugin
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center gap-2 border border-[#E5E5E7] rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={loading}
                              className="px-2.5 py-1 text-sm text-[#555555] hover:text-[#111111] disabled:opacity-50"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium text-[#111111] min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={loading}
                              className="px-2.5 py-1 text-sm text-[#555555] hover:text-[#111111] disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-semibold text-[#111111]">
                              ${item.price * item.quantity}
                            </span>
                            {item.quantity === 1 && (
                              <span className="text-sm text-[#999999] line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={loading}
                        className="text-[#CCCCCC] hover:text-[#FF5C00] transition-colors self-start text-lg disabled:opacity-50"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Bundle extras — visual only, delivered via Shopify Digital Downloads */}
                    {isBundle && BUNDLE_EXTRAS.map((extra) => (
                      <div key={extra.name} className="flex gap-4 pl-4 -mt-3">
                        <img
                          src={extra.image}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover shrink-0 border border-[#E5E5E7]"
                        />
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-[#111111]">{extra.name}</h4>
                            <p className="text-xs text-[#888888]">Bonus included</p>
                          </div>
                          <span className="text-xs font-semibold text-[#FF5C00] tracking-[1px] uppercase">Included</span>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E5E5E7] px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#555555]">Subtotal</span>
              <span className="text-lg font-semibold text-[#111111]">
                ${total}
              </span>
            </div>
            <button
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).fbq) {
                  (window as any).fbq("track", "InitiateCheckout", {
                    content_name: "Orbital",
                    content_type: "product",
                    value: total,
                    currency: "USD",
                  });
                }
                // GA4: begin_checkout event
                if (typeof window !== "undefined" && (window as any).gtag) {
                  (window as any).gtag("event", "begin_checkout", {
                    currency: "USD",
                    value: total,
                    items: items.map((item) => ({
                      item_id: item.id,
                      item_name: item.name,
                      price: item.price,
                      quantity: item.quantity,
                    })),
                  });
                }
                window.location.href = getCheckoutUrl();
              }}
              className="w-full py-3.5 rounded-md bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-semibold text-[15px] tracking-[0.5px] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              CHECKOUT
            </button>
            <p className="text-xs text-[#999999] text-center">
              You'll be redirected to secure checkout
            </p>
            {/* Payment icons */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {/* Visa */}
              <svg viewBox="0 0 48 32" width="38" height="24" className="opacity-50">
                <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E5E7"/>
                <path d="M21.2 12.3l-2.9 7.4h-2.1l-1.4-5.9c-.1-.3-.2-.5-.5-.6-.5-.3-1.3-.5-2-.7l.1-.2h3.3c.4 0 .8.3.9.8l.8 4.4 2.1-5.2h2.1zm8.3 5c0-2-2.7-2.1-2.7-3 0-.3.3-.5.7-.6.6 0 1.2.1 1.7.3l.3-1.5c-.5-.2-1.2-.4-2-.4-2.1 0-3.6 1.1-3.6 2.8 0 1.2 1.1 1.9 1.9 2.3.8.4 1.1.7 1.1 1 0 .6-.7.8-1.3.8-.6 0-1.3-.1-1.9-.4l-.3 1.5c.7.3 1.4.4 2.1.4 2.3.1 3.7-1 3.7-2.8l.3-.4zm5.7 2.4h1.8l-1.6-7.4h-1.7c-.4 0-.7.2-.8.5l-3 6.9h2.1l.4-1.1h2.5l.3 1.1zm-2.2-2.7l1-2.9.6 2.9h-1.6zM24 12.3l-1.6 7.4h-2l1.7-7.4h1.9z" fill="#1A1F71"/>
              </svg>
              {/* Mastercard */}
              <svg viewBox="0 0 48 32" width="38" height="24" className="opacity-50">
                <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E5E7"/>
                <circle cx="19" cy="16" r="7" fill="#EB001B"/>
                <circle cx="29" cy="16" r="7" fill="#F79E1B"/>
                <path d="M24 10.8a7 7 0 0 1 0 10.4 7 7 0 0 1 0-10.4z" fill="#FF5F00"/>
              </svg>
              {/* Amex */}
              <svg viewBox="0 0 48 32" width="38" height="24" className="opacity-50">
                <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E5E7"/>
                <rect x="4" y="6" width="40" height="20" rx="2" fill="#2E77BC"/>
                <text x="24" y="18" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="Arial">AMEX</text>
              </svg>
              {/* PayPal */}
              <svg viewBox="0 0 48 32" width="38" height="24" className="opacity-50">
                <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E5E7"/>
                <g transform="translate(10, 4) scale(1.5)">
                  <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l.692-4.386-.021.138a.7.7 0 0 1 .69-.593h1.44c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.035-.18.059-.347.073-.503z" fill="#253B80"/>
                  <path d="M6.543 8.82a.7.7 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016q.326.186.548.438c.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.87.87 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.35.35 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214z" fill="#179BD7"/>
                  <path d="M6.543 8.82l.845-5.214A.7.7 0 0 1 8.08 3.02h1.444c.584 0 1.126.06 1.614.178a4.4 4.4 0 0 1 .922.35c.263.14.488.303.68.49-.19-1.216-.001-2.044.657-2.793C14.06.356 15.376 0 17.062 0h4.891a.7.7 0 0 1 .691.59l2.037 12.918a.42.42 0 0 1-.415.486h-2.98l-.748-4.742-.662 4.256a.87.87 0 0 1-.863.734h-2.545a.106.106 0 0 1-.105-.123l.208-1.32" fill="#222D65" opacity="0"/>
                </g>
              </svg>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className="opacity-40 ml-1">
                <path d="M12 7H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z" stroke="#999" strokeWidth="1.5"/>
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
