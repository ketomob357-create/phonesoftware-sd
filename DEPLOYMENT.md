# 🚀 دليل نشر موقع سوفت وير الهواتف SD

## الخطوة 1: إنشاء قاعدة بيانات Neon (مجانية)

1. اذهب إلى [neon.tech](https://neon.tech)
2. اضغط **"Sign Up"** وإنشاء حساب مجاني
3. بعد تسجيل الدخول، اضغط **"Create a project"**
4. أدخل اسم المشروع: `phonesoftware-sd`
5. اختر المنطقة الأقرب لك
6. اضغط **"Create project"**
7. **انسخ رابط قاعدة البيانات** (DATABASE_URL) - سيكون شكله:
   ```
   postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

---

## الخطوة 2: نشر الموقع على Vercel (مجاني)

### الطريقة 1: عبر موقع Vercel (الأسهل)

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط **"Sign Up"** وسجل باستخدام GitHub
3. بعد تسجيل الدخول، اضغط **"Add New..."** → **"Project"**
4. اختر **"Import Git Repository"**
5. ارفع مجلد المشروع إلى GitHub أولاً، ثم اختره
6. في إعدادات المشروع:
   - **Framework Preset**: Next.js
   - **Build Command**: `prisma generate && next build`
   - **Install Command**: `bun install`
7. في قسم **Environment Variables**، أضف:
   ```
   DATABASE_URL = [رابط Neon الذي نسخته]
   DIRECT_URL = [نفس رابط Neon]
   ```
8. اضغط **"Deploy"**
9. انتظر بضع دقائق حتى يكتمل النشر
10. ستحصل على رابط مثل: `phonesoftware-sd.vercel.app`

### الطريقة 2: عبر Vercel CLI

```bash
# 1. تثبيت Vercel CLI
npm i -g vercel

# 2. تسجيل الدخول
vercel login

# 3. النشر
cd /home/z/my-project
vercel

# 4. إضافة متغيرات البيئة
vercel env add DATABASE_URL
vercel env add DIRECT_URL

# 5. إعادة النشر
vercel --prod
```

---

## الخطوة 3: تهيئة قاعدة البيانات

بعد النشر، افتح المتصفح على:
```
https://your-site.vercel.app/api/seed
```

سيقوم هذا بإنشاء الأدوات والمدير الافتراضي.

---

## الخطوة 4: الحصول على نطاق .com

### من Namecheap (موصى به):

1. اذهب إلى [namecheap.com](https://www.namecheap.com)
2. ابحث عن النطاق المطلوب مثل: `phonesoftware-sd.com`
3. اشترِ النطاق (حوالي $8-12/سنة)
4. في لوحة تحكم Namecheap:
   - اذهب إلى **Domain List** → **Manage**
   - اضغط **"Advanced DNS"**
   - أضف السجلات التالية:

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | CNAME | @ | cname.vercel-dns.com | Automatic |
   | CNAME | www | cname.vercel-dns.com | Automatic |

5. في Vercel:
   - اذهب إلى إعدادات المشروع → **Domains**
   - أضف نطاقك: `phonesoftware-sd.com`
   - أضف أيضاً: `www.phonesoftware-sd.com`

---

## 📞 بيانات الدخول للوحة التحكم

| الحقل | القيمة |
|-------|--------|
| **البريد الإلكتروني** | ketomob357@gmail.com |
| **كلمة المرور** | 123456789 |

---

## 🔗 روابط مهمة

- **الصفحة الرئيسية**: `https://your-site.vercel.app/`
- **تسجيل الدخول**: `https://your-site.vercel.app/admin/login`
- **لوحة التحكم**: `https://your-site.vercel.app/admin/dashboard`
- **تهيئة قاعدة البيانات**: `https://your-site.vercel.app/api/seed`

---

## ⚠️ ملاحظات مهمة

1. **غيّر كلمة المرور الافتراضية** بعد أول تسجيل دخول
2. **احتفظ بنسخة من روابط قاعدة البيانات** في مكان آمن
3. **قاعدة بيانات Neon المجانية** تدعم 0.5 GB - كافية لهذا المشروع

---

## 🆘 الدعم

- [توثيق Vercel](https://vercel.com/docs)
- [توثيق Neon](https://neon.tech/docs)
- [توثيق Prisma](https://www.prisma.io/docs)

---

**تصميم: المهندس محمد عبدالقادر أحمد**
**جميع الحقوق محفوظة © 2024**
