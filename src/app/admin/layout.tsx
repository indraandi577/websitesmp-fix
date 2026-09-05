import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session || session.value !== 'authenticated') {
    redirect('/login-admin')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f9' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: 260, padding: '30px 32px', minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  )
}
