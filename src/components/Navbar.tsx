'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Halaman yang navbar-nya selalu solid (bukan di atas hero)
  const isSolid = pathname !== '/'

  const navClass = isSolid
    ? 'navbar navbar-expand-lg navbar-dark fixed-top'
    : `navbar navbar-expand-lg navbar-dark fixed-top${scrolled ? ' scrolled' : ''}`

  const navStyle = isSolid
    ? { background: 'rgba(0,124,146,0.97)', padding: '10px 0' }
    : scrolled
    ? {}
    : { background: 'transparent', padding: '20px 0' }

  return (
    <nav className={navClass} id="mainNav" style={navStyle}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image src="/img/logo.png" alt="Logo" width={55} height={55} className="me-2" />
          <div style={{ lineHeight: 1.2 }}>
            <span className="fw-bold d-block mb-0 h6 text-white">SMP INTEGRAL</span>
            <small style={{ fontSize: '0.65rem', color: 'var(--smp-gold)' }}>HIDAYATULLAH KEBUMEN</small>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {[
              { href: '/', label: 'HOME' },
              { href: '/profil', label: 'PROFIL' },
              { href: '/informasi', label: 'INFORMASI' },
              { href: '/kontak', label: 'KONTAK' },
            ].map(({ href, label }) => (
              <li className="nav-item" key={href}>
                <Link
                  className="nav-link"
                  href={href}
                  style={{
                    color: 'white',
                    fontWeight: 500,
                    margin: '0 8px',
                    borderBottom: pathname === href ? '2px solid var(--smp-gold)' : 'none',
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="nav-item ms-lg-3">
              <Link
                href="/pendaftaran"
                className="nav-link shadow-sm"
                style={{
                  backgroundColor: 'var(--smp-gold)',
                  color: '#1a1a1a',
                  fontWeight: 700,
                  borderRadius: '50px',
                  padding: '8px 25px',
                }}
              >
                DAFTAR
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
