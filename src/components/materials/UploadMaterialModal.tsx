import React, { useState } from 'react';
import { TEXTBOOK_LESSONS, HISTORICAL_PERIODS, HISTORICAL_FIGURES } from '../../data/historyData';
import { UserProfile } from '../../types';
import {
  Upload,
  Link as LinkIcon,
  Video,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Eye,
  Save,
  BookOpen,
  Calendar,
  Layers,
  MapPin,
  Users
} from 'lucide-react';
import { DongSonCorner, DongSonStar } from '../DongSonMotif';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUploadSuccess: () => void;
  initialContentType?:
    | 'lecture'
    | 'article'
    | 'image_archive'
    | 'movie'
    | 'document'
    | 'historical_map'
    | 'figure_dossier'
    | 'legend'
    | 'relic'
    | 'quiz_game';
}

export const UploadMaterialModal: React.FC<UploadMaterialModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUploadSuccess,
  initialContentType = 'lecture',
}) => {
  // 1. Thông tin cơ bản
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState<4 | 5>(4);
  const [lessonCode, setLessonCode] = useState('LS4-B02');
  const [periodId, setPeriodId] = useState('period-1');
  const [relatedEvent, setRelatedEvent] = useState('');
  const [relatedFigure, setRelatedFigure] = useState('');
  const [category, setCategory] = useState('Bài giảng điện tử');

  // 2. Loại nội dung đăng tải (Mặc định tài liệu lịch sử)
  const [contentType, setContentType] = useState<
    | 'lecture'
    | 'article'
    | 'image_archive'
    | 'movie'
    | 'document'
    | 'historical_map'
    | 'figure_dossier'
    | 'legend'
    | 'relic'
    | 'quiz_game'
  >(initialContentType || 'article');

  // Quiz-specific state
  const [quizOptA, setQuizOptA] = useState('');
  const [quizOptB, setQuizOptB] = useState('');
  const [quizOptC, setQuizOptC] = useState('');
  const [quizOptD, setQuizOptD] = useState('');
  const [quizCorrectIndex, setQuizCorrectIndex] = useState(0);

  // Sync initialContentType
  React.useEffect(() => {
    if (initialContentType) {
      setContentType(initialContentType);
    } else {
      setContentType('article');
    }
  }, [initialContentType, isOpen]);

  // 3. Hình thức tải lên
  const [uploadMethod, setUploadMethod] = useState<'file' | 'direct_text' | 'drive' | 'youtube' | 'website'>('file');
  const [directContent, setDirectContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [description, setDescription] = useState('');

  // 4. Thông tin xác thực
  const [authorName, setAuthorName] = useState(currentUser.name || 'Cô giáo Phạm Thị Thanh');
  const [source, setSource] = useState('Bảo tàng Lịch sử quốc gia & SGK Kết nối tri thức');
  const [sourceUrl, setSourceUrl] = useState('');
  const [publishYear, setPublishYear] = useState('2026');
  const [license, setLicense] = useState('Giáo dục mở CC BY-NC-SA 4.0');

  // UI state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Khu vực upload tài liệu lịch sử: loại bỏ bài giảng điện tử, game trắc nghiệm, phim lịch sử
  const historicalContentTypesList = [
    { id: 'article', label: 'Bài viết kiến thức lịch sử' },
    { id: 'image_archive', label: 'Tư liệu hình ảnh & Infographic' },
    { id: 'document', label: 'Tài liệu văn bản (PDF, DOCX, PPTX)' },
    { id: 'historical_map', label: 'Bản đồ, sơ đồ di tích lịch sử' },
    { id: 'figure_dossier', label: 'Tư liệu về nhân vật lịch sử' },
    { id: 'legend', label: 'Tư liệu về truyền thuyết, dã sử' },
    { id: 'relic', label: 'Tư liệu về di tích & bảo vật' },
  ];

  const contentTypesList = initialContentType === 'lecture'
    ? [{ id: 'lecture', label: 'Bài giảng điện tử' }, ...historicalContentTypesList]
    : historicalContentTypesList;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMaterial = async (status: 'draft' | 'pending_approval' | 'published') => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (!title.trim()) {
        throw new Error('Vui lòng nhập tên tư liệu lịch sử.');
      }

      let finalUrl = linkUrl;
      let detectedType: any = 'pdf';

      if (uploadMethod === 'file') {
        if (!selectedFile || !fileBase64) {
          throw new Error('Vui lòng chọn tệp tin từ máy tính hoặc điện thoại.');
        }

        const ext = selectedFile.name.split('.').pop()?.toLowerCase();
        if (['pdf', 'docx', 'pptx', 'jpg', 'jpeg', 'png', 'webp', 'mp4'].includes(ext || '')) {
          detectedType = ext === 'jpeg' ? 'jpg' : ext;
        }

        const uploadRes = await fetch('/api/upload-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: selectedFile.name,
            fileData: fileBase64,
            fileType: selectedFile.type,
          }),
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || 'Tải tệp lên máy chủ thất bại.');
        }

        finalUrl = uploadData.fileUrl;
      } else if (uploadMethod === 'direct_text') {
        if (!directContent.trim()) {
          throw new Error('Vui lòng nhập nội dung văn bản tư liệu.');
        }
        detectedType = 'docx';
        finalUrl = '#content-direct';
      } else {
        if (!linkUrl.trim()) {
          throw new Error('Vui lòng nhập đường dẫn liên kết tài nguyên.');
        }
        detectedType = uploadMethod === 'youtube' ? 'video' : 'link';
      }

      let finalCategory = 'Thông tin lịch sử';
      if (contentType === 'lecture') {
        finalCategory = 'Bài giảng điện tử';
      } else if (contentType === 'quiz_game') {
        finalCategory = 'Game trắc nghiệm';
        detectedType = 'quiz';
      } else if (contentType === 'movie') {
        finalCategory = 'Phim lịch sử';
        detectedType = 'video';
      }

      const lesson = TEXTBOOK_LESSONS.find((l) => l.code === lessonCode);
      const period = HISTORICAL_PERIODS.find((p) => p.id === periodId);

      const questionData = contentType === 'quiz_game' ? {
        question: title.trim(),
        options: [
          quizOptA.trim() || 'Phương án A',
          quizOptB.trim() || 'Phương án B',
          quizOptC.trim() || 'Phương án C',
          quizOptD.trim() || 'Phương án D',
        ],
        correctIndex: quizCorrectIndex,
        explanation: description.trim() || 'Theo chuẩn chương trình Lịch sử & Địa lí GDPT 2018.',
        source: source || 'SGK Lịch sử và Địa lí 4-5',
        truthLayer: 'verified',
        grade,
        lessonCode,
        lessonTitle: lesson ? lesson.title : ''
      } : undefined;

      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          grade,
          lessonCode,
          lessonTitle: lesson ? lesson.title : '',
          category: finalCategory,
          type: detectedType,
          author: authorName,
          authorEmail: currentUser.email || 'pham.thanhh212@gmail.com',
          url: finalUrl,
          downloadUrl: uploadMethod === 'file' ? finalUrl : '',
          description: description + (directContent ? `\n\nNội dung: ${directContent}` : ''),
          source,
          license,
          periodTitle: period ? period.title : '',
          relatedEvent,
          relatedFigure,
          publishYear,
          sourceUrl,
          questionData,
          status: currentUser.role === 'admin' ? 'published' : status,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lưu học liệu thất bại.');
      }

      setSuccessMsg(
        status === 'draft'
          ? 'Đã lưu bản nháp thành công!'
          : data.message || 'Tư liệu đã được lưu thành công trên hệ thống!'
      );

      setTimeout(() => {
        onUploadSuccess();
        onClose();
      }, 1400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi khi lưu học liệu.');
    } finally {
      setLoading(false);
    }
  };

  const filteredLessons = TEXTBOOK_LESSONS.filter((l) => l.grade === grade);

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-[#fffdfa] rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border-2 border-[#e8d7be] overflow-hidden flex flex-col max-h-[94vh]">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30 pointer-events-none" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#eedec7] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <DongSonStar size={16} className="text-amber-700" />
              <span>Chế độ Giáo viên · Quản lý học liệu số</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03] mt-0.5">
              + TẢI TƯ LIỆU LỊCH SỬ LÊN
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Modal Form Scrollable Area */}
        <div className="overflow-y-auto flex-1 py-4 space-y-5 text-xs">
          {/* SECTION 1: THÔNG TIN CƠ BẢN */}
          <div className="p-4 rounded-2xl bg-[#faf5ec] border border-[#eedec7] space-y-3">
            <h3 className="font-bold text-[#451a03] text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>1. Thông tin cơ bản về tư liệu</span>
            </h3>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Tên tư liệu / Tiêu đề bài giảng *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Lược đồ trận chiến Bạch Đằng năm 938 và bãi cọc Cao Quỳ"
                className="w-full p-2.5 rounded-xl border border-[#d6be9e] focus:ring-2 focus:ring-amber-500 bg-white text-xs font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Khối lớp *</label>
                <select
                  value={grade}
                  onChange={(e) => {
                    const g = Number(e.target.value) as 4 | 5;
                    setGrade(g);
                    const first = TEXTBOOK_LESSONS.find((l) => l.grade === g);
                    if (first) setLessonCode(first.code);
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white font-bold text-amber-900"
                >
                  <option value={4}>Lịch sử và Địa lí Lớp 4</option>
                  <option value={5}>Lịch sử và Địa lí Lớp 5</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tên bài học SGK Kết nối tri thức *</label>
                <select
                  value={lessonCode}
                  onChange={(e) => setLessonCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white text-stone-800"
                >
                  {filteredLessons.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.code} - {l.title.slice(0, 36)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Giai đoạn lịch sử</label>
                <select
                  value={periodId}
                  onChange={(e) => setPeriodId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white text-stone-800"
                >
                  {HISTORICAL_PERIODS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.number}. {p.title.slice(0, 28)}...
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Sự kiện lịch sử liên quan</label>
                <input
                  type="text"
                  value={relatedEvent}
                  onChange={(e) => setRelatedEvent(e.target.value)}
                  placeholder="Ví dụ: Chiến thắng Bạch Đằng"
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Nhân vật lịch sử liên quan</label>
                <input
                  type="text"
                  value={relatedFigure}
                  onChange={(e) => setRelatedFigure(e.target.value)}
                  placeholder="Ví dụ: Ngô Quyền"
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: LOẠI NỘI DUNG ĐĂNG TẢI */}
          <div className="p-4 rounded-2xl bg-[#faf5ec] border border-[#eedec7] space-y-3">
            <h3 className="font-bold text-[#451a03] text-sm flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-800" />
              <span>2. Loại nội dung đăng tải</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {contentTypesList.map((ct) => (
                <button
                  key={ct.id}
                  type="button"
                  onClick={() => setContentType(ct.id as any)}
                  className={`p-2 rounded-xl text-left border text-xs font-semibold transition-all ${
                    contentType === ct.id
                      ? 'bg-amber-800 text-white border-amber-800 shadow-2xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {ct.label}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 2B: CHI TIẾT CÂU HỎI TRẮC NGHIỆM */}
          {contentType === 'quiz_game' && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 space-y-3 animate-in fade-in">
              <h3 className="font-bold text-[#451a03] text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Nội dung 4 phương án trắc nghiệm</span>
              </h3>
              <p className="text-[11px] text-stone-600">
                Tiêu đề tư liệu ở Mục 1 chính là câu hỏi trắc nghiệm. Vui lòng nhập 4 phương án và bấm vào chữ cái (A, B, C, D) để chọn đáp án đúng:
              </p>

              <div className="space-y-2.5">
                {[
                  { key: 0, label: 'A', value: quizOptA, setter: setQuizOptA },
                  { key: 1, label: 'B', value: quizOptB, setter: setQuizOptB },
                  { key: 2, label: 'C', value: quizOptC, setter: setQuizOptC },
                  { key: 3, label: 'D', value: quizOptD, setter: setQuizOptD },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuizCorrectIndex(item.key)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 flex items-center justify-center transition-all ${
                        quizCorrectIndex === item.key
                          ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-300'
                          : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                      }`}
                      title={quizCorrectIndex === item.key ? 'Đáp án đúng' : 'Bấm để chọn làm đáp án đúng'}
                    >
                      {item.label}
                    </button>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      placeholder={`Nội dung phương án ${item.label}...`}
                      className={`flex-1 p-2 rounded-xl border text-xs bg-white ${
                        quizCorrectIndex === item.key ? 'border-emerald-500 ring-1 ring-emerald-400 font-semibold' : 'border-[#d6be9e]'
                      }`}
                    />
                    {quizCorrectIndex === item.key && (
                      <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                        ✓ Đúng
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: HÌNH THỨC TẢI LÊN */}
          <div className="p-4 rounded-2xl bg-[#faf5ec] border border-[#eedec7] space-y-3">
            <h3 className="font-bold text-[#451a03] text-sm flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-amber-800" />
              <span>3. Hình thức tải lên</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'file', label: 'Tải file từ máy' },
                { id: 'direct_text', label: 'Nhập trực tiếp' },
                { id: 'drive', label: 'Google Drive' },
                { id: 'youtube', label: 'Video YouTube' },
                { id: 'website', label: 'Liên kết website' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setUploadMethod(m.id as any)}
                  className={`p-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                    uploadMethod === m.id
                      ? 'bg-amber-800 text-white border-amber-800 shadow-2xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {uploadMethod === 'file' && (
              <div className="p-3 bg-white rounded-xl border border-[#d6be9e] space-y-1.5">
                <input
                  type="file"
                  accept=".pdf,.docx,.pptx,.jpg,.jpeg,.png,.webp,.mp4"
                  onChange={handleFileChange}
                  className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-700 file:text-white hover:file:bg-amber-800 cursor-pointer"
                />
                <div className="text-[11px] text-stone-500">
                  Hỗ trợ định dạng: <strong>PDF, DOCX, PPTX, JPG, PNG, WebP, MP4</strong> (Tối đa 25MB lưu trữ thực tế trên máy chủ).
                </div>
              </div>
            )}

            {uploadMethod === 'direct_text' && (
              <div>
                <label className="font-bold text-stone-700 block mb-1">Nội dung văn bản / tư liệu</label>
                <textarea
                  rows={4}
                  value={directContent}
                  onChange={(e) => setDirectContent(e.target.value)}
                  placeholder="Nhập hoặc dán nội dung bài học, trích lục sử liệu, câu chuyện lịch sử..."
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white font-sans"
                />
              </div>
            )}

            {(uploadMethod === 'drive' || uploadMethod === 'youtube' || uploadMethod === 'website') && (
              <div>
                <label className="font-bold text-stone-700 block mb-1">Đường dẫn liên kết *</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder={
                    uploadMethod === 'youtube'
                      ? 'https://www.youtube.com/watch?v=...'
                      : uploadMethod === 'drive'
                      ? 'https://drive.google.com/file/d/...'
                      : 'https://baotanglichsu.vn/...'
                  }
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                />
              </div>
            )}

            <div>
              <label className="font-bold text-stone-700 block mb-1">Mô tả tóm tắt nội dung và mục đích sư phạm</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tóm tắt nội dung, số trang, hướng dẫn học sinh quan sát và thảo luận..."
                className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
              />
            </div>
          </div>

          {/* SECTION 4: THÔNG TIN XÁC THỰC & BẢN QUYỀN */}
          <div className="p-4 rounded-2xl bg-[#faf5ec] border border-[#eedec7] space-y-3">
            <h3 className="font-bold text-[#451a03] text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>4. Thông tin xác thực & Giấy phép sử dụng</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Tác giả / Cơ quan cung cấp *</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Nguồn tham khảo đối chiếu</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Đường dẫn nguồn gốc (nếu có)</label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Ghi chú bản quyền & Giấy phép</label>
                <input
                  type="text"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                />
              </div>
            </div>
          </div>

          {/* PREVIEW BOX */}
          {isPreviewOpen && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <span className="font-bold text-[#451a03] text-sm">Xem trước thẻ hiển thị học sinh</span>
                <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-[10px] font-bold">
                  Bản xem trước
                </span>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-[#451a03]">{title || 'Tiêu đề tư liệu'}</div>
                <div className="text-[11px] text-amber-900">
                  Lớp {grade} · Bài {lessonCode} · Chuyên mục: {contentTypesList.find((c) => c.id === contentType)?.label}
                </div>
                <div className="text-xs text-stone-700 pt-1">
                  {description || 'Chưa có mô tả tóm tắt.'}
                </div>
                <div className="text-[10px] text-stone-500 pt-1">
                  Tác giả: {authorName} · Nguồn: {source} · Giấy phép: {license}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: CÁC NÚT CHỨC NĂNG */}
        <div className="pt-3 border-t border-[#eedec7] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="px-3.5 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-stone-600" />
              <span>{isPreviewOpen ? 'Đóng xem trước' : 'Xem trước'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveMaterial('draft')}
              disabled={loading}
              className="px-3.5 py-2 border border-amber-300 hover:bg-amber-50 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-amber-700" />
              <span>Lưu bản nháp</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl font-bold text-xs"
            >
              Hủy
            </button>

            <button
              type="button"
              onClick={() => handleSaveMaterial('pending_approval')}
              disabled={loading}
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>
                {loading
                  ? 'Đang tải lên...'
                  : currentUser.role === 'admin'
                  ? 'Xuất bản trực tiếp'
                  : 'Gửi kiểm duyệt'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
