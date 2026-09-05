import dynamic from 'next/dynamic'
import StatSection from '@/components/home/StatSection'
import BeritaSection from '@/components/home/BeritaSection'
import { createClient } from '@/lib/supabase/server'
import type { Berita } from '@/lib/types'

const HeroSlider = dynamic(() => import('@/components/home/HeroSlider'), {
  ssr: false,
})

export const revalidate = 60 // revalidasi setiap 60 detik

export default async function HomePage() {
  const supabase = await createClient()

  const { data: beritas } = await supabase
    .from('beritas')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <>
      <HeroSlider />
      <StatSection />
      <BeritaSection beritas={(beritas as Berita[]) ?? []} />
    </>
  )
}
