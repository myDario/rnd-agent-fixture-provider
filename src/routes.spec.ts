import { strict as assert } from 'node:assert'
import { mock, test } from 'node:test'
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

test('GET /uptime floors a fractional uptime value (3.9 → 3)', () => {
  const stub = mock.method(process, 'uptime', () => 3.9)
  try {
    const result = answer('GET', '/uptime')
    assert.equal(result.status, 200)
    assert.equal(result.body['seconds'], 3, 'Math.floor(3.9) should be 3')
  } finally {
    stub.mock.restore()
  }
})

test('GET /uptime recomputes on each call, not a cached constant', () => {
  let callCount = 0
  const uptimes = [7.1, 7.9]
  const stub = mock.method(process, 'uptime', () => uptimes[callCount++] ?? 0)
  try {
    const first = answer('GET', '/uptime')
    const second = answer('GET', '/uptime')
    assert.equal(first.body['seconds'], 7, 'Math.floor(7.1) should be 7')
    assert.equal(second.body['seconds'], 7, 'Math.floor(7.9) should be 7')
  } finally {
    stub.mock.restore()
  }
})

test('POST /uptime is not served and answers 404', () => {
  assert.equal(answer('POST', '/uptime').status, 404)
})
