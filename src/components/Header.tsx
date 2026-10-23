import React from 'react';
import { BanSuNhiAvatar, DongSonBorderBand, DongSonStar, ChibiStudentIcon } from './DongSonMotif';
import { Volume2, VolumeX, UserCheck, Shield, LogIn, LogOut, Sparkles, GraduationCap, School } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  currentUser: UserProfile | null;
  onOpenLogin: (role?: 'teacher' | 'student') => void;
  onLogout: () => void;
  onQuickSwitchRole: () => void;
  stampsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  isMuted,
  onToggleMute,
  currentUser,
  onOpenLogin,
  onLogout,
  onQuickSwitchRole,
  stampsCount,
}) => {
  // 6 specific navigation menu items requested in the curriculum plan
  const navItems = [
    { id: 'home', label: 'TRANG CHỦ' },
    { id: 'lectures', label: 'BÀI GIẢNG ĐIỆN TỬ' },
    { id: 'quiz-games', label: 'GAME TRẮC NGHIỆM' },
    { id: 'history-movies', label: 'PHIM LỊCH SỬ' },
    { id: 'history-info', label: 'THÔNG TIN LỊCH SỬ' },
    { id: 'ai-assistant', label: 'TRỢ LÝ AI' },
  ];

  const isTeacherOrAdmin = currentUser?.role === 'teacher' || currentUser?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-[#fffdfa]/95 backdrop-blur-md border-b border-[#e8d7be] shadow-xs">
      {/* Decorative subtle Đông Sơn pattern band at very top */}
      <div className="w-full bg-[#fdfbf7] border-b border-[#f0e4d0]">
        <DongSonBorderBand className="text-amber-800/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-18">
          {/* Zone 1: Brand Wordmark element */}
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <div className="relative">
              <BanSuNhiAvatar size={42} className="group-hover:scale-105 transition-transform" />
              <div className="absolute -top-1 -right-1 opacity-70">
                <DongSonStar size={16} className="text-amber-700" />
              </div>
            </div>
            <div className="whitespace-nowrap shrink-0">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#451a03] block leading-tight group-hover:text-amber-800 transition-colors">
                Dấu Ấn Non Sông
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-800/90 block font-semibold">
                Khám phá Sử Việt cùng AI
              </span>
            </div>
          </button>

          {/* Zone 2: 6 concise single-line text navigation links + Teacher Dashboard when eligible */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-bold text-stone-700 tracking-wide">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-2 px-1 relative ${
                    isActive
                      ? 'text-amber-800 font-extrabold'
                      : 'hover:text-amber-800 text-stone-700'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Teacher Dashboard Tab (Prominent for Teacher / Admin) */}
            {isTeacherOrAdmin && (
              <button
                onClick={() => onTabChange('teacher')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1.5 px-3 rounded-lg text-xs font-extrabold flex items-center gap-1.5 border ${
                  currentTab === 'teacher'
                    ? 'bg-amber-900 text-amber-100 border-amber-900 shadow-xs'
                    : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <School className="w-3.5 h-3.5 text-amber-600" />
                <span>GÓC GIÁO VIÊN</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Audio, Passport, and Authentication / Profile Area */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              className="p-2 rounded-lg text-stone-500 hover:text-amber-800 hover:bg-amber-50 transition-colors"
              aria-label="Chuyển chế độ âm thanh"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-700" />}
            </button>

            {/* Passport Stamps Quick Access */}
            <button
              onClick={() => onTabChange('history-info')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
              title="Hộ chiếu Sử Việt của em"
            >
              <Shield className="w-4 h-4 text-amber-700" />
              <span>{stampsCount}/7 Tem mộc số</span>
            </button>

            {/* USER AUTH STATUS / LOGIN BUTTON */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-[#fbf6ec] border border-[#e5d2b7] rounded-xl p-1 pr-2 shadow-2xs">
                {/* User Info Capsule */}
                <div
                  onClick={() => {
                    if (isTeacherOrAdmin) onTabChange('teacher');
                  }}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    currentUser.role === 'admin'
                      ? 'bg-amber-800 text-amber-100 hover:bg-amber-900'
                      : currentUser.role === 'teacher'
                      ? 'bg-amber-700 text-white hover:bg-amber-800'
                      : 'bg-teal-700 text-white hover:bg-teal-800'
                  }`}
                  title={
                    currentUser.role === 'admin'
                      ? 'Quản trị viên hệ thống (Cô Phạm Thị Thanh)'
                      : currentUser.role === 'teacher'
                      ? `Giáo viên: ${currentUser.name}`
                      : `Học sinh: ${currentUser.name} - Lớp ${currentUser.classCode || '5A8'}`
                  }
                >
                  {isTeacherOrAdmin ? (
                    <UserCheck className="w-3.5 h-3.5" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5" />
                  )}
                  <span className="max-w-[120px] sm:max-w-[160px] truncate">
                    {currentUser.role === 'admin'
                      ? 'Cô Thanh (Admin)'
                      : currentUser.role === 'teacher'
                      ? currentUser.name
                      : `${currentUser.name} (${currentUser.classCode || '5A8'})`}
                  </span>
                </div>

                {/* Quick Role Switcher Button for rapid review/testing */}
                <button
                  onClick={onQuickSwitchRole}
                  title="Chuyển nhanh vai trò (Giáo viên / Học sinh)"
                  className="hidden md:flex p-1.5 rounded-lg text-amber-900 hover:bg-amber-200/60 text-[11px] font-semibold items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[10px]">Đổi vai</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  title="Đăng xuất tài khoản"
                  className="p-1.5 rounded-lg text-stone-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              /* If not logged in, show prominent Login button */
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenLogin('teacher')}
                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Giáo viên</span>
                </button>

                <button
                  onClick={() => onOpenLogin('student')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 shadow-2xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar (Horizontal Scrollable) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2.5 border-t border-[#f0e4d0] text-xs font-bold no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                currentTab === item.id
                  ? 'bg-amber-100 text-amber-950 font-extrabold shadow-2xs'
                  : 'text-stone-600 hover:text-amber-800'
              }`}
            >
              {item.label}
            </button>
          ))}

          {isTeacherOrAdmin && (
            <button
              onClick={() => onTabChange('teacher')}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg shrink-0 transition-colors flex items-center gap-1 ${
                currentTab === 'teacher'
                  ? 'bg-amber-900 text-amber-100 font-extrabold'
                  : 'bg-amber-50 text-amber-900 border border-amber-300'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>GÓC GIÁO VIÊN</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
