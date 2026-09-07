import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Berita } from '@/lib/types'

export const revalidate = 60

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

function getImageUrl(path: string | null) {
  if (!path) return null
  return `${SUPABASE_URL}/storage/v1/object/public/beritas/${path}`
}

function formatTanggal(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Coba cari by slug dulu, kalau tidak ketemu cari by id
  let { data: berita } = await supabase.from('beritas').select('*').eq('slug', slug).single()
  if (!berita) {
    const { data } = await supabase.from('beritas').select('*').eq('id', slug).single()
    berita = data
  }
  if (!berita) notFound()

  const { data: beritaLainnya } = await supabase
    .from('beritas')
    .select('*')
    .neq('id', berita.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const imgUrl = getImageUrl((berita as Berita).gambar)

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #007c92 0%, #005a6b 100%)', height: 80 }} />
      <div className="container py-5">
        <div className="row">
          {/* Konten utama */}
          <div className="col-lg-8">
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/informasi" className="text-decoration-none" style={{ color: '#007c92' }}>Informasi</Link>
                </li>
                <li className="breadcrumb-item active">{(berita as Berita).kategori}</li>
              </ol>
            </nav>

            <h1 className="fw-bold mb-3">{(berita as Berita).judul}</h1>

            <div className="d-flex align-items-center mb-4 text-muted small gap-3">
              <span><i className="fas fa-calendar-alt me-1" />{formatTanggal((berita as Berita).created_at)}</span>
              <span>
                <i className="fas fa-tag me-1" />
                <span className="badge rounded-pill" style={{ background: '#007c92' }}>{(berita as Berita).kategori}</span>
              </span>
            </div>

            {imgUrl && (
              <div className="position-relative w-100 mb-4 rounded-4 overflow-hidden shadow-sm" style={{ height: 400 }}>
                <Image src={imgUrl} alt={(berita as Berita).judul} fill style={{ objectFit: 'cover' }} />
              </div>
            )}

            <div className="lead" style={{ lineHeight: 1.9, color: '#333', whiteSpace: 'pre-line' }}>
              {(berita as Berita).isi}
            </div>

            <hr className="my-5" />
            <Link href="/informasi" className="btn rounded-pill px-4" style={{ border: '2px solid #007c92', color: '#007c92' }}>
              <i className="fas fa-arrow-left me-2" />Kembali ke Informasi
            </Link>
          </div>

          {/* Sidebar berita lainnya */}
          <div className="col-lg-4 mt-5 mt-lg-0">
            <div className="card border-0 shadow-sm rounded-4 p-4 position-sticky" style={{ top: 100 }}>
              <h5 className="fw-bold mb-4 border-bottom pb-2">Berita Terbaru</h5>
              {(beritaLainnya as Berita[])?.map((item) => {
                const thumbUrl = getImageUrl(item.gambar)
                return (
                  <div className="d-flex mb-3 align-items-center" key={item.id}>
                    <div className="me-3 flex-shrink-0 rounded overflow-hidden" style={{ width: 80, height: 60 }}>
                      {thumbUrl ? (
                        <Image src={thumbUrl} alt={item.judul} width={80} height={60} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      ) : (
                        <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center">
                          <i className="fas fa-image text-muted" />
                        </div>
                      )}
                    </div>
                    <div>
                      <Link href={`/informasi/${item.slug ?? item.id}`} className="text-decoration-none text-dark fw-bold small d-block mb-1">
                        {item.judul.slice(0, 45)}{item.judul.length > 45 ? '...' : ''}
                      </Link>
                      <small className="text-muted" style={{ fontSize: 11 }}>{formatTanggal(item.created_at)}</small>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
