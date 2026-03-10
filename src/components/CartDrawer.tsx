import { useStore } from "@nanostores/react";
import {
  $cartOpen,
  $cartItems,
  $cartCount,
  $cartTotal,
  removeFromCart,
  updateQuantity,
} from "../stores/cart";

export default function CartDrawer() {
  const isOpen = useStore($cartOpen);
  const items = useStore($cartItems);
  const count = useStore($cartCount);
  const total = useStore($cartTotal);

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
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E7]">
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
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Product image */}
                  <img
                    src="/orbital-plugin.png"
                    alt="Orbital"
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
                          className="px-2.5 py-1 text-sm text-[#555555] hover:text-[#111111]"
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
                          className="px-2.5 py-1 text-sm text-[#555555] hover:text-[#111111]"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-[#111111]">
                          ${item.price * item.quantity}
                        </span>
                        {item.quantity === 1 && (
                          <span className="text-xs text-[#999999] line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#CCCCCC] hover:text-[#FF5C00] transition-colors self-start text-lg"
                  >
                    &times;
                  </button>
                </div>
              ))}
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
            <button className="w-full py-3.5 rounded-md bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-semibold text-[15px] tracking-[0.5px] hover:opacity-90 transition-opacity">
              CHECKOUT
            </button>
            <p className="text-xs text-[#999999] text-center">
              You'll be redirected to secure checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
