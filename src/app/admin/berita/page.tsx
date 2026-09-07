import { createClient } from '@/lib/supabase/server'
import type { Berita } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export const revalidate = 0

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export default async function AdminBeritaPage() {
  const supabase = await createClient()
  const { data: beritas } = await supabase
    .from('beritas')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: '#1a1a2e' }}>Manajemen Informasi</h3>
          <p className="text-muted small mb-0">Kelola berita, pengumuman, dan agenda sekolah</p>
        </div>
        <Link
          href="/admin/berita/tambah"
          className="btn px-4 rounded-pill"
          style={{ background: '#007c92', color: 'white', fontWeight: 600 }}
        >
          <i className="fas fa-plus me-2" />Tambah Berita
        </Link>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th className="px-4 py-3 small fw-semibold text-muted border-0">Gambar</th>
                <th className="py-3 small fw-semibold text-muted border-0">Judul & Kategori</th>
                <th className="py-3 small fw-semibold text-muted border-0">Tanggal</th>
                <th className="py-3 small fw-semibold text-muted border-0 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!beritas || beritas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    <i className="fas fa-folder-open fa-3x mb-3 d-block opacity-25" />
                    Belum ada berita. Klik &ldquo;Tambah Berita&rdquo; untuk mulai.
                  </td>
                </tr>
              ) : (
                (beritas as Berita[]).map((b) => {
                  const imgUrl = b.gambar
                    ? `${SUPABASE_URL}/storage/v1/object/public/beritas/${b.gambar}`
                    : null
                  return (
                    <tr key={b.id}>
                      <td className="px-4 py-3">
                        {imgUrl ? (
                          <Image src={imgUrl} alt={b.judul} width={80} height={50} style={{ objectFit: 'cover', borderRadius: 6 }} />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center rounded" style={{ width: 80, height: 50, background: '#e9ecef' }}>
                            <i className="fas fa-image text-muted" />
                          </div>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="fw-semibold">{b.judul}</div>
                        <span className="badge rounded-pill mt-1" style={{ background: '#007c92', fontSize: '0.7rem' }}>
                          {b.kategori}
                        </span>
                      </td>
                      <td className="py-3 text-muted small">
                        {new Date(b.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            href={`/admin/berita/edit/${b.id}`}
                            className="btn btn-sm rounded-pill px-3"
                            style={{ border: '1px solid #f39c12', color: '#f39c12' }}
                          >
                            <i className="fas fa-edit me-1" />Edit
                          </Link>
                          <DeleteButton id={b.id} endpoint="/api/admin/berita" label="berita" gambar={b.gambar} />
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
