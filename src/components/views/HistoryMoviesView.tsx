import React, { useState, useEffect } from 'react';
import {
  Film,
  Play,
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Plus,
  Upload,
  Trash2,
  X,
  RefreshCw,
  AlertCircle,
  Video,
  Link as LinkIcon,
  Check,
  Eye,
  Download,
  Info
} from 'lucide-react';
import { DongSonCorner, DongSonStar, ChimLacSVG } from '../DongSonMotif';
import { UserProfile, HistoryMovie } from '../../types';
import { HISTORICAL_PERIODS, TEXTBOOK_LESSONS } from '../../data/historyData';

interface HistoryMoviesViewProps {
  currentUser?: UserProfile | null;
  onOpenAiWithPrompt: (prompt: string, context?: any) => void;
}

// Default verified historical movies with working links and curated pedagogical questions
const DEFAULT_MOVIES: HistoryMovie[] = [
  {
    id: 'mov-1',
    title: 'Hoạt hình lịch sử: Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    category: 'animation',
    categoryLabel: 'Hoạt hình lịch sử',
    grade: 4,
    period: 'Bắc thuộc & Tự chủ',
    duration: '14 phút 25 giây',
    thumbnailColor: 'from-amber-700 to-amber-900',
    summary: 'Tái hiện sinh động kế sách cắm bãi cọc gỗ lim bịt sắt xuống lòng sông Bạch Đằng, nắm bắt quy luật con nước thủy triều để dụ địch và tiêu diệt toàn bộ thủy quân Nam Hán của Lưu Hoằng Tháo, chấm dứt hơn 1000 năm Bắc thuộc.',
    source: 'Dự án phim Lịch sử Việt Sử Kiêu Hùng & Ban cố vấn Sử học',
    videoUrl: 'https://www.youtube.com/watch?v=KWQqgkpV74k',
    preQuestions: [
      'Ngô Quyền đã chọn dòng sông nào và địa hình hiểm yếu nào để đón đánh quân xâm lược Nam Hán?',
      'Vì sao việc nắm vững quy luật con nước thủy triều lại là mấu chốt tạo nên đại thắng Bạch Đằng?'
    ],
    postQuestions: [
      'Chiến thắng Bạch Đằng năm 938 có ý nghĩa bước ngoặt lịch sử thế nào đối với nền độc lập muôn đời của dân tộc?',
      'Em học tập được điều gì từ tài mưu lược quân sự và lòng yêu nước của Anh hùng dân tộc Ngô Quyền?'
    ]
  },
  {
    id: 'mov-2',
    title: 'Phim 3D lịch sử: Nỏ thần An Dương Vương và Thành ốc Cổ Loa',
    category: 'animation',
    categoryLabel: 'Hoạt hình lịch sử',
    grade: 4,
    period: 'Buổi đầu dựng nước',
    duration: '12 phút 10 giây',
    thumbnailColor: 'from-teal-700 to-emerald-900',
    summary: 'Khám phá thành tựu kỹ thuật quân sự đỉnh cao thời Âu Lạc với kiến trúc 3 vòng thành đất xoắn ốc Cổ Loa kiên cố và nỏ thần bắn cùng lúc nhiều mũi tên đồng Cầu Vực.',
    source: 'Truyền hình Giáo dục & Viện Khảo cổ học Việt Nam',
    videoUrl: 'https://www.youtube.com/watch?v=3a2rGErvDmc',
    preQuestions: [
      'Thành Cổ Loa do vị vua nào cho khởi công xây dựng và có hình dạng kiến trúc đặc biệt gì?',
      'Kho hiện vật hàng vạn mũi tên đồng tìm thấy ở Cổ Loa chứng minh điều gì về tài năng của người Việt cổ?'
    ],
    postQuestions: [
      'Phân biệt yếu tố huyền thoại "Rùa vàng trao móng" với thành tựu kỹ thuật quân sự chế tạo nỏ bắn liên thanh của An Dương Vương và tướng Cao Lỗ.',
      'Bài học lịch sử sâu sắc về tinh thần cảnh giác bảo vệ chủ quyền non sông đất nước qua câu chuyện thành Cổ Loa là gì?'
    ]
  },
  {
    id: 'mov-3',
    title: 'Hoạt hình lịch sử 3D: Lời thề sông Hát – Khởi nghĩa Hai Bà Trưng',
    category: 'animation',
    categoryLabel: 'Hoạt hình lịch sử',
    grade: 4,
    period: 'Bắc thuộc & Tự chủ',
    duration: '10 phút 30 giây',
    thumbnailColor: 'from-rose-700 to-red-900',
    summary: 'Hình tượng Trưng Trắc cùng Trưng Nhị cưỡi voi phất cờ khởi nghĩa tại cửa sông Hát năm 40, quét sạch ách đô hộ tàn bạo của thái thú Tô Định, giành lại quyền tự chủ đầu tiên thời Bắc thuộc.',
    source: 'Hãng phim Hoạt hình Việt Nam & Đài Phát thanh Truyền hình',
    videoUrl: 'https://www.youtube.com/watch?v=dMV1AFed8F4',
    preQuestions: [
      'Hai Bà Trưng đã dựng cờ khởi nghĩa xuất quân tại đâu và vào năm nào?',
      'Bốn câu thơ trong lời thề xuất quân ("Một xin rửa sạch nước thù...") thể hiện quyết tâm gì?'
    ],
    postQuestions: [
      'Sau khi đuổi giặc ngoại xâm, Trưng Trắc đã lên ngôi vua và đóng đô ở vùng đất nào?',
      'Hình ảnh Hai Bà Trưng cưỡi voi ra trận khơi dậy cho em niềm tự hào gì về truyền thống anh hùng của phụ nữ Việt Nam?'
    ]
  },
  {
    id: 'mov-4',
    title: 'Thước phim tư liệu lịch sử: Toàn văn Bác Hồ đọc Tuyên ngôn Độc lập ngày 2-9-1945',
    category: 'documentary',
    categoryLabel: 'Thước phim tư liệu quý',
    grade: 5,
    period: 'Giai đoạn 1858–1945',
    duration: '9 phút 15 giây',
    thumbnailColor: 'from-amber-600 to-red-800',
    summary: 'Thước phim tư liệu màu quý báu ghi lại hình ảnh Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử, khai sinh nước Việt Nam Dân chủ Cộng hòa trước hàng chục vạn đồng bào.',
    source: 'Trung tâm Phim Tài liệu VTV & Cục Lưu trữ Văn thư Quốc gia',
    videoUrl: 'https://www.youtube.com/watch?v=xRKUB3fUTJM',
    preQuestions: [
      'Sự kiện lịch sử trọng đại ngày 2/9/1945 diễn ra tại địa danh nào của Thủ đô Hà Nội?',
      'Câu nói ân cần, gần gũi nào của Bác Hồ trong buổi lễ đã kết nối hàng triệu trái tim người Việt Nam?'
    ],
    postQuestions: [
      'Bản Tuyên ngôn Độc lập năm 1945 đã khẳng định những quyền cơ bản thiêng liêng nào của dân tộc ta?',
      'Cảm nghĩ và niềm tự hào của em là học sinh tiểu học hôm nay khi được sống trong một đất nước độc lập, tự do?'
    ]
  },
  {
    id: 'mov-5',
    title: 'Phim tài liệu toàn cảnh: 56 ngày đêm Chiến dịch Điện Biên Phủ (1954)',
    category: 'documentary',
    categoryLabel: 'Phim tư liệu quý',
    grade: 5,
    period: 'Kháng chiến chống Pháp',
    duration: '15 phút 40 giây',
    thumbnailColor: 'from-cyan-800 to-blue-950',
    summary: 'Toàn cảnh chiến dịch Điện Biên Phủ lừng lẫy năm châu, chấn động địa cầu; tái hiện nghệ thuật quân sự tài tình của Đại tướng Võ Nguyên Giáp và tinh thần chiến đấu quả cảm của anh hùng Tô Vĩnh Diện, Phan Đình Giót, Bế Văn Đàn.',
    source: 'Điện ảnh Quân đội Nhân dân & VTV Đặc biệt',
    videoUrl: 'https://www.youtube.com/watch?v=Dykwdja71IU',
    preQuestions: [
      'Chiến dịch Điện Biên Phủ do vị Tổng Tư lệnh kiêm Chỉ huy trưởng chiến dịch nào lãnh đạo?',
      'Vì sao thực dân Pháp lại tự tin tuyên bố Điện Biên Phủ là pháo đài bất khả xâm phạm?'
    ],
    postQuestions: [
      'Hành động dũng cảm chèn lưng cứu pháo của anh hùng Tô Vĩnh Diện thể hiện tinh thần cách mạng gì?',
      'Ý nghĩa lịch sử to lớn của Chiến thắng Điện Biên Phủ năm 1954 đối với phong trào giải phóng dân tộc trên thế giới?'
    ]
  },
  {
    id: 'mov-6',
    title: 'Phim tư liệu màu: Thời khắc lịch sử 11h30 ngày 30/4/1975 – Non sông thống nhất',
    category: 'documentary',
    categoryLabel: 'Thước phim tư liệu quý',
    grade: 5,
    period: 'Kháng chiến chống Mỹ',
    duration: '11 phút 05 giây',
    thumbnailColor: 'from-orange-700 to-stone-900',
    summary: 'Những thước phim tư liệu quý giá về đoàn xe tăng quân giải phóng tiến vào Sài Gòn, xe tăng húc đổ cánh cổng sắt Dinh Độc Lập, cắm cờ giải phóng trên nóc dinh, đánh dấu mốc son toàn thắng non sông Việt Nam liền một dải.',
    source: 'Đài Truyền hình Việt Nam (VTV) & Bảo tàng Lịch sử Quân sự Việt Nam',
    videoUrl: 'https://www.youtube.com/watch?v=ecJSxFzvSKk',
    preQuestions: [
      'Lá cờ Mặt trận Dân tộc Giải phóng miền Nam được cắm trên nóc Dinh Độc Lập vào đúng thời khắc nào?',
      'Tên chiến dịch quân sự mang tên Bác Hồ vĩ đại giải phóng hoàn toàn miền Nam là gì?'
    ],
    postQuestions: [
      'Vì sao ngày 30/4 hằng năm là Ngày hội non sông thống nhất, ngày hòa bình của toàn thể dân tộc ta?',
      'Thế hệ học sinh hôm nay cần rèn luyện những phẩm chất gì để xứng đáng với sự hy sinh của các thế hệ cha anh?'
    ]
  },
  {
    id: 'mov-7',
    title: 'Hoạt hình lịch sử: Vua Quang Trung đại phá 29 vạn quân Thanh – Trận Ngọc Hồi Đống Đa 1789',
    category: 'animation',
    categoryLabel: 'Hoạt hình lịch sử',
    grade: 4,
    period: 'Các triều đại quân chủ độc lập',
    duration: '13 phút 20 giây',
    thumbnailColor: 'from-amber-600 to-rose-900',
    summary: 'Khắc họa cuộc hành quân thần tốc của Hoàng đế Quang Trung (Nguyễn Huệ) từ Phú Xuân ra Thăng Long, dùng trận rơm bện ướt phá đồn Ngọc Hồi, đánh tan 29 vạn quân xâm lược Mãn Thanh vào đúng sáng mùng 5 Tết Kỷ Dậu 1789.',
    source: 'Phim Hoạt hình Lịch sử Việt Nam & Hội Khoa học Lịch sử',
    videoUrl: 'https://www.youtube.com/watch?v=JpuOBMLx2u4',
    preQuestions: [
      'Nguyễn Huệ đã làm lễ lên ngôi Hoàng đế lấy niên hiệu Quang Trung tại đâu trước khi tiến quân ra Bắc?',
      'Lời hiểu dụ của vua Quang Trung thể hiện quyết tâm bảo vệ bản sắc và độc lập dân tộc như thế nào?'
    ],
    postQuestions: [
      'Yếu tố bất ngờ và nghệ thuật hành quân thần tốc nào đã giúp quân Tây Sơn chiến thắng quân Thanh chỉ trong 5 ngày đêm?',
      'Ý nghĩa của Chiến thắng Ngọc Hồi - Đống Đa mùa xuân năm 1789 đối với lịch sử nước nhà?'
    ]
  },
  {
    id: 'mov-8',
    title: 'Phim tư liệu di sản: Quần thể Di tích Cố đô Huế – Di sản Văn hóa Thế giới',
    category: 'documentary',
    categoryLabel: 'Phim tư liệu quý',
    grade: 5,
    period: 'Các triều đại quân chủ độc lập',
    duration: '12 phút 45 giây',
    thumbnailColor: 'from-purple-800 to-stone-900',
    summary: 'Khám phá toàn cảnh kiến trúc Kinh thành Huế, Ngọ Môn, Điện Thái Hòa, lăng tẩm các vua triều Nguyễn và nghệ thuật Nhã nhạc cung đình Huế được UNESCO vinh danh là Di sản văn hóa thế giới.',
    source: 'Trung tâm Bảo tồn Di tích Cố đô Huế & VTV',
    videoUrl: 'https://www.youtube.com/watch?v=SVCcsqD_BkY',
    preQuestions: [
      'Kinh thành Huế được xây dựng dọc theo đôi bờ dòng sông thơ mộng nào của miền Trung?',
      'Quần thể di tích Cố đô Huế được tổ chức quốc tế nào công nhận là Di sản Văn hóa Thế giới đầu tiên của Việt Nam?'
    ],
    postQuestions: [
      'Nêu các công trình kiến trúc tiêu biểu nhất bên trong Hoàng thành và Tử Cấm Thành Huế.',
      'Trách nhiệm của thế hệ trẻ trong việc giữ gìn và phát huy các giá trị di sản văn hóa truyền thống của dân tộc là gì?'
    ]
  }
];

