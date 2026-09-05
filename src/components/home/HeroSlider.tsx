'use client'

export default function HeroSlider() {
  const slides = [
    {
      img: '/img/DSC_1028.jpg',
      subtitle: 'WELCOME TO',
      title: 'SMP INTEGRAL\nHIDAYATULLAH KEBUMEN',
      desc: 'Membentuk Generasi Berbasis Tauhid, Cerdas, dan Mandiri dengan Fasilitas Pendidikan Modern.',
      buttons: [
        { href: '/pendaftaran', label: 'DAFTAR SEKARANG', style: 'gold' },
        { href: '/profil', label: 'PROFIL SEKOLAH', style: 'outline' },
      ],
    },
    {
      img: '/img/DSC_0996.jpg',
      title: 'Lingkungan Belajar\nIslami & Kondusif',
      desc: 'Menanamkan Adab dan Akhlakul Karimah sebagai pondasi utama pendidikan santri.',
      buttons: [{ href: '/informasi', label: 'LIHAT KEGIATAN', style: 'gold' }],
    },
    {
      img: '/img/DSC_0055.jpg',
      title: 'Wujudkan Cita-cita\nBersama Kami',
      desc: 'Kurikulum Integral yang memadukan ilmu pengetahuan dan kecerdasan spiritual.',
      buttons: [{ href: '/pendaftaran', label: 'GABUNG SEKARANG', style: 'gold' }],
      center: true,
    },
  ]

  return (
    <div
      id="heroSlider"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#heroSlider"
            data-bs-slide-to={i}
            className={i === 0 ? 'active' : ''}
            aria-current={i === 0 ? 'true' : undefined}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`carousel-item hero-slide${i === 0 ? ' active' : ''}`}
            style={{ backgroundImage: `url('${slide.img}')` }}
          >
            <div className="hero-overlay">
              <div className="container">
                <div
                  className={`animate-fadeInUp${slide.center ? ' text-center mx-auto' : ''}`}
                  style={{ maxWidth: 800 }}
                >
                  {slide.subtitle && (
                    <h5
                      className="fw-bold mb-2"
                      style={{ color: '#ffcc00', letterSpacing: 2 }}
                    >
                      {slide.subtitle}
                    </h5>
                  )}
                  <h1
                    className="display-2 fw-bold text-white mb-4"
                    style={{ whiteSpace: 'pre-line', lineHeight: 1.2 }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="fs-5 mb-5"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {slide.desc}
                  </p>
                  <div className={`d-flex gap-3${slide.center ? ' justify-content-center' : ''}`}>
                    {slide.buttons.map((btn) =>
                      btn.style === 'gold' ? (
                        <a
                          key={btn.label}
                          href={btn.href}
                          className="btn btn-lg shadow"
                          style={{
                            backgroundColor: '#ffcc00',
                            color: '#1a1a1a',
                            fontWeight: 700,
                            borderRadius: '50px',
                            padding: '12px 35px',
                            border: 'none',
                          }}
                        >
                          {btn.label}
                        </a>
                      ) : (
                        <a
                          key={btn.label}
                          href={btn.href}
                          className="btn btn-outline-light btn-lg px-4"
                          style={{ borderRadius: '50px' }}
                        >
                          {btn.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroSlider"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroSlider"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
