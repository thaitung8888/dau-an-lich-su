import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Ensure uploads and data directories exist
const DATA_DIR = path.resolve(__dirname, 'data');
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for hashing passwords
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + '_dauan_salt_2026').digest('hex');
}

// Database JSON storage path
const DB_FILE = path.join(DATA_DIR, 'database.json');

interface UserRecord {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  approved: boolean;
  passwordHash?: string;
  school?: string;
  createdAt: string;
}

interface ClassRecord {
  id: string;
  code: string;
  name: string;
  grade: number;
  pin: string;
  teacherEmail: string;
  school: string;
  studentCount: number;
}

interface MaterialRecord {
  id: string;
  title: string;
  grade: number;
  lessonCode: string;
  lessonTitle: string;
  category: string;
  type: 'pdf' | 'docx' | 'pptx' | 'jpg' | 'png' | 'webp' | 'mp4' | 'video' | 'link' | 'quiz' | string;
  author: string;
  authorEmail: string;
  date: string;
  url: string;
  downloadUrl?: string;
  status: 'published' | 'pending_approval' | 'hidden';
  source: string;
  license: string;
  description: string;
  downloads: number;
  rating: number;
}

interface DatabaseSchema {
  users: UserRecord[];
  classes: ClassRecord[];
  materials: MaterialRecord[];
  movies?: any[];
  quizzes?: any[];
  periods?: any[];
  events: any[];
  figures: any[];
  relics: any[];
  articles: any[];
  media: any[];
  illustrations?: any[];
  revisions: any[];
}

