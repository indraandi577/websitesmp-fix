// ============================================
// Types untuk semua tabel Supabase
// ============================================

export type Berita = {
  id: number
  judul: string
  isi: string
  kategori: 'Pengumuman' | 'Berita' | 'Agenda'
  gambar: string | null
  slug: string | null
  konten_blok: object | null
  created_at: string
  updated_at: string
}

export type Guru = {
  id: number
  nama: string
  jabatan: string
  foto: string
  created_at: string
  updated_at: string
}

export type Fasilitas = {
  id: number
  nama_fasilitas: string
  deskripsi: string | null
  foto: string
  created_at: string
  updated_at: string
}

export type StatusPendaftaran =
  | 'akun_dibuat'
  | 'menunggu_verifikasi'
  | 'diterima'

export type Pendaftaran = {
  id: number
  no_pendaftaran: string
  nama_lengkap: string
  no_hp_orang_tua: string
  asal_sekolah: string
  alamat: string
  bukti_bayar: string | null
  status: StatusPendaftaran
  // Biodata
  nik: string | null
  nisn: string | null
  tempat_lahir: string | null
  tanggal_lahir: string | null
  jenis_kelamin: 'L' | 'P' | null
  // Data orang tua
  nama_ayah: string | null
  pekerjaan_ayah: string | null
  penghasilan_ayah: string | null
  status_ayah: string | null
  nama_ibu: string | null
  pekerjaan_ibu: string | null
  penghasilan_ibu: string | null
  status_ibu: string | null
  alamat_lengkap: string | null
  created_at: string
  updated_at: string
}
