import { createClient } from '@/lib/supabase/server'
import type { Berita } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

function getImageUrl(path: string | null) {
  if (!path) return null
  return `${SUPABASE_URL}/storage/v1/object/public/beritas/${path}`
}

function formatTanggal(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function badgeColor(kategori: string) {
  switch (kategori) {
    case 'Berita': return '#007c92'
    case 'Artikel': return '#27ae60'
    case 'Pengumuman': return '#e67e22'
    default: return '#555'
  }
}

export default async function InformasiPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>
}) {
  const { kategori } = await searchParams
  const supabase = await createClient()

  let query = supabase.from('beritas').select('*').order('created_at', { ascending: false })
  if (kategori) query = query.eq('kategori', kategori)

  const { data: beritas } = await query

  const kategoris = ['Berita', 'Artikel', 'Pengumuman']

  return (
    <>
      {/* Header */}
      <section
        className="py-5 text-white text-center"
        style={{ paddingTop: '120px !important', background: 'linear-gradient(135deg, #007c92 0%, #005a6b 100%)', paddingBottom: 60 }}
      >
        <div className="container" style={{ paddingTop: 80 }}>
          <h1 className="display-4 fw-bold">Pusat Informasi</h1>
          <p className="lead opacity-75">Artikel dan pengumuman terbaru dari SMP Integral Hidayatullah Kebumen</p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">

          {/* Filter Kategori */}
          <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
            <Link
              href="/informasi"
              className="btn rounded-pill px-4"
              style={{ background: !kategori ? '#007c92' : 'white', color: !kategori ? 'white' : '#007c92', border: '2px solid #007c92' }}
            >
              Semua
            </Link>
            {kategoris.map((k) => (
              <Link
                key={k}
                href={`/informasi?kategori=${k}`}
                className="btn rounded-pill px-4"
                style={{ background: kategori === k ? '#007c92' : 'white', color: kategori === k ? 'white' : '#007c92', border: '2px solid #007c92' }}
              >
                {k}
              </Link>
            ))}
          </div>

          {/* Grid Berita */}
          {!beritas || beritas.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="fas fa-newspaper fa-3x mb-3 d-block opacity-25" />
              <p>Belum ada informasi yang diterbitkan.</p>
            </div>
          ) : (
            <div className="row g-4">
              {(beritas as Berita[]).map((item) => {
                const imgUrl = getImageUrl(item.gambar)
                return (
                  <div className="col-md-4" key={item.id}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover">
                      <div className="position-relative" style={{ height: 220 }}>
                        {imgUrl ? (
                          <Image src={imgUrl} alt={item.judul} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center h-100" style={{ background: '#e9ecef' }}>
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
                          <i className="far fa-calendar-alt me-1" />{formatTanggal(item.created_at)}
                        </small>
                        <h5 className="fw-bold mb-2">{item.judul}</h5>
                        <p className="text-muted small">{item.isi.slice(0, 100)}{item.isi.length > 100 ? '...' : ''}</p>
                      </div>
                      <div className="card-footer bg-white border-0 p-4 pt-0">
                        <Link href={`/informasi/${item.slug ?? item.id}`} className="fw-bold text-decoration-none" style={{ color: '#007c92' }}>
                          Baca Selengkapnya <i className="fas fa-arrow-right ms-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
