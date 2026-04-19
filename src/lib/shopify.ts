const SHOPIFY_STORE = "creativ-audio.myshopify.com";
const STOREFRONT_TOKEN = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2024-01";

const endpoint = `https://${SHOPIFY_STORE}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error("Shopify API error:", json.errors);
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

// Product variant GIDs for Orbital
export const ORBITAL_VARIANTS = {
  basic: "gid://shopify/ProductVariant/53569851326801",   // $49 — Orbital plugin
  bundle: "gid://shopify/ProductVariant/53569851359569",  // $67 — Orbital + Origin Megapack
} as const;
export type OrbitalVariantKey = keyof typeof ORBITAL_VARIANTS;
export const ORBITAL_VARIANT_ID = ORBITAL_VARIANTS.basic;

export async function createEmptyCart() {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors { field message }
      }
    }
  `;
  const data = await shopifyFetch(query, { input: {} });
  return data.cartCreate.cart;
}

export async function createCart(variantId: string, quantity: number = 1) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 { amount currencyCode }
                    product { title }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
        userErrors { field message }
      }
    }
  `;
  const variables = {
    input: {
      lines: [{ merchandiseId: variantId, quantity }],
    },
  };
  const data = await shopifyFetch(query, variables);
  return data.cartCreate.cart;
}

export async function addCartLines(cartId: string, variantId: string, quantity: number = 1) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 { amount currencyCode }
                    product { title }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
        userErrors { field message }
      }
    }
  `;
  const data = await shopifyFetch(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId: string, lineId: string, quantity: number) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 { amount currencyCode }
                    product { title }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
        userErrors { field message }
      }
    }
  `;
  const data = await shopifyFetch(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId: string, lineIds: string[]) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 { amount currencyCode }
                    product { title }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
        userErrors { field message }
      }
    }
  `;
  const data = await shopifyFetch(query, { cartId, lineIds });
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 { amount currencyCode }
                  product { title }
                }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { cartId });
  return data.cart;
}
