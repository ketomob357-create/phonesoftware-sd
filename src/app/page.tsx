'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Search, 
  Phone, 
  Settings, 
  Wrench, 
  Shield, 
  Zap,
  Star,
  ExternalLink,
  Sparkles,
  Cpu,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  downloadUrl: string;
  priceSDG: number;
  priceUSD: number;
  imageUrl: string | null;
}

const neonColors = [
  { bg: 'from-cyan-500/20 to-blue-600/20', border: 'border-cyan-400/40', text: 'text-cyan-400', glow: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]', button: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/20' },
  { bg: 'from-green-400/20 to-emerald-600/20', border: 'border-green-400/40', text: 'text-green-400', glow: 'hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]', button: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/20' },
  { bg: 'from-purple-500/20 to-violet-600/20', border: 'border-purple-400/40', text: 'text-purple-400', glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]', button: 'from-purple-500 to-violet-600', shadow: 'shadow-purple-500/20' },
  { bg: 'from-pink-500/20 to-rose-600/20', border: 'border-pink-400/40', text: 'text-pink-400', glow: 'hover:shadow-[0_0_30px_rgba(255,0,110,0.3)]', button: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-500/20' },
];

export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seedDatabase = async () => {
      try {
        await fetch('/api/seed');
      } catch (error) {
        console.error('Error seeding database:', error);
      }
    };

    const fetchTools = async () => {
      try {
        const response = await fetch('/api/tools');
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    seedDatabase().then(fetchTools);
  }, []);

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/10">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-[#0a0a0f] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    سوفت وير الهواتف SD
                  </span>
                </h1>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Cpu className="w-3 h-3" />
                  Phone Software Tools
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400 px-4 py-1.5 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <Zap className="w-4 h-4 ml-1" />
                متاح الآن
              </Badge>
              <Link href="/admin/login">
                <Button variant="outline" className="border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                  <Settings className="w-4 h-4 ml-2" />
                  لوحة التحكم
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">أفضل أدوات السوفت وير</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                أدوات سوفت وير احترافية
              </span>
              <br />
              <span className="text-white">لصيانة وإصلاح الهواتف</span>
            </h2>
            
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
              نوفر لك أفضل أدوات السوفت وير لصيانة وإصلاح الهواتف الذكية بأسعار منافسة وجودة عالية مع دعم فني متواصل
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <div className="relative">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن أداة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-14 py-7 bg-gray-900/80 border-gray-700/50 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 text-white placeholder:text-gray-500 rounded-2xl text-lg backdrop-blur-sm transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-bold text-cyan-400 mb-2 group-hover:text-shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all">
                {tools.length}+
              </div>
              <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
                <Wrench className="w-4 h-4" />
                أداة متاحة
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-green-400 mb-2 group-hover:text-shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all">
                500+
              </div>
              <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
                <Star className="w-4 h-4" />
                عميل سعيد
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:text-shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all">
                24/7
              </div>
              <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
                <Zap className="w-4 h-4" />
                دعم فني
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-pink-400 mb-2 group-hover:text-shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all">
                100%
              </div>
              <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
                <Shield className="w-4 h-4" />
                ضمان الجودة
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                الأدوات المتاحة
              </h3>
              <p className="text-gray-400 mt-2 mr-13">اختر من بين أفضل أدوات السوفت وير</p>
            </div>
            <Badge variant="outline" className="border-gray-700/50 text-gray-400 px-4 py-2 text-sm">
              {filteredTools.length} أداة
            </Badge>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800/50 rounded-2xl h-80 border border-gray-700/30"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool, index) => {
                const colorIndex = index % neonColors.length;
                const color = neonColors[colorIndex];
                
                return (
                  <Card
                    key={tool.id}
                    className={`bg-gradient-to-br ${color.bg} ${color.border} border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] ${color.glow} group overflow-hidden`}
                  >
                    {/* Glow effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <CardHeader className="pb-3 relative">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 flex items-center justify-center border ${color.border} shadow-lg ${color.shadow}`}>
                          <Shield className={`w-6 h-6 ${color.text}`} />
                        </div>
                        <Badge variant="outline" className={`${color.border} ${color.text} backdrop-blur-sm`}>
                          {tool.nameEn.split(' ')[0]}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg mt-4 group-hover:text-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm line-clamp-2">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4 relative">
                      <div className="flex items-center gap-3">
                        <Badge className={`bg-gradient-to-r ${color.button}/20 text-white border-0 shadow-lg ${color.shadow}`}>
                          <span className="font-bold">{tool.priceSDG.toLocaleString()}</span>
                          <span className="text-xs mr-1 opacity-80">ج.س</span>
                        </Badge>
                        <Badge className="bg-gradient-to-r from-gray-600/30 to-gray-700/30 text-gray-300 border-0">
                          <span className="font-bold">${tool.priceUSD}</span>
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 relative">
                      <Button
                        className={`w-full bg-gradient-to-r ${color.button} hover:brightness-110 text-white font-medium py-5 shadow-lg ${color.shadow} hover:shadow-xl transition-all duration-300`}
                        onClick={() => {
                          if (tool.downloadUrl && tool.downloadUrl !== '#') {
                            window.open(tool.downloadUrl, '_blank');
                          }
                        }}
                      >
                        <Download className="w-5 h-5 ml-2" />
                        تحميل الأداة
                        <ExternalLink className="w-4 h-4 mr-2 opacity-70" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}

          {!loading && filteredTools.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gray-800/50 flex items-center justify-center border border-gray-700/30">
                <Search className="w-12 h-12 text-gray-600" />
              </div>
              <p className="text-gray-400 text-xl">لم يتم العثور على نتائج</p>
              <p className="text-gray-500 mt-2">حاول البحث بكلمات مختلفة</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gray-900/30 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Phone className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="font-bold text-white text-lg">سوفت وير الهواتف SD</p>
                <p className="text-gray-400 text-sm">تصميم: المهندس محمد عبدالقادر أحمد</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                جميع الحقوق محفوظة © 2024
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-cyan-400 px-4 py-2">
                <Shield className="w-4 h-4 ml-1" />
                حماية العيون مفعلة
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
