import Link from 'next/link'
import Image from 'next/image'
import type { Berita } from '@/lib/types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

function getImageUrl(bucket: string, path: string | null) {
  if (!path) return null
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}

function formatTanggal(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function badgeColor(kategori: string) {
  switch (kategori) {
    case 'Berita': return 'var(--smp-base)'
    case 'Pengumuman': return '#e67e22'
    case 'Agenda': return '#8e44ad'
    default: return '#555'
  }
}

export default function BeritaSection({ beritas }: { beritas: Berita[] }) {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: 'var(--smp-base)' }}>
            Berita & Informasi
          </h2>
          <p className="text-muted">Dapatkan informasi terbaru seputar kegiatan sekolah</p>
        </div>

        {beritas.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-newspaper fa-3x mb-3 opacity-25" />
            <p>Belum ada berita yang diterbitkan.</p>
          </div>
        ) : (
          <div className="row g-4">
            {beritas.map((item) => {
              const imgUrl = getImageUrl('beritas', item.gambar)
              return (
                <div className="col-md-4" key={item.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover">
                    <div className="position-relative" style={{ height: 220 }}>
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={item.judul}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center justify-content-center h-100"
                          style={{ background: '#e9ecef' }}
                        >
                          <i className="fas fa-image fa-3x" style={{ color: '#adb5bd' }} />
                        </div>
                      )}
                      <span
                        className="badge position-absolute top-0 start-0 m-3"
                        style={{ background: badgeColor(item.kategori) }}
                      >
                        {item.kategori}
                      </span>
                    </div>
                    <div className="card-body p-4">
                      <small className="text-muted d-block mb-2">
                        <i className="far fa-calendar-alt me-1" />
                        {formatTanggal(item.created_at)}
                      </small>
                      <h5 className="fw-bold mb-2">{item.judul}</h5>
                      <p className="text-muted small">
                        {item.isi.slice(0, 100)}
                        {item.isi.length > 100 ? '...' : ''}
                      </p>
                    </div>
                    <div className="card-footer bg-white border-0 p-4 pt-0">
                      <Link
                        href={`/informasi/${item.slug ?? item.id}`}
                        className="fw-bold text-decoration-none"
                        style={{ color: 'var(--smp-base)' }}
                      >
                        Baca Selengkapnya <i className="fas fa-arrow-right ms-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="text-center mt-5">
          <Link
            href="/informasi"
            className="btn btn-lg px-5"
            style={{
              background: 'var(--smp-base)',
              color: 'white',
              borderRadius: '50px',
              fontWeight: 600,
            }}
          >
            Lihat Semua Berita <i className="fas fa-arrow-right ms-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
