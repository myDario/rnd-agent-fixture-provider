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

test('GET /uptime answers 200', () => {
  assert.equal(answer('GET', '/uptime').status, 200)
})

test('GET /uptime body seconds is a non-negative integer', () => {
  const result = answer('GET', '/uptime')
  const seconds = result.body['seconds'] as number
  assert.ok(Number.isInteger(seconds), 'seconds should be an integer')
  assert.ok(seconds >= 0, 'seconds should be non-negative')
})

test('POST /uptime is not served and answers 404', () => {
  assert.equal(answer('POST', '/uptime').status, 404)
})
