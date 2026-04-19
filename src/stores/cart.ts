import { atom, computed } from "nanostores";
import {
  createCart,
  createEmptyCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  getCart,
  ORBITAL_VARIANTS,
  type OrbitalVariantKey,
} from "../lib/shopify";

// Display metadata per variant (price comes from Shopify; originalPrice is our "compare-at" for UI)
const VARIANT_INFO: Record<string, { key: OrbitalVariantKey; name: string; originalPrice: number }> = {
  [ORBITAL_VARIANTS.basic]: { key: "basic", name: "Orbital", originalPrice: 119 },
  [ORBITAL_VARIANTS.bundle]: { key: "bundle", name: "Orbital + Origin Megapack", originalPrice: 196 },
};

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
  return $checkoutUrl.get() || "https://creativ-audio.myshopify.com/cart/53569851326801:1";
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
  const items: CartItem[] = cart.lines.edges.map((edge: any) => {
    const merchandiseId: string = edge.node.merchandise.id;
    const info = VARIANT_INFO[merchandiseId];
    const price = Number(edge.node.merchandise.priceV2?.amount) || 0;
    return {
      id: merchandiseId,
      lineId: edge.node.id,
      name: info?.name || edge.node.merchandise.product.title,
      price,
      originalPrice: info?.originalPrice ?? price,
      quantity: edge.node.quantity,
    };
  });
  $cartItems.set(items);
}

// Restore or create cart on page load (registers session in Shopify)
export async function initCart() {
  const storedId = getStoredCartId();
  if (storedId) {
    try {
      const cart = await getCart(storedId);
      if (cart) {
        $shopifyCartId.set(storedId);
        syncCartFromShopify(cart);
        return;
      }
    } catch {
      // Cart expired or invalid
    }
    localStorage.removeItem("shopify_cart_id");
  }

  // No existing cart — create empty one to register session in Shopify
  try {
    const cart = await createEmptyCart();
    if (cart) {
      saveCartId(cart.id);
    }
  } catch {
    // Silent fail — doesn't affect UX
  }
}

export async function addToCart(variant: OrbitalVariantKey = "basic") {
  $cartLoading.set(true);
  const variantId = ORBITAL_VARIANTS[variant];
  const fallbackInfo = VARIANT_INFO[variantId];
  const fallbackPrice = variant === "bundle" ? 67 : 49;
  try {
    const cartId = $shopifyCartId.get();
    let cart;

    if (cartId) {
      cart = await addCartLines(cartId, variantId, 1);
    } else {
      cart = await createCart(variantId, 1);
      saveCartId(cart.id);
    }

    syncCartFromShopify(cart);
    $cartOpen.set(true);
  } catch (error) {
    console.error("Error adding to cart:", error);
    // Fallback: add locally so UX doesn't break
    const items = $cartItems.get();
    const existing = items.find((i) => i.id === variantId);
    if (existing) {
      $cartItems.set(
        items.map((i) =>
          i.id === variantId ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      $cartItems.set([
        ...items,
        {
          id: variantId,
          lineId: "",
          name: fallbackInfo?.name || "Orbital",
          price: fallbackPrice,
          originalPrice: fallbackInfo?.originalPrice ?? fallbackPrice,
          quantity: 1,
        },
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