const defaultMovies = [
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

// Default Quiz Bank (Chuẩn CT GDPT 2018 Lớp 4-5)
const defaultQuizzes = [
  {
    id: 'quiz-1',
    lessonCode: 'LS4-B02',
    lessonTitle: 'Nước Văn Lang và Âu Lạc',
    grade: 4,
    question: 'Ai là người lãnh đạo nhân dân hợp nhất người Lạc Việt và Tây Âu để lập nên nước Âu Lạc?',
    options: ['Vua Hùng Vương thứ 18', 'Thục Phán (An Dương Vương)', 'Ngô Quyền', 'Lý Nam Đế'],
    correctIndex: 1,
    explanation: 'Thục Phán đã chỉ huy nhân dân đánh tan quân xâm lược Tần, sau đó hợp nhất Tây Âu và Lạc Việt lập nên nước Âu Lạc, xưng An Dương Vương.',
    source: 'SGK Lịch sử và Địa lí 4 - Bộ Kết nối tri thức với cuộc sống (Trang 18)',
    truthLayer: 'verified'
  },
  {
    id: 'quiz-2',
    lessonCode: 'LS4-B04',
    lessonTitle: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    grade: 4,
    question: 'Trong chiến thắng Bạch Đằng năm 938, Ngô Quyền đã áp dụng kế sách thông minh nào để đánh tan quân Nam Hán?',
    options: [
      'Cho quân mai phục trên núi cao lăn đá xuống',
      'Đóng cọc gỗ lim vót nhọn bịt sắt cắm ngầm dưới sông kết hợp con nước thủy triều',
      'Dùng voi chiến tấn công thẳng vào doanh trại giặc',
      'Đốt lửa tạo hỏa công trên toàn bộ dòng sông'
    ],
    correctIndex: 1,
    explanation: 'Ngô Quyền đã cho đẽo nhọn cọc gỗ bịt sắt cắm dưới lòng sông Bạch Đằng. Khi triều lên dụ địch vào sâu, lúc triều rút thuyền giặc vướng cọc tan tành.',
    source: 'Đại Việt sử ký toàn thư & SGK Lịch sử 4 (Trang 28)',
    truthLayer: 'verified'
  },
  {
    id: 'quiz-3',
    lessonCode: 'LS4-B03',
    lessonTitle: 'Khởi nghĩa Hai Bà Trưng và các cuộc khởi nghĩa thời Bắc thuộc',
    grade: 4,
    question: 'Khởi nghĩa Hai Bà Trưng phất cờ tại cửa sông nào vào mùa xuân năm 40?',
    options: ['Cửa sông Bạch Đằng', 'Cửa sông Gianh', 'Cửa sông Hát (Hát Môn)', 'Cửa sông Như Nguyệt'],
    correctIndex: 2,
    explanation: 'Mùa xuân năm 40, Trưng Trắc cùng Trưng Nhị làm lễ xuất quân khởi nghĩa tại cửa sông Hát (Hát Môn, nay thuộc Phúc Thọ, Hà Nội).',
    source: 'SGK Lịch sử và Địa lí 4 (Trang 22)',
    truthLayer: 'verified'
  },
  {
    id: 'quiz-4',
    lessonCode: 'LS5-B01',
    lessonTitle: 'Bác Hồ đọc Tuyên ngôn Độc lập',
    grade: 5,
    question: 'Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đã đọc văn kiện quan trọng nào?',
    options: ['Hịch tướng sĩ', 'Bình Ngô đại cáo', 'Bản Tuyên ngôn Độc lập', 'Lời kêu gọi Toàn quốc kháng chiến'],
    correctIndex: 2,
    explanation: 'Chủ tịch Hồ Chí Minh đã đọc bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa.',
    source: 'SGK Lịch sử và Địa lí 5 - Bộ Kết nối tri thức với cuộc sống',
    truthLayer: 'verified'
  },
  {
    id: 'quiz-5',
    lessonCode: 'LS5-B02',
    lessonTitle: 'Chiến dịch Điện Biên Phủ 1954',
    grade: 5,
    question: 'Trong chiến dịch Điện Biên Phủ 1954, người anh hùng nào đã lấy thân mình chèn bánh pháo trên đèo dốc?',
    options: ['Phan Đình Giót', 'Tô Vĩnh Diện', 'Bế Văn Đàn', 'Cù Chính Lan'],
    correctIndex: 1,
    explanation: 'Anh hùng Tô Vĩnh Diện đã dũng cảm lấy thân mình chèn vào bánh pháo cứu khẩu pháo cao xạ không bị rơi xuống vực sâu trên dốc Chuối.',
    source: 'Bảo tàng Chiến thắng lịch sử Điện Biên Phủ & SGK Lớp 5',
    truthLayer: 'verified'
  },
  {
    id: 'quiz-6',
    lessonCode: 'LS4-B06',
    lessonTitle: 'Thăng Long - Hà Nội ngàn năm văn hiến',
    grade: 4,
    question: 'Năm 1010, vị vua nào đã quyết định dời đô từ Hoa Lư về Đại La và đổi tên thành Thăng Long?',
    options: ['Lý Thái Tổ (Lý Công Uẩn)', 'Đinh Tiên Hoàng', 'Lê Hoàn', 'Trần Hưng Đạo'],
    correctIndex: 0,
    explanation: 'Mùa thu năm Canh Tuất 1010, vua Lý Thái Tổ ban Chiếu dời đô dời kinh đô từ Hoa Lư về thành Đại La, thấy rồng vàng bay lên nên đổi tên là Thăng Long.',
    source: 'Chiếu dời đô & SGK Lịch sử và Địa lí 4',
    truthLayer: 'verified'
  },
  {
    id: 'quiz-7',
    lessonCode: 'LS5-B05',
    lessonTitle: 'Đại thắng mùa Xuân năm 1975',
    grade: 5,
    question: 'Xe tăng số hiệu 390 và 843 đã húc đổ cánh cổng của địa danh lịch sử nào trưa ngày 30/4/1975?',
    options: ['Cột cờ Hà Nội', 'Dinh Độc Lập', 'Bến cảng Nhà Rồng', 'Ngọ Môn Huế'],
    correctIndex: 1,
    explanation: 'Vào lúc 11h30 ngày 30/4/1975, xe tăng quân giải phóng đã húc đổ cổng Dinh Độc Lập, cắm lá cờ chiến thắng lên nóc Dinh, đánh dấu non sông thu về một mối.',
    source: 'SGK Lịch sử và Địa lí 5 & Bảo tàng Lịch sử Quân sự Việt Nam',
    truthLayer: 'verified'
  },
  {
    id: 'quiz-8',
    lessonCode: 'LS4-B05',
    lessonTitle: 'Nghệ thuật quân sự và lòng yêu nước thời Trần',
    grade: 4,
    question: 'Câu nói nổi tiếng "Nếu bệ hạ muốn hàng, trước hết hãy chém đầu thần đi đã!" là của ai?',
    options: ['Trần Quốc Toản', 'Trần Hưng Đạo (Trần Quốc Tuấn)', 'Trần Thủ Độ', 'Yết Kiêu'],
    correctIndex: 1,
    explanation: 'Trước thế giặc Nguyên Mông hung hãn, Hưng Đạo Đại Vương Trần Quốc Tuấn đã khẳng khái tâu với vua Trần Thánh Tông câu nói lưu danh thiên cổ đó.',
    source: 'Đại Việt sử ký toàn thư & SGK Lịch sử 4',
    truthLayer: 'verified'
  }
];

// Rich Seed Materials Covering All 4 Core Categories (GDPT 2018)
const seedMaterials: MaterialRecord[] = [
  // 1. BÀI GIẢNG ĐIỆN TỬ (5 items)
  {
    id: 'mat-bg-1',
    title: 'Bài giảng điện tử: Khởi nghĩa Hai Bà Trưng (Năm 40)',
    grade: 4,
    lessonCode: 'LS4-B03',
    lessonTitle: 'Khởi nghĩa Hai Bà Trưng và cuộc đấu tranh giành độc lập thời Bắc thuộc',
    category: 'Bài giảng điện tử',
    type: 'pptx',
    author: 'Cô Phạm Thị Thanh (Trường TH Tiền Phong)',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-03-15',
    url: 'https://docs.google.com/presentation/d/sample-hai-ba-trung',
    downloadUrl: '',
    status: 'published',
    source: 'Bộ SGK Lịch sử & Địa lí 4 - Kết nối tri thức',
    license: 'Giáo dục mở CC BY-NC-SA 4.0',
    description: 'Bộ slide 24 trang minh họa bằng sơ đồ lược đồ chiến thuật Hát Môn - Mê Linh - Luy Lâu, câu hỏi tương tác cho học sinh.',
    downloads: 342,
    rating: 4.9,
  },
  {
    id: 'mat-bg-2',
    title: 'Bài giảng trình chiếu: Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    grade: 4,
    lessonCode: 'LS4-B04',
    lessonTitle: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    category: 'Bài giảng điện tử',
    type: 'pptx',
    author: 'Cô Phạm Thị Thanh',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-03-22',
    url: 'https://docs.google.com/presentation/d/sample-bachdang-938',
    downloadUrl: '',
    status: 'published',
    source: 'SGK Lịch sử & Địa lí 4 - NXB Giáo dục Việt Nam',
    license: 'Giáo dục mở',
    description: 'Slide phân tích kế sách bãi cọc gỗ lim bịt sắt và quy luật con nước thủy triều, câu hỏi gợi mở phát triển năng lực sử học.',
    downloads: 489,
    rating: 5.0,
  },
  {
    id: 'mat-bg-3',
    title: 'Bài giảng điện tử: Nước Văn Lang và Âu Lạc thời các vua Hùng',
    grade: 4,
    lessonCode: 'LS4-B02',
    lessonTitle: 'Nước Văn Lang và Âu Lạc',
    category: 'Bài giảng điện tử',
    type: 'pptx',
    author: 'Thầy Nguyễn Văn Hòa',
    authorEmail: 'nguyen.hoa@school.edu.vn',
    date: '2026-04-05',
    url: 'https://docs.google.com/presentation/d/sample-vanlang-aulac',
    downloadUrl: '',
    status: 'published',
    source: 'Viện Khảo cổ học & SGK Lớp 4',
    license: 'CC BY-NC',
    description: 'Minh họa hiện vật Trống đồng Đông Sơn, Thạp đồng Đào Thịnh và kiến trúc 3 vòng thành xoắn ốc Cổ Loa.',
    downloads: 260,
    rating: 4.8,
  },
  {
    id: 'mat-bg-4',
    title: 'Bài giảng tương tác: Chiến dịch Điện Biên Phủ năm 1954 lừng lẫy năm châu',
    grade: 5,
    lessonCode: 'LS5-B02',
    lessonTitle: 'Chiến dịch Điện Biên Phủ 1954',
    category: 'Bài giảng điện tử',
    type: 'pdf',
    author: 'Cô Phạm Thị Thanh',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-03-10',
    url: 'https://storage.googleapis.com/sample-dienbienphu-slides.pdf',
    downloadUrl: '',
    status: 'published',
    source: 'Bảo tàng Chiến thắng Lịch sử Điện Biên Phủ',
    license: 'Giáo dục mở',
    description: 'Tài liệu bài giảng trực quan: 56 ngày đêm khoét núi ngủ hầm, gương anh hùng Tô Vĩnh Diện, Bế Văn Đàn, Phan Đình Giót.',
    downloads: 512,
    rating: 5.0,
  },
  {
    id: 'mat-bg-5',
    title: 'Bài giảng điện tử: Bác Hồ đọc Tuyên ngôn Độc lập ngày 2/9/1945',
    grade: 5,
    lessonCode: 'LS5-B01',
    lessonTitle: 'Bác Hồ đọc Tuyên ngôn Độc lập',
    category: 'Bài giảng điện tử',
    type: 'pptx',
    author: 'Cô Trần Thị Mai',
    authorEmail: 'tran.mai@school.edu.vn',
    date: '2026-04-01',
    url: 'https://docs.google.com/presentation/d/sample-tuyenngon-doclap',
    downloadUrl: '',
    status: 'published',
    source: 'Khu di tích Phủ Chủ tịch & SGK Lớp 5',
    license: 'Giáo dục mở',
    description: 'Bộ bài giảng tái hiện không khí ngày 2/9/1945 tại Quảng trường Ba Đình lịch sử, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    downloads: 378,
    rating: 4.9,
  },

  // 2. GAME TRẮC NGHIỆM (4 items)
  {
    id: 'mat-gm-1',
    title: 'Game trắc nghiệm: Khám phá bí mật cọc ngầm sông Bạch Đằng năm 938',
    grade: 4,
    lessonCode: 'LS4-B04',
    lessonTitle: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    category: 'Game trắc nghiệm',
    type: 'quiz',
    author: 'Cô Phạm Thị Thanh & Bạn Sử Nhí AI',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-03-25',
    url: '#quiz-2',
    downloadUrl: '',
    status: 'published',
    source: 'SGK Lịch sử 4 & Đại Việt sử ký toàn thư',
    license: 'Giáo dục mở',
    description: 'Thử thách giải mã mưu kế của Ngô Quyền, cọc gỗ lim bịt sắt và quy luật con nước thủy triều.',
    downloads: 620,
    rating: 5.0,
  },
  {
    id: 'mat-gm-2',
    title: 'Đố vui Sử nhí: 10 câu hỏi vàng về các Anh hùng dựng nước và giữ nước',
    grade: 4,
    lessonCode: 'LS4-B02',
    lessonTitle: 'Nước Văn Lang và Âu Lạc',
    category: 'Game trắc nghiệm',
    type: 'quiz',
    author: 'Cô Phạm Thị Thanh',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-04-02',
    url: '#quiz-1',
    downloadUrl: '',
    status: 'published',
    source: 'Bộ SGK Kết nối tri thức với cuộc sống',
    license: 'Giáo dục mở',
    description: 'Bộ câu hỏi trắc nghiệm sinh động có giải thích chi tiết và dẫn nguồn chuẩn xác.',
    downloads: 745,
    rating: 4.9,
  },
  {
    id: 'mat-gm-3',
    title: 'Thử thách Thám tử lịch sử: Khởi nghĩa Hai Bà Trưng và thời Bắc thuộc',
    grade: 4,
    lessonCode: 'LS4-B03',
    lessonTitle: 'Khởi nghĩa Hai Bà Trưng và cuộc đấu tranh giành độc lập thời Bắc thuộc',
    category: 'Game trắc nghiệm',
    type: 'quiz',
    author: 'Thầy Nguyễn Văn Hòa',
    authorEmail: 'nguyen.hoa@school.edu.vn',
    date: '2026-03-18',
    url: '#quiz-3',
    downloadUrl: '',
    status: 'published',
    source: 'SGK Lịch sử và Địa lí 4',
    license: 'Giáo dục mở',
    description: 'Thám tử Sử nhí truy tìm cứ liệu lịch sử: cửa sông Hát Môn, thành Mê Linh và khởi nghĩa Bà Triệu.',
    downloads: 410,
    rating: 4.8,
  },
  {
    id: 'mat-gm-4',
    title: 'Game trắc nghiệm: Hành trình 30/4/1975 non sông liền một dải',
    grade: 5,
    lessonCode: 'LS5-B05',
    lessonTitle: 'Đại thắng mùa Xuân năm 1975',
    category: 'Game trắc nghiệm',
    type: 'quiz',
    author: 'Cô Phạm Thị Thanh',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-04-10',
    url: '#quiz-7',
    downloadUrl: '',
    status: 'published',
    source: 'SGK Lịch sử 5 & Bảo tàng Lịch sử Quân sự Việt Nam',
    license: 'Giáo dục mở',
    description: 'Bộ trắc nghiệm tái hiện Chiến dịch Hồ Chí Minh lịch sử, xe tăng húc đổ cổng Dinh Độc Lập.',
    downloads: 530,
    rating: 5.0,
  },

  // 3. PHIM LỊCH SỬ (5 items)
  {
    id: 'mat-mov-1',
    title: 'Hoạt hình lịch sử: Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    grade: 4,
    lessonCode: 'LS4-B04',
    lessonTitle: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    category: 'Phim lịch sử',
    type: 'video',
    author: 'Việt Sử Kiêu Hùng & Ban Cố vấn Sử học',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-02-15',
    url: 'https://www.youtube.com/watch?v=KWQqgkpV74k',
    downloadUrl: '',
    status: 'published',
    source: 'Dự án Việt Sử Kiêu Hùng',
    license: 'Giấy phép YouTube chuẩn',
    description: 'Tái hiện sinh động kế sách cắm bãi cọc gỗ lim bịt sắt xuống lòng sông Bạch Đằng, đánh tan quân Nam Hán.',
    downloads: 1240,
    rating: 5.0,
  },
  {
    id: 'mat-mov-2',
    title: 'Phim 3D lịch sử: Nỏ thần An Dương Vương và Thành ốc Cổ Loa',
    grade: 4,
    lessonCode: 'LS4-B02',
    lessonTitle: 'Nước Văn Lang và Âu Lạc',
    category: 'Phim lịch sử',
    type: 'video',
    author: 'Truyền hình Giáo dục & Viện Khảo cổ học',
    authorEmail: 'nguyen.hoa@school.edu.vn',
    date: '2026-03-01',
    url: 'https://www.youtube.com/watch?v=3a2rGErvDmc',
    downloadUrl: '',
    status: 'published',
    source: 'Truyền hình Giáo dục VTV7',
    license: 'Giáo dục mở',
    description: 'Khám phá thành tựu kỹ thuật quân sự đỉnh cao thời Âu Lạc với 3 vòng thành đất xoắn ốc Cổ Loa kiên cố.',
    downloads: 980,
    rating: 4.9,
  },
  {
    id: 'mat-mov-3',
    title: 'Phim tư liệu: Chiến dịch Điện Biên Phủ "Lừng lẫy năm châu, chấn động địa cầu"',
    grade: 5,
    lessonCode: 'LS5-B02',
    lessonTitle: 'Chiến dịch Điện Biên Phủ 1954',
    category: 'Phim lịch sử',
    type: 'video',
    author: 'Hãng phim Tài liệu và Khoa học Trung ương',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-03-12',
    url: 'https://www.youtube.com/watch?v=H74tN8V9Y6U',
    downloadUrl: '',
    status: 'published',
    source: 'Hãng phim Tài liệu & Khoa học Trung ương',
    license: 'Tư liệu giáo dục',
    description: 'Tư liệu gốc 56 ngày đêm khoét núi ngủ hầm, tinh thần quyết chiến quyết thắng giải phóng tập đoàn cứ điểm Điện Biên Phủ.',
    downloads: 1105,
    rating: 5.0,
  },
  {
    id: 'mat-mov-4',
    title: 'Phim tư liệu: Ngày toàn thắng 30/4/1975 - Non sông thu về một mối',
    grade: 5,
    lessonCode: 'LS5-B05',
    lessonTitle: 'Đại thắng mùa Xuân năm 1975',
    category: 'Phim lịch sử',
    type: 'video',
    author: 'Đài Truyền hình Việt Nam (VTV)',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-04-05',
    url: 'https://www.youtube.com/watch?v=5VjWlV0jFpM',
    downloadUrl: '',
    status: 'published',
    source: 'VTV & Viện Phim Việt Nam',
    license: 'Giấy phép YouTube chuẩn',
    description: 'Hình ảnh xe tăng tiến vào Dinh Độc Lập, khoảnh khắc cờ giải phóng tung bay trưa ngày 30/4/1975.',
    downloads: 1350,
    rating: 5.0,
  },
  {
    id: 'mat-mov-5',
    title: 'Video tư liệu: Di tích Cố đô Huế - Quần thể di sản thế giới',
    grade: 5,
    lessonCode: 'LS5-B08',
    lessonTitle: 'Triều Nguyễn và di sản văn hóa Cố đô Huế',
    category: 'Phim lịch sử',
    type: 'video',
    author: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
    authorEmail: 'nguyen.hoa@school.edu.vn',
    date: '2026-02-18',
    url: 'https://www.youtube.com/watch?v=SVCcsqD_BkY',
    downloadUrl: '',
    status: 'published',
    source: 'Trung tâm Bảo tồn Di tích Cố đô Huế & VTV',
    license: 'Giấy phép YouTube chuẩn',
    description: 'Thuyết minh kiến trúc Ngọ Môn, Điện Thái Hòa, Nhã nhạc cung đình Huế thích hợp tiết học lớp 5.',
    downloads: 875,
    rating: 4.8,
  },

  // 4. THÔNG TIN LỊCH SỬ (5 items)
  {
    id: 'mat-tt-1',
    title: 'Phiếu học tập & Sơ đồ tư duy: Chiến thắng Bạch Đằng năm 938',
    grade: 4,
    lessonCode: 'LS4-B04',
    lessonTitle: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    category: 'Thông tin lịch sử',
    type: 'pdf',
    author: 'Cô Phạm Thị Thanh',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-03-20',
    url: 'https://storage.googleapis.com/sample-bachdang-worksheet.pdf',
    downloadUrl: '',
    status: 'published',
    source: 'Bảo tàng Lịch sử Quốc gia & SGK Lớp 4',
    license: 'Dành cho nhà trường miễn phí',
    description: 'Phiếu củng cố 5 sự kiện mấu chốt, phân tích vai trò của thủy triều và cọc gỗ lim bịt sắt.',
    downloads: 518,
    rating: 5.0,
  },
  {
    id: 'mat-tt-2',
    title: 'Tài liệu nghiên cứu: Phân biệt truyền thuyết Thánh Gióng và sử liệu thời Hùng Vương',
    grade: 4,
    lessonCode: 'LS4-B02',
    lessonTitle: 'Nước Văn Lang và Âu Lạc',
    category: 'Thông tin lịch sử',
    type: 'docx',
    author: 'ThS. Nguyễn Văn Hùng',
    authorEmail: 'nguyen.hoa@school.edu.vn',
    date: '2026-04-02',
    url: 'https://storage.googleapis.com/sample-thanh-giong-guide.docx',
    downloadUrl: '',
    status: 'published',
    source: 'Viện Sử học & GS. Trần Quốc Vượng',
    license: 'CC BY-NC',
    description: 'Tài liệu bồi dưỡng năng lực sử học: cách giảng giải cho học sinh hiểu cốt lõi tinh thần chống giặc ngoại xâm trong lớp vỏ truyền thuyết kì ảo.',
    downloads: 290,
    rating: 4.9,
  },
  {
    id: 'mat-tt-3',
    title: 'Tư liệu khảo cổ: Bản vẽ phục dựng thành Cổ Loa thời An Dương Vương',
    grade: 4,
    lessonCode: 'LS4-B02',
    lessonTitle: 'Nước Văn Lang và Âu Lạc',
    category: 'Thông tin lịch sử',
    type: 'pdf',
    author: 'Cô Trần Thị Mai',
    authorEmail: 'tran.mai@school.edu.vn',
    date: '2026-04-14',
    url: 'https://storage.googleapis.com/sample-co-loa-drawing.pdf',
    downloadUrl: '',
    status: 'published',
    source: 'Viện Khảo cổ học',
    license: 'Giáo dục mở',
    description: 'Bản vẽ chi tiết 3 vòng thành đất, hào nước kết nối sông Hoàng Giang phục vụ tiết học Lịch sử địa phương.',
    downloads: 145,
    rating: 4.8,
  },
  {
    id: 'mat-tt-4',
    title: 'Hồ sơ di tích: Hoàng thành Thăng Long - Di sản văn hóa thế giới',
    grade: 4,
    lessonCode: 'LS4-B06',
    lessonTitle: 'Thăng Long - Hà Nội ngàn năm văn hiến',
    category: 'Thông tin lịch sử',
    type: 'pdf',
    author: 'Cô Phạm Thị Thanh',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-03-28',
    url: 'https://storage.googleapis.com/sample-hoang-thanh-thang-long.pdf',
    downloadUrl: '',
    status: 'published',
    source: 'Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội',
    license: 'Giáo dục mở',
    description: 'Tổng hợp cứ liệu khảo cổ 18 Hoàng Diệu, Điện Kính Thiên, Đoan Môn và giá trị lịch sử ngàn năm văn hiến.',
    downloads: 412,
    rating: 4.9,
  },
  {
    id: 'mat-tt-5',
    title: 'Dữ kiện lịch sử: Tóm tắt 7 chặng dòng chảy lịch sử Việt Nam chuẩn GDPT 2018',
    grade: 5,
    lessonCode: 'LS5-B01',
    lessonTitle: 'Dòng chảy lịch sử Việt Nam',
    category: 'Thông tin lịch sử',
    type: 'docx',
    author: 'Cô Phạm Thị Thanh & Ban Cố vấn',
    authorEmail: 'pham.thanhh212@gmail.com',
    date: '2026-04-08',
    url: 'https://storage.googleapis.com/sample-7-chang-dong-chay.docx',
    downloadUrl: '',
    status: 'published',
    source: 'SGK Lịch sử & Địa lí 4-5 Kết nối tri thức',
    license: 'Giáo dục mở CC BY-NC-SA 4.0',
    description: 'Bảng đối chiếu 7 thời kì lịch sử Việt Nam từ buổi đầu dựng nước Văn Lang - Âu Lạc đến Đổi mới và hội nhập quốc tế.',
    downloads: 670,
    rating: 5.0,
  }
];

// Initial seed data
const initialData: DatabaseSchema = {
  periods: [],
  movies: defaultMovies,
  quizzes: defaultQuizzes,
  materials: seedMaterials,
  users: [
    {
      id: 'usr-admin-1',
      email: 'pham.thanhh212@gmail.com',
      name: 'Cô giáo Phạm Thị Thanh',
      role: 'admin',
      approved: true,
      passwordHash: hashPassword('Admin@123'),
      school: 'Trường Tiểu học Tiền Phong',
      createdAt: '2026-01-01',
    },
    {
      id: 'usr-teacher-1',
      email: 'nguyen.hoa@school.edu.vn',
      name: 'Thầy Nguyễn Văn Hòa',
      role: 'teacher',
      approved: true,
      passwordHash: hashPassword('Teacher@123'),
      school: 'Trường Tiểu học Thăng Long',
      createdAt: '2026-02-10',
    },
    {
      id: 'usr-teacher-2',
      email: 'tran.mai@school.edu.vn',
      name: 'Cô Trần Thị Mai',
      role: 'teacher',
      approved: false, // Pending admin approval
      passwordHash: hashPassword('Teacher@123'),
      school: 'Trường Tiểu học Kim Đồng',
      createdAt: '2026-04-12',
    },
  ],
  classes: [
    {
      id: 'cls-5a8',
      code: '5A8',
      name: 'Lớp 5A8',
      grade: 5,
      pin: '2026',
      teacherEmail: 'pham.thanhh212@gmail.com',
      school: 'Trường Tiểu học Tiền Phong',
      studentCount: 38,
    },
    {
      id: 'cls-2',
      code: '4A2',
      name: 'Lớp 4A2',
      grade: 4,
      pin: '2026',
      teacherEmail: 'nguyen.hoa@school.edu.vn',
      school: 'Trường Tiểu học Thăng Long',
      studentCount: 34,
    },
    {
      id: 'cls-3',
      code: '5A1',
      name: 'Lớp 5A1',
      grade: 5,
      pin: '2026',
      teacherEmail: 'pham.thanhh212@gmail.com',
      school: 'Trường Tiểu học Tiền Phong',
      studentCount: 36,
    },
  ],
  events: [],
  figures: [],
  relics: [],
  articles: [],
  media: [],
  revisions: [],
};

function readDb(): DatabaseSchema {
  try {
    let data: DatabaseSchema;
    if (!fs.existsSync(DB_FILE)) {
      data = { ...initialData };
    } else {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      data = JSON.parse(content);
    }

    let modified = false;
    // Auto-seed historical periods, events, figures, relics, and media from user's provided file if not populated
    try {
      const jsonPath = path.resolve(__dirname, 'public/assets/aistudio/Du_lieu_Lich_su_Viet_Nam_cho_Web_b5775d23.json');
      if (fs.existsSync(jsonPath)) {
        const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        if (!data.periods || !Array.isArray(data.periods) || data.periods.length === 0) {
          data.periods = raw.giai_doan || [];
          modified = true;
        }
        if (!data.events || !Array.isArray(data.events) || data.events.length === 0) {
          data.events = raw.su_kien || [];
          modified = true;
        }
        if (!data.figures || !Array.isArray(data.figures) || data.figures.length === 0) {
          data.figures = raw.nhan_vat || [];
          modified = true;
        }
        if (!data.relics || !Array.isArray(data.relics) || data.relics.length === 0) {
          data.relics = raw.di_tich || [];
          modified = true;
        }
        if (!data.media || !Array.isArray(data.media) || data.media.length === 0) {
          if (Array.isArray(raw.hinh_anh)) {
            data.media = raw.hinh_anh.map((ha: any, idx: number) => ({
              id: ha.Mã || `med-seed-${idx}`,
              title: ha['Hình ảnh đề xuất'] || 'Tư liệu lịch sử',
              type: 'image',
              url: ha['URL ảnh trực tiếp'] || ha['URL trang nguồn'] || 'https://baotanglichsu.vn/vi',
              thumbnailUrl: ha['URL ảnh trực tiếp'] || null,
              caption: `${ha['Loại tư liệu'] || 'Tư liệu'} - ${ha['Hình ảnh đề xuất']}`,
              source: ha['Cơ quan cung cấp'] || 'Bảo tàng Lịch sử quốc gia',
              author: 'Cô Phạm Thị Thanh',
              periodCode: ha['Giai đoạn'] || 'GD01',
              category: ha['Loại tư liệu'] || 'Hình ảnh',
              license: ha['Quyền sử dụng'] || 'Chưa xác minh quyền',
              uploadedAt: '2026-04-20'
            }));
            modified = true;
          }
        }
      }
    } catch (e) {
      console.error('Error loading seed history json:', e);
    }
    if (!data.movies || !Array.isArray(data.movies) || data.movies.length === 0) {
      data.movies = [...defaultMovies];
      modified = true;
    }
    if (!data.quizzes || !Array.isArray(data.quizzes) || data.quizzes.length === 0) {
      data.quizzes = [...defaultQuizzes];
      modified = true;
    }
    if (!data.materials || !Array.isArray(data.materials) || data.materials.length === 0) {
      data.materials = [...seedMaterials];
      modified = true;
    } else {
      const hasLectures = data.materials.some((m: any) => m.category === 'Bài giảng điện tử');
      const hasQuizzes = data.materials.some((m: any) => m.category === 'Game trắc nghiệm' || m.type === 'quiz');
      const hasMovies = data.materials.some((m: any) => m.category === 'Phim lịch sử');
      const hasInfo = data.materials.some((m: any) => m.category === 'Thông tin lịch sử');

      const missingSeeds: MaterialRecord[] = [];
      if (!hasLectures) missingSeeds.push(...seedMaterials.filter(m => m.category === 'Bài giảng điện tử'));
      if (!hasQuizzes) missingSeeds.push(...seedMaterials.filter(m => m.category === 'Game trắc nghiệm'));
      if (!hasMovies) missingSeeds.push(...seedMaterials.filter(m => m.category === 'Phim lịch sử'));
      if (!hasInfo) missingSeeds.push(...seedMaterials.filter(m => m.category === 'Thông tin lịch sử'));

      if (missingSeeds.length > 0) {
        data.materials.push(...missingSeeds);
        modified = true;
      }
    }
    if (!data.periods) data.periods = [];
    if (!data.events) data.events = [];
    if (!data.figures) data.figures = [];
    if (!data.relics) data.relics = [];
    if (!data.articles) data.articles = [];
    if (!data.media) data.media = [];
    if (!data.revisions) data.revisions = [];

    if (modified || !fs.existsSync(DB_FILE)) {
      writeDb(data);
    }
    return data;
  } catch (err) {
    console.error('Error reading database file, returning default:', err);
    return initialData;
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database file:', err);
  }
}

// Initialize database file on startup
readDb();

/* ==========================================================================
   AUTHENTICATION ROUTES
   ========================================================================== */

// Teacher login (Email/password or Google OAuth simulation)
app.post('/api/auth/teacher-login', (req, res) => {
  const { email, password, googleAuth, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Vui lòng nhập địa chỉ email giáo viên.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const db = readDb();
  let user = db.users.find((u) => u.email.toLowerCase() === cleanEmail);

  // If Google Auth, auto-provision or find
  if (googleAuth) {
    if (!user) {
      const isAdmin = cleanEmail === 'pham.thanhh212@gmail.com';
      user = {
        id: 'usr-' + Date.now(),
        email: cleanEmail,
        name: name || (isAdmin ? 'Cô giáo Phạm Thị Thanh' : cleanEmail.split('@')[0]),
        role: isAdmin ? 'admin' : 'teacher',
        approved: isAdmin, // Admin is auto approved; others wait
        createdAt: new Date().toISOString().split('T')[0],
      };
      db.users.push(user);
      writeDb(db);
    }
  } else {
    // Standard email/password check
    if (!user) {
      // Special first-time bootstrap for Admin Pham.thanhh212@gmail.com
      if (cleanEmail === 'pham.thanhh212@gmail.com') {
        user = {
          id: 'usr-admin-1',
          email: 'pham.thanhh212@gmail.com',
          name: 'Cô giáo Phạm Thị Thanh',
          role: 'admin',
          approved: true,
          passwordHash: hashPassword(password || 'Admin@123'),
          school: 'Trường Tiểu học Tiền Phong',
          createdAt: new Date().toISOString().split('T')[0],
        };
        db.users.push(user);
        writeDb(db);
      } else {
        return res.status(401).json({ error: 'Tài khoản giáo viên chưa tồn tại trên hệ thống.' });
      }
    }

    // Check password
    if (user.passwordHash && password) {
      if (user.passwordHash !== hashPassword(password)) {
        return res.status(401).json({ error: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.' });
      }
    }
  }

  // Check approval status (unless admin)
  if (user.role !== 'admin' && !user.approved) {
    return res.status(403).json({
      error: 'Tài khoản của thầy/cô đã được tạo và đang chờ Quản trị viên (Cô Phạm Thị Thanh) phê duyệt.',
      pendingApproval: true,
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      approved: user.approved,
      school: user.school,
    },
  });
});

// Teacher registration (Requires Admin approval unless master admin)
app.post('/api/auth/teacher-register', (req, res) => {
  const { email, password, name, school } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ email, mật khẩu và họ tên giáo viên.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const db = readDb();

  if (db.users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return res.status(400).json({ error: 'Email giáo viên này đã được đăng ký trước đó.' });
  }

  const isAdmin = cleanEmail === 'pham.thanhh212@gmail.com';
  const newUser: UserRecord = {
    id: 'usr-' + Date.now(),
    email: cleanEmail,
    name,
    role: isAdmin ? 'admin' : 'teacher',
    approved: isAdmin, // Non-admin teachers must be approved by admin
    passwordHash: hashPassword(password),
    school: school || 'Trường Tiểu học',
    createdAt: new Date().toISOString().split('T')[0],
  };

  db.users.push(newUser);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: isAdmin
      ? 'Đăng ký tài khoản Quản trị viên thành công!'
      : 'Tài khoản đã gửi thành công và đang chờ Quản trị viên phê duyệt.',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      approved: newUser.approved,
    },
  });
});

// Student login via Class Code + Student ID/Name + PIN (No Gmail required)
app.post('/api/auth/student-login', (req, res) => {
  const { classCode, studentId, studentName, pin } = req.body;

  if (!classCode || !pin) {
    return res.status(400).json({ error: 'Vui lòng nhập Mã lớp và Mã PIN do giáo viên cấp.' });
  }

  const cleanClass = classCode.trim().toUpperCase();
  const db = readDb();
  const classItem = db.classes.find((c) => c.code.toUpperCase() === cleanClass);

  if (!classItem) {
    return res.status(404).json({ error: `Không tìm thấy mã lớp "${classCode}". Bạn hãy hỏi lại cô giáo nhé!` });
  }

  if (classItem.pin && classItem.pin !== pin.trim()) {
    return res.status(401).json({ error: 'Mã PIN của lớp không đúng. Bạn hãy kiểm tra lại nhé!' });
  }

  const displayName = (studentName && studentName.trim()) || (studentId && studentId.trim()) || 'Học sinh nhí';

  res.json({
    success: true,
    user: {
      id: 'stu-' + Date.now(),
      name: displayName,
      role: 'student',
      classCode: classItem.code,
      grade: classItem.grade,
      school: classItem.school,
    },
  });
});

/* ==========================================================================
   CLASS MANAGEMENT ROUTES (Teacher & Admin)
   ========================================================================== */

app.get('/api/classes', (req, res) => {
  const db = readDb();
  res.json(db.classes);
});

app.post('/api/classes', (req, res) => {
  const { code, name, grade, pin, teacherEmail, school } = req.body;
  if (!code || !pin) {
    return res.status(400).json({ error: 'Mã lớp và Mã PIN là bắt buộc.' });
  }

  const db = readDb();
  const newClass: ClassRecord = {
    id: 'cls-' + Date.now(),
    code: code.trim().toUpperCase(),
    name: name || `Lớp ${code.trim().toUpperCase()}`,
    grade: Number(grade) || 4,
    pin: pin.trim(),
    teacherEmail: teacherEmail || 'pham.thanhh212@gmail.com',
    school: school || 'Trường Tiểu học',
    studentCount: 0,
  };

  db.classes.push(newClass);
  writeDb(db);
  res.status(201).json(newClass);
});

/* ==========================================================================
   TEACHER MANAGEMENT (Admin only: pham.thanhh212@gmail.com)
   ========================================================================== */

app.get('/api/teachers', (req, res) => {
  const db = readDb();
  const teachers = db.users
    .filter((u) => u.role === 'teacher' || u.role === 'admin')
    .map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      approved: u.approved,
      school: u.school,
      createdAt: u.createdAt,
    }));
  res.json(teachers);
});

