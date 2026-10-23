import React, { useState } from 'react';
import { RELIC_SITES } from '../../data/historyData';
import { RelicSite, HistoricalImage } from '../../types';
import { MapPin, Navigation, Compass, Sparkles, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { AuthenticImageCard } from '../common/AuthenticImageCard';
import { ImageDetailModal } from '../ImageDetailModal';

interface RelicsMapViewProps {
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
  onUnlockStamp?: (siteName: string) => void;
}

export const RelicsMapView: React.FC<RelicsMapViewProps> = ({
  onOpenAiWithPrompt,
  onUnlockStamp,
}) => {
  const [selectedSiteId, setSelectedSiteId] = useState<string>(RELIC_SITES[0].id);
  const [regionFilter, setRegionFilter] = useState<'All' | 'Bắc' | 'Trung' | 'Nam'>('All');
  const [inspectImage, setInspectImage] = useState<HistoricalImage | null>(null);

  const selectedSite =
    RELIC_SITES.find((s) => s.id === selectedSiteId) || RELIC_SITES[0];

  const filteredSites = RELIC_SITES.filter(
    (s) => regionFilter === 'All' || s.region === regionFilter
  );

  return (
    <div className="space-y-8 pb-16">
      <ImageDetailModal
        image={inspectImage}
        onClose={() => setInspectImage(null)}
        topicTitle={selectedSite.name}
      />
      {/* Header */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider">
              <span>Bản đồ di tích tương tác</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">Không gian địa lý & lịch sử</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Mỗi địa danh, một trang sử
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Khám phá các di tích lịch sử - văn hóa tiêu biểu trải dài từ Bắc chí Nam của Tổ quốc ta.
            </p>
          </div>

          {/* Region filter */}
          <div className="flex items-center gap-1.5 p-1 bg-purple-50 rounded-xl border border-purple-200/60 text-xs font-semibold">
            <button
              onClick={() => setRegionFilter('All')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                regionFilter === 'All' ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
              }`}
            >
              Cả nước ({RELIC_SITES.length})
            </button>
            <button
              onClick={() => setRegionFilter('Bắc')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                regionFilter === 'Bắc' ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
              }`}
            >
              Miền Bắc
            </button>
            <button
              onClick={() => setRegionFilter('Trung')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                regionFilter === 'Trung' ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
              }`}
            >
              Miền Trung
            </button>
            <button
              onClick={() => setRegionFilter('Nam')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                regionFilter === 'Nam' ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
              }`}
            >
              Miền Nam
            </button>
          </div>
        </div>
      </div>

      {/* Main Map & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Interactive Vietnam S-curve Map Canvas */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-purple-100 p-6 shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
            <span className="font-bold text-purple-950 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-purple-700" />
              Bản đồ định vị di tích
            </span>
            <span>Chọn điểm đỏ để xem</span>
          </div>

          {/* Interactive SVG Vietnam Map Stage */}
          <div className="relative w-full max-w-[340px] h-[520px] my-4 bg-gradient-to-b from-sky-50/50 via-purple-50/30 to-emerald-50/40 rounded-2xl border border-purple-100 p-3 overflow-hidden">
            {/* Vietnam Landmass simplified S-curve SVG silhouette */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-200 fill-current opacity-60">
              {/* Northern region */}
              <path d="M 20 10 Q 35 8 50 12 Q 60 18 55 24 Q 45 28 42 32 Q 40 40 48 46 Q 52 52 56 60 Q 58 70 54 80 Q 48 88 42 92 Q 35 90 38 82 Q 45 76 46 70 Q 42 60 38 50 Q 32 38 34 26 Q 22 18 20 10 Z" />
              {/* Hoang Sa & Truong Sa archipelagos indications */}
              <circle cx="78" cy="42" r="1.5" />
              <circle cx="82" cy="45" r="1.2" />
              <circle cx="80" cy="74" r="1.5" />
              <circle cx="84" cy="78" r="1.2" />
              <circle cx="76" cy="80" r="1.0" />
            </svg>

            <div className="absolute top-4 right-4 text-[10px] text-slate-500 space-y-1 bg-white/80 p-2 rounded-lg border border-purple-100">
              <div className="font-semibold text-purple-900">Quần đảo Hoàng Sa</div>
              <div className="font-semibold text-purple-900">Quần đảo Trường Sa</div>
              <div className="text-[9px] text-emerald-700 italic">Chủ quyền thiêng liêng</div>
            </div>

            {/* Clickable Site Markers */}
            {RELIC_SITES.map((site) => {
              const isSelected = site.id === selectedSite.id;
              return (
                <button
                  key={site.id}
                  onClick={() => setSelectedSiteId(site.id)}
                  style={{
                    left: `${site.coordinates.x}%`,
                    top: `${site.coordinates.y}%`,
                  }}
                  title={site.name}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-all ${
                    isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center shadow-md transition-all ${
                        isSelected
                          ? 'bg-purple-700 ring-4 ring-purple-300 ring-opacity-70 text-white'
                          : 'bg-rose-500 hover:bg-rose-600 text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                    <span className="absolute left-5 whitespace-nowrap bg-white/95 text-purple-950 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs border border-purple-100 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {site.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Gồm {RELIC_SITES.length} di tích lịch sử và văn hóa quốc gia đặc biệt tiêu biểu
          </p>
        </div>

        {/* Right Column (7 cols): Selected Site Dossier */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <span className="font-semibold text-xs text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                Miền {selectedSite.region} · {selectedSite.period}
              </span>
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Di tích Quốc gia đặc biệt
              </span>
            </div>

            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                {selectedSite.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>{selectedSite.location}</span>
              </div>
            </div>

            {/* Authentic Relic Photo Card */}
            <div>
              <AuthenticImageCard
                image={selectedSite.primaryImage}
                fallbackTitle={selectedSite.name}
                fallbackCategory={`Di tích quốc gia · ${selectedSite.period}`}
                aspectRatio="video"
                onInspectImage={(img) => setInspectImage(img)}
                showCaption={true}
              />
            </div>

            {/* Historical Role & Story */}
            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2">
              <h4 className="font-bold text-xs text-purple-950 uppercase tracking-wide">
                Vai trò trong dòng chảy lịch sử
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedSite.historicalRole}
              </p>
            </div>

            {/* Highlights to visit */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                Các điểm tham quan & hiện vật nổi bật
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSite.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Buttons: Ask AI & Unlock Stamp */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() =>
                  onOpenAiWithPrompt(
                    `Hãy đóng vai hướng dẫn viên du lịch nhí, giới thiệu ngắn gọn và hào hứng về di tích ${selectedSite.name} (${selectedSite.location}) cho học sinh tiểu học nghe.`,
                    { siteName: selectedSite.name }
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hỏi Bạn Sử Nhí về di tích này</span>
              </button>

              <button
                onClick={() => {
                  if (onUnlockStamp) onUnlockStamp(selectedSite.name);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                <Award className="w-4 h-4" />
                <span>Đóng dấu Tem mộc vào Hộ chiếu</span>
              </button>
            </div>
          </div>

          {/* Quick List of All Sites */}
          <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-xs">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-3">
              Danh sách các di tích ({filteredSites.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredSites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => setSelectedSiteId(site.id)}
                  className={`p-2.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                    site.id === selectedSite.id
                      ? 'bg-purple-100 text-purple-950 border-purple-300'
                      : 'bg-slate-50 hover:bg-purple-50/60 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className="truncate">{site.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
