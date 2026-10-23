import React from 'react';
import {
  BanSuNhiAvatar,
  ChibiStudentIcon,
  DongSonDrumSVG,
  DongSonStar,
  ChimLacSVG,
  DongSonBorderBand
} from './DongSonMotif';
import { Compass, Sparkles, BookOpen, Shield, MapPin } from 'lucide-react';

interface BannerProps {
  onStartJourney: () => void;
  onOpenAiChat: () => void;
}

export const Banner: React.FC<BannerProps> = ({ onStartJourney, onOpenAiChat }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      {/* 1280x250 px responsive container with warm golden-bronze / ivory theme */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#fefbf6] via-[#faf4e8] to-[#f5ecda] border-2 border-[#e6d2b5] shadow-xs min-h-[250px] flex flex-col justify-between p-6 sm:p-8">
        {/* Subtle Đông Sơn drum watermark on right side */}
        <div className="absolute -right-12 -bottom-16 opacity-15 pointer-events-none text-amber-900">
          <DongSonDrumSVG size={320} />
        </div>

        {/* Flying Chim Lạc watermark in background */}
        <div className="absolute right-64 top-4 opacity-15 pointer-events-none text-amber-800">
          <ChimLacSVG size={130} />
        </div>
        <div className="absolute right-96 top-16 opacity-10 pointer-events-none text-amber-800">
          <ChimLacSVG size={90} />
        </div>

        {/* Top bar within banner: Curriculum note & Star insignia */}
        <div className="flex flex-wrap items-center justify-between gap-2 z-10 text-xs font-semibold text-[#5c2606]">
          <div className="flex items-center gap-2">
            <DongSonStar size={18} className="text-amber-700" />
            <span className="text-amber-900 font-bold uppercase tracking-wide">
              Chương trình GDPT 2018 · Lớp 4–5
            </span>
            <span aria-hidden="true" className="text-amber-400">·</span>
            <span className="text-teal-900 font-medium bg-teal-100/80 px-2 py-0.5 rounded-sm">
              Bộ sách Kết nối tri thức với cuộc sống
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 text-xs">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Non sông gấm vóc liền một dải</span>
          </div>
        </div>

        {/* Central Content */}
        <div className="relative z-10 my-auto py-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            {/* Title with authentic Vietnamese cultural typography */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#451a03] tracking-tight leading-tight">
              DẤU ẤN NON SÔNG
            </h1>
            <p className="text-base sm:text-lg font-bold text-amber-800 flex items-center gap-2">
              <span>Hành trình khám phá lịch sử Việt Nam cùng AI</span>
              <ChimLacSVG size={28} className="text-amber-700 inline-block" />
            </p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl">
              Không gian số trực quan kết hợp 7 chặng dòng chảy thời gian, bản đồ di tích, bài giảng điện tử, game trắc nghiệm, phim lịch sử và trợ lí <strong>Bạn Sử Nhí AI</strong> dẫn nguồn chuẩn mực.
            </p>
          </div>

          {/* Characters and Action Callouts */}
          <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
            {/* Friendly Mascot and Chibi Student icons */}
            <div className="flex items-center gap-3 bg-white/80 p-2.5 rounded-2xl border border-[#e8d7be] shadow-2xs">
              <div className="flex items-center gap-2">
                <BanSuNhiAvatar size={46} />
                <div className="text-left">
                  <div className="text-xs font-bold text-[#451a03]">Bạn Sử Nhí AI</div>
                  <div className="text-[11px] text-amber-800 font-medium">Bạn đồng hành</div>
                </div>
              </div>
              <div className="h-8 w-px bg-amber-200" />
              <div className="flex items-center gap-2">
                <ChibiStudentIcon size={46} />
                <div className="text-left">
                  <div className="text-xs font-bold text-teal-900">Em yêu Sử Việt</div>
                  <div className="text-[11px] text-teal-700 font-medium">Học sinh lớp 4–5</div>
                </div>
              </div>
            </div>

            {/* Action Buttons with high-contrast, rounded warm style */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onStartJourney}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:shadow-md"
              >
                <Compass className="w-4 h-4" />
                <span>Bắt đầu khám phá</span>
              </button>

              <button
                onClick={onOpenAiChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Hỏi Bạn Sử Nhí AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom band in Banner */}
        <div className="relative z-10 pt-3 border-t border-[#e2d0b8] flex flex-wrap items-center justify-between gap-y-1.5 text-xs text-stone-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-amber-900">
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Họa tiết Trống đồng Đông Sơn chủ đạo</span>
            </span>
            <span aria-hidden="true" className="text-amber-400">·</span>
            <span className="flex items-center gap-1.5 font-medium text-teal-900">
              <BookOpen className="w-3.5 h-3.5 text-teal-700" />
              <span>Tư liệu đối chiếu chuẩn xác</span>
            </span>
          </div>

          <div className="text-amber-900 text-xs font-semibold">
            Dành cho học sinh Lớp 4 – Lớp 5
          </div>
        </div>
      </div>
    </div>
  );
};
