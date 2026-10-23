import React, { useState } from 'react';
import {
  USER_HISTORY_METADATA,
  USER_PERIODS,
  USER_EVENTS,
  USER_FIGURES,
  USER_RELICS,
  USER_LEGENDS,
  USER_IMAGE_CATALOG,
  USER_OFFICIAL_SOURCES,
  UserEvent,
  UserFigure,
  UserRelic,
  UserLegend,
  UserImageProposal
} from '../../data/userVerifiedHistoryDataset';
import {
  DongSonDrumSVG,
  DongSonStar,
  ChimLacSVG,
  DongSonCorner,
  DongSonBorderBand
} from '../DongSonMotif';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Search,
  Filter,
  Download,
  BookOpen,
  Calendar,
  MapPin,
  Sparkles,
  Users,
  Landmark,
  Image as ImageIcon,
  FileText,
  School,
  Info
} from 'lucide-react';

interface VerifiedHistoryArchiveViewProps {
  onOpenAiWithPrompt?: (prompt: string, context?: any) => void;
}

export const VerifiedHistoryArchiveView: React.FC<VerifiedHistoryArchiveViewProps> = ({
  onOpenAiWithPrompt
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'figures' | 'relics' | 'legends' | 'images' | 'sources'>('events');
  const [selectedPeriodCode, setSelectedPeriodCode] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter events
  const filteredEvents = USER_EVENTS.filter((ev) => {
    const matchPeriod = selectedPeriodCode === 'ALL' || ev['Mã giai đoạn'] === selectedPeriodCode;
    const matchSearch =
      !searchTerm.trim() ||
      ev['Sự kiện'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev['Mốc thời gian'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev['Dữ kiện tóm tắt'].toLowerCase().includes(searchTerm.toLowerCase());
    return matchPeriod && matchSearch;
  });

  // Filter figures
  const filteredFigures = USER_FIGURES.filter((fig) => {
    const matchPeriod = selectedPeriodCode === 'ALL' || fig['Giai đoạn'].includes(selectedPeriodCode);
    const matchSearch =
      !searchTerm.trim() ||
      fig['Nhân vật'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      fig['Đóng góp/sự kiện'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      fig['Địa danh liên quan'].toLowerCase().includes(searchTerm.toLowerCase());
    return matchPeriod && matchSearch;
  });

  // Filter relics
  const filteredRelics = USER_RELICS.filter((rel) => {
    const matchPeriod = selectedPeriodCode === 'ALL' || rel['Giai đoạn'] === selectedPeriodCode;
    const matchSearch =
      !searchTerm.trim() ||
      rel['Tên di tích'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel['Địa điểm'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel['Giá trị liên quan'].toLowerCase().includes(searchTerm.toLowerCase());
    return matchPeriod && matchSearch;
  });

  // Filter legends
  const filteredLegends = USER_LEGENDS.filter((leg) => {
    const matchPeriod = selectedPeriodCode === 'ALL' || leg['Giai đoạn'] === selectedPeriodCode;
    const matchSearch =
      !searchTerm.trim() ||
      leg['Tên truyền thuyết'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      leg['Nội dung liên hệ'].toLowerCase().includes(searchTerm.toLowerCase());
    return matchPeriod && matchSearch;
  });

  // Filter images
  const filteredImages = USER_IMAGE_CATALOG.filter((img) => {
    const matchPeriod = selectedPeriodCode === 'ALL' || img['Giai đoạn'] === selectedPeriodCode;
    const matchSearch =
      !searchTerm.trim() ||
      img['Hình ảnh đề xuất'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      img['Cơ quan cung cấp'].toLowerCase().includes(searchTerm.toLowerCase());
    return matchPeriod && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner introducing the dataset */}
      <div className="relative bg-gradient-to-br from-[#fffdf8] via-[#fdf8f0] to-[#f7eedf] rounded-3xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#eedec7]">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-amber-900 uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                Hồ sơ dữ liệu chuẩn hóa
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                <School className="w-3.5 h-3.5" />
                {USER_HISTORY_METADATA.lop_phu_trach}
              </span>
              <span className="text-stone-500 font-medium">
                GV: Cô {USER_HISTORY_METADATA.giao_vien}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03]">
              {USER_HISTORY_METADATA.ten_bo_tu_lieu}
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Toàn bộ dữ liệu lịch sử đối chiếu chính thức theo Chương trình GDPT 2018 (SGK Kết nối tri thức Lớp 4–5), Bảo tàng Lịch sử quốc gia và Cục Di sản văn hóa. Phân định rõ ràng giữa <strong>sự kiện lịch sử đã chứng minh</strong> và <strong>truyền thuyết dân gian</strong>.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href="/assets/aistudio/Du_lieu_Lich_su_Viet_Nam_cho_Web_b5775d23.json"
              download="Du_lieu_Lich_su_Viet_Nam_cho_Web.json"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Tải file JSON gốc</span>
            </a>
            <a
              href="https://baotanglichsu.vn/vi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-amber-700" />
              <span>Bảo tàng Lịch sử QG</span>
            </a>
          </div>
        </div>

        {/* 5 Pedagogical Guidelines from Teacher */}
        <div className="mt-6 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-2">
            <Info className="w-4 h-4 text-amber-700" />
            <span>Nguyên tắc kiểm duyệt & đối chiếu kiến thức của giáo viên:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] text-stone-700">
            {USER_HISTORY_METADATA.huong_dan.map((rule, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white/70 border border-[#e8d7be] flex items-start gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-amber-200/80 text-amber-900 font-extrabold flex items-center justify-center shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <span className="leading-snug">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Period Filter */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-4">
        {/* Dataset Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-stone-100">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>32 Sự kiện (SK001–SK032)</span>
          </button>

          <button
            onClick={() => setActiveTab('figures')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'figures'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>28 Nhân vật (NV01–NV28)</span>
          </button>

          <button
            onClick={() => setActiveTab('relics')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'relics'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>10 Di tích quốc gia (DT01–DT10)</span>
          </button>

          <button
            onClick={() => setActiveTab('legends')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'legends'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>6 Truyền thuyết (TT01–TT06)</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'images'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Hồ sơ ảnh & Bản quyền (HA01–HA07)</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'sources'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>7 Nguồn chính thống (NG01–NG07)</span>
          </button>
        </div>

        {/* Filter by Period and Keyword Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
          {/* Period selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-stone-500 font-semibold shrink-0">Lọc giai đoạn:</span>
            <button
              onClick={() => setSelectedPeriodCode('ALL')}
              className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 transition-colors ${
                selectedPeriodCode === 'ALL'
                  ? 'bg-amber-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Tất cả (GD01–GD08)
            </button>
            {USER_PERIODS.map((period) => (
              <button
                key={period['Mã']}
                onClick={() => setSelectedPeriodCode(period['Mã'])}
                className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 transition-colors ${
                  selectedPeriodCode === period['Mã']
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                title={period['Tên giai đoạn']}
              >
                {period['Mã']}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo từ khóa..."
              className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* TAB 1: 32 SỰ KIỆN LỊCH SỬ (SK001 - SK032) */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
            <span>Tìm thấy <strong>{filteredEvents.length}</strong> sự kiện lịch sử đã kiểm chứng</span>
            <span className="text-amber-800 font-semibold">Nguồn trích: Bảo tàng Lịch sử quốc gia & SGK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((ev) => (
              <div
                key={ev['Mã']}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-extrabold text-[11px]">
                      <Calendar className="w-3 h-3 text-amber-700" />
                      {ev['Mã']} · {ev['Mốc thời gian']}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      {ev['Trạng thái']}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-stone-900">
                    {ev['Sự kiện']}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    <strong>Diễn biến tóm tắt:</strong> {ev['Dữ kiện tóm tắt']}
                  </p>

                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-950 leading-relaxed">
                    <strong>Ý nghĩa lịch sử:</strong> {ev['Ý nghĩa']}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500">
                    Giai đoạn: <strong>{ev['Mã giai đoạn']}</strong>
                  </span>
                  <a
                    href={ev['URL nguồn']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900 transition-colors"
                  >
                    <span>Xem nguồn thẩm định</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 28 NHÂN VẬT LỊCH SỬ (NV01 - NV28) */}
      {activeTab === 'figures' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
            <span>Tìm thấy <strong>{filteredFigures.length}</strong> nhân vật lịch sử và hình tượng văn hóa</span>
            <span className="text-teal-800 font-semibold">Phân định chuẩn hóa GDPT 2018</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFigures.map((fig) => {
              const isHistorical = fig['Ghi chú loại hình'].includes('Nhân vật lịch sử');
              return (
                <div
                  key={fig['Mã']}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-extrabold text-[11px]">
                        {fig['Mã']} · {fig['Giai đoạn']}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isHistorical
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {isHistorical ? 'Sử liệu xác minh' : 'Hình tượng / Truyền thuyết'}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-stone-900">
                      {fig['Nhân vật']}
                    </h3>

                    <p className="text-xs text-stone-700 leading-relaxed">
                      <strong>Công lao / Sự kiện:</strong> {fig['Đóng góp/sự kiện']}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{fig['Địa danh liên quan']}</span>
                    </div>

                    <div className="p-2.5 bg-stone-50 rounded-lg text-[11px] text-stone-600 italic">
                      {fig['Ghi chú loại hình']}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-stone-400">{fig['Trạng thái']}</span>
                    <a
                      href={fig['URL nguồn']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900"
                    >
                      <span>Tài liệu gốc</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: 10 DI TÍCH QUỐC GIA ĐẶC BIỆT (DT01 - DT10) */}
      {activeTab === 'relics' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
            <span>Danh mục <strong>{filteredRelics.length}</strong> di tích lịch sử quốc gia đặc biệt tiêu biểu</span>
            <span className="text-amber-800 font-semibold">Cục Di sản văn hóa (dsvh.gov.vn)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRelics.map((rel) => (
              <div
                key={rel['Mã']}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-extrabold text-[11px]">
                      {rel['Mã']} · {rel['Giai đoạn']}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Di tích quốc gia đặc biệt
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-stone-900">
                    {rel['Tên di tích']}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="font-medium">{rel['Địa điểm']}</span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <strong>Giá trị lịch sử & văn hóa:</strong> {rel['Giá trị liên quan']}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-teal-800 font-semibold">{rel['Trạng thái']}</span>
                  <a
                    href={rel['URL nguồn']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900"
                  >
                    <span>Hồ sơ di sản</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 6 TRUYỀN THUYẾT GẮN LIỀN VỚI LỊCH SỬ (TT01 - TT06) */}
      {activeTab === 'legends' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block text-sm font-bold text-amber-900">
                Chỉ dẫn sư phạm quan trọng dành cho học sinh tiểu học:
              </strong>
              <p>
                Truyền thuyết phản ánh trí tưởng tượng, niềm tự hào và cách giải thích về thiên nhiên, đạo lý của người xưa. Tuyệt đối <strong>không coi các yếu tố thần kì là sự kiện quân sự hay bằng chứng khoa học lịch sử thực tế</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLegends.map((leg) => (
              <div
                key={leg['Mã']}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-900 border border-purple-200 font-extrabold text-[11px]">
                    {leg['Mã']} · {leg['Giai đoạn']}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    {leg['Trạng thái']}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-stone-900">
                  {leg['Tên truyền thuyết']}
                </h3>

                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong>Ý nghĩa văn hóa & cội nguồn:</strong> {leg['Nội dung liên hệ']}
                </p>

                <div className="p-3 bg-rose-50/70 border border-rose-200/80 rounded-xl text-xs text-rose-950 leading-relaxed">
                  <strong className="text-rose-900">Lưu ý phân biệt của giáo viên:</strong> {leg['Lưu ý phân biệt']}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: DANH MỤC ĐỀ XUẤT HÌNH ẢNH & GIẤY PHÉP (HA01 - HA07) */}
      {activeTab === 'images' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-xs text-blue-950">
            <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block text-sm font-bold text-blue-900">
                Quy định kiểm soát bản quyền và tính xác thực của hình ảnh:
              </strong>
              <p>
                Chỉ sử dụng hình ảnh từ các bảo tàng, cơ quan lưu trữ quốc gia. Nếu hình ảnh chưa được cấp phép sao chép đầy đủ, website chỉ hiển thị liên kết trang nguồn chính thống và nhãn trạng thái "Chờ duyệt". Không tự ý dùng ảnh AI thay thế tư liệu gốc.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((img) => (
              <div
                key={img['Mã']}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-extrabold text-[11px]">
                      {img['Mã']} · {img['Giai đoạn']}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {img['Loại tư liệu']}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-stone-900">
                    {img['Hình ảnh đề xuất']}
                  </h3>

                  <div className="text-xs text-stone-600">
                    Cơ quan cung cấp: <strong className="text-stone-800">{img['Cơ quan cung cấp']}</strong>
                  </div>

                  <div className="p-2.5 bg-stone-50 rounded-lg text-[11px] text-stone-600 space-y-1">
                    <div>Quyền sử dụng: <strong>{img['Quyền sử dụng']}</strong></div>
                    <div>Trạng thái: <span className="text-amber-800 font-semibold">{img['Trạng thái']}</span></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <a
                    href={img['URL trang nguồn']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900"
                  >
                    <span>Trang nguồn bảo tàng</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: 7 NGUỒN CHÍNH THỐNG (NG01 - NG07) */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {USER_OFFICIAL_SOURCES.map((src) => (
              <div
                key={src['Mã']}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-900 border border-teal-200 font-extrabold text-[11px]">
                      {src['Mã']}
                    </span>
                    <span className="text-[10px] text-stone-400">Nguồn chính thống</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-stone-900">
                    {src['Nguồn/tổ chức']}
                  </h3>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    <strong>Phạm vi tư liệu:</strong> {src['Phạm vi tư liệu']}
                  </p>

                  <div className="p-2.5 bg-amber-50/60 rounded-xl text-[11px] text-amber-950">
                    <strong>Lưu ý:</strong> {src['Lưu ý']}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <a
                    href={src.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900"
                  >
                    <span>Truy cập trang web chính thức</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
