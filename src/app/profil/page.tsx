import { createClient } from '@/lib/supabase/server'
import type { Guru, Fasilitas } from '@/lib/types'
import Image from 'next/image'

export const revalidate = 3600

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

const programs = [
  { icon: 'fa-mosque', title: 'Adab & Ibadah Harian' },
  { icon: 'fa-book-open', title: 'Tahsin Metode Ummi' },
  { icon: 'fa-scroll', title: 'Tahfidz Hadits' },
  { icon: 'fa-quran', title: 'Juziyah Al-Quran' },
  { icon: 'fa-kaaba', title: 'Dirosah Islamiyah' },
  { icon: 'fa-sitemap', title: 'Pembinaan Organisasi' },
  { icon: 'fa-graduation-cap', title: 'Intensif Sukses Akademik' },
  { icon: 'fa-comments', title: 'English Habits & Baitul Lughoh' },
  { icon: 'fa-campground', title: 'English Camp' },
  { icon: 'fa-star', title: 'Optimalisasi Bakat & Minat' },
  { icon: 'fa-trophy', title: 'Sukses Prestasi & Juara' },
]

const ekskuls = [
  'Futsal', 'Basket', 'Volley', 'Karate', 'Pencak Silat',
  'Kaligrafi', 'Public Speaking', 'Hadroh', 'Robotic',
  'Tilawah', 'Multimedia', 'PMR',
]

export default async function ProfilPage() {
  const supabase = await createClient()

  const [{ data: gurus }, { data: fasilitas }] = await Promise.all([
    supabase.from('gurus').select('*').order('created_at'),
    supabase.from('fasilitas').select('*').order('created_at'),
  ])

  return (
    <>
      {/* Header */}
      <section className="py-5 text-white text-center" style={{ background: 'linear-gradient(135deg, #007c92 0%, #005a6b 100%)', paddingTop: '130px !important' }}>
        <div className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
          <h1 className="display-4 fw-bold">Profil Sekolah</h1>
          <p className="lead opacity-75">Mengenal lebih dekat SMP Integral Hidayatullah Kebumen</p>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <h2 className="fw-bold mb-4" style={{ color: '#007c92' }}>Sejarah Singkat</h2>
              <p className="text-secondary" style={{ lineHeight: 1.9 }}>
                SMP Integral Hidayatullah Kebumen didirikan dengan semangat untuk mengintegrasikan ilmu pengetahuan
                umum dan nilai-nilai tauhid. Berawal dari keinginan untuk mencetak generasi pemimpin yang tidak
                hanya cerdas secara intelektual, tetapi juga kokoh secara spiritual dan berakhlakul karimah.
              </p>
            </div>
            <div className="col-md-6">
              <div className="position-relative rounded-4 overflow-hidden shadow" style={{ height: 300 }}>
                <Image src="/img/DSC_0996.jpg" alt="Gedung SMP" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5" style={{ color: '#007c92' }}>Visi & Misi</h2>
          <div className="row g-4 text-start">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                <h4 className="fw-bold mb-3" style={{ color: '#007c92' }}>
                  <i className="fas fa-eye me-2" />Visi
                </h4>
                <p className="text-secondary fst-italic">
                  &ldquo;Melahirkan pemimpin peradaban Islam, penebar rahmat ke seluruh alam.&rdquo;
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                <h4 className="fw-bold mb-3" style={{ color: '#007c92' }}>
                  <i className="fas fa-bullseye me-2" />Misi
                </h4>
                <ul className="text-secondary" style={{ lineHeight: 2 }}>
                  <li>Membangun pribadi berakhlakul karimah.</li>
                  <li>Menguatkan potensi kepemimpinan peserta didik.</li>
                  <li>Membangun budaya belajar.</li>
                  <li>Membangun penguasaan bahasa internasional.</li>
                  <li>Membangun budaya partisipatif dan prestasi.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program & Ekskul */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5" style={{ color: '#007c92' }}>Program & Ekstrakurikuler</h2>
          <ul className="nav nav-pills mb-5 justify-content-center" id="pills-tab" role="tablist">
            <li className="nav-item me-2">
              <button className="nav-link active rounded-pill px-4 fw-bold" data-bs-toggle="pill" data-bs-target="#program">
                PROGRAM UNGGULAN
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link rounded-pill px-4 fw-bold" data-bs-toggle="pill" data-bs-target="#ekskul">
                EKSTRAKURIKULER
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="program">
              <div className="row g-3">
                {programs.map((p) => (
                  <div className="col-md-4 col-lg-3" key={p.title}>
                    <div className="p-3 border rounded-3 h-100 bg-white shadow-sm d-flex align-items-center" style={{ transition: '0.2s' }}>
                      <i className={`fas ${p.icon} me-3 fa-lg`} style={{ color: '#007c92' }} />
                      <span className="fw-semibold small">{p.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tab-pane fade" id="ekskul">
              <div className="row g-3">
                {ekskuls.map((e) => (
                  <div className="col-6 col-md-3 col-lg-2" key={e}>
                    <div className="p-3 border rounded-3 text-center bg-light shadow-sm">
                      <h6 className="mb-0 fw-bold small" style={{ color: '#007c92' }}>{e.toUpperCase()}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tenaga Pendidik */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5" style={{ color: '#007c92' }}>Tenaga Pendidik</h2>
          {!gurus || gurus.length === 0 ? (
            <p className="text-muted">Data guru sedang dalam proses pembaruan.</p>
          ) : (
            <div className="row g-4 justify-content-center">
              {(gurus as Guru[]).map((guru) => {
                const fotoUrl = `${SUPABASE_URL}/storage/v1/object/public/gurus/${guru.foto}`
                return (
                  <div className="col-md-3 col-sm-6" key={guru.id}>
                    <div className="card border-0 shadow-sm overflow-hidden rounded-4 h-100 card-hover">
                      <div className="position-relative" style={{ height: 280 }}>
                        <Image src={fotoUrl} alt={guru.nama} fill style={{ objectFit: 'cover' }} sizes="300px" />
                      </div>
                      <div className="card-body">
                        <h6 className="fw-bold mb-1">{guru.nama}</h6>
                        <p className="small mb-0" style={{ color: '#007c92' }}>{guru.jabatan}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Fasilitas */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5" style={{ color: '#007c92' }}>Fasilitas Sekolah</h2>
          {!fasilitas || fasilitas.length === 0 ? (
            <div className="text-center text-muted">
              <p>Galeri fasilitas segera diperbarui.</p>
            </div>
          ) : (
            <div className="row g-4">
              {(fasilitas as Fasilitas[]).map((f) => {
                const fotoUrl = `${SUPABASE_URL}/storage/v1/object/public/fasilitas/${f.foto}`
                return (
                  <div className="col-md-4" key={f.id}>
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 card-hover">
                      <div className="position-relative" style={{ height: 200 }}>
                        <Image src={fotoUrl} alt={f.nama_fasilitas} fill style={{ objectFit: 'cover' }} sizes="400px" />
                      </div>
                      <div className="card-body">
                        <h5 className="fw-bold">{f.nama_fasilitas}</h5>
                        <p className="text-muted small mb-0">{f.deskripsi}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .nav-pills .nav-link { color: #007c92; border: 2px solid #007c92; background: white; margin: 0 5px; transition: 0.3s; }
        .nav-pills .nav-link.active { background: #007c92 !important; color: white !important; }
        .nav-pills .nav-link:hover { background: #f0f8fa; }
      `}</style>
    </>
  )
}
