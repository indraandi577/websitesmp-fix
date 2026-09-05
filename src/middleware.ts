import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteksi halaman admin
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin_session')
    if (!adminSession || adminSession.value !== 'authenticated') {
      const url = request.nextUrl.clone()
      url.pathname = '/login-admin'
      return NextResponse.redirect(url)
    }
  }

  // Proteksi dashboard siswa
  if (pathname.startsWith('/dashboard-siswa')) {
    const siswaCookie = request.cookies.get('siswa_no_pendaftaran')
    if (!siswaCookie) {
      const url = request.nextUrl.clone()
      url.pathname = '/login-siswa'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
