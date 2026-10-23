import React, { useState, useEffect } from 'react';
import {
  OFFICIAL_DATASET,
  getLinkedStageData,
  getTeacherReviews,
  saveTeacherReview,
} from '../../data/officialDataset';
import {
  DatasetGiaiDoan,
  DatasetSuKien,
  DatasetNhanVat,
  DatasetDiTich,
  DatasetTruyenThuyet,
  DatasetHinhAnh,
  DatasetNguonTuLieu,
  UserProfile,
} from '../../types';
import {
  DongSonStar,
  DongSonDrumSVG,
  ChimLacSVG,
  DongSonCorner,
  DongSonBorderBand,
} from '../DongSonMotif';
import {
  Database,
  Calendar,
  Users,
  Landmark,
  Sparkles,
  BookOpen,
  Image,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Filter,
  Search,
  Check,
  Edit3,
  Layers,
  HelpCircle,
  Crown,
  Quote,
  School,
  Lock,
} from 'lucide-react';

interface OfficialDatasetViewProps {
  currentUser?: UserProfile | null;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
}

export const OfficialDatasetView: React.FC<OfficialDatasetViewProps> = ({
  currentUser,
  onOpenAiWithPrompt,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'stage-link' | 'giai_doan' | 'su_kien' | 'nhan_vat' | 'di_tich' | 'truyen_thuyet' | 'hinh_anh' | 'nguon_tu_lieu'
  >('stage-link');

  const [selectedStageCode, setSelectedStageCode] = useState<string>('GD01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reviews, setReviews] = useState<Record<string, { status: string; note?: string; verifiedBy?: string; verifiedAt?: string }>>({});
  const [reviewingItem, setReviewingItem] = useState<{ code: string; title: string; currentStatus: string } | null>(null);
  const [reviewNewStatus, setReviewNewStatus] = useState<string>('Đã kiểm chứng');
  const [reviewNote, setReviewNote] = useState<string>('');

  useEffect(() => {
    setReviews(getTeacherReviews());
  }, []);

  const isTeacherOrAdmin =
    currentUser?.role === 'teacher' ||
    currentUser?.role === 'admin' ||
    currentUser?.email?.toLowerCase().includes('pham.thanhh212');

  const getStatusBadge = (code: string, originalStatus: string) => {
    const custom = reviews[code]?.status;
    const status = custom || originalStatus;

    if (status.includes('Đã duyệt') || status.includes('Đã kiểm chứng')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{status}</span>
        </span>
      );
    }
    if (status.includes('Cần nguồn')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <AlertCircle className="w-3 h-3 text-amber-600" />
          <span>{status}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
        <ShieldCheck className="w-3 h-3 text-rose-500" />
        <span>{status}</span>
      </span>
    );
  };

  const handleOpenReviewModal = (code: string, title: string, currentStatus: string) => {
    setReviewingItem({ code, title, currentStatus });
    setReviewNewStatus('Đã kiểm chứng');
    setReviewNote(reviews[code]?.note || '');
  };

  const handleSaveReview = () => {
    if (!reviewingItem) return;
    saveTeacherReview(
      reviewingItem.code,
      reviewNewStatus,
      reviewNote,
      currentUser?.name || 'Cô giáo Phạm Thị Thanh'
    );
    setReviews(getTeacherReviews());
    setReviewingItem(null);
  };

  const linkedData = getLinkedStageData(selectedStageCode);

  return (
    <div className="space-y-8 pb-16">
      {/* Review Modal for Teachers */}
      {reviewingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border-2 border-amber-400 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h3 className="font-display font-bold text-base text-[#451a03]">
                  Thẩm định & Duyệt tư liệu
                </h3>
              </div>
              <button
                onClick={() => setReviewingItem(null)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-1">
              <span className="text-stone-500 font-medium">Mục đang thẩm định:</span>
              <div className="font-bold text-sm text-[#451a03]">
                [{reviewingItem.code}] {reviewingItem.title}
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-stone-700 block">Trạng thái phê duyệt mới:</label>
              <select
                value={reviewNewStatus}
                onChange={(e) => setReviewNewStatus(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/50 font-bold text-amber-950 text-xs"
              >
                <option value="Đã kiểm chứng">Đã kiểm chứng (Đạt chuẩn SGK GDPT 2018)</option>
                <option value="Chờ giáo viên duyệt">Chờ giáo viên duyệt (Đang rà soát)</option>
                <option value="Cần nguồn bổ sung">Cần nguồn bổ sung (Cần trích dẫn thêm)</option>
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-stone-700 block">Ghi chú của giáo viên / thẩm định viên:</label>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                rows={3}
                placeholder="Nhập ghi chú nguồn đối chiếu hoặc hướng dẫn cho học sinh..."
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setReviewingItem(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSaveReview}
                className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-xs font-bold text-white shadow-xs"
              >
                Lưu thẩm định
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Card with Dong Son motif */}
      <div className="relative bg-[#fffdfa] rounded-3xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pb-6 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <Database className="w-4 h-4 text-amber-700" />
              <span>{OFFICIAL_DATASET.ten_bo_tu_lieu}</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-stone-500 font-semibold">Căn cứ bảng dữ liệu chuyển giao</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1.5">
              Kho Tư Liệu Lịch Sử Việt Nam Chuẩn Hóa
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 max-w-3xl leading-relaxed">
              Toàn bộ cơ sở dữ liệu lịch sử gồm <strong>8 giai đoạn (GD01–GD08)</strong>, <strong>32 sự kiện tiêu biểu</strong>, <strong>28 danh nhân</strong>, <strong>10 di tích</strong>, <strong>6 truyền thuyết</strong>, cùng danh mục ảnh và nguồn tham khảo chính thống từ Bảo tàng Lịch sử quốc gia và Cục Di sản văn hóa.
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-950 space-y-1 max-w-sm">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Quy trình thẩm định lịch sử:</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-amber-900/90">
              {OFFICIAL_DATASET.ghi_chu_kiem_chung}
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveCategory('stage-link')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeCategory === 'stage-link'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Liên kết theo Giai đoạn (Quy tắc 1)</span>
          </button>

          <button
            onClick={() => setActiveCategory('giai_doan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeCategory === 'giai_doan'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>8 Giai đoạn ({OFFICIAL_DATASET.giai_doan.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('su_kien')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeCategory === 'su_kien'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>32 Sự kiện ({OFFICIAL_DATASET.su_kien.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('nhan_vat')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeCategory === 'nhan_vat'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>28 Nhân vật ({OFFICIAL_DATASET.nhan_vat.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('di_tich')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeCategory === 'di_tich'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>10 Di tích ({OFFICIAL_DATASET.di_tich.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('truyen_thuyet')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeCategory === 'truyen_thuyet'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>6 Truyền thuyết ({OFFICIAL_DATASET.truyen_thuyet.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('hinh_anh')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeCategory === 'hinh_anh'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Danh mục Ảnh ({OFFICIAL_DATASET.hinh_anh.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('nguon_tu_lieu')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              activeCategory === 'nguon_tu_lieu'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>7 Nguồn tư liệu ({OFFICIAL_DATASET.nguon_tu_lieu.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STAGE LINKAGE (QUY TẮC 1: LỌC THEO MÃ GIAI ĐOẠN ĐỂ LIÊN KẾT) */}
      {activeCategory === 'stage-link' && (
        <div className="space-y-6">
          {/* Stage Selector Pills */}
          <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs text-stone-600 mb-3">
              <span className="font-bold text-amber-950 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-amber-700" />
                <span>Chọn mã giai đoạn để liên kết dữ liệu đa chiều:</span>
              </span>
              <span className="text-[11px] text-stone-500">
                Hiển thị đồng thời: Sự kiện · Nhân vật · Di tích · Truyền thuyết · Ảnh
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {OFFICIAL_DATASET.giai_doan.map((gd) => {
                const isSelected = gd.Mã === selectedStageCode;
                return (
                  <button
                    key={gd.Mã}
                    onClick={() => setSelectedStageCode(gd.Mã)}
                    className={`whitespace-nowrap shrink-0 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                        : 'bg-[#faf6f0] text-stone-700 border-stone-200 hover:bg-amber-100/60'
                    }`}
                  >
                    <span className="font-mono bg-black/10 px-1.5 py-0.5 rounded text-[11px]">
                      {gd.Mã}
                    </span>
                    <span>{gd['Tên giai đoạn']}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Linked Stage Dossier */}
          {linkedData.stage && (
            <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 rounded-3xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#ebd7be]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-amber-800 text-white">
                      {linkedData.stage.Mã}
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03]">
                      {linkedData.stage['Tên giai đoạn']}
                    </h2>
                  </div>
                  <div className="text-xs text-amber-900 font-bold mt-1">
                    Niên đại: {linkedData.stage['Thời gian']}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(linkedData.stage.Mã, linkedData.stage['Trạng thái'])}
                  {isTeacherOrAdmin && linkedData.stage && (
                    <button
                      onClick={() =>
                        handleOpenReviewModal(
                          linkedData.stage!.Mã,
                          linkedData.stage!['Tên giai đoạn'],
                          linkedData.stage!['Trạng thái']
                        )
                      }
                      className="px-2.5 py-1 rounded-lg border border-amber-400 bg-white hover:bg-amber-50 text-[11px] font-bold text-amber-900 flex items-center gap-1 shadow-2xs"
                    >
                      <Edit3 className="w-3 h-3 text-amber-700" />
                      <span>Thẩm định</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Summary description & key figures */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white border border-[#eedec7] space-y-1">
                  <span className="font-bold text-stone-500 uppercase text-[10px]">Nội dung tiêu biểu:</span>
                  <p className="font-semibold text-stone-800 text-xs leading-relaxed">
                    {linkedData.stage['Nội dung tiêu biểu']}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#eedec7] space-y-1">
                  <span className="font-bold text-stone-500 uppercase text-[10px]">Nhân vật cốt lõi:</span>
                  <p className="font-semibold text-amber-900 text-xs leading-relaxed">
                    {linkedData.stage['Nhân vật']}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#eedec7] space-y-1">
                  <span className="font-bold text-stone-500 uppercase text-[10px]">Di tích / Hiện vật:</span>
                  <p className="font-semibold text-stone-800 text-xs leading-relaxed">
                    {linkedData.stage['Di tích/hiện vật']}
                  </p>
                </div>
              </div>

              {/* 4 Quadrants: Events, Figures, Relics, Legends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                {/* 1. Linked Events */}
                <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="font-bold text-xs text-[#451a03] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-700" />
                      <span>Sự kiện gắn với giai đoạn ({linkedData.events.length})</span>
                    </span>
                    <span className="text-[11px] text-stone-400">su_kien</span>
                  </div>

                  {linkedData.events.length === 0 ? (
                    <p className="text-xs text-stone-400 italic py-4 text-center">
                      Chưa có sự kiện gắn trực tiếp với giai đoạn này trong bảng dữ liệu.
                    </p>
                  ) : (
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {linkedData.events.map((sk) => (
                        <div
                          key={sk.Mã}
                          className="p-3.5 rounded-xl bg-[#faf6f0] border border-amber-200/80 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                              {sk.Mã} · {sk['Mốc thời gian']}
                            </span>
                            {getStatusBadge(sk.Mã, sk['Trạng thái'])}
                          </div>

                          <h4 className="font-bold text-sm text-[#451a03]">{sk['Sự kiện']}</h4>
                          <p className="text-stone-700 text-[11.5px] leading-relaxed">
                            {sk['Dữ kiện tóm tắt']}
                          </p>
                          <div className="p-2 rounded-lg bg-amber-50 text-[11px] text-amber-950 border border-amber-200/60">
                            <strong>Ý nghĩa:</strong> {sk['Ý nghĩa']}
                          </div>

                          <div className="pt-1 flex items-center justify-between text-[10.5px] text-stone-500">
                            <a
                              href={sk['URL nguồn']}
                              target="_blank"
                              rel="noreferrer"
                              className="text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Nguồn đối chiếu</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            {isTeacherOrAdmin && (
                              <button
                                onClick={() => handleOpenReviewModal(sk.Mã, sk['Sự kiện'], sk['Trạng thái'])}
                                className="text-amber-700 hover:text-amber-950 font-bold"
                              >
                                Thẩm định
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Linked Figures */}
                <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="font-bold text-xs text-[#451a03] flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-700" />
                      <span>Nhân vật tiêu biểu ({linkedData.figures.length})</span>
                    </span>
                    <span className="text-[11px] text-stone-400">nhan_vat</span>
                  </div>

                  {linkedData.figures.length === 0 ? (
                    <p className="text-xs text-stone-400 italic py-4 text-center">
                      Chưa có nhân vật gắn trực tiếp với giai đoạn này trong bảng dữ liệu.
                    </p>
                  ) : (
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {linkedData.figures.map((nv) => (
                        <div
                          key={nv.Mã}
                          className="p-3.5 rounded-xl bg-[#faf6f0] border border-amber-200/80 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                              {nv.Mã} · {nv['Địa danh liên quan']}
                            </span>
                            {getStatusBadge(nv.Mã, nv['Trạng thái'])}
                          </div>

                          <h4 className="font-bold text-sm text-[#451a03]">{nv['Nhân vật']}</h4>
                          <p className="text-stone-700 text-[11.5px] leading-relaxed">
                            {nv['Đóng góp/sự kiện']}
                          </p>

                          <div className="text-[10.5px] text-stone-500 bg-white p-2 rounded-lg border border-stone-200">
                            <strong>Lưu ý:</strong> {nv['Ghi chú loại hình']}
                          </div>

                          <div className="pt-1 flex items-center justify-between text-[10.5px]">
                            <a
                              href={nv['URL nguồn']}
                              target="_blank"
                              rel="noreferrer"
                              className="text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Tra cứu nguồn</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            {isTeacherOrAdmin && (
                              <button
                                onClick={() => handleOpenReviewModal(nv.Mã, nv['Nhân vật'], nv['Trạng thái'])}
                                className="text-amber-700 hover:text-amber-950 font-bold"
                              >
                                Thẩm định
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Linked Relics */}
                <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="font-bold text-xs text-[#451a03] flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-amber-700" />
                      <span>Di tích lịch sử ({linkedData.relics.length})</span>
                    </span>
                    <span className="text-[11px] text-stone-400">di_tich</span>
                  </div>

                  {linkedData.relics.length === 0 ? (
                    <p className="text-xs text-stone-400 italic py-4 text-center">
                      Không có di tích riêng biệt thuộc giai đoạn này.
                    </p>
                  ) : (
                    <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                      {linkedData.relics.map((dt) => (
                        <div
                          key={dt.Mã}
                          className="p-3.5 rounded-xl bg-[#faf6f0] border border-amber-200/80 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                              {dt.Mã} · {dt['Địa điểm']}
                            </span>
                            {getStatusBadge(dt.Mã, dt['Trạng thái'])}
                          </div>

                          <h4 className="font-bold text-sm text-[#451a03]">{dt['Tên di tích']}</h4>
                          <p className="text-stone-700 text-[11.5px] leading-relaxed">
                            {dt['Giá trị liên quan']}
                          </p>

                          <div className="pt-1 flex items-center justify-between text-[10.5px]">
                            <a
                              href={dt['URL nguồn']}
                              target="_blank"
                              rel="noreferrer"
                              className="text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Hồ sơ di tích</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            {isTeacherOrAdmin && (
                              <button
                                onClick={() => handleOpenReviewModal(dt.Mã, dt['Tên di tích'], dt['Trạng thái'])}
                                className="text-amber-700 hover:text-amber-950 font-bold"
                              >
                                Thẩm định
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Linked Legends & Images */}
                <div className="bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="font-bold text-xs text-[#451a03] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span>Truyền thuyết & Ảnh tư liệu ({linkedData.legends.length + linkedData.images.length})</span>
                    </span>
                    <span className="text-[11px] text-stone-400">truyen_thuyet / hinh_anh</span>
                  </div>

                  <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                    {/* Legends */}
                    {linkedData.legends.map((tt) => (
                      <div
                        key={tt.Mã}
                        className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] font-bold bg-teal-200 text-teal-900 px-2 py-0.5 rounded">
                            {tt.Mã} · Truyền thuyết
                          </span>
                          {getStatusBadge(tt.Mã, tt['Trạng thái'])}
                        </div>

                        <h4 className="font-bold text-sm text-teal-950">{tt['Tên truyền thuyết']}</h4>
                        <p className="text-teal-900 text-[11.5px] leading-relaxed">
                          {tt['Nội dung liên hệ']}
                        </p>
                        <div className="p-2 bg-white rounded-lg border border-teal-200 text-[10.5px] text-teal-800">
                          <strong>Lưu ý phân biệt:</strong> {tt['Lưu ý phân biệt']}
                        </div>
                      </div>
                    ))}

                    {/* Images */}
                    {linkedData.images.map((ha) => (
                      <div
                        key={ha.Mã}
                        className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                            {ha.Mã} · {ha['Loại tư liệu']}
                          </span>
                          <span className="text-[10px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                            {ha['Quyền sử dụng']}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-amber-950">{ha['Hình ảnh đề xuất']}</h4>
                        <div className="text-[11px] text-stone-600">
                          Cơ quan cung cấp: <strong>{ha['Cơ quan cung cấp']}</strong>
                        </div>

                        <a
                          href={ha['URL trang nguồn']}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-amber-800 font-bold hover:underline pt-1"
                        >
                          <span>Xem trang nguồn cung cấp ảnh</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}

                    {linkedData.legends.length === 0 && linkedData.images.length === 0 && (
                      <p className="text-xs text-stone-400 italic py-4 text-center">
                        Không có truyền thuyết hoặc tư liệu ảnh gắn với giai đoạn này.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Quick AI Action */}
              <div className="pt-4 border-t border-[#ebd7be] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-600">
                  Nguồn dữ liệu đối chiếu: <strong className="text-stone-800">{linkedData.stage['Nguồn tham khảo']}</strong>
                </span>

                <button
                  onClick={() =>
                    onOpenAiWithPrompt(
                      `Hãy giải thích các sự kiện và nhân vật chính của giai đoạn ${linkedData.stage!['Tên giai đoạn']} (${linkedData.stage!.Mã}) theo phong cách thám tử sử liệu cho học sinh lớp 4-5.`
                    )
                  }
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Hỏi Bạn Sử Nhí về {linkedData.stage!.Mã}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: 8 GIAI ĐOẠN (GD01 – GD08) TABLE */}
      {activeCategory === 'giai_doan' && (
        <div className="bg-white rounded-3xl border-2 border-[#e8d7be] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-display font-bold text-lg text-[#451a03]">
              Bảng Niên biểu 8 Giai đoạn Lịch sử (GD01 – GD08)
            </h3>
            <span className="text-xs text-stone-500 font-medium">Tổng hợp 8 giai đoạn</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-50/80 text-amber-950 border-b border-amber-200 font-bold">
                  <th className="p-3 w-16">Mã</th>
                  <th className="p-3 min-w-[180px]">Tên giai đoạn</th>
                  <th className="p-3 min-w-[140px]">Thời gian</th>
                  <th className="p-3 min-w-[200px]">Nội dung tiêu biểu</th>
                  <th className="p-3 min-w-[160px]">Nhân vật</th>
                  <th className="p-3 min-w-[160px]">Di tích / Hiện vật</th>
                  <th className="p-3 min-w-[140px]">Trạng thái</th>
                  <th className="p-3 w-20">Nguồn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {OFFICIAL_DATASET.giai_doan.map((gd) => (
                  <tr key={gd.Mã} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-900">{gd.Mã}</td>
                    <td className="p-3 font-bold text-stone-900">{gd['Tên giai đoạn']}</td>
                    <td className="p-3 text-stone-600 font-medium">{gd['Thời gian']}</td>
                    <td className="p-3 text-stone-700">{gd['Nội dung tiêu biểu']}</td>
                    <td className="p-3 font-semibold text-amber-900">{gd['Nhân vật']}</td>
                    <td className="p-3 text-stone-700">{gd['Di tích/hiện vật']}</td>
                    <td className="p-3">{getStatusBadge(gd.Mã, gd['Trạng thái'])}</td>
                    <td className="p-3">
                      <a
                        href={gd['Nguồn tham khảo']}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: 32 SỰ KIỆN (SK001 – SK032) */}
      {activeCategory === 'su_kien' && (
        <div className="bg-white rounded-3xl border-2 border-[#e8d7be] p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-display font-bold text-lg text-[#451a03]">
                Danh mục 32 Sự Kiện Lịch Sử Tiêu Biểu (SK001 – SK032)
              </h3>
              <p className="text-xs text-stone-500">Mốc thời gian, tóm tắt diễn biến và ý nghĩa lịch sử</p>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sự kiện, niên đại..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-50/80 text-amber-950 border-b border-amber-200 font-bold">
                  <th className="p-3 w-16">Mã</th>
                  <th className="p-3 min-w-[180px]">Sự kiện</th>
                  <th className="p-3 min-w-[120px]">Thời gian</th>
                  <th className="p-3 w-16">GĐ</th>
                  <th className="p-3 min-w-[220px]">Dữ kiện tóm tắt</th>
                  <th className="p-3 min-w-[220px]">Ý nghĩa</th>
                  <th className="p-3 min-w-[140px]">Trạng thái</th>
                  <th className="p-3 w-20">Nguồn</th>
                  {isTeacherOrAdmin && <th className="p-3 w-20">Duyệt</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {OFFICIAL_DATASET.su_kien
                  .filter((sk) => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase();
                    return (
                      sk['Sự kiện'].toLowerCase().includes(q) ||
                      sk['Mốc thời gian'].toLowerCase().includes(q) ||
                      sk.Mã.toLowerCase().includes(q) ||
                      sk['Mã giai đoạn'].toLowerCase().includes(q)
                    );
                  })
                  .map((sk) => (
                    <tr key={sk.Mã} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-900">{sk.Mã}</td>
                      <td className="p-3 font-bold text-stone-900">{sk['Sự kiện']}</td>
                      <td className="p-3 font-semibold text-purple-900">{sk['Mốc thời gian']}</td>
                      <td className="p-3 font-mono font-bold text-stone-500">{sk['Mã giai đoạn']}</td>
                      <td className="p-3 text-stone-700">{sk['Dữ kiện tóm tắt']}</td>
                      <td className="p-3 text-stone-700 bg-amber-50/20">{sk['Ý nghĩa']}</td>
                      <td className="p-3">{getStatusBadge(sk.Mã, sk['Trạng thái'])}</td>
                      <td className="p-3">
                        <a
                          href={sk['URL nguồn']}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1"
                        >
                          <span>Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      {isTeacherOrAdmin && (
                        <td className="p-3">
                          <button
                            onClick={() => handleOpenReviewModal(sk.Mã, sk['Sự kiện'], sk['Trạng thái'])}
                            className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-800"
                            title="Thẩm định sự kiện này"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 4: 28 NHÂN VẬT (NV01 – NV28) */}
      {activeCategory === 'nhan_vat' && (
        <div className="bg-white rounded-3xl border-2 border-[#e8d7be] p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-display font-bold text-lg text-[#451a03]">
                Danh mục 28 Nhân Vật Lịch Sử Tiêu Biểu (NV01 – NV28)
              </h3>
              <p className="text-xs text-stone-500">Đóng góp, quê quán, loại hình và đường dẫn tra cứu</p>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm nhân vật, địa danh..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-50/80 text-amber-950 border-b border-amber-200 font-bold">
                  <th className="p-3 w-16">Mã</th>
                  <th className="p-3 min-w-[180px]">Nhân vật</th>
                  <th className="p-3 w-16">GĐ</th>
                  <th className="p-3 min-w-[220px]">Đóng góp / Sự kiện</th>
                  <th className="p-3 min-w-[140px]">Địa danh liên quan</th>
                  <th className="p-3 min-w-[180px]">Ghi chú loại hình</th>
                  <th className="p-3 min-w-[140px]">Trạng thái</th>
                  <th className="p-3 w-20">Nguồn</th>
                  {isTeacherOrAdmin && <th className="p-3 w-20">Duyệt</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {OFFICIAL_DATASET.nhan_vat
                  .filter((nv) => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase();
                    return (
                      nv['Nhân vật'].toLowerCase().includes(q) ||
                      nv['Địa danh liên quan'].toLowerCase().includes(q) ||
                      nv.Mã.toLowerCase().includes(q)
                    );
                  })
                  .map((nv) => (
                    <tr key={nv.Mã} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-900">{nv.Mã}</td>
                      <td className="p-3 font-bold text-stone-900">{nv['Nhân vật']}</td>
                      <td className="p-3 font-mono font-bold text-stone-500">{nv['Giai đoạn']}</td>
                      <td className="p-3 text-stone-700">{nv['Đóng góp/sự kiện']}</td>
                      <td className="p-3 font-semibold text-amber-900">{nv['Địa danh liên quan']}</td>
                      <td className="p-3 text-stone-500 italic text-[11px]">{nv['Ghi chú loại hình']}</td>
                      <td className="p-3">{getStatusBadge(nv.Mã, nv['Trạng thái'])}</td>
                      <td className="p-3">
                        <a
                          href={nv['URL nguồn']}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1"
                        >
                          <span>Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      {isTeacherOrAdmin && (
                        <td className="p-3">
                          <button
                            onClick={() => handleOpenReviewModal(nv.Mã, nv['Nhân vật'], nv['Trạng thái'])}
                            className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-800"
                            title="Thẩm định nhân vật này"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 5: 10 DI TÍCH (DT01 – DT10) */}
      {activeCategory === 'di_tich' && (
        <div className="bg-white rounded-3xl border-2 border-[#e8d7be] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-display font-bold text-lg text-[#451a03]">
                Danh mục 10 Di Tích Lịch Sử Tiêu Biểu (DT01 – DT10)
              </h3>
              <p className="text-xs text-stone-500">Địa điểm, giá trị lịch sử và hồ sơ xếp hạng</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICIAL_DATASET.di_tich.map((dt) => (
              <div
                key={dt.Mã}
                className="p-4 rounded-2xl bg-[#faf6f0] border border-amber-200 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded border border-amber-300">
                      {dt.Mã} · {dt['Địa điểm']}
                    </span>
                    {getStatusBadge(dt.Mã, dt['Trạng thái'])}
                  </div>

                  <h4 className="font-display font-bold text-base text-[#451a03]">{dt['Tên di tích']}</h4>
                  <p className="text-xs text-stone-700 leading-relaxed">{dt['Giá trị liên quan']}</p>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <a
                    href={dt['URL nguồn']}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-800 hover:underline flex items-center gap-1 font-bold text-[11px]"
                  >
                    <span>Xem hồ sơ di tích quốc gia</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {isTeacherOrAdmin && (
                    <button
                      onClick={() => handleOpenReviewModal(dt.Mã, dt['Tên di tích'], dt['Trạng thái'])}
                      className="text-xs font-bold text-amber-900 hover:underline"
                    >
                      Thẩm định
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 6: 6 TRUYỀN THUYẾT (TT01 – TT06) */}
      {activeCategory === 'truyen_thuyet' && (
        <div className="bg-white rounded-3xl border-2 border-[#e8d7be] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-display font-bold text-lg text-[#451a03]">
                Hệ Thống 6 Truyền Thuyết Lịch Sử Tiêu Biểu (TT01 – TT06)
              </h3>
              <p className="text-xs text-stone-500">
                Nội dung liên hệ văn hóa và nguyên tắc phân biệt sự thật lịch sử vs huyền ảo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICIAL_DATASET.truyen_thuyet.map((tt) => (
              <div
                key={tt.Mã}
                className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-teal-200 text-teal-900 px-2.5 py-0.5 rounded">
                      {tt.Mã} · {tt['Giai đoạn']}
                    </span>
                    {getStatusBadge(tt.Mã, tt['Trạng thái'])}
                  </div>

                  <h4 className="font-display font-bold text-base text-teal-950">{tt['Tên truyền thuyết']}</h4>
                  <p className="text-xs text-teal-900 leading-relaxed">{tt['Nội dung liên hệ']}</p>

                  <div className="p-3 bg-white rounded-xl border border-teal-200 text-xs text-teal-800 space-y-0.5">
                    <strong className="block text-teal-900 font-bold uppercase text-[10.5px]">
                      Lưu ý phân biệt của môn Sử:
                    </strong>
                    <p className="leading-relaxed">{tt['Lưu ý phân biệt']}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-teal-200/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() =>
                      onOpenAiWithPrompt(
                        `Giúp em phân biệt giữa yếu tố lịch sử và chi tiết thần kì trong truyền thuyết "${tt['Tên truyền thuyết']}".`
                      )
                    }
                    className="text-teal-800 hover:text-teal-950 font-bold text-[11px] inline-flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-teal-600" />
                    <span>Hỏi Bạn Sử Nhí giải thích</span>
                  </button>

                  {isTeacherOrAdmin && (
                    <button
                      onClick={() => handleOpenReviewModal(tt.Mã, tt['Tên truyền thuyết'], tt['Trạng thái'])}
                      className="text-xs font-bold text-teal-950 hover:underline"
                    >
                      Thẩm định
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 7: DANH MỤC HÌNH ẢNH & BẢN QUYỀN (HA01 – HA07) */}
      {activeCategory === 'hinh_anh' && (
        <div className="bg-white rounded-3xl border-2 border-[#e8d7be] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-display font-bold text-lg text-[#451a03]">
                Danh Mục 7 Đề Xuất Hình Ảnh & Bản Quyền (HA01 – HA07)
              </h3>
              <p className="text-xs text-stone-500">
                Lưu ý: Sheet Hình ảnh chỉ chứa danh mục và link nguồn; chưa nhúng ảnh và cần thẩm định giấy phép
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICIAL_DATASET.hinh_anh.map((ha) => (
              <div
                key={ha.Mã}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {ha.Mã} · {ha['Giai đoạn']}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                      {ha['Quyền sử dụng']}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-[#451a03]">{ha['Hình ảnh đề xuất']}</h4>
                  <div className="text-xs text-stone-600">
                    Loại tư liệu: <strong>{ha['Loại tư liệu']}</strong>
                  </div>
                  <div className="text-xs text-stone-600">
                    Cơ quan cung cấp: <strong>{ha['Cơ quan cung cấp']}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                  <a
                    href={ha['URL trang nguồn']}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-800 hover:underline flex items-center gap-1 font-bold text-[11px]"
                  >
                    <span>Trang nguồn tư liệu</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <span className="text-[10.5px] text-stone-400 italic">
                    {ha['Trạng thái']}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 8: NGUỒN TƯ LIỆU CHÍNH THỐNG (NG01 – NG07) */}
      {activeCategory === 'nguon_tu_lieu' && (
        <div className="bg-white rounded-3xl border-2 border-[#e8d7be] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-display font-bold text-lg text-[#451a03]">
                Hệ Thống Nguồn Tư Liệu Lịch Sử Chính Thống (NG01 – NG07)
              </h3>
              <p className="text-xs text-stone-500">
                Các bảo tàng quốc gia, cơ quan lưu trữ di sản và Bộ Giáo dục & Đào tạo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICIAL_DATASET.nguon_tu_lieu.map((ng) => (
              <div
                key={ng.Mã}
                className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded">
                      {ng.Mã}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Cơ quan chính thống
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-[#451a03]">{ng['Nguồn/tổ chức']}</h4>
                  <div className="text-xs text-stone-700">
                    Phạm vi tư liệu: <strong>{ng['Phạm vi tư liệu']}</strong>
                  </div>
                  <div className="text-[11.5px] text-stone-500 italic">
                    Lưu ý đối chiếu: {ng['Lưu ý']}
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                  <a
                    href={ng.URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>Truy cập cổng thông tin điện tử</span>
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
