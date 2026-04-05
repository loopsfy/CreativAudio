import { atom, computed } from "nanostores";
import {
  createCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  getCart,
  ORBITAL_VARIANT_ID,
} from "../lib/shopify";

export interface CartItem {
  id: string;
  lineId: string; // Shopify cart line ID
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

export const $cartItems = atom<CartItem[]>([]);
export const $cartOpen = atom(false);
export const $cartLoading = atom(false);

// Shopify cart ID persisted in localStorage
const $shopifyCartId = atom<string | null>(null);
const $checkoutUrl = atom<string | null>(null);

export const $cartCount = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const $cartTotal = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export function getCheckoutUrl(): string {
  return $checkoutUrl.get() || "https://creativ-audio.myshopify.com/cart/53297424367953:1";
}

function saveCartId(cartId: string) {
  $shopifyCartId.set(cartId);
  if (typeof window !== "undefined") {
    localStorage.setItem("shopify_cart_id", cartId);
  }
}

function getStoredCartId(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("shopify_cart_id");
  }
  return null;
}

function syncCartFromShopify(cart: any) {
  if (!cart) return;
  $checkoutUrl.set(cart.checkoutUrl);
  const items: CartItem[] = cart.lines.edges.map((edge: any) => ({
    id: "orbital",
    lineId: edge.node.id,
    name: edge.node.merchandise.product.title,
    price: 49,
    originalPrice: 119,
    quantity: edge.node.quantity,
  }));
  $cartItems.set(items);
}

// Restore cart from localStorage on page load
export async function initCart() {
  const storedId = getStoredCartId();
  if (storedId) {
    try {
      const cart = await getCart(storedId);
      if (cart && cart.lines.edges.length > 0) {
        $shopifyCartId.set(storedId);
        syncCartFromShopify(cart);
        return;
      }
    } catch {
      // Cart expired or invalid, will create new one on add
    }
    localStorage.removeItem("shopify_cart_id");
  }
}

export async function addToCart() {
  $cartLoading.set(true);
  try {
    const cartId = $shopifyCartId.get();
    let cart;

    if (cartId) {
      // Add line to existing cart
      cart = await addCartLines(cartId, ORBITAL_VARIANT_ID, 1);
    } else {
      // Create new cart
      cart = await createCart(ORBITAL_VARIANT_ID, 1);
      saveCartId(cart.id);
    }

    syncCartFromShopify(cart);
    $cartOpen.set(true);
  } catch (error) {
    console.error("Error adding to cart:", error);
    // Fallback: add locally so UX doesn't break
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
        { id: "orbital", lineId: "", name: "Orbital", price: 49, originalPrice: 119, quantity: 1 },
      ]);
    }
    $cartOpen.set(true);
  } finally {
    $cartLoading.set(false);
  }
}

export async function removeFromCart(id: string) {
  const item = $cartItems.get().find((i) => i.id === id);
  const cartId = $shopifyCartId.get();

  if (cartId && item?.lineId) {
    try {
      $cartLoading.set(true);
      const cart = await removeCartLines(cartId, [item.lineId]);
      syncCartFromShopify(cart);
      return;
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      $cartLoading.set(false);
    }
  }

  // Fallback
  $cartItems.set($cartItems.get().filter((i) => i.id !== id));
}

export async function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    await removeFromCart(id);
    return;
  }

  const item = $cartItems.get().find((i) => i.id === id);
  const cartId = $shopifyCartId.get();

  if (cartId && item?.lineId) {
    try {
      $cartLoading.set(true);
      const cart = await updateCartLines(cartId, item.lineId, quantity);
      syncCartFromShopify(cart);
      return;
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      $cartLoading.set(false);
    }
  }

  // Fallback
  $cartItems.set(
    $cartItems.get().map((i) => (i.id === id ? { ...i, quantity } : i))
  );
}
