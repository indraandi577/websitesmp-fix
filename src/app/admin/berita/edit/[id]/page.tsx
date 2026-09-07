import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BeritaForm from '@/components/admin/BeritaForm'
import type { Berita } from '@/lib/types'

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: berita } = await supabase.from('beritas').select('*').eq('id', id).single()
  if (!berita) notFound()

  return (
    <div>
      <div className="mb-4">
        <a href="/admin/berita" className="text-decoration-none text-muted small">
          <i className="fas fa-arrow-left me-1" />Kembali ke Daftar
        </a>
        <h3 className="fw-bold mt-2" style={{ color: '#1a1a2e' }}>Edit Berita / Informasi</h3>
      </div>
      <BeritaForm mode="edit" berita={berita as Berita} />
    </div>
  )
}
