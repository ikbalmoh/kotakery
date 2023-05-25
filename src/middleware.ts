import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('id_token');

  const idToken: string | undefined = userCookie?.value;

  const { pathname } = request.nextUrl;

  if (idToken) {
    if (pathname.startsWith('/auth') || pathname == '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/settings')
  ) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}
