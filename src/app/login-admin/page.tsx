'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginAdminPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Username atau password salah.')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: 'linear-gradient(135deg, #007c92 0%, #005a6b 100%)' }}
    >
      <div className="card border-0 shadow-lg" style={{ width: '100%', maxWidth: 420, borderRadius: 16 }}>
        <div className="card-body p-5">

          {/* Header */}
          <div className="text-center mb-4">
            <Image src="/img/logo.png" alt="Logo" width={70} height={70} className="mb-3" />
            <h4 className="fw-bold mb-0" style={{ color: '#007c92' }}>Panel Admin</h4>
            <small className="text-muted">SMP Integral Hidayatullah Kebumen</small>
          </div>

          {error && (
            <div className="alert alert-danger border-0 rounded-3 small py-2">
              <i className="fas fa-exclamation-circle me-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold small">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-user text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 bg-light"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold small">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-lock text-muted" />
                </span>
                <input
                  type="password"
                  className="form-control border-start-0 bg-light"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold py-2"
              disabled={loading}
              style={{ background: '#007c92', color: 'white', borderRadius: 8 }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Memproses...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2" />
                  Masuk
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}
