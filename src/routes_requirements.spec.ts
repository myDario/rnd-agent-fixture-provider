/**
 * Tests for stated requirements of answer('GET', '/time') not covered by the
 * implementation-authored spec files:
 *   - The now field value changes on each call (dynamic, not static)
 *   - The route is registered as 'GET /time' in the routes map and therefore
 *     appears in contract/operations.json
 */

import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { routes, answer } from './routes'

// ---------------------------------------------------------------------------
// Requirement: The route is registered as 'GET /time' in the routes map and
//              therefore appears in contract/operations.json
// ---------------------------------------------------------------------------

test('GET /time is an own entry of the routes map', () => {
  assert.ok(Object.hasOwn(routes, 'GET /time'), '"GET /time" is a registered route in the routes map')
})

test('GET /time appears in contract/operations.json', () => {
  interface PublishedOperation {
    readonly method: string
    readonly path: string
  }
  const published: { readonly operations: readonly PublishedOperation[] } = JSON.parse(
    readFileSync(join(__dirname, '..', 'contract', 'operations.json'), 'utf8')
  )
  const listed = published.operations.some((op) => op.method === 'GET' && op.path === '/time')
  assert.ok(listed, 'GET /time is published in contract/operations.json')
})

// ---------------------------------------------------------------------------
// Requirement: The now field value changes on each call (dynamic, not static)
// ---------------------------------------------------------------------------

test('GET /time now value changes on each call (dynamic, not static)', async () => {
  const first = answer('GET', '/time')
  // Wait at least 1 ms so a real clock tick is possible.
  await new Promise<void>((resolve) => setTimeout(resolve, 2))
  const second = answer('GET', '/time')

  const firstNow = first.body.now as string
  const secondNow = second.body.now as string

  // Both must be valid ISO-8601 strings.
  assert.equal(typeof firstNow, 'string', 'first now is a string')
  assert.ok(!isNaN(Date.parse(firstNow)), 'first now is a valid ISO-8601 string')
  assert.equal(typeof secondNow, 'string', 'second now is a string')
  assert.ok(!isNaN(Date.parse(secondNow)), 'second now is a valid ISO-8601 string')

  // The timestamps must differ, proving the value is dynamic.
  assert.notEqual(firstNow, secondNow, 'now is dynamic: the value must change between calls')
})
