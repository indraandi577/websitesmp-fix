import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="pt-5 pb-3" style={{ background: '#0d1b2a', color: '#adb5bd' }}>
      <div className="container">
        <div className="row g-5">

          {/* Kolom 1: Logo & Deskripsi */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <Image src="/img/logo.png" alt="Logo" width={50} height={50} className="me-2" />
              <div style={{ lineHeight: 1.2 }}>
                <span className="fw-bold d-block text-white" style={{ fontSize: '0.9rem' }}>SMP INTEGRAL</span>
                <small style={{ fontSize: '0.65rem', color: '#ffcc00' }}>HIDAYATULLAH KEBUMEN</small>
              </div>
            </div>
            <p className="small" style={{ lineHeight: 1.8 }}>
              Sekolah berbasis Islam terpadu yang mencetak generasi berakhlak mulia, cerdas, dan berprestasi.
            </p>
            <div className="d-flex gap-2 mt-3">
              <a
                href="https://www.instagram.com/smpintegralhidayatullahkebumen"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: 'white', border: 'none' }}
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://www.facebook.com/share/188ckyUjwW/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, background: '#1877f2', color: 'white', border: 'none' }}
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="https://wa.me/6281391359126"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, background: '#25d366', color: 'white', border: 'none' }}
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Sekolah Kami */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3 border-bottom border-secondary pb-2">Sekolah Kami</h6>
            <ul className="list-unstyled small" style={{ lineHeight: 2 }}>
              {[
                'TK/KB Yaa Bunayya Kebumen',
                'SDIT Al-Madinah',
                'SMP Integral Hidayatullah Kebumen',
                "RA'I Nurul Huda Pengaringan",
                'KB TK Yaa Bunayya 2 Sruweng',
              ].map((s) => (
                <li key={s}>
                  <i className="fas fa-school me-2" style={{ color: '#ffcc00' }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3 border-bottom border-secondary pb-2">Hubungi Kami</h6>
            <ul className="list-unstyled small" style={{ lineHeight: 2 }}>
              <li className="d-flex">
                <i className="fas fa-map-marker-alt me-2 mt-1" style={{ color: '#ffcc00' }} />
                <span>Jl. Tentara Pelajar No.01, Kutosari, Kec. Kebumen, Jawa Tengah 54317</span>
              </li>
              <li>
                <i className="fab fa-whatsapp me-2" style={{ color: '#ffcc00' }} />
                <a href="https://wa.me/6281391359126" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#adb5bd' }}>
                  0813-9145-9126
                </a>
              </li>
              <li>
                <i className="fas fa-clock me-2" style={{ color: '#ffcc00' }} />
                Senin – Jumat, 07.00–15.00 WIB
              </li>
            </ul>
          </div>

          {/* Kolom 4: Navigasi */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3 border-bottom border-secondary pb-2">Navigasi</h6>
            <ul className="list-unstyled small" style={{ lineHeight: 2 }}>
              {[
                { href: '/', label: 'Beranda' },
                { href: '/profil', label: 'Profil Sekolah' },
                { href: '/informasi', label: 'Informasi' },
                { href: '/kontak', label: 'Kontak' },
                { href: '/pendaftaran', label: 'Pendaftaran PPDB', gold: true },
              ].map(({ href, label, gold }) => (
                <li key={href}>
                  <Link href={href} className="text-decoration-none" style={{ color: gold ? '#ffcc00' : '#adb5bd' }}>
                    <i className="fas fa-chevron-right me-2" style={{ color: '#ffcc00', fontSize: 10 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <hr className="mt-4 mb-3" style={{ borderColor: '#2d3748' }} />
        <div className="text-center small" style={{ color: '#6c757d' }}>
          &copy; {year} <span className="text-white fw-bold">Yayasan Hidayatullah Kebumen</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
