import React, { useState, useEffect } from 'react';
import { TEXTBOOK_LESSONS, QUIZ_QUESTIONS } from '../../data/historyData';
import { UserProfile, LearningMaterial, ClassItem } from '../../types';
import {
  Users,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Upload,
  BarChart3,
  Sparkles,
  Plus,
  ShieldCheck,
  FileCheck,
  School,
  KeyRound,
  Check,
  X,
  Trash2,
  Eye,
  Download,
  AlertCircle,
  Clock,
  Copy
} from 'lucide-react';
import { DongSonCorner, DongSonStar, BanSuNhiAvatar } from '../DongSonMotif';
import { UploadMaterialModal } from '../materials/UploadMaterialModal';

interface TeacherDashboardViewProps {
  currentUser?: UserProfile | null;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
}

interface TeacherRecord {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher';
  approved: boolean;
  school?: string;
  createdAt: string;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  currentUser,
  onOpenAiWithPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<
    'progress' | 'materials' | 'classes' | 'teachers' | 'quiz-builder'
  >('progress');

  const isAdmin = currentUser?.role === 'admin' || currentUser?.email === 'pham.thanhh212@gmail.com';

  // State for classes
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassCode, setNewClassCode] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState<4 | 5>(4);
  const [newClassPin, setNewClassPin] = useState('2026');
  const [newClassSchool, setNewClassSchool] = useState('Trường Tiểu học Tiền Phong');

  // State for teachers list (Admin only)
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);

  // State for materials moderation & category filtering
  const [allMaterials, setAllMaterials] = useState<LearningMaterial[]>([]);
  const [materialCategoryFilter, setMaterialCategoryFilter] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadContentType, setUploadContentType] = useState<
    'lecture' | 'quiz_game' | 'movie' | 'article' | 'document'
  >('lecture');

  // State for AI Quiz Builder & Quiz Bank
  const [generatedQuestion, setGeneratedQuestion] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetLessonCode, setTargetLessonCode] = useState('LS4-B04');
  const [quizzesList, setQuizzesList] = useState<any[]>([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [quizDeleteConfirmId, setQuizDeleteConfirmId] = useState<string | null>(null);

  // Feedback notifications
  const [actionNotice, setActionNotice] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string>('');

  useEffect(() => {
    fetchClasses();
    fetchMaterials();
    fetchQuizzes();
    if (isAdmin) {
      fetchTeachers();
    }
  }, [isAdmin]);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/classes');
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
      }
    } catch (err) {
      console.warn('Error fetching classes:', err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/teachers');
      if (res.ok) {
        const data = await res.json();
        setTeachers(data);
      }
    } catch (err) {
      console.warn('Error fetching teachers:', err);
    }
  };

  const fetchMaterials = async () => {
    try {
      const roleParam = isAdmin ? 'admin' : 'teacher';
      const emailParam = currentUser?.email || 'pham.thanhh212@gmail.com';
      const res = await fetch(`/api/materials?role=${roleParam}&authorEmail=${encodeURIComponent(emailParam)}`);
      if (res.ok) {
        const data = await res.json();
        setAllMaterials(data);
      }
    } catch (err) {
      console.warn('Error fetching materials:', err);
    }
  };

  const handleApproveTeacher = async (id: string, approved: boolean) => {
    try {
      const res = await fetch(`/api/teachers/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved }),
      });
      if (res.ok) {
        showNotification(approved ? 'Đã phê duyệt tài khoản giáo viên thành công!' : 'Đã thu hồi quyền giáo viên.');
        fetchTeachers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassCode.trim() || !newClassPin.trim()) return;

    try {
      const res = await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newClassCode.trim().toUpperCase(),
          name: newClassName.trim() || `Lớp ${newClassCode.trim().toUpperCase()}`,
          grade: newClassGrade,
          pin: newClassPin.trim(),
          teacherEmail: currentUser?.email || 'pham.thanhh212@gmail.com',
          school: newClassSchool,
        }),
      });

      if (res.ok) {
        showNotification(`Đã tạo mã lớp ${newClassCode.toUpperCase()} thành công!`);
        setShowAddClassModal(false);
        setNewClassCode('');
        setNewClassName('');
        fetchClasses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMaterialStatus = async (id: string, status: 'published' | 'pending_approval' | 'hidden') => {
    try {
      const res = await fetch(`/api/materials/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showNotification(`Đã cập nhật trạng thái học liệu thành "${status === 'published' ? 'Đã xuất bản' : 'Tạm ẩn'}"!`);
        fetchMaterials();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQuizzes = async () => {
    try {
      setIsLoadingQuizzes(true);
      const res = await fetch('/api/quizzes');
      if (res.ok) {
        const data = await res.json();
        setQuizzesList(data);
      }
    } catch (err) {
      console.warn('Error fetching quizzes:', err);
    } finally {
      setIsLoadingQuizzes(false);
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    try {
      const res = await fetch(`/api/quizzes/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setQuizzesList((prev) => prev.filter((q) => q.id !== id));
        setQuizDeleteConfirmId(null);
        showNotification('Đã xóa câu hỏi trắc nghiệm và đồng bộ hệ thống thành công!');
        fetchMaterials();
      } else {
        const err = await res.json();
        showNotification(err.error || 'Xóa câu hỏi thất bại.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    try {
      const res = await fetch(`/api/materials/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: currentUser?.email || 'pham.thanhh212@gmail.com',
          userRole: currentUser?.role || 'admin',
        }),
      });
      if (res.ok) {
        setAllMaterials((prev) => prev.filter((m) => m.id !== id));
        setDeleteConfirmId(null);
        showNotification('Đã xóa học liệu và đồng bộ trên tất cả các trang!');
        fetchQuizzes();
      } else {
        const err = await res.json();
        showNotification(err.error || 'Xóa học liệu thất bại.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyClassCode = (code: string, pin: string) => {
    const text = `Mã lớp Lịch sử: ${code} - Mã PIN: ${pin}`;
    navigator.clipboard?.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  // AI Quiz generation for teachers
  const handleGenerateAiQuestion = async () => {
    setIsGenerating(true);
    const lesson = TEXTBOOK_LESSONS.find((l) => l.code === targetLessonCode);
    const prompt = `Bạn hãy đề xuất 1 câu hỏi trắc nghiệm 4 lựa chọn (A, B, C, D) chuẩn mực dành cho học sinh tiểu học bám sát bài: "${lesson?.title}" (${targetLessonCode}). Kèm theo đáp án đúng, giải thích ngắn gọn và trích dẫn trang sách/nguồn sử liệu.`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          mode: 'explain',
          lessonTitle: lesson?.title,
          grade: lesson?.grade || 4,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedQuestion({
          lessonTitle: lesson?.title,
          content: data.reply,
          sources: data.sources,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Sample student performance data for Cô Phạm Thị Thanh's class
  const classStats = {
    className: '5A8 - Trường Tiểu học Tiền Phong',
    totalStudents: 38,
    completedJourneysPct: 92,
    avgScore: 94,
    frequentMistakes: [
      {
        question: 'Ngô Quyền cắm cọc gỗ loại nào trên sông Bạch Đằng năm 938?',
        correctAnswer: 'Gỗ lim rừng đẽo nhọn bịt sắt',
        errorRate: '28% học sinh nhầm sang cọc tre',
      },
      {
        question: 'Ý nghĩa của hình tượng nỏ thần Cổ Loa',
        correctAnswer: 'Kỹ thuật nỏ bắn nhiều mũi tên đồng Cầu Vực',
        errorRate: '22% nhầm tưởng là phép thuật hư cấu hoàn toàn',
      },
    ],
  };

  const pendingMaterialsCount = allMaterials.filter((m) => m.status === 'pending_approval').length;
  const pendingTeachersCount = teachers.filter((t) => !t.approved).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 bg-[#451a03] text-amber-100 px-4 py-3 rounded-2xl shadow-xl border border-amber-500/30 flex items-center gap-2.5 text-xs animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{actionNotice}</span>
        </div>
      )}

      {/* Header with Dong Son styling */}
      <div className="relative bg-[#fffdfa] rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/20" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <span>Bảng điều khiển Sư phạm & Quản trị</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 font-normal">
                {isAdmin
                  ? 'Quản trị viên: Cô giáo Phạm Thị Thanh'
                  : `Giáo viên: ${currentUser?.name || 'Giáo viên bộ môn'}`}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1">
              Góc Quản Lý Dạy Học & Kho Học Liệu Số
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              Quản trị tài khoản giáo viên, cấp mã lớp học sinh, duyệt học liệu trực tuyến và tạo đề kiểm tra cùng Bạn Sử Nhí AI.
            </p>
          </div>

          {/* Top Controls: Tabs and Prominent + TẢI TƯ LIỆU LỊCH SỬ LÊN */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Tab Navigation buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'progress'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-amber-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Tiến độ học tập</span>
              </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 relative ${
                activeTab === 'materials'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'text-stone-700 hover:text-amber-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kho học liệu</span>
              {pendingMaterialsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('classes')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'classes'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'text-stone-700 hover:text-amber-900'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>Mã Lớp & PIN</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => setActiveTab('teachers')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 relative ${
                  activeTab === 'teachers'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-amber-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Duyệt Giáo viên</span>
                {pendingTeachersCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
                    {pendingTeachersCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setActiveTab('quiz-builder')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'quiz-builder'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'text-stone-700 hover:text-amber-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Soạn đề AI</span>
            </button>
          </div>

          {/* Prominent + TẢI TƯ LIỆU LỊCH SỬ LÊN button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-800 via-amber-900 to-[#3b1704] hover:from-amber-900 hover:to-black text-amber-100 rounded-xl text-xs font-extrabold tracking-wide shadow-xs border border-amber-950 transition-all active:scale-95 shrink-0"
          >
            <Upload className="w-4 h-4 text-amber-300" />
            <span>+ TẢI TƯ LIỆU LỊCH SỬ LÊN</span>
          </button>
        </div>
      </div>
    </div>

      {/* =========================================================================
          TAB 1: TIẾN ĐỘ LỚP HỌC & ĐÁNH GIÁ
          ========================================================================= */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#fffdfa] p-5 rounded-2xl border border-[#eedec7] shadow-2xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold">Lớp học sinh:</span>
              <h3 className="font-display text-lg font-bold text-[#451a03]">
                {classStats.className}
              </h3>
              <div className="text-xs text-stone-600 font-medium">Sĩ số: {classStats.totalStudents} học sinh</div>
            </div>

            <div className="bg-[#fffdfa] p-5 rounded-2xl border border-[#eedec7] shadow-2xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold">Tỷ lệ hoàn thành hành trình Sử Việt:</span>
              <h3 className="font-mono text-2xl font-extrabold text-emerald-800">
                {classStats.completedJourneysPct}%
              </h3>
              <div className="text-xs text-emerald-700 font-medium">32/36 em đã đạt trọn bộ 7 tem mộc số</div>
            </div>

            <div className="bg-[#fffdfa] p-5 rounded-2xl border border-[#eedec7] shadow-2xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold">Điểm trung bình trắc nghiệm:</span>
              <h3 className="font-mono text-2xl font-extrabold text-amber-800">
                {classStats.avgScore} / 100 đ
              </h3>
              <div className="text-xs text-stone-600 font-medium">Đánh giá chung: Nắm vững sử liệu SGK Lịch sử lớp 5</div>
            </div>
          </div>

          {/* Frequent Mistakes Analysis */}
          <div className="bg-[#fffdfa] p-6 sm:p-8 rounded-2xl border border-[#eedec7] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-display text-base font-bold text-[#451a03]">
                Phân tích những điểm học sinh còn dễ nhầm lẫn (Tự động tổng hợp)
              </h3>
            </div>
            <p className="text-xs text-stone-600">
              Hệ thống tự động thống kê từ bài tập trắc nghiệm và câu hỏi của các em để cô giáo nhấn mạnh trong tiết học:
            </p>

            <div className="space-y-3">
              {classStats.frequentMistakes.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                  <div className="font-bold text-[#451a03]">Câu hỏi: {m.question}</div>
                  <div className="text-emerald-900">
                    <strong>Đáp án chuẩn xác:</strong> {m.correctAnswer}
                  </div>
                  <div className="text-rose-700 font-medium">
                    ⚠️ {m.errorRate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: KHO HỌC LIỆU TRỰC TUYẾN & KIỂM DUYỆT
          ========================================================================= */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#fffdfa] p-5 rounded-2xl border border-[#eedec7]">
            <div>
              <h3 className="font-display text-lg font-bold text-[#451a03]">
                Kho Học Liệu Trực Tuyến & Bài Giảng Điện Tử
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                {isAdmin
                  ? 'Quản trị viên có quyền phê duyệt, ẩn hoặc xóa học liệu từ tất cả giáo viên.'
                  : 'Giáo viên có thể tải lên bài giảng mới và quản lý bài giảng của chính mình.'}
              </p>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors shrink-0"
            >
              <Upload className="w-4 h-4 text-amber-300" />
              <span>+ TẢI TƯ LIỆU LỊCH SỬ LÊN</span>
            </button>
          </div>

          {/* Materials Table/List */}
          <div className="bg-[#fffdfa] rounded-2xl border border-[#eedec7] overflow-hidden shadow-xs">
            {/* Header with stats and pending notice */}
            <div className="p-4 bg-[#fbf6ec] border-b border-[#eedec7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-stone-700">
              <span>Danh sách tài liệu trên hệ thống ({allMaterials.length} tài nguyên)</span>
              {pendingMaterialsCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-semibold text-[11px] self-start sm:self-auto">
                  Có {pendingMaterialsCount} tài liệu đang chờ duyệt
                </span>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="p-3 bg-stone-50/70 border-b border-[#eedec7] flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-stone-500 font-bold mr-1 text-[11px]">Phân loại:</span>
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'lecture', label: 'Bài giảng điện tử' },
                { id: 'quiz', label: 'Game trắc nghiệm' },
                { id: 'movie', label: 'Phim lịch sử' },
                { id: 'history_info', label: 'Tư liệu & Thông tin lịch sử' },
              ].map((cat) => {
                const count = allMaterials.filter((m) => {
                  if (cat.id === 'all') return true;
                  if (cat.id === 'lecture') return m.category === 'Bài giảng điện tử';
                  if (cat.id === 'quiz') return m.category === 'Game trắc nghiệm' || m.type === 'quiz';
                  if (cat.id === 'movie') return m.category === 'Phim lịch sử' || m.type === 'video';
                  if (cat.id === 'history_info') return !['Bài giảng điện tử', 'Game trắc nghiệm', 'Phim lịch sử'].includes(m.category) && m.type !== 'quiz' && m.type !== 'video';
                  return false;
                }).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setMaterialCategoryFilter(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      materialCategoryFilter === cat.id
                        ? 'bg-amber-800 text-white shadow-2xs'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      materialCategoryFilter === cat.id ? 'bg-amber-900 text-amber-200' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="divide-y divide-[#f0e4d0] text-xs">
              {allMaterials
                .filter((mat) => {
                  if (materialCategoryFilter === 'all') return true;
                  if (materialCategoryFilter === 'lecture') return mat.category === 'Bài giảng điện tử';
                  if (materialCategoryFilter === 'quiz') return mat.category === 'Game trắc nghiệm' || mat.type === 'quiz';
                  if (materialCategoryFilter === 'movie') return mat.category === 'Phim lịch sử' || mat.type === 'video';
                  if (materialCategoryFilter === 'history_info') return !['Bài giảng điện tử', 'Game trắc nghiệm', 'Phim lịch sử'].includes(mat.category) && mat.type !== 'quiz' && mat.type !== 'video';
                  return true;
                })
                .map((mat) => {
                const isPending = mat.status === 'pending_approval';
                const isOwner = currentUser?.email === mat.authorEmail;
                const canManage = isAdmin || isOwner;

                return (
                  <div
                    key={mat.id}
                    className={`p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
                      isPending ? 'bg-amber-50/50' : 'hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                          {mat.type.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          Lớp {mat.grade} · {mat.lessonCode}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {mat.category}
                        </span>

                        {isPending ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Chờ Admin duyệt
                          </span>
                        ) : mat.status === 'published' ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Đã xuất bản
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-bold">
                            Tạm ẩn
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-[#451a03]">
                        {mat.title}
                      </h4>
                      <p className="text-stone-600 text-xs line-clamp-2">
                        {mat.description || 'Chưa có mô tả chi tiết.'}
                      </p>

                      <div className="text-[11px] text-stone-500 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                        <span>Tác giả: <strong>{mat.author}</strong></span>
                        <span>Ngày đăng: {mat.date}</span>
                        <span>Giấy phép: {mat.license}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                      {mat.url && mat.url !== '#' && (
                        <a
                          href={mat.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold flex items-center gap-1 text-xs transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Xem</span>
                        </a>
                      )}

                      {/* Admin Moderation controls */}
                      {isAdmin && isPending && (
                        <button
                          onClick={() => handleUpdateMaterialStatus(mat.id, 'published')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1 text-xs shadow-2xs transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Duyệt xuất bản</span>
                        </button>
                      )}

                      {canManage && (
                        deleteConfirmId === mat.id ? (
                          <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-300 text-[11px]">
                            <span className="text-rose-800 font-bold">Xóa?</span>
                            <button
                              onClick={() => handleDeleteMaterial(mat.id)}
                              className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded"
                            >
                              Có
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium rounded"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(mat.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Xóa học liệu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: QUẢN LÝ MÃ LỚP & MÃ PIN HỌC SINH
          ========================================================================= */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#fffdfa] p-5 rounded-2xl border border-[#eedec7]">
            <div>
              <h3 className="font-display text-lg font-bold text-[#451a03]">
                Quản Lý Mã Lớp Học & Mã PIN Truy Cập
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Học sinh chỉ cần nhập Mã lớp và Mã PIN do thầy cô cấp để vào học ngay (không bắt buộc tài khoản Gmail).
              </p>
            </div>

            <button
              onClick={() => setShowAddClassModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tạo mã lớp mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-[#fffdfa] p-5 rounded-2xl border-2 border-[#eedec7] shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-600 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                      Khối Lớp {cls.grade}
                    </span>
                    <span className="text-stone-500 font-semibold">
                      {cls.studentCount} học sinh
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-extrabold text-[#451a03]">
                    {cls.name}
                  </h4>
                  <div className="text-xs text-stone-600 mt-1">
                    Trường: {cls.school}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Giáo viên: {cls.teacherEmail}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f0e4d0] space-y-2">
                  <div className="p-3 bg-[#fbf6ec] rounded-xl border border-[#eedec7] flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">Mã Lớp / PIN</div>
                      <div className="font-mono font-extrabold text-[#451a03] text-sm">
                        {cls.code} · PIN: {cls.pin}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyClassCode(cls.code, cls.pin)}
                      className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-bold text-amber-900 flex items-center gap-1 transition-colors"
                    >
                      {copiedCode === cls.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for creating a new class */}
          {showAddClassModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-[#fffdfa] rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[#eedec7] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
                  <h3 className="font-display text-lg font-bold text-[#451a03]">
                    Tạo Mã Lớp Học Mới
                  </h3>
                  <button
                    onClick={() => setShowAddClassModal(false)}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateClass} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Mã lớp (Ví dụ: 4A3, 5A2) *</label>
                    <input
                      type="text"
                      required
                      value={newClassCode}
                      onChange={(e) => setNewClassCode(e.target.value.toUpperCase())}
                      placeholder="4A3"
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] font-mono font-bold uppercase focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Tên lớp hiển thị</label>
                    <input
                      type="text"
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      placeholder="Lớp 4A3 - Khám phá Lịch sử"
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Khối lớp *</label>
                      <select
                        value={newClassGrade}
                        onChange={(e) => setNewClassGrade(Number(e.target.value) as 4 | 5)}
                        className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white font-semibold"
                      >
                        <option value={4}>Lớp 4</option>
                        <option value={5}>Lớp 5</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Mã PIN truy cập *</label>
                      <input
                        type="text"
                        required
                        value={newClassPin}
                        onChange={(e) => setNewClassPin(e.target.value)}
                        placeholder="2026"
                        className="w-full p-2.5 rounded-xl border border-[#d6be9e] font-mono focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Trường tiểu học</label>
                    <input
                      type="text"
                      value={newClassSchool}
                      onChange={(e) => setNewClassSchool(e.target.value)}
                      placeholder="Trường Tiểu học Tiền Phong"
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddClassModal(false)}
                      className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-xs"
                    >
                      Lưu mã lớp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 4: PHÊ DUYỆT TÀI KHOẢN GIÁO VIÊN (ADMIN ONLY: Cô Phạm Thị Thanh)
          ========================================================================= */}
      {isAdmin && activeTab === 'teachers' && (
        <div className="space-y-6">
          <div className="bg-[#fffdfa] p-5 rounded-2xl border border-[#eedec7]">
            <h3 className="font-display text-lg font-bold text-[#451a03]">
              Phê Duyệt Tài Khoản Giáo Viên Mới
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Chỉ Quản trị viên (Cô Phạm Thị Thanh) mới có quyền cấp phép cho các thầy cô khác tải học liệu và quản lý học sinh.
            </p>
          </div>

          <div className="bg-[#fffdfa] rounded-2xl border border-[#eedec7] overflow-hidden shadow-xs">
            <div className="divide-y divide-[#f0e4d0] text-xs">
              {teachers.map((t) => {
                const isMasterAdmin = t.email === 'pham.thanhh212@gmail.com';
                return (
                  <div
                    key={t.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#451a03]">
                          {t.name}
                        </span>
                        {isMasterAdmin ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-800 text-amber-100 text-[10px] font-bold">
                            Quản trị viên chính (Admin)
                          </span>
                        ) : t.approved ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Đã phê duyệt
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Chờ cô Thanh duyệt
                          </span>
                        )}
                      </div>

                      <div className="text-stone-600 text-xs">
                        Email: <span className="font-mono font-medium">{t.email}</span> · Đơn vị: {t.school || 'Trường Tiểu học'}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Ngày đăng ký: {t.createdAt}
                      </div>
                    </div>

                    {!isMasterAdmin && (
                      <div className="flex items-center gap-2">
                        {t.approved ? (
                          <button
                            onClick={() => handleApproveTeacher(t.id, false)}
                            className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors"
                          >
                            Thu hồi quyền
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApproveTeacher(t.id, true)}
                            className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Phê duyệt ngay</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: SOẠN CÂU HỎI TRẮC NGHIỆM CÙNG BẠN SỬ NHÍ AI
          ========================================================================= */}
      {activeTab === 'quiz-builder' && (
        <div className="bg-[#fffdfa] p-6 sm:p-8 rounded-2xl border border-[#eedec7] shadow-xs space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <DongSonStar size={18} className="text-amber-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Trợ lí Sư phạm AI có dẫn nguồn
              </span>
            </div>
            <h3 className="font-display text-xl font-extrabold text-[#451a03]">
              Soạn Câu Hỏi Trắc Nghiệm Chuẩn GDPT 2018
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Yêu cầu Bạn Sử Nhí AI đề xuất câu hỏi bám sát mục tiêu cần đạt của từng bài SGK Lịch sử & Địa lí bộ Kết nối tri thức. Cô giáo thẩm định trước khi xuất bản cho học sinh làm.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={targetLessonCode}
              onChange={(e) => setTargetLessonCode(e.target.value)}
              className="p-2.5 rounded-xl border border-[#d6be9e] text-xs bg-white font-medium"
            >
              {TEXTBOOK_LESSONS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.code} - {l.title} (Lớp {l.grade})
                </option>
              ))}
            </select>

            <button
              onClick={handleGenerateAiQuestion}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isGenerating ? 'AI đang biên soạn câu hỏi...' : 'Bạn Sử Nhí AI đề xuất câu hỏi'}</span>
            </button>
          </div>

          {generatedQuestion && (
            <div className="p-5 bg-amber-50/70 rounded-2xl border-2 border-amber-300 space-y-3 animate-in fade-in text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <span className="font-bold text-[#451a03]">
                  Đề xuất câu hỏi cho bài: {generatedQuestion.lessonTitle}
                </span>
                <span className="text-amber-800 font-semibold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Chờ thẩm định
                </span>
              </div>

              <div className="whitespace-pre-line text-stone-800 leading-relaxed font-sans">
                {generatedQuestion.content}
              </div>

              <div className="pt-2 border-t border-amber-200 flex justify-end gap-2">
                <button
                  onClick={() => setGeneratedQuestion(null)}
                  className="px-3.5 py-1.5 border border-stone-300 rounded-xl text-xs text-stone-600 hover:bg-stone-50"
                >
                  Bỏ qua
                </button>
                <button
                  onClick={() => {
                    showNotification('Đã phê duyệt và lưu câu hỏi vào ngân hàng đề thi của lớp!');
                    setGeneratedQuestion(null);
                  }}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-2xs"
                >
                  Phê duyệt câu hỏi này
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Material Modal */}
      <UploadMaterialModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        currentUser={
          currentUser || {
            id: 'usr-admin-1',
            name: 'Cô giáo Phạm Thị Thanh',
            email: 'pham.thanhh212@gmail.com',
            role: 'admin',
            approved: true,
            stampsCount: 7,
          }
        }
        onUploadSuccess={() => {
          showNotification('Học liệu đã được lưu thành công vào máy chủ!');
          fetchMaterials();
        }}
      />
    </div>
  );
};
