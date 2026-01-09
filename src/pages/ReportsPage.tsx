import React, { useState } from 'react';
import { Trophy, Award, BookOpen, Clock, Download, Calendar as CalendarIcon, TrendingUp, UserCheck, FileChartLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'academic' | 'behavior' | 'attendance'>('academic');
  const [selectedMonth, setSelectedMonth] = useState('Januari 2026');

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileChartLine size={24} />
            </div>
            <span className="text-sm font-black text-blue-600 uppercase tracking-widest">Akademik & Tracking</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight">Laporan Siswa</h1>
          <p className="text-slate-500 font-medium mt-1">Pantau perkembangan akademik, perilaku, dan kehadiran secara real-time.</p>
        </motion.div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="pl-11 pr-8 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-sm font-bold text-slate-700 shadow-sm transition-all cursor-pointer appearance-none"
            >
              <option>Januari 2026</option>
              <option>Desember 2025</option>
              <option>November 2025</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-900/10 transition-all transform hover:scale-105">
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Modern Glass Tabs */}
      <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] w-fit relative overflow-hidden">
        {[
          { id: 'academic' as const, label: 'Akademik', icon: BookOpen },
          { id: 'behavior' as const, label: 'Perilaku', icon: Award },
          { id: 'attendance' as const, label: 'Kehadiran', icon: UserCheck },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-black transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              <tab.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {tab.label}
              {isActive && (
                <motion.div layoutId="active-tab-bg" className="absolute inset-0 bg-white rounded-2xl shadow-sm -z-10" />
              )}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {activeTab === 'academic' && <AcademicReport />}
          {activeTab === 'behavior' && <BehaviorReport />}
          {activeTab === 'attendance' && <AttendanceReport />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Academic Report Component
function AcademicReport() {
  const chartData = [
    { name: 'Matematika', value: 88, color: 'blue' },
    { name: 'B. Indonesia', value: 90, color: 'emerald' },
    { name: 'IPA', value: 82, color: 'purple' },
    { name: 'IPS', value: 85, color: 'orange' },
    { name: 'B. Inggris', value: 87, color: 'blue' },
    { name: 'Agama', value: 92, color: 'emerald' },
    { name: 'PJOK', value: 89, color: 'indigo' },
    { name: 'Seni', value: 84, color: 'pink' },
  ];

  return (
    <div className="space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Rata-rata Nilai', val: '85.5', sub: '↑ 5% dari bln lalu', icon: Trophy, from: '#3B82F6', to: '#2563EB' },
          { label: 'Tugas Selesai', val: '49/50', sub: 'Hampir Sempurna!', icon: Award, from: '#10B981', to: '#059669' },
          { label: 'Nilai Tertinggi', val: '92', sub: 'Pend. Agama', icon: BookOpen, from: '#8B5CF6', to: '#7C3AED' },
          { label: 'Peringkat', val: '#5', sub: 'Top 15% Kelas', icon: TrendingUp, from: '#F59E0B', to: '#D97706' },
        ].map((stat, i) => (
          <div key={i} className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{stat.val}</h3>
              <p className="text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">{stat.sub}</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 group-hover:bg-blue-50 transition-all duration-700"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black">Performance Chart</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-400">Excellent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-400">Target</span>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {chartData.map((item, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{item.name}</span>
                  <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">{item.value}</span>
                </div>
                <div className="w-full bg-slate-50 rounded-full h-3.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: idx * 0.1, duration: 1 }}
                    className={`h-full rounded-full bg-${item.color}-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4">Analisis Progress</h3>
              <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-8">
                Performa di bidang sains meningkat 12% bulan ini. Pertahankan fokus pada perhitungan matematika dasar.
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Materi Kritis', val: '80%', color: 'white/20' },
                  { label: 'Ketertarikan', val: 'High', color: 'emerald-400' }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-xs font-bold opacity-60 uppercase">{row.label}</span>
                    <span className="text-sm font-black">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform"></div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6">Penghargaan</h3>
            <div className="space-y-6">
              {[
                { label: 'Master of UI', date: 'Jan 2026', icon: '🏆' },
                { label: 'Full Attendance', date: 'Dec 2025', icon: '🌟' }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-5 group cursor-default">
                  <div className="w-14 h-14 bg-slate-50 rounded-[1.2rem] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight">{badge.label}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{badge.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Behavioral and Attendance components follow similar premium styles...
function BehaviorReport() {
  return (
    <div className="p-20 bg-white rounded-[4rem] border-2 border-dashed border-slate-200 text-center flex flex-col items-center">
      <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8">
        <Award size={40} />
      </div>
      <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">Behavioral Analysis Engine</h2>
      <p className="text-slate-500 max-w-lg font-medium leading-[1.8]">Laporan perilaku sedang disinkronisasi dengan database tutor. Mohon bersabar sementara kami memproses data emosional dan kedisiplinan siswa.</p>
      <button className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-[2rem] font-bold text-sm tracking-widest transition-all transform hover:scale-105">Refresh Sync</button>
    </div>
  )
}

function AttendanceReport() {
  return (
    <div className="p-20 bg-slate-900 rounded-[4rem] text-center flex flex-col items-center text-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-white/10 backdrop-blur-md text-emerald-400 rounded-full flex items-center justify-center mb-8 border border-white/10">
          <UserCheck size={40} />
        </div>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-[0.2em]">Attendance Grid v2.0</h2>
        <p className="text-slate-400 max-w-lg font-medium leading-[1.8]">Visualisasi heatmap kehadiran siswa sedang ditingkatkan untuk akurasi biometrik yang lebih baik.</p>
        <div className="flex gap-2 mt-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3 h-8 bg-white/5 rounded-full" />
          ))}
        </div>
      </div>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]"></div>
    </div>
  )
}