app.patch('/api/teachers/:id/approve', (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;

  const db = readDb();
  const user = db.users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Không tìm thấy tài khoản giáo viên.' });
  }

  user.approved = Boolean(approved);
  writeDb(db);
  res.json({ success: true, user });
});

/* ==========================================================================
   MATERIALS & FILE UPLOAD (Storage & Firestore equivalent)
   ========================================================================== */

// File upload endpoint (PDF, DOCX, PPTX, JPG, PNG, WebP, MP4)
app.post('/api/upload-file', (req, res) => {
  try {
    const { fileName, fileData, fileType } = req.body;

    if (!fileName || !fileData) {
      return res.status(400).json({ error: 'Thiếu dữ liệu tệp tải lên.' });
    }

    // Sanitize file extension
    const ext = path.extname(fileName).toLowerCase();
    const allowedExts = [
      '.pdf', '.docx', '.pptx', '.doc', '.ppt',
      '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg',
      '.mp4', '.webm', '.mov', '.ogg',
      '.txt', '.json'
    ];

    if (!allowedExts.includes(ext)) {
      return res.status(400).json({
        error: `Định dạng tệp ${ext} không được hỗ trợ. Hệ thống hỗ trợ ảnh (JPG, PNG, WebP), video (MP4, WebM, MOV), tài liệu (PDF, Word, PPTX) và tệp dữ liệu (TXT, JSON).`
      });
    }

    // Extract base64
    const base64Content = fileData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    const buffer = Buffer.from(base64Content, 'base64');

    // Limit check (100MB max)
    if (buffer.length > 100 * 1024 * 1024) {
      return res.status(400).json({ error: 'Dung lượng tệp vượt quá giới hạn tối đa 100MB.' });
    }

    const uniqueName = `${Date.now()}_${path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    res.json({
      success: true,
      fileName: uniqueName,
      fileUrl: publicUrl,
      size: buffer.length,
      mimeType: fileType,
    });
  } catch (error: any) {
    console.error('Upload file error:', error);
    res.status(500).json({ error: 'Lỗi khi lưu trữ tệp tin trên máy chủ.' });
  }
});

// Get materials with role-based filtering
app.get('/api/materials', (req, res) => {
  const { grade, category, lessonCode, search, authorEmail, role } = req.query;
  const db = readDb();
  let list = db.materials;

  // Role permissions:
  // - Students only see published
  // - Teachers see published + their own materials
  // - Admins see all
  if (role === 'student' || !role) {
    list = list.filter((m) => m.status === 'published');
  } else if (role === 'teacher') {
    if (authorEmail) {
      list = list.filter((m) => m.status === 'published' || m.authorEmail === authorEmail);
    } else {
      list = list.filter((m) => m.status === 'published');
    }
  }

  if (grade && grade !== 'all') {
    list = list.filter((m) => m.grade === Number(grade));
  }
  if (category && category !== 'all') {
    list = list.filter((m) => m.category === category);
  }
  if (lessonCode && lessonCode !== 'all') {
    list = list.filter((m) => m.lessonCode === lessonCode);
  }
  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.lessonTitle.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }

  res.json(list);
});

// Upload/Create new material
app.post('/api/materials', (req, res) => {
  const {
    title,
    grade,
    lessonCode,
    lessonTitle,
    category,
    type,
    author,
    authorEmail,
    url,
    downloadUrl,
    description,
    source,
    license,
  } = req.body;

  if (!title || !grade || !category) {
    return res.status(400).json({ error: 'Vui lòng nhập đầy đủ Tên tài liệu, Khối lớp và Chuyên mục.' });
  }

  const db = readDb();
  const isAdmin = authorEmail === 'pham.thanhh212@gmail.com';

  const newMaterial: MaterialRecord = {
    id: 'mat-' + Date.now(),
    title,
    grade: Number(grade),
    lessonCode: lessonCode || 'LS4-B01',
    lessonTitle: lessonTitle || '',
    category: category || 'Bài giảng điện tử',
    type: type || 'pdf',
    author: author || 'Giáo viên',
    authorEmail: authorEmail || 'pham.thanhh212@gmail.com',
    date: new Date().toISOString().split('T')[0],
    url: url || '#',
    downloadUrl: downloadUrl || '',
    status: isAdmin ? 'published' : 'pending_approval', // Admin auto publishes; teachers pending review
    source: source || 'Đối chiếu SGK Lịch sử & Địa lí',
    license: license || 'Giáo dục mở CC BY-NC-SA 4.0',
    description: description || '',
    downloads: 0,
    rating: 5.0,
  };

  db.materials.unshift(newMaterial);

  // 1. Sync to db.movies if video or historical movie
  if (
    category === 'Phim lịch sử' ||
    type === 'video' ||
    type === 'mp4' ||
    (url && (url.includes('youtube.com') || url.includes('youtu.be') || url.endsWith('.mp4')))
  ) {
    db.movies = db.movies || [];
    const exists = db.movies.some((m: any) => m.id === newMaterial.id || (m.videoUrl && m.videoUrl === newMaterial.url));
    if (!exists) {
      db.movies.unshift({
        id: newMaterial.id,
        title: newMaterial.title,
        category: 'documentary',
        categoryLabel: 'Phim tư liệu quý',
        grade: newMaterial.grade === 5 ? 5 : 4,
        period: newMaterial.lessonTitle || 'Lịch sử Việt Nam',
        duration: 'Tư liệu giáo viên',
        thumbnailColor: 'from-amber-700 to-amber-900',
        summary: newMaterial.description || `Tư liệu video: ${newMaterial.title}`,
        source: newMaterial.source || newMaterial.author,
        videoUrl: newMaterial.url,
        preQuestions: [
          'Nội dung chính của video này đề cập đến thời kì hoặc nhân vật lịch sử nào?',
          'Hãy chú ý đến các mốc thời gian và địa danh xuất hiện trong video.'
        ],
        postQuestions: [
          'Sau khi xem xong, em ấn tượng nhất với sự kiện hoặc chi tiết nào?',
          'Ý nghĩa của sự kiện lịch sử này đối với non sông đất nước ta là gì?'
        ],
        author: newMaterial.author,
        authorEmail: newMaterial.authorEmail,
        createdAt: newMaterial.date,
        status: 'published'
      });
    }
  }

  // 2. Sync to db.quizzes if Game trắc nghiệm or quiz type
  if (
    category === 'Game trắc nghiệm' ||
    category === 'Trò chơi hoặc bộ câu hỏi' ||
    type === 'quiz' ||
    req.body.questionData
  ) {
    db.quizzes = db.quizzes || [];
    const qData = req.body.questionData || {};
    const quizQuestionText = qData.question || newMaterial.title.replace(/^Game trắc nghiệm:\s*/i, '').replace(/^Trắc nghiệm:\s*/i, '');
    const newQuiz = {
      id: newMaterial.id,
      question: quizQuestionText,
      options: qData.options && Array.isArray(qData.options) && qData.options.length >= 2
        ? qData.options
        : ['Đáp án chính xác (A)', 'Phương án B', 'Phương án C', 'Phương án D'],
      correctIndex: typeof qData.correctIndex === 'number' ? qData.correctIndex : 0,
      explanation: qData.explanation || newMaterial.description || 'Theo chuẩn chương trình Lịch sử & Địa lí GDPT 2018.',
      source: newMaterial.source || 'SGK Lịch sử và Địa lí 4-5',
      truthLayer: qData.truthLayer || 'verified',
      grade: newMaterial.grade,
      lessonCode: newMaterial.lessonCode,
      lessonTitle: newMaterial.lessonTitle
    };
    const exists = db.quizzes.some((q: any) => q.id === newQuiz.id);
    if (!exists) {
      db.quizzes.unshift(newQuiz);
    }
  }

  // 3. Sync to db.articles if Thông tin lịch sử
  if (
    category === 'Thông tin lịch sử' ||
    category === 'Bài viết kiến thức lịch sử' ||
    category === 'Di tích và hiện vật' ||
    category === 'Truyền thuyết'
  ) {
    db.articles = db.articles || [];
    const exists = db.articles.some((a: any) => a.id === newMaterial.id || a.title === newMaterial.title);
    if (!exists) {
      db.articles.unshift({
        id: newMaterial.id,
        title: newMaterial.title,
        category: newMaterial.category,
        periodCode: 'GD01',
        coverImage: newMaterial.url && (newMaterial.url.endsWith('.jpg') || newMaterial.url.endsWith('.png') || newMaterial.url.endsWith('.webp')) ? newMaterial.url : '',
        summary: newMaterial.description ? newMaterial.description.slice(0, 160) : newMaterial.title,
        contentHtml: `<p>${(newMaterial.description || newMaterial.title).replace(/\n/g, '<br/>')}</p>`,
        author: newMaterial.author,
        authorEmail: newMaterial.authorEmail,
        source: newMaterial.source,
        status: 'published',
        galleryImages: [],
        videoUrl: newMaterial.type === 'video' ? newMaterial.url : '',
        createdAt: newMaterial.date,
        updatedAt: new Date().toISOString()
      });
    }
  }

  writeDb(db);

  res.status(201).json({
    success: true,
    material: newMaterial,
    message: isAdmin
      ? 'Tài liệu đã được xuất bản trực tiếp lên thư viện!'
      : 'Tài liệu đã được lưu thành công và đồng bộ trên tất cả các trang!',
  });
});

// Update material status (Admin moderation)
app.patch('/api/materials/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'published' | 'pending_approval' | 'hidden'

  const db = readDb();
  const material = db.materials.find((m) => m.id === id);
  if (!material) {
    return res.status(404).json({ error: 'Không tìm thấy tài liệu.' });
  }

  material.status = status;
  writeDb(db);
  res.json({ success: true, material });
});

// Delete material (Only author or admin or teacher)
app.delete('/api/materials/:id', (req, res) => {
  const { id } = req.params;
  const { userEmail, userRole } = req.body || {};

  const db = readDb();
  const index = db.materials.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy tài liệu.' });
  }

  const [removed] = db.materials.splice(index, 1);

  // Synchronize deletion with db.movies
  if (db.movies && Array.isArray(db.movies)) {
    const movieIdx = db.movies.findIndex(
      (m: any) => m.id === id || (removed.url && m.videoUrl === removed.url) || m.title === removed.title
    );
    if (movieIdx !== -1) {
      db.movies.splice(movieIdx, 1);
    }
  }

  // Synchronize deletion with db.quizzes
  if (db.quizzes && Array.isArray(db.quizzes)) {
    const quizIdx = db.quizzes.findIndex(
      (q: any) =>
        q.id === id ||
        q.id === id.replace('mat-', '') ||
        q.question === removed.title ||
        (removed.title && removed.title.includes(q.question))
    );
    if (quizIdx !== -1) {
      db.quizzes.splice(quizIdx, 1);
    }
  }

  // Synchronize deletion with db.articles
  if (db.articles && Array.isArray(db.articles)) {
    const artIdx = db.articles.findIndex(
      (a: any) => a.id === id || a.title === removed.title
    );
    if (artIdx !== -1) {
      db.articles.splice(artIdx, 1);
    }
  }

  writeDb(db);
  res.json({ success: true, message: 'Đã xóa tài liệu và đồng bộ hệ thống thành công.' });
});

/* ==========================================================================
   QUIZZES & CHALLENGES (Game Trắc Nghiệm Lịch Sử)
   ========================================================================== */

// 1. GET /api/quizzes
app.get('/api/quizzes', (req, res) => {
  try {
    const db = readDb();
    const { grade, lessonCode, search } = req.query;

    let quizzesList = [...(db.quizzes || [])];

    if (grade && grade !== 'all') {
      const gNum = Number(grade);
      quizzesList = quizzesList.filter((q: any) => q.grade === gNum);
    }

    if (lessonCode && lessonCode !== 'ALL' && lessonCode !== 'all') {
      quizzesList = quizzesList.filter((q: any) => q.lessonCode === lessonCode);
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase();
      quizzesList = quizzesList.filter(
        (item: any) =>
          (item.question && item.question.toLowerCase().includes(q)) ||
          (item.explanation && item.explanation.toLowerCase().includes(q)) ||
          (item.lessonTitle && item.lessonTitle.toLowerCase().includes(q))
      );
    }

    res.json(quizzesList);
  } catch (error: any) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Lỗi khi tải danh sách câu hỏi trắc nghiệm.' });
  }
});

// 2. POST /api/quizzes
app.post('/api/quizzes', (req, res) => {
  try {
    const db = readDb();
    const {
      question,
      options,
      correctIndex,
      explanation,
      source,
      truthLayer,
      grade,
      lessonCode,
      lessonTitle
    } = req.body;

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: 'Câu hỏi và tối thiểu 2 phương án trả lời là bắt buộc.' });
    }

    const quizId = 'quiz-' + Date.now();
    const newQuiz = {
      id: quizId,
      question: question.trim(),
      options: options.map((opt: any) => String(opt).trim()),
      correctIndex: typeof correctIndex === 'number' ? correctIndex : 0,
      explanation: explanation ? explanation.trim() : 'Theo nội dung chương trình SGK Lịch sử & Địa lí GDPT 2018.',
      source: source || 'Bộ SGK Lịch sử và Địa lí 4-5 Kết nối tri thức',
      truthLayer: truthLayer || 'verified',
      grade: grade ? Number(grade) : 4,
      lessonCode: lessonCode || 'LS4-B02',
      lessonTitle: lessonTitle || 'Bài học Lịch sử GDPT 2018'
    };

    db.quizzes = db.quizzes || [];
    db.quizzes.unshift(newQuiz);

    // Also sync to db.materials as a "Game trắc nghiệm" material!
    db.materials = db.materials || [];
    const matQuiz: MaterialRecord = {
      id: 'mat-' + quizId,
      title: 'Game trắc nghiệm: ' + (question.length > 60 ? question.slice(0, 60) + '...' : question),
      grade: newQuiz.grade,
      lessonCode: newQuiz.lessonCode,
      lessonTitle: newQuiz.lessonTitle,
      category: 'Game trắc nghiệm',
      type: 'quiz',
      author: 'Cô giáo Phạm Thị Thanh',
      authorEmail: 'pham.thanhh212@gmail.com',
      date: new Date().toISOString().split('T')[0],
      url: '#quiz-' + quizId,
      downloadUrl: '',
      status: 'published',
      source: newQuiz.source,
      license: 'Giáo dục mở CC BY-NC-SA 4.0',
      description: `Câu hỏi trắc nghiệm: ${question}\nĐáp án đúng: ${newQuiz.options[newQuiz.correctIndex] || ''}\nGiải thích: ${newQuiz.explanation}`,
      downloads: 45,
      rating: 5.0,
    };
    db.materials.unshift(matQuiz);

    writeDb(db);
    res.status(201).json({
      success: true,
      message: 'Đã lưu câu hỏi trắc nghiệm thành công và đồng bộ hệ thống!',
      quiz: newQuiz
    });
  } catch (error: any) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Lỗi khi lưu câu hỏi: ' + error.message });
  }
});

// 3. DELETE /api/quizzes/:id
app.delete('/api/quizzes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = readDb();
    db.quizzes = db.quizzes || [];
    const index = db.quizzes.findIndex((q: any) => q.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Không tìm thấy câu hỏi trắc nghiệm để xóa.' });
    }

    db.quizzes.splice(index, 1);

    // Also remove from materials if synced
    if (db.materials) {
      db.materials = db.materials.filter((m: any) => m.id !== id && m.id !== 'mat-' + id);
    }

    writeDb(db);
    res.json({ success: true, message: 'Đã xóa câu hỏi trắc nghiệm khỏi hệ thống thành công.' });
  } catch (error: any) {
    res.status(500).json({ error: 'Lỗi khi xóa câu hỏi: ' + error.message });
  }
});

/* ==========================================================================
   HISTORY MOVIES (Phim Lịch Sử Số)
   ========================================================================== */

function getMovieCategoryLabel(category: string): string {
  switch (category) {
    case 'animation':
      return 'Hoạt hình lịch sử';
    case 'documentary':
      return 'Phim tư liệu quý';
    case 'reenactment':
      return 'Phim tái hiện lịch sử';
    case 'lecture':
      return 'Video bài giảng';
    default:
      return 'Phim lịch sử chọn lọc';
  }
}

// 1. GET /api/movies
app.get('/api/movies', (req, res) => {
  try {
    const db = readDb();
    const { grade, category, search } = req.query;

    let moviesList = [...(db.movies || [])];

    // Auto-sync any materials where category === 'Phim lịch sử' or type === 'video' or type === 'mp4'
    const videoMaterials = (db.materials || []).filter(
      (m) =>
        m.category === 'Phim lịch sử' ||
        m.type === 'video' ||
        m.type === 'mp4' ||
        (m.url && (m.url.includes('youtube.com') || m.url.includes('youtu.be') || m.url.endsWith('.mp4')))
    );

    for (const mat of videoMaterials) {
      const exists = moviesList.some((m) => m.id === mat.id || (m.videoUrl && m.videoUrl === mat.url));
      if (!exists && mat.url) {
        moviesList.unshift({
          id: mat.id,
          title: mat.title,
          category: 'documentary',
          categoryLabel: 'Phim tư liệu quý',
          grade: (mat.grade === 4 || mat.grade === 5) ? mat.grade : 4,
          period: mat.lessonTitle || 'Lịch sử Việt Nam',
          duration: 'Tư liệu giáo viên',
          thumbnailColor: 'from-amber-700 to-amber-900',
          summary: mat.description || `Tư liệu video: ${mat.title}`,
          source: mat.source || mat.author || 'Tư liệu giáo viên đăng tải',
          videoUrl: mat.url,
          preQuestions: [
            'Nội dung chính của video này đề cập đến thời kì hoặc nhân vật lịch sử nào?',
            'Hãy chú ý đến các mốc thời gian và địa danh xuất hiện trong video.'
          ],
          postQuestions: [
            'Sau khi xem xong, em ấn tượng nhất với sự kiện hoặc chi tiết nào?',
            'Ý nghĩa của sự kiện lịch sử này đối với non sông đất nước ta là gì?'
          ],
          author: mat.author,
          authorEmail: mat.authorEmail,
          createdAt: mat.date || new Date().toISOString().split('T')[0],
          status: mat.status || 'published'
        });
      }
    }

    // Apply filtering
    if (grade && grade !== 'all') {
      moviesList = moviesList.filter((m) => m.grade === Number(grade) || m.grade === 'all');
    }
    if (category && category !== 'all') {
      moviesList = moviesList.filter((m) => m.category === category);
    }
    if (search) {
      const q = String(search).toLowerCase();
      moviesList = moviesList.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.period && m.period.toLowerCase().includes(q)) ||
          (m.summary && m.summary.toLowerCase().includes(q)) ||
          (m.source && m.source.toLowerCase().includes(q))
      );
    }

    res.json(moviesList);
  } catch (error: any) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Lỗi khi tải danh sách phim lịch sử.' });
  }
});

// 2. POST /api/movies
app.post('/api/movies', (req, res) => {
  try {
    const {
      title,
      category = 'animation',
      categoryLabel,
      grade = 4,
      period = 'Lịch sử Việt Nam',
      duration = '10 phút',
      thumbnailColor = 'from-amber-700 to-amber-900',
      summary = '',
      source = 'Giáo viên cung cấp',
      videoUrl,
      preQuestions = [],
      postQuestions = [],
      author = 'Cô giáo Phạm Thị Thanh',
      authorEmail = 'pham.thanhh212@gmail.com'
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Tiêu đề phim là bắt buộc.' });
    }
    if (!videoUrl || !videoUrl.trim()) {
      return res.status(400).json({ error: 'Đường dẫn video (YouTube hoặc tệp tải lên) là bắt buộc.' });
    }

    const db = readDb();
    const movieId = 'mov-' + Date.now();

    const newMovie = {
      id: movieId,
      title: title.trim(),
      category,
      categoryLabel: categoryLabel || getMovieCategoryLabel(category),
      grade: grade === 5 ? 5 : (grade === 'all' ? 'all' : 4),
      period: period.trim(),
      duration: duration.trim() || '8 phút 30 giây',
      thumbnailColor,
      summary: summary.trim() || `Tư liệu phim lịch sử: ${title.trim()}`,
      source: source.trim() || 'Học liệu Dấu Ấn Non Sông',
      videoUrl: videoUrl.trim(),
      preQuestions: Array.isArray(preQuestions) && preQuestions.length > 0 ? preQuestions : [
        'Nội dung chính của video này đề cập đến sự kiện/nhân vật nào?',
        'Em hãy chú ý các chi tiết về thời gian và bối cảnh lịch sử nhé.'
      ],
      postQuestions: Array.isArray(postQuestions) && postQuestions.length > 0 ? postQuestions : [
        'Em học tập được điều gì sau khi xem xong video lịch sử này?',
        'Hãy chia sẻ cảm nghĩ của em về lòng yêu nước của cha ông ta.'
      ],
      author: author.trim(),
      authorEmail: authorEmail.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'published'
    };

    db.movies = db.movies || [];
    db.movies.unshift(newMovie);

    // Also sync to materials database so it is discoverable in Curriculum and Teacher Dashboard
    db.materials = db.materials || [];
    const syncMaterial: MaterialRecord = {
      id: 'mat-' + movieId,
      title: newMovie.title,
      grade: newMovie.grade === 5 ? 5 : 4,
      lessonCode: 'LS-PHIM',
      lessonTitle: newMovie.period,
      category: 'Phim lịch sử',
      type: newMovie.videoUrl.endsWith('.mp4') ? 'mp4' : 'video',
      author: newMovie.author,
      authorEmail: newMovie.authorEmail,
      date: newMovie.createdAt,
      url: newMovie.videoUrl,
      downloadUrl: newMovie.videoUrl.startsWith('/uploads/') ? newMovie.videoUrl : '',
      status: 'published',
      source: newMovie.source,
      license: 'Giáo dục mở CC BY-NC-SA 4.0',
      description: newMovie.summary,
      downloads: 0,
      rating: 5.0
    };
    db.materials.unshift(syncMaterial);

    writeDb(db);

    res.status(201).json({
      success: true,
      message: 'Đã xuất bản phim lịch sử thành công!',
      movie: newMovie
    });
  } catch (error: any) {
    console.error('Error creating movie:', error);
    res.status(500).json({ error: 'Lỗi khi lưu phim mới: ' + error.message });
  }
});

// 3. DELETE /api/movies/:id
app.delete('/api/movies/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = readDb();
    db.movies = db.movies || [];
    const index = db.movies.findIndex((m: any) => m.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Không tìm thấy phim để xóa.' });
    }

    db.movies.splice(index, 1);
    // Also remove from materials if synced
    if (db.materials) {
      db.materials = db.materials.filter((m: any) => m.id !== id && m.id !== 'mat-' + id);
    }

    writeDb(db);
    res.json({ success: true, message: 'Đã xóa phim khỏi danh sách.' });
  } catch (error: any) {
    res.status(500).json({ error: 'Lỗi khi xóa phim: ' + error.message });
  }
});

/* ==========================================================================
   ADMIN CMS & HISTORICAL CONTENT MANAGEMENT (Owner: pham.thanhh212@gmail.com)
   ========================================================================== */

function requireAdminRole(req: express.Request, res: express.Response, next: express.NextFunction) {
  const adminEmail = (req.headers['x-admin-email'] as string) || req.body?.adminEmail || req.query?.adminEmail;
  const userRole = (req.headers['x-user-role'] as string) || req.body?.userRole || req.query?.userRole;

  if (
    adminEmail?.toLowerCase() === 'pham.thanhh212@gmail.com' ||
    userRole === 'admin'
  ) {
    return next();
  }
  return res.status(403).json({
    error: 'Quyền truy cập bị từ chối. Chỉ Chủ sở hữu website (Cô Phạm Thị Thanh) mới có quyền quản trị và chỉnh sửa dữ liệu.'
  });
}

// 1. Get full CMS dataset (periods, events, figures, relics, articles, media, revisions)
app.get('/api/history/cms-data', (req, res) => {
  const db = readDb();
  res.json({
    periods: db.periods || [],
    events: db.events || [],
    figures: db.figures || [],
    relics: db.relics || [],
    articles: db.articles || [],
    media: db.media || [],
    revisions: db.revisions || []
  });
});

// Update Historical Period (GD01 - GD08)
app.put('/api/history/periods/:code', requireAdminRole, (req, res) => {
  const { code } = req.params;
  const db = readDb();
  db.periods = db.periods || [];
  const index = db.periods.findIndex((p: any) => p.Mã === code);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy thời kì lịch sử.' });
  }

  const existing = db.periods[index];
  const updated = {
    ...existing,
    ...req.body,
    Mã: code,
    updatedAt: new Date().toISOString()
  };
  db.periods[index] = updated;

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Cập nhật thời kì lịch sử: ${updated['Tên giai đoạn'] || code}`,
    itemType: 'period',
    itemId: code
  });

  writeDb(db);
  res.json({ success: true, period: updated });
});

