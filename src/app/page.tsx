import HeroSliderWrapper from '@/components/home/HeroSliderWrapper'
import StatSection from '@/components/home/StatSection'
import BeritaSection from '@/components/home/BeritaSection'
import { createClient } from '@/lib/supabase/server'
import type { Berita } from '@/lib/types'

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()

  const { data: beritas } = await supabase
    .from('beritas')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <>
      <HeroSliderWrapper />
      <StatSection />
      <BeritaSection beritas={(beritas as Berita[]) ?? []} />
    </>
  )
}
