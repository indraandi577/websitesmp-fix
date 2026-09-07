import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: jmlGuru },
    { count: jmlFasilitas },
    { count: jmlBerita },
  ] = await Promise.all([
    supabase.from('gurus').select('*', { count: 'exact', head: true }),
    supabase.from('fasilitas').select('*', { count: 'exact', head: true }),
    supabase.from('beritas').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      label: 'Berita & Info',
      value: jmlBerita ?? 0,
      icon: 'fa-newspaper',
      color: '#007c92',
      href: '/admin/berita',
      tambah: '/admin/berita/tambah',
    },
    {
      label: 'Data Guru',
      value: jmlGuru ?? 0,
      icon: 'fa-chalkboard-teacher',
      color: '#27ae60',
      href: '/admin/guru',
      tambah: '/admin/guru/tambah',
    },
    {
      label: 'Fasilitas',
      value: jmlFasilitas ?? 0,
      icon: 'fa-building',
      color: '#8e44ad',
      href: '/admin/fasilitas',
      tambah: '/admin/fasilitas/tambah',
    },
  ]

  return (
    <div>
      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ color: '#1a1a2e' }}>Dashboard Utama</h3>
        <p className="text-muted small">Selamat datang di panel admin SMP Integral Hidayatullah Kebumen</p>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-5">
        {stats.map((s) => (
          <div className="col-md-4" key={s.label}>
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 14, borderLeft: `4px solid ${s.color}` }}>
              <div className="card-body d-flex align-items-center p-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                  style={{ width: 54, height: 54, background: `${s.color}18` }}
                >
                  <i className={`fas ${s.icon}`} style={{ color: s.color, fontSize: 22 }} />
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted small">{s.label}</div>
                  <h3 className="fw-bold mb-0" style={{ color: s.color }}>{s.value}</h3>
                </div>
              </div>
              <div className="card-footer bg-transparent border-top px-4 py-3 d-flex gap-3 align-items-center">
                <Link href={s.href} className="small text-decoration-none fw-semibold" style={{ color: s.color }}>
                  <i className="fas fa-list me-1" style={{ fontSize: 11 }} />Lihat Semua
                </Link>
                <span className="text-muted">|</span>
                <Link href={s.tambah} className="small text-decoration-none fw-semibold" style={{ color: s.color }}>
                  <i className="fas fa-plus me-1" style={{ fontSize: 11 }} />Tambah Baru
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Akses Cepat */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 14 }}>
        <div className="card-header bg-white border-0 pt-4 pb-2 px-4">
          <h6 className="fw-bold mb-0">
            <i className="fas fa-bolt me-2" style={{ color: '#007c92' }} />
            Akses Cepat
          </h6>
        </div>
        <div className="card-body px-4 pb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <Link
                href="/admin/berita/tambah"
                className="d-flex align-items-center p-3 rounded-3 text-decoration-none"
                style={{ background: '#007c921a', border: '1px dashed #007c92' }}
              >
                <i className="fas fa-plus-circle me-3 fa-lg" style={{ color: '#007c92' }} />
                <div>
                  <div className="fw-semibold small" style={{ color: '#007c92' }}>Tulis Berita Baru</div>
                  <div className="text-muted" style={{ fontSize: 11 }}>Berita, Pengumuman, Agenda</div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link
                href="/admin/guru/tambah"
                className="d-flex align-items-center p-3 rounded-3 text-decoration-none"
                style={{ background: '#27ae601a', border: '1px dashed #27ae60' }}
              >
                <i className="fas fa-user-plus me-3 fa-lg" style={{ color: '#27ae60' }} />
                <div>
                  <div className="fw-semibold small" style={{ color: '#27ae60' }}>Tambah Data Guru</div>
                  <div className="text-muted" style={{ fontSize: 11 }}>Nama, jabatan, foto</div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link
                href="/admin/fasilitas/tambah"
                className="d-flex align-items-center p-3 rounded-3 text-decoration-none"
                style={{ background: '#8e44ad1a', border: '1px dashed #8e44ad' }}
              >
                <i className="fas fa-image me-3 fa-lg" style={{ color: '#8e44ad' }} />
                <div>
                  <div className="fw-semibold small" style={{ color: '#8e44ad' }}>Tambah Fasilitas</div>
                  <div className="text-muted" style={{ fontSize: 11 }}>Foto & deskripsi fasilitas</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info website publik */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: 14, background: 'linear-gradient(135deg, #007c92 0%, #005a6b 100%)' }}>
        <div className="card-body p-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h6 className="fw-bold text-white mb-1">Lihat Website Publik</h6>
            <p className="text-white opacity-75 small mb-0">Cek tampilan website yang dilihat pengunjung</p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="btn fw-semibold px-4"
            style={{ background: '#ffcc00', color: '#1a1a2e', borderRadius: 8 }}
          >
            <i className="fas fa-external-link-alt me-2" />Buka Website
          </Link>
        </div>
      </div>
    </div>
  )
}
