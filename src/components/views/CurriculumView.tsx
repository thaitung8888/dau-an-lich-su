import React, { useState, useEffect } from 'react';
import { TEXTBOOK_LESSONS } from '../../data/historyData';
import { TextbookLesson, LearningMaterial, UserProfile } from '../../types';
import {
  BookOpen,
  FileText,
  Video,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  Plus,
  ShieldCheck,
  Star,
  Trash2
} from 'lucide-react';

import { UploadMaterialModal } from '../materials/UploadMaterialModal';

interface CurriculumViewProps {
  initialGrade?: number;
  userRole: 'student' | 'teacher';
  currentUser?: UserProfile | null;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
  onNavigateToQuiz: (lessonCode: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  initialGrade = 4,
  userRole,
  currentUser,
  onOpenAiWithPrompt,
  onNavigateToQuiz,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(
    TEXTBOOK_LESSONS[0]?.id || null
  );
  const [activeTab, setActiveTab] = useState<'lessons' | 'materials'>('lessons');
  const [materialTypeFilter, setMaterialTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);

  // New material form state
  const [newTitle, setNewTitle] = useState('');
  const [newLessonCode, setNewLessonCode] = useState('LS4-B02');
  const [newType, setNewType] = useState<'pptx' | 'pdf' | 'docx' | 'video'>('pptx');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newLicense, setNewLicense] = useState('Giáo dục mở CC BY-NC-SA 4.0');

  useEffect(() => {
    fetchMaterials();
  }, [selectedGrade]);

  const fetchMaterials = async () => {
    try {
      const res = await fetch(`/api/materials?grade=${selectedGrade}`);
      if (res.ok) {
        const data = await res.json();
        setMaterials(data);
      }
    } catch (err) {
      console.warn('Failed to load materials from server, using fallback');
    }
  };

