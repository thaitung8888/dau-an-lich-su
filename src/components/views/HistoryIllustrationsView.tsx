import React, { useState, useEffect } from 'react';
import {
  HistoryIllustrationItem,
  INITIAL_HISTORICAL_ILLUSTRATIONS,
  HISTORICAL_PERIOD_OPTIONS,
  ILLUSTRATION_CATEGORIES,
} from '../../data/historyIllustrationsData';
import { AddIllustrationModal } from '../materials/AddIllustrationModal';
import { ImageDetailModal } from '../ImageDetailModal';
import { HistoricalImage, UserProfile } from '../../types';
import { DongSonCorner, DongSonStar, DongSonDrumSVG, ChimLacSVG } from '../DongSonMotif';
import {
  Image as ImageIcon,
  PlusCircle,
  Search,
  Filter,
  ZoomIn,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  BookOpen,
  Calendar,
  Layers,
  Palette,
  ExternalLink,
  Info,
  HelpCircle,
  Crown,
  Camera,
} from 'lucide-react';

interface HistoryIllustrationsViewProps {
  currentUser?: UserProfile | null;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
}

const LOCAL_STORAGE_ILLUSTRATIONS_KEY = 'dauan_history_illustrations_custom';

export const HistoryIllustrationsView: React.FC<HistoryIllustrationsViewProps> = ({
  currentUser,
  onOpenAiWithPrompt,
}) => {
  const [illustrations, setIllustrations] = useState<HistoryIllustrationItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ILLUSTRATIONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom user illustrations before initials
          const customIds = new Set(parsed.map((p) => p.id));
          const filteredInitials = INITIAL_HISTORICAL_ILLUSTRATIONS.filter((i) => !customIds.has(i.id));
          return [...parsed, ...filteredInitials];
        }
      }
    } catch (e) {
      console.warn('Error reading illustrations from localStorage', e);
    }
    return INITIAL_HISTORICAL_ILLUSTRATIONS;
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [onlyUserAdded, setOnlyUserAdded] = useState<boolean>(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [inspectImage, setInspectImage] = useState<HistoricalImage | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync with server if endpoint is reachable
  useEffect(() => {
    let isMounted = true;
    const fetchServerIllustrations = async () => {
      try {
        const res = await fetch('/api/history/illustrations');
        if (res.ok) {
          const serverData = await res.json();
          if (Array.isArray(serverData) && serverData.length > 0 && isMounted) {
            setIllustrations((prev) => {
              const serverIds = new Set(serverData.map((s: any) => s.id));
              const localUnique = prev.filter((p) => !serverIds.has(p.id));
              return [...serverData, ...localUnique];
            });
          }
        }
      } catch (err) {
        // Fallback to local state is normal
      }
    };
    fetchServerIllustrations();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddIllustration = async (newIllustration: HistoryIllustrationItem) => {
    setIllustrations((prev) => {
      const updated = [newIllustration, ...prev];
      try {
        const customItems = updated.filter((item) => item.isUserAdded);
        localStorage.setItem(LOCAL_STORAGE_ILLUSTRATIONS_KEY, JSON.stringify(customItems));
      } catch (e) {
        console.warn('Error saving to localStorage', e);
      }
      return updated;
    });

    // Also try saving to server endpoint
    try {
      await fetch('/api/history/illustrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIllustration),
      });
    } catch (e) {
      console.warn('Could not sync to server /api/history/illustrations', e);
    }

    setNotification(`Đã thêm ảnh minh họa "${newIllustration.title}" thành công!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteIllustration = async (id: string) => {
    setIllustrations((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        const customItems = updated.filter((item) => item.isUserAdded);
        localStorage.setItem(LOCAL_STORAGE_ILLUSTRATIONS_KEY, JSON.stringify(customItems));
      } catch (e) {
        console.warn('Error updating localStorage after delete', e);
      }
      return updated;
    });

    try {
      await fetch(`/api/history/illustrations/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Could not delete from server', e);
    }

    setDeleteConfirmId(null);
    setNotification('Đã gỡ ảnh minh họa khỏi danh sách.');
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter logic
  const filteredIllustrations = illustrations.filter((item) => {
    if (onlyUserAdded && !item.isUserAdded) return false;
    if (selectedPeriod !== 'ALL' && item.periodCode !== selectedPeriod) return false;
    if (selectedCategory !== 'Tất cả' && item.category !== selectedCategory) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchPeriod = item.periodName.toLowerCase().includes(q);
      const matchCaption = item.caption.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchAuthor = (item.authorOrProvider || '').toLowerCase().includes(q);
      const matchDetails = (item.historicalSignificance || '').toLowerCase().includes(q);
      return matchTitle || matchPeriod || matchCaption || matchCategory || matchAuthor || matchDetails;
    }

    return true;
  });

  const userAddedCount = illustrations.filter((i) => i.isUserAdded).length;

  return (
    <div className="space-y-6">
      {/* Lightbox / High-resolution Inspector Modal */}
      <ImageDetailModal
        image={inspectImage}
        onClose={() => setInspectImage(null)}
        topicTitle={inspectImage ? `${inspectImage.title}` : 'Kho tư liệu minh họa lịch sử'}
      />

      {/* Add Illustration Modal */}
      <AddIllustrationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        currentUser={currentUser}
        onAddIllustration={handleAddIllustration}
      />

      {/* Success / Info Notification Toast */}
      {notification && (
        <div className="p-4 rounded-2xl bg-amber-900 text-amber-50 border border-amber-600 shadow-lg flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-amber-300 hover:text-white text-xs font-bold"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Top Banner Header with Dong Son Accents */}
      <div className="relative bg-gradient-to-br from-[#fffdf8] via-[#fcf6ec] to-[#f7eedf] rounded-3xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30 pointer-events-none" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#eedec7]">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-amber-900 uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                <Palette className="w-3.5 h-3.5 text-amber-700" />
                Kho Tư Liệu Trực Quan Sinh Động
              </span>
              <span className="text-stone-500 font-semibold">
                GDPT 2018 · Lịch sử & Địa lí Tiểu học (Lớp 4–5)
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03]">
              Hình Ảnh Minh Họa & Tranh Tư Liệu Lịch Sử
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Tuyển tập tranh vẽ minh họa, tranh dân gian truyền thống, mô hình phục dựng lịch sử và ảnh tư liệu quý báu giúp các em học sinh dễ dàng hình dung bối cảnh, trận đánh hào hùng, danh nhân kiệt xuất và đời sống của tổ tiên ta qua từng thời kỳ.
            </p>
          </div>

          {/* Action Button: Thêm ảnh minh họa mới */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>+ THÊM ẢNH MINH HỌA MỚI</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights / Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="p-3 bg-white/80 rounded-2xl border border-[#eedec7] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium">Tổng tư liệu ảnh</div>
              <div className="text-base font-extrabold text-[#451a03]">{illustrations.length} bức tranh/ảnh</div>
            </div>
          </div>

          <div className="p-3 bg-white/80 rounded-2xl border border-[#eedec7] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium">Bao quát thời kỳ</div>
              <div className="text-base font-extrabold text-[#451a03]">8 Giai đoạn lịch sử</div>
            </div>
          </div>

          <div className="p-3 bg-white/80 rounded-2xl border border-[#eedec7] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium">Tính chuẩn xác</div>
              <div className="text-base font-extrabold text-[#451a03]">Đối chiếu SGK & Bảo tàng</div>
            </div>
          </div>

          <div className="p-3 bg-white/80 rounded-2xl border border-[#eedec7] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium">Ảnh do bạn/thầy cô thêm</div>
              <div className="text-base font-extrabold text-[#451a03]">{userAddedCount} ảnh mới</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filtering Controls */}
      <div className="bg-white rounded-2xl border border-[#eedec7] p-4 sm:p-5 shadow-xs space-y-4">
        {/* Row 1: Search bar and quick toggle for user-added */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm tranh minh họa theo tên, thời kỳ, nhân vật, họa sĩ..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs bg-[#faf8f5] focus:bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600 font-bold"
              >
                Xóa tìm
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOnlyUserAdded(!onlyUserAdded)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                onlyUserAdded
                  ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-amber-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Chỉ xem ảnh đã thêm ({userAddedCount})</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-800" />
              <span>Thêm ảnh</span>
            </button>
          </div>
        </div>

        {/* Row 2: Filter by Historical Period */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Lọc theo thời kỳ lịch sử:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {HISTORICAL_PERIOD_OPTIONS.map((period) => (
              <button
                key={period.code}
                onClick={() => setSelectedPeriod(period.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  selectedPeriod === period.code
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-[#faf6ee] text-stone-700 hover:bg-amber-100/70 border border-[#e8d7be]'
                }`}
              >
                {period.code === 'ALL' ? 'Tất cả các thời kỳ' : period.name}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Filter by Category */}
        <div className="space-y-1.5 pt-1 border-t border-stone-100">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-700" />
            <span>Phân loại nội dung minh họa:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {ILLUSTRATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-amber-100 shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Illustration Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>
            Hiển thị <strong>{filteredIllustrations.length}</strong> / {illustrations.length} bức tranh & ảnh minh họa
          </span>
          {(selectedPeriod !== 'ALL' || selectedCategory !== 'Tất cả' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedPeriod('ALL');
                setSelectedCategory('Tất cả');
                setSearchTerm('');
                setOnlyUserAdded(false);
              }}
              className="text-amber-800 hover:underline font-bold"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {filteredIllustrations.length === 0 ? (
          <div className="bg-[#fffdfa] rounded-3xl border-2 border-dashed border-[#eedec7] p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="font-display text-lg font-bold text-stone-900">
                Không tìm thấy ảnh minh họa phù hợp
              </h3>
              <p className="text-xs text-stone-600">
                Không có bức tranh hoặc ảnh minh họa nào khớp với tiêu chí tìm kiếm hoặc bộ lọc hiện tại của bạn.
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm ảnh minh họa cho mục này</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIllustrations.map((item) => (
              <div
                key={item.id}
                className="group bg-[#fffdfa] rounded-2xl border-2 border-[#eedec7] hover:border-amber-600 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Frame with Aspect Ratio 16:9 or 4:3 */}
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#faf4e8] via-[#f5ebdb] to-[#ede0c9] border-b border-[#eedec7]">
                  <DongSonCorner position="tl" className="absolute top-1.5 left-1.5 z-20 text-amber-600/40 pointer-events-none" />
                  <DongSonCorner position="tr" className="absolute top-1.5 right-1.5 z-20 text-amber-600/40 pointer-events-none" />

                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/dong_son_drum_1792643655430.jpg';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-stone-900/90 text-amber-200 border border-amber-500/40 backdrop-blur-xs flex items-center gap-1">
                      <Palette className="w-3 h-3 text-amber-400" />
                      <span>{item.typeLabel}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-950/90 text-white border border-amber-600/40 backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Quick Zoom Overlay */}
                  <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => setInspectImage(item)}
                      className="px-3.5 py-2 rounded-xl bg-white text-stone-900 font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-50 transition-colors transform hover:scale-105"
                    >
                      <ZoomIn className="w-4 h-4 text-amber-700" />
                      <span>Phóng to</span>
                    </button>
                    <button
                      onClick={() =>
                        onOpenAiWithPrompt(
                          `Em đang quan sát bức tranh minh họa lịch sử: "${item.title}". Hãy giải thích chi tiết cho em bối cảnh lịch sử, ý nghĩa và những chi tiết đặc biệt trong bức tranh này!`
                        )
                      }
                      className="px-3.5 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-900 transition-colors transform hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Hỏi AI</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{item.periodName}</span>
                    </div>

                    <h3 className="font-display text-base font-bold text-stone-900 leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {item.historicalSignificance || item.caption}
                    </p>

                    {item.reflectionQuestion && (
                      <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong>Câu hỏi suy ngẫm:</strong> {item.reflectionQuestion}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metadata: Artist & Source */}
                  <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate">Nguồn: <strong>{item.sourceName}</strong></span>
                      {item.isUserAdded && (
                        <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[10px]">
                          Tự đóng góp
                        </span>
                      )}
                    </div>
                    {item.authorOrProvider && (
                      <div className="truncate text-stone-600">
                        Họa sĩ / Cung cấp: <em>{item.authorOrProvider}</em>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-[#faf6ee] border-t border-[#eedec7] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setInspectImage(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-amber-700" />
                    <span>Chi tiết & Phóng to</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onOpenAiWithPrompt(
                          `Em đang học bài với hình ảnh minh họa: "${item.title}". Hãy kể cho em nghe một câu chuyện sinh động và rút ra bài học lịch sử từ bức tranh này nhé!`
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Hỏi AI</span>
                    </button>

                    {/* Delete button if user added */}
                    {item.isUserAdded && (
                      <>
                        {deleteConfirmId === item.id ? (
                          <div className="flex items-center gap-1 animate-in fade-in">
                            <button
                              onClick={() => handleDeleteIllustration(item.id)}
                              className="px-2 py-1 rounded-md bg-red-600 text-white text-[10px] font-bold hover:bg-red-700"
                            >
                              Xác nhận xóa
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-1 rounded-md bg-stone-200 text-stone-700 text-[10px] font-bold"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Xóa ảnh minh họa này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Pedagogical Note */}
      <div className="p-4 rounded-2xl bg-[#fdf9f2] border border-[#eedec7] text-xs text-stone-700 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-950 font-bold block">
            Hướng dẫn sư phạm khi sử dụng tranh ảnh minh họa lịch sử:
          </strong>
          <p>
            Hình ảnh minh họa và tranh phục dựng giúp học sinh tiểu học chuyển từ tư duy trừu tượng sang trực quan sinh động. Giáo viên và phụ huynh có thể khuyến khích các em quan sát trang phục, vũ khí, nét mặt nhân vật và quang cảnh xung quanh để đặt câu hỏi: <em>"Vì sao người xưa lại chèo thuyền mũi cong?", "Tại sao cọc gỗ lại được bịt sắt?"</em>.
          </p>
        </div>
      </div>
    </div>
  );
};
