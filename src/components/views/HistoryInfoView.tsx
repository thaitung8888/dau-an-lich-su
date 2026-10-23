import React, { useState, useEffect } from 'react';
import {
  HISTORICAL_PERIODS,
  HISTORICAL_FIGURES,
  LEGEND_STORIES,
  NATIONAL_ARTIFACTS,
  VIETNAMESE_DYNASTIES,
  CULTURAL_ACHIEVEMENTS,
} from '../../data/historyData';
import { RelicsMapView } from './RelicsMapView';
import { HistoryFlowView } from './HistoryFlowView';
import { VerifiedHistoryArchiveView } from './VerifiedHistoryArchiveView';
import { HistoryIllustrationsView } from './HistoryIllustrationsView';
import { AuthenticImageCard } from '../common/AuthenticImageCard';
import { ImageDetailModal } from '../ImageDetailModal';
import { HistoricalImage, UserProfile } from '../../types';
import {
  DongSonStar,
  DongSonDrumSVG,
  ChimLacSVG,
  DongSonCorner,
  DongSonBorderBand,
} from '../DongSonMotif';
import {
  Users,
  Compass,
  MapPin,
  Sparkles,
  BookOpen,
  Box,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Crown,
  Search,
  Filter,
  Landmark,
  GraduationCap,
  Scale,
  HeartPulse,
  Globe2,
  Quote,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers,
  Image as ImageIcon,
  Palette,
  Volume2,
  VolumeX,
  Award,
} from 'lucide-react';

interface HistoryInfoViewProps {
  currentUser?: UserProfile | null;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
  onNavigateToQuiz: (id: string) => void;
  onUnlockStamp?: (siteName: string) => void;
}

