'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  id: number
  endpoint: string
  label: string
  gambar?: string | null
}

export default function DeleteButton({ id, endpoint, label, gambar }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`Yakin ingin menghapus ${label} ini?`)) return
    setLoading(true)
    await fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, gambar }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="btn btn-sm rounded-pill px-3"
      style={{ border: '1px solid #e74c3c', color: '#e74c3c' }}
    >
      {loading
        ? <span className="spinner-border spinner-border-sm" />
        : <><i className="fas fa-trash me-1" />Hapus</>
      }
    </button>
  )
}
