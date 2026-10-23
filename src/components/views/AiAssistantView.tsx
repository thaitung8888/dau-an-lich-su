import React, { useState } from 'react';
import { BanSuNhiAvatar } from '../DongSonMotif';
import {
  Send,
  Sparkles,
  BookOpen,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string;
  evidenceClass?: string;
  reflectionQuestion?: string;
  mode?: string;
  timestamp: string;
}

interface AiAssistantViewProps {
  initialPrompt?: string;
  initialContext?: any;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  initialPrompt,
  initialContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Chào bạn nhỏ thân mến! Tớ là Bạn Sử Nhí – người bạn đồng hành khám phá Lịch sử Việt Nam của bạn. Tớ luôn trả lời có dẫn nguồn từ sách giáo khoa và chia sẻ theo nguyên tắc "Ba lớp sự thật". Bạn muốn tớ giải thích ngắn, kể chuyện truyền cảm hay cùng phá án thám tử sử liệu?',
      sources: 'Bộ SGK Lịch sử và Địa lí 4 & 5 (Kết nối tri thức với cuộc sống)',
      evidenceClass: 'Đã kiểm chứng',
      reflectionQuestion: 'Hôm nay bạn muốn cùng tớ tìm hiểu về thời kì nào?',
      timestamp: 'Vừa xong',
    },
  ]);

  const [inputMessage, setInputMessage] = useState(initialPrompt || '');
  const [activeMode, setActiveMode] = useState<'explain' | 'story' | 'detective' | 'review'>('explain');
  const [grade, setGrade] = useState<4 | 5>(4);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const samplePrompts = [
    'Vì sao Ngô Quyền lại cắm cọc gỗ trên sông Bạch Đằng năm 938?',
    'Kể chuyện về lòng quả cảm của Hai Bà Trưng khi xuất quân ở Hát Môn.',
    'Thành Cổ Loa có thật sự bắn được nỏ thần nhiều mũi tên không?',
    'Ý nghĩa của ngày Quốc khánh 2-9-1945 tại Quảng trường Ba Đình là gì?',
    'Chiếc xe tăng 390 húc đổ cổng Dinh Độc Lập vào thời khắc nào?',
    'Phân biệt truyền thuyết Thánh Gióng với sự thật lịch sử thời Hùng Vương.'
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          mode: activeMode,
          grade,
          lessonTitle: initialContext?.lessonTitle || initialContext?.lessonCode || 'Lịch sử Việt Nam',
        }),
      });

      if (!response.ok) {
        throw new Error('Server response error');
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: data.reply || 'Bạn Sử Nhí chưa tìm thấy tài liệu phù hợp cho câu hỏi này.',
        sources: data.sources,
        evidenceClass: data.evidenceClass,
        reflectionQuestion: data.reflectionQuestion,
        mode: activeMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: 'Bạn Sử Nhí đang tra cứu lại kho tư liệu giáo dục. Bạn kiểm tra lại kết nối mạng hoặc thử lại sau một chút nhé!',
        sources: 'Hệ thống Dấu Ấn Non Sông',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Deck */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-purple-100">
          <div className="flex items-center gap-4">
            <BanSuNhiAvatar size={52} />
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider">
                <span>Trợ lí AI giáo dục lịch sử</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 font-normal">Bộ sách Kết nối tri thức</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                Bạn Sử Nhí AI
              </h1>
            </div>
          </div>

          {/* Grade selection */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-600">Độ tuổi học sinh:</span>
            <div className="flex p-1 bg-purple-50 rounded-xl border border-purple-200">
              <button
                onClick={() => setGrade(4)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  grade === 4 ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
                }`}
              >
                Lớp 4 (9-10 tuổi)
              </button>
              <button
                onClick={() => setGrade(5)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  grade === 5 ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
                }`}
              >
                Lớp 5 (10-11 tuổi)
              </button>
            </div>
          </div>
        </div>

        {/* 4 Inquiry Modes as required by prompt */}
        <div className="mt-5 space-y-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Chọn 1 trong 4 chế độ trò chuyện:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveMode('explain')}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeMode === 'explain'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                  : 'bg-purple-50/60 hover:bg-purple-100 text-slate-700 border-purple-200'
              }`}
            >
              <span className="block text-sm font-bold">1. Giải thích ngắn</span>
              <span className="text-[11px] opacity-80 font-normal">Dễ hiểu, rõ ràng, gạch đầu dòng</span>
            </button>

            <button
              onClick={() => setActiveMode('story')}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeMode === 'story'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                  : 'bg-purple-50/60 hover:bg-purple-100 text-slate-700 border-purple-200'
              }`}
            >
              <span className="block text-sm font-bold">2. Kể chuyện lịch sử</span>
              <span className="text-[11px] opacity-80 font-normal">Truyền cảm, dán nhãn hư cấu</span>
            </button>

            <button
              onClick={() => setActiveMode('detective')}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeMode === 'detective'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                  : 'bg-purple-50/60 hover:bg-purple-100 text-slate-700 border-purple-200'
              }`}
            >
              <span className="block text-sm font-bold">3. Thám tử sử liệu</span>
              <span className="text-[11px] opacity-80 font-normal">Soi chứng cứ, phân tích sự thật</span>
            </button>

            <button
              onClick={() => setActiveMode('review')}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeMode === 'review'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                  : 'bg-purple-50/60 hover:bg-purple-100 text-slate-700 border-purple-200'
              }`}
            >
              <span className="block text-sm font-bold">4. Ôn tập gợi mở</span>
              <span className="text-[11px] opacity-80 font-normal">Tóm tắt 3 ý, câu hỏi suy ngẫm</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-xs min-h-[460px] flex flex-col justify-between space-y-6">
        <div className="space-y-6 overflow-y-auto max-h-[560px] pr-2">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isUser ? (
                  <BanSuNhiAvatar size={38} className="shrink-0 mt-1" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    Em
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-2xs space-y-3 ${
                    isUser
                      ? 'bg-purple-700 text-white rounded-tr-xs'
                      : 'bg-slate-50 border border-purple-100/80 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Metadata and Citations for Assistant */}
                  {!isUser && (
                    <div className="pt-3 border-t border-slate-200/60 space-y-2 text-xs">
                      {msg.evidenceClass && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-500">Lớp sự thật:</span>
                          <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded text-[11px]">
                            {msg.evidenceClass}
                          </span>
                        </div>
                      )}

                      {msg.sources && (
                        <div className="text-[11px] text-slate-500">
                          Nguồn sử liệu trích dẫn: <strong className="text-purple-900">{msg.sources}</strong>
                        </div>
                      )}

                      {msg.reflectionQuestion && (
                        <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs">
                          <strong className="block mb-0.5 text-amber-900">💡 Câu hỏi suy ngẫm cho em:</strong>
                          <span>{msg.reflectionQuestion}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                        <span>{msg.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyText(msg.text, msg.id)}
                            className="hover:text-purple-700 flex items-center gap-1"
                            title="Sao chép nội dung"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Đã chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Sao chép</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <BanSuNhiAvatar size={38} className="shrink-0 animate-pulse" />
              <div className="bg-purple-50 p-4 rounded-2xl rounded-tl-xs border border-purple-200 text-xs text-purple-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span>Bạn Sử Nhí đang tra cứu sử liệu sách giáo khoa và tổng hợp câu trả lời...</span>
              </div>
            </div>
          )}
        </div>

        {/* Sample questions suggestions */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-semibold text-slate-500">
            Gợi ý câu hỏi Bạn Sử Nhí trả lời chuẩn xác:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.slice(0, 4).map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-[11px] px-2.5 py-1 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 transition-colors text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="pt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={`Đặt câu hỏi lịch sử cho Bạn Sử Nhí (Chế độ: ${activeMode === 'explain' ? 'Giải thích ngắn' : activeMode === 'story' ? 'Kể chuyện' : activeMode === 'detective' ? 'Thám tử sử liệu' : 'Ôn tập'})...`}
              className="w-full text-xs sm:text-sm pl-4 pr-12 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="absolute right-2 p-2 bg-purple-700 hover:bg-purple-800 disabled:opacity-40 text-white rounded-lg transition-colors shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Trợ lí AI trả lời theo tài liệu SGK Kết nối tri thức và cơ quan khảo cổ quốc gia · An toàn cho học sinh lớp 4-5.
          </p>
        </div>
      </div>
    </div>
  );
};
