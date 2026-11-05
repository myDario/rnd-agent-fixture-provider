import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { answer } from './routes'

test('GET /health answers 200 {"status":"ok"}', () => {
  assert.deepEqual(answer('GET', '/health'), { status: 200, body: { status: 'ok' } })
})

test('an unknown operation answers 404', () => {
  assert.equal(answer('GET', '/nope').status, 404)
})
