import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch all tools
export async function GET() {
  try {
    const tools = await db.tool.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(tools)
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { error: 'فشل في جلب الأدوات' },
      { status: 500 }
    )
  }
}

// POST - Create new tool
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, nameEn, description, downloadUrl, priceSDG, priceUSD, imageUrl } = body

    if (!name || !nameEn || !description || !downloadUrl || priceSDG === undefined || priceUSD === undefined) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      )
    }

    const tool = await db.tool.create({
      data: {
        name,
        nameEn,
        description,
        downloadUrl,
        priceSDG: parseFloat(priceSDG),
        priceUSD: parseFloat(priceUSD),
        imageUrl: imageUrl || null
      }
    })

    return NextResponse.json(tool, { status: 201 })
  } catch (error) {
    console.error('Error creating tool:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء الأداة' },
      { status: 500 }
    )
  }
}
