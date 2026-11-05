/** A tiny HTTP server over routes.ts. Port from PORT, default 8080. It is never deployed. */

import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { answer, type RouteAnswer } from './routes'

export function handle(request: IncomingMessage, response: ServerResponse): void {
  const path: string = (request.url ?? '/').split('?')[0] ?? '/'
  const result: RouteAnswer = answer(request.method ?? 'GET', path)
  response.writeHead(result.status, { 'content-type': 'application/json' })
  response.end(JSON.stringify(result.body))
}

if (require.main === module) {
  const port: number = Number(process.env.PORT ?? 8080)
  createServer(handle).listen(port)
}
