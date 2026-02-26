'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Phone, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X,
  Key,
  Wrench,
  DollarSign,
  Link as LinkIcon,
  Settings,
  Loader2,
  AlertCircle,
  CheckCircle,
  Shield,
  Eye,
  EyeOff,
  PriceEdit
} from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

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

interface Admin {
  id: string;
  email: string;
}

const neonColors = [
  { bg: 'from-cyan-500/10 to-blue-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { bg: 'from-green-500/10 to-emerald-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  { bg: 'from-purple-500/10 to-violet-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  { bg: 'from-pink-500/10 to-rose-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Add Tool Form
  const [newTool, setNewTool] = useState({
    name: '',
    nameEn: '',
    description: '',
    downloadUrl: '',
    priceSDG: '',
    priceUSD: '',
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addingTool, setAddingTool] = useState(false);

  // Edit Tool
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [updatingTool, setUpdatingTool] = useState(false);

  // Delete Tool
  const [deletingTool, setDeletingTool] = useState<Tool | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Change Password
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Change Price - NEW
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [priceEditingTool, setPriceEditingTool] = useState<Tool | null>(null);
  const [newPriceSDG, setNewPriceSDG] = useState('');
  const [newPriceUSD, setNewPriceUSD] = useState('');
  const [updatingPrice, setUpdatingPrice] = useState(false);
  const [priceType, setPriceType] = useState<'both' | 'sdg' | 'usd'>('both');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      if (!data.authenticated) {
        router.push('/admin/login');
        return;
      }
      setAdmin(data.admin);
      fetchTools();
    } catch (error) {
      router.push('/admin/login');
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

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddTool = async () => {
    if (!newTool.name || !newTool.nameEn || !newTool.description || !newTool.downloadUrl || !newTool.priceSDG || !newTool.priceUSD) {
      showMessage('error', 'جميع الحقول مطلوبة');
      return;
    }

    setAddingTool(true);
    try {
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTool,
          priceSDG: parseFloat(newTool.priceSDG),
          priceUSD: parseFloat(newTool.priceUSD),
        }),
      });

      if (!response.ok) throw new Error('فشل في إضافة الأداة');

      const tool = await response.json();
      setTools([tool, ...tools]);
      setNewTool({ name: '', nameEn: '', description: '', downloadUrl: '', priceSDG: '', priceUSD: '' });
      setAddDialogOpen(false);
      showMessage('success', 'تم إضافة الأداة بنجاح');
    } catch (error) {
      showMessage('error', 'فشل في إضافة الأداة');
    } finally {
      setAddingTool(false);
    }
  };

  const handleUpdateTool = async () => {
    if (!editingTool) return;

    setUpdatingTool(true);
    try {
      const response = await fetch(`/api/tools/${editingTool.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTool),
      });

      if (!response.ok) throw new Error('فشل في تحديث الأداة');

      const updatedTool = await response.json();
      setTools(tools.map(t => t.id === updatedTool.id ? updatedTool : t));
      setEditDialogOpen(false);
      setEditingTool(null);
      showMessage('success', 'تم تحديث الأداة بنجاح');
    } catch (error) {
      showMessage('error', 'فشل في تحديث الأداة');
    } finally {
      setUpdatingTool(false);
    }
  };

  // NEW: Handle Price Update
  const handleUpdatePrice = async () => {
    if (!priceEditingTool) return;

    setUpdatingPrice(true);
    try {
      const updateData: Partial<Tool> = { id: priceEditingTool.id };
      
      if (priceType === 'both' || priceType === 'sdg') {
        if (!newPriceSDG || isNaN(parseFloat(newPriceSDG))) {
          showMessage('error', 'الرجاء إدخال سعر صحيح بالجنيه السوداني');
          setUpdatingPrice(false);
          return;
        }
        updateData.priceSDG = parseFloat(newPriceSDG);
      }
      
      if (priceType === 'both' || priceType === 'usd') {
        if (!newPriceUSD || isNaN(parseFloat(newPriceUSD))) {
          showMessage('error', 'الرجاء إدخال سعر صحيح بالدولار');
          setUpdatingPrice(false);
          return;
        }
        updateData.priceUSD = parseFloat(newPriceUSD);
      }

      const response = await fetch(`/api/tools/${priceEditingTool.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error('فشل في تحديث السعر');

      const updatedTool = await response.json();
      setTools(tools.map(t => t.id === updatedTool.id ? updatedTool : t));
      setPriceDialogOpen(false);
      setPriceEditingTool(null);
      showMessage('success', 'تم تحديث السعر بنجاح');
    } catch (error) {
      showMessage('error', 'فشل في تحديث السعر');
    } finally {
      setUpdatingPrice(false);
    }
  };

  const openPriceDialog = (tool: Tool, type: 'both' | 'sdg' | 'usd') => {
    setPriceEditingTool(tool);
    setNewPriceSDG(tool.priceSDG.toString());
    setNewPriceUSD(tool.priceUSD.toString());
    setPriceType(type);
    setPriceDialogOpen(true);
  };

  const handleDeleteTool = async () => {
    if (!deletingTool) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/tools/${deletingTool.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('فشل في حذف الأداة');

      setTools(tools.filter(t => t.id !== deletingTool.id));
      setDeleteDialogOpen(false);
      setDeletingTool(null);
      showMessage('success', 'تم حذف الأداة بنجاح');
    } catch (error) {
      showMessage('error', 'فشل في حذف الأداة');
    } finally {
      setDeleting(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage('error', 'جميع الحقول مطلوبة');
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage('error', 'كلمة المرور الجديدة غير متطابقة');
      return;
    }

    if (newPassword.length < 6) {
      showMessage('error', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setChangingPassword(true);
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage('error', data.error || 'فشل في تغيير كلمة المرور');
        return;
      }

      setPasswordDialogOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showMessage('success', 'تم تغيير كلمة المرور بنجاح');
    } catch (error) {
      showMessage('error', 'فشل في تغيير كلمة المرور');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
          <p className="mt-4 text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    سوفت وير الهواتف SD
                  </h1>
                  <p className="text-xs text-gray-400">لوحة التحكم</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30">
                <Shield className="w-3 h-3 ml-1" />
                مدير
              </Badge>
              <span className="text-gray-400 text-sm hidden md:block">{admin?.email}</span>

              {/* Change Password Dialog */}
              <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
                    <Key className="w-4 h-4 ml-2" />
                    تغيير كلمة المرور
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">تغيير كلمة المرور</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      أدخل كلمة المرور الحالية والجديدة
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">كلمة المرور الحالية</Label>
                      <Input
                        type={showPasswords ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">كلمة المرور الجديدة</Label>
                      <Input
                        type={showPasswords ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">تأكيد كلمة المرور الجديدة</Label>
                      <Input
                        type={showPasswords ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPasswords(!showPasswords)}
                        className="text-gray-400"
                      >
                        {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span className="mr-2">{showPasswords ? 'إخفاء' : 'إظهار'}</span>
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPasswordDialogOpen(false)} className="border-gray-700 text-gray-300">
                      إلغاء
                    </Button>
                    <Button onClick={handleChangePassword} disabled={changingPassword} className="bg-cyan-500 hover:bg-cyan-600">
                      {changingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : 'تغيير'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="destructive" onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30">
                <LogOut className="w-4 h-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Message Alert */}
      {message && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
          <Alert className={`w-96 ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'} backdrop-blur-xl`}>
            {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
            <CardHeader className="pb-2">
              <CardDescription className="text-cyan-400">إجمالي الأدوات</CardDescription>
              <CardTitle className="text-3xl text-white">{tools.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Wrench className="w-8 h-8 text-cyan-400/50" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardHeader className="pb-2">
              <CardDescription className="text-green-400">إجمالي الأسعار (ج.س)</CardDescription>
              <CardTitle className="text-3xl text-white">{tools.reduce((sum, t) => sum + t.priceSDG, 0).toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <DollarSign className="w-8 h-8 text-green-400/50" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/30">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-400">إجمالي الأسعار ($)</CardDescription>
              <CardTitle className="text-3xl text-white">${tools.reduce((sum, t) => sum + t.priceUSD, 0).toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <DollarSign className="w-8 h-8 text-purple-400/50" />
            </CardContent>
          </Card>
        </div>

        {/* Add Tool Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            <Settings className="inline-block w-6 h-6 ml-2 text-cyan-400" />
            إدارة الأدوات
          </h2>

          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/30">
                <Plus className="w-4 h-4 ml-2" />
                إضافة أداة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-white">إضافة أداة جديدة</DialogTitle>
                <DialogDescription className="text-gray-400">
                  أدخل بيانات الأداة الجديدة
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">اسم الأداة (عربي)</Label>
                    <Input
                      value={newTool.name}
                      onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                      placeholder="مثال: أداة الفتح"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">اسم الأداة (إنجليزي)</Label>
                    <Input
                      value={newTool.nameEn}
                      onChange={(e) => setNewTool({ ...newTool, nameEn: e.target.value })}
                      placeholder="Unlock Tool"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">الوصف</Label>
                  <Textarea
                    value={newTool.description}
                    onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                    placeholder="وصف مختصر للأداة..."
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">رابط التحميل</Label>
                  <Input
                    value={newTool.downloadUrl}
                    onChange={(e) => setNewTool({ ...newTool, downloadUrl: e.target.value })}
                    placeholder="https://..."
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">السعر (ج.س)</Label>
                    <Input
                      type="number"
                      value={newTool.priceSDG}
                      onChange={(e) => setNewTool({ ...newTool, priceSDG: e.target.value })}
                      placeholder="15000"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">السعر ($)</Label>
                    <Input
                      type="number"
                      value={newTool.priceUSD}
                      onChange={(e) => setNewTool({ ...newTool, priceUSD: e.target.value })}
                      placeholder="25"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)} className="border-gray-700 text-gray-300">
                  إلغاء
                </Button>
                <Button onClick={handleAddTool} disabled={addingTool} className="bg-cyan-500 hover:bg-cyan-600">
                  {addingTool ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span className="mr-2">إضافة</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const colorIndex = index % neonColors.length;
            const color = neonColors[colorIndex];

            return (
              <Card
                key={tool.id}
                className={`bg-gradient-to-br ${color.bg} ${color.border} border backdrop-blur-sm`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border ${color.border}`}>
                      <Wrench className={`w-5 h-5 ${color.text}`} />
                    </div>
                    <Badge variant="outline" className={`${color.border} ${color.text}`}>
                      {tool.nameEn.split(' ')[0]}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg mt-3">{tool.name}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm line-clamp-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  {/* Prices with individual edit buttons */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30">
                        {tool.priceSDG.toLocaleString()} ج.س
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10 h-7 px-2"
                        onClick={() => openPriceDialog(tool, 'sdg')}
                      >
                        <DollarSign className="w-3 h-3" />
                        تغيير
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30">
                        ${tool.priceUSD}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-7 px-2"
                        onClick={() => openPriceDialog(tool, 'usd')}
                      >
                        <DollarSign className="w-3 h-3" />
                        تغيير
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800/50 mt-2"
                      onClick={() => openPriceDialog(tool, 'both')}
                    >
                      <DollarSign className="w-3 h-3 ml-1" />
                      تغيير كلا السعرين
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 truncate mt-3">
                    <LinkIcon className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{tool.downloadUrl || 'لا يوجد رابط'}</span>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={() => {
                      setEditingTool(tool);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
                    onClick={() => {
                      setDeletingTool(tool);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 ml-1" />
                    حذف
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {tools.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Wrench className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg">لا توجد أدوات حالياً</p>
            <p className="text-gray-500 text-sm mt-2">اضغط على "إضافة أداة جديدة" للبدء</p>
          </div>
        )}
      </main>

      {/* Edit Tool Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">تعديل الأداة</DialogTitle>
            <DialogDescription className="text-gray-400">
              قم بتعديل بيانات الأداة
            </DialogDescription>
          </DialogHeader>
          {editingTool && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">اسم الأداة (عربي)</Label>
                  <Input
                    value={editingTool.name}
                    onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">اسم الأداة (إنجليزي)</Label>
                  <Input
                    value={editingTool.nameEn}
                    onChange={(e) => setEditingTool({ ...editingTool, nameEn: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">الوصف</Label>
                <Textarea
                  value={editingTool.description}
                  onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">رابط التحميل</Label>
                <Input
                  value={editingTool.downloadUrl}
                  onChange={(e) => setEditingTool({ ...editingTool, downloadUrl: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">السعر (ج.س)</Label>
                  <Input
                    type="number"
                    value={editingTool.priceSDG}
                    onChange={(e) => setEditingTool({ ...editingTool, priceSDG: parseFloat(e.target.value) })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">السعر ($)</Label>
                  <Input
                    type="number"
                    value={editingTool.priceUSD}
                    onChange={(e) => setEditingTool({ ...editingTool, priceUSD: parseFloat(e.target.value) })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="border-gray-700 text-gray-300">
              إلغاء
            </Button>
            <Button onClick={handleUpdateTool} disabled={updatingTool} className="bg-cyan-500 hover:bg-cyan-600">
              {updatingTool ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="mr-2">حفظ</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NEW: Change Price Dialog */}
      <Dialog open={priceDialogOpen} onOpenChange={setPriceDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-cyan-400" />
              تغيير السعر
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {priceEditingTool?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {(priceType === 'both' || priceType === 'sdg') && (
              <div className="space-y-2">
                <Label className="text-gray-300 flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">ج.س</Badge>
                  السعر بالجنيه السوداني
                </Label>
                <Input
                  type="number"
                  value={newPriceSDG}
                  onChange={(e) => setNewPriceSDG(e.target.value)}
                  placeholder="15000"
                  className="bg-gray-800/50 border-gray-700 text-white text-lg"
                />
              </div>
            )}
            {(priceType === 'both' || priceType === 'usd') && (
              <div className="space-y-2">
                <Label className="text-gray-300 flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">$</Badge>
                  السعر بالدولار الأمريكي
                </Label>
                <Input
                  type="number"
                  value={newPriceUSD}
                  onChange={(e) => setNewPriceUSD(e.target.value)}
                  placeholder="25"
                  className="bg-gray-800/50 border-gray-700 text-white text-lg"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPriceDialogOpen(false)} className="border-gray-700 text-gray-300">
              إلغاء
            </Button>
            <Button onClick={handleUpdatePrice} disabled={updatingPrice} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              {updatingPrice ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="mr-2">حفظ السعر</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">تأكيد الحذف</DialogTitle>
            <DialogDescription className="text-gray-400">
              هل أنت متأكد من حذف "{deletingTool?.name}"؟
              <br />
              <span className="text-red-400">هذا الإجراء لا يمكن التراجع عنه.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-gray-700 text-gray-300">
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteTool} disabled={deleting} className="bg-red-500 hover:bg-red-600">
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              <span className="mr-2">حذف</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">تصميم: المهندس محمد عبدالقادر أحمد</p>
          <p className="text-gray-500 text-xs mt-1">جميع الحقوق محفوظة © 2024</p>
        </div>
      </footer>
    </div>
  );
}
