import React, { useState } from 'react';
import { CmsMediaItem } from '../../types';
import { X, Upload, Check, Image as ImageIcon, Video, Search, Plus, ExternalLink } from 'lucide-react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaList: CmsMediaItem[];
  onSelectMedia: (mediaUrl: string, mediaItem?: CmsMediaItem) => void;
  mediaTypeFilter?: 'all' | 'image' | 'video';
  onQuickUploadNew?: (file: File) => Promise<string | null>;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  mediaList,
  onSelectMedia,
  mediaTypeFilter = 'all',
  onQuickUploadNew
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemUrl, setSelectedItemUrl] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CmsMediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((m) => {
    if (mediaTypeFilter === 'image' && m.type !== 'image') return false;
    if (mediaTypeFilter === 'video' && m.type !== 'video_file' && m.type !== 'video_youtube') return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      (m.caption && m.caption.toLowerCase().includes(q)) ||
      (m.source && m.source.toLowerCase().includes(q))
    );
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onQuickUploadNew) return;
    setIsUploading(true);
    try {
      const url = await onQuickUploadNew(file);
      if (url) {
        onSelectMedia(url);
        onClose();
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmSelect = () => {
    if (selectedItemUrl) {
      onSelectMedia(selectedItemUrl, selectedItem || undefined);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-2 border-amber-300">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-900 to-[#451a03] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-display text-lg font-bold">
                Chọn tư liệu từ "Kho tư liệu của tôi"
              </h3>
              <p className="text-xs text-amber-200/80">
                Tái sử dụng hình ảnh và video đã tải lên mà không cần tải lại nhiều lần
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-amber-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search and Upload direct */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm tư liệu theo tiêu đề, nguồn, chú thích..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {onQuickUploadNew && (
            <label className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-2xs shrink-0">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Đang tải lên...' : '+ Tải tệp mới từ máy'}</span>
              <input
                type="file"
                className="hidden"
                accept={mediaTypeFilter === 'video' ? 'video/mp4,video/webm' : 'image/*,video/mp4'}
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          )}
        </div>

        {/* Media Grid */}
        <div className="p-5 flex-1 overflow-y-auto">
          {filteredMedia.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ImageIcon className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm text-stone-500 font-medium">
                Chưa có tư liệu phù hợp trong thư viện.
              </p>
              <p className="text-xs text-stone-400">
                Hãy nhấn nút "+ Tải tệp mới từ máy" ở trên để tải trực tiếp lên!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedia.map((item) => {
                const isSelected = selectedItemUrl === item.url;
                const isVideo = item.type === 'video_file' || item.type === 'video_youtube';
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedItemUrl(item.url);
                      setSelectedItem(item);
                    }}
                    className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all flex flex-col bg-stone-50 ${
                      isSelected
                        ? 'border-amber-600 ring-2 ring-amber-500/40 shadow-md scale-[1.02]'
                        : 'border-stone-200 hover:border-amber-400 shadow-2xs'
                    }`}
                  >
                    {/* Media Preview Box */}
                    <div className="aspect-video bg-stone-900 relative overflow-hidden flex items-center justify-center">
                      {isVideo ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-amber-300 p-2">
                          <Video className="w-8 h-8 mb-1" />
                          <span className="text-[10px] font-mono text-center truncate max-w-full px-1">
                            {item.type === 'video_youtube' ? 'YouTube' : 'Video MP4'}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      )}

                      {/* Selected tick badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                      )}
                    </div>

                    {/* Media Info */}
                    <div className="p-2.5 text-xs flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-stone-900 line-clamp-1">{item.title}</h4>
                        {item.caption && (
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.caption}</p>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1.5 truncate">
                        {item.source || 'Kho tư liệu'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-600">
            {selectedItemUrl ? (
              <span className="text-amber-900 font-bold">
                Đã chọn: {selectedItem?.title || 'Tư liệu'}
              </span>
            ) : (
              <span>Vui lòng nhấp vào tư liệu bạn muốn sử dụng</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-200 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmSelect}
              disabled={!selectedItemUrl}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedItemUrl
                  ? 'bg-amber-800 hover:bg-amber-900 text-white shadow-xs'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              Chọn tư liệu này
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
