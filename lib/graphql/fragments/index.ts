/**
 * GraphQL fragments.
 * Reusable field selections shared across queries.
 *
 * Example:
 * export const PRODUCT_FIELDS = `
 *   fragment ProductFields on Product {
 *     id
 *     title
 *     handle
 *     priceRange { minVariantPrice { amount currencyCode } }
 *     images(first: 1) { edges { node { url altText } } }
 *   }
 * `
 */
