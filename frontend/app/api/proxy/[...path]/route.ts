import { NextRequest, NextResponse } from 'next/server'

// BACKEND_URL must be set as a server-side runtime env var on your deployment
// platform (Render, Railway, Vercel, etc.). NEXT_PUBLIC_* vars are baked in at
// build time and must not be used for server-to-server URLs.
const BACKEND_URL_RAW = process.env.BACKEND_URL
if (!BACKEND_URL_RAW) {
  console.warn(
    '[proxy] BACKEND_URL is not set — falling back to http://localhost:3001 ' +
    'which will be unreachable on deployed infra. ' +
    'Set BACKEND_URL in your platform environment variables.',
  )
}
const BACKEND = (BACKEND_URL_RAW || 'http://localhost:3001').replace(/\/$/, '')

const HOP_BY_HOP = new Set(['connection', 'keep-alive', 'transfer-encoding', 'upgrade', 'proxy-authorization', 'te', 'trailers'])

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const url = new URL(req.url)
  const target = `${BACKEND}/${path.join('/')}${url.search}`

  const headers = new Headers()
  req.headers.forEach((v, k) => {
    if (!HOP_BY_HOP.has(k.toLowerCase()) && k.toLowerCase() !== 'host') {
      headers.set(k, v)
    }
  })

  const body = ['GET', 'HEAD'].includes(req.method) ? undefined : req.body

  let upstream: Response
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers,
      body,
      // @ts-expect-error — Node 18+ fetch supports duplex for streaming bodies
      duplex: body ? 'half' : undefined,
    })
  } catch (err) {
    console.error('[proxy] upstream fetch failed:', target, err)
    return NextResponse.json(
      {
        message: 'Backend unreachable',
        ...(BACKEND_URL_RAW
          ? {}
          : { hint: 'BACKEND_URL env var is not set — proxy is targeting localhost:3001 which is unreachable on deployed infra. Set BACKEND_URL to your backend service URL.' }),
      },
      { status: 502 },
    )
  }

  const resHeaders = new Headers()
  upstream.headers.forEach((v, k) => {
    if (!HOP_BY_HOP.has(k.toLowerCase())) resHeaders.set(k, v)
  })

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: resHeaders,
  })
}

export const GET     = proxy
export const POST    = proxy
export const PUT     = proxy
export const PATCH   = proxy
export const DELETE  = proxy
export const OPTIONS = proxy
