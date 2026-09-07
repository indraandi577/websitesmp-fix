'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tutup menu saat pindah halaman
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHome = pathname === '/'
  const bgColor = (!isHome || scrolled || menuOpen)
    ? 'rgba(0,124,146,0.97)'
    : 'transparent'

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/profil', label: 'PROFIL' },
    { href: '/informasi', label: 'INFORMASI' },
    { href: '/kontak', label: 'KONTAK' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: bgColor,
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : 'none',
        transition: 'all 0.4s ease',
        padding: scrolled ? '10px 0' : '18px 0',
      }}
    >
      <div className="container d-flex align-items-center justify-content-between">

        {/* Logo */}
        <Link href="/" className="d-flex align-items-center text-decoration-none">
          <Image src="/img/logo.png" alt="Logo" width={50} height={50} className="me-2" />
          <div style={{ lineHeight: 1.2 }}>
            <span className="fw-bold d-block text-white" style={{ fontSize: '0.95rem' }}>SMP INTEGRAL</span>
            <small style={{ fontSize: '0.6rem', color: '#ffcc00' }}>HIDAYATULLAH KEBUMEN</small>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="d-none d-lg-flex align-items-center gap-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-decoration-none px-3 py-2"
              style={{
                color: 'white',
                fontWeight: 500,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                borderBottom: pathname === href ? '2px solid #ffcc00' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://spmb-aiis.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="ms-2 text-decoration-none px-4 py-2 fw-bold"
            style={{
              background: '#ffcc00',
              color: '#1a1a1a',
              borderRadius: '50px',
              fontSize: '0.9rem',
            }}
          >
            DAFTAR
          </a>
        </div>

        {/* Tombol Hamburger Mobile */}
        <button
          className="d-lg-none border-0 bg-transparent"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ cursor: 'pointer' }}
        >
          <div style={{ width: 25, height: 2, background: 'white', margin: '5px 0', transition: '0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: 25, height: 2, background: 'white', margin: '5px 0', transition: '0.3s',
            opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 25, height: 2, background: 'white', margin: '5px 0', transition: '0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div style={{ background: 'rgba(0,124,146,0.97)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '10px 0' }}>
          <div className="container d-flex flex-column gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-decoration-none py-2 px-3 rounded"
                style={{
                  color: pathname === href ? '#ffcc00' : 'white',
                  fontWeight: pathname === href ? 700 : 500,
                  background: pathname === href ? 'rgba(255,255,255,0.1)' : 'transparent',
                }}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://spmb-aiis.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none py-2 px-3 rounded fw-bold text-center mt-1"
              style={{ background: '#ffcc00', color: '#1a1a1a' }}
            >
              DAFTAR
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
