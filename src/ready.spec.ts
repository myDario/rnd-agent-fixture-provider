import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { routes, answer } from './routes'

test('GET /ready is an own entry of the route map', () => {
  assert.ok(Object.hasOwn(routes, 'GET /ready'), 'routes has its own "GET /ready" entry')
})

test('GET /ready answers exactly 200 {"ready": true}', () => {
  assert.deepEqual(answer('GET', '/ready'), { status: 200, body: { ready: true } })
})

test('POST /ready is not served and answers 404', () => {
  assert.equal(answer('POST', '/ready').status, 404)
})
