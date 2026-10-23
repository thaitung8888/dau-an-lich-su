import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { MascotWidget } from './components/MascotWidget';
import { Footer } from './components/Footer';

import { HomeView } from './components/views/HomeView';
import { CurriculumView } from './components/views/CurriculumView';
import { ChallengesView } from './components/views/ChallengesView';
import { HistoryMoviesView } from './components/views/HistoryMoviesView';
import { HistoryInfoView } from './components/views/HistoryInfoView';
import { AiAssistantView } from './components/views/AiAssistantView';
import { TeacherDashboardView } from './components/views/TeacherDashboardView';
import { LoginModal } from './components/auth/LoginModal';

import { INITIAL_PASSPORT_STAMPS } from './data/historyData';
import { PassportStamp, UserProfile } from './types';
import { UserCheck, GraduationCap, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { BanSuNhiAvatar, ChibiStudentIcon, DongSonStar } from './components/DongSonMotif';

const LOCAL_STORAGE_KEY = 'dauan_current_user_v2';

export default function App() {
  // Navigation tabs matching the user's 6 specific menu requirements
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isMuted, setIsMuted] = useState(false);
  const [userStamps, setUserStamps] = useState<PassportStamp[]>(INITIAL_PASSPORT_STAMPS);
  const [totalScore, setTotalScore] = useState<number>(100);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    // Default initial session: student of class 5A8 - Trường Tiểu học Tiền Phong
    return {
      id: 'stu-default',
      name: 'Học sinh nhí',
      role: 'student',
      grade: 5,
      classCode: '5A8',
      school: 'Trường Tiểu học Tiền Phong',
      stampsCount: 2,
    };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Transient state for opening AI with specific context from another view
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');
  const [aiContext, setAiContext] = useState<any>(null);

  // Grade state
  const [selectedGrade, setSelectedGrade] = useState<number>(4);

  // Sync userRole string derived from currentUser
  const userRole: 'student' | 'teacher' =
    currentUser?.role === 'admin' || currentUser?.role === 'teacher'
      ? 'teacher'
      : 'student';

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Error saving to localStorage', e);
    }

    if (user.role === 'admin' || user.role === 'teacher') {
      setCurrentTab('teacher');
    } else {
      if (user.grade) {
        setSelectedGrade(user.grade);
      }
      setCurrentTab('home');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Error removing from localStorage', e);
    }
    setCurrentUser(null);
    setCurrentTab('home');
  };

  // Quick switch between Admin/Teacher (Cô Phạm Thị Thanh) and Student for rapid testing
  const handleQuickSwitchRole = () => {
    if (userRole === 'teacher') {
      // Switch to student
      const studentProfile: UserProfile = {
        id: 'stu-demo',
        name: 'Học sinh nhí',
        role: 'student',
        grade: 5,
        classCode: '5A8',
        school: 'Trường Tiểu học Tiền Phong',
        stampsCount: 2,
      };
      setCurrentUser(studentProfile);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(studentProfile));
      setCurrentTab('home');
    } else {
      // Switch to Cô Phạm Thị Thanh (Admin)
      const adminProfile: UserProfile = {
        id: 'usr-admin-1',
        name: 'Cô giáo Phạm Thị Thanh',
        email: 'pham.thanhh212@gmail.com',
        role: 'admin',
        approved: true,
        school: 'Trường Tiểu học Tiền Phong',
        stampsCount: 7,
      };
      setCurrentUser(adminProfile);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(adminProfile));
      setCurrentTab('teacher');
    }
  };

  const handleNavigate = (tab: string, context?: any) => {
    if (context?.grade) {
      setSelectedGrade(context.grade);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAiWithPrompt = (prompt: string, context?: any) => {
    setAiInitialPrompt(prompt);
    setAiContext(context);
    setCurrentTab('ai-assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockStamp = (siteOrMilestone: string) => {
    setUserStamps((prev) =>
      prev.map((s) => {
        if (
          s.siteOrMilestone.toLowerCase().includes(siteOrMilestone.toLowerCase()) ||
          siteOrMilestone.toLowerCase().includes(s.siteOrMilestone.toLowerCase())
        ) {
          return {
            ...s,
            unlocked: true,
            dateEarned: new Date().toISOString().split('T')[0],
          };
        }
        return s;
      })
    );
  };

  const handleAddScore = (points: number) => {
    setTotalScore((prev) => prev + points);
  };

  const unlockedStampsCount = userStamps.filter((s) => s.unlocked).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f2] text-[#38200f]">
      {/* Top Bar with 6 standard menu tabs, Dong Son border, and authentication */}
      <Header
        currentTab={currentTab}
        onTabChange={handleNavigate}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        currentUser={currentUser}
        onOpenLogin={handleOpenLogin}
        onLogout={handleLogout}
        onQuickSwitchRole={handleQuickSwitchRole}
        stampsCount={unlockedStampsCount}
      />

      {/* Banner with Đông Sơn drum motif, Chim Lạc, and copyright to cô Phạm Thị Thanh */}
      {currentTab === 'home' && (
        <Banner
          onStartJourney={() => handleNavigate('history-info')}
          onOpenAiChat={() =>
            handleOpenAiWithPrompt('Chào Bạn Sử Nhí, hôm nay chúng mình cùng học lịch sử nhé!')
          }
        />
      )}

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Quick Identity Bar for First-Time Viewers */}
        {currentTab === 'home' && (
          <div className="mb-6 bg-gradient-to-r from-[#fbf5e8] via-[#f7ecd6] to-[#fbf5e8] border border-[#e5d2b7] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                {userRole === 'teacher' ? (
                  <BanSuNhiAvatar size={34} />
                ) : (
                  <ChibiStudentIcon size={34} />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-[#451a03] flex items-center gap-1.5">
                  <span>Bạn đang trải nghiệm với vai trò:</span>
                  <span className="font-extrabold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                    {currentUser?.role === 'admin'
                      ? 'Cô giáo Phạm Thị Thanh (Quản trị viên)'
                      : currentUser?.role === 'teacher'
                      ? `Giáo viên (${currentUser.name})`
                      : `Học sinh tiểu học (${currentUser?.name || 'Nhí'} - Lớp ${currentUser?.classCode || '5A8'})`}
                  </span>
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5">
                  {userRole === 'teacher'
                    ? 'Bạn có quyền quản lý bài giảng, tạo mã lớp, duyệt tài liệu và soạn câu hỏi AI.'
                    : 'Bạn có thể xem bài giảng, xem phim tư liệu, làm trò chơi trắc nghiệm và hỏi Bạn Sử Nhí AI.'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-amber-300 text-xs font-bold text-amber-900 shadow-2xs transition-colors flex items-center gap-1"
              >
                <span>Đổi tài khoản đăng nhập</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 1. TRANG CHỦ */}
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenAiWithPrompt={handleOpenAiWithPrompt}
          />
        )}

        {/* 2. BÀI GIẢNG ĐIỆN TỬ */}
        {currentTab === 'lectures' && (
          <CurriculumView
            initialGrade={selectedGrade}
            userRole={userRole}
            currentUser={currentUser}
            onOpenAiWithPrompt={handleOpenAiWithPrompt}
            onNavigateToQuiz={(lessonCode) => handleNavigate('quiz-games')}
          />
        )}

        {/* 3. GAME TRẮC NGHIỆM */}
        {currentTab === 'quiz-games' && (
          <ChallengesView
            currentUser={currentUser}
            onOpenAiWithPrompt={handleOpenAiWithPrompt}
            onAddScore={handleAddScore}
          />
        )}

        {/* 4. PHIM LỊCH SỬ */}
        {currentTab === 'history-movies' && (
          <HistoryMoviesView
            currentUser={currentUser}
            onOpenAiWithPrompt={handleOpenAiWithPrompt}
          />
        )}

        {/* 5. THÔNG TIN LỊCH SỬ (7 chặng, danh nhân, huyền thoại, bảo vật, bản đồ di tích) */}
        {currentTab === 'history-info' && (
          <HistoryInfoView
            currentUser={currentUser}
            onOpenAiWithPrompt={handleOpenAiWithPrompt}
            onNavigateToQuiz={(id) => handleNavigate('quiz-games')}
            onUnlockStamp={handleUnlockStamp}
          />
        )}

        {/* 6. TRỢ LÝ AI (BẠN SỬ NHÍ) */}
        {currentTab === 'ai-assistant' && (
          <AiAssistantView
            initialPrompt={aiInitialPrompt}
            initialContext={aiContext}
          />
        )}

        {/* GÓC GIÁO VIÊN & QUẢN TRỊ (DÀNH CHO CÔ PHẠM THỊ THANH VÀ GIÁO VIÊN) */}
        {currentTab === 'teacher' && (
          <TeacherDashboardView
            currentUser={currentUser}
            onOpenAiWithPrompt={handleOpenAiWithPrompt}
          />
        )}
      </main>

      {/* Floating Mascot Widget: Bạn Sử Nhí AI */}
      <MascotWidget
        onOpenChat={() =>
          handleOpenAiWithPrompt('Bạn Sử Nhí ơi, tớ có câu hỏi lịch sử này muốn hỏi bạn!')
        }
        isMuted={isMuted}
      />

      {/* Login & Role Selection Modal (Teacher / Student) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer with Đông Sơn decorative band and copyright */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
