'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

const menus = [
  { href: '/admin', icon: 'fa-tachometer-alt', label: 'Dashboard', exact: true },
  { href: '/admin/berita', icon: 'fa-newspaper', label: 'Berita & Info' },
  { href: '/admin/guru', icon: 'fa-chalkboard-teacher', label: 'Data Guru' },
  { href: '/admin/fasilitas', icon: 'fa-building', label: 'Fasilitas' },
  { href: '/admin/pendaftaran', icon: 'fa-user-graduate', label: 'Pendaftaran' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/login-admin')
    router.refresh()
  }

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  return (
    <aside
      className="d-flex flex-column"
      style={{
        width: 260,
        minHeight: '100vh',
        background: '#0d1b2a',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        padding: '24px 0',
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center px-4 mb-4">
        <Image src="/img/logo.png" alt="Logo" width={45} height={45} className="me-2" />
        <div style={{ lineHeight: 1.2 }}>
          <span className="fw-bold text-white d-block" style={{ fontSize: '0.85rem' }}>SMP INTEGRAL</span>
          <small style={{ fontSize: '0.6rem', color: '#ffcc00' }}>HIDAYATULLAH KEBUMEN</small>
        </div>
      </div>

      <div className="px-3 mb-2">
        <small className="text-uppercase fw-bold" style={{ color: '#4a5568', fontSize: '0.65rem', letterSpacing: 1 }}>
          Menu Utama
        </small>
      </div>

      {/* Menu */}
      <nav className="flex-grow-1">
        {menus.map((menu) => {
          const active = isActive(menu.href, menu.exact)
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className="d-flex align-items-center px-4 py-3 text-decoration-none"
              style={{
                color: active ? '#fff' : '#8a9bb0',
                background: active ? 'rgba(0,124,146,0.4)' : 'transparent',
                borderLeft: active ? '3px solid #ffcc00' : '3px solid transparent',
                fontWeight: active ? 600 : 400,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
            >
              <i className={`fas ${menu.icon} me-3`} style={{ width: 18, textAlign: 'center', color: active ? '#ffcc00' : '#4a5568' }} />
              {menu.label}
            </Link>
          )
        })}
      </nav>

      {/* Tombol ke halaman publik */}
      <div className="px-3 mb-2">
        <Link
          href="/"
          target="_blank"
          className="d-flex align-items-center px-3 py-2 text-decoration-none rounded-3 mb-2"
          style={{ color: '#8a9bb0', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)' }}
        >
          <i className="fas fa-external-link-alt me-2" style={{ color: '#4a5568' }} />
          Lihat Website
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn w-100 d-flex align-items-center py-2 px-3 rounded-3"
          style={{ background: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: 'none', fontSize: '0.85rem' }}
        >
          <i className="fas fa-sign-out-alt me-2" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