// 2. Events CRUD
app.post('/api/history/events', requireAdminRole, (req, res) => {
  const db = readDb();
  const newEvent = req.body;
  if (!newEvent['Sự kiện'] && !newEvent.title) {
    return res.status(400).json({ error: 'Tên sự kiện là bắt buộc.' });
  }
  const formattedEvent = {
    Mã: newEvent.Mã || newEvent.id || 'SK' + String((db.events?.length || 0) + 1).padStart(3, '0'),
    'Sự kiện': newEvent['Sự kiện'] || newEvent.title || '',
    'Mốc thời gian': newEvent['Mốc thời gian'] || newEvent.time || '',
    'Mã giai đoạn': newEvent['Mã giai đoạn'] || newEvent.periodCode || 'GD01',
    'Dữ kiện tóm tắt': newEvent['Dữ kiện tóm tắt'] || newEvent.summary || '',
    'Ý nghĩa': newEvent['Ý nghĩa'] || newEvent.significance || '',
    'URL nguồn': newEvent['URL nguồn'] || newEvent.sourceUrl || 'https://baotanglichsu.vn/vi',
    'Trạng thái': newEvent['Trạng thái'] || 'Đã xuất bản',
    primaryImage: newEvent.primaryImage || null,
    galleryImages: newEvent.galleryImages || [],
    videoUrl: newEvent.videoUrl || null,
    updatedAt: new Date().toISOString()
  };

  db.events = db.events || [];
  db.events.unshift(formattedEvent);

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Thêm sự kiện: ${formattedEvent['Sự kiện']}`,
    itemType: 'event',
    itemId: formattedEvent.Mã
  });

  writeDb(db);
  res.status(201).json({ success: true, event: formattedEvent });
});

app.put('/api/history/events/:code', requireAdminRole, (req, res) => {
  const { code } = req.params;
  const db = readDb();
  db.events = db.events || [];
  const index = db.events.findIndex((e: any) => e.Mã === code || e.id === code);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy sự kiện cần sửa.' });
  }

  const existing = db.events[index];
  const updated = {
    ...existing,
    ...req.body,
    Mã: code,
    updatedAt: new Date().toISOString()
  };
  db.events[index] = updated;

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Cập nhật sự kiện: ${updated['Sự kiện'] || updated.title}`,
    itemType: 'event',
    itemId: code
  });

  writeDb(db);
  res.json({ success: true, event: updated });
});