  const handleDeleteMaterial = async (id: string, matTitle: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài giảng/học liệu "${matTitle}" khỏi hệ thống không? Dữ liệu sẽ được đồng bộ ngay lập tức.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/materials/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: currentUser?.email || 'pham.thanhh212@gmail.com',
          userRole: currentUser?.role || userRole,
        }),
      });
      if (res.ok) {
        setMaterials((prev) => prev.filter((m) => m.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || 'Xóa học liệu thất bại.');
      }
    } catch (err) {
      console.error('Error deleting material:', err);
    }
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const lesson = TEXTBOOK_LESSONS.find((l) => l.code === newLessonCode);
    try {
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          grade: selectedGrade,
          lessonCode: newLessonCode,
          lessonTitle: lesson ? lesson.title : '',
          type: newType,
          author: 'Cô Phạm Thị Thanh (Giáo viên)',
          url: newUrl || '#',
          description: newDesc,
          license: newLicense,
          source: 'Bộ SGK Kết nối tri thức với cuộc sống'
        }),
      });

      if (res.ok) {
        setShowAddMaterialModal(false);
        setNewTitle('');
        setNewDesc('');
        setNewUrl('');
        fetchMaterials();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLessons = TEXTBOOK_LESSONS.filter(
    (l) =>
      l.grade === selectedGrade &&
      (l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMaterials = materials.filter((m) => {
    const matchesType = materialTypeFilter === 'all' || m.type === materialTypeFilter;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header with Grade Tabs */}
      <div className="relative bg-[#fffdfa] rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <span>Học tập chính khóa</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 font-normal">Bộ sách Kết nối tri thức với cuộc sống</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1">
              Bài Giảng Điện Tử Lịch Sử Lớp {selectedGrade}
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              Tóm tắt 5 ý kiến thức cốt lõi, tư liệu chứng minh, sơ đồ tư duy và kho học liệu điện tử chất lượng cao.
            </p>
          </div>

          {/* Grade Selector Switch */}
          <div className="flex items-center gap-2 p-1.5 bg-amber-50/80 rounded-xl border border-amber-200">
            <button
              onClick={() => setSelectedGrade(4)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedGrade === 4
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-100'
              }`}
            >
              Lịch sử Lớp 4
            </button>
            <button
              onClick={() => setSelectedGrade(5)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedGrade === 5
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-100'
              }`}
            >
              Lịch sử Lớp 5
            </button>
          </div>
        </div>

        {/* View Switcher: Lessons vs Materials repository */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'lessons'
                  ? 'bg-amber-100 text-amber-950 font-extrabold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Hồ sơ bài học SGK ({filteredLessons.length})
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'materials'
                  ? 'bg-amber-100 text-amber-950 font-extrabold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Kho học liệu điện tử ({filteredMaterials.length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bài, tác giả..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#d6be9e] focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: LESSONS LIST */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          {filteredLessons.map((lesson) => {
            const isExpanded = expandedLessonId === lesson.id;
            return (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl border border-purple-100 shadow-xs overflow-hidden transition-all"
              >
                {/* Header Strip of Lesson */}
                <div
                  onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                  className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-purple-50/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {lesson.code}
                      </span>
                      <span className="text-slate-500">Lớp {lesson.grade}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-emerald-700 font-medium">Chuẩn GDPT 2018</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                      {lesson.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToQuiz(lesson.code);
                      }}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold rounded-lg border border-amber-200 transition-colors"
                    >
                      <span>Luyện tập 10 câu</span>
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-purple-700" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Detailed Lesson Dossier */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 space-y-6 animate-in fade-in duration-200">
                    {/* Yêu cầu cần đạt */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wide">
                        Mục tiêu và yêu cầu cần đạt
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {lesson.objectives.map((obj, i) => (
                          <div
                            key={i}
                            className="p-3 bg-purple-50/50 rounded-lg text-xs text-slate-700 flex items-start gap-2 border border-purple-100"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5 Ý KIẾN THỨC CỐT LÕI */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wide flex items-center justify-between">
                        <span>5 ý kiến thức cốt lõi (Ghi nhớ nhanh)</span>
                        <span className="text-slate-400 font-normal">Nguồn: SGK Lịch sử & Địa lí</span>
                      </h4>
                      <div className="space-y-2">
                        {lesson.fiveCorePoints.map((point, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                          >
                            <span className="w-5 h-5 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Primary Source & Action Task ("Từ trang sử đến việc tốt") */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1.5">
                        <span className="font-bold text-amber-950 uppercase tracking-wide block">
                          Sử liệu và Nguồn đối chiếu
                        </span>
                        <p className="text-amber-900 leading-relaxed">
                          {lesson.primarySource}
                        </p>
                      </div>

                      <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
                        <span className="font-bold text-emerald-950 uppercase tracking-wide block">
                          Từ trang sử đến việc tốt (Nhiệm vụ của em)
                        </span>
                        <p className="text-emerald-900 leading-relaxed font-medium">
                          {lesson.actionTask}
                        </p>
                      </div>
                    </div>

                    {/* Quick AI Question for this Lesson */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        Nhân vật: <strong>{lesson.figures.join(', ')}</strong> · Di tích: <strong>{lesson.relics.join(', ')}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onOpenAiWithPrompt(
                              `Hãy tóm tắt bài học "${lesson.title}" (${lesson.code}) theo dạng sơ đồ tư duy dễ nhớ cho học sinh lớp ${lesson.grade}.`,
                              { lessonCode: lesson.code }
                            )
                          }
                          className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-purple-200"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Hỏi Bạn Sử Nhí tóm tắt bài</span>
                        </button>
                        <button
                          onClick={() => onNavigateToQuiz(lesson.code)}
                          className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold shadow-2xs"
                        >
                          Làm bài tập trắc nghiệm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: MATERIALS REPOSITORY */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Type filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => setMaterialTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  materialTypeFilter === 'all'
                    ? 'bg-purple-700 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Tất cả loại
              </button>
              <button
                onClick={() => setMaterialTypeFilter('pptx')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  materialTypeFilter === 'pptx'
                    ? 'bg-purple-700 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Slide PPTX
              </button>
              <button
                onClick={() => setMaterialTypeFilter('pdf')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  materialTypeFilter === 'pdf'
                    ? 'bg-purple-700 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Phiếu bài tập PDF
              </button>
              <button
                onClick={() => setMaterialTypeFilter('video')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  materialTypeFilter === 'video'
                    ? 'bg-purple-700 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Video tư liệu
              </button>
              <button
                onClick={() => setMaterialTypeFilter('docx')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  materialTypeFilter === 'docx'
                    ? 'bg-purple-700 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Tài liệu DOCX
              </button>
            </div>

            {/* Teacher add material trigger */}
            {userRole === 'teacher' && (
              <button
                onClick={() => setShowAddMaterialModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold rounded-lg shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm học liệu mới (Giáo viên)</span>
              </button>
            )}
          </div>

          {/* Grid of Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs flex flex-col justify-between space-y-4 hover:border-purple-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="uppercase font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {mat.type.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{mat.rating}</span>
                      <span className="text-slate-400 font-normal">({mat.downloads} lượt tải)</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {mat.title}
                  </h3>
                  <div className="text-xs text-purple-800 font-medium mt-1">
                    {mat.lessonTitle} ({mat.lessonCode})
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Tác giả: <strong>{mat.author}</strong></span>
                    <span>Giấy phép: {mat.license}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 gap-2">
                    <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Đã qua kiểm duyệt chuyên môn
                    </span>
                    <div className="flex items-center gap-2">
                      {(userRole === 'teacher' || currentUser?.role === 'admin') && (
                        <button
                          onClick={() => handleDeleteMaterial(mat.id, mat.title)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200 transition-colors"
                          title="Xóa bài giảng"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa</span>
                        </button>
                      )}
                      <a
                        href={mat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold rounded-lg border border-purple-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-purple-700" />
                        <span>Tải về / Xem trước</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real Upload Material Modal */}
      <UploadMaterialModal
        isOpen={showAddMaterialModal}
        initialContentType="lecture"
        onClose={() => setShowAddMaterialModal(false)}
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
          fetchMaterials();
        }}
      />
    </div>
  );
};
