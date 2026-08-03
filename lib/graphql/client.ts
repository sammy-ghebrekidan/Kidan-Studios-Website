/**
 * GraphQL client setup.
 * Configure your endpoint and auth here.
 *
 * Example with a Shopify Storefront API:
 * const endpoint = `https://${SHOP_DOMAIN}/api/2024-01/graphql.json`
 */

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? ''

interface GraphQLResponse<T> {
  data: T
  errors?: { message: string }[]
}

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add auth headers here, e.g.:
      // 'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`)
  }

  const json: GraphQLResponse<T> = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('\n'))
  }

  return json.data
}
