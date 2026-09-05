import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Ambil semua statistik sekaligus
  const [
    { count: jmlGuru },
    { count: jmlFasilitas },
    { count: jmlBerita },
    { count: jmlSiswa },
    { data: siswaBaru },
  ] = await Promise.all([
    supabase.from('gurus').select('*', { count: 'exact', head: true }),
    supabase.from('fasilitas').select('*', { count: 'exact', head: true }),
    supabase.from('beritas').select('*', { count: 'exact', head: true }),
    supabase.from('pendaftarans').select('*', { count: 'exact', head: true }),
    supabase
      .from('pendaftarans')
      .select('nama_lengkap, asal_sekolah, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const stats = [
    { label: 'Total Guru', value: jmlGuru ?? 0, icon: 'fa-chalkboard-teacher', color: '#007c92', href: '/admin/guru' },
    { label: 'Fasilitas', value: jmlFasilitas ?? 0, icon: 'fa-building', color: '#27ae60', href: '/admin/fasilitas' },
    { label: 'Calon Siswa', value: jmlSiswa ?? 0, icon: 'fa-user-graduate', color: '#2980b9', href: '/admin/pendaftaran' },
    { label: 'Berita & Info', value: jmlBerita ?? 0, icon: 'fa-newspaper', color: '#2c3e50', href: '/admin/berita' },
  ]

  function badgeColor(status: string) {
    switch (status) {
      case 'diterima': return '#27ae60'
      case 'menunggu_verifikasi': return '#e67e22'
      default: return '#7f8c8d'
    }
  }

  function statusLabel(status: string) {
    switch (status) {
      case 'diterima': return 'Diterima'
      case 'menunggu_verifikasi': return 'Menunggu Verifikasi'
      default: return 'Akun Dibuat'
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ color: '#1a1a2e' }}>Dashboard Utama</h3>
        <p className="text-muted small">Ringkasan pengelolaan website SMP Integral Hidayatullah Kebumen</p>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-4">
        {stats.map((s) => (
          <div className="col-md-3 col-sm-6" key={s.label}>
            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: 12, borderLeft: `4px solid ${s.color}` }}
            >
              <div className="card-body d-flex align-items-center p-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: 50, height: 50, background: `${s.color}20` }}
                >
                  <i className={`fas ${s.icon}`} style={{ color: s.color, fontSize: 20 }} />
                </div>
                <div>
                  <div className="text-muted small">{s.label}</div>
                  <h3 className="fw-bold mb-0" style={{ color: s.color }}>{s.value}</h3>
                </div>
              </div>
              <div className="card-footer bg-transparent border-top-0 px-4 pb-3">
                <Link href={s.href} className="small text-decoration-none fw-semibold" style={{ color: s.color }}>
                  Lihat Detail <i className="fas fa-arrow-right ms-1" style={{ fontSize: 10 }} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Pendaftar Terbaru */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
          <h6 className="fw-bold mb-0">
            <i className="fas fa-clock me-2" style={{ color: '#007c92' }} />
            Pendaftar Terbaru
          </h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ background: '#f8f9fa' }}>
                <tr>
                  <th className="px-4 py-3 small fw-semibold text-muted border-0">Nama Lengkap</th>
                  <th className="py-3 small fw-semibold text-muted border-0">Asal Sekolah</th>
                  <th className="py-3 small fw-semibold text-muted border-0">Status</th>
                  <th className="py-3 small fw-semibold text-muted border-0">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {!siswaBaru || siswaBaru.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5 text-muted">
                      <i className="fas fa-inbox fa-2x mb-2 d-block opacity-25" />
                      Belum ada pendaftar
                    </td>
                  </tr>
                ) : (
                  siswaBaru.map((s, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 fw-semibold">{s.nama_lengkap}</td>
                      <td className="py-3 text-muted">{s.asal_sekolah}</td>
                      <td className="py-3">
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{ background: badgeColor(s.status), fontSize: '0.75rem' }}
                        >
                          {statusLabel(s.status)}
                        </span>
                      </td>
                      <td className="py-3 text-muted small">
                        {new Date(s.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer bg-white border-0 px-4 pb-4">
          <Link href="/admin/pendaftaran" className="btn btn-sm px-4" style={{ background: '#007c92', color: 'white', borderRadius: 8 }}>
            Lihat Semua Pendaftar
          </Link>
        </div>
      </div>
    </div>
  )
}
