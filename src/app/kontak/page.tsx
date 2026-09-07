export default function KontakPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #007c92 0%, #005a6b 100%)', paddingTop: 80, paddingBottom: 1 }} />
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: '#007c92' }}>Hubungi Kami</h2>
            <p className="text-muted small fw-bold">SMP INTEGRAL HIDAYATULLAH KEBUMEN</p>
          </div>

          <div className="row g-4">
            {/* Info Kontak */}
            <div className="col-md-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-4 border-bottom pb-2">Informasi Kontak</h5>

                <div className="d-flex mb-3">
                  <div className="me-3" style={{ color: '#007c92' }}><i className="fas fa-map-marker-alt fa-lg" /></div>
                  <div>
                    <p className="mb-0 fw-bold">Alamat</p>
                    <p className="text-muted small">Jl. Tentara Pelajar No.01, Kutosari, Kec. Kebumen, Kabupaten Kebumen, Jawa Tengah 54317</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="me-3" style={{ color: '#007c92' }}><i className="fab fa-whatsapp fa-lg" /></div>
                  <div>
                    <p className="mb-0 fw-bold">WhatsApp</p>
                    <a href="https://wa.me/6281391359126" target="_blank" rel="noopener noreferrer" className="text-muted small text-decoration-none">
                      0813-9145-9126
                    </a>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="me-3" style={{ color: '#007c92' }}><i className="fas fa-clock fa-lg" /></div>
                  <div>
                    <p className="mb-0 fw-bold">Jam Operasional</p>
                    <p className="text-muted small">Senin – Jumat, 07.00 – 15.00 WIB</p>
                  </div>
                </div>

                <h5 className="fw-bold mb-3">Media Sosial</h5>
                <div className="d-flex gap-3 mb-4">
                  <a
                    href="https://www.instagram.com/smpintegralhidayatullahkebumen"
                    target="_blank" rel="noopener noreferrer"
                    className="btn rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: 42, height: 42, background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: 'white', border: 'none' }}
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/188ckyUjwW/"
                    target="_blank" rel="noopener noreferrer"
                    className="btn rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: 42, height: 42, background: '#1877f2', color: 'white', border: 'none' }}
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    href="https://wa.me/6281391359126"
                    target="_blank" rel="noopener noreferrer"
                    className="btn rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: 42, height: 42, background: '#25d366', color: 'white', border: 'none' }}
                    aria-label="WhatsApp"
                  >
                    <i className="fab fa-whatsapp" />
                  </a>
                </div>

                <div className="alert border-0 rounded-4 small" style={{ background: '#e8f4f8', color: '#007c92' }}>
                  <i className="fas fa-info-circle me-2" />
                  Silakan hubungi kami pada jam kerja sekolah (07.00 – 15.00 WIB).
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="col-md-7">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100" style={{ minHeight: 400 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.9633!2d109.6519!3d-7.6669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5e5a5a5a5a5a%3A0x5a5a5a5a5a5a5a5a!2sJl.+Tentara+Pelajar+No.01%2C+Kutosari%2C+Kebumen!5e0!3m2!1sid!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 400 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi SMP Integral Hidayatullah Kebumen"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
