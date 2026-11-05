import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { answer } from './routes'

const { version } = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8')
) as { version: string }

test('GET /version answers 200', () => {
  const result = answer('GET', '/version')
  assert.equal(result.status, 200)
})

test('GET /version body has a version property of type string', () => {
  const result = answer('GET', '/version')
  assert.equal(typeof result.body['version'], 'string')
})

test('GET /version body version equals the package.json version', () => {
  const result = answer('GET', '/version')
  assert.equal(result.body['version'], version)
})

test('GET /version body has no extra properties beyond version', () => {
  const result = answer('GET', '/version')
  assert.deepEqual(Object.keys(result.body), ['version'])
})

test('an unknown route answers 404 with an error string in the body', () => {
  const result = answer('GET', '/version-unknown')
  assert.equal(result.status, 404)
  assert.equal(typeof result.body['error'], 'string')
})

test('POST /version is not a known route and answers 404', () => {
  const result = answer('POST', '/version')
  assert.equal(result.status, 404)
})
