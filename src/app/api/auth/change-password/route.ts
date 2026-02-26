import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

// POST - Change admin password
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('admin_session')?.value

    if (!sessionId) {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'كلمة المرور الحالية والجديدة مطلوبتان' },
        { status: 400 }
      )
    }

    const admin = await db.admin.findUnique({
      where: { id: sessionId }
    })

    if (!admin || admin.password !== currentPassword) {
      return NextResponse.json(
        { error: 'كلمة المرور الحالية غير صحيحة' },
        { status: 400 }
      )
    }

    await db.admin.update({
      where: { id: sessionId },
      data: { password: newPassword }
    })

    return NextResponse.json({ message: 'تم تغيير كلمة المرور بنجاح' })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json(
      { error: 'فشل في تغيير كلمة المرور' },
      { status: 500 }
    )
  }
}
