import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except the login page itself)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie) {
      // Redirect to admin login
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Validate session (check if token is not too old - 24 hours)
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString();
      const [, timestamp] = decoded.split(':');
      const sessionAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in ms

      if (sessionAge > maxAge) {
        // Session expired
        const response = NextResponse.redirect(new URL('/admin', request.url));
        response.cookies.delete('admin_session');
        return response;
      }
    } catch {
      // Invalid token
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
