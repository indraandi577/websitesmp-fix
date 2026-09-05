-- ============================================
-- SCHEMA SUPABASE - Website SMP
-- Jalankan query ini di Supabase SQL Editor
-- ============================================

-- 1. Tabel BERITAS
CREATE TABLE IF NOT EXISTS beritas (
  id BIGSERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  kategori TEXT NOT NULL, -- 'Pengumuman', 'Berita', 'Agenda'
  gambar TEXT,
  slug TEXT UNIQUE,
  konten_blok JSONB, -- untuk konten blok (opsional)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel GURUS
CREATE TABLE IF NOT EXISTS gurus (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  foto TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel FASILITAS
CREATE TABLE IF NOT EXISTS fasilitas (
  id BIGSERIAL PRIMARY KEY,
  nama_fasilitas TEXT NOT NULL,
  deskripsi TEXT,
  foto TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel PENDAFTARANS
CREATE TABLE IF NOT EXISTS pendaftarans (
  id BIGSERIAL PRIMARY KEY,
  no_pendaftaran TEXT UNIQUE NOT NULL,
  nama_lengkap TEXT NOT NULL,
  no_hp_orang_tua TEXT NOT NULL,
  asal_sekolah TEXT NOT NULL,
  alamat TEXT NOT NULL,
  bukti_bayar TEXT,
  status TEXT DEFAULT 'akun_dibuat', -- 'akun_dibuat', 'menunggu_verifikasi', 'diterima'
  -- Biodata tambahan
  nik TEXT,
  nisn TEXT,
  tempat_lahir TEXT,
  tanggal_lahir DATE,
  jenis_kelamin TEXT CHECK (jenis_kelamin IN ('L', 'P')),
  -- Data orang tua
  nama_ayah TEXT,
  pekerjaan_ayah TEXT,
  penghasilan_ayah TEXT,
  status_ayah TEXT, -- 'Masih Hidup', 'Wafat'
  nama_ibu TEXT,
  pekerjaan_ibu TEXT,
  penghasilan_ibu TEXT,
  status_ibu TEXT,  -- 'Masih Hidup', 'Wafat'
  alamat_lengkap TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Aktifkan RLS untuk semua tabel
ALTER TABLE beritas ENABLE ROW LEVEL SECURITY;
ALTER TABLE gurus ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasilitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pendaftarans ENABLE ROW LEVEL SECURITY;

-- Beritas: publik bisa baca, hanya admin bisa tulis
CREATE POLICY "Publik bisa baca berita" ON beritas FOR SELECT USING (true);
CREATE POLICY "Admin bisa kelola berita" ON beritas FOR ALL USING (auth.role() = 'authenticated');

-- Gurus: publik bisa baca, hanya admin bisa tulis
CREATE POLICY "Publik bisa baca guru" ON gurus FOR SELECT USING (true);
CREATE POLICY "Admin bisa kelola guru" ON gurus FOR ALL USING (auth.role() = 'authenticated');

-- Fasilitas: publik bisa baca, hanya admin bisa tulis
CREATE POLICY "Publik bisa baca fasilitas" ON fasilitas FOR SELECT USING (true);
CREATE POLICY "Admin bisa kelola fasilitas" ON fasilitas FOR ALL USING (auth.role() = 'authenticated');

-- Pendaftaran: insert bebas (calon siswa), read/update/delete hanya admin
CREATE POLICY "Siapapun bisa daftar" ON pendaftarans FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin bisa kelola pendaftaran" ON pendaftarans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Siswa bisa lihat data sendiri" ON pendaftarans FOR SELECT USING (true);
CREATE POLICY "Siswa bisa update data sendiri" ON pendaftarans FOR UPDATE USING (true);

-- ============================================
-- STORAGE BUCKETS
-- Buat bucket ini di Supabase Storage
-- ============================================
-- Jalankan di SQL Editor:

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('beritas', 'beritas', true),
  ('gurus', 'gurus', true),
  ('fasilitas', 'fasilitas', true),
  ('bukti-bayar', 'bukti-bayar', false)
ON CONFLICT (id) DO NOTHING;

-- Policy storage: publik bisa baca gambar berita/guru/fasilitas
CREATE POLICY "Public read beritas" ON storage.objects FOR SELECT USING (bucket_id = 'beritas');
CREATE POLICY "Admin upload beritas" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'beritas' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete beritas" ON storage.objects FOR DELETE USING (bucket_id = 'beritas' AND auth.role() = 'authenticated');

CREATE POLICY "Public read gurus" ON storage.objects FOR SELECT USING (bucket_id = 'gurus');
CREATE POLICY "Admin upload gurus" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gurus' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete gurus" ON storage.objects FOR DELETE USING (bucket_id = 'gurus' AND auth.role() = 'authenticated');

CREATE POLICY "Public read fasilitas" ON storage.objects FOR SELECT USING (bucket_id = 'fasilitas');
CREATE POLICY "Admin upload fasilitas" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'fasilitas' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete fasilitas" ON storage.objects FOR DELETE USING (bucket_id = 'fasilitas' AND auth.role() = 'authenticated');

CREATE POLICY "Siswa upload bukti bayar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'bukti-bayar');
CREATE POLICY "Admin read bukti bayar" ON storage.objects FOR SELECT USING (bucket_id = 'bukti-bayar' AND auth.role() = 'authenticated');

-- ============================================
-- FUNGSI UPDATED_AT OTOMATIS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_beritas_updated_at BEFORE UPDATE ON beritas FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_gurus_updated_at BEFORE UPDATE ON gurus FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_fasilitas_updated_at BEFORE UPDATE ON fasilitas FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pendaftarans_updated_at BEFORE UPDATE ON pendaftarans FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