export const HistoryInfoView: React.FC<HistoryInfoViewProps> = ({
  currentUser,
  onOpenAiWithPrompt,
  onNavigateToQuiz,
  onUnlockStamp,
}) => {
  const [subTab, setSubTab] = useState<'flow' | 'dynasties' | 'figures' | 'legends' | 'artifacts' | 'illustrations' | 'relics-map' | 'verified-archive'>('flow');
  const [selectedFigureId, setSelectedFigureId] = useState<string>(HISTORICAL_FIGURES[0].id);
  const [figureSearch, setFigureSearch] = useState<string>('');
  const [dynastyTab, setDynastyTab] = useState<'dynasties' | 'achievements'>('dynasties');
  const [selectedDynastyId, setSelectedDynastyId] = useState<string>(VIETNAMESE_DYNASTIES[0].id);
  const [selectedAchievementCategory, setSelectedAchievementCategory] = useState<string>('All');
  const [inspectImage, setInspectImage] = useState<HistoricalImage | null>(null);
  const [isSpeakingFigure, setIsSpeakingFigure] = useState<boolean>(false);

  // Stop speech when switching figure or unmounting
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingFigure(false);
  }, [selectedFigureId, subTab]);

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeakingFigure) {
      window.speechSynthesis.cancel();
      setIsSpeakingFigure(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${activeFigure.name}. ${activeFigure.title}. ${activeFigure.contribution}. ${activeFigure.memorableQuote ? 'Câu nói bất hủ: ' + activeFigure.memorableQuote : ''}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeakingFigure(false);
      utterance.onerror = () => setIsSpeakingFigure(false);
      setIsSpeakingFigure(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const activeFigure =
    HISTORICAL_FIGURES.find((f) => f.id === selectedFigureId) || HISTORICAL_FIGURES[0];

  const filteredFigures = HISTORICAL_FIGURES.filter((fig) => {
    if (!figureSearch.trim()) return true;
    const query = figureSearch.toLowerCase();
    return (
      fig.name.toLowerCase().includes(query) ||
      fig.title.toLowerCase().includes(query) ||
      fig.origin.toLowerCase().includes(query) ||
      fig.era.toLowerCase().includes(query)
    );
  });

  const activeDynasty =
    VIETNAMESE_DYNASTIES.find((d) => d.id === selectedDynastyId) || VIETNAMESE_DYNASTIES[0];

  const filteredAchievements = CULTURAL_ACHIEVEMENTS.filter((item) => {
    if (selectedAchievementCategory === 'All') return true;
    return item.category === selectedAchievementCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Lightbox / High-Resolution Image Inspector Modal */}
      <ImageDetailModal
        image={inspectImage}
        onClose={() => setInspectImage(null)}
        topicTitle="Kho tư liệu lịch sử Việt Nam chuẩn hóa"
      />

      {/* Header Deck with Đông Sơn accents */}
      <div className="relative bg-[#fffdfa] rounded-3xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pb-6 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <DongSonStar size={16} className="text-amber-700" />
              <span>Kho dữ liệu lịch sử số & tư liệu ảnh chuẩn hóa</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-stone-500 font-semibold">Chương trình GDPT 2018 (Lớp 4 - Lớp 5)</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1.5">
              Hành Trình Khám Phá Lịch Sử Việt Nam
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 max-w-3xl leading-relaxed">
              Khám phá toàn diện 7 chặng dòng chảy lịch sử, biên niên các triều đại, danh nhân kiệt xuất, huyền thoại cội nguồn, thành tựu văn hóa đỉnh cao và hệ thống bảo vật quốc gia với hình ảnh xác thực đã được giám định.
            </p>
          </div>

          {/* Sub-tabs Navigation Buttons */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#f5e9d5]/80 rounded-2xl border border-[#dcc3a2] text-xs font-bold overflow-x-auto max-w-full no-scrollbar shadow-inner">
            <button
              onClick={() => setSubTab('flow')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                subTab === 'flow'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>8 Giai đoạn Lịch sử</span>
            </button>

            <button
              onClick={() => setSubTab('dynasties')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                subTab === 'dynasties'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Triều đại & Thành tựu</span>
            </button>

            <button
              onClick={() => setSubTab('figures')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                subTab === 'figures'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Danh nhân đất Việt ({HISTORICAL_FIGURES.length})</span>
            </button>

            <button
              onClick={() => setSubTab('legends')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                subTab === 'legends'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Huyền thoại đất Việt</span>
            </button>

            <button
              onClick={() => setSubTab('artifacts')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                subTab === 'artifacts'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Bảo vật quốc gia</span>
            </button>

            {/* NEW: Kho Hình ảnh minh họa lịch sử & Thêm ảnh */}
            <button
              onClick={() => setSubTab('illustrations')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                subTab === 'illustrations'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Hình ảnh minh họa</span>
            </button>

            <button
              onClick={() => setSubTab('relics-map')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                subTab === 'relics-map'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Bản đồ di tích</span>
            </button>

            {/* NEW: Dedicated Verified Archive from user's provided dataset */}
            <button
              onClick={() => setSubTab('verified-archive')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border ${
                subTab === 'verified-archive'
                  ? 'bg-amber-900 text-amber-100 border-amber-950 shadow-sm'
                  : 'bg-amber-100/90 text-amber-950 border-amber-300 hover:bg-amber-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Hồ sơ tư liệu gốc (GD01–GD08)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: 8 CHẶNG LỊCH SỬ DÂN TỘC */}
      {subTab === 'flow' && (
        <HistoryFlowView
          onOpenAiWithPrompt={onOpenAiWithPrompt}
          onNavigateToQuiz={onNavigateToQuiz}
          onInspectImage={setInspectImage}
        />
      )}

      {/* SUB-TAB 2: TRIỀU ĐẠI & THÀNH TỰU VĂN HÓA (MỚI - TOÀN DIỆN KIẾN THỨC) */}
      {subTab === 'dynasties' && (
        <div className="space-y-8">
          {/* Toggle between Dynasties and Cultural Achievements */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border-2 border-[#e8d7be]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Chế độ xem chuyên đề:
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#faf3e8] p-1 rounded-xl border border-amber-300">
              <button
                onClick={() => setDynastyTab('dynasties')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  dynastyTab === 'dynasties'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-amber-950'
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>12 Triều đại & Thời kỳ (Từ Hùng Vương đến nay)</span>
              </button>

              <button
                onClick={() => setDynastyTab('achievements')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  dynastyTab === 'achievements'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-amber-950'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Thành tựu Văn hóa - Giáo dục - Khoa học</span>
              </button>
            </div>
          </div>

          {/* VIEW A: DYNASTIES CHRONOLOGY */}
          {dynastyTab === 'dynasties' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (4 cols): Dynasty Timeline Selector */}
              <div className="lg:col-span-4 bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#f0e2cd] text-xs font-bold text-[#451a03]">
                  <span className="flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-700" />
                    <span>Dòng chảy các triều đại ({VIETNAMESE_DYNASTIES.length})</span>
                  </span>
                  <span className="text-stone-500 font-normal">Niên biểu</span>
                </div>

                <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                  {VIETNAMESE_DYNASTIES.map((dyn, idx) => {
                    const isSelected = dyn.id === activeDynasty.id;
                    return (
                      <button
                        key={dyn.id}
                        onClick={() => setSelectedDynastyId(dyn.id)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-600 font-bold text-amber-950 shadow-xs'
                            : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-amber-50 hover:border-amber-300'
                        }`}
                      >
                        <div>
                          <div className="text-[11px] font-semibold text-amber-800">
                            {idx + 1}. {dyn.countryName}
                          </div>
                          <div className="font-bold text-sm text-[#451a03] mt-0.5 leading-snug">
                            {dyn.name}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            <span>{dyn.era}</span>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-amber-800 translate-x-1' : 'text-stone-400 group-hover:text-amber-700'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column (8 cols): Active Dynasty Detail Dossier */}
              <div className="lg:col-span-8 bg-white rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
                <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#f0e2cd]">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      Quốc hiệu: {activeDynasty.countryName}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
                      Kinh đô: {activeDynasty.capital}
                    </span>
                  </div>

                  <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sử liệu chính thống</span>
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03]">
                    {activeDynasty.name}
                  </h2>
                  <div className="text-sm font-bold text-amber-800 mt-1 flex items-center gap-2">
                    <span>Thời gian tồn tại: {activeDynasty.era}</span>
                    <span aria-hidden="true">·</span>
                    <span>Người sáng lập / Khai sơn: <strong>{activeDynasty.founder}</strong></span>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-xs uppercase tracking-wide text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>Những mốc son và thành tựu lịch sử tiêu biểu:</span>
                  </h4>
                  <div className="space-y-2">
                    {activeDynasty.keyHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#faf5ee] border border-[#ecdac2] text-xs sm:text-sm text-stone-800 flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historical Significance */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <h4 className="font-bold text-xs text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Ý nghĩa lịch sử đối với tiến trình dân tộc:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    {activeDynasty.historicalSignificance}
                  </p>
                </div>

                {/* Representative Figures & Primary Sources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                    <strong className="block text-stone-800 font-bold uppercase tracking-wider text-[11px]">
                      Nhân vật lịch sử tiêu biểu:
                    </strong>
                    <div className="flex flex-wrap gap-1.5">
                      {activeDynasty.representativeFigures.map((fig, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white border border-stone-300 text-stone-700 font-medium text-[11px]"
                        >
                          {fig}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                    <strong className="block text-stone-800 font-bold uppercase tracking-wider text-[11px]">
                      Nguồn tài liệu xác thực:
                    </strong>
                    <p className="text-stone-600 italic text-[11px] leading-relaxed">
                      {activeDynasty.primarySource}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#f0e2cd]">
                  <span className="text-[11px] text-stone-500">
                    Căn cứ chương trình GDPT 2018 môn Lịch sử và Địa lí
                  </span>

                  <button
                    onClick={() =>
                      onOpenAiWithPrompt(
                        `Hãy kể cho em nghe một câu chuyện lịch sử hào hùng thời ${activeDynasty.name} với ngôn ngữ dễ hiểu cho học sinh lớp 4-5.`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Hỏi Bạn Sử Nhí về triều đại này</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW B: CULTURAL & EDUCATIONAL & SCIENTIFIC ACHIEVEMENTS */}
          {dynastyTab === 'achievements' && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {['All', 'Giáo dục & Khoa cử', 'Pháp luật & Quản trị', 'Kỹ nghệ & Khảo cổ', 'Y học & Khoa học', 'Văn hóa & Di sản'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedAchievementCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${
                      selectedAchievementCategory === cat
                        ? 'bg-amber-800 text-white border-amber-800 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
                    }`}
                  >
                    {cat === 'All' ? 'Tất cả thành tựu' : cat}
                  </button>
                ))}
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAchievements.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-600 transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-100">
                        <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          {item.category}
                        </span>
                        <span className="text-stone-500 font-semibold">{item.era}</span>
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#451a03] group-hover:text-amber-900 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                        <strong className="block text-amber-900 font-bold uppercase text-[11px] tracking-wide">
                          Ý nghĩa văn hóa & đời sống:
                        </strong>
                        <p className="leading-relaxed">{item.significance}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-stone-500">
                        <span>Nhân vật: <strong>{item.historicalFigures.join(', ')}</strong></span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10.5px] text-stone-400 italic">
                          Nguồn: {item.sourceReference}
                        </span>

                        <button
                          onClick={() =>
                            onOpenAiWithPrompt(
                              `Hãy kể cho em nghe về thành tựu lịch sử "${item.title}" và giải thích vì sao thành tựu này lại quan trọng đối với dân tộc Việt Nam.`
                            )
                          }
                          className="text-amber-800 hover:text-amber-950 font-bold text-xs inline-flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Hỏi AI</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: DANH NHÂN ĐẤT VIỆT (VỚI HÌNH ẢNH XÁC THỰC & HỒ SƠ KIỂM ĐỊNH) */}
      {subTab === 'figures' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (4 cols): Figures List & Search Filter */}
          <div className="lg:col-span-4 bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0e2cd] text-xs font-bold text-[#451a03]">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-700" />
                <span>Danh nhân đất Việt ({filteredFigures.length})</span>
              </div>
              <span className="text-stone-500 font-normal">Lớp 4 - 5</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={figureSearch}
                onChange={(e) => setFigureSearch(e.target.value)}
                placeholder="Tìm danh nhân, quê quán, niên đại..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#faf8f5]"
              />
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredFigures.map((fig) => {
                const isSelected = fig.id === activeFigure.id;
                return (
                  <button
                    key={fig.id}
                    onClick={() => setSelectedFigureId(fig.id)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center gap-3 group ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-600 font-bold text-amber-950 shadow-xs ring-1 ring-amber-500'
                        : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-amber-50 hover:border-amber-300'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-200 border border-stone-300 relative shadow-2xs">
                      {fig.primaryImage?.url ? (
                        <img
                          src={fig.primaryImage.url}
                          alt={fig.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center -z-10 bg-amber-50 text-amber-800 font-bold text-[10px]">
                        {fig.name.slice(0, 2)}
                      </div>
                    </div>

                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="font-bold text-sm text-[#451a03] group-hover:text-amber-950 truncate">
                        {fig.name}
                      </div>
                      <div className="text-[11px] text-amber-800 font-medium truncate">
                        {fig.era}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">
                        {fig.origin}
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-amber-800 translate-x-1' : 'text-stone-400 group-hover:text-amber-700'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (8 cols): Active Figure Detail Dossier with Authentic Image Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#f0e2cd]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Thời kỳ: {activeFigure.era}
                </span>
                <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sử liệu kiểm chứng</span>
                </span>
              </div>

              {/* Speech Audio Narration Button */}
              <button
                onClick={handleToggleSpeech}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs ${
                  isSpeakingFigure
                    ? 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                }`}
                title="Nghe giọng đọc thuyết minh tiểu sử nhân vật"
              >
                {isSpeakingFigure ? (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-700" />
                    <span>Dừng giọng đọc</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>Nghe thuyết minh audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Figure Title & Origin */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03]">
                {activeFigure.name}
              </h2>
              <div className="text-sm font-bold text-amber-800 mt-1">{activeFigure.title}</div>
              <div className="text-xs text-stone-500 mt-1">
                Quê quán / Khởi phát: <strong>{activeFigure.origin}</strong>
              </div>
            </div>

            {/* AUTHENTIC HISTORICAL IMAGE CARD */}
            <div>
              <AuthenticImageCard
                image={activeFigure.primaryImage}
                fallbackTitle={activeFigure.name}
                fallbackCategory={activeFigure.title}
                aspectRatio="video"
                onInspectImage={(img) => setInspectImage(img)}
                showCaption={true}
              />
            </div>

            {/* Biography / Tiểu sử hào hùng */}
            {activeFigure.biography && (
              <div className="p-4 rounded-xl bg-[#faf6ee] border border-[#e8d7be] space-y-1.5">
                <h4 className="font-bold text-xs text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-800" />
                  <span>Tiểu sử & Cuộc đời hào hùng:</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif">
                  {activeFigure.biography}
                </p>
              </div>
            )}

            {/* Achievements / Chiến công vang dội */}
            {activeFigure.achievements && activeFigure.achievements.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                <h4 className="font-bold text-xs text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-800" />
                  <span>Chiến công & Dấu ấn lịch sử rực rỡ:</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeFigure.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-amber-200/60 text-xs text-stone-800">
                      <span className="w-5 h-5 rounded-full bg-amber-800 text-white font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Historical Anecdote / Giai thoại lịch sử */}
            {activeFigure.anecdote && (
              <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 space-y-1.5">
                <h4 className="font-bold text-xs text-orange-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-700" />
                  <span>Giai thoại lịch sử lưu truyền:</span>
                </h4>
                <p className="text-xs sm:text-sm text-orange-950 leading-relaxed italic">
                  "{activeFigure.anecdote}"
                </p>
              </div>
            )}

            {/* Contribution / Công lao to lớn */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
              <h4 className="font-bold text-xs text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-700" />
                <span>Công lao to lớn đối với non sông đất nước:</span>
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                {activeFigure.contribution}
              </p>
            </div>

            {/* Memorable Quote */}
            {activeFigure.memorableQuote && (
              <div className="p-4 rounded-xl bg-[#faf3e6] border-l-4 border-amber-700 text-xs sm:text-sm text-[#451a03] font-medium leading-relaxed italic relative">
                <Quote className="w-5 h-5 text-amber-600/40 absolute top-2 right-2 pointer-events-none" />
                "{activeFigure.memorableQuote}"
              </div>
            )}

            {/* Reflection Question for Elementary Students */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1 text-xs sm:text-sm">
              <strong className="block text-teal-950 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-teal-700" />
                <span>Câu hỏi để em tự suy ngẫm (Năng lực lịch sử):</span>
              </strong>
              <p className="text-teal-900 leading-relaxed">{activeFigure.reflectionQuestion}</p>
            </div>

            {/* Source References */}
            {activeFigure.sourceReferences && activeFigure.sourceReferences.length > 0 && (
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                <strong className="block text-stone-800 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                  <span>Tài liệu tham khảo và nguồn sử liệu xác thực:</span>
                </strong>
                <ul className="list-disc list-inside space-y-0.5 text-stone-600 text-[11.5px]">
                  {activeFigure.sourceReferences.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0e2cd]">
              <span className="text-[11px] text-stone-500">
                Xác thực lần cuối: {activeFigure.lastVerifiedDate || '2026'}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onNavigateToQuiz(activeFigure.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors shadow-2xs"
                >
                  <Award className="w-4 h-4 text-amber-800" />
                  <span>Đố vui về nhân vật này</span>
                </button>

                <button
                  onClick={() =>
                    onOpenAiWithPrompt(
                      `Kể cho em một mẩu chuyện cảm động về nhân vật lịch sử ${activeFigure.name} dành cho học sinh tiểu học lớp 4-5.`
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Hỏi Bạn Sử Nhí về {activeFigure.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: HUYỀN THOẠI ĐẤT VIỆT */}
      {subTab === 'legends' && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-1">
                Phương pháp Thám tử Lịch sử: Phân biệt Sự thật & Truyền thuyết
              </strong>
              "Truyền thuyết phản ánh khát vọng trị thủy, tinh thần chống ngoại xâm và ý thức cội nguồn đoàn kết muôn người của tổ tiên xưa. Chúng ta yêu quý truyền thuyết như những viên ngọc văn hóa dân gian, đồng thời học cách nhận biết cốt lõi lịch sử có thật đằng sau những chi tiết tưởng tượng kì ảo."
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LEGEND_STORIES.map((leg) => (
              <div
                key={leg.id}
                className="bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-amber-600 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                    <span className="font-bold text-amber-800">{leg.period}</span>
                    <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                      Truyền thuyết dân gian
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-[#451a03]">
                      {leg.title}
                    </h3>
                    <div className="text-xs text-stone-600 mt-1">
                      Nhân vật trung tâm: <strong>{leg.associatedHero}</strong>
                    </div>
                  </div>

                  {/* Authentic Illustration Image Card */}
                  <AuthenticImageCard
                    image={leg.primaryImage}
                    fallbackTitle={leg.title}
                    fallbackCategory="Tranh minh họa truyền thuyết"
                    aspectRatio="video"
                    onInspectImage={(img) => setInspectImage(img)}
                    showCaption={true}
                  />

                  <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                    {leg.storySummary}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-100 text-xs">
                  {/* Two boxes: Historical Core vs Symbolism */}
                  <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-950">
                    <strong className="block text-[11px] uppercase tracking-wide text-teal-800 mb-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Cốt lõi lịch sử có thật:</span>
                    </strong>
                    <span>{leg.historicalCore}</span>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                    <strong className="block text-[11px] uppercase tracking-wide text-amber-800 mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Ý nghĩa biểu tượng dân gian:</span>
                    </strong>
                    <span>{leg.symbolism}</span>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 italic">
                      Nguồn: {leg.sourceReferences ? leg.sourceReferences[0] : 'Văn học dân gian'}
                    </span>

                    <button
                      onClick={() =>
                        onOpenAiWithPrompt(
                          `Hãy giúp em phân tích truyện "${leg.title}" theo phương pháp Thám tử sử liệu (cốt lõi lịch sử là gì, biểu tượng dân gian là gì?).`
                        )
                      }
                      className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Hỏi Bạn Sử Nhí phân tích sâu</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: BẢO VẬT KỂ CHUYỆN (BẢO VẬT QUỐC GIA) */}
      {subTab === 'artifacts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NATIONAL_ARTIFACTS.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-600 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                  <span className="font-bold text-amber-800">{art.era}</span>
                  <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-amber-300">
                    Bảo vật Quốc gia
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#451a03]">
                    {art.name}
                  </h3>
                  <div className="text-xs text-stone-600 mt-1">
                    Chất liệu chế tác: <strong>{art.material}</strong>
                  </div>
                </div>

                {/* Museum Artifact Image Card */}
                <AuthenticImageCard
                  image={art.primaryImage}
                  fallbackTitle={art.name}
                  fallbackCategory="Hiện vật bảo tàng quốc gia"
                  aspectRatio="video"
                  onInspectImage={(img) => setInspectImage(img)}
                  showCaption={true}
                />

                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <strong className="block text-amber-900 font-bold">Ý nghĩa lịch sử thiêng liêng:</strong>
                  <p className="leading-relaxed">{art.historicalSignificance}</p>
                </div>

                <div className="text-xs text-stone-600 space-y-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <strong className="block text-stone-800 font-bold">Câu chuyện phát hiện khảo cổ:</strong>
                  <p className="leading-relaxed">{art.discoveryStory}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Nơi lưu giữ: <strong className="text-stone-800">{art.locationPreserved}</strong></span>
                <button
                  onClick={() =>
                    onOpenAiWithPrompt(
                      `Hãy kể cho em nghe câu chuyện về hiện vật Bảo vật quốc gia: "${art.name}"!`
                    )
                  }
                  className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Hỏi AI về hiện vật</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 6: KHO HÌNH ẢNH MINH HỌA LỊCH SỬ & TRANH TƯ LIỆU */}
      {subTab === 'illustrations' && (
        <HistoryIllustrationsView
          currentUser={currentUser}
          onOpenAiWithPrompt={onOpenAiWithPrompt}
        />
      )}

      {/* SUB-TAB 7: BẢN ĐỒ DI TÍCH NON SÔNG */}
      {subTab === 'relics-map' && (
        <RelicsMapView
          onOpenAiWithPrompt={onOpenAiWithPrompt}
          onUnlockStamp={onUnlockStamp}
        />
      )}

      {/* SUB-TAB 7: HỒ SƠ TƯ LIỆU GỐC & NGUỒN CHUẨN (GD01 - GD08) */}
      {subTab === 'verified-archive' && (
        <VerifiedHistoryArchiveView
          onOpenAiWithPrompt={onOpenAiWithPrompt}
        />
      )}
    </div>
  );
};
