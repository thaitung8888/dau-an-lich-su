import React, { useState, useEffect } from 'react';
import { HISTORICAL_PERIODS } from '../../data/historyData';
import {
  Crown,
  ShieldAlert,
  Building2,
  Flag,
  Medal,
  Award,
  Sparkles,
  MapPin,
  Users,
  Box,
  ChevronRight,
  Info,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  ZoomIn,
  Camera,
  Landmark,
  Palette,
  ShieldCheck
} from 'lucide-react';
import { DongSonDrumSVG, DongSonStar, DongSonCorner } from '../DongSonMotif';
import { HistoricalImage } from '../../types';

interface HistoryFlowViewProps {
  initialPeriodId?: string;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
  onNavigateToQuiz: (periodId: string) => void;
  onInspectImage?: (img: HistoricalImage) => void;
}

export const HistoryFlowView: React.FC<HistoryFlowViewProps> = ({
  initialPeriodId,
  onOpenAiWithPrompt,
  onNavigateToQuiz,
  onInspectImage
}) => {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(
    initialPeriodId || HISTORICAL_PERIODS[0].id
  );
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number>(0);
  const [imgLoadError, setImgLoadError] = useState<boolean>(false);

  // Reset selected gallery thumbnail and image error when period changes
  useEffect(() => {
    setSelectedGalleryIndex(0);
    setImgLoadError(false);
  }, [selectedPeriodId]);

  const activePeriod =
    HISTORICAL_PERIODS.find((p) => p.id === selectedPeriodId) || HISTORICAL_PERIODS[0];

  const getPeriodIcon = (num: number) => {
    switch (num) {
      case 1: return <Crown className="w-5 h-5 text-amber-700" />;
      case 2: return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 3: return <Building2 className="w-5 h-5 text-blue-700" />;
      case 4: return <Flag className="w-5 h-5 text-emerald-700" />;
      case 5: return <Medal className="w-5 h-5 text-cyan-700" />;
      case 6: return <Award className="w-5 h-5 text-orange-700" />;
      case 7: return <Building2 className="w-5 h-5 text-violet-700" />;
      case 8: return <Sparkles className="w-5 h-5 text-amber-700" />;
      default: return <Sparkles className="w-5 h-5 text-amber-700" />;
    }
  };

  // Determine current active visual illustration for this period
  const galleryList = activePeriod.gallery && activePeriod.gallery.length > 0
    ? activePeriod.gallery
    : [
        {
          url: activePeriod.imageUrl || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
          title: activePeriod.title,
          caption: activePeriod.imageCaption || activePeriod.shortDesc,
          typeLabel: 'Tư liệu lịch sử'
        }
      ];

  const currentVisual = galleryList[selectedGalleryIndex] || galleryList[0];

  const handleOpenDetailImage = () => {
    if (onInspectImage && currentVisual) {
      onInspectImage({
        id: `period-${activePeriod.number}-${selectedGalleryIndex}`,
        title: currentVisual.title,
        url: currentVisual.url,
        type: 'illustration',
        typeLabel: currentVisual.typeLabel || 'Tư liệu lịch sử',
        caption: currentVisual.caption,
        authorOrProvider: 'Bộ tư liệu Dấu Ấn Non Sông',
        sourceName: 'Chương trình GDPT 2018 Lịch sử Lớp 4-5',
        license: 'Tư liệu giáo dục mở'
      });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header of Section with Dong Son accents */}
      <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/20" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <DongSonStar size={16} className="text-amber-700" />
            <span>Cánh cổng thời gian</span>
            <span aria-hidden="true" className="text-amber-400">·</span>
            <span className="text-stone-600 font-semibold">8 Giai đoạn Lịch sử Dân tộc (GD01 – GD08)</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1.5">
            Dòng Chảy Sử Việt Ngàn Năm
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 mt-2 leading-relaxed">
            Chọn một chặng lịch sử để khám phá trọn vẹn: tranh ảnh minh họa sống động, hiện vật bảo tàng, mốc son chói lọi, danh nhân kiệt xuất và bảo vật quốc gia được kiểm chứng chuẩn mực.
          </p>
        </div>

        {/* Horizontal Timeline Bar Selector (8 Periods) */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {HISTORICAL_PERIODS.map((period) => {
            const isSelected = period.id === activePeriod.id;
            return (
              <button
                key={period.id}
                onClick={() => setSelectedPeriodId(period.id)}
                className={`whitespace-nowrap shrink-0 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 shadow-2xs ${
                  isSelected
                    ? 'bg-amber-800 text-white border-amber-900 shadow-sm ring-2 ring-amber-500/40'
                    : 'bg-[#faf4e8] hover:bg-amber-100/80 text-amber-950 border-[#e5d2b7]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10.5px]">
                  {period.number}
                </span>
                <span className="truncate max-w-[140px] sm:max-w-none">{period.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Period Detail Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Main Content, Visual Showcase & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Hero Card for Current Period */}
          <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs">
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center border border-amber-200">
                    {getPeriodIcon(activePeriod.number)}
                  </div>
                  <span>Chặng số {activePeriod.number}</span>
                  <span aria-hidden="true" className="text-amber-400">·</span>
                  <span className="text-stone-600 font-semibold">{activePeriod.timeSpan}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03]">
                  {activePeriod.title}
                </h2>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {activePeriod.shortDesc}
                </p>
              </div>

              <div className="hidden sm:block opacity-20 text-amber-900 shrink-0">
                <DongSonDrumSVG size={90} />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold text-[#451a03] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <DongSonStar size={14} className="text-amber-700" />
                <span>Bối cảnh lịch sử</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activePeriod.context}
              </p>
            </div>
          </div>

          {/* 2. CHUYÊN ĐỀ HÌNH ẢNH MINH HỌA & DI TÍCH XÁC THỰC CỦA GIAI ĐOẠN NÀY (NEW & HIGH-IMPACT) */}
          <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#eedec7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-amber-800" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#451a03]">
                    Tranh Ảnh & Tư Liệu Minh Họa Chặng {activePeriod.number}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Hình ảnh được tuyển chọn & xác thực theo từng thời kỳ lịch sử
                  </p>
                </div>
              </div>

              {onInspectImage && (
                <button
                  onClick={handleOpenDetailImage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-amber-800" />
                  <span>Xem ảnh kích thước lớn</span>
                </button>
              )}
            </div>

            {/* Main Featured Showcase Image with warm, pleasant backdrop (NEVER black) */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border-2 border-[#d6be9e] bg-gradient-to-br from-[#faf4e8] via-[#f5ebdb] to-[#ede0c9] shadow-inner group">
              <img
                src={imgLoadError ? '/src/assets/images/dong_son_drum_1792643655430.jpg' : currentVisual.url}
                alt={currentVisual.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImgLoadError(true)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Top floating badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-800/90 text-amber-100 backdrop-blur-md border border-amber-400/40 shadow-xs">
                  <Palette className="w-3.5 h-3.5" />
                  <span>{currentVisual.typeLabel || 'Tư liệu lịch sử'}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-amber-200 backdrop-blur-md border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sử liệu GDPT 2018</span>
                </span>
              </div>

              {/* Bottom text overlay on image */}
              <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                <div className="font-display text-base sm:text-lg font-bold drop-shadow-md text-amber-100">
                  {currentVisual.title}
                </div>
                <div className="text-xs text-stone-200 line-clamp-2 leading-relaxed drop-shadow">
                  {currentVisual.caption}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery Switcher if multiple images are available for this period */}
            {galleryList.length > 1 && (
              <div className="pt-2">
                <div className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-amber-700" />
                  <span>Chọn góc nhìn tư liệu khác của giai đoạn ({galleryList.length} ảnh):</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {galleryList.map((item, idx) => {
                    const isSelected = idx === selectedGalleryIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedGalleryIndex(idx)}
                        className={`text-left p-2 rounded-xl border-2 transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-amber-100 border-amber-600 shadow-xs ring-2 ring-amber-500/30'
                            : 'bg-[#faf4e8] hover:bg-amber-50 border-[#e4d1b8]'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-200 border border-amber-300">
                          <img
                            src={item.url}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/src/assets/images/dong_son_drum_1792643655430.jpg';
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-[#451a03] truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-amber-800 font-medium truncate">
                            {item.typeLabel || 'Tư liệu ảnh'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Assistant Context Query on this visual illustration */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 bg-[#faf4e8] p-3 rounded-xl border border-[#e8d7be]">
              <span className="text-xs text-stone-700">
                Muốn tìm hiểu sâu hơn về ý nghĩa của hình ảnh tư liệu này?
              </span>
              <button
                onClick={() =>
                  onOpenAiWithPrompt(
                    `Hãy kể cho em nghe về bối cảnh, ý nghĩa và câu chuyện lịch sử gắn liền với bức tranh/tư liệu "${currentVisual.title}" trong ${activePeriod.title}.`,
                    { periodId: activePeriod.id }
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Hỏi Bạn Sử Nhí về ảnh này</span>
              </button>
            </div>
          </div>

          {/* 3. Key Events Timeline for this Period */}
          <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <div>
                <h3 className="font-display text-lg font-bold text-[#451a03]">
                  Các sự kiện và mốc son tiêu biểu
                </h3>
                <p className="text-xs text-stone-500">
                  Tiến trình niên biểu được ghi chép qua các sử liệu chính thống
                </p>
              </div>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                {activePeriod.keyEvents.length} mốc đã kiểm chứng
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-300">
              {activePeriod.keyEvents.map((evt, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node dot */}
                  <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-amber-700 shadow-2xs" />

                  <div className="p-4 rounded-xl bg-[#faf5eb] border border-[#e4d1b8] hover:border-amber-500 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-amber-950 bg-white px-2.5 py-0.5 rounded-md border border-amber-300 shadow-2xs">
                        {evt.year}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-red-600" />
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-base text-[#451a03] mt-2">
                      {evt.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
                      <span className="text-emerald-800 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Lớp sự thật: Sử liệu chứng minh
                      </span>
                      <button
                        onClick={() =>
                          onOpenAiWithPrompt(
                            `Hãy giải thích chi tiết mốc sự kiện "${evt.title}" (${evt.year}) cho học sinh tiểu học hiểu rõ bối cảnh và ý nghĩa.`,
                            { periodId: activePeriod.id }
                          )
                        }
                        className="text-amber-800 hover:text-amber-950 font-bold inline-flex items-center gap-1 text-xs"
                      >
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Hỏi Bạn Sử Nhí</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Meaning & Core Significance */}
          <div className="bg-[#faf4e8] rounded-2xl border-2 border-[#e2cfb4] p-6 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                <Info className="w-5 h-5 text-amber-800" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#451a03] uppercase tracking-wide">
                  Ý nghĩa lịch sử cốt lõi
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {activePeriod.meaning}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Figures, Relics, Artifacts, Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick AI Tutor Card for this Period */}
          <div className="bg-gradient-to-br from-[#451a03] to-[#2e1305] text-white rounded-2xl p-6 shadow-xs space-y-4 border-2 border-amber-900/60 relative overflow-hidden">
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-500/20" />

            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="font-display text-base font-bold text-amber-100">
                Bạn Sử Nhí AI sẵn sàng
              </h4>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed">
              Bạn có thắc mắc gì về <strong>{activePeriod.title}</strong> không? Bạn Sử Nhí sẽ giải thích kèm theo nguồn dẫn chứng từ sách giáo khoa!
            </p>
            <div className="space-y-2">
              <button
                onClick={() =>
                  onOpenAiWithPrompt(
                    `Kể cho em một câu chuyện truyền cảm về một nhân vật kiệt xuất trong ${activePeriod.title}.`,
                    { periodId: activePeriod.id }
                  )
                }
                className="w-full text-left text-xs bg-white/10 hover:bg-white/20 p-2.5 rounded-lg border border-white/20 transition-colors"
              >
                📖 "Kể chuyện về nhân vật tiêu biểu chặng này"
              </button>
              <button
                onClick={() =>
                  onOpenAiWithPrompt(
                    `Nêu 3 bài học quý báu nhất mà thế hệ học sinh chúng em học được từ ${activePeriod.title}.`,
                    { periodId: activePeriod.id }
                  )
                }
                className="w-full text-left text-xs bg-white/10 hover:bg-white/20 p-2.5 rounded-lg border border-white/20 transition-colors"
              >
                💡 "3 bài học quý báu cho học sinh hôm nay"
              </button>
            </div>
          </div>

          {/* Famous Figures in this Period */}
          <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#451a03] font-bold text-sm">
              <Users className="w-4 h-4 text-amber-700" />
              <span>Danh nhân tiêu biểu</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activePeriod.famousFigures.map((fig, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-950 text-xs font-semibold border border-amber-200"
                >
                  {fig}
                </span>
              ))}
            </div>
          </div>

          {/* Relic Sites */}
          <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#451a03] font-bold text-sm">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Di tích gắn liền</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700">
              {activePeriod.relicSites.map((site, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">·</span>
                  <span>{site}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Artifacts */}
          <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#451a03] font-bold text-sm">
              <Box className="w-4 h-4 text-amber-700" />
              <span>Bảo vật khảo cổ</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700">
              {activePeriod.artifacts.map((art, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">·</span>
                  <span>{art}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Challenge CTA */}
          <div className="bg-[#faf4e8] rounded-2xl border-2 border-[#e0cbaf] p-5 text-center space-y-3">
            <h5 className="font-bold text-xs text-amber-950 uppercase tracking-wide">
              Kiểm tra hiểu biết chặng này
            </h5>
            <p className="text-xs text-stone-600">
              Cùng làm thử thách trắc nghiệm nhanh để tích lũy điểm và mở khóa tem mộc số!
            </p>
            <button
              onClick={() => onNavigateToQuiz(activePeriod.id)}
              className="w-full py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Làm thử thách ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
