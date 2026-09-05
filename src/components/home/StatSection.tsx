const stats = [
  { icon: 'fa-user-graduate', value: '500+', label: 'Alumni Berprestasi' },
  { icon: 'fa-chalkboard-teacher', value: '30+', label: 'Tenaga Pendidik' },
  { icon: 'fa-trophy', value: '100+', label: 'Prestasi & Kejuaraan' },
  { icon: 'fa-book-open', value: '12+', label: 'Ekstrakurikuler' },
]

export default function StatSection() {
  return (
    <section className="py-5" style={{ background: 'var(--smp-base)' }}>
      <div className="container">
        <div className="row g-4 text-center text-white">
          {stats.map((s) => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className="p-3">
                <i className={`fas ${s.icon} fa-2x mb-3`} style={{ color: '#ffcc00' }} />
                <h2 className="fw-bold display-6 mb-1">{s.value}</h2>
                <p className="mb-0 opacity-75 small fw-semibold">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
