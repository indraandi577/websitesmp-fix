import BeritaForm from '@/components/admin/BeritaForm'

export default function TambahBeritaPage() {
  return (
    <div>
      <div className="mb-4">
        <a href="/admin/berita" className="text-decoration-none text-muted small">
          <i className="fas fa-arrow-left me-1" />Kembali ke Daftar
        </a>
        <h3 className="fw-bold mt-2" style={{ color: '#1a1a2e' }}>Tambah Berita / Informasi</h3>
      </div>
      <BeritaForm mode="tambah" />
    </div>
  )
}
