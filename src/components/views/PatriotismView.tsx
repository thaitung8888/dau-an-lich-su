import React, { useState, useEffect } from 'react';
import { INITIAL_PASSPORT_STAMPS } from '../../data/historyData';
import { PassportStamp } from '../../types';
import {
  Award,
  Shield,
  Heart,
  Sparkles,
  Send,
  CheckCircle2,
  BookOpen,
  Calendar,
  Share2,
  Medal,
  Check
} from 'lucide-react';
import { DongSonDrumSVG } from '../DongSonMotif';

interface PatriotismViewProps {
  userStamps: PassportStamp[];
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
}

export const PatriotismView: React.FC<PatriotismViewProps> = ({
  userStamps,
  onOpenAiWithPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'passport' | 'presenter' | 'good-deeds'>('passport');

  // Thuyết minh viên nhí state
  const [studentName, setStudentName] = useState('Em học sinh Lớp 4');
  const [topic, setTopic] = useState('Chiến thắng Bạch Đằng năm 938 của Ngô Quyền');
  const [script, setScript] = useState(
    'Kính chào quý thầy cô và các bạn! Hôm nay em xin được thuyết minh về chiến thắng Bạch Đằng năm 938. Cụ Ngô Quyền đã vô cùng mưu trí khi nắm bắt con nước thủy triều, cho vót nhọn cọc gỗ lim cắm sâu dưới lòng sông. Khi triều lên dụ thuyền giặc vào, lúc triều rút thuyền lớn của quân Nam Hán mắc cọc tan tành vỡ vụn. Chiến thắng này đã mở ra nền độc lập muôn đời cho đất nước ta. Em rất tự hào về truyền thống yêu nước của cha ông!'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<any>(null);

  // List of presenter submissions
  const [communityEntries, setCommunityEntries] = useState<any[]>([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/presenter-entries');
      if (res.ok) {
        const data = await res.json();
        setCommunityEntries(data);
      }
    } catch (err) {
      console.warn('Failed to load presenter entries');
    }
  };

  const handleSubmitScript = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!script.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/presenter-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          topic,
          script,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiFeedback(data.review);
        fetchEntries();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const unlockedCount = userStamps.filter((s) => s.unlocked).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-purple-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider">
              <span>Hành động & Lan tỏa</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">Trân trọng quá khứ - Yêu Tổ quốc</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Em yêu Tổ quốc
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              "Hiểu Sử Việt – Trân trọng quá khứ – Yêu Tổ quốc bằng việc làm hôm nay."
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-purple-50 rounded-xl border border-purple-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('passport')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === 'passport' ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
              }`}
            >
              Hộ chiếu Sử Việt ({unlockedCount}/{userStamps.length})
            </button>
            <button
              onClick={() => setActiveTab('presenter')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === 'presenter' ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
              }`}
            >
              Thuyết minh viên nhí
            </button>
            <button
              onClick={() => setActiveTab('good-deeds')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === 'good-deeds' ? 'bg-purple-700 text-white' : 'text-slate-700 hover:text-purple-900'
              }`}
            >
              Từ trang sử đến việc tốt
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: HỘ CHIẾU SỬ VIỆT (DIGITAL PASSPORT) */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-md">
            <div className="absolute right-4 -bottom-10 opacity-15 pointer-events-none">
              <DongSonDrumSVG size={220} />
            </div>

            <div className="relative z-10 max-w-xl space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold tracking-wide uppercase">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Hộ chiếu Khám phá Sử Việt của em</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Dấu Ấn Non Sông Passport
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                Mỗi mốc son lịch sử hoặc di tích em vượt qua sẽ được gắn một <strong>Tem mộc số</strong> kèm theo ghi chú kiến thức cốt lõi. Đây là cuốn sổ tay số đồng hành suốt năm học!
              </p>
              <div className="pt-2 text-xs text-amber-300 font-bold">
                Tiến độ: Đã mở khóa {unlockedCount} / {userStamps.length} Tem mộc quốc gia
              </div>
            </div>
          </div>

          {/* Grid of Stamps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userStamps.map((stamp) => (
              <div
                key={stamp.id}
                className={`relative rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  stamp.unlocked
                    ? 'bg-white border-purple-200 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-purple-800">
                      {stamp.periodTitle}
                    </span>
                    {stamp.unlocked ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Đã đóng dấu
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">
                        Chưa mở khóa
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900">
                    {stamp.siteOrMilestone}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {stamp.knowledgeNote}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{stamp.dateEarned ? `Ngày nhận: ${stamp.dateEarned}` : 'Cần hoàn thành bài học'}</span>
                  {stamp.unlocked && (
                    <button
                      onClick={() =>
                        onOpenAiWithPrompt(
                          `Kể thêm chi tiết thú vị về ${stamp.siteOrMilestone} cho Hộ chiếu Sử Việt của em.`
                        )
                      }
                      className="text-purple-700 font-semibold hover:underline"
                    >
                      Đọc thêm
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: THUYẾT MINH VIÊN NHÍ */}
      {activeTab === 'presenter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                Sân chơi học đường
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Em làm Thuyết minh viên nhí
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Tự tin soạn bài nói ngắn về nhân vật hoặc di tích lịch sử yêu thích. Bạn Sử Nhí AI sẽ lắng nghe, phân tích độ chuẩn xác và gửi lời khuyên ân cần!
              </p>
            </div>

            <form onSubmit={handleSubmitScript} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Tên học sinh / Bí danh *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Chủ đề bài thuyết minh *
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nội dung bài nói / bài viết của em (tối thiểu 1 đoạn ngắn) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Kính chào thầy cô và các bạn! Hôm nay em xin được thuyết minh về..."
                  className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 leading-relaxed text-xs sm:text-sm"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">
                  Gợi ý: Nêu thời gian, địa điểm, nhân vật và cảm xúc tự hào của em.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting || !script.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isSubmitting ? 'Đang chấm điểm...' : 'Gửi Bạn Sử Nhí nhận xét'}</span>
                </button>
              </div>
            </form>

            {/* AI Feedback Panel */}
            {aiFeedback && (
              <div className="mt-6 p-5 bg-gradient-to-br from-purple-50 to-indigo-50/70 rounded-2xl border border-purple-200 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-sm text-purple-950">
                      Nhận xét của Bạn Sử Nhí AI:
                    </span>
                  </div>
                  <span className="text-base font-extrabold text-purple-900 bg-white px-3 py-1 rounded-lg border border-purple-200 shadow-2xs font-mono">
                    {aiFeedback.score} / 100 điểm
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 space-y-2">
                  <p><strong>Đánh giá độ chuẩn xác:</strong> {aiFeedback.accuracyRating}</p>
                  <p><strong>Lời khen:</strong> {aiFeedback.praise}</p>
                  <p><strong>Góp ý rèn luyện thêm:</strong> {aiFeedback.suggestions}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Hall of Young Presenters (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-purple-100 p-6 shadow-xs space-y-4">
            <h3 className="font-display text-base font-bold text-slate-900">
              Bài thuyết minh tiêu biểu đã duyệt
            </h3>
            <p className="text-xs text-slate-500">
              Các bài thuyết minh hay của các bạn nhỏ khắp mọi miền Tổ quốc
            </p>

            <div className="space-y-3">
              {communityEntries.map((entry) => (
                <div key={entry.id} className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">{entry.studentName}</span>
                    <span className="font-mono font-bold text-amber-700 bg-white px-2 py-0.5 rounded border border-amber-200">
                      {entry.score} đ
                    </span>
                  </div>
                  <div className="text-slate-800 font-semibold">{entry.topic}</div>
                  <p className="text-slate-600 line-clamp-3 italic">"{entry.script}"</p>
                  <div className="pt-2 border-t border-purple-100 text-[11px] text-purple-700">
                    💡 Nhận xét: {entry.feedback}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TỪ TRANG SỬ ĐẾN VIỆC TỐT */}
      {activeTab === 'good-deeds' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-xs">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Hành động thiết thực - Yêu quê hương đất nước
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Lòng yêu nước không chỉ nằm trong trang sách mà bắt đầu từ những hành động nhỏ bé, thiết thực mỗi ngày của học sinh tiểu học.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h4 className="font-bold text-sm text-emerald-950">Chăm sóc di tích quê em</h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Cùng thầy cô và các bạn tham gia dọn dẹp vệ sinh, nhặt rác và quét lá tại nghĩa trang liệt sĩ hoặc di tích lịch sử địa phương.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h4 className="font-bold text-sm text-amber-950">Chia sẻ câu chuyện với gia đình</h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Kể lại cho ông bà, bố mẹ hoặc các em nhỏ nghe về một nhân vật lịch sử mà em yêu thích (như Hai Bà Trưng, Ngô Quyền, Bác Hồ...).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h4 className="font-bold text-sm text-purple-950">Trân trọng giá trị hòa bình</h4>
                <p className="text-xs text-purple-900 leading-relaxed">
                  Đoàn kết, yêu thương bạn bè trong lớp, không gây gổ đánh nhau và luôn biết nói lời cảm ơn, xin lỗi chân thành.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
