import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {} from 'cookies-next';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('id_token');

  if (userCookie) {
    const token: string | undefined = userCookie.value;
    // TODO verify id token

    if (
      request.nextUrl.pathname.startsWith('/dashboard') &&
      token == undefined
    ) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    } else if (!request.nextUrl.pathname.startsWith('/dashboard') && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}
