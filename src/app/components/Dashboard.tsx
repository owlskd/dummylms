import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Award,
  GraduationCap,
  School,
  FileText,
  Calendar,
  Trophy,
  Menu as MenuIcon,
  X,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Clock,
  Users,
  Play,
  BookMarked,
  LayoutDashboard,
  Settings,
  HelpCircle,
  TrendingUp,
  CreditCard,
  Camera,
  User,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import schoolLogo from '@/assets/logodummy.webp';
import { ReportsPage } from './ReportsPage';

type Page = 'home' | 'classroom' | 'skill-center' | 'tutorku' | 'bimbingan' | 'reports' | 'schedule' | 'rank' | 'settings';

interface DashboardProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

export function Dashboard({ userName, userRole, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const menuItems = [
    { id: 'home' as Page, label: 'Beranda', icon: Home },
    { id: 'classroom' as Page, label: 'Kelas Saya', icon: BookOpen },
    { id: 'skill-center' as Page, label: 'Skill Center', icon: Award },
    { id: 'tutorku' as Page, label: 'Tutorku', icon: GraduationCap },
    { id: 'bimbingan' as Page, label: 'Bimbingan', icon: School },
    { id: 'reports' as Page, label: 'Laporan', icon: FileText },
    { id: 'schedule' as Page, label: 'Jadwal', icon: Calendar },
    { id: 'rank' as Page, label: 'Peringkat', icon: Trophy },
    { id: 'settings' as Page, label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      {/* Premium Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-72' : 'w-24'
          } bg-white border-r border-slate-200 transition-all duration-500 ease-in-out flex flex-col z-50`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between">
          <motion.div
            initial={false}
            animate={{ opacity: isSidebarOpen ? 1 : 0, scale: isSidebarOpen ? 1 : 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-white rounded-xl shadow-lg flex-shrink-0">
              <img src={schoolLogo} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight">AR-ROHMAN</span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Learning Hub</span>
              </div>
            )}
          </motion.div>
          {!isSidebarOpen && (
            <div className="mx-auto p-2 bg-white rounded-xl shadow-lg">
              <img src={schoolLogo} alt="Logo" className="w-6 h-6 object-contain" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-semibold whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute right-2 w-1.5 h-6 bg-white/40 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="text-sm font-bold">Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 px-8 flex items-center justify-between z-40 sticky top-0">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
            >
              <MenuIcon size={24} />
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Cari materi, pengumuman..."
                className="pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 w-80 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-11 h-11 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20"></span>
            </button>

            <div className="h-10 w-[1px] bg-slate-200 mx-2"></div>

            <div
              onClick={() => setCurrentPage('settings')}
              className="flex items-center gap-4 pl-4 group cursor-pointer"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{userName}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{userRole}</p>
              </div>
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden">
                {userAvatar ? (
                  <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  userName.charAt(0)
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Rendering */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              {currentPage === 'home' && <HomePage userName={userName} />}
              {currentPage === 'classroom' && <ClassroomPage />}
              {currentPage === 'skill-center' && <SkillCenterPage />}
              {currentPage === 'tutorku' && <TutorkuPage />}
              {currentPage === 'bimbingan' && <BimbinganPage />}
              {currentPage === 'reports' && <ReportsPage />}
              {currentPage === 'schedule' && <SchedulePage />}
              {currentPage === 'rank' && <RankPage />}
              {currentPage === 'settings' && (
                <SettingsPage
                  userName={userName}
                  userAvatar={userAvatar}
                  onAvatarChange={setUserAvatar}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// PREMIUM SUB-COMPONENTS

function HomePage({ userName }: { userName: string }) {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[2.5rem] p-10 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block py-1.5 px-4 bg-blue-500/20 backdrop-blur-md rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              Dashboard Overview
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
              Selamat Datang kembali,<br /> {userName}!
            </h1>
            <p className="text-[#94A3B8] text-lg font-medium mb-8">
              Lanjutkan perjalanan belajar Anda hari ini. Ada 3 kelas menunggu partisipasi aktif Anda.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105">
              Lihat Jadwal Hari Ini
            </button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-12"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Mapel Aktif', val: '8', icon: BookOpen, color: 'blue' },
          { label: 'Tugas Selesai', val: '12', icon: Award, color: 'emerald' },
          { label: 'Ranking Kelas', val: '#5', icon: Trophy, color: 'amber' },
          { label: 'Kelas Hari Ini', val: '3', icon: Clock, color: 'indigo' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group"
          >
            <div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{stat.val}</h3>
            </div>
            <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all`}>
              <stat.icon size={28} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Schedule or Something */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="text-blue-600" /> Kelas Hari Ini
              </h2>
              <button className="text-blue-600 font-bold text-sm hover:underline">Lihat Semua</button>
            </div>
            <div className="space-y-4">
              {[
                { time: '08:00', title: 'Matematika - Aljabar', instructor: 'Ibu Siti', status: 'Selesai' },
                { time: '10:00', title: 'IPA - Ekosistem Laut', instructor: 'Pak Budi', status: 'Sedang Berlangsung' },
                { time: '13:00', title: 'Bahasa Indonesia', instructor: 'Ibu Ani', status: 'Mendatang' },
              ].map((cls, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-100 rounded-xl font-bold text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <span className="text-[10px] uppercase">Waktu</span>
                    <span className="text-sm">{cls.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{cls.title}</h4>
                    <p className="text-sm text-slate-500">{cls.instructor}</p>
                  </div>
                  <div className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-tighter ${cls.status === 'Sedang Berlangsung' ? 'bg-amber-100 text-amber-700' :
                    cls.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                    {cls.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Productivity or Skill Center Preview */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <TrendingUp className="mb-4 text-white/80" size={32} />
              <h3 className="text-xl font-bold mb-2">Tingkatkan Skill</h3>
              <p className="text-indigo-100 text-sm mb-6 font-medium leading-relaxed">
                Pelajari modul baru dan dapatkan sertifikat internasional di Skill Center.
              </p>
              <button className="w-full py-3 bg-white text-indigo-700 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                Buka Skill Center
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-6">Aktivitas Terbaru</h3>
            <div className="space-y-6">
              {[
                { task: 'Kuis IPA Selesai', time: '2 jam yang lalu', point: '+50 pts' },
                { task: 'Materi MTK Dibaca', time: '5 jam yang lalu', point: '+10 pts' },
                { task: 'Tugas BI Dikirim', time: 'Kemarin', point: '+100 pts' },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between border-l-2 border-slate-100 pl-4 py-1">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{act.task}</p>
                    <p className="text-xs text-slate-400 font-medium">{act.time}</p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">{act.point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassroomPage() {
  const subjects = [
    { name: 'Matematika', teacher: 'Ibu Siti', students: 32, progress: 75, color: 'blue' },
    { name: 'Bahasa Indonesia', teacher: 'Pak Budi', students: 32, progress: 85, color: 'emerald' },
    { name: 'IPA', teacher: 'Ibu Ani', students: 32, progress: 60, color: 'purple' },
    { name: 'IPS', teacher: 'Pak Dedi', students: 32, progress: 70, color: 'orange' },
    { name: 'Bahasa Inggris', teacher: 'Ms. Sarah', students: 32, progress: 80, color: 'pink' },
    { name: 'Pendidikan Agama', teacher: 'Ustadz Ahmad', students: 32, progress: 90, color: 'teal' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Daftar Kelas Saya</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Grid</button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">List</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {subjects.map((subject, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 group cursor-pointer transition-all"
          >
            <div className={`h-40 rounded-[2rem] bg-${subject.color}-500 mb-6 relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-extrabold uppercase tracking-widest">
                Semester 2
              </div>
              <BookOpen className="text-white/40" size={64} />
            </div>
            <div className="px-2">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{subject.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">{subject.teacher}</p>

              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-tight">
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-blue-500" />
                  <span>{subject.students} Teman Sekelas</span>
                </div>
                <span>{subject.progress}% Selesai</span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.progress}%` }}
                  className={`h-2.5 rounded-full bg-${subject.color}-500 shadow-md shadow-${subject.color}-500/20`}
                />
              </div>

              <button className="w-full py-3 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-2xl font-bold text-sm text-slate-600 transition-all">
                Masuk Kelas
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// REST OF COMPONENTS (SkillCenterPage, TutorkuPage, etc.) 
// I'll keep them consistent with the new style but briefly implement them for now.

function SkillCenterPage() {
  const [activeTab, setActiveTab] = useState<'online' | 'offline' | 'hybrid'>('online');
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">Skill Center</h1>
      <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
        {['online', 'offline', 'hybrid'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
        <Award className="mx-auto text-slate-300 mb-4" size={48} />
        <h3 className="text-xl font-bold text-slate-900">Konten Sedang Dimuat</h3>
        <p className="text-slate-500 max-w-sm mx-auto mt-2">Katalog kursus untuk {activeTab} sedang disinkronisasi ke server lokal.</p>
      </div>
    </div>
  );
}

function TutorkuPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">Tutorku</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {['Matematika', 'IPA', 'Bahasa Inggris'].map((sub, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Play size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">{sub}</h3>
            <p className="text-slate-500 text-sm mb-6">Akses video tutorial dan rangkuman materi lengkap.</p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(n => <div key={n} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />)}
              </div>
              <span className="text-xs font-bold text-slate-400">+120 Siswa Menonton</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BimbinganPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">Bimbingan</h1>
      <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-sm border border-slate-100">
        <School className="mx-auto text-blue-100 mb-6" size={80} />
        <h2 className="text-2xl font-bold mb-4">Butuh Bantuan Extra?</h2>
        <p className="text-slate-500 max-w-lg mx-auto mb-8 font-medium">Layanan Bimbingan Belajar (Bimbel) kami menyediakan guru-guru pilihan untuk membantu Anda menguasai materi tersulit.</p>
        <button className="px-10 py-4 bg-blue-600 text-white rounded-[1.5rem] font-bold shadow-lg shadow-blue-500/20">Hubungi Konselor</button>
      </div>
    </div>
  );
}

function SchedulePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">Jadwal Pelajaran</h1>
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-6 border-b border-slate-100">
          {['Waktu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map(d => (
            <div key={d} className="p-6 text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>
        {[1, 2, 3, 4].map(r => (
          <div key={r} className="grid grid-cols-6 group hover:bg-slate-50/50 transition-colors">
            <div className="p-6 text-center text-sm font-bold text-slate-500">07:30 - 09:00</div>
            {[1, 2, 3, 4, 5].map(c => (
              <div key={c} className="p-6 border-l border-slate-50">
                <div className="p-3 bg-blue-50 rounded-xl text-[10px] font-bold text-blue-700 text-center uppercase tracking-tight">Matematika</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function RankPage() {
  const rankings = [
    { rank: 1, name: 'Siti Aisyah', score: 98.5, avatar: 'S', trend: 'same' },
    { rank: 2, name: 'Budi Santoso', score: 94.2, avatar: 'B', trend: 'up' },
    { rank: 3, name: 'Rina Wijaya', score: 92.1, avatar: 'R', trend: 'down' },
    { rank: 4, name: 'Dedi Kurniawan', score: 90.7, avatar: 'D', trend: 'up' },
    { rank: 5, name: 'Ahmad Rizki', score: 88.9, avatar: 'A', trend: 'up', isCurrentUser: true },
    { rank: 6, name: 'Lina Marlina', score: 87.3, avatar: 'L', trend: 'same' },
    { rank: 7, name: 'Eko Prasetyo', score: 86.1, avatar: 'E', trend: 'down' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-xs font-black text-amber-500 uppercase tracking-[0.3em] mb-2 block">Hall of Fame</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Peringkat Kelas</h1>
          <p className="text-slate-500 font-medium mt-1">Peringkat berdasarkan akumulasi nilai tugas dan ujian semester ini.</p>
        </motion.div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <TrendingUp className="text-emerald-500" size={20} />
          <span className="text-sm font-bold text-slate-600">Terakhir Update: 10 Jan 2026</span>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto pt-16">
        {/* Rank 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-8 text-center pt-20 relative shadow-lg border border-slate-100 order-2 md:order-1"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-100 rounded-full border-8 border-white shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-3xl font-black text-white">
              {rankings[1].avatar}
            </div>
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-black">2</div>
          <h3 className="font-black text-slate-900 text-lg mb-1">{rankings[1].name}</h3>
          <p className="text-blue-600 font-black text-3xl tracking-tighter">{rankings[1].score}</p>
        </motion.div>

        {/* Rank 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ type: "spring", damping: 10, delay: 0.1 }}
          className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-10 text-center pt-28 relative shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] text-white z-10 order-1 md:order-2"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full border-8 border-blue-700 shadow-2xl overflow-hidden p-2">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-5xl font-black text-blue-700">
              {rankings[0].avatar}
            </div>
          </div>
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-6xl animate-bounce">👑</div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-black text-xl">1</div>
          <h3 className="font-black text-2xl mb-1 tracking-tight">{rankings[0].name}</h3>
          <p className="font-black text-5xl tracking-tighter text-white">
            {rankings[0].score}
          </p>
          <div className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-50">Sangat Memuaskan</div>
        </motion.div>

        {/* Rank 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[2.5rem] p-8 text-center pt-20 relative shadow-lg border border-slate-100 order-3"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-100 rounded-full border-8 border-white shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-3xl font-black text-white">
              {rankings[2].avatar}
            </div>
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10 bg-amber-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-black">3</div>
          <h3 className="font-black text-slate-900 text-lg mb-1">{rankings[2].name}</h3>
          <p className="text-blue-600 font-black text-3xl tracking-tighter">{rankings[2].score}</p>
        </motion.div>
      </div>

      {/* List Rankings */}
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/40 border border-slate-100 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black">Peringkat Lainnya</h2>
          <div className="flex gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Peringkat</span>
            <span className="mx-2 text-slate-200">|</span>
            <span>Nilai Akhir</span>
          </div>
        </div>
        <div className="space-y-4">
          {rankings.slice(3).map((student) => (
            <motion.div
              key={student.rank}
              whileHover={{ scale: 1.01, x: 5 }}
              className={`flex items-center gap-6 p-6 rounded-[2rem] transition-all ${student.isCurrentUser
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-50'
                : 'bg-white border border-slate-50 hover:bg-slate-50 hover:border-slate-200'
                }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${student.isCurrentUser ? 'bg-white/20' : 'bg-slate-100 text-slate-400'
                }`}>
                {student.rank}
              </div>
              <div className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-xl font-black ${student.isCurrentUser ? 'bg-white/30' : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                }`}>
                {student.avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-black">{student.name} {student.isCurrentUser && "(Anda)"}</h4>
              </div>
              <div className="text-right flex items-center gap-6">
                <span className={`text-2xl font-black ${student.isCurrentUser ? 'text-white' : 'text-blue-600'}`}>
                  {student.score}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${student.isCurrentUser ? 'bg-white/20' : 'bg-slate-50'
                  }`}>
                  {student.trend === 'up' && <span className="text-emerald-500 font-black">↑</span>}
                  {student.trend === 'down' && <span className="text-red-500 font-black">↓</span>}
                  {student.trend === 'same' && <span className="text-slate-400 font-black">→</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
function SettingsPage({
  userName,
  userAvatar,
  onAvatarChange
}: {
  userName: string,
  userAvatar: string | null,
  onAvatarChange: (url: string) => void
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onAvatarChange(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pengaturan Profil</h1>
        <p className="text-slate-500 font-medium mt-1">Kelola informasi akun dan tampilan profil Anda.</p>
      </motion.div>

      <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center text-white text-5xl font-black overflow-hidden ring-4 ring-white shadow-blue-500/20">
              {userAvatar ? (
                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0)
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
            >
              <Camera size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <h3 className="text-2xl font-black text-slate-900">{userName}</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">Pelajar Terverifikasi</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20"
              >
                Ganti Foto Profil
              </button>
              <button
                onClick={() => onAvatarChange('')}
                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                Hapus Foto
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-xl font-black flex items-center gap-3">
            <User className="text-blue-600" size={20} /> Informasi Pribadi
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Nama Lengkap', value: userName },
              { label: 'Email', value: `${userName.toLowerCase().replace(' ', '.')}@sekolah.id` },
              { label: 'NISN', value: '0091913711' },
            ].map((field, i) => (
              <div key={i} className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{field.label}</label>
                <div className="p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 border border-slate-100">{field.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-xl font-black flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={20} /> Keamanan
          </h3>
          <div className="space-y-4">
            <button className="w-full p-5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-left flex items-center justify-between group transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <span className="text-sm font-bold text-slate-900">Ubah Kata Sandi</span>
              </div>
              <span className="text-slate-300 font-black">→</span>
            </button>
            <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
              <p className="text-xs font-bold text-blue-700 leading-relaxed">
                Password Anda terakhir diubah 3 bulan yang lalu. Kami menyarankan untuk mengganti password secara berkala.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
