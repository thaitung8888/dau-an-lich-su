import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  FileImage,
  RefreshCw,
  Library,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import { DongSonCorner, DongSonStar } from '../DongSonMotif';
import {
  HistoryIllustrationItem,
  HISTORICAL_PERIOD_OPTIONS,
  ILLUSTRATION_CATEGORIES,
} from '../../data/historyIllustrationsData';
import { UserProfile } from '../../types';

interface AddIllustrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
  onAddIllustration: (newIllustration: HistoryIllustrationItem) => Promise<void> | void;
}

export const AddIllustrationModal: React.FC<AddIllustrationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddIllustration,
}) => {
  const [sourceType, setSourceType] = useState<'upload' | 'url' | 'sample'>('upload');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [periodCode, setPeriodCode] = useState<string>('GD01');
  const [category, setCategory] = useState<HistoryIllustrationItem['category']>('Trận đánh & Khởi nghĩa');
  const [type, setType] = useState<HistoryIllustrationItem['type']>('illustration');
  const [caption, setCaption] = useState<string>('');
  const [authorOrProvider, setAuthorOrProvider] = useState<string>(
    currentUser?.name ? `Sưu tầm bởi ${currentUser.name}` : 'Giáo viên sưu tầm'
  );
  const [sourceName, setSourceName] = useState<string>('Bảo tàng Lịch sử quốc gia & SGK GDPT 2018');
  const [license, setLicense] = useState<string>('Giáo dục mở CC BY-NC-SA 4.0');
  const [historicalSignificance, setHistoricalSignificance] = useState<string>('');
  const [reflectionQuestion, setReflectionQuestion] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Vui lòng chỉ chọn tệp hình ảnh hợp lệ (JPG, PNG, WebP, SVG, GIF).');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('Dung lượng tệp vượt quá 20MB. Vui lòng chọn tệp nhỏ hơn.');
      return;
    }

    setSelectedFileName(file.name);
    setErrorMessage('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImageUrl(dataUrl);
      setPreviewUrl(dataUrl);
      if (!title) {
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        setTitle(`Tranh minh họa: ${cleanName}`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Sample image options
  const PRESET_SAMPLES = [
    {
      title: 'Tranh minh họa: Ngô Quyền cắm cọc Bạch Đằng',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Coc_go_Bach_Dang.jpg/800px-Coc_go_Bach_Dang.jpg',
      periodCode: 'GD02',
      category: 'Trận đánh & Khởi nghĩa' as const,
      caption: 'Bãi cọc gỗ ngầm đẽo vát bịt sắt nhọn trên sông Bạch Đằng năm 938.',
      significance: 'Đánh tan thủy quân Nam Hán, kết thúc 1.000 năm Bắc thuộc.',
    },
    {
      title: 'Tượng đài Lý Thái Tổ dời đô Thăng Long (Hà Nội)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ly_Thai_To_statue_Hanoi.jpg/800px-Ly_Thai_To_statue_Hanoi.jpg',
      periodCode: 'GD04',
      category: 'Danh nhân & Anh hùng' as const,
      caption: 'Tượng đài Vua Lý Thái Tổ uy nghiêm tại vườn hoa Chí Linh bên hồ Hoàn Kiếm.',
      significance: 'Quyết định dời đô về Đại La năm 1010 khai sáng nghìn năm văn hiến Thăng Long - Hà Nội.',
    },
    {
      title: 'Tranh dân gian: Thánh Gióng nhổ tre đánh giặc Ân',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Thanh_Giong_Soc_Son.jpg/800px-Thanh_Giong_Soc_Son.jpg',
      periodCode: 'GD01',
      category: 'Huyền thoại cội nguồn' as const,
      caption: 'Biểu tượng người anh hùng làng Gióng bay về trời sau khi dẹp tan giặc ngoại xâm.',
      significance: 'Sức mạnh quật khởi của tuổi trẻ Việt Nam khi Tổ quốc lâm nguy.',
    },
    {
      title: 'Khuê Văn Các - Đỉnh cao hiếu học đất Thăng Long',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Khue_Van_Cac_Hanoi.jpg/800px-Khue_Van_Cac_Hanoi.jpg',
      periodCode: 'GD06',
      category: 'Di tích & Cổ vật' as const,
      caption: 'Khuê Văn Các tại Văn Miếu - Quốc Tử Giám, biểu tượng văn hóa thủ đô Hà Nội.',
      significance: 'Tôn vinh truyền thống tôn sư trọng đạo và hiền tài là nguyên khí quốc gia.',
    },
  ];

  const handleSelectSample = (sample: typeof PRESET_SAMPLES[0]) => {
    setImageUrl(sample.url);
    setPreviewUrl(sample.url);
    setTitle(sample.title);
    setPeriodCode(sample.periodCode);
    setCategory(sample.category);
    setCaption(sample.caption);
    setHistoricalSignificance(sample.significance);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tên tranh hoặc hình ảnh minh họa.');
      return;
    }

    const finalUrl = previewUrl || imageUrl;
    if (!finalUrl.trim()) {
      setErrorMessage('Vui lòng tải lên một tệp ảnh hoặc nhập đường dẫn URL hình ảnh.');
      return;
    }

    if (!historicalSignificance.trim()) {
      setErrorMessage('Vui lòng nhập tóm tắt ý nghĩa lịch sử hoặc chú giải cho học sinh.');
      return;
    }

    setIsSubmitting(true);

    try {
      let finalPublicUrl = finalUrl;

      // If user uploaded a local file and server upload endpoint is available, attempt upload
      if (finalUrl.startsWith('data:') && selectedFileName) {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: selectedFileName,
              fileData: finalUrl,
              fileType: 'image/jpeg',
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.fileUrl) {
              finalPublicUrl = data.fileUrl;
            }
          }
        } catch (uploadErr) {
          console.warn('Could not upload to server /api/upload, keeping base64 dataUrl', uploadErr);
        }
      }

      const selectedPeriod = HISTORICAL_PERIOD_OPTIONS.find((p) => p.code === periodCode);

      const getTypeLabel = (t: string): HistoryIllustrationItem['typeLabel'] => {
        switch (t) {
          case 'archive_photo':
            return 'Ảnh tư liệu lịch sử';
          case 'museum_artifact':
            return 'Hiện vật bảo tàng';
          case 'relic_site':
            return 'Di tích thực tế';
          default:
            return 'Tranh minh họa';
        }
      };

      const newIllustration: HistoryIllustrationItem = {
        id: `ill-user-${Date.now()}`,
        title: title.trim(),
        url: finalPublicUrl,
        type,
        typeLabel: getTypeLabel(type),
        periodCode,
        periodName: selectedPeriod ? selectedPeriod.name : 'Lịch sử Việt Nam',
        category,
        caption: caption.trim() || title.trim(),
        authorOrProvider: authorOrProvider.trim() || 'Giáo viên sưu tầm',
        sourceName: sourceName.trim() || 'Bảo tàng Lịch sử quốc gia',
        license: license.trim() || 'Giáo dục mở CC BY-NC-SA 4.0',
        details: historicalSignificance.trim(),
        historicalSignificance: historicalSignificance.trim(),
        reflectionQuestion: reflectionQuestion.trim() || undefined,
        isUserAdded: true,
      };

      await onAddIllustration(newIllustration);

      setSuccessToast('Đã thêm ảnh minh họa thành công vào Kho tư liệu!');
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      console.error('Error adding illustration:', err);
      setErrorMessage(err.message || 'Không thể thêm ảnh minh họa. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-[#fffdfa] rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border-2 border-[#e8d7be] overflow-hidden flex flex-col max-h-[92vh]">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/25 pointer-events-none" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/25 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#eedec7] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-xs">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                <DongSonStar size={13} className="text-amber-700" />
                <span>Đóng góp tư liệu hình ảnh minh họa</span>
              </div>
              <h2 className="font-display text-xl font-bold text-[#451a03]">
                Thêm Hình Ảnh Minh Họa Lịch Sử Mới
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
            title="Đóng modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <form onSubmit={handleSubmit} className="overflow-y-auto py-5 space-y-6 pr-1 custom-scrollbar">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successToast && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {/* 1. Nguồn chọn ảnh: Tải lên, URL, hay Mẫu có sẵn */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-950 uppercase tracking-wide">
              1. Phương thức cung cấp hình ảnh minh họa <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSourceType('upload')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  sourceType === 'upload'
                    ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Tải ảnh từ máy tính</span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType('url')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  sourceType === 'url'
                    ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                <span>Nhập đường link ảnh</span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType('sample')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  sourceType === 'sample'
                    ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
                }`}
              >
                <Library className="w-4 h-4" />
                <span>Chọn ảnh mẫu gợi ý</span>
              </button>
            </div>

            {/* Input per source type */}
            {sourceType === 'upload' && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 border-2 border-dashed border-amber-300 hover:border-amber-500 bg-[#fffcf7] hover:bg-amber-50/50 p-6 rounded-2xl text-center cursor-pointer transition-colors space-y-2"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
                  className="hidden"
                />
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                  <FileImage className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-stone-800">
                  {selectedFileName ? (
                    <span className="text-emerald-700 font-extrabold">Đã chọn: {selectedFileName}</span>
                  ) : (
                    'Nhấn để chọn tệp ảnh hoặc kéo thả hình ảnh vào đây'
                  )}
                </div>
                <p className="text-[11px] text-stone-500">
                  Hỗ trợ định dạng JPG, PNG, WebP, SVG, GIF (Tối đa 20MB)
                </p>
              </div>
            )}

            {sourceType === 'url' && (
              <div className="mt-2 space-y-2">
                <div className="relative">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="https://example.com/hinh-anh-minh-hoa.jpg"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('');
                        setPreviewUrl('');
                      }}
                      className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-stone-500">
                  Có thể dán liên kết ảnh từ Wikimedia Commons, Bảo tàng Lịch sử hoặc trang giáo dục.
                </p>
              </div>
            )}

            {sourceType === 'sample' && (
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRESET_SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="p-2 rounded-xl bg-white border border-stone-200 hover:border-amber-500 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-stone-100 mb-1.5">
                      <img
                        src={sample.url}
                        alt={sample.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-stone-800 line-clamp-2 leading-tight">
                      {sample.title}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Live Image Preview Card */}
            {previewUrl && (
              <div className="p-3 bg-stone-100/80 rounded-2xl border border-stone-300 flex items-center gap-3">
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-300">
                  <img
                    src={previewUrl}
                    alt="Xem trước ảnh"
                    className="w-full h-full object-cover"
                    onError={() => setErrorMessage('Đường dẫn ảnh không tải được. Vui lòng kiểm tra lại URL.')}
                  />
                </div>
                <div className="text-xs text-stone-700 flex-1 min-w-0">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hình ảnh hợp lệ sẵn sàng hiển thị</span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {previewUrl.startsWith('data:') ? 'Ảnh từ máy tính của bạn' : previewUrl}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 2. Thông tin mô tả cơ bản */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-bold text-stone-800">
                Tên tranh hoặc hình ảnh minh họa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Tranh minh họa: Ngô Quyền cắm cọc gỗ trên sông Bạch Đằng năm 938"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Giai đoạn lịch sử <span className="text-red-500">*</span>
              </label>
              <select
                value={periodCode}
                onChange={(e) => setPeriodCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                {HISTORICAL_PERIOD_OPTIONS.filter((p) => p.code !== 'ALL').map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Chuyên mục minh họa <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                {ILLUSTRATION_CATEGORIES.filter((c) => c !== 'Tất cả').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Loại tư liệu trực quan
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="illustration">Tranh minh họa lịch sử</option>
                <option value="archive_photo">Ảnh tư liệu lịch sử</option>
                <option value="museum_artifact">Hiện vật bảo tàng</option>
                <option value="relic_site">Di tích thực tế</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Họa sĩ / Tác giả / Đơn vị cung cấp
              </label>
              <input
                type="text"
                value={authorOrProvider}
                onChange={(e) => setAuthorOrProvider(e.target.value)}
                placeholder="Ví dụ: Họa sĩ SGK, Bảo tàng Lịch sử QG, Nghệ nhân dân gian"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* 3. Mô tả & Ý nghĩa giáo dục */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Lời chú giải ngắn gọn hiển thị trên thẻ ảnh
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Ví dụ: Trận địa cọc gỗ ngầm bịt sắt của Ngô Quyền trên dòng sông Bạch Đằng năm 938."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Mô tả chi tiết & Ý nghĩa lịch sử dành cho học sinh <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={historicalSignificance}
                onChange={(e) => setHistoricalSignificance(e.target.value)}
                placeholder="Giải thích bối cảnh, nhân vật hoặc chiến công được mô tả trong tranh để học sinh dễ hiểu và ghi nhớ sâu sắc..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Câu hỏi tư duy / gợi mở cho học sinh (Tùy chọn)
              </label>
              <input
                type="text"
                value={reflectionQuestion}
                onChange={(e) => setReflectionQuestion(e.target.value)}
                placeholder="Ví dụ: Việc vận dụng thủy triều cho thấy sự mưu lược như thế nào của Ngô Quyền?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* 4. Nguồn trích dẫn & Bản quyền */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Nguồn trích dẫn / Căn cứ tư liệu
              </label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="SGK Lịch sử & Địa lí, Bảo tàng, Viện Sử học..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                Giấy phép & Quyền sử dụng
              </label>
              <input
                type="text"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="Giáo dục mở CC BY-NC-SA 4.0"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#eedec7] shrink-0 mt-auto">
          <div className="text-[11px] text-stone-500 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Hình ảnh sẽ được kiểm duyệt sư phạm và hiển thị trong Kho tư liệu ảnh</span>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lưu & Thêm ảnh minh họa</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
