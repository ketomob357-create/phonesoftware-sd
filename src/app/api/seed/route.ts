import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const defaultTools = [
  { name: 'UnlockTool - أداة فك القفل', nameEn: 'UnlockTool', description: 'أداة قوية لفك قفل الهواتف الذكية من مختلف الماركات، تدعم فك قفل الشاشة وقفل الشبكة', priceSDG: 15000, priceUSD: 25, downloadUrl: 'https://unlocktool.net' },
  { name: 'Chimera Tool - أداة شيميرا', nameEn: 'Chimera Tool', description: 'أداة صيانة شاملة احترافية تدعم سامسونج، هواوي، LG وأكثر مع واجهة سهلة الاستخدام', priceSDG: 25000, priceUSD: 42, downloadUrl: 'https://chimeratool.com' },
  { name: 'SigmaKey - سيجما كي', nameEn: 'SigmaKey', description: 'أداة متخصصة في فك شفرة الهواتف MTK و Qualcomm مع دعم واسع للموديلات', priceSDG: 18000, priceUSD: 30, downloadUrl: 'https://sigmakey.com' },
  { name: 'Miracle Box - معجزة بوكس', nameEn: 'Miracle Box', description: 'أداة صيانة متكاملة تدعم معظم أنواع الهواتف مع ميزات متقدمة للإصلاح', priceSDG: 12000, priceUSD: 20, downloadUrl: 'https://miraclebox.info' },
  { name: 'CM2 (Infinity Box) - إنفينيتي بوكس', nameEn: 'CM2 Infinity Box', description: 'مجموعة أدوات Infinity للصيانة مع دعم ممتاز لهواتف MTK و SPD', priceSDG: 20000, priceUSD: 33, downloadUrl: 'https://infinity-box.com' },
  { name: 'GCPro Key - جي سي برو', nameEn: 'GCPro Key', description: 'أداة متخصصة في فك قفل سامسونج و LG مع دعم أحدث الموديلات', priceSDG: 13000, priceUSD: 22, downloadUrl: 'https://gcprokey.com' },
  { name: 'Z3X Box - زد 3 إكس', nameEn: 'Z3X Box', description: 'أداة احترافية متخصصة في صيانة سامسونج و LG مع تحديثات مستمرة', priceSDG: 19000, priceUSD: 32, downloadUrl: 'https://z3x-team.com' },
  { name: 'UMT (Ultimate Multi Tool) - ألتيميت مولتي تول', nameEn: 'UMT Ultimate Multi Tool', description: 'أداة متعددة الوظائف تدعم معظم الماركات مع ميزات متقدمة', priceSDG: 15000, priceUSD: 25, downloadUrl: 'https://umt.to' },
  { name: 'Easy JTAG Plus - إيزي جيتاج بلس', nameEn: 'Easy JTAG Plus', description: 'أداة متقدمة لإصلاح اللوحات الأم عبر JTAG و eMMC مع دعم واسع', priceSDG: 30000, priceUSD: 50, downloadUrl: 'https://easy-jtag.com' },
  { name: 'Octoplus Box - أوكتوبلس بوكس', nameEn: 'Octoplus Box', description: 'أداة صيانة شاملة تدعم سامسونج و LG مع ميزات متقدمة', priceSDG: 24000, priceUSD: 40, downloadUrl: 'https://octoplusbox.com' },
  { name: 'NCK Box - إن سي كي بوكس', nameEn: 'NCK Box', description: 'أداة احترافية لفك الشفرات وإصلاح الهواتف مع دعم واسع', priceSDG: 17000, priceUSD: 28, downloadUrl: 'https://nckbox.com' },
  { name: 'MRT Tool - إم آر تي تول', nameEn: 'MRT Tool', description: 'أداة متقدمة لإصلاح وفك قفل هواتف Xiaomi و Oppo و Vivo', priceSDG: 21000, priceUSD: 35, downloadUrl: 'https://mrt.KEY' },
  { name: 'UFI Box - يو إف آي بوكس', nameEn: 'UFI Box', description: 'أداة متخصصة في صيانة eMMC و ISP مع دعم تقني متقدم', priceSDG: 26000, priceUSD: 43, downloadUrl: 'https://ufibox.com' },
  { name: 'Hydra Tool - هيدرا تول', nameEn: 'Hydra Tool', description: 'أداة صيانة متعددة الرؤوس تدعم معظم أنواع الهواتف الذكية', priceSDG: 16000, priceUSD: 27, downloadUrl: 'https://hydratool.com' },
  { name: 'Avengers Box - أفنجرز بوكس', nameEn: 'Avengers Box', description: 'أداة صيانة قوية تدعم MTK و Qualcomm مع ميزات متقدمة', priceSDG: 18000, priceUSD: 30, downloadUrl: 'https://avengersbox.com' },
  { name: 'EFT Pro - إي إف تي برو', nameEn: 'EFT Pro', description: 'أداة احترافية لفك القفل وصيانة الهواتف مع واجهة حديثة', priceSDG: 14000, priceUSD: 23, downloadUrl: 'https://eftpro.com' },
  { name: 'Samsung Tool Pro - سامسونج تول برو', nameEn: 'Samsung Tool Pro', description: 'أداة متخصصة حصرياً في صيانة هواتف سامسونج', priceSDG: 12000, priceUSD: 20, downloadUrl: 'https://samsungtool.pro' },
  { name: 'LG Tool - إل جي تول', nameEn: 'LG Tool', description: 'أداة متخصصة في صيانة وفك قفل هواتف LG', priceSDG: 11000, priceUSD: 18, downloadUrl: 'https://lgtool.net' },
  { name: 'Huawei Tool - هواوي تول', nameEn: 'Huawei Tool', description: 'أداة متخصصة في صيانة وفك قفل هواتف هواوي وهنور', priceSDG: 13000, priceUSD: 22, downloadUrl: 'https://huawei TOOL.com' },
  { name: 'MTK Tool - إم تي كي تول', nameEn: 'MTK Tool', description: 'أداة متخصصة في صيانة هواتف معالجات MediaTek', priceSDG: 10000, priceUSD: 17, downloadUrl: 'https://mtktool.com' },
  { name: 'SPD Tool - إس بي دي تول', nameEn: 'SPD Tool', description: 'أداة متخصصة في صيانة هواتف معالجات Spreadtrum', priceSDG: 10000, priceUSD: 17, downloadUrl: 'https://spdtool.com' },
  { name: 'Qualcomm Tool - كوالكوم تول', nameEn: 'Qualcomm Tool', description: 'أداة متخصصة في صيانة هواتف معالجات Qualcomm المتقدمة', priceSDG: 12000, priceUSD: 20, downloadUrl: 'https://qualcommtool.com' },
]

// GET - Seed database with default tools and admin
export async function GET() {
  try {
    // Check if admin exists
    const existingAdmin = await db.admin.findUnique({
      where: { email: 'ketomob357@gmail.com' }
    })

    if (!existingAdmin) {
      // Create default admin (password will be hashed by bcrypt in production)
      await db.admin.create({
        data: {
          email: 'ketomob357@gmail.com',
          password: '123456789'
        }
      })
    }

    // Check if tools exist
    const existingTools = await db.tool.count()

    if (existingTools === 0) {
      // Create default tools
      await db.tool.createMany({
        data: defaultTools
      })
    }

    return NextResponse.json({
      message: 'تم تهيئة قاعدة البيانات بنجاح',
      adminCreated: !existingAdmin,
      toolsCreated: existingTools === 0 ? defaultTools.length : 0
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'فشل في تهيئة قاعدة البيانات' },
      { status: 500 }
    )
  }
}
