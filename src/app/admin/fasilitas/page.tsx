import { createClient } from '@/lib/supabase/server'
import type { Fasilitas } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export const revalidate = 0

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export default async function AdminFasilitasPage() {
  const supabase = await createClient()
  const { data: fasilitas } = await supabase.from('fasilitas').select('*').order('created_at')

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: '#1a1a2e' }}>Manajemen Fasilitas</h3>
          <p className="text-muted small mb-0">Kelola data fasilitas dan sarana prasarana sekolah</p>
        </div>
        <Link href="/admin/fasilitas/tambah" className="btn px-4 rounded-pill" style={{ background: '#007c92', color: 'white', fontWeight: 600 }}>
          <i className="fas fa-plus me-2" />Tambah Fasilitas
        </Link>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th className="px-4 py-3 small fw-semibold text-muted border-0">Foto</th>
                <th className="py-3 small fw-semibold text-muted border-0">Nama Fasilitas</th>
                <th className="py-3 small fw-semibold text-muted border-0">Deskripsi</th>
                <th className="py-3 small fw-semibold text-muted border-0 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!fasilitas || fasilitas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    <i className="fas fa-building fa-3x mb-3 d-block opacity-25" />
                    Belum ada data fasilitas.
                  </td>
                </tr>
              ) : (
                (fasilitas as Fasilitas[]).map((f) => {
                  const fotoUrl = `${SUPABASE_URL}/storage/v1/object/public/fasilitas/${f.foto}`
                  return (
                    <tr key={f.id}>
                      <td className="px-4 py-3">
                        <Image src={fotoUrl} alt={f.nama_fasilitas} width={110} height={75} style={{ objectFit: 'cover', borderRadius: 8 }} />
                      </td>
                      <td className="py-3 fw-semibold">{f.nama_fasilitas}</td>
                      <td className="py-3 text-muted small">{f.deskripsi ? f.deskripsi.slice(0, 80) + (f.deskripsi.length > 80 ? '...' : '') : '-'}</td>
                      <td className="py-3 text-center">
                        <DeleteButton id={f.id} endpoint="/api/admin/fasilitas" label="fasilitas" gambar={f.foto} />
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
