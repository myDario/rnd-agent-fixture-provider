import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { answer } from './routes'

test('GET /ready answers 200', () => {
  const result = answer('GET', '/ready')
  assert.equal(result.status, 200)
})

test('GET /ready body is { ready: true }', () => {
  const result = answer('GET', '/ready')
  assert.deepEqual(result.body, { ready: true })
})

test('GET /ready body has a ready property that is exactly true', () => {
  const result = answer('GET', '/ready')
  assert.equal(result.body['ready'], true)
})

test('GET /ready body has no extra properties beyond ready', () => {
  const result = answer('GET', '/ready')
  assert.deepEqual(Object.keys(result.body), ['ready'])
})

test('POST /ready is not a known route and answers 404', () => {
  const result = answer('POST', '/ready')
  assert.equal(result.status, 404)
})
