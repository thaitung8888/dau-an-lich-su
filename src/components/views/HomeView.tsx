import React, { useState } from 'react';
import {
  HISTORICAL_PERIODS,
  TODAY_IN_HISTORY_DATA,
  TEXTBOOK_LESSONS,
  RELIC_SITES,
  HISTORICAL_FIGURES
} from '../../data/historyData';
import {
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Crown,
  Building2,
  Flag,
  Medal,
  Award,
  Layers,
  HelpCircle,
  Play,
  Film,
  Users,
  Image as ImageIcon,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  Flame,
  Volume2
} from 'lucide-react';
import {
  BachDangStakesGraphic,
  DongSonDrumSVG,
  DongSonStar,
  ChimLacSVG,
  DongSonCorner,
  DongSonBorderBand,
  BanSuNhiAvatar
} from '../DongSonMotif';

interface HomeViewProps {
  onNavigate: (tab: string, context?: any) => void;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
}

// 4 High-impact historical spotlight milestones with authentic imagery
const SPOTLIGHT_MILESTONES = [
  {
    id: 'spot-bach-dang',
    title: 'Chiến Thắng Bạch Đằng (Năm 938)',
    subtitle: 'Ngô Quyền cắm cọc lim nhấn chìm hạm đội giặc Nam Hán',
    era: 'Thế kỉ X (Năm 938)',
    periodId: 'period-2',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbUSq-hjkOqFAcmh_YeYqy9mSZgTDtTmTWswpyhHtNw&s=10',
    tag: 'Mốc son chói lọi',
    tagColor: 'bg-amber-600',
    description: 'Chấm dứt hơn 1000 năm Bắc thuộc, mở ra kỷ nguyên độc lập tự chủ lâu dài cho muôn triệu người dân Việt Nam.',
    aiPrompt: 'Hãy giải thích cho em bí quyết chiến thuật cọc gỗ trên sông Bạch Đằng năm 938 của Ngô Quyền!'
  },
  {
    id: 'spot-thang-long',
    title: 'Chiếu Dời Đô Về Thăng Long (Năm 1010)',
    subtitle: 'Vua Lý Thái Tổ dời đô từ Hoa Lư về Đại La - Rồng Bay Lên',
    era: 'Thời nhà Lý (Năm 1010)',
    periodId: 'period-3',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-lnjqEEBDPCOuqmtkE5ZeTK9cu3CuQWuKhBZwzoOPRA&s=10',
    tag: 'Định đô ngàn năm',
    tagColor: 'bg-blue-600',
    description: 'Tầm nhìn chiến lược mở đầu thời kì phát triển rực rỡ văn minh Đại Việt và thủ đô ngàn năm văn hiến.',
    aiPrompt: 'Tại sao vua Lý Thái Tổ lại quyết định dời đô từ Hoa Lư về Thăng Long năm 1010?'
  },
  {
    id: 'spot-ba-dinh',
    title: 'Tuyên Ngôn Độc Lập (2/9/1945)',
    subtitle: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa',
    era: 'Thế kỉ XX (Năm 1945)',
    periodId: 'period-4',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHb_pabkMdodBnoRc7j2rShmA2p5BqDDlnHABVt_SMZA&s=10',
    tag: 'Quốc khánh 2-9',
    tagColor: 'bg-red-600',
    description: 'Tại Quảng trường Ba Đình lịch sử, Bác Hồ đọc Tuyên ngôn khẳng định toàn thể dân tộc Việt Nam quyết giữ vững nền tự do độc lập.',
    aiPrompt: 'Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình ngày 2-9-1945 có ý nghĩa thiêng liêng ra sao?'
  },
  {
    id: 'spot-dien-bien-phu',
    title: 'Chiến Thắng Điện Biên Phủ (7/5/1954)',
    subtitle: 'Lừng lẫy năm châu, chấn động địa cầu',
    era: 'Thời kỳ kháng chiến chống Pháp (1954)',
    periodId: 'period-5',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTepmTLbpZ-cgyEenO0yNbCn2B_Te0gAVca1HpdKEs5Gw&s=10',
    tag: 'Kỳ tích quân sự',
    tagColor: 'bg-emerald-600',
    description: '56 ngày đêm khoét núi, ngủ hầm, mưa dầm, cơm vắt, máu trộn bùn non để đập tan tập đoàn cứ điểm bất khả xâm phạm.',
    aiPrompt: 'Kể cho em nghe về tinh thần kéo pháo và chiến thắng Điện Biên Phủ ngày 7/5/1954.'
  }
];

