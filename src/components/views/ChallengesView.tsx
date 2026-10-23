import React, { useState, useEffect } from 'react';
import {
  QUIZ_QUESTIONS as FALLBACK_QUIZZES,
  DETECTIVE_CASES,
  HISTORICAL_FIGURES,
  TEXTBOOK_LESSONS
} from '../../data/historyData';
import {
  MYSTERY_FIGURES_GAMES,
  MysteryFigureGame,
  INITIAL_MEMORY_CARDS,
  MemoryCard
} from '../../data/historyGamesData';
import { QuizQuestion, DetectiveCase, TruthLayer, UserProfile } from '../../types';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  ArrowRight,
  ShieldAlert,
  Search,
  BookOpen,
  ChevronRight,
  Layers,
  Plus,
  Trash2,
  SlidersHorizontal,
  X,
  Check,
  Filter,
  ShieldCheck,
  Eye,
  Brain,
  Trophy,
  Flame,
  Star,
  Shuffle
} from 'lucide-react';
import { DongSonStar, DongSonDrumSVG, DongSonCorner } from '../DongSonMotif';

interface ChallengesViewProps {
  currentUser?: UserProfile | null;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
  onAddScore: (points: number) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  currentUser,
  onOpenAiWithPrompt,
  onAddScore
}) => {
  const [activeGame, setActiveGame] = useState<'quiz' | 'detective' | 'ordering' | 'mystery-ai' | 'memory-cards'>('quiz');

  // Dynamic Quiz Bank State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(FALLBACK_QUIZZES);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [manageSearch, setManageSearch] = useState('');
  const [manageGradeFilter, setManageGradeFilter] = useState<'all' | '4' | '5'>('all');

  // New Question Form State
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newGrade, setNewGrade] = useState<4 | 5>(4);
  const [newLessonCode, setNewLessonCode] = useState('LS4-B02');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');
  const [newOptC, setNewOptC] = useState('');
  const [newOptD, setNewOptD] = useState('');
  const [newCorrectIndex, setNewCorrectIndex] = useState(0);
  const [newExplanation, setNewExplanation] = useState('');
  const [newSource, setNewSource] = useState('SGK Lịch sử & Địa lí Kết nối tri thức');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Game 1: Multiple choice play state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [incorrectList, setIncorrectList] = useState<QuizQuestion[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Game 2: Detective case state
  const [caseIndex, setCaseIndex] = useState(0);
  const [detectiveChoice, setDetectiveChoice] = useState<TruthLayer | null>(null);
  const [detectiveSubmitted, setDetectiveSubmitted] = useState(false);
  const [detectiveScore, setDetectiveScore] = useState(0);

  // Game 3: Ordering state (e.g. 5 milestones of Bach Dang 938)
  const initialOrdering = [
    { id: 'o3', text: 'Thuyền nhẹ của ta khiêu chiến rồi vờ rút lui nhử thuyền giặc vào bãi cọc', order: 3 },
    { id: 'o1', text: 'Quân Nam Hán do Hoằng Tháo chỉ huy theo đường biển tiến vào cửa sông Bạch Đằng', order: 1 },
    { id: 'o4', text: 'Nước triều rút nhanh, cọc nhô lên làm thuyền giặc vỡ đắm, Hoằng Tháo bị tiêu diệt', order: 4 },
    { id: 'o2', text: 'Ngô Quyền cho quân chặt gỗ lim đẽo nhọn bịt sắt cắm ngầm xuống lòng sông', order: 2 },
    { id: 'o5', text: 'Mùa xuân năm 939: Ngô Quyền lên ngôi vua đóng đô ở Cổ Loa, mở ra kỷ nguyên độc lập', order: 5 },
  ];
  const [orderedItems, setOrderedItems] = useState(initialOrdering);
  const [orderingChecked, setOrderingChecked] = useState(false);
  const [orderingSuccess, setOrderingSuccess] = useState(false);

  // Game 4: Đoán nhân vật qua manh mối AI
  const [mysteryIndex, setMysteryIndex] = useState(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState(1);
  const [selectedMysteryChoice, setSelectedMysteryChoice] = useState<string | null>(null);
  const [mysterySubmitted, setMysterySubmitted] = useState(false);
  const [mysteryScore, setMysteryScore] = useState(0);

  // Game 5: Lật thẻ bài trí nhớ lịch sử
  const shuffleCards = (cards: MemoryCard[]) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(() => shuffleCards(INITIAL_MEMORY_CARDS));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [movesCount, setMovesCount] = useState(0);
  const [lastMatchedTitle, setLastMatchedTitle] = useState<string | null>(null);

  const currentMystery = MYSTERY_FIGURES_GAMES[mysteryIndex] || MYSTERY_FIGURES_GAMES[0];

  const handleRevealNextClue = () => {
    if (revealedCluesCount < currentMystery.clues.length) {
      setRevealedCluesCount((prev) => prev + 1);
    }
  };

  const handleSelectMysteryChoice = (choice: string) => {
    if (mysterySubmitted) return;
    setSelectedMysteryChoice(choice);
    setMysterySubmitted(true);
    const isCorrect = choice === currentMystery.correctName;
    if (isCorrect) {
      const points = Math.max(10, 50 - revealedCluesCount * 10);
      setMysteryScore((prev) => prev + points);
      onAddScore(points);
    }
  };

  const handleNextMystery = () => {
    setMysteryIndex((prev) => (prev + 1) % MYSTERY_FIGURES_GAMES.length);
    setRevealedCluesCount(1);
    setSelectedMysteryChoice(null);
    setMysterySubmitted(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index)) return;
    const card = memoryCards[index];
    if (matchedPairIds.includes(card.pairId)) return;

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMovesCount((prev) => prev + 1);
      const card1 = memoryCards[nextFlipped[0]];
      const card2 = memoryCards[nextFlipped[1]];

      if (card1.pairId === card2.pairId) {
        setTimeout(() => {
          setMatchedPairIds((prev) => [...prev, card1.pairId]);
          setFlippedIndices([]);
          setLastMatchedTitle(card1.title || card2.title);
          onAddScore(15);
        }, 600);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };

  const handleResetMemoryGame = () => {
    setMemoryCards(shuffleCards(INITIAL_MEMORY_CARDS));
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMovesCount(0);
    setLastMatchedTitle(null);
  };

  // Load live questions from server
  const fetchQuizzes = async () => {
    try {
      setIsLoadingQuizzes(true);
      const res = await fetch('/api/quizzes');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuizQuestions(data);
        }
      }
    } catch (err) {
      console.warn('Could not load quizzes from server, using fallback');
    } finally {
      setIsLoadingQuizzes(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Safe current question
  const currentQ = quizQuestions[quizIndex] || quizQuestions[0] || FALLBACK_QUIZZES[0];
  const currentCase = DETECTIVE_CASES[caseIndex] || DETECTIVE_CASES[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + 10);
      onAddScore(10);
    } else {
      setIncorrectList((prev) => [...prev, currentQ]);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizScore(0);
    setIncorrectList([]);
    setQuizFinished(false);
  };

  // Add a new Quiz Question (POST /api/quizzes)
  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!newQuestionText.trim()) {
      setFormError('Vui lòng nhập nội dung câu hỏi trắc nghiệm.');
      return;
    }
    if (!newOptA.trim() || !newOptB.trim()) {
      setFormError('Vui lòng nhập ít nhất 2 phương án trả lời (A và B).');
      return;
    }

    const options = [newOptA.trim(), newOptB.trim()];
    if (newOptC.trim()) options.push(newOptC.trim());
    if (newOptD.trim()) options.push(newOptD.trim());

    if (newCorrectIndex >= options.length) {
      setFormError('Phương án đúng đã chọn vượt quá số lượng phương án nhập.');
      return;
    }

    const lesson = TEXTBOOK_LESSONS.find((l) => l.code === newLessonCode);

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestionText.trim(),
          options,
          correctIndex: newCorrectIndex,
          explanation: newExplanation.trim() || 'Theo chuẩn chương trình Lịch sử & Địa lí GDPT 2018.',
          source: newSource.trim() || 'Bộ SGK Kết nối tri thức với cuộc sống',
          truthLayer: 'verified',
          grade: newGrade,
          lessonCode: newLessonCode,
          lessonTitle: lesson ? lesson.title : 'Bài học Lịch sử GDPT 2018',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Thêm câu hỏi thất bại.');
      }

      // Prepend to active list
      if (data.quiz) {
        setQuizQuestions((prev) => [data.quiz, ...prev]);
      }

      // Reset form & close
      setNewQuestionText('');
      setNewOptA('');
      setNewOptB('');
      setNewOptC('');
      setNewOptD('');
      setNewCorrectIndex(0);
      setNewExplanation('');
      setShowAddModal(false);
      handleResetQuiz();
    } catch (err: any) {
      setFormError(err.message || 'Lỗi khi lưu câu hỏi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a Quiz Question (DELETE /api/quizzes/:id)
  const handleDeleteQuestion = async (id: string, qText: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa câu hỏi "${qText.slice(0, 50)}..." khỏi ngân hàng trắc nghiệm không?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setQuizQuestions((prev) => prev.filter((q) => q.id !== id));
        if (quizIndex >= quizQuestions.length - 1 && quizIndex > 0) {
          setQuizIndex((prev) => prev - 1);
        }
      } else {
        const err = await res.json();
        alert(err.error || 'Xóa câu hỏi thất bại.');
      }
    } catch (err) {
      console.error('Error deleting quiz:', err);
    }
  };

  // Ordering game helpers
  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (orderingChecked) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= orderedItems.length) return;
    const newItems = [...orderedItems];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setOrderedItems(newItems);
  };

  const checkOrdering = () => {
    const isCorrect = orderedItems.every((item, idx) => item.order === idx + 1);
    setOrderingSuccess(isCorrect);
    setOrderingChecked(true);
    if (isCorrect) onAddScore(20);
  };

  // Filter for Manage Modal
  const filteredManageQuestions = quizQuestions.filter((q) => {
    const matchGrade = manageGradeFilter === 'all' || q.grade?.toString() === manageGradeFilter;
    const query = manageSearch.toLowerCase().trim();
    const matchSearch =
      !query ||
      q.question.toLowerCase().includes(query) ||
      (q.lessonCode && q.lessonCode.toLowerCase().includes(query)) ||
      (q.explanation && q.explanation.toLowerCase().includes(query));
    return matchGrade && matchSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Deck with Đông Sơn Accents */}
      <div className="relative bg-[#fffdfa] rounded-3xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/25 pointer-events-none" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/25 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#eedec7] pb-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <DongSonStar size={16} className="text-amber-700" />
              <span>Rèn luyện & Kiểm tra năng lực GDPT 2018</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-stone-500 font-normal">Học vui - Nhớ lâu - Dẫn nguồn chuẩn</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1">
              Thử Thách Sử Việt & Game Trắc Nghiệm
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
              Ngân hàng câu hỏi trắc nghiệm tương tác, thám tử sử liệu ba lớp sự thật và sắp xếp mốc niên đại giúp em khắc sâu kiến thức lịch sử dân tộc.
            </p>
          </div>

          {/* Teacher / Admin Action Buttons for Quizzes */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowManageModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#d6be9e] text-stone-700 font-bold text-xs shadow-2xs transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-800" />
              <span>Ngân hàng câu hỏi ({quizQuestions.length})</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-extrabold text-xs shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>+ Thêm câu hỏi mới</span>
            </button>
          </div>
        </div>

        {/* Game Mode Tabs */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveGame('quiz')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeGame === 'quiz'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-[#eedec7]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Trắc nghiệm kiến thức ({quizQuestions.length} câu)</span>
          </button>
          <button
            onClick={() => setActiveGame('detective')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeGame === 'detective'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-[#eedec7]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Thám tử sử liệu (Ba lớp sự thật)</span>
          </button>
          <button
            onClick={() => setActiveGame('ordering')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeGame === 'ordering'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-[#eedec7]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Sắp xếp mốc niên đại</span>
          </button>
          <button
            onClick={() => setActiveGame('mystery-ai')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeGame === 'mystery-ai'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-[#eedec7]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Đoán nhân vật qua manh mối AI</span>
          </button>
          <button
            onClick={() => setActiveGame('memory-cards')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeGame === 'memory-cards'
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-[#eedec7]'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            <span>Lật thẻ bài trí nhớ lịch sử</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          GAME 1: TRẮC NGHIỆM KIẾN THỨC TƯƠNG TÁC
          ========================================================================= */}
      {activeGame === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {quizQuestions.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#eedec7] p-8 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                Chưa có câu hỏi nào trong ngân hàng trắc nghiệm
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Cô giáo hoặc các bạn có thể bấm vào nút bên dưới để thêm câu hỏi trắc nghiệm mới và đồng bộ hệ thống.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold shadow-xs hover:bg-amber-900"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm câu hỏi ngay</span>
              </button>
            </div>
          ) : !quizFinished && currentQ ? (
            <div className="bg-[#fffdfa] rounded-3xl border-2 border-[#eedec7] p-6 sm:p-8 shadow-xs space-y-6">
              {/* Progress and score header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#eedec7] text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#451a03]">
                    Câu hỏi {quizIndex + 1} / {quizQuestions.length}
                  </span>
                  {currentQ.grade && (
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                      Lớp {currentQ.grade}
                    </span>
                  )}
                </div>

                <span className="font-bold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-xl border border-amber-300 shadow-2xs">
                  Điểm của em: {quizScore} điểm
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    {currentQ.lessonCode}
                  </span>
                  {currentQ.lessonTitle && (
                    <span className="text-xs text-stone-500 font-medium">
                      {currentQ.lessonTitle}
                    </span>
                  )}
                </div>

                <h2 className="font-display font-bold text-lg sm:text-xl text-[#451a03] pt-1 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let buttonStyle = 'bg-white border-[#d6be9e] text-stone-800 hover:bg-amber-50/50 hover:border-amber-400';

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400';
                    } else if (idx === selectedOption) {
                      buttonStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-semibold';
                    } else {
                      buttonStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 shadow-2xs ${buttonStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg border border-current flex items-center justify-center font-mono font-extrabold text-xs shrink-0 mt-0.5 bg-white/70">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed font-sans">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation after Answer */}
              {isAnswered && (
                <div
                  className={`p-4 rounded-2xl border space-y-2 animate-in fade-in duration-200 text-xs sm:text-sm ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50/90 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-emerald-800">Chính xác! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span className="text-rose-800">Chưa chính xác, cùng xem giải thích nhé!</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed text-stone-800">{currentQ.explanation}</p>
                  <div className="pt-2 border-t border-current/20 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                    <span>Nguồn sử liệu: <strong>{currentQ.source}</strong></span>
                    <button
                      onClick={() =>
                        onOpenAiWithPrompt(
                          `Hãy giải thích rõ hơn câu hỏi lịch sử: "${currentQ.question}" cho học sinh tiểu học.`
                        )
                      }
                      className="text-amber-900 hover:text-amber-950 font-bold inline-flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Hỏi Bạn Sử Nhí thêm</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Footer action button */}
              {isAnswered && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <span>
                      {quizIndex < quizQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả bài làm'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Results Summary */
            <div className="bg-[#fffdfa] rounded-3xl border-2 border-[#eedec7] p-8 shadow-xs text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-2xs border border-amber-300">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h2 className="font-display text-2xl font-extrabold text-[#451a03]">
                  Hoàn thành thử thách trắc nghiệm!
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Chúc mừng em đã nỗ lực ôn tập lịch sử cùng Bạn Sử Nhí AI.
                </p>
              </div>

              <div className="inline-block p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="text-3xl font-extrabold text-amber-900 font-mono">
                  {quizScore} / {quizQuestions.length * 10} điểm
                </div>
                <div className="text-xs text-amber-800 mt-1 font-semibold">
                  Đúng {quizScore / 10} trên tổng số {quizQuestions.length} câu hỏi
                </div>
              </div>

              {/* Review mistakes if any */}
              {incorrectList.length > 0 && (
                <div className="text-left bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wide">
                    Kiến thức em cần lưu ý thêm ({incorrectList.length} câu):
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {incorrectList.map((item, idx) => (
                      <li key={idx} className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                        <strong className="text-amber-950 block">{item.question}</strong>
                        <p className="text-stone-600">{item.explanation}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại thử thách từ đầu</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          GAME 2: THÁM TỬ SỬ LIỆU (BA LỚP SỰ THẬT)
          ========================================================================= */}
      {activeGame === 'detective' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-[#fffdfa] rounded-3xl border-2 border-[#eedec7] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#eedec7] text-xs">
              <span className="font-bold text-[#451a03]">
                Hồ sơ vụ án {caseIndex + 1} / {DETECTIVE_CASES.length}
              </span>
              <span className="text-stone-600 font-semibold bg-stone-100 px-2.5 py-1 rounded-lg">
                Thám tử sử liệu nhí: Phân tích chứng cứ
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                Vấn đề cần xác minh
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03] pt-1">
                {currentCase.title}
              </h2>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-800 italic">
                "{currentCase.claim}"
              </div>
            </div>

            {/* Evidence details */}
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-1.5">
              <h4 className="font-bold text-xs text-amber-950 uppercase tracking-wide">
                Bằng chứng khảo cổ & ghi chép hiện có:
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-sans">
                {currentCase.evidenceText}
              </p>
            </div>

            {/* 3 Truth Layer Choices */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wide">
                Theo em, khẳng định trên thuộc lớp sự thật nào?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  disabled={detectiveSubmitted}
                  onClick={() => {
                    setDetectiveChoice('verified');
                    setDetectiveSubmitted(true);
                    if (currentCase.actualCategory === 'verified') {
                      setDetectiveScore((prev) => prev + 15);
                      onAddScore(15);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    detectiveSubmitted && currentCase.actualCategory === 'verified'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                      : detectiveChoice === 'verified'
                      ? 'bg-amber-100 border-amber-400'
                      : 'bg-white border-[#d6be9e] hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-xs text-emerald-900">1. Sự thật lịch sử</div>
                  <div className="text-[11px] text-stone-600 mt-1">Đã kiểm chứng bằng khảo cổ & sử liệu gốc</div>
                </button>

                <button
                  disabled={detectiveSubmitted}
                  onClick={() => {
                    setDetectiveChoice('legend');
                    setDetectiveSubmitted(true);
                    if (currentCase.actualCategory === 'legend') {
                      setDetectiveScore((prev) => prev + 15);
                      onAddScore(15);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    detectiveSubmitted && currentCase.actualCategory === 'legend'
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300'
                      : detectiveChoice === 'legend'
                      ? 'bg-amber-100 border-amber-400'
                      : 'bg-white border-[#d6be9e] hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-xs text-amber-900">2. Lớp vỏ truyền thuyết</div>
                  <div className="text-[11px] text-stone-600 mt-1">Dân gian thi vị hóa, gửi gắm ước mơ</div>
                </button>

                <button
                  disabled={detectiveSubmitted}
                  onClick={() => {
                    setDetectiveChoice('debated');
                    setDetectiveSubmitted(true);
                    if (currentCase.actualCategory === 'debated') {
                      setDetectiveScore((prev) => prev + 15);
                      onAddScore(15);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    detectiveSubmitted && currentCase.actualCategory === 'debated'
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300'
                      : detectiveChoice === 'debated'
                      ? 'bg-amber-100 border-amber-400'
                      : 'bg-white border-[#d6be9e] hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-xs text-blue-900">3. Còn tranh luận</div>
                  <div className="text-[11px] text-stone-600 mt-1">Cần thêm cứ liệu khai quật mới</div>
                </button>
              </div>
            </div>

            {/* Detective Feedback */}
            {detectiveSubmitted && (
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2 text-xs sm:text-sm animate-in fade-in">
                <div className="font-bold text-amber-950 flex items-center gap-2">
                  {detectiveChoice === currentCase.actualCategory ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Phân tích chính xác! (+15 điểm)
                    </span>
                  ) : (
                    <span className="text-amber-800 flex items-center gap-1">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      Kết luận thực tế:
                    </span>
                  )}
                </div>
                <p className="text-stone-800 leading-relaxed font-sans">{currentCase.explanation}</p>
                <div className="pt-2 border-t border-amber-200 text-xs text-stone-600">
                  Nguồn nghiên cứu: <strong>{currentCase.historicalSource}</strong>
                </div>
              </div>
            )}

            {/* Next Detective Case */}
            {detectiveSubmitted && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    if (caseIndex < DETECTIVE_CASES.length - 1) {
                      setCaseIndex((prev) => prev + 1);
                      setDetectiveChoice(null);
                      setDetectiveSubmitted(false);
                    } else {
                      setCaseIndex(0);
                      setDetectiveChoice(null);
                      setDetectiveSubmitted(false);
                    }
                  }}
                  className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  {caseIndex < DETECTIVE_CASES.length - 1 ? 'Vụ án tiếp theo' : 'Bắt đầu lại từ đầu'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          GAME 3: SẮP XẾP MỐC NIÊN ĐẠI LỊCH SỬ
          ========================================================================= */}
      {activeGame === 'ordering' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-[#fffdfa] rounded-3xl border-2 border-[#eedec7] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                Thử thách dòng thời gian
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03] mt-1.5">
                Sắp xếp 5 mốc diễn biến Chiến thắng Bạch Đằng năm 938
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Dùng các nút mũi tên Lên / Xuống để sắp xếp đúng thứ tự thời gian từ trước đến sau:
              </p>
            </div>

            <div className="space-y-2.5">
              {orderedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-[#d6be9e] bg-white flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed">
                      {item.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      disabled={index === 0 || orderingChecked}
                      onClick={() => moveItem(index, 'up')}
                      className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 disabled:opacity-30 text-stone-700"
                      title="Chuyển lên trước"
                    >
                      ▲
                    </button>
                    <button
                      disabled={index === orderedItems.length - 1 || orderingChecked}
                      onClick={() => moveItem(index, 'down')}
                      className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 disabled:opacity-30 text-stone-700"
                      title="Chuyển xuống sau"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {orderingChecked && (
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm animate-in fade-in ${
                  orderingSuccess
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {orderingSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Tuyệt vời! Em đã sắp xếp đúng 100% dòng thời gian trận chiến Bạch Đằng (+20 điểm)!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Thứ tự chưa chính xác, em hãy thử đổi lại vị trí các mốc nhé!</span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setOrderedItems(initialOrdering);
                  setOrderingChecked(false);
                  setOrderingSuccess(false);
                }}
                className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                Đặt lại ban đầu
              </button>
              <button
                onClick={checkOrdering}
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Kiểm tra kết quả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          GAME 4: ĐOÁN NHÂN VẬT QUA MANH MỐI AI (AI MYSTERY FIGURE GAME)
          ========================================================================= */}
      {activeGame === 'mystery-ai' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-[#fffdfa] rounded-3xl border-2 border-[#eedec7] p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#eedec7] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#451a03] bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                  Hồ sơ bí ẩn #{mysteryIndex + 1} / {MYSTERY_FIGURES_GAMES.length}
                </span>
                <span className="text-stone-600 font-medium">
                  Manh mối đã mở: <strong className="text-amber-800">{revealedCluesCount} / {currentMystery.clues.length}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-300 shadow-2xs">
                  Điểm Thám Tử: {mysteryScore} điểm
                </span>
              </div>
            </div>

            {/* Clues Accordion / Reveal Stage */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#451a03] flex items-center gap-2">
                  <Brain className="w-5 h-5 text-amber-700" />
                  <span>Ai là ai? Giải mã danh nhân qua gợi ý AI:</span>
                </h3>

                {!mysterySubmitted && revealedCluesCount < currentMystery.clues.length && (
                  <button
                    onClick={handleRevealNextClue}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 transition-colors shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-800" />
                    <span>Mở thêm manh mối AI ({revealedCluesCount + 1}/4)</span>
                  </button>
                )}
              </div>

              {/* Clues list */}
              <div className="space-y-2.5">
                {currentMystery.clues.map((clue, idx) => {
                  const isRevealed = idx < revealedCluesCount || mysterySubmitted;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isRevealed
                          ? 'bg-amber-50/70 border-amber-200 text-stone-800'
                          : 'bg-stone-50 border-dashed border-stone-200 text-stone-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-amber-800 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                          {clue.order}
                        </span>
                        <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">
                          {isRevealed ? clue.category : `Manh mối #${clue.order} (Chưa mở khóa)`}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed pl-7">
                        {isRevealed
                          ? clue.text
                          : 'Bấm nút "Mở thêm manh mối AI" phía trên để khám phá gợi ý này (hoặc đoán ngay để nhận điểm tối đa)...'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Theo em, nhân vật lịch sử bí ẩn này là ai?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentMystery.options.map((opt, idx) => {
                  let btnStyle = 'bg-white hover:bg-amber-50/60 border-[#d6be9e] text-stone-800';

                  if (mysterySubmitted) {
                    if (opt === currentMystery.correctName) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                    } else if (opt === selectedMysteryChoice) {
                      btnStyle = 'bg-rose-100 border-rose-300 text-rose-950 font-semibold';
                    } else {
                      btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={mysterySubmitted}
                      onClick={() => handleSelectMysteryChoice(opt)}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between shadow-2xs ${btnStyle}`}
                    >
                      <span className="font-bold">{opt}</span>
                      {mysterySubmitted && opt === currentMystery.correctName && (
                        <Check className="w-4 h-4 text-emerald-700" />
                      )}
                      {mysterySubmitted && opt === selectedMysteryChoice && opt !== currentMystery.correctName && (
                        <X className="w-4 h-4 text-rose-700" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Success & Dossier Card upon submission */}
            {mysterySubmitted && (
              <div className="p-5 rounded-2xl bg-[#faf5ec] border-2 border-amber-300 space-y-4 animate-in fade-in">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400 shadow-md bg-stone-900">
                    <img
                      src={currentMystery.imageUrl}
                      alt={currentMystery.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10.5px]">
                        {currentMystery.era}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Chính xác: {currentMystery.name}
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#451a03]">
                      {currentMystery.name}
                    </h3>
                    <div className="text-xs font-semibold text-amber-800">
                      {currentMystery.title}
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed pt-1">
                      {currentMystery.revealedSummary}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenAiWithPrompt(currentMystery.aiPrompt)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-xs border border-amber-300 shadow-2xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Hỏi Bạn Sử Nhí thêm về {currentMystery.name}</span>
                  </button>

                  <button
                    onClick={handleNextMystery}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <span>Nhân vật tiếp theo →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          GAME 5: LẬT THẺ BÀI TRÍ NHỚ LỊCH SỬ (VISUAL MEMORY MATCH CARDS)
          ========================================================================= */}
      {activeGame === 'memory-cards' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-[#fffdfa] rounded-3xl border-2 border-[#eedec7] p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
            <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/20" />
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eedec7]">
              <div>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                  Trò chơi trí nhớ thị giác
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03] mt-1.5">
                  Lật Thẻ Trí Nhớ: Mốc Son & Danh Nhân
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Lật và ghép đôi 6 cặp thẻ: Hình ảnh minh họa ↔ Chiến công / Mốc son lịch sử tương ứng.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
                  Cặp đã tìm: <span className="font-extrabold text-amber-800">{matchedPairIds.length} / 6</span>
                </div>
                <div className="text-xs font-bold text-stone-600 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
                  Số lượt lật: <strong>{movesCount}</strong>
                </div>
                <button
                  onClick={handleResetMemoryGame}
                  className="p-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 shadow-2xs transition-colors"
                  title="Xáo bài và chơi lại từ đầu"
                >
                  <Shuffle className="w-4 h-4 text-amber-800" />
                </button>
              </div>
            </div>

            {/* Last matched celebration alert */}
            {lastMatchedTitle && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-950 font-bold flex items-center justify-between animate-in fade-in">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Ghép đúng cặp thẻ: {lastMatchedTitle} (+15 điểm)!
                </span>
                <span className="text-emerald-700">★ Xuất sắc!</span>
              </div>
            )}

            {/* All Matched Victory Screen */}
            {matchedPairIds.length === 6 ? (
              <div className="p-8 text-center bg-gradient-to-br from-[#faf4e8] to-[#f5e9d3] rounded-3xl border-2 border-amber-400 space-y-4 shadow-sm animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-amber-700 text-white flex items-center justify-center mx-auto shadow-md">
                  <Trophy className="w-8 h-8 text-amber-200" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-[#451a03]">
                  CHÚC MỪNG EM ĐÃ HOÀN THÀNH XUẤT SẮC!
                </h3>
                <div className="flex justify-center items-center gap-2 text-amber-500">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                  <Star className="w-8 h-8 fill-amber-400 text-amber-500" />
                  <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                </div>
                <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto">
                  Em đã ghi nhớ chính xác toàn bộ 6 mốc son và chân dung lịch sử sau <strong>{movesCount}</strong> lượt lật thẻ!
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleResetMemoryGame}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Chơi lại ván mới (Xáo bài)</span>
                  </button>
                  <button
                    onClick={() => setActiveGame('quiz')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold shadow-2xs transition-colors"
                  >
                    <span>Sang Trắc nghiệm kiến thức</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* 12 Cards Grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {memoryCards.map((card, idx) => {
                  const isFlipped = flippedIndices.includes(idx) || matchedPairIds.includes(card.pairId);
                  const isMatched = matchedPairIds.includes(card.pairId);

                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(idx)}
                      className={`cursor-pointer rounded-2xl h-44 sm:h-48 transition-all duration-300 transform select-none ${
                        isMatched
                          ? 'ring-2 ring-emerald-500 shadow-md opacity-90'
                          : 'hover:scale-[1.02] shadow-xs hover:shadow-md'
                      }`}
                    >
                      {isFlipped ? (
                        /* Card Front Face */
                        <div className="w-full h-full rounded-2xl p-3 bg-white border-2 border-amber-400 flex flex-col justify-between overflow-hidden relative shadow-2xs">
                          {card.isImageCard && card.imageUrl ? (
                            <>
                              <div className="w-full h-28 rounded-xl overflow-hidden bg-stone-900 border border-stone-200 relative">
                                <img
                                  src={card.imageUrl}
                                  alt={card.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              </div>
                              <div className="text-[11px] font-bold text-[#451a03] line-clamp-2 mt-1">
                                {card.content}
                              </div>
                            </>
                          ) : (
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 self-start">
                                {card.title}
                              </span>
                              <p className="text-xs font-bold text-[#451a03] leading-relaxed line-clamp-4">
                                {card.content}
                              </p>
                              <span className="text-[10px] text-stone-400 italic">Thẻ sự kiện</span>
                            </div>
                          )}

                          {isMatched && (
                            <div className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Card Back Face (Đông Sơn Pattern) */
                        <div className="w-full h-full rounded-2xl p-3 bg-gradient-to-br from-amber-800 via-amber-900 to-[#381604] border-2 border-amber-600/70 flex flex-col items-center justify-center text-center text-amber-200 relative overflow-hidden shadow-2xs">
                          <DongSonDrumSVG size={72} className="opacity-25 absolute pointer-events-none text-amber-300" />
                          <DongSonStar size={24} className="text-amber-400 mb-1 z-10" />
                          <span className="font-display font-extrabold text-xs tracking-wider text-amber-100 z-10">
                            SỬ VIỆT
                          </span>
                          <span className="text-[9.5px] text-amber-300/80 z-10">Lật thẻ trí nhớ</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: THÊM CÂU HỎI TRẮC NGHIỆM MỚI (TỰ DO THÊM VÀ ĐỒNG BỘ)
          ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
          <div className="relative bg-[#fffdfa] rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border-2 border-[#e8d7be] overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#eedec7]">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase">
                  <DongSonStar size={16} className="text-amber-700" />
                  <span>Ngân hàng đề thi GDPT 2018</span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-[#451a03] mt-0.5">
                  Thêm Câu Hỏi Trắc Nghiệm Mới
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateQuestion} className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              {/* Question Text */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Nội dung câu hỏi trắc nghiệm *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Ví dụ: Năm 938, Ngô Quyền đã dùng kế sách thông minh gì để đánh tan thủy quân Nam Hán?"
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] focus:ring-2 focus:ring-amber-500 bg-white font-sans text-xs"
                />
              </div>

              {/* Grade and Lesson */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Khối lớp *</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(Number(e.target.value) as 4 | 5)}
                    className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white font-bold text-amber-900"
                  >
                    <option value={4}>Lịch sử và Địa lí Lớp 4</option>
                    <option value={5}>Lịch sử và Địa lí Lớp 5</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Bài học SGK Kết nối tri thức *</label>
                  <select
                    value={newLessonCode}
                    onChange={(e) => setNewLessonCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white text-stone-800"
                  >
                    {TEXTBOOK_LESSONS.filter((l) => l.grade === newGrade).map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.code} - {l.title.slice(0, 32)}...
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4 Options */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#451a03]">4 Phương án trả lời & Chọn đáp án đúng:</span>
                  <span className="text-[11px] text-amber-800 italic">Bấm chữ cái để tích đáp án đúng</span>
                </div>

                {[
                  { key: 0, label: 'A', value: newOptA, setter: setNewOptA },
                  { key: 1, label: 'B', value: newOptB, setter: setNewOptB },
                  { key: 2, label: 'C', value: newOptC, setter: setNewOptC },
                  { key: 3, label: 'D', value: newOptD, setter: setNewOptD },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNewCorrectIndex(item.key)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 flex items-center justify-center transition-all ${
                        newCorrectIndex === item.key
                          ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-300'
                          : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                      }`}
                      title={newCorrectIndex === item.key ? 'Đáp án đúng' : 'Bấm để chọn làm đáp án đúng'}
                    >
                      {item.label}
                    </button>
                    <input
                      type="text"
                      required={item.key < 2}
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      placeholder={`Phương án ${item.label}...`}
                      className={`flex-1 p-2 rounded-xl border text-xs bg-white ${
                        newCorrectIndex === item.key ? 'border-emerald-500 ring-1 ring-emerald-400 font-semibold' : 'border-[#d6be9e]'
                      }`}
                    />
                    {newCorrectIndex === item.key && (
                      <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                        ✓ Đúng
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Explanation and Source */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Lời giải thích cặn kẽ sau khi học sinh trả lời
                </label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Giải thích vì sao đáp án đó là chính xác, cung cấp cứ liệu lịch sử..."
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white text-xs font-sans"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Nguồn tư liệu đối chiếu</label>
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="SGK Lịch sử và Địa lí 4 - Bộ Kết nối tri thức"
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white text-xs font-sans"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex justify-end gap-2 border-t border-[#eedec7]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-xl font-bold shadow-xs transition-colors"
                >
                  {isSubmitting ? 'Đang lưu...' : 'Lưu & Xuất bản câu hỏi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: QUẢN LÝ NGÂN HÀNG CÂU HỎI (XÓA VÀ ĐỒNG BỘ DỮ LIỆU)
          ========================================================================= */}
      {showManageModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
          <div className="relative bg-[#fffdfa] rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border-2 border-[#e8d7be] overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#eedec7]">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase">
                  <DongSonStar size={16} className="text-amber-700" />
                  <span>Quản lý hệ thống</span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-[#451a03] mt-0.5">
                  Ngân Hàng Câu Hỏi Trắc Nghiệm ({quizQuestions.length} câu)
                </h3>
              </div>
              <button
                onClick={() => setShowManageModal(false)}
                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="py-3 flex flex-col sm:flex-row items-center gap-2 border-b border-[#eedec7]">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  value={manageSearch}
                  onChange={(e) => setManageSearch(e.target.value)}
                  placeholder="Tìm kiếm câu hỏi, bài học, từ khóa..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#d6be9e] text-xs bg-white"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                {(['all', '4', '5'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setManageGradeFilter(g)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      manageGradeFilter === g
                        ? 'bg-amber-800 text-white'
                        : 'bg-white border border-[#d6be9e] text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {g === 'all' ? 'Tất cả' : `Lớp ${g}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Question List */}
            <div className="overflow-y-auto flex-1 py-3 divide-y divide-[#eedec7] text-xs space-y-3">
              {filteredManageQuestions.map((q, idx) => (
                <div key={q.id} className="pt-3 pb-2 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#451a03]">#{idx + 1}</span>
                        {q.grade && (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                            Lớp {q.grade}
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          {q.lessonCode}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-stone-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    {/* Delete Question Button */}
                    <button
                      onClick={() => handleDeleteQuestion(q.id, q.question)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors shrink-0"
                      title="Xóa câu hỏi khỏi ngân hàng đề thi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa câu này</span>
                    </button>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded-xl border text-[11px] flex items-center gap-2 ${
                          optIdx === q.correctIndex
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-white border-stone-200 text-stone-600'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="truncate">{opt}</span>
                        {optIdx === q.correctIndex && (
                          <span className="ml-auto text-[10px] text-emerald-700">✓ Đúng</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-stone-500 pt-0.5">
                    Giải thích: {q.explanation} · Nguồn: {q.source}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#eedec7] flex justify-between items-center text-xs">
              <span className="text-stone-500">
                Hiển thị {filteredManageQuestions.length} / {quizQuestions.length} câu hỏi
              </span>
              <button
                onClick={() => setShowManageModal(false)}
                className="px-5 py-2 bg-amber-800 text-white rounded-xl font-bold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
