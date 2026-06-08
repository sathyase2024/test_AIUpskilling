import { NextRequest, NextResponse } from 'next/server'

// Runtime env var — read when each request is served, not at build time.
// Set BACKEND_URL on Render (or any platform) without rebuilding the image.
const BACKEND = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/$/, '')

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
    return NextResponse.json({ message: 'Backend unreachable' }, { status: 502 })
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
