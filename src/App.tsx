import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, GraduationCap, School, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImage from '@/assets/bgdummy.webp';
import schoolLogo from '@/assets/logodummy.webp';
import { Dashboard } from './pages/Dashboard';
import ClassDetailPage from './pages/ClassDetailPage';

type UserRole = 'murid' | 'guru' | 'admin';

// 🔥 PERBAIKAN: Pisahkan LoginPage menjadi komponen terpisah
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [role, setRole] = useState<UserRole>('murid');
  const [nisn, setNisn] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Login attempt:', { role, nisn, username, password });

    if (role === 'murid') {
      if (nisn === '0091913711' && password === 'sekolahku') {
        console.log('Login successful as student');
        setError('');
        // Simpan data ke localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Ahmad Rizki');
        localStorage.setItem('userRole', 'murid');
        onLogin(); // Panggil callback untuk update state di App
      } else {
        setError('NISN atau password salah');
      }
    } else {
      if (username === 'guru' && password === 'sekolahku') {
        console.log('Login successful as teacher');
        setError('');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Pak Guru');
        localStorage.setItem('userRole', role);
        onLogin();
      } else {
        setError('Username atau password salah');
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center lg:justify-start px-4 sm:px-8 lg:px-20 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg lg:mt-16"
      >
        <div className="bg-white/85 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 p-8 sm:p-12 overflow-hidden">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="relative p-2 bg-white rounded-3xl shadow-lg mb-4 ring-1 ring-gray-100">
              <img src={schoolLogo} alt="SD AR-ROHMAN" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-1.5 rounded-xl shadow-lg text-white">
                <School size={16} />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">LMS AR-ROHMAN</h1>
            <p className="text-gray-500 font-medium mt-1">Sistem Informasi Akademik Terpadu</p>
          </motion.div>

          {/* Role Tabs */}
          <div className="flex p-1 bg-gray-100/80 rounded-2xl mb-8 relative">
            <div
              className="absolute h-[calc(100%-8px)] rounded-xl bg-white shadow-sm transition-all duration-300 ease-out"
              style={{
                width: '33.33%',
                left: role === 'murid' ? '4px' : role === 'guru' ? '33.33%' : '66.66%',
                top: '4px'
              }}
            />
            {[
              { id: 'murid' as UserRole, label: 'Murid', icon: GraduationCap },
              { id: 'guru' as UserRole, label: 'Guru', icon: User },
              { id: 'admin' as UserRole, label: 'Admin', icon: ShieldCheck }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold relative z-10 transition-colors duration-200 ${role === r.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <r.icon size={16} />
                <span className="hidden sm:inline">{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  {role === 'murid' ? 'NISN / Nomor Induk' : 'Username'}
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={role === 'murid' ? nisn : username}
                    onChange={(e) => role === 'murid' ? setNisn(e.target.value) : setUsername(e.target.value)}
                    placeholder={role === 'murid' ? "Contoh: 0091913711" : role === 'guru' ? "guru" : "admin"}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-700"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Ingat Saya</span>
              </label>
              <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors underline decoration-blue-500/30 underline-offset-4">
                Lupa Password?
              </a>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              Masuk Sekarang
              <div className="p-1 bg-white/20 rounded-lg group-hover:translate-x-1 transition-transform">
                <Lock size={16} />
              </div>
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            {role === 'murid' ? 'Siswa baru?' : 'Belum punya akses?'}
            <button className="ml-1 text-blue-600 font-bold hover:underline">Hubungi Operator</button>
          </p>
        </div>

        <div className="mt-8 flex justify-center lg:justify-start gap-4 text-white/60 text-xs font-medium tracking-widest uppercase">
          <span>&copy; 2026 SD AR-ROHMAN</span>
          <span className="opacity-30">|</span>
          <span>Version 2.0.4</span>
        </div>
      </motion.div>
    </div>
  );
}

// 🔥 PERBAIKAN: App Component Utama
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
  };

  const getUserData = () => {
    return {
      name: localStorage.getItem('userName') || 'Ahmad Rizki',
      role: localStorage.getItem('userRole') as UserRole || 'murid'
    };
  };

  return (
    <Router>
      <Routes>
        {/* Route untuk login */}
        <Route path="/login" element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        } />

        {/* Route untuk dashboard */}
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <Dashboard
              userName={getUserData().name}
              userRole={getUserData().role}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        <Route path="/class/:classId" element={
          isAuthenticated ? (
            <ClassDetailPage />
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        {/* Redirect root berdasarkan status login */}
        <Route path="/" element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}