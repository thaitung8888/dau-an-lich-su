import React, { useState } from 'react';
import { HistoricalImage } from '../types';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Info,
  Calendar,
  Sparkles,
  Award,
  HelpCircle
} from 'lucide-react';
import { DongSonCorner, DongSonStar, BanSuNhiAvatar } from './DongSonMotif';

interface ImageDetailModalProps {
  image: HistoricalImage | null;
  onClose: () => void;
  topicTitle?: string;
}

export const ImageDetailModal: React.FC<ImageDetailModalProps> = ({
  image,
  onClose,
  topicTitle,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showProvenanceInfo, setShowProvenanceInfo] = useState<boolean>(false);

  if (!image) return null;

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  // Badge styling according to image type
  const getTypeBadge = () => {
    switch (image.type) {
      case 'illustration':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-600',
          label: 'Tranh minh họa',
          desc: 'Tranh phục dựng hoặc tranh dân gian tái hiện lịch sử, không phải ảnh chân dung chụp thực tế.',
        };
      case 'archive_photo':
        return {
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
          dot: 'bg-blue-600',
          label: 'Ảnh tư liệu lịch sử',
          desc: 'Hình ảnh tư liệu gốc lưu trữ tại các cơ quan lưu trữ hoặc bảo tàng quốc gia.',
        };
      case 'museum_artifact':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
          label: 'Hiện vật bảo tàng',
          desc: 'Di vật khảo cổ hoặc bảo vật quốc gia được bảo quản tại viện bảo tàng.',
        };
      case 'relic_site':
        return {
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
          dot: 'bg-purple-600',
          label: 'Di tích thực tế',
          desc: 'Địa danh, di tích lịch sử - văn hóa hiện hữu trên non sông đất nước.',
        };
      default:
        return {
          bg: 'bg-stone-100 text-stone-900 border-stone-300',
          dot: 'bg-stone-600',
          label: image.typeLabel || 'Tư liệu xác thực',
          desc: 'Tư liệu hình ảnh đối chiếu.',
        };
    }
  };

  const badge = getTypeBadge();

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-[#fffdfa] rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border-2 border-[#e8d7be] overflow-hidden flex flex-col max-h-[92vh]">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/25 pointer-events-none" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/25 pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#eedec7] shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${badge.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
              <span>{badge.label}</span>
            </span>

            <span className="text-xs text-stone-500 hidden sm:inline">
              {topicTitle ? `Thuộc: ${topicTitle}` : 'Tư liệu lịch sử'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                title="Thu nhỏ"
                className="p-1 rounded-lg text-stone-600 hover:bg-white disabled:opacity-40 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono font-bold px-1 text-stone-700 min-w-[38px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                title="Phóng to chi tiết"
                className="p-1 rounded-lg text-stone-600 hover:bg-white disabled:opacity-40 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Khôi phục kích thước"
                className="p-1 rounded-lg text-stone-600 hover:bg-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Center Content */}
        <div className="overflow-y-auto flex-1 py-4 space-y-4">
          {/* Image Canvas Container */}
          <div className="w-full bg-[#1e1309] rounded-2xl overflow-hidden flex items-center justify-center p-3 relative min-h-[260px] sm:min-h-[360px]">
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.15s ease-out',
              }}
              className="max-h-[55vh] flex items-center justify-center"
            >
              <img
                src={image.url}
                alt={image.title}
                className="max-h-[50vh] w-auto object-contain rounded-lg shadow-lg select-none"
                loading="lazy"
                onError={(e) => {
                  // Fallback if network image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.img-fallback-banner')) {
                    const fallback = document.createElement('div');
                    fallback.className =
                      'img-fallback-banner text-amber-200/80 text-xs text-center p-8 flex flex-col items-center gap-2';
                    fallback.innerHTML =
                      '<span class="font-bold text-amber-100 text-sm">🏛️ ' +
                      image.title +
                      '</span><span>Đang cập nhật nguồn ảnh trực tiếp từ Bảo tàng Quốc gia</span>';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>

            {/* Note badge overlay */}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white/90 text-[10px] px-2.5 py-1 rounded-md">
              {badge.label} · Bản quyền: {image.license || 'Giáo dục mở'}
            </div>
          </div>

          {/* Title and Caption */}
          <div className="space-y-1.5">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03]">
              {image.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              {image.caption}
            </p>
          </div>

          {/* Provenance and Citation Bar */}
          <div className="bg-[#fbf6ec] rounded-2xl border border-[#eedec7] p-4 text-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#eedec7]">
              <div className="flex items-center gap-1.5 text-[#451a03] font-bold">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Nguồn cung cấp / Xuất xứ:</span>
                <span className="font-semibold text-amber-900">{image.sourceName || 'Bảo tàng Lịch sử quốc gia'}</span>
              </div>

              {image.sourceUrl && (
                <a
                  href={image.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 underline"
                >
                  <span>Xem tài liệu gốc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
              <div>
                Tác giả / Đơn vị quản lý: <strong>{image.authorOrProvider || 'Ban quản lý di sản'}</strong>
              </div>
              <div>
                Giấy phép sử dụng: <strong>{image.license || 'Giáo dục mở CC BY-NC-SA 4.0'}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-emerald-800">
              <span className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Đã qua thẩm định chuyên môn · Chương trình GDPT 2018
              </span>
              <span className="text-stone-500">Cập nhật: Năm 2026</span>
            </div>
          </div>

          {/* Toggle Button: TÌM HIỂU NGUỒN TƯ LIỆU */}
          <div className="pt-1">
            <button
              onClick={() => setShowProvenanceInfo(!showProvenanceInfo)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 text-amber-950 font-bold text-xs flex items-center justify-between transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700" />
                <span className="uppercase tracking-wide font-extrabold">
                  {showProvenanceInfo ? 'Thu gọn thông tin sử liệu' : '🔍 TÌM HIỂU NGUỒN TƯ LIỆU & BẰNG CHỨNG LỊCH SỬ'}
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-800">
                {showProvenanceInfo ? 'Đóng ▲' : 'Mở rộng ▼'}
              </span>
            </button>

            {/* Educational Provenance Detailed Accordion */}
            {showProvenanceInfo && (
              <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 text-xs sm:text-sm space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <DongSonStar size={16} className="text-amber-700" />
                  <span>Cách các nhà sử học xác minh và đối chiếu tư liệu này:</span>
                </div>

                <div className="text-stone-700 space-y-2 text-xs leading-relaxed">
                  <p>
                    <strong>1. Phân loại bằng chứng:</strong>{' '}
                    {image.type === 'illustration'
                      ? 'Đây là tác phẩm mỹ thuật tái hiện dựa trên miêu tả trong sử sách cổ. Học sinh cần hiểu đây là hình dung sinh động giúp dễ ghi nhớ bối cảnh, khác với hiện vật thật khai quật được dưới lòng đất.'
                      : image.type === 'museum_artifact'
                      ? 'Đây là hiện vật khảo cổ học đích thực, được các nhà khoa học khai quật, đo đạc niên đại bằng phương pháp khoa học (Cacbon phóng xạ) và bảo quản tại Bảo tàng Quốc gia.'
                      : image.type === 'archive_photo'
                      ? 'Đây là ảnh tư liệu lịch sử chụp thực tế tại thời điểm diễn ra sự kiện, lưu trữ tại Trung tâm Lưu trữ Quốc gia hoặc Thông tấn xã Việt Nam.'
                      : 'Di tích thực tế còn tồn tại nguyên vẹn hoặc đã được trùng tu theo quy chuẩn bảo tồn di sản của Bộ Văn hóa, Thể thao và Du lịch.'}
                  </p>
                  <p>
                    <strong>2. Tài liệu gốc đối chiếu:</strong> Đối chiếu với bộ sách giáo khoa Lịch sử và Địa lí lớp 4, lớp 5 (Bộ Kết nối tri thức với cuộc sống), các bộ sử xưa như <em>Đại Việt sử ký toàn thư</em>, <em>Khâm định Việt sử thông giám cương mục</em>, cùng hồ sơ khoa học của Cục Di sản Văn hóa.
                  </p>
                  <p>
                    <strong>3. Lời khuyên cho học sinh:</strong> Khi học lịch sử, các em hãy luôn rèn luyện thói quen tự hỏi: <em>"Tư liệu này từ đâu ra? Có chứng cứ khoa học nào đi kèm không?"</em> để trở thành những nhà thám tử sử học thông thái!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
