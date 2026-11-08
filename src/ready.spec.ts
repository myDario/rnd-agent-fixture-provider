import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { routes, answer } from './routes'

test('routes has a GET /ready entry', () => {
  assert.ok('GET /ready' in routes, 'routes["GET /ready"] must exist')
})

test('routes["GET /ready"] is a function', () => {
  assert.equal(typeof routes['GET /ready'], 'function')
})

test('routes["GET /ready"] returns status 200', () => {
  const result = routes['GET /ready']()
  assert.equal(result.status, 200)
})

test('routes["GET /ready"] returns body { ready: true }', () => {
  const result = routes['GET /ready']()
  assert.deepEqual(result.body, { ready: true })
})

test('routes["GET /ready"] returns exactly { status: 200, body: { ready: true } }', () => {
  const result = routes['GET /ready']()
  assert.deepEqual(result, { status: 200, body: { ready: true } })
})

test('routes["GET /ready"] body has no extra properties beyond ready', () => {
  const result = routes['GET /ready']()
  assert.deepEqual(Object.keys(result.body), ['ready'])
})

test('routes["GET /ready"] body.ready is exactly the boolean true', () => {
  const result = routes['GET /ready']()
  assert.strictEqual(result.body['ready'], true)
})

test('answer("GET", "/ready") returns status 200', () => {
  const result = answer('GET', '/ready')
  assert.equal(result.status, 200)
})

test('answer("GET", "/ready") returns body { ready: true }', () => {
  const result = answer('GET', '/ready')
  assert.deepEqual(result.body, { ready: true })
})

test('answer("POST", "/ready") is not served and returns 404', () => {
  const result = answer('POST', '/ready')
  assert.equal(result.status, 404)
})
