'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  type: 'guru' | 'fasilitas'
}

export default function GuruFasilitasForm({ type }: Props) {
  const router = useRouter()
  const [nama, setNama] = useState('')
  const [jabatan, setJabatan] = useState('')       // hanya guru
  const [deskripsi, setDeskripsi] = useState('')   // hanya fasilitas
  const [foto, setFoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setFoto(file)
    if (file) setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!foto) { setError('Foto wajib diupload.'); return }
    setError('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('nama', nama)
      formData.append('foto', foto)
      if (type === 'guru') formData.append('jabatan', jabatan)
      if (type === 'fasilitas') formData.append('deskripsi', deskripsi)

      const res = await fetch(`/api/admin/${type}`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Terjadi kesalahan')
      }

      router.push(`/admin/${type}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      setLoading(false)
    }
  }

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12, maxWidth: 600 }}>
      <div className="card-body p-4">
        {error && (
          <div className="alert alert-danger border-0 rounded-3 small">
            <i className="fas fa-exclamation-circle me-2" />{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">
              {type === 'guru' ? 'Nama Lengkap & Gelar' : 'Nama Fasilitas'}
            </label>
            <input
              type="text"
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder={type === 'guru' ? 'Contoh: Ustadz Ahmad, S.Pd' : 'Contoh: Laboratorium Komputer'}
              required
            />
          </div>

          {type === 'guru' && (
            <div className="mb-3">
              <label className="form-label fw-semibold small">Jabatan</label>
              <input
                type="text"
                className="form-control"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                placeholder="Contoh: Guru Matematika / Kepala Sekolah"
                required
              />
            </div>
          )}

          {type === 'fasilitas' && (
            <div className="mb-3">
              <label className="form-label fw-semibold small">Deskripsi (Opsional)</label>
              <textarea
                className="form-control"
                rows={3}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Jelaskan singkat tentang fasilitas ini..."
              />
            </div>
          )}

          <div className="mb-4">
            <label className="form-label fw-semibold small">
              Foto {type === 'guru' ? '(rasio 3:4 disarankan)' : ''}
            </label>
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="d-block mb-2 rounded-3" style={{ height: 140, objectFit: 'cover' }} />
            )}
            <input
              type="file"
              className="form-control"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFoto}
              required
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
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Menyimpan...</>
                : <><i className="fas fa-save me-2" />Simpan Data</>
              }
            </button>
            <a href={`/admin/${type}`} className="btn btn-light rounded-pill px-4">Batal</a>
          </div>
        </form>
      </div>
    </div>
  )
}
