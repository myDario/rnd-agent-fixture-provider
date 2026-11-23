import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { answer } from './routes'

test('GET /health answers 200 {"status":"ok"}', () => {
  assert.deepEqual(answer('GET', '/health'), { status: 200, body: { status: 'ok' } })
})

test('GET /ping answers 200 {"pong":true}', () => {
  assert.deepEqual(answer('GET', '/ping'), { status: 200, body: { pong: true } })
})

test('an unknown operation answers 404', () => {
  assert.equal(answer('GET', '/nope').status, 404)
})
