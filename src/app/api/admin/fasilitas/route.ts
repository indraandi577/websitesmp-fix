import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value === 'authenticated'
}

export async function POST(request: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const nama = formData.get('nama') as string
  const deskripsi = formData.get('deskripsi') as string
  const fotoFile = formData.get('foto') as File

  const supabase = await createClient()
  const ext = fotoFile.name.split('.').pop()
  const fileName = `${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('fasilitas')
    .upload(fileName, fotoFile, { contentType: fotoFile.type })
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { error } = await supabase.from('fasilitas').insert({ nama_fasilitas: nama, deskripsi: deskripsi || null, foto: fileName })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, gambar } = await request.json()
  const supabase = await createClient()

  if (gambar) await supabase.storage.from('fasilitas').remove([gambar])
  const { error } = await supabase.from('fasilitas').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