app.delete('/api/history/events/:code', requireAdminRole, (req, res) => {
  const { code } = req.params;
  const db = readDb();
  db.events = db.events || [];
  const index = db.events.findIndex((e: any) => e.Mã === code || e.id === code);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy sự kiện cần xóa.' });
  }

  const removed = db.events.splice(index, 1)[0];
  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Xóa sự kiện: ${removed['Sự kiện'] || code}`,
    itemType: 'event',
    itemId: code
  });

  writeDb(db);
  res.json({ success: true, message: 'Đã xóa sự kiện thành công.' });
});

// 3. Figures CRUD
app.post('/api/history/figures', requireAdminRole, (req, res) => {
  const db = readDb();
  const newFigure = req.body;
  const formattedFigure = {
    Mã: newFigure.Mã || 'NV' + String((db.figures?.length || 0) + 1).padStart(2, '0'),
    'Nhân vật': newFigure['Nhân vật'] || newFigure.name || '',
    'Giai đoạn': newFigure['Giai đoạn'] || newFigure.period || 'GD01',
    'Đóng góp/sự kiện': newFigure['Đóng góp/sự kiện'] || newFigure.deeds || '',
    'Địa danh liên quan': newFigure['Địa danh liên quan'] || newFigure.relicLocation || '',
    'Ghi chú loại hình': newFigure['Ghi chú loại hình'] || 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': newFigure['URL nguồn'] || newFigure.sourceUrl || 'https://baotanglichsu.vn/vi',
    'Trạng thái': newFigure['Trạng thái'] || 'Đã xuất bản',
    avatarUrl: newFigure.avatarUrl || null,
    galleryImages: newFigure.galleryImages || [],
    videoUrl: newFigure.videoUrl || null,
    updatedAt: new Date().toISOString()
  };

  db.figures = db.figures || [];
  db.figures.unshift(formattedFigure);

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Thêm nhân vật: ${formattedFigure['Nhân vật']}`,
    itemType: 'figure',
    itemId: formattedFigure.Mã
  });

  writeDb(db);
  res.status(201).json({ success: true, figure: formattedFigure });
});

