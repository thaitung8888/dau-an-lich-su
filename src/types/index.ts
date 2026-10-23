export type GradeLevel = 4 | 5;

export type UserRole = 'admin' | 'teacher' | 'student' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  grade?: GradeLevel;
  classCode?: string;
  school?: string;
  approved?: boolean;
  avatarIcon?: string;
  stampsCount: number;
}

export type TruthLayer = 'verified' | 'legend' | 'debated';

export interface HistoricalPeriod {
  id: string;
  number: number;
  title: string;
  timeSpan: string;
  shortDesc: string;
  bannerColor: string;
  iconName: string;
  context: string;
  imageUrl?: string;
  imageCaption?: string;
  gallery?: {
    url: string;
    title: string;
    caption: string;
    type?: string;
    typeLabel?: string;
  }[];
  keyEvents: {
    year: string;
    title: string;
    description: string;
    location: string;
    evidenceClass: TruthLayer;
  }[];
  famousFigures: string[];
  relicSites: string[];
  artifacts: string[];
  meaning: string;
}

export interface TextbookLesson {
  id: string;
  code: string;
  grade: GradeLevel;
  title: string;
  periodId: string;
  objectives: string[];
  fiveCorePoints: string[];
  timeline: { year: string; event: string }[];
  figures: string[];
  relics: string[];
  primarySource: string;
  actionTask: string;
}

export interface HistoricalImage {
  id: string;
  title: string;
  url: string;
  type: 'illustration' | 'archive_photo' | 'museum_artifact' | 'relic_site' | 'folk_painting' | string;
  typeLabel: 'Tranh minh họa' | 'Ảnh tư liệu lịch sử' | 'Hiện vật bảo tàng' | 'Di tích thực tế' | 'Tranh dân gian' | string;
  caption: string;
  authorOrProvider: string;
  sourceName: string;
  sourceUrl?: string;
  license: string;
  details?: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  title: string;
  era: string;
  periodId: string;
  origin: string;
  contribution: string;
  biography?: string;
  achievements?: string[];
  anecdote?: string;
  memorableQuote?: string;
  evidenceClass: TruthLayer;
  reflectionQuestion: string;
  primaryImage?: HistoricalImage;
  gallery?: HistoricalImage[];
  sourceReferences?: string[];
  lastVerifiedDate?: string;
}

export interface LegendStory {
  id: string;
  title: string;
  associatedHero: string;
  period: string;
  storySummary: string;
  symbolism: string;
  historicalCore: string;
  distinctionNote: string;
  primaryImage?: HistoricalImage;
  gallery?: HistoricalImage[];
  sourceReferences?: string[];
}

export interface NationalArtifact {
  id: string;
  name: string;
  era: string;
  material: string;
  locationPreserved: string;
  historicalSignificance: string;
  discoveryStory: string;
  source: string;
  primaryImage?: HistoricalImage;
  gallery?: HistoricalImage[];
  sourceReferences?: string[];
}

export interface RelicSite {
  id: string;
  name: string;
  location: string;
  region: 'Bắc' | 'Trung' | 'Nam';
  period: string;
  historicalRole: string;
  coordinates: { x: number; y: number };
  highlights: string[];
  imageUrl?: string;
  primaryImage?: HistoricalImage;
  gallery?: HistoricalImage[];
  sourceReferences?: string[];
}

export interface QuizQuestion {
  id: string;
  lessonCode: string;
  lessonTitle?: string;
  grade?: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
  truthLayer: TruthLayer;
}

export interface DetectiveCase {
  id: string;
  title: string;
  claim: string;
  proposedStatement: string;
  evidenceText: string;
  actualCategory: TruthLayer;
  explanation: string;
  historicalSource: string;
}

export interface PassportStamp {
  id: string;
  siteOrMilestone: string;
  periodTitle: string;
  dateEarned?: string;
  icon: string;
  lessonCode?: string;
  unlocked: boolean;
  knowledgeNote: string;
}

export interface LearningMaterial {
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
  questionData?: any;
}

export interface ClassItem {
  id: string;
  code: string;
  name: string;
  grade: number;
  pin: string;
  teacherEmail: string;
  school: string;
  studentCount: number;
}

export interface DynastyInfo {
  id: string;
  name: string;
  era: string;
  founder: string;
  capital: string;
  countryName: string;
  keyHighlights: string[];
  historicalSignificance: string;
  representativeFigures: string[];
  primarySource: string;
}

