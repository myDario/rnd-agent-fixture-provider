import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { routes, answer } from './routes'

test('GET /limits is an own entry of the route map', () => {
  assert.ok(Object.hasOwn(routes, 'GET /limits'), 'routes has its own "GET /limits" entry')
})

test('GET /limits answers exactly 200 {"maxItems": 100}', () => {
  assert.deepEqual(answer('GET', '/limits'), { status: 200, body: { maxItems: 100 } })
})

test('POST /limits is not served and answers 404', () => {
  assert.equal(answer('POST', '/limits').status, 404)
})