app.put('/api/history/figures/:code', requireAdminRole, (req, res) => {
  const { code } = req.params;
  const db = readDb();
  db.figures = db.figures || [];
  const index = db.figures.findIndex((f: any) => f.Mã === code);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy nhân vật.' });
  }

  const existing = db.figures[index];
  const updated = {
    ...existing,
    ...req.body,
    Mã: code,
    updatedAt: new Date().toISOString()
  };
  db.figures[index] = updated;

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Cập nhật nhân vật: ${updated['Nhân vật']}`,
    itemType: 'figure',
    itemId: code
  });

  writeDb(db);
  res.json({ success: true, figure: updated });
});

app.delete('/api/history/figures/:code', requireAdminRole, (req, res) => {
  const { code } = req.params;
  const db = readDb();
  db.figures = db.figures || [];
  const index = db.figures.findIndex((f: any) => f.Mã === code);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy nhân vật.' });
  }

  const removed = db.figures.splice(index, 1)[0];
  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Xóa nhân vật: ${removed['Nhân vật'] || code}`,
    itemType: 'figure',
    itemId: code
  });

  writeDb(db);
  res.json({ success: true, message: 'Đã xóa nhân vật thành công.' });
});

// 4. Relics CRUD
app.post('/api/history/relics', requireAdminRole, (req, res) => {
  const db = readDb();
  const newRelic = req.body;
  const formattedRelic = {
    Mã: newRelic.Mã || 'DT' + String((db.relics?.length || 0) + 1).padStart(2, '0'),
    'Tên di tích': newRelic['Tên di tích'] || newRelic.name || '',
    'Địa điểm': newRelic['Địa điểm'] || newRelic.location || '',
    'Giai đoạn': newRelic['Giai đoạn'] || newRelic.period || 'GD01',
    'Giá trị liên quan': newRelic['Giá trị liên quan'] || newRelic.values || '',
    'URL nguồn': newRelic['URL nguồn'] || newRelic.sourceUrl || 'https://dsvh.gov.vn',
    'Trạng thái': newRelic['Trạng thái'] || 'Đã xuất bản',
    primaryImage: newRelic.primaryImage || null,
    galleryImages: newRelic.galleryImages || [],
    videoUrl: newRelic.videoUrl || null,
    updatedAt: new Date().toISOString()
  };

  db.relics = db.relics || [];
  db.relics.unshift(formattedRelic);

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Thêm di tích: ${formattedRelic['Tên di tích']}`,
    itemType: 'relic',
    itemId: formattedRelic.Mã
  });

  writeDb(db);
  res.status(201).json({ success: true, relic: formattedRelic });
});

app.put('/api/history/relics/:code', requireAdminRole, (req, res) => {
  const { code } = req.params;
  const db = readDb();
  db.relics = db.relics || [];
  const index = db.relics.findIndex((r: any) => r.Mã === code);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy di tích.' });
  }

  const existing = db.relics[index];
  const updated = {
    ...existing,
    ...req.body,
    Mã: code,
    updatedAt: new Date().toISOString()
  };
  db.relics[index] = updated;

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Cập nhật di tích: ${updated['Tên di tích']}`,
    itemType: 'relic',
    itemId: code
  });

  writeDb(db);
  res.json({ success: true, relic: updated });
});

