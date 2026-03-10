import { atom, computed } from "nanostores";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

export const $cartItems = atom<CartItem[]>([]);
export const $cartOpen = atom(false);

export const $cartCount = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const $cartTotal = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export function addToCart() {
  const items = $cartItems.get();
  const existing = items.find((i) => i.id === "orbital");
  if (existing) {
    $cartItems.set(
      items.map((i) =>
        i.id === "orbital" ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  } else {
    $cartItems.set([
      ...items,
      {
        id: "orbital",
        name: "Orbital",
        price: 49,
        originalPrice: 119,
        quantity: 1,
      },
    ]);
  }
  $cartOpen.set(true);
}

export function removeFromCart(id: string) {
  $cartItems.set($cartItems.get().filter((i) => i.id !== id));
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  $cartItems.set(
    $cartItems.get().map((i) => (i.id === id ? { ...i, quantity } : i))
  );
}
