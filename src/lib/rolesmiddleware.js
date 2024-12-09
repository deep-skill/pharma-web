import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers'

export async function middleware(req) {
  const cookieStore = cookies()
    const accessToken = cookieStore.get('authToken')

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  const decoded = jwtDecode(accessToken.value);

  const path = new URL(req.url).pathname;

  if (decoded.permissions.includes('admin')) {
    return NextResponse.next();
  }

  if (decoded.permissions.includes('cajero')) {
    if (path === '/forms/product') {
      return NextResponse.redirect(new URL('/access-denied', req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/access-denied', req.url));
}
