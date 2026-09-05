import { type NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
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
  matcher: ['/admin/:path*', '/dashboard-siswa/:path*'],
}
