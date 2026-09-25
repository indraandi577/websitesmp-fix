import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'

function slugify(text: string) {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    + '-' + Date.now()
}

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value === 'authenticated'
}

export async function POST(request: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const judul = formData.get('judul') as string
  const kategori = formData.get('kategori') as string
  const isi = formData.get('isi') as string
  const gambarFile = formData.get('gambar') as File | null

  const supabase = createAdminClient()
  let gambarPath: string | null = null

  if (gambarFile && gambarFile.size > 0) {
    const ext = gambarFile.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('beritas')
      .upload(fileName, gambarFile, { contentType: gambarFile.type })
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })
    gambarPath = fileName
  }

  const { error } = await supabase.from('beritas').insert({
    judul, kategori, isi,
    gambar: gambarPath,
    slug: slugify(judul),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PUT(request: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const id = formData.get('id') as string
  const judul = formData.get('judul') as string
  const kategori = formData.get('kategori') as string
  const isi = formData.get('isi') as string
  const gambarFile = formData.get('gambar') as File | null
  const gambarLama = formData.get('gambar_lama') as string

  const supabase = createAdminClient()
  let gambarPath = gambarLama || null

  if (gambarFile && gambarFile.size > 0) {
    if (gambarLama) await supabase.storage.from('beritas').remove([gambarLama])
    const ext = gambarFile.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('beritas')
      .upload(fileName, gambarFile, { contentType: gambarFile.type })
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })
    gambarPath = fileName
  }

  const { error } = await supabase.from('beritas').update({
    judul, kategori, isi,
    gambar: gambarPath,
    slug: slugify(judul),
  }).eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, gambar } = await request.json()
  const supabase = createAdminClient()

  if (gambar) await supabase.storage.from('beritas').remove([gambar])
  const { error } = await supabase.from('beritas').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
