import React from 'react';
import {
  BanSuNhiAvatar,
  DongSonDrumSVG,
  DongSonStar,
  ChimLacSVG,
  DongSonBorderBand
} from './DongSonMotif';
import { BookOpen, ShieldCheck, Heart, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#240e03] text-[#f7eada] border-t-2 border-[#7c3d12] mt-20 relative overflow-hidden">
      {/* Decorative Đông Sơn horizontal band at top of footer */}
      <div className="w-full bg-[#351606] border-b border-[#4d2008]">
        <DongSonBorderBand className="text-amber-500/25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#4d2008]">
          {/* Col 1: Brand & Pedagogical Mission (5 cols) */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-3">
              <BanSuNhiAvatar size={44} />
              <div>
                <span className="font-display text-xl font-bold text-amber-200 block">
                  Dấu Ấn Non Sông
                </span>
                <span className="text-xs text-amber-300/80 block font-semibold">
                  Hành trình khám phá lịch sử Việt Nam cùng AI
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-100/80 leading-relaxed max-w-sm pt-1">
              Website giáo dục lịch sử số dành cho học sinh tiểu học lớp 4, 5 bám sát Chương trình GDPT 2018 (bộ sách Kết nối tri thức với cuộc sống).
            </p>

            <div className="text-xs text-amber-400 italic pt-1 flex items-center gap-2">
              <ChimLacSVG size={20} className="text-amber-400 shrink-0" />
              <span>"Hiểu Sử Việt – Trân trọng quá khứ – Yêu Tổ quốc bằng việc làm hôm nay."</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <DongSonStar size={14} className="text-amber-400" />
              <span>Chuyên mục chính</span>
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/75 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-200 transition-colors">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lectures')} className="hover:text-amber-200 transition-colors">
                  Bài giảng điện tử SGK
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz-games')} className="hover:text-amber-200 transition-colors">
                  Game trắc nghiệm & Thám tử
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history-movies')} className="hover:text-amber-200 transition-colors">
                  Phim lịch sử chọn lọc
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history-info')} className="hover:text-amber-200 transition-colors">
                  Thông tin lịch sử & Di tích
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-assistant')} className="hover:text-amber-200 transition-colors">
                  Trợ lý Bạn Sử Nhí AI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cultural Heritage & Standards (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-amber-400" />
              <span>Mỹ thuật & Bản sắc Dân tộc</span>
            </h4>
            <div className="space-y-2 text-xs text-amber-100/80 leading-relaxed">
              <p>
                Họa tiết <strong>Trống đồng Đông Sơn</strong> là chất liệu mỹ thuật chủ đạo được cách điệu mềm mại, hiện đại, gần gũi với thiếu nhi.
              </p>
              <div className="p-3 bg-[#381605] rounded-xl border border-[#5c2809] flex items-center gap-3">
                <DongSonDrumSVG size={44} className="text-amber-400 shrink-0" />
                <div className="text-[11px] text-amber-200/80">
                  Ngôi sao 14 cánh · Chim Lạc tung cánh · Vòng tròn đồng tâm · Hoa văn hình học cổ
                </div>
              </div>
              <p className="text-[11px] text-amber-300/70">
                Tư liệu đối chiếu Bảo tàng Lịch sử quốc gia & SGK GDPT 2018.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative thin Dong Son motif strip */}
        <div className="py-3 flex items-center justify-center gap-4 text-amber-500/30">
          <DongSonStar size={14} />
          <div className="h-px w-24 bg-amber-700/30" />
          <DongSonStar size={14} />
          <div className="h-px w-24 bg-amber-700/30" />
          <DongSonStar size={14} />
        </div>

        {/* MANDATORY COPYRIGHT SECTION - EXACT REQUIREMENT:
            - Displayed ONLY at the end of the website (Footer)
            - Centered text
            - Font Arial, Unicode Vietnamese, sharp and clear
            - Harmonious golden-bronze color
            - Exact punctuation and casing: "Bản quyền thuộc về cô giáo: Phạm Thị Thanh"
        */}
        <div
          style={{ fontFamily: 'Arial, sans-serif' }}
          className="text-center font-bold text-sm sm:text-base tracking-wide text-[#e8c79c] pt-1 pb-4 select-text"
        >
          Bản quyền thuộc về cô giáo: Phạm Thị Thanh + Thái Hồng Vân
        </div>
      </div>
    </footer>
  );
};