// Helper to extract video information from various formats (YouTube, Direct Video File, Google Drive, etc.)
function parseVideoUrl(url: string) {
  if (!url) return { type: 'unknown' as const, embedUrl: '', watchUrl: '', rawUrl: '' };

  const trimmed = url.trim();

  // YouTube URLs: watch?v=, youtu.be/, embed/, shorts/
  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube' as const,
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      rawUrl: trimmed
    };
  }

  // Google Drive preview
  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    const fileId = gdriveMatch[1];
    return {
      type: 'gdrive' as const,
      fileId,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      watchUrl: trimmed,
      rawUrl: trimmed
    };
  }

  // Direct uploaded video file (/uploads/... or .mp4, .webm, blob:)
  if (
    trimmed.startsWith('/uploads/') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:video/') ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed)
  ) {
    return {
      type: 'direct_video' as const,
      embedUrl: trimmed,
      watchUrl: trimmed,
      rawUrl: trimmed
    };
  }

  // Generic link
  return {
    type: 'web_link' as const,
    embedUrl: trimmed,
    watchUrl: trimmed,
    rawUrl: trimmed
  };
}

export const HistoryMoviesView: React.FC<HistoryMoviesViewProps> = ({
  currentUser,
  onOpenAiWithPrompt
}) => {
  const [movies, setMovies] = useState<HistoryMovie[]>(() => {
    try {
      const cached = localStorage.getItem('dauan_history_movies_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return DEFAULT_MOVIES;
  });

  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<HistoryMovie | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Upload Movie Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'animation' | 'documentary' | 'reenactment' | 'lecture'>('animation');
  const [uploadGrade, setUploadGrade] = useState<4 | 5 | 'all'>(4);
  const [uploadPeriod, setUploadPeriod] = useState('Bắc thuộc & Tự chủ');
  const [uploadDuration, setUploadDuration] = useState('10 phút');
  const [uploadSummary, setUploadSummary] = useState('');
  const [uploadSource, setUploadSource] = useState('Hãng phim Hoạt hình VN & Viện Sử học');
  const [uploadMethod, setUploadMethod] = useState<'youtube' | 'file' | 'link'>('youtube');
  const [uploadVideoUrl, setUploadVideoUrl] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFileBase64, setUploadFileBase64] = useState<string>('');
  const [preQuestion1, setPreQuestion1] = useState('Nội dung chính của video này đề cập đến thời kì hoặc nhân vật lịch sử nào?');
  const [preQuestion2, setPreQuestion2] = useState('Hãy chú ý đến các mốc thời gian và địa danh xuất hiện trong video.');
  const [postQuestion1, setPostQuestion1] = useState('Sau khi xem xong, em ấn tượng nhất với sự kiện hoặc chi tiết nào?');
  const [postQuestion2, setPostQuestion2] = useState('Ý nghĩa của sự kiện lịch sử này đối với non sông đất nước ta là gì?');

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const isTeacherOrAdmin =
    currentUser?.role === 'admin' ||
    currentUser?.role === 'teacher' ||
    currentUser?.email === 'pham.thanhh212@gmail.com';

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/movies');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMovies(data);
          try {
            localStorage.setItem('dauan_history_movies_v3', JSON.stringify(data));
          } catch (e) {
            // ignore
          }
        }
      }
    } catch (err) {
      console.warn('Could not fetch movies from server, using local list:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');
    setUploadLoading(true);

    try {
      if (!uploadTitle.trim()) {
        throw new Error('Vui lòng nhập tiêu đề phim lịch sử.');
      }

      let finalVideoUrl = uploadVideoUrl.trim();

      // If uploading a video file from local device
      if (uploadMethod === 'file') {
        if (!uploadFile || !uploadFileBase64) {
          throw new Error('Vui lòng chọn một tệp video (MP4, WebM, MOV) từ máy tính hoặc điện thoại.');
        }

        const uploadRes = await fetch('/api/upload-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: uploadFile.name,
            fileData: uploadFileBase64,
            fileType: uploadFile.type || 'video/mp4'
          })
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || 'Tải tệp video lên máy chủ thất bại.');
        }
        finalVideoUrl = uploadData.fileUrl;
      } else {
        if (!finalVideoUrl) {
          throw new Error('Vui lòng nhập đường dẫn video (YouTube hoặc liên kết trực tiếp).');
        }
      }

      const categoryLabels: Record<string, string> = {
        animation: 'Hoạt hình lịch sử',
        documentary: 'Phim tư liệu quý',
        reenactment: 'Phim tái hiện lịch sử',
        lecture: 'Video bài giảng'
      };

      const thumbnailGradients = [
        'from-amber-700 to-amber-900',
        'from-teal-700 to-emerald-900',
        'from-rose-700 to-red-900',
        'from-amber-600 to-red-800',
        'from-cyan-800 to-blue-950',
        'from-orange-700 to-stone-900',
        'from-purple-800 to-indigo-950'
      ];
      const randomGradient = thumbnailGradients[Math.floor(Math.random() * thumbnailGradients.length)];

      const moviePayload = {
        title: uploadTitle.trim(),
        category: uploadCategory,
        categoryLabel: categoryLabels[uploadCategory] || 'Phim lịch sử',
        grade: uploadGrade,
        period: uploadPeriod,
        duration: uploadDuration.trim() || '10 phút',
        thumbnailColor: randomGradient,
        summary: uploadSummary.trim() || `Tư liệu video lịch sử: ${uploadTitle.trim()}`,
        source: uploadSource.trim() || 'Học liệu Dấu Ấn Non Sông',
        videoUrl: finalVideoUrl,
        preQuestions: [preQuestion1.trim(), preQuestion2.trim()].filter(Boolean),
        postQuestions: [postQuestion1.trim(), postQuestion2.trim()].filter(Boolean),
        author: currentUser?.name || 'Cô giáo Phạm Thị Thanh',
        authorEmail: currentUser?.email || 'pham.thanhh212@gmail.com'
      };

      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moviePayload)
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Lỗi khi lưu phim mới.');
      }

      const savedMovie: HistoryMovie = resData.movie || {
        ...moviePayload,
        id: 'mov-' + Date.now()
      };

      // Update state and cache immediately
      const updatedList = [savedMovie, ...movies.filter((m) => m.id !== savedMovie.id)];
      setMovies(updatedList);
      try {
        localStorage.setItem('dauan_history_movies_v3', JSON.stringify(updatedList));
      } catch (e) {
        // ignore
      }

      setSuccessToast(`Đã xuất bản thành công phim: "${savedMovie.title}"!`);
      setTimeout(() => setSuccessToast(''), 4000);

      // Reset form
      setUploadTitle('');
      setUploadVideoUrl('');
      setUploadFile(null);
      setUploadFileBase64('');
      setUploadSummary('');
      setIsUploadModalOpen(false);

      // Automatically open the player for the newly uploaded movie so user can watch it!
      setSelectedMovie(savedMovie);
    } catch (err: any) {
      setUploadError(err.message || 'Lỗi không xác định khi tải phim.');
    } finally {
      setUploadLoading(false);
    }
  };

  const [deleteConfirmMovieId, setDeleteConfirmMovieId] = useState<string | null>(null);

  const handleDeleteMovie = async (movieId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    try {
      await fetch(`/api/movies/${movieId}`, { method: 'DELETE' });
      const updatedList = movies.filter((m) => m.id !== movieId);
      setMovies(updatedList);
      try {
        localStorage.setItem('dauan_history_movies_v3', JSON.stringify(updatedList));
      } catch (e) {
        // ignore
      }
      if (selectedMovie?.id === movieId) {
        setSelectedMovie(null);
      }
      setDeleteConfirmMovieId(null);
      setSuccessToast('Đã xóa phim khỏi danh sách và đồng bộ hệ thống thành công.');
      setTimeout(() => setSuccessToast(''), 3000);
    } catch (err) {
      console.error('Error deleting movie:', err);
    }
  };

  const filteredMovies = movies.filter((m) => {
    const matchesCategory = filterCategory === 'all' || m.category === filterCategory;
    const matchesGrade = filterGrade === 'all' || m.grade === filterGrade || m.grade === 'all';
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.period && m.period.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.summary && m.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.source && m.source.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesGrade && matchesSearch;
  });

  const parsedCurrentVideo = selectedMovie ? parseVideoUrl(selectedMovie.videoUrl) : null;

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-5 z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border-2 border-emerald-400 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Deck with Đông Sơn Accents */}
      <div className="relative bg-[#fffdfa] rounded-3xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <DongSonStar size={16} className="text-amber-700" />
              <span>Thư viện phim lịch sử số</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-stone-500 font-normal">Trực quan & Giáo dục</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-amber-700 font-semibold">{movies.length} tác phẩm</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1">
              Phim Lịch Sử Việt Nam
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 max-w-2xl leading-relaxed">
              Tuyển tập phim hoạt hình lịch sử, phim tư liệu quý và phim tái hiện được chọn lọc bám sát chương trình GDPT 2018. Học sinh có thể xem video trực tuyến, trả lời câu hỏi tư duy và thảo luận cùng Bạn Sử Nhí AI.
            </p>
          </div>

          {/* Action buttons: Quick Grade Switch + Add Movie Button */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Refresh button */}
            <button
              onClick={fetchMovies}
              disabled={loading}
              title="Cập nhật danh sách phim"
              className="p-2.5 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-amber-900 transition-colors shadow-2xs"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-600' : ''}`} />
            </button>

            {/* Quick grade switch */}
            <div className="flex items-center gap-1 p-1 bg-amber-50/80 rounded-xl border border-amber-200 text-xs font-bold">
              <button
                onClick={() => setFilterGrade('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterGrade === 'all' ? 'bg-amber-700 text-white shadow-2xs' : 'text-stone-700 hover:text-amber-900'
                }`}
              >
                Tất cả lớp
              </button>
              <button
                onClick={() => setFilterGrade(4)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterGrade === 4 ? 'bg-amber-700 text-white shadow-2xs' : 'text-stone-700 hover:text-amber-900'
                }`}
              >
                Lớp 4
              </button>
              <button
                onClick={() => setFilterGrade(5)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterGrade === 5 ? 'bg-amber-700 text-white shadow-2xs' : 'text-stone-700 hover:text-amber-900'
                }`}
              >
                Lớp 5
              </button>
            </div>

            {/* Upload New Movie Button */}
            <button
              onClick={() => {
                setUploadError('');
                setIsUploadModalOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-amber-950 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all transform hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>+ Đăng phim mới</span>
            </button>
          </div>
        </div>

        {/* Filters and search bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar font-semibold">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3.5 py-2 rounded-xl transition-colors shrink-0 ${
                filterCategory === 'all'
                  ? 'bg-amber-800 text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#e0cbaf] text-stone-700 hover:bg-amber-50'
              }`}
            >
              Tất cả phim ({movies.length})
            </button>
            <button
              onClick={() => setFilterCategory('animation')}
              className={`px-3.5 py-2 rounded-xl transition-colors shrink-0 ${
                filterCategory === 'animation'
                  ? 'bg-amber-800 text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#e0cbaf] text-stone-700 hover:bg-amber-50'
              }`}
            >
              Hoạt hình lịch sử
            </button>
            <button
              onClick={() => setFilterCategory('documentary')}
              className={`px-3.5 py-2 rounded-xl transition-colors shrink-0 ${
                filterCategory === 'documentary'
                  ? 'bg-amber-800 text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#e0cbaf] text-stone-700 hover:bg-amber-50'
              }`}
            >
              Phim tư liệu quý
            </button>
            <button
              onClick={() => setFilterCategory('reenactment')}
              className={`px-3.5 py-2 rounded-xl transition-colors shrink-0 ${
                filterCategory === 'reenactment'
                  ? 'bg-amber-800 text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#e0cbaf] text-stone-700 hover:bg-amber-50'
              }`}
            >
              Phim tái hiện
            </button>
            <button
              onClick={() => setFilterCategory('lecture')}
              className={`px-3.5 py-2 rounded-xl transition-colors shrink-0 ${
                filterCategory === 'lecture'
                  ? 'bg-amber-800 text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#e0cbaf] text-stone-700 hover:bg-amber-50'
              }`}
            >
              Video bài giảng
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm phim theo tên, thời kì, nguồn..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-[#d6be9e] focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Grid of Movies */}
      {filteredMovies.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-[#e8d7be] p-12 text-center space-y-3">
          <Film className="w-12 h-12 text-amber-600/50 mx-auto" />
          <h3 className="font-display font-bold text-lg text-amber-950">
            Chưa tìm thấy phim lịch sử phù hợp
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Không có kết quả nào khớp với bộ lọc hiện tại. Thầy cô và các em có thể bấm "+ Đăng phim mới" để tải lên tư liệu video đầu tiên!
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-2 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tải phim lịch sử lên ngay</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((mov) => {
            const videoInfo = parseVideoUrl(mov.videoUrl);

            return (
              <div
                key={mov.id}
                className="group bg-white rounded-3xl border-2 border-[#e8d7be] shadow-xs overflow-hidden flex flex-col justify-between hover:border-amber-600 hover:shadow-lg transition-all relative"
              >
                {/* Visual Thumbnail Area */}
                <div>
                  <div
                    onClick={() => setSelectedMovie(mov)}
                    className={`cursor-pointer h-48 bg-gradient-to-br ${
                      mov.thumbnailColor || 'from-amber-700 to-amber-900'
                    } p-5 text-white flex flex-col justify-between relative overflow-hidden`}
                  >
                    {/* YouTube Thumbnail Background if available */}
                    {videoInfo.thumbnailUrl && (
                      <img
                        src={videoInfo.thumbnailUrl}
                        alt={mov.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Hide on error
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}

                    {/* Background watermarks */}
                    <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
                      <DongSonStar size={110} className="text-white" />
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold z-10">
                      <span className="bg-black/55 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20 text-[11px]">
                        {mov.categoryLabel}
                      </span>
                      <span className="bg-amber-500 text-[#451a03] px-2 py-0.5 rounded-md font-extrabold text-[11px] shadow-xs">
                        {mov.grade === 'all' ? 'Lớp 4 & 5' : `Lớp ${mov.grade}`}
                      </span>
                    </div>

                    {/* Big Center Play Button */}
                    <div className="flex items-center justify-center my-auto z-10">
                      <div className="w-14 h-14 rounded-full bg-white/95 text-amber-900 flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-amber-500 group-hover:text-white transition-all duration-200">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-white/95 z-10 font-semibold bg-black/40 backdrop-blur-xs px-2 py-1 rounded-md">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {mov.duration}
                      </span>
                      <span className="truncate max-w-[150px]">{mov.period}</span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="p-5 space-y-2.5">
                    <h3
                      onClick={() => setSelectedMovie(mov)}
                      className="font-display font-bold text-base text-[#451a03] leading-snug group-hover:text-amber-800 transition-colors cursor-pointer"
                    >
                      {mov.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {mov.summary}
                    </p>
                    <div className="text-[11px] text-stone-500 pt-1 flex items-center justify-between">
                      <span className="truncate">
                        Nguồn: <strong>{mov.source}</strong>
                      </span>
                      {mov.author && (
                        <span className="text-[10px] text-amber-800/80 bg-amber-50 px-1.5 py-0.5 rounded">
                          {mov.author}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: View details & Ask AI & Delete */}
                <div className="p-5 pt-0 border-t border-[#f0e2cd] mt-3 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedMovie(mov)}
                    className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1 group-hover:text-amber-950"
                  >
                    <span>Xem video ngay</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                    {/* Delete button for teachers with inline confirmation */}
                    {isTeacherOrAdmin && (
                      deleteConfirmMovieId === mov.id ? (
                        <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-300 text-[11px]" onClick={(e) => e.stopPropagation()}>
                          <span className="text-rose-800 font-bold">Xóa?</span>
                          <button
                            onClick={(e) => handleDeleteMovie(mov.id, e)}
                            className="px-1.5 py-0.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded"
                          >
                            Có
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmMovieId(null);
                            }}
                            className="px-1.5 py-0.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium rounded"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmMovieId(mov.id);
                          }}
                          title="Xóa phim lịch sử này"
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        onOpenAiWithPrompt(
                          `Em vừa xem video lịch sử "${mov.title}". Hãy giải thích cho em bối cảnh lịch sử và 3 điều thú vị nhất trong video này!`
                        )
                      }
                      className="p-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      title="Hỏi Bạn Sử Nhí về video này"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Hỏi AI</span>
                    </button>
                  </div>
                </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          REAL VIDEO PLAYER & INTERACTIVE THINKING QUESTIONS MODAL
          ========================================================================= */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#fffdfa] rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border-2 border-[#e0cbaf] space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#e8d7be]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                    {selectedMovie.categoryLabel}
                  </span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-md">
                    {selectedMovie.grade === 'all' ? 'Lớp 4 & Lớp 5' : `Lớp ${selectedMovie.grade}`}
                  </span>
                  <span className="text-xs text-stone-600 font-medium">
                    · {selectedMovie.period}
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03] mt-2 leading-snug">
                  {selectedMovie.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMovie(null)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                title="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* REAL VIDEO PLAYER CONTAINER */}
            <div className="rounded-2xl overflow-hidden bg-black shadow-xl border-2 border-stone-800 aspect-video w-full flex items-center justify-center relative">
              {parsedCurrentVideo?.type === 'youtube' && parsedCurrentVideo.embedUrl ? (
                <iframe
                  src={parsedCurrentVideo.embedUrl}
                  title={selectedMovie.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : parsedCurrentVideo?.type === 'direct_video' ? (
                <video
                  src={selectedMovie.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                >
                  Trình duyệt của em chưa hỗ trợ phát trực tiếp định dạng video này.
                </video>
              ) : parsedCurrentVideo?.type === 'gdrive' ? (
                <iframe
                  src={parsedCurrentVideo.embedUrl}
                  title={selectedMovie.title}
                  allow="autoplay"
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="p-8 text-center text-white space-y-4">
                  <Film className="w-12 h-12 text-amber-400 mx-auto" />
                  <p className="text-sm font-semibold">
                    Video được lưu trữ tại liên kết ngoài
                  </p>
                  <a
                    href={selectedMovie.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs"
                  >
                    <span>Mở xem video trên nguồn gốc</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Player Utility Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs">
              <div className="flex items-center gap-3 text-stone-700">
                <span className="flex items-center gap-1 font-bold text-amber-900">
                  <Clock className="w-4 h-4 text-amber-700" />
                  Thời lượng: {selectedMovie.duration}
                </span>
                <span className="hidden sm:inline text-stone-400">|</span>
                <span className="hidden sm:inline text-stone-600">
                  Nguồn: <strong>{selectedMovie.source}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedMovie.videoUrl && (
                  <a
                    href={selectedMovie.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-900 font-bold border border-amber-300 flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mở nguồn ngoài / YouTube</span>
                  </a>
                )}

                <button
                  onClick={() => {
                    const prompt = `Em vừa xem video lịch sử "${selectedMovie.title}". Em muốn hỏi: ${
                      selectedMovie.preQuestions[0] || 'Hãy phân tích bài học lịch sử rút ra từ video này!'
                    }`;
                    setSelectedMovie(null);
                    onOpenAiWithPrompt(prompt, { movie: selectedMovie });
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Hỏi Bạn Sử Nhí về video</span>
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="text-xs text-stone-700 leading-relaxed bg-white p-4 rounded-2xl border border-[#eedec7]">
              <h4 className="font-bold text-[#451a03] mb-1 uppercase tracking-wide flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-700" />
                <span>Tóm tắt nội dung sư phạm:</span>
              </h4>
              <p>{selectedMovie.summary}</p>
            </div>

            {/* Pre & Post Thinking Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Câu hỏi trước khi xem */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>Gợi ý câu hỏi trước khi xem:</span>
                </h4>
                <ul className="space-y-1.5 text-amber-900 leading-relaxed list-disc list-inside">
                  {selectedMovie.preQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              {/* Câu hỏi củng cố sau khi xem */}
              <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-2">
                <h4 className="font-bold text-teal-950 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                  <span>Câu hỏi củng cố & suy ngẫm sau khi xem:</span>
                </h4>
                <ul className="space-y-1.5 text-teal-900 leading-relaxed list-disc list-inside">
                  {selectedMovie.postQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Note on distinguishing reenactment from actual artifact */}
            {selectedMovie.category === 'reenactment' && (
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Lưu ý sử học:</strong> Đây là phim tái hiện có diễn xuất phục dựng. Các em cần phân biệt trang phục, lời thoại diễn xuất với hình ảnh và hiện vật khảo cổ thực tế.
                </span>
              </div>
            )}

            {/* Modal Bottom Footer */}
            <div className="pt-2 flex justify-between items-center text-xs border-t border-[#eedec7]">
              <span className="text-stone-500">
                Người tải lên: {selectedMovie.author || 'Cô giáo Phạm Thị Thanh'}
              </span>
              <button
                onClick={() => setSelectedMovie(null)}
                className="px-6 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-bold transition-colors"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          UPLOAD NEW HISTORY MOVIE MODAL
          ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative bg-[#fffdfa] rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-2 border-[#e8d7be] flex flex-col max-h-[92vh] overflow-hidden my-auto">
            <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30 pointer-events-none" />
            <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7] shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <DongSonStar size={16} className="text-amber-700" />
                  <span>Quản lý học liệu số · Phim lịch sử</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#451a03] mt-0.5">
                  + TẢI LÊN PHIM LỊCH SỬ MỚI
                </h2>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadError && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Form Scrollable Area */}
            <form onSubmit={handleUploadMovie} className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              {/* 1. Tiêu đề */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  Tiêu đề phim / Tên bài giảng video *
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Ví dụ: Hoạt hình lịch sử: Chiến thắng Ngọc Hồi - Đống Đa của vua Quang Trung"
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                />
              </div>

              {/* 2. Khối lớp, Thể loại & Thời kì */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Khối lớp *</label>
                  <select
                    value={uploadGrade}
                    onChange={(e) => setUploadGrade(e.target.value === 'all' ? 'all' : (Number(e.target.value) as 4 | 5))}
                    className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white font-bold text-amber-900"
                  >
                    <option value={4}>Lịch sử Lớp 4</option>
                    <option value={5}>Lịch sử Lớp 5</option>
                    <option value="all">Cả Lớp 4 và Lớp 5</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Thể loại phim *</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white font-bold text-amber-900"
                  >
                    <option value="animation">Hoạt hình lịch sử</option>
                    <option value="documentary">Phim tư liệu quý</option>
                    <option value="reenactment">Phim tái hiện lịch sử</option>
                    <option value="lecture">Video bài giảng</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Thời lượng ước tính</label>
                  <input
                    type="text"
                    value={uploadDuration}
                    onChange={(e) => setUploadDuration(e.target.value)}
                    placeholder="Ví dụ: 8 phút 30 giây"
                    className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                  />
                </div>
              </div>

              {/* Thời kì lịch sử */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">Thời kì lịch sử</label>
                <select
                  value={uploadPeriod}
                  onChange={(e) => setUploadPeriod(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                >
                  <option value="Buổi đầu dựng nước">1. Buổi đầu dựng nước (Văn Lang, Âu Lạc)</option>
                  <option value="Bắc thuộc & Tự chủ">2. Hơn 1000 năm Bắc thuộc & Tự chủ (Hai Bà Trưng, Ngô Quyền)</option>
                  <option value="Các triều đại quân chủ độc lập">3. Các triều đại quân chủ độc lập (Lý, Trần, Lê, Tây Sơn, Nguyễn)</option>
                  <option value="Giai đoạn 1858–1945">4. Chống thực dân Pháp và giành độc lập (1858–1945)</option>
                  <option value="Kháng chiến chống Pháp">5. Kháng chiến chống thực dân Pháp (1945–1954)</option>
                  <option value="Kháng chiến chống Mỹ">6. Kháng chiến chống Mỹ, thống nhất đất nước (1954–1975)</option>
                  <option value="Thống nhất và xây dựng đất nước">7. Thống nhất, tái thiết và phát triển đất nước</option>
                  <option value="Đổi mới & Hội nhập">8. Đổi mới và hội nhập quốc tế (1986–nay)</option>
                </select>
              </div>

              {/* 3. Hình thức video: YouTube / Tải tệp MP4 / Link */}
              <div className="p-4 rounded-2xl bg-[#faf5ec] border border-[#eedec7] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#451a03] block">
                    Nguồn video để phát trực tiếp *
                  </label>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#d6be9e]">
                    <button
                      type="button"
                      onClick={() => setUploadMethod('youtube')}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                        uploadMethod === 'youtube'
                          ? 'bg-amber-800 text-white'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Dán link YouTube
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMethod('file')}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                        uploadMethod === 'file'
                          ? 'bg-amber-800 text-white'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Tải tệp video từ máy
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMethod('link')}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                        uploadMethod === 'link'
                          ? 'bg-amber-800 text-white'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Google Drive / Link khác
                    </button>
                  </div>
                </div>

                {uploadMethod === 'youtube' && (
                  <div className="space-y-1.5">
                    <input
                      type="url"
                      value={uploadVideoUrl}
                      onChange={(e) => setUploadVideoUrl(e.target.value)}
                      placeholder="Dán liên kết YouTube: https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white font-mono text-xs"
                    />
                    <p className="text-[11px] text-stone-500">
                      Hệ thống tự động nhúng trình phát YouTube trực quan, không quảng cáo quấy rầy học sinh.
                    </p>
                  </div>
                )}

                {uploadMethod === 'file' && (
                  <div className="p-3 bg-white rounded-xl border border-[#d6be9e] space-y-2">
                    <input
                      type="file"
                      accept=".mp4,.webm,.mov,.ogg"
                      onChange={handleFileChange}
                      className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-700 file:text-white hover:file:bg-amber-800 cursor-pointer"
                    />
                    <div className="text-[11px] text-stone-500">
                      Định dạng hỗ trợ: <strong>MP4, WebM, MOV</strong> (Dung lượng tối đa 100MB). Video sẽ được tải lên máy chủ và học sinh có thể phát trực tiếp.
                    </div>
                  </div>
                )}

                {uploadMethod === 'link' && (
                  <div className="space-y-1.5">
                    <input
                      type="url"
                      value={uploadVideoUrl}
                      onChange={(e) => setUploadVideoUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/... hoặc https://..."
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white font-mono text-xs"
                    />
                    <p className="text-[11px] text-stone-500">
                      Hỗ trợ Google Drive (chế độ xem trước) hoặc các liên kết kho lưu trữ trực tuyến.
                    </p>
                  </div>
                )}
              </div>

              {/* Tóm tắt & Nguồn */}
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Tóm tắt nội dung và ý nghĩa lịch sử
                  </label>
                  <textarea
                    rows={2}
                    value={uploadSummary}
                    onChange={(e) => setUploadSummary(e.target.value)}
                    placeholder="Tóm tắt sự kiện, nhân vật và bài học rút ra..."
                    className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Cơ quan cung cấp / Nguồn tư liệu
                    </label>
                    <input
                      type="text"
                      value={uploadSource}
                      onChange={(e) => setUploadSource(e.target.value)}
                      placeholder="Ví dụ: Ban Khoa giáo VTV / Hãng phim Hoạt hình VN"
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Người đăng / Giáo viên
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={currentUser?.name || 'Cô giáo Phạm Thị Thanh'}
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] bg-stone-100 text-stone-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Câu hỏi trước và sau khi xem */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>Bộ câu hỏi tư duy gợi mở (Dành cho học sinh):</span>
                </h4>

                <div>
                  <label className="text-[11px] font-bold text-amber-900 block mb-1">
                    Câu hỏi 1 (Trước khi xem):
                  </label>
                  <input
                    type="text"
                    value={preQuestion1}
                    onChange={(e) => setPreQuestion1(e.target.value)}
                    className="w-full p-2 rounded-lg border border-amber-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-teal-900 block mb-1">
                    Câu hỏi 2 (Củng cố sau khi xem):
                  </label>
                  <input
                    type="text"
                    value={postQuestion1}
                    onChange={(e) => setPostQuestion1(e.target.value)}
                    className="w-full p-2 rounded-lg border border-teal-300 bg-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[#eedec7] flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl font-bold"
                >
                  Hủy bỏ
                </button>

                <button
                  type="submit"
                  disabled={uploadLoading}
                  className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-xl font-bold shadow-xs flex items-center gap-2 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>{uploadLoading ? 'Đang xuất bản...' : 'Lưu & Xuất bản phim'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
