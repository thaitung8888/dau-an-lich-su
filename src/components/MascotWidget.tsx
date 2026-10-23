import React, { useState } from 'react';
import { BanSuNhiAvatar } from './DongSonMotif';
import { MessageSquare, X, ChevronRight, Sparkles } from 'lucide-react';

interface MascotWidgetProps {
  onOpenChat: () => void;
  isMuted: boolean;
}

export const MascotWidget: React.FC<MascotWidgetProps> = ({ onOpenChat }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const hints = [
    'Chào bạn nhỏ! Bạn có biết cọc gỗ Bạch Đằng năm 938 được làm từ gỗ gì không?',
    'Thành Cổ Loa có 3 vòng thành xoáy trôn ốc đất rất độc đáo đấy!',
    'Bạn muốn nghe tớ kể về Hai Bà Trưng hay giải câu đố Thám tử sử liệu?',
    'Nhớ kiểm tra "Ba lớp sự thật" để phân biệt truyền thuyết và sử liệu nhé!'
  ];

  const handleNextHint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHintIndex((prev) => (prev + 1) % hints.length);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-3 pointer-events-none">
      {/* Speech bubble */}
      {!isDismissed && (
        <div className="pointer-events-auto max-w-xs bg-white p-3.5 rounded-2xl shadow-lg border border-purple-200 text-xs text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between pb-1.5 border-b border-purple-100 mb-1.5 text-purple-900 font-semibold">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Bạn Sử Nhí mách nhỏ:</span>
            </div>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
              title="Đóng lời nhắc"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="leading-relaxed text-slate-700">{hints[hintIndex]}</p>
          <div className="mt-2 pt-2 border-t border-purple-50 flex items-center justify-between">
            <button
              onClick={handleNextHint}
              className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center gap-0.5"
            >
              <span>Xem gợi ý khác</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={onOpenChat}
              className="bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1 rounded-md font-medium text-[11px] shadow-xs"
            >
              Hỏi đáp ngay
            </button>
          </div>
        </div>
      )}

      {/* Floating Mascot Button */}
      <button
        onClick={onOpenChat}
        className="pointer-events-auto relative group rounded-2xl p-1 bg-white shadow-xl border-2 border-purple-300 hover:border-purple-500 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200"
        title="Trò chuyện cùng Bạn Sử Nhí AI"
      >
        <BanSuNhiAvatar size={54} />
        <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-xs animate-bounce">
          <MessageSquare className="w-3 h-3" />
        </span>
      </button>
    </div>
  );
};
