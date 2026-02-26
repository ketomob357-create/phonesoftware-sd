import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch single tool
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const tool = await db.tool.findUnique({
      where: { id }
    })

    if (!tool) {
      return NextResponse.json(
        { error: 'الأداة غير موجودة' },
        { status: 404 }
      )
    }

    return NextResponse.json(tool)
  } catch (error) {
    console.error('Error fetching tool:', error)
    return NextResponse.json(
      { error: 'فشل في جلب الأداة' },
      { status: 500 }
    )
  }
}

// PUT - Update tool
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, nameEn, description, downloadUrl, priceSDG, priceUSD, imageUrl } = body

    const existingTool = await db.tool.findUnique({
      where: { id }
    })

    if (!existingTool) {
      return NextResponse.json(
        { error: 'الأداة غير موجودة' },
        { status: 404 }
      )
    }

    const tool = await db.tool.update({
      where: { id },
      data: {
        name: name || existingTool.name,
        nameEn: nameEn || existingTool.nameEn,
        description: description || existingTool.description,
        downloadUrl: downloadUrl || existingTool.downloadUrl,
        priceSDG: priceSDG !== undefined ? parseFloat(priceSDG) : existingTool.priceSDG,
        priceUSD: priceUSD !== undefined ? parseFloat(priceUSD) : existingTool.priceUSD,
        imageUrl: imageUrl !== undefined ? imageUrl : existingTool.imageUrl
      }
    })

    return NextResponse.json(tool)
  } catch (error) {
    console.error('Error updating tool:', error)
    return NextResponse.json(
      { error: 'فشل في تحديث الأداة' },
      { status: 500 }
    )
  }
}

// DELETE - Delete tool
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existingTool = await db.tool.findUnique({
      where: { id }
    })

    if (!existingTool) {
      return NextResponse.json(
        { error: 'الأداة غير موجودة' },
        { status: 404 }
      )
    }

    await db.tool.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'تم حذف الأداة بنجاح' })
  } catch (error) {
    console.error('Error deleting tool:', error)
    return NextResponse.json(
      { error: 'فشل في حذف الأداة' },
      { status: 500 }
    )
  }
}
