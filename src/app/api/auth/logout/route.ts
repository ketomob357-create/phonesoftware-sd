import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// POST - Admin logout
export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')

    return NextResponse.json({ message: 'تم تسجيل الخروج بنجاح' })
  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json(
      { error: 'فشل في تسجيل الخروج' },
      { status: 500 }
    )
  }
}
