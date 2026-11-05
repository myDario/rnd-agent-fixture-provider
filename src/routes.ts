/**
 * The provider's HTTP operations, by "<METHOD> <path>". contract/operations.json publishes exactly these, and
 * contract.spec.ts holds the two to each other: an operation added here must be published there, and the reverse.
 */

export interface RouteAnswer {
  readonly status: number
  readonly body: Record<string, unknown>
}

export type Route = () => RouteAnswer

export const routes: Readonly<Record<string, Route>> = Object.freeze({
  'GET /health': (): RouteAnswer => ({ status: 200, body: { status: 'ok' } }),
})

/** The answer for a request: its route's, or 404. */
export function answer(method: string, path: string): RouteAnswer {
  const route: Route | undefined = routes[`${method} ${path}`]
  return route === undefined ? { status: 404, body: { error: 'not found' } } : route()
}