export interface CulturalAchievement {
  id: string;
  title: string;
  category: 'Giáo dục & Khoa cử' | 'Pháp luật & Quản trị' | 'Kỹ nghệ & Khảo cổ' | 'Y học & Khoa học' | 'Văn hóa & Di sản';
  era: string;
  summary: string;
  significance: string;
  historicalFigures: string[];
  relicsOrArtifacts: string[];
  sourceReference: string;
}

export interface DatasetGiaiDoan {
  Mã: string;
  'Tên giai đoạn': string;
  'Thời gian': string;
  'Nội dung tiêu biểu': string;
  'Nhân vật': string;
  'Di tích/hiện vật': string;
  'Nguồn tham khảo': string;
  'Trạng thái': string;
}

export interface DatasetSuKien {
  Mã: string;
  'Sự kiện': string;
  'Mốc thời gian': string;
  'Mã giai đoạn': string;
  'Dữ kiện tóm tắt': string;
  'Ý nghĩa': string;
  'URL nguồn': string;
  'Trạng thái': string;
}

export interface DatasetNhanVat {
  Mã: string;
  'Nhân vật': string;
  'Giai đoạn': string;
  'Đóng góp/sự kiện': string;
  'Địa danh liên quan': string;
  'Ghi chú loại hình': string;
  'URL nguồn': string;
  'Trạng thái': string;
}

export interface DatasetDiTich {
  Mã: string;
  'Tên di tích': string;
  'Địa điểm': string;
  'Giai đoạn': string;
  'Giá trị liên quan': string;
  'URL nguồn': string;
  'Trạng thái': string;
}

export interface DatasetTruyenThuyet {
  Mã: string;
  'Tên truyền thuyết': string;
  'Giai đoạn': string;
  'Nội dung liên hệ': string;
  'Lưu ý phân biệt': string;
  'Trạng thái': string;
}

export interface DatasetHinhAnh {
  Mã: string;
  'Hình ảnh đề xuất': string;
  'Loại tư liệu': string;
  'Giai đoạn': string;
  'Cơ quan cung cấp': string;
  'URL trang nguồn': string;
  'URL ảnh trực tiếp'?: string | null;
  'Quyền sử dụng': string;
  'Trạng thái': string;
}

export interface DatasetNguonTuLieu {
  Mã: string;
  'Nguồn/tổ chức': string;
  'URL': string;
  'Phạm vi tư liệu': string;
  'Lưu ý': string;
}

export interface OfficialHistoryDataset {
  ten_bo_tu_lieu: string;
  muc_dich: string;
  ghi_chu_kiem_chung: string;
  huong_dan_goc: { cot_1: string | null; cot_2: string | null }[];
  giai_doan: DatasetGiaiDoan[];
  su_kien: DatasetSuKien[];
  nhan_vat: DatasetNhanVat[];
  di_tich: DatasetDiTich[];
  truyen_thuyet: DatasetTruyenThuyet[];
  hinh_anh: DatasetHinhAnh[];
  nguon_tu_lieu: DatasetNguonTuLieu[];
}

export interface CmsArticle {
  id: string;
  title: string;
  category: string;
  periodCode: string;
  coverImage?: string;
  summary: string;
  contentHtml: string;
  author: string;
  authorEmail: string;
  source: string;
  status: 'published' | 'hidden' | 'draft';
  galleryImages?: string[];
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsMediaItem {
  id: string;
  title: string;
  type: 'image' | 'video_file' | 'video_youtube';
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  source?: string;
  author?: string;
  periodCode?: string;
  category?: string;
  sizeBytes?: number;
  uploadedAt: string;
}

export interface CmsRevision {
  id: string;
  timestamp: string;
  authorEmail: string;
  description: string;
  itemType: string;
  itemId?: string;
}

export interface CmsFullDataset {
  periods: DatasetGiaiDoan[];
  events: DatasetSuKien[];
  figures: DatasetNhanVat[];
  relics: DatasetDiTich[];
  articles: CmsArticle[];
  media: CmsMediaItem[];
  revisions: CmsRevision[];
}

export interface HistoryMovie {
  id: string;
  title: string;
  category: 'animation' | 'documentary' | 'reenactment' | 'lecture' | 'other';
  categoryLabel: string;
  grade: 4 | 5 | 'all';
  period: string;
  duration: string;
  thumbnailColor?: string;
  thumbnailUrl?: string;
  summary: string;
  source: string;
  videoUrl: string;
  preQuestions: string[];
  postQuestions: string[];
  author?: string;
  authorEmail?: string;
  createdAt?: string;
  status?: 'published' | 'pending_approval' | 'hidden';
}


