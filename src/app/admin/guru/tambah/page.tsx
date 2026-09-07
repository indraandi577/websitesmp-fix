import GuruFasilitasForm from '@/components/admin/GuruFasilitasForm'

export default function TambahGuruPage() {
  return (
    <div>
      <div className="mb-4">
        <a href="/admin/guru" className="text-decoration-none text-muted small">
          <i className="fas fa-arrow-left me-1" />Kembali ke Daftar
        </a>
        <h3 className="fw-bold mt-2" style={{ color: '#1a1a2e' }}>Tambah Tenaga Pendidik</h3>
      </div>
      <GuruFasilitasForm type="guru" />
    </div>
  )
}
