// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Admin sayfalarına erişim kontrolü
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (req.nextauth.token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
    
    // Üyelik gerektiren sayfalara erişim kontrolü
    if (req.nextUrl.pathname.startsWith('/courses')) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/courses/:path*'],
};