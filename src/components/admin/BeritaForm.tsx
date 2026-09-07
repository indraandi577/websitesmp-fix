'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Berita } from '@/lib/types'

type Props = {
  mode: 'tambah' | 'edit'
  berita?: Berita
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export default function BeritaForm({ mode, berita }: Props) {
  const router = useRouter()
  const [judul, setJudul] = useState(berita?.judul ?? '')
  const [kategori, setKategori] = useState<'Berita' | 'Pengumuman' | 'Agenda'>(berita?.kategori ?? 'Berita')
  const [isi, setIsi] = useState(berita?.isi ?? '')
  const [gambar, setGambar] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const existingGambar = berita?.gambar
    ? `${SUPABASE_URL}/storage/v1/object/public/beritas/${berita.gambar}`
    : null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('judul', judul)
      formData.append('kategori', kategori)
      formData.append('isi', isi)
      if (gambar) formData.append('gambar', gambar)
      if (mode === 'edit' && berita) {
        formData.append('id', String(berita.id))
        formData.append('gambar_lama', berita.gambar ?? '')
      }

      const res = await fetch('/api/admin/berita', {
        method: mode === 'edit' ? 'PUT' : 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Terjadi kesalahan')
      }

      router.push('/admin/berita')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      setLoading(false)
    }
  }

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-4">
        {error && (
          <div className="alert alert-danger border-0 rounded-3 small">
            <i className="fas fa-exclamation-circle me-2" />{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-8">
              <label className="form-label fw-semibold small">Judul</label>
              <input
                type="text"
                className="form-control"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Juara 1 Lomba Adzan Tingkat Kabupaten"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold small">Kategori</label>
              <select className="form-select" value={kategori} onChange={(e) => setKategori(e.target.value as 'Berita' | 'Pengumuman' | 'Agenda')}>
                <option value="Berita">Berita</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Agenda">Agenda</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold small">Isi / Konten</label>
            <textarea
              className="form-control"
              rows={8}
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              placeholder="Tulis isi berita di sini..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small">
              Gambar Cover {mode === 'edit' && <span className="text-muted fw-normal">(kosongkan jika tidak ingin mengganti)</span>}
            </label>
            {existingGambar && !gambar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={existingGambar} alt="Gambar saat ini" className="d-block mb-2 rounded-3" style={{ height: 120, objectFit: 'cover' }} />
            )}
            {gambar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={URL.createObjectURL(gambar)} alt="Preview" className="d-block mb-2 rounded-3" style={{ height: 120, objectFit: 'cover' }} />
            )}
            <input
              type="file"
              className="form-control"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setGambar(e.target.files?.[0] ?? null)}
            />
            <small className="text-muted">Maks 2MB, format JPG/PNG/WebP</small>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn px-4 rounded-pill fw-semibold"
              disabled={loading}
              style={{ background: '#007c92', color: 'white' }}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2" />Menyimpan...</>
              ) : (
                <><i className="fas fa-save me-2" />{mode === 'edit' ? 'Simpan Perubahan' : 'Terbitkan'}</>
              )}
            </button>
            <a href="/admin/berita" className="btn btn-light rounded-pill px-4">Batal</a>
          </div>
        </form>
      </div>
    </div>
  )
}