// Quick interactive daily quiz questions for elementary students on Home
const HOME_DAILY_QUIZZES = [
  {
    id: 'hq-1',
    question: 'Ai là người lãnh đạo cuộc khởi nghĩa đầu tiên chống ách đô hộ của nhà Đông Hán năm 40?',
    options: ['Hai Bà Trưng', 'Bà Triệu', 'Ngô Quyền', 'Lý Nam Đế'],
    correctIndex: 0,
    hint: 'Hai vị nữ anh hùng cưỡi voi xuất trận tại sông Hát Môn.',
    explanation: 'Năm 40, Hai Bà Trưng (Trưng Trắc và Trưng Nhị) phất cờ khởi nghĩa tại cửa sông Hát Môn, giành lại độc lập cho 65 thành trì.'
  },
  {
    id: 'hq-2',
    question: 'Vua Ngô Quyền đã dùng mưu kế gì để đánh tan quân Nam Hán trên sông Bạch Đằng năm 938?',
    options: ['Đào hầm chông trên cạn', 'Cắm cọc gỗ lim bịt sắt dưới lòng sông', 'Dùng hỏa công đốt thuyền lớn', 'Đắp đê ngăn dòng nước lũ'],
    correctIndex: 1,
    hint: 'Lợi dụng con nước thủy triều lên xuống chênh lệch nhiều mét.',
    explanation: 'Ngô Quyền cho quân cắm cọc gỗ lim vót nhọn bịt sắt ngầm dưới sông Bạch Đằng, khi triều rút thuyền giặc va cọc vỡ đắm.'
  },
  {
    id: 'hq-3',
    question: 'Bài thơ thần "Nam quốc sơn hà" khẳng định chủ quyền non sông được đọc bên dòng sông nào?',
    options: ['Sông Hồng', 'Sông Bạch Đằng', 'Sông Như Nguyệt (sông Cầu)', 'Sông Mã'],
    correctIndex: 2,
    hint: 'Nơi Lý Thường Kiệt xây dựng phòng tuyến chống 30 vạn quân Tống.',
    explanation: 'Lý Thường Kiệt lập phòng tuyến sông Như Nguyệt (sông Cầu, Bắc Ninh) và cho ngâm bài thơ thần vang vọng sông núi.'
  },
  {
    id: 'hq-4',
    question: 'Người thiếu niên anh hùng bóp nát quả cam vì ấm ức không được dự bàn việc quân đánh giặc Nguyên Mông là ai?',
    options: ['Trần Quốc Toản', 'Kim Đồng', 'Lê Văn Tám', 'Nguyễn Bá Ngọc'],
    correctIndex: 0,
    hint: 'Chàng thiếu niên sau đó đã thêu cờ sáu chữ vàng "Phá cường địch, báo hoàng ân".',
    explanation: 'Trần Quốc Toản (Hoài Văn Hầu) căm thù giặc sục sôi, tự chiêu mộ hơn một nghìn tráng sĩ đánh tan giặc tại bến Chương Dương.'
  }
];

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenAiWithPrompt }) => {
  const [selectedTodayIndex, setSelectedTodayIndex] = useState(0);
  const [journeyStep, setJourneyStep] = useState(1);
  const [journeyReflection, setJourneyReflection] = useState('');
  const [journeyCompleted, setJourneyCompleted] = useState(false);

  // Daily mini-trivia state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizStreak, setQuizStreak] = useState(0);

  const todayItem = TODAY_IN_HISTORY_DATA[selectedTodayIndex] || TODAY_IN_HISTORY_DATA[0];
  const currentDailyQuiz = HOME_DAILY_QUIZZES[quizQuestionIndex];

  // 7-step sample journey for "Bạch Đằng năm 938" as specified in section 12 of prompt
  const bachDangMilestones = [
    { id: 'm1', text: 'Cuối năm 938: Quân Nam Hán do Hoằng Tháo vượt biển tiến vào sông Bạch Đằng' },
    { id: 'm2', text: 'Ngô Quyền cho quân đẵn gỗ lim vót nhọn bịt sắt cắm ngầm dưới lòng sông' },
    { id: 'm3', text: 'Khi triều dâng ngập bãi cọc: Thuyền nhẹ của ta khiêu chiến rồi vờ rút lui nhử giặc' },
    { id: 'm4', text: 'Thủy triều rút nhanh: Cọc gỗ nhô lên, thuyền chiến lớn của Nam Hán vỡ toang chìm nghỉm' },
    { id: 'm5', text: 'Mùa xuân năm 939: Ngô Quyền xưng vương, định đô ở Cổ Loa, mở nền độc lập vững bền' }
  ];

  const handleSelectQuizAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === currentDailyQuiz.correctIndex) {
      setQuizStreak((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setQuizQuestionIndex((prev) => (prev + 1) % HOME_DAILY_QUIZZES.length);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. HERO SPOTLIGHT: BỘ SƯU TẬP 4 CỘT MỐC VÀNG SON QUA HÌNH ẢNH MINH HỌA */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <DongSonStar size={16} className="text-amber-700" />
              <span>Kho tàng thị giác Sử Việt</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-teal-800 font-semibold">Tư liệu & Tranh ảnh xác thực</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-0.5">
              Những Mốc Son Lịch Sử Chói Lọi
            </h2>
          </div>
          <button
            onClick={() => onNavigate('history-info')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 shadow-2xs transition-colors self-start sm:self-auto"
          >
            <ImageIcon className="w-4 h-4 text-amber-800" />
            <span>Mở Kho ảnh minh họa & Tư liệu →</span>
          </button>
        </div>

        {/* 4 Spotlight Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SPOTLIGHT_MILESTONES.map((spot) => (
            <div
              key={spot.id}
              className="group bg-white rounded-2xl border-2 border-[#e8d7be] overflow-hidden shadow-xs hover:border-amber-600 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-amber-100 via-amber-200/50 to-stone-200">
                <img
                  src={spot.imageUrl}
                  alt={spot.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/src/assets/images/bach_dang_938_1792643651901.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
                <span className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[11px] font-extrabold text-white shadow-xs ${spot.tagColor}`}>
                  {spot.tag}
                </span>
                <span className="absolute bottom-2.5 left-2.5 right-2.5 text-xs text-amber-200 font-bold drop-shadow">
                  {spot.era}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-display text-base font-bold text-[#451a03] group-hover:text-amber-800 transition-colors line-clamp-1">
                    {spot.title}
                  </h3>
                  <div className="text-[11.5px] font-medium text-amber-900 mt-0.5 line-clamp-1">
                    {spot.subtitle}
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed line-clamp-3">
                    {spot.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigate('history-info')}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <span>Xem chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenAiWithPrompt(spot.aiPrompt)}
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors shadow-2xs"
                    title="Hỏi Bạn Sử Nhí AI về sự kiện này"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. KỊCH BẢN MẪU HÀNH TRÌNH ĐIỂM NHẤN: "Bạch Đằng năm 938 – Bước ngoặt lịch sử" */}
      <section className="relative bg-[#fffdfa] rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <DongSonStar size={16} className="text-amber-700" />
              <span>Hành trình khám phá trọng điểm</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-stone-500 font-normal">Kịch bản tương tác 7 bước</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1">
              Bạch Đằng năm 938 – Bước ngoặt lịch sử
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              Trải nghiệm bài học thực cảnh kết hợp bản đồ, sử liệu khảo cổ, sơ đồ chiến thuật và trợ lí Bạn Sử Nhí AI.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
            <span>Tiến trình hành trình:</span>
            <span className="font-extrabold text-amber-800">{journeyStep}/7 bước</span>
          </div>
        </div>

        {/* Journey Interactive Stage */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Canvas / Graphic */}
          <div className="lg:col-span-5 bg-[#faf4e8] p-5 rounded-xl border border-[#e4d1b8] shadow-xs flex flex-col justify-between h-full min-h-[280px]">
            <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200">
              <span className="font-bold text-[#451a03]">Lược đồ chiến thuật thủy chiến</span>
              <span className="text-amber-800 font-semibold">Cửa sông Bạch Đằng</span>
            </div>

            <div className="my-4 py-4 px-2 bg-sky-50/70 rounded-lg flex flex-col items-center justify-center relative overflow-hidden border border-sky-100">
              <BachDangStakesGraphic className="w-full max-w-[280px] h-32" />
              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-stone-700 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-800 inline-block" /> Cọc gỗ lim bịt sắt
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Con nước thủy triều
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-700 italic text-center">
              "Kế cắm cọc dưới sông: lợi dụng quy luật tự nhiên đánh bại quân giặc mạnh."
            </p>
          </div>

          {/* Interactive Steps Control */}
          <div className="lg:col-span-7 space-y-4">
            {journeyStep === 1 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-800">Bước 1: Mở bản đồ sông Bạch Đằng</span>
                <h3 className="text-lg font-bold text-[#451a03]">Vị trí yết hầu bảo vệ bờ cõi</h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Sông Bạch Đằng chảy giữa thị xã Quảng Yên (Quảng Ninh) và huyện Thủy Nguyên (Hải Phòng), đổ ra biển qua các cửa Nam Triệu. Lòng sông rộng hàng nghìn mét, mực nước thủy triều lên xuống chênh lệch tới gần 4 mét mỗi ngày.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setJourneyStep(2)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    <span>Tiếp tục: Xem dòng thời gian & tư liệu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {journeyStep === 2 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-800">Bước 2: Dòng thời gian & tư liệu gốc</span>
                <h3 className="text-lg font-bold text-[#451a03]">Chứng cứ lịch sử được ghi chép</h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Đại Việt sử ký toàn thư chép: <em>"Vua sai đóng cọc lớn vạt nhọn đầu bịt sắt ở cửa biển, khi nước thủy triều dâng lên ngập cọc, vua sai quân khiêu chiến rồi rút lui..."</em>. Hiện vật cọc gỗ thật đã được khai quật tại bãi cọc Yên Giang và Cao Quỳ.
                </p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setJourneyStep(1)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-bold"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => setJourneyStep(3)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    <span>Bước 3: Tìm hiểu chân dung Ngô Quyền</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {journeyStep === 3 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-800">Bước 3: Vị vua mở nền độc lập</span>
                <h3 className="text-lg font-bold text-[#451a03]">Anh hùng Ngô Quyền (897 – 944)</h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Ngô Quyền sinh ra ở Đường Lâm (Hà Nội ngày nay), là tướng tài có chí lớn. Khi vua Nam Hán sai con trai là Lưu Hoằng Tháo đem quân sang xâm lược nước ta, Ngô Quyền đã bình tĩnh nhận định: <em>"Hoằng Tháo là đứa trẻ dại... Ta đánh tất thắng!"</em>
                </p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setJourneyStep(2)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-bold"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => setJourneyStep(4)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    <span>Bước 4: Sơ đồ con nước thủy triều</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {journeyStep === 4 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-800">Bước 4: Quan sát sơ đồ chiến thuật</span>
                <h3 className="text-lg font-bold text-[#451a03]">Tận dụng triệt để con nước thủy triều</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-blue-50/80 rounded-lg border border-blue-200">
                    <strong className="text-blue-950 block mb-1">Khi triều lên (nước ngập):</strong>
                    <span>Cọc gỗ nằm sâu dưới nước. Thuyền nhẹ ta vờ thua nhử hạm đội địch vượt qua bãi cọc tiến sâu vào trong.</span>
                  </div>
                  <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200">
                    <strong className="text-amber-950 block mb-1">Khi triều rút (nước cạn):</strong>
                    <span>Quân ta quay lại đánh quật ngã. Thuyền lớn của giặc tháo chạy mắc cọc nhọn thủng vỡ tan tành.</span>
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setJourneyStep(3)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-bold"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => setJourneyStep(5)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    <span>Bước 5: Thảo luận cùng Bạn Sử Nhí AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {journeyStep === 5 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-800">Bước 5: Bạn Sử Nhí AI hỏi gợi mở</span>
                <h3 className="text-lg font-bold text-[#451a03]">"Vì sao địa hình và con nước có vai trò quyết định?"</h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Bạn Sử Nhí AI chia sẻ: Ngô Quyền đã kết hợp nhuần nhuyễn 3 yếu tố: <strong>Thiên thời</strong> (quy luật thủy triều), <strong>Địa lợi</strong> (sông Bạch Đằng hiểm trở) và <strong>Nhân hòa</strong> (quân dân đồng lòng chặt gỗ lim đẵn cọc).
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => onOpenAiWithPrompt('Vì sao Ngô Quyền lại chọn sông Bạch Đằng để đánh quân Nam Hán năm 938?', { lessonCode: 'LS4-B04' })}
                    className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Hỏi sâu hơn với AI</span>
                  </button>
                  <button
                    onClick={() => setJourneyStep(6)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    <span>Bước 6: Thử thách 5 mốc thời gian</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {journeyStep === 6 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-800">Bước 6: Ghi nhớ 5 mốc then chốt</span>
                <h3 className="text-lg font-bold text-[#451a03]">Chuỗi diễn biến chiến thắng năm 938</h3>
                <div className="space-y-1.5 text-xs">
                  {bachDangMilestones.map((m, idx) => (
                    <div key={m.id} className="flex items-start gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                      <span className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-stone-800 leading-relaxed">{m.text}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setJourneyStep(5)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-bold"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => setJourneyStep(7)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    <span>Bước 7: Đúc kết & Nhận tem mộc số</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {journeyStep === 7 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-teal-800">Bước 7: Từ trang sử đến việc làm của em</span>
                <h3 className="text-lg font-bold text-[#451a03]">Em học được gì về trí tuệ bảo vệ non sông?</h3>
                <p className="text-xs text-stone-600">
                  Ghi lại một suy nghĩ chân thành của em về chiến thắng Bạch Đằng của Ngô Quyền để lưu vào Hộ chiếu Sử Việt:
                </p>
                <textarea
                  value={journeyReflection}
                  onChange={(e) => setJourneyReflection(e.target.value)}
                  placeholder="Ví dụ: Em rất khâm phục trí tuệ của Ngô Quyền khi biết vận dụng thiên nhiên và sức mạnh đoàn kết toàn dân để giữ yên bờ cõi..."
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-[#d6be9e] focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />

                <div className="pt-1 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setJourneyCompleted(true);
                      onNavigate('history-info');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mở khóa Tem mộc số Bạch Đằng</span>
                  </button>
                  <button
                    onClick={() => setJourneyStep(1)}
                    className="text-xs text-stone-500 hover:text-stone-800 font-medium"
                  >
                    Khám phá lại từ đầu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. GƯƠNG SÁNG DANH NHÂN ĐẤT VIỆT (VỚI HÌNH ẢNH CHÂN DUNG & CÂU NÓI BẤT HỦ) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <Users size={16} className="text-amber-700" />
              <span>Gương sáng muôn đời</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-stone-500 font-normal">Hào kiệt dựng xây & bảo vệ non sông</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-[#451a03] mt-0.5">
              Danh Nhân Kiệt Xuất Nước Việt
            </h2>
          </div>

          <button
            onClick={() => onNavigate('history-info')}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Xem trọn bộ danh nhân ({HISTORICAL_FIGURES.length}) →</span>
          </button>
        </div>

        {/* Featured figures cards grid with images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HISTORICAL_FIGURES.slice(0, 6).map((fig) => (
            <div
              key={fig.id}
              className="group bg-white rounded-2xl border-2 border-[#e8d7be] p-5 shadow-xs hover:border-amber-600 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

              <div className="space-y-3">
                {/* Figure Avatar & Header */}
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-amber-300 shadow-2xs relative">
                    {fig.primaryImage?.url ? (
                      <img
                        src={fig.primaryImage.url}
                        alt={fig.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center bg-amber-50 text-amber-900 font-bold text-xs">
                      {fig.name.slice(0, 2)}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10.5px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {fig.era}
                    </span>
                    <h3 className="font-display text-base font-bold text-[#451a03] group-hover:text-amber-900 transition-colors mt-1 truncate">
                      {fig.name}
                    </h3>
                    <div className="text-[11px] text-stone-500 truncate">
                      {fig.title}
                    </div>
                  </div>
                </div>

                {/* Contribution */}
                <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
                  {fig.contribution}
                </p>

                {/* Memorable Quote if present */}
                {fig.memorableQuote && (
                  <div className="p-2.5 rounded-lg bg-[#faf5ec] border-l-2 border-amber-700 text-[11.5px] text-[#451a03] italic line-clamp-2">
                    "{fig.memorableQuote}"
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#f0e2cd] flex items-center justify-between text-xs">
                <button
                  onClick={() => onNavigate('history-info')}
                  className="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                >
                  <span>Xem hồ sơ & tranh ảnh</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() =>
                    onOpenAiWithPrompt(
                      `Kể cho em một mẩu chuyện cảm động về nhân vật lịch sử ${fig.name} dành cho học sinh tiểu học.`
                    )
                  }
                  className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors shadow-2xs"
                  title="Hỏi Bạn Sử Nhí về danh nhân"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GÓC ĐỐ VUI AI TƯƠNG TÁC NHANH TRONG NGÀY (DAILY AI MINI QUIZ WIDGET) */}
      <section className="bg-gradient-to-br from-[#fffdf9] via-[#fdf7ec] to-[#fbf1dc] rounded-2xl border-2 border-[#e6d2b5] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/20" />
        <DongSonCorner position="br" className="absolute bottom-2 right-2 text-amber-700/20" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eedec7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded uppercase tracking-wide">
                  Thử thách trí tuệ 30 giây
                </span>
                {quizStreak > 0 && (
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
                    Chuỗi đúng: {quizStreak} câu
                  </span>
                )}
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03] mt-0.5">
                Đố Vui Lịch Sử Nhanh Cùng Bạn Sử Nhí
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-amber-300 text-xs font-bold text-amber-900 shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý AI'}</span>
            </button>
            <button
              onClick={handleNextQuizQuestion}
              className="px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Câu đố khác</span>
            </button>
          </div>
        </div>

        {/* Question and Interactive Options */}
        <div className="mt-5 max-w-3xl space-y-4">
          {showHint && (
            <div className="p-3 bg-amber-100/70 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <span><strong>Gợi ý thông minh:</strong> {currentDailyQuiz.hint}</span>
            </div>
          )}

          <h3 className="font-display text-base sm:text-lg font-bold text-[#451a03] leading-relaxed">
            {currentDailyQuiz.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentDailyQuiz.options.map((opt, idx) => {
              let btnStyle = 'bg-white hover:bg-amber-50/60 border-[#e0cbb0] text-stone-800';

              if (selectedAnswer !== null) {
                if (idx === currentDailyQuiz.correctIndex) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                } else if (idx === selectedAnswer) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-semibold';
                } else {
                  btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectQuizAnswer(idx)}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 shadow-2xs ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 font-bold flex items-center justify-center text-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium flex-1">{opt}</span>
                  {selectedAnswer !== null && idx === currentDailyQuiz.correctIndex && (
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  )}
                  {selectedAnswer === idx && idx !== currentDailyQuiz.correctIndex && (
                    <X className="w-4 h-4 text-rose-700 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="p-4 rounded-xl bg-white border border-amber-300 shadow-2xs space-y-2 mt-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={selectedAnswer === currentDailyQuiz.correctIndex ? 'text-emerald-700' : 'text-rose-700'}>
                  {selectedAnswer === currentDailyQuiz.correctIndex
                    ? '🎉 Hoan hô! Em đã trả lời hoàn toàn chính xác!'
                    : '💡 Chưa đúng rồi, em hãy ghi nhớ lời giải nhé!'}
                </span>
                <span className="text-amber-800">
                  {selectedAnswer === currentDailyQuiz.correctIndex ? '+10 điểm Sử Việt' : ''}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {currentDailyQuiz.explanation}
              </p>
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-100">
                <button
                  onClick={() => onNavigate('quiz-games')}
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                >
                  <span>Chơi thêm các trò chơi tương tác AI khác →</span>
                </button>
                <button
                  onClick={handleNextQuizQuestion}
                  className="px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-bold hover:bg-amber-900"
                >
                  Câu tiếp theo
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. SÁU KHỐI CHUYÊN MỤC CHÍNH CỦA WEBSITE (THIẾT KẾ THẺ LỚN ĐÔNG SƠN) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <DongSonStar size={16} className="text-amber-700" />
              <span>Chuyên mục khám phá chính</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-[#451a03] mt-0.5">
              Không Gian Số Lịch Sử Việt Nam
            </h2>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">Trực quan · Dễ dùng cho học sinh</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Bài giảng điện tử */}
          <div
            onClick={() => onNavigate('lectures')}
            className="group cursor-pointer bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs hover:border-amber-600 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#451a03] group-hover:text-amber-800 transition-colors">
                BÀI GIẢNG ĐIỆN TỬ
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Hồ sơ bài học SGK Lớp 4 & 5, tóm tắt 5 ý cốt lõi, sơ đồ tư duy, phiếu học tập PDF và slide trình chiếu PPTX chuẩn GDPT 2018.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f0e2cd] text-xs font-bold text-amber-800 flex items-center justify-between">
              <span>Khám phá bài học →</span>
              <ChimLacSVG size={22} className="text-amber-700 opacity-60" />
            </div>
          </div>

          {/* Card 2: Game trắc nghiệm */}
          <div
            onClick={() => onNavigate('quiz-games')}
            className="group cursor-pointer bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs hover:border-amber-600 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />
            <div>
              <div className="w-11 h-11 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#451a03] group-hover:text-teal-800 transition-colors">
                GAME TRẮC NGHIỆM
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Bộ trò chơi tương tác xây dựng từ AI: Đoán tên nhân vật qua manh mối, lật thẻ bài trí nhớ, thám tử sử liệu và sắp xếp niên đại.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f0e2cd] text-xs font-bold text-teal-800 flex items-center justify-between">
              <span>Vào phòng thử thách →</span>
              <DongSonStar size={18} className="text-teal-700 opacity-60" />
            </div>
          </div>

          {/* Card 3: Phim lịch sử */}
          <div
            onClick={() => onNavigate('history-movies')}
            className="group cursor-pointer bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs hover:border-amber-600 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />
            <div>
              <div className="w-11 h-11 rounded-xl bg-rose-100/80 text-rose-800 flex items-center justify-center mb-3">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#451a03] group-hover:text-rose-800 transition-colors">
                PHIM LỊCH SỬ
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Kho phim hoạt hình lịch sử, phim tài liệu hiện vật quý và phim tái hiện; kèm bộ câu hỏi định hướng trước và sau khi xem.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f0e2cd] text-xs font-bold text-rose-800 flex items-center justify-between">
              <span>Xem rạp phim Sử Việt →</span>
              <ChimLacSVG size={22} className="text-rose-700 opacity-60" />
            </div>
          </div>

          {/* Card 4: Thông tin lịch sử */}
          <div
            onClick={() => onNavigate('history-info')}
            className="group cursor-pointer bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs hover:border-amber-600 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center mb-3">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#451a03] group-hover:text-amber-800 transition-colors">
                THÔNG TIN LỊCH SỬ
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Kho ảnh minh họa lịch sử, dòng thời gian 8 giai đoạn, hồ sơ danh nhân kiệt xuất, bảo vật quốc gia và bản đồ di tích non sông.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f0e2cd] text-xs font-bold text-amber-800 flex items-center justify-between">
              <span>Khám phá kho tư liệu →</span>
              <DongSonDrumSVG size={22} className="text-amber-700 opacity-60" />
            </div>
          </div>

          {/* Card 5: Trợ lý Bạn Sử Nhí AI */}
          <div
            onClick={() => onNavigate('ai-assistant')}
            className="group cursor-pointer bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs hover:border-amber-600 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-100/80 text-purple-800 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#451a03] group-hover:text-purple-800 transition-colors">
                TRỢ LÝ AI
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Người bạn đồng hành Bạn Sử Nhí thông minh: Giải thích ngắn, Kể chuyện truyền cảm, Thám tử sử liệu và Ôn tập gợi mở có trích nguồn.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f0e2cd] text-xs font-bold text-purple-800 flex items-center justify-between">
              <span>Trò chuyện cùng AI →</span>
              <DongSonStar size={18} className="text-purple-700 opacity-60" />
            </div>
          </div>

          {/* Card 6: Hộ chiếu & Thuyết minh viên nhí */}
          <div
            onClick={() => onNavigate('history-info')}
            className="group cursor-pointer bg-white rounded-2xl border-2 border-[#e8d7be] p-6 shadow-xs hover:border-amber-600 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />
            <div>
              <div className="w-11 h-11 rounded-xl bg-orange-100/80 text-orange-800 flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#451a03] group-hover:text-orange-800 transition-colors">
                BẢN ĐỒ DI TÍCH NON SÔNG
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Định vị tương tác Đền Hùng, Cổ Loa, Bạch Đằng, Hoa Lư, Cố đô Huế, Điện Biên Phủ, Dinh Độc Lập... và đóng dấu Tem mộc số.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f0e2cd] text-xs font-bold text-orange-800 flex items-center justify-between">
              <span>Mở bản đồ số →</span>
              <ChimLacSVG size={22} className="text-orange-700 opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. HÔM NAY TRONG LỊCH SỬ (VỚI HÌNH ẢNH MINH HỌA & SỬ LIỆU THẨM ĐỊNH) */}
      <section className="bg-white rounded-2xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <DongSonCorner position="bl" className="absolute bottom-2 left-2 text-amber-700/20" />
        <DongSonCorner position="br" className="absolute bottom-2 right-2 text-amber-700/20" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eedec7]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-[#451a03]">
                Hôm nay trong lịch sử
              </h2>
              <p className="text-xs text-stone-500">
                Tư liệu được kiểm chứng qua các mốc son chói lọi của dân tộc
              </p>
            </div>
          </div>

          {/* Date Picker Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-amber-50 rounded-xl border border-amber-200 overflow-x-auto no-scrollbar">
            {TODAY_IN_HISTORY_DATA.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTodayIndex(idx)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  selectedTodayIndex === idx
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-amber-900'
                }`}
              >
                {item.dateStr}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 p-5 rounded-xl bg-[#faf4e8] border border-[#e4d1b8]">
          {/* Event Image */}
          {todayItem.imageUrl && (
            <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden shrink-0 border border-amber-300 bg-amber-100 relative shadow-xs">
              <img
                src={todayItem.imageUrl}
                alt={todayItem.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-amber-200 font-bold">
                Năm {todayItem.year}
              </div>
            </div>
          )}

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-amber-900 font-bold flex-wrap">
              <span>Năm {todayItem.year}</span>
              <span aria-hidden="true">·</span>
              <span>{todayItem.dateStr}</span>
              <span aria-hidden="true">·</span>
              <span className="text-teal-800">Sử liệu đã thẩm định</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#451a03]">
              {todayItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {todayItem.summary}
            </p>
            <div className="text-[11px] text-stone-500 pt-1">
              Nguồn trích lục: <strong>{todayItem.source}</strong>
            </div>
          </div>

          <button
            onClick={() => onOpenAiWithPrompt(`Hãy kể cho em nghe chi tiết hơn về sự kiện ${todayItem.title} (${todayItem.dateStr} năm ${todayItem.year}) một cách dễ hiểu cho học sinh lớp 4-5.`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold rounded-xl shadow-2xs whitespace-nowrap shrink-0 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Hỏi Bạn Sử Nhí sự kiện này</span>
          </button>
        </div>
      </section>
    </div>
  );
};