app.delete('/api/history/relics/:code', requireAdminRole, (req, res) => {
  const { code } = req.params;
  const db = readDb();
  db.relics = db.relics || [];
  const index = db.relics.findIndex((r: any) => r.Mã === code);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy di tích.' });
  }

  const removed = db.relics.splice(index, 1)[0];
  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Xóa di tích: ${removed['Tên di tích'] || code}`,
    itemType: 'relic',
    itemId: code
  });

  writeDb(db);
  res.json({ success: true, message: 'Đã xóa di tích thành công.' });
});

// 5. Articles (Rich Visual Editor) CRUD
app.get('/api/history/articles', (req, res) => {
  const db = readDb();
  res.json(db.articles || []);
});

app.post('/api/history/articles', requireAdminRole, (req, res) => {
  const db = readDb();
  const { title, category, periodCode, coverImage, summary, contentHtml, source, status, galleryImages, videoUrl } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Tiêu đề bài viết là bắt buộc.' });
  }

  const newArticle = {
    id: 'art-' + Date.now(),
    title,
    category: category || 'Chuyên đề lịch sử',
    periodCode: periodCode || 'GD01',
    coverImage: coverImage || '',
    summary: summary || '',
    contentHtml: contentHtml || '',
    author: 'Cô giáo Phạm Thị Thanh',
    authorEmail: 'pham.thanhh212@gmail.com',
    source: source || 'Bảo tàng Lịch sử quốc gia',
    status: status || 'published',
    galleryImages: galleryImages || [],
    videoUrl: videoUrl || '',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString()
  };

  db.articles = db.articles || [];
  db.articles.unshift(newArticle);

  // Sync to materials database
  db.materials = db.materials || [];
  db.materials.unshift({
    id: newArticle.id,
    title: newArticle.title,
    grade: 4,
    lessonCode: 'LS-THONG-TIN',
    lessonTitle: newArticle.category,
    category: 'Thông tin lịch sử',
    type: 'pdf',
    author: newArticle.author,
    authorEmail: newArticle.authorEmail,
    date: newArticle.createdAt,
    url: newArticle.coverImage || '#art-' + newArticle.id,
    downloadUrl: '',
    status: 'published',
    source: newArticle.source,
    license: 'Giáo dục mở CC BY-NC-SA 4.0',
    description: newArticle.summary || newArticle.title,
    downloads: 10,
    rating: 5.0
  });

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Đăng bài viết mới: ${newArticle.title}`,
    itemType: 'article',
    itemId: newArticle.id
  });

  writeDb(db);
  res.status(201).json({ success: true, article: newArticle });
});

app.put('/api/history/articles/:id', requireAdminRole, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.articles = db.articles || [];
  const index = db.articles.findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy bài viết.' });
  }

  const existing = db.articles[index];
  const updated = {
    ...existing,
    ...req.body,
    id,
    updatedAt: new Date().toISOString()
  };
  db.articles[index] = updated;

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Cập nhật bài viết: ${updated.title}`,
    itemType: 'article',
    itemId: id
  });

  writeDb(db);
  res.json({ success: true, article: updated });
});

app.delete('/api/history/articles/:id', requireAdminRole, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.articles = db.articles || [];
  const index = db.articles.findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy bài viết.' });
  }

  const removed = db.articles.splice(index, 1)[0];

  // Also remove from materials if synced
  if (db.materials) {
    db.materials = db.materials.filter((m: any) => m.id !== id && m.title !== removed.title);
  }

  db.revisions = db.revisions || [];
  db.revisions.unshift({
    id: 'rev-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    authorEmail: 'pham.thanhh212@gmail.com',
    description: `Xóa bài viết: ${removed.title || id}`,
    itemType: 'article',
    itemId: id
  });

  writeDb(db);
  res.json({ success: true, message: 'Đã xóa bài viết thành công.' });
});

// 6. Media Library Management (My Media Repository)
app.post('/api/history/media', requireAdminRole, (req, res) => {
  const db = readDb();
  const { title, type, url, thumbnailUrl, caption, source, author, periodCode, category, sizeBytes } = req.body;

  if (!url || !title) {
    return res.status(400).json({ error: 'Tiêu đề và đường dẫn URL tư liệu là bắt buộc.' });
  }

  const mediaItem = {
    id: 'med-' + Date.now(),
    title,
    type: type || 'image',
    url,
    thumbnailUrl: thumbnailUrl || url,
    caption: caption || '',
    source: source || 'Bảo tàng Lịch sử quốc gia',
    author: author || 'Cô Phạm Thị Thanh',
    periodCode: periodCode || 'GD01',
    category: category || 'Tư liệu lịch sử',
    sizeBytes: sizeBytes || 0,
    uploadedAt: new Date().toISOString()
  };

  db.media = db.media || [];
  db.media.unshift(mediaItem);
  writeDb(db);
  res.status(201).json({ success: true, media: mediaItem });
});

app.put('/api/history/media/:id', requireAdminRole, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.media = db.media || [];
  const index = db.media.findIndex((m: any) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy tư liệu.' });
  }

  const existing = db.media[index];
  const updated = {
    ...existing,
    ...req.body,
    id,
    updatedAt: new Date().toISOString()
  };
  db.media[index] = updated;
  writeDb(db);
  res.json({ success: true, media: updated });
});

app.delete('/api/history/media/:id', requireAdminRole, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.media = db.media || [];
  const index = db.media.findIndex((m: any) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy tư liệu đa phương tiện.' });
  }

  db.media.splice(index, 1);
  writeDb(db);
  res.json({ success: true, message: 'Đã xóa tư liệu khỏi thư viện.' });
});

// 6b. Historical Illustrations & Visual Media Repository
app.get('/api/history/illustrations', (req, res) => {
  const db = readDb();
  res.json(db.illustrations || []);
});

app.post('/api/history/illustrations', (req, res) => {
  const db = readDb();
  const illustration = req.body;
  if (!illustration || !illustration.title || !illustration.url) {
    return res.status(400).json({ error: 'Tiêu đề và đường dẫn hình ảnh là bắt buộc.' });
  }

  const newIllustration = {
    ...illustration,
    id: illustration.id || ('ill-' + Date.now()),
    createdAt: new Date().toISOString()
  };

  db.illustrations = db.illustrations || [];
  db.illustrations.unshift(newIllustration);

  // Sync to materials if appropriate
  db.materials = db.materials || [];
  const existsInMat = db.materials.some((m: any) => m.id === newIllustration.id);
  if (!existsInMat) {
    db.materials.unshift({
      id: newIllustration.id,
      title: newIllustration.title,
      grade: 4,
      lessonCode: 'LS4-B01',
      lessonTitle: newIllustration.periodName || 'Lịch sử Việt Nam',
      category: 'Tư liệu hình ảnh & Infographic',
      type: 'jpg',
      author: newIllustration.authorOrProvider || 'Giáo viên',
      authorEmail: 'pham.thanhh212@gmail.com',
      date: new Date().toISOString().split('T')[0],
      url: newIllustration.url,
      status: 'published',
      source: newIllustration.sourceName || 'Bảo tàng Lịch sử quốc gia',
      license: newIllustration.license || 'Giáo dục mở CC BY-NC-SA 4.0',
      description: newIllustration.historicalSignificance || newIllustration.caption || '',
      downloads: 0,
      rating: 5.0,
    });
  }

  writeDb(db);
  res.status(201).json({ success: true, illustration: newIllustration });
});

app.delete('/api/history/illustrations/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.illustrations = db.illustrations || [];
  const index = db.illustrations.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    db.illustrations.splice(index, 1);
  }
  if (db.materials) {
    db.materials = db.materials.filter((m: any) => m.id !== id);
  }
  writeDb(db);
  res.json({ success: true, message: 'Đã xóa ảnh minh họa thành công.' });
});

// 7. Backup & Restore
app.get('/api/history/backup', requireAdminRole, (req, res) => {
  const db = readDb();
  const backup = {
    exportDate: new Date().toISOString(),
    owner: 'Cô giáo Phạm Thị Thanh (pham.thanhh212@gmail.com)',
    school: 'Trường Tiểu học Tiền Phong',
    periods: db.periods || [],
    events: db.events || [],
    figures: db.figures || [],
    relics: db.relics || [],
    articles: db.articles || [],
    media: db.media || [],
    materials: db.materials || [],
    classes: db.classes || []
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="DauAnNonSong_Backup_${Date.now()}.json"`);
  res.send(JSON.stringify(backup, null, 2));
});

