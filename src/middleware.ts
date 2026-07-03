import { NextRequest, NextResponse } from 'next/server';

/**
 * SECURITY: Minimum-viable auth gate.
 *
 * This project currently has no user/session system (no login, no accounts) -
 * that's a larger feature, not something to bolt on inside a "fix bugs" pass.
 * Until real multi-user auth exists, sensitive routes are protected by a single
 * shared admin bearer token so they are not wide open on the public internet.
 *
 * Set ADMIN_API_TOKEN in your environment and send it as:
 *   Authorization: Bearer <ADMIN_API_TOKEN>
 *
 * Routes intentionally left open: /api/health, /api/status, /api/version
 * (needed for uptime checks / load balancers, and expose no sensitive data).
 */

const PROTECTED_PREFIXES = [
  '/api/keys',
  '/api/storage',
  '/api/system',
  '/api/gateway',
  '/api/queue',
  '/api/search',
  '/api/analytics',
  '/api/models',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) {
    return NextResponse.next();
  }

  const adminToken = process.env.ADMIN_API_TOKEN;

  if (!adminToken) {
    // Fail closed, not open: if the operator hasn't configured a token yet,
    // refuse access rather than silently allowing every request through.
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTH_NOT_CONFIGURED',
          message: 'ADMIN_API_TOKEN is not configured on the server. Access denied.',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get('authorization') || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || token !== adminToken) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Missing or invalid admin token.' },
        timestamp: new Date().toISOString(),
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
