import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { routes, answer } from './routes'

test('GET /time is registered as an own entry of the routes map', () => {
  assert.ok(Object.hasOwn(routes, 'GET /time'), 'routes has its own "GET /time" entry')
})

test('GET /time now field value changes on each call (dynamic, not static)', async () => {
  const first = answer('GET', '/time')
  // Wait at least 1 ms to allow the timestamp to advance
  await new Promise<void>((resolve) => setTimeout(resolve, 2))
  const second = answer('GET', '/time')
  assert.notEqual(
    first.body.now,
    second.body.now,
    'now should change between calls because it reflects the current time'
  )
})
