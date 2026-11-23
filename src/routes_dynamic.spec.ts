import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { answer } from './routes'

test('GET /time now field changes on each call (dynamic, not static)', async () => {
  const first = answer('GET', '/time')
  // Wait a small amount of time to ensure the clock can tick
  await new Promise<void>((resolve) => setTimeout(resolve, 2))
  const second = answer('GET', '/time')
  const now1 = first.body.now as string
  const now2 = second.body.now as string
  assert.ok(
    now1 !== now2,
    `Expected two calls to return different now values, but both returned ${now1}`
  )
})
