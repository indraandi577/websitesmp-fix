import { createClient } from '@/lib/supabase/server'
import type { Guru } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export const revalidate = 0

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export default async function AdminGuruPage() {
  const supabase = await createClient()
  const { data: gurus } = await supabase.from('gurus').select('*').order('created_at')

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: '#1a1a2e' }}>Manajemen Tenaga Pendidik</h3>
          <p className="text-muted small mb-0">Kelola data guru dan staf pengajar</p>
        </div>
        <Link href="/admin/guru/tambah" className="btn px-4 rounded-pill" style={{ background: '#007c92', color: 'white', fontWeight: 600 }}>
          <i className="fas fa-plus me-2" />Tambah Guru
        </Link>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th className="px-4 py-3 small fw-semibold text-muted border-0">Foto</th>
                <th className="py-3 small fw-semibold text-muted border-0">Nama</th>
                <th className="py-3 small fw-semibold text-muted border-0">Jabatan</th>
                <th className="py-3 small fw-semibold text-muted border-0 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!gurus || gurus.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    <i className="fas fa-user-slash fa-3x mb-3 d-block opacity-25" />
                    Belum ada data guru.
                  </td>
                </tr>
              ) : (
                (gurus as Guru[]).map((g) => {
                  const fotoUrl = `${SUPABASE_URL}/storage/v1/object/public/gurus/${g.foto}`
                  return (
                    <tr key={g.id}>
                      <td className="px-4 py-3">
                        <Image src={fotoUrl} alt={g.nama} width={55} height={70} style={{ objectFit: 'cover', borderRadius: 8 }} />
                      </td>
                      <td className="py-3 fw-semibold">{g.nama}</td>
                      <td className="py-3 text-muted">{g.jabatan}</td>
                      <td className="py-3 text-center">
                        <DeleteButton id={g.id} endpoint="/api/admin/guru" label="guru" gambar={g.foto} />
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