app.post('/api/history/restore', requireAdminRole, (req, res) => {
  try {
    const backupData = req.body;
    if (!backupData || typeof backupData !== 'object') {
      return res.status(400).json({ error: 'Tệp sao lưu không hợp lệ.' });
    }

    const db = readDb();
    if (Array.isArray(backupData.periods)) db.periods = backupData.periods;
    if (Array.isArray(backupData.events)) db.events = backupData.events;
    if (Array.isArray(backupData.figures)) db.figures = backupData.figures;
    if (Array.isArray(backupData.relics)) db.relics = backupData.relics;
    if (Array.isArray(backupData.articles)) db.articles = backupData.articles;
    if (Array.isArray(backupData.media)) db.media = backupData.media;

    db.revisions = db.revisions || [];
    db.revisions.unshift({
      id: 'rev-' + Date.now(),
      timestamp: new Date().toLocaleString('vi-VN'),
      authorEmail: 'pham.thanhh212@gmail.com',
      description: 'Khôi phục toàn bộ dữ liệu từ bản sao lưu',
      itemType: 'restore'
    });

    writeDb(db);
    res.json({
      success: true,
      message: 'Đã khôi phục dữ liệu thành công!',
      counts: {
        events: db.events?.length || 0,
        figures: db.figures?.length || 0,
        relics: db.relics?.length || 0,
        articles: db.articles?.length || 0,
        media: db.media?.length || 0
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Lỗi khi khôi phục dữ liệu: ' + err.message });
  }
});

// 8. Import Raw Text / JSON / Word text
app.post('/api/history/import-text', requireAdminRole, (req, res) => {
  try {
    const { rawText, fileType, defaultPeriod = 'GD01' } = req.body;
    if (!rawText || typeof rawText !== 'string') {
      return res.status(400).json({ error: 'Nội dung tệp trống.' });
    }

    const db = readDb();
    if (fileType === 'json') {
      const parsed = JSON.parse(rawText);
      let count = 0;
      if (Array.isArray(parsed.su_kien || parsed.events)) {
        const incomingEvents = parsed.su_kien || parsed.events;
        db.events = [...incomingEvents, ...(db.events || [])];
        count += incomingEvents.length;
      }
      if (Array.isArray(parsed.nhan_vat || parsed.figures)) {
        const incomingFigures = parsed.nhan_vat || parsed.figures;
        db.figures = [...incomingFigures, ...(db.figures || [])];
        count += incomingFigures.length;
      }
      if (Array.isArray(parsed.di_tich || parsed.relics)) {
        const incomingRelics = parsed.di_tich || parsed.relics;
        db.relics = [...incomingRelics, ...(db.relics || [])];
        count += incomingRelics.length;
      }

      writeDb(db);
      return res.json({ success: true, count, message: `Đã nhập thành công ${count} mục từ tệp JSON!` });
    }

    // Text import: parse lines or paragraphs into an article
    const lines = rawText.split('\n').filter((l: string) => l.trim().length > 0);
    const title = lines[0] ? lines[0].replace(/^[#*\s-]+/, '').trim() : 'Tư liệu bổ sung';
    const summary = lines[1] ? lines[1].trim() : '';
    const contentHtml = lines.map((l: string) => `<p>${l.trim()}</p>`).join('');

    const newArticle = {
      id: 'art-' + Date.now(),
      title,
      category: 'Tư liệu văn bản',
      periodCode: defaultPeriod,
      summary,
      contentHtml,
      author: 'Cô giáo Phạm Thị Thanh',
      authorEmail: 'pham.thanhh212@gmail.com',
      source: 'Tệp tải lên',
      status: 'published',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString()
    };

    db.articles = db.articles || [];
    db.articles.unshift(newArticle);
    writeDb(db);

    res.json({ success: true, article: newArticle, message: `Đã nhập bài viết "${title}" thành công!` });
  } catch (err: any) {
    res.status(500).json({ error: 'Lỗi khi nhập tệp: ' + err.message });
  }
});

/* ==========================================================================
   AI KNOWLEDGE BASE & CHATBOT WITH RAG INTEGRATION
   ========================================================================== */

app.get('/api/ai/knowledge', (req, res) => {
  const db = readDb();
  // Return all published materials formatted as indexed knowledge items
  const indexed = db.materials
    .filter((m) => m.status === 'published')
    .map((m) => ({
      id: m.id,
      title: m.title,
      grade: m.grade,
      lessonCode: m.lessonCode,
      category: m.category,
      summary: m.description,
      source: m.source,
      author: m.author,
    }));
  res.json(indexed);
});

// Chatbot endpoint with RAG context from approved materials
app.post('/api/chat', async (req, res) => {
  try {
    const { message, mode = 'explain', grade = 4, lessonTitle, periodTitle } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Nội dung câu hỏi không hợp lệ.' });
    }

    // Retrieve approved knowledge context from database
    const db = readDb();
    const approvedKnowledge = db.materials
      .filter((m) => m.status === 'published' && (m.grade === Number(grade) || !m.grade))
      .slice(0, 8)
      .map((m) => `- [Bài ${m.lessonCode} - ${m.title}]: ${m.description} (Nguồn: ${m.source})`)
      .join('\n');

    const systemPrompt = `Bạn là "Bạn Sử Nhí" – người bạn đồng hành AI thông minh, ấm áp và trung thực của học sinh lớp 4 và lớp 5 trong website giáo dục "Dấu Ấn Non Sông" (Sản phẩm do cô giáo Phạm Thị Thanh xây dựng và phát triển).
Nội dung bám sát Chương trình GDPT 2018 môn Lịch sử và Địa lí (bộ sách Kết nối tri thức với cuộc sống).

KHO TRI THỨC ĐÃ ĐƯỢC GIÁO VIÊN KIỂM DUYỆT (ƯU TIÊN THAM CHIẾU):
${approvedKnowledge}

QUY TẮC BẮT BUỘC VỀ "BA LỚP SỰ THẬT":
1. THÔNG TIN ĐÃ KIỂM CHỨNG: Những sự kiện, nhân vật, thời gian, địa danh có chứng cứ khảo cổ hoặc sử liệu xác thực (ví dụ: Khởi nghĩa Hai Bà Trưng năm 40, Ngô Quyền đại phá quân Nam Hán trên sông Bạch Đằng năm 938, Tuyên ngôn Độc lập ngày 2/9/1945...).
2. TRUYỀN THUYẾT / BIỂU TƯỢNG VĂN HÓA DÂN GIAN: Những câu chuyện dân gian mang yếu tố kì ảo (như Lạc Long Quân - Âu Cơ, Thánh Gióng, Sơn Tinh - Thủy Tinh, Sự tích Hồ Gươm...). BẠN PHẢI NÊU RÕ đây là truyền thuyết, biểu tượng thể hiện lòng biết ơn và ước mơ của tổ tiên, KHÔNG đánh đồng là sự kiện lịch sử thực chứng.
3. THÔNG TIN CÒN TRANH LUẬN / CHƯA ĐỦ CHỨNG CỨ: Nêu rõ điều này và KHÔNG tự suy đoán hay bịa đặt niên đại, trang sách hoặc tác giả.

CÁC CHẾ ĐỘ TRẢ LỜI ĐƯỢC CHỌN (Hiện tại là: ${mode}):
- explain (Giải thích ngắn): Câu từ trong sáng, ngắn gọn (2-3 đoạn ngắn), dễ hiểu với trẻ em 9-11 tuổi. Có gạch đầu dòng các ý cốt lõi.
- story (Kể chuyện lịch sử): Kể truyền cảm, hấp dẫn, sinh động. NẾU CÓ ĐỐI THOẠI TƯỞNG TƯỢNG thì phải ghi chú rõ [Lời thoại minh họa].
- detective (Thám tử sử liệu): Giúp học sinh soi xét bằng chứng: Ai ghi lại? Tìm thấy ở đâu (hiện vật gì)? Đâu là sự thật và đâu là huyền tích?
- review (Ôn tập gợi mở): Tóm tắt 3 ý quan trọng nhất và kết thúc bằng 1 câu hỏi gợi mở để học sinh tự suy ngẫm.

ĐỊNH DẠNG TRẢ LỜI:
Hãy trả lời bằng tiếng Việt tự nhiên và bổ sung phần metadata rõ ràng ở cuối theo định dạng:
[NGUỒN THAM KHẢO]: Trích tên sách giáo khoa (ví dụ: SGK Lịch sử và Địa lí 4/5 Kết nối tri thức, Bảo tàng Lịch sử Quốc gia, Viện Sử học).
[LỚP SỰ THẬT]: Đã kiểm chứng / Truyền thuyết dân gian / Còn thảo luận.
[CÂU HỎI SUY NGẪM]: 1 câu hỏi kích thích tư duy cho bạn nhỏ.`;

    const userPrompt = `[Bối cảnh học tập]: Học sinh lớp ${grade}
[Chủ đề/Bài học liên quan]: ${lessonTitle || 'Lịch sử Việt Nam'} ${periodTitle ? `(${periodTitle})` : ''}
[Chế độ]: ${mode}
[Câu hỏi của học sinh]: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.6,
      },
    });

    const text = response.text || 'Bạn Sử Nhí chưa tìm thấy tư liệu chắc chắn cho câu hỏi này. Bạn hãy cùng trao đổi thêm với thầy cô nhé!';

    let answerBody = text;
    let sources = 'Bộ SGK Lịch sử và Địa lí (Kết nối tri thức với cuộc sống), Bảo tàng Lịch sử Quốc gia';
    let evidenceClass = 'Đã kiểm chứng';
    let reflectionQuestion = 'Em học tập được đức tính gì từ nhân vật lịch sử này?';

    const sourceMatch = text.match(/\[NGUỒN THAM KHẢO\]:\s*([\s\S]*?)(?=\n\[|$)/i);
    if (sourceMatch) {
      sources = sourceMatch[1].trim();
      answerBody = answerBody.replace(sourceMatch[0], '');
    }

    const classMatch = text.match(/\[LỚP SỰ THẬT\]:\s*([\s\S]*?)(?=\n\[|$)/i);
    if (classMatch) {
      evidenceClass = classMatch[1].trim();
      answerBody = answerBody.replace(classMatch[0], '');
    }

    const questionMatch = text.match(/\[CÂU HỎI SUY NGẪM\]:\s*([\s\S]*?)(?=\n\[|$)/i);
    if (questionMatch) {
      reflectionQuestion = questionMatch[1].trim();
      answerBody = answerBody.replace(questionMatch[0], '');
    }

    res.json({
      reply: answerBody.trim(),
      sources,
      evidenceClass,
      reflectionQuestion,
      mode,
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      error: 'Bạn Sử Nhí đang kiểm tra lại sử liệu trong giây lát. Bạn vui lòng thử lại sau ít phút nhé!',
      details: error?.message || 'Gemini API Error',
    });
  }
});

// Presenter feedback endpoint
app.post('/api/presenter-review', async (req, res) => {
  try {
    const { studentName, topic, script } = req.body;

    if (!script || script.trim().length < 15) {
      return res.status(400).json({ error: 'Bài thuyết minh cần có ít nhất một đoạn ngắn để Bạn Sử Nhí góp ý.' });
    }

    const prompt = `Bạn là Ban giám khảo thân thiện của cuộc thi "Em làm thuyết minh viên nhí" thuộc website Dấu Ấn Non Sông dành cho học sinh tiểu học (lớp 4-5).
Đề tài: "${topic}"
Học sinh: "${studentName || 'Thuyết minh viên nhí'}"
Nội dung bài viết/nói:
"""
${script}
"""

Hãy đánh giá và gửi lời khuyên ân cần theo các tiêu chí:
1. Độ chính xác lịch sử (thời gian, nhân vật, diễn biến, không nhầm lẫn).
2. Bố cục bài thuyết minh (Chào hỏi, giới thiệu địa danh/nhân vật, điểm nổi bật, cảm nghĩ bản thân).
3. Lời khen ngợi khuyến khích cụ thể và 1-2 mẹo nhỏ để nói hay hơn trước lớp.
4. Chấm điểm động viên (thang điểm 100, từ 85 - 100).

Định dạng trả lời JSON:
{
  "score": 92,
  "accuracyRating": "Rất chính xác / Cần lưu ý một số chi tiết",
  "praise": "Lời khen cụ thể...",
  "suggestions": "Góp ý để hoàn thiện...",
  "detailedFeedback": "Nội dung phản hồi chi tiết 2-3 câu khích lệ"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    res.json({
      success: true,
      review: parsed,
    });
  } catch (error: any) {
    console.error('Presenter review error:', error);
    res.status(500).json({ error: 'Không thể xử lý phản hồi lúc này.' });
  }
});

// Vite middleware in dev or static files in production
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dấu Ấn Non Sông server running on port ${PORT}`);
});
