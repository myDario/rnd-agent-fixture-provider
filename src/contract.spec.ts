import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { routes } from './routes'

interface PublishedOperation {
  readonly method: string
  readonly path: string
  readonly response: { readonly status: number; readonly body: Record<string, unknown> }
}

const published: { readonly operations: readonly PublishedOperation[] } = JSON.parse(
  readFileSync(join(__dirname, '..', 'contract', 'operations.json'), 'utf8')
)

test('contract/operations.json publishes exactly the operations the provider serves', () => {
  const served: string[] = Object.keys(routes).sort()
  const listed: string[] = published.operations.map((op: PublishedOperation): string => `${op.method} ${op.path}`).sort()
  assert.deepEqual(listed, served)
})

test('each published operation answers its published status', () => {
  for (const op of published.operations) {
    const route = routes[`${op.method} ${op.path}`]
    assert.ok(route, `${op.method} ${op.path} is served`)
    assert.equal(route().status, op.response.status)
  }
})
