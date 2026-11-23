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

test('GET /time answers 200', () => {
  assert.equal(answer('GET', '/time').status, 200)
})

test('GET /time body now is an ISO-8601 string', () => {
  const result = answer('GET', '/time')
  assert.equal(typeof result.body.now, 'string', 'body.now is a string')
  assert.ok(!isNaN(Date.parse(result.body.now as string)), 'body.now is a valid ISO-8601 string')
})

test('POST /time answers 404', () => {
  assert.equal(answer('POST', '/time').status, 404)
})
