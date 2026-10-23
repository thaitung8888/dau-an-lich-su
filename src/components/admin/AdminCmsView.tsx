import React, { useState, useEffect, useRef } from 'react';
import {
  CmsFullDataset,
  DatasetSuKien,
  DatasetNhanVat,
  DatasetDiTich,
  DatasetGiaiDoan,
  CmsArticle,
  CmsMediaItem,
  CmsRevision,
  UserProfile
} from '../../types';
import { VisualEditor } from './VisualEditor';
import { MediaPickerModal } from './MediaPickerModal';
import {
  DongSonDrumSVG,
  DongSonStar,
  ChimLacSVG,
  DongSonCorner
} from '../DongSonMotif';
import {
  Calendar,
  Users,
  Landmark,
  Layers,
  FileText,
  Image as ImageIcon,
  Video,
  Upload,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Save,
  Download,
  RotateCcw,
  Search,
  Filter,
  Check,
  X,
  Lock,
  Sparkles,
  Link as LinkIcon,
  Play,
  Film,
  FileUp,
  Clock,
  ShieldCheck,
  HelpCircle,
  Copy,
  FolderOpen
} from 'lucide-react';

interface AdminCmsViewProps {
  currentUser?: UserProfile | null;
  onOpenAiWithPrompt?: (prompt: string, context?: any) => void;
  onOpenLogin?: () => void;
}

export const AdminCmsView: React.FC<AdminCmsViewProps> = ({
  currentUser,
  onOpenAiWithPrompt,
  onOpenLogin
}) => {
  const isAdmin = currentUser?.role === 'admin' || currentUser?.email === 'pham.thanhh212@gmail.com';

  const [activeTab, setActiveTab] = useState<
    'events' | 'figures' | 'relics' | 'periods' | 'articles' | 'my-repository' | 'backup-revisions'
  >('events');

  // CMS Data State
  const [loading, setLoading] = useState(true);
  const [actionNotice, setActionNotice] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [cmsData, setCmsData] = useState<CmsFullDataset>({
    periods: [],
    events: [],
    figures: [],
    relics: [],
    articles: [],
    media: [],
    revisions: []
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriodFilter, setSelectedPeriodFilter] = useState('ALL');

  // Media Picker state for inserting into editors/forms
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'article_cover' | 'article_editor' | 'event_primary' | 'figure_avatar' | 'relic_primary' | null>(null);

  // Modals for CRUD
  const [editingEvent, setEditingEvent] = useState<DatasetSuKien | null>(null);
  const [isNewEventModal, setIsNewEventModal] = useState(false);

  const [editingFigure, setEditingFigure] = useState<DatasetNhanVat | null>(null);
  const [isNewFigureModal, setIsNewFigureModal] = useState(false);

  const [editingRelic, setEditingRelic] = useState<DatasetDiTich | null>(null);
  const [isNewRelicModal, setIsNewRelicModal] = useState(false);

  const [editingPeriod, setEditingPeriod] = useState<DatasetGiaiDoan | null>(null);

  const [editingArticle, setEditingArticle] = useState<CmsArticle | null>(null);
  const [isNewArticleModal, setIsNewArticleModal] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<CmsArticle | null>(null);

  // Media Upload Modal
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);

  // Repository filter
  const [repoTypeFilter, setRepoTypeFilter] = useState<'all' | 'image' | 'video' | 'events' | 'figures' | 'relics'>('all');

  // File import for TXT / JSON / Word
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importFileType, setImportFileType] = useState<'txt' | 'json' | 'word'>('txt');
  const [importTextContent, setImportTextContent] = useState('');

  // Video Player Modal preview
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  // Direct Image upload state
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  useEffect(() => {
    fetchCmsData();
  }, []);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'x-admin-email': currentUser?.email || 'pham.thanhh212@gmail.com',
    'x-user-role': currentUser?.role || 'admin'
  });

  const fetchCmsData = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/history/cms-data');
      if (res.ok) {
        const data = await res.json();
        setCmsData({
          periods: data.periods || [],
          events: data.events || [],
          figures: data.figures || [],
          relics: data.relics || [],
          articles: data.articles || [],
          media: data.media || [],
          revisions: data.revisions || []
        });
      } else {
        throw new Error('Không thể kết nối đến cơ sở dữ liệu máy chủ.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Lỗi khi tải dữ liệu lịch sử.');
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================================
     1. EVENTS CRUD
     ========================================================================= */
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      const isCreate = isNewEventModal;
      const endpoint = isCreate
        ? '/api/history/events'
        : `/api/history/events/${editingEvent.Mã}`;
      const method = isCreate ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(editingEvent)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi lưu sự kiện.');
      }

      showNotice(isCreate ? 'Đã thêm sự kiện lịch sử mới thành công!' : 'Đã cập nhật sự kiện lịch sử thành công!');
      setIsNewEventModal(false);
      setEditingEvent(null);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteEvent = async (code: string, title: string) => {
    if (!window.confirm(`Cô có chắc chắn muốn xóa sự kiện "${title}" không?`)) return;
    try {
      const res = await fetch(`/api/history/events/${code}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi xóa sự kiện.');
      }
      showNotice(`Đã xóa sự kiện "${title}".`);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleToggleEventStatus = async (item: DatasetSuKien) => {
    const nextStatus = item['Trạng thái'] === 'Đã xuất bản' ? 'Tạm ẩn' : 'Đã xuất bản';
    try {
      const res = await fetch(`/api/history/events/${item.Mã}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ 'Trạng thái': nextStatus })
      });
      if (res.ok) {
        showNotice(`Đã chuyển trạng thái sự kiện sang "${nextStatus}".`);
        fetchCmsData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================================
     2. FIGURES CRUD
     ========================================================================= */
  const handleSaveFigure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFigure) return;

    try {
      const isCreate = isNewFigureModal;
      const endpoint = isCreate
        ? '/api/history/figures'
        : `/api/history/figures/${editingFigure.Mã}`;
      const method = isCreate ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(editingFigure)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi lưu nhân vật.');
      }

      showNotice(isCreate ? 'Đã thêm nhân vật lịch sử mới!' : 'Đã cập nhật thông tin nhân vật!');
      setIsNewFigureModal(false);
      setEditingFigure(null);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteFigure = async (code: string, name: string) => {
    if (!window.confirm(`Cô có chắc chắn muốn xóa nhân vật "${name}" không?`)) return;
    try {
      const res = await fetch(`/api/history/figures/${code}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi xóa nhân vật.');
      }
      showNotice(`Đã xóa nhân vật "${name}".`);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* =========================================================================
     3. RELICS CRUD
     ========================================================================= */
  const handleSaveRelic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRelic) return;

    try {
      const isCreate = isNewRelicModal;
      const endpoint = isCreate
        ? '/api/history/relics'
        : `/api/history/relics/${editingRelic.Mã}`;
      const method = isCreate ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(editingRelic)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi lưu di tích.');
      }

      showNotice(isCreate ? 'Đã thêm di tích lịch sử mới!' : 'Đã cập nhật thông tin di tích!');
      setIsNewRelicModal(false);
      setEditingRelic(null);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteRelic = async (code: string, name: string) => {
    if (!window.confirm(`Cô có chắc chắn muốn xóa di tích "${name}" không?`)) return;
    try {
      const res = await fetch(`/api/history/relics/${code}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi xóa di tích.');
      }
      showNotice(`Đã xóa di tích "${name}".`);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* =========================================================================
     4. PERIODS CRUD (GD01 - GD08)
     ========================================================================= */
  const handleSavePeriod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPeriod) return;

    try {
      const res = await fetch(`/api/history/periods/${editingPeriod.Mã}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(editingPeriod)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi cập nhật thời kì lịch sử.');
      }

      showNotice(`Đã cập nhật thời kì ${editingPeriod.Mã} - ${editingPeriod['Tên giai đoạn']}!`);
      setEditingPeriod(null);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* =========================================================================
     5. ARTICLES CRUD (Visual Editor)
     ========================================================================= */
  const handleSaveArticle = async (publishStatus: 'published' | 'draft' | 'hidden' = 'published') => {
    if (!editingArticle || !editingArticle.title.trim()) {
      alert('Vui lòng nhập tiêu đề bài viết.');
      return;
    }

    try {
      const isCreate = isNewArticleModal;
      const endpoint = isCreate
        ? '/api/history/articles'
        : `/api/history/articles/${editingArticle.id}`;
      const method = isCreate ? 'POST' : 'PUT';

      const payload = {
        ...editingArticle,
        status: publishStatus
      };

      const res = await fetch(endpoint, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi lưu bài viết.');
      }

      showNotice(publishStatus === 'published' ? 'Đã xuất bản bài viết lên website!' : 'Đã lưu bản nháp bài viết!');
      setIsNewArticleModal(false);
      setEditingArticle(null);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!window.confirm(`Cô có chắc chắn muốn xóa bài viết "${title}" không?`)) return;
    try {
      const res = await fetch(`/api/history/articles/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi xóa bài viết.');
      }
      showNotice(`Đã xóa bài viết "${title}".`);
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* =========================================================================
     6. DIRECT FILE UPLOAD (Images & Videos - Persisted in /uploads)
     ========================================================================= */
  const handleUploadSingleFile = async (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch('/api/upload-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              fileData: base64Data,
              fileType: file.type
            })
          });

          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Tải tệp lên máy chủ thất bại.');
          }

          const data = await res.json();
          resolve(data.fileUrl);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Lỗi khi đọc tệp tin trên máy tính/điện thoại.'));
      reader.readAsDataURL(file);
    });
  };

  // Direct Image Upload Handler (+ THÊM HÌNH ẢNH)
  const [imageUploadForm, setImageUploadForm] = useState({
    title: '',
    caption: '',
    source: 'Bảo tàng Lịch sử quốc gia',
    author: 'Cô giáo Phạm Thị Thanh',
    periodCode: 'GD01',
    category: 'Ảnh tư liệu lịch sử',
    selectedFiles: [] as File[],
    previewUrls: [] as string[]
  });

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const previewUrls = filesArray.map((f) => URL.createObjectURL(f));
      setImageUploadForm((prev) => ({
        ...prev,
        selectedFiles: filesArray,
        previewUrls: previewUrls,
        title: prev.title || filesArray[0].name.replace(/\.[^/.]+$/, '')
      }));
    }
  };

  const handleSubmitImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUploadForm.selectedFiles.length === 0) {
      alert('Vui lòng chọn ít nhất 1 hình ảnh từ máy tính hoặc điện thoại.');
      return;
    }

    setIsUploadingFile(true);
    setUploadProgress(10);
    try {
      for (let i = 0; i < imageUploadForm.selectedFiles.length; i++) {
        const file = imageUploadForm.selectedFiles[i];
        setUploadProgress(Math.round(((i + 0.5) / imageUploadForm.selectedFiles.length) * 80));
        const fileUrl = await handleUploadSingleFile(file);

        if (fileUrl) {
          // Register media record
          await fetch('/api/history/media', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
              title: imageUploadForm.selectedFiles.length === 1 ? imageUploadForm.title : `${imageUploadForm.title} (${i + 1})`,
              type: 'image',
              url: fileUrl,
              thumbnailUrl: fileUrl,
              caption: imageUploadForm.caption,
              source: imageUploadForm.source,
              author: imageUploadForm.author,
              periodCode: imageUploadForm.periodCode,
              category: imageUploadForm.category,
              sizeBytes: file.size
            })
          });
        }
      }

      setUploadProgress(100);
      showNotice(`Đã tải lên và lưu trữ thành công ${imageUploadForm.selectedFiles.length} hình ảnh vào máy chủ!`);
      setIsAddImageModalOpen(false);
      setImageUploadForm({
        title: '',
        caption: '',
        source: 'Bảo tàng Lịch sử quốc gia',
        author: 'Cô giáo Phạm Thị Thanh',
        periodCode: 'GD01',
        category: 'Ảnh tư liệu lịch sử',
        selectedFiles: [],
        previewUrls: []
      });
      fetchCmsData();
    } catch (err: any) {
      alert('Lỗi tải ảnh: ' + err.message);
    } finally {
      setIsUploadingFile(false);
      setUploadProgress(0);
    }
  };

  // Video Upload Handler (+ THÊM VIDEO - Cách 1: Tải trực tiếp, Cách 2: Link YouTube)
  const [videoUploadForm, setVideoUploadForm] = useState({
    method: 'upload' as 'upload' | 'youtube',
    title: '',
    caption: '',
    source: 'Tư liệu Lịch sử Việt Nam',
    author: 'Cô giáo Phạm Thị Thanh',
    periodCode: 'GD01',
    youtubeUrl: '',
    selectedFile: null as File | null,
    previewUrl: ''
  });

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUploadForm((prev) => ({
        ...prev,
        selectedFile: file,
        previewUrl: URL.createObjectURL(file),
        title: prev.title || file.name.replace(/\.[^/.]+$/, '')
      }));
    }
  };

  const handleSubmitVideoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadingFile(true);
    setUploadProgress(20);

    try {
      let finalUrl = '';
      let videoType: 'video_file' | 'video_youtube' = 'video_file';

      if (videoUploadForm.method === 'upload') {
        if (!videoUploadForm.selectedFile) {
          alert('Vui lòng chọn tệp video MP4 hoặc WebM.');
          setIsUploadingFile(false);
          return;
        }
        setUploadProgress(50);
        const url = await handleUploadSingleFile(videoUploadForm.selectedFile);
        if (!url) throw new Error('Không thể tải video lên máy chủ.');
        finalUrl = url;
        videoType = 'video_file';
      } else {
        // YouTube URL
        if (!videoUploadForm.youtubeUrl.trim()) {
          alert('Vui lòng dán đường dẫn video YouTube.');
          setIsUploadingFile(false);
          return;
        }
        finalUrl = videoUploadForm.youtubeUrl.trim();
        videoType = 'video_youtube';
      }

      setUploadProgress(85);
      await fetch('/api/history/media', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: videoUploadForm.title,
          type: videoType,
          url: finalUrl,
          thumbnailUrl: videoType === 'video_youtube' ? getYouTubeThumbnail(finalUrl) : null,
          caption: videoUploadForm.caption,
          source: videoUploadForm.source,
          author: videoUploadForm.author,
          periodCode: videoUploadForm.periodCode,
          category: 'Phim tư liệu lịch sử',
          sizeBytes: videoUploadForm.selectedFile?.size || 0
        })
      });

      setUploadProgress(100);
      showNotice('Đã thêm video lịch sử thành công!');
      setIsAddVideoModalOpen(false);
      setVideoUploadForm({
        method: 'upload',
        title: '',
        caption: '',
        source: 'Tư liệu Lịch sử Việt Nam',
        author: 'Cô giáo Phạm Thị Thanh',
        periodCode: 'GD01',
        youtubeUrl: '',
        selectedFile: null,
        previewUrl: ''
      });
      fetchCmsData();
    } catch (err: any) {
      alert('Lỗi thêm video: ' + err.message);
    } finally {
      setIsUploadingFile(false);
      setUploadProgress(0);
    }
  };

  const getYouTubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
    }
    return null;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  /* =========================================================================
     7. TEXT / JSON / WORD FILE IMPORT
     ========================================================================= */
  const handleImportTextFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();
    const reader = new FileReader();

    if (ext === 'json') {
      setImportFileType('json');
      reader.onload = (ev) => {
        setImportTextContent(ev.target?.result as string);
      };
      reader.readAsText(file);
    } else {
      setImportFileType(ext === 'docx' || ext === 'doc' ? 'word' : 'txt');
      reader.onload = (ev) => {
        setImportTextContent(ev.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleExecuteImport = async () => {
    if (!importTextContent.trim()) {
      alert('Vui lòng chọn hoặc dán nội dung tệp vào khung.');
      return;
    }

    try {
      const res = await fetch('/api/history/import-text', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          rawText: importTextContent,
          fileType: importFileType,
          defaultPeriod: 'GD01'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Nhập tệp thất bại.');

      showNotice(data.message || 'Đã nhập dữ liệu thành công!');
      setIsImportModalOpen(false);
      setImportTextContent('');
      fetchCmsData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* =========================================================================
     8. BACKUP & RESTORE
     ========================================================================= */
  const handleDownloadBackup = () => {
    window.open('/api/history/backup', '_blank');
  };

  const handleRestoreFromFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm('Cảnh báo: Việc khôi phục sẽ ghi đè dữ liệu hiện tại bằng nội dung của tệp sao lưu. Cô có muốn tiếp tục?')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        const res = await fetch('/api/history/restore', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(json)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Khôi phục dữ liệu thất bại.');

        showNotice('Khôi phục cơ sở dữ liệu thành công!');
        fetchCmsData();
      } catch (err: any) {
        alert('Lỗi khôi phục: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  // Guard: If not admin
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03]">
          Khu Vực Quản Trị Dành Riêng Cho Chủ Website
        </h2>
        <p className="text-sm text-stone-700 max-w-lg mx-auto leading-relaxed">
          Trang quản trị cho phép thêm, sửa, xóa sự kiện lịch sử, tải hình ảnh, video và quản lý toàn bộ kho tư liệu. Học sinh và khách xem được phân quyền học tập an toàn.
        </p>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 max-w-md mx-auto space-y-2">
          <div className="font-bold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Tài khoản chủ sở hữu đã thiết lập:</span>
          </div>
          <div className="font-mono bg-white py-1 px-3 rounded-lg border border-amber-300 font-semibold inline-block">
            pham.thanhh212@gmail.com (Cô giáo Phạm Thị Thanh)
          </div>
        </div>

        <div>
          <button
            onClick={onOpenLogin}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-800 to-[#3b1704] hover:from-amber-900 hover:to-black text-amber-100 font-bold text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Đăng nhập quyền Quản trị viên (Cô Thanh)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Toast notification */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 bg-[#451a03] text-amber-100 px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Header Banner - Dong Son Authenticity */}
      <div className="relative bg-[#fffdfa] rounded-3xl border-2 border-[#e8d7be] p-6 sm:p-8 shadow-xs overflow-hidden">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/20" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/20" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#eedec7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>CHỦ SỞ HỮU WEBSITE</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-600 font-medium">Cô giáo: Phạm Thị Thanh (Trường TH Tiền Phong)</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03] mt-1.5 flex items-center gap-2">
              <span>QUẢN TRỊ WEBSITE – DẤU ẤN NON SÔNG</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 max-w-2xl leading-relaxed">
              Toàn quyền quản trị trực tiếp: thêm, sửa, xóa sự kiện, nhân vật, di tích, tải ảnh từ máy tính/điện thoại, chèn video và xuất bản bài giảng mà không cần biết lập trình.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
            <button
              onClick={() => setIsAddImageModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-amber-100 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Upload className="w-3.5 h-3.5 text-amber-300" />
              <span>+ THÊM HÌNH ẢNH</span>
            </button>

            <button
              onClick={() => setIsAddVideoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Video className="w-3.5 h-3.5 text-amber-200" />
              <span>+ THÊM VIDEO</span>
            </button>

            <button
              onClick={() => {
                setEditingArticle({
                  id: 'art-' + Date.now(),
                  title: '',
                  category: 'Chuyên đề lịch sử',
                  periodCode: 'GD01',
                  coverImage: '',
                  summary: '',
                  contentHtml: '',
                  author: 'Cô giáo Phạm Thị Thanh',
                  authorEmail: 'pham.thanhh212@gmail.com',
                  source: 'Bảo tàng Lịch sử quốc gia',
                  status: 'published',
                  galleryImages: [],
                  videoUrl: '',
                  createdAt: new Date().toISOString().split('T')[0],
                  updatedAt: new Date().toISOString()
                });
                setIsNewArticleModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-300" />
              <span>+ VIẾT BÀI MỚI (WORD)</span>
            </button>

            <button
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-50 border border-amber-300 text-stone-700 rounded-xl text-xs font-bold shadow-2xs transition-colors"
              title="Nhập tệp TXT, JSON, Word"
            >
              <FileUp className="w-3.5 h-3.5 text-amber-800" />
              <span>Nhập tệp</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs for CMS Sections */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'events'
                ? 'bg-amber-900 text-amber-100 shadow-xs'
                : 'bg-amber-50/80 text-stone-700 hover:bg-amber-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Sự kiện lịch sử ({cmsData.events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('figures')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'figures'
                ? 'bg-amber-900 text-amber-100 shadow-xs'
                : 'bg-amber-50/80 text-stone-700 hover:bg-amber-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Nhân vật lịch sử ({cmsData.figures.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('relics')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'relics'
                ? 'bg-amber-900 text-amber-100 shadow-xs'
                : 'bg-amber-50/80 text-stone-700 hover:bg-amber-100'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Di tích lịch sử ({cmsData.relics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('periods')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'periods'
                ? 'bg-amber-900 text-amber-100 shadow-xs'
                : 'bg-amber-50/80 text-stone-700 hover:bg-amber-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Thời kì lịch sử ({cmsData.periods.length || 8})</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'articles'
                ? 'bg-amber-900 text-amber-100 shadow-xs'
                : 'bg-amber-50/80 text-stone-700 hover:bg-amber-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Bài viết & Tư liệu ({cmsData.articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('my-repository')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 border border-amber-300 ${
              activeTab === 'my-repository'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-amber-100/70 text-amber-950 hover:bg-amber-200'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>KHO TƯ LIỆU CỦA TÔI ({cmsData.media.length} tệp)</span>
          </button>

          <button
            onClick={() => setActiveTab('backup-revisions')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'backup-revisions'
                ? 'bg-amber-900 text-amber-100 shadow-xs'
                : 'bg-amber-50/80 text-stone-700 hover:bg-amber-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sao lưu & Lịch sử</span>
          </button>
        </div>
      </div>

      {/* Search and Period Filter bar for lists */}
      {['events', 'figures', 'relics', 'articles'].includes(activeTab) && (
        <div className="bg-[#fffdfa] p-4 rounded-2xl border border-[#eedec7] shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo tên sự kiện, nhân vật, địa danh, tóm tắt..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={selectedPeriodFilter}
              onChange={(e) => setSelectedPeriodFilter(e.target.value)}
              className="py-2 px-3 rounded-xl border border-stone-300 bg-white font-medium text-xs"
            >
              <option value="ALL">Tất cả giai đoạn (GD01 - GD08)</option>
              <option value="GD01">GD01: Tiền sử & Buổi đầu dựng nước</option>
              <option value="GD02">GD02: Bắc thuộc & Đấu tranh tự chủ</option>
              <option value="GD03">GD03: Các triều đại quân chủ độc lập</option>
              <option value="GD04">GD04: Chống thực dân Pháp & Giành độc lập</option>
              <option value="GD05">GD05: Kháng chiến chống Pháp (1945-1954)</option>
              <option value="GD06">GD06: Kháng chiến chống Mỹ (1954-1975)</option>
              <option value="GD07">GD07: Xây dựng & Bảo vệ Tổ quốc (1975-1986)</option>
              <option value="GD08">GD08: Thời kỳ Đổi mới & Hội nhập</option>
            </select>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 1: EVENTS MANAGEMENT
          ========================================================================= */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-[#451a03]">
              Danh sách Sự kiện Lịch sử ({cmsData.events.length} sự kiện)
            </h3>
            <button
              onClick={() => {
                setEditingEvent({
                  Mã: 'SK' + String(cmsData.events.length + 1).padStart(3, '0'),
                  'Sự kiện': '',
                  'Mốc thời gian': '',
                  'Mã giai đoạn': 'GD01',
                  'Dữ kiện tóm tắt': '',
                  'Ý nghĩa': '',
                  'URL nguồn': 'https://baotanglichsu.vn/vi',
                  'Trạng thái': 'Đã xuất bản'
                });
                setIsNewEventModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Thêm sự kiện mới</span>
            </button>
          </div>

          <div className="bg-[#fffdfa] rounded-2xl border border-[#eedec7] overflow-hidden shadow-xs divide-y divide-[#f0e4d0] text-xs">
            {cmsData.events
              .filter((ev) => {
                const matchPeriod = selectedPeriodFilter === 'ALL' || ev['Mã giai đoạn'] === selectedPeriodFilter;
                const q = searchTerm.toLowerCase();
                const matchSearch =
                  !q ||
                  ev['Sự kiện'].toLowerCase().includes(q) ||
                  ev['Dữ kiện tóm tắt'].toLowerCase().includes(q) ||
                  ev['Mốc thời gian'].toLowerCase().includes(q);
                return matchPeriod && matchSearch;
              })
              .map((ev) => (
                <div
                  key={ev.Mã}
                  className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {ev.Mã}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {ev['Mốc thời gian']}
                      </span>
                      <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                        {ev['Mã giai đoạn']}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          ev['Trạng thái'] === 'Đã xuất bản'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {ev['Trạng thái'] === 'Đã xuất bản' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Đã xuất bản
                          </>
                        ) : (
                          'Tạm ẩn'
                        )}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#451a03]">
                      {ev['Sự kiện']}
                    </h4>
                    <p className="text-stone-700 text-xs leading-relaxed line-clamp-2">
                      {ev['Dữ kiện tóm tắt']}
                    </p>
                    <div className="text-[11px] text-amber-900/80 italic">
                      <strong>Ý nghĩa:</strong> {ev['Ý nghĩa']}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => handleToggleEventStatus(ev)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        ev['Trạng thái'] === 'Đã xuất bản'
                          ? 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300'
                      }`}
                      title={ev['Trạng thái'] === 'Đã xuất bản' ? 'Ẩn sự kiện này' : 'Xuất bản sự kiện'}
                    >
                      {ev['Trạng thái'] === 'Đã xuất bản' ? 'Ẩn bài' : 'Đăng bài'}
                    </button>

                    <button
                      onClick={() => {
                        setEditingEvent({ ...ev });
                        setIsNewEventModal(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Chỉnh sửa</span>
                    </button>

                    <button
                      onClick={() => handleDeleteEvent(ev.Mã, ev['Sự kiện'])}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Xóa sự kiện"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: FIGURES MANAGEMENT
          ========================================================================= */}
      {activeTab === 'figures' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-[#451a03]">
              Danh sách Nhân vật Lịch sử ({cmsData.figures.length} nhân vật)
            </h3>
            <button
              onClick={() => {
                setEditingFigure({
                  Mã: 'NV' + String(cmsData.figures.length + 1).padStart(2, '0'),
                  'Nhân vật': '',
                  'Giai đoạn': 'GD01',
                  'Đóng góp/sự kiện': '',
                  'Địa danh liên quan': '',
                  'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
                  'URL nguồn': 'https://baotanglichsu.vn/vi',
                  'Trạng thái': 'Đã xuất bản'
                });
                setIsNewFigureModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Thêm nhân vật mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cmsData.figures
              .filter((fig) => {
                const matchPeriod = selectedPeriodFilter === 'ALL' || fig['Giai đoạn'] === selectedPeriodFilter;
                const q = searchTerm.toLowerCase();
                const matchSearch =
                  !q ||
                  fig['Nhân vật'].toLowerCase().includes(q) ||
                  fig['Đóng góp/sự kiện'].toLowerCase().includes(q) ||
                  fig['Địa danh liên quan'].toLowerCase().includes(q);
                return matchPeriod && matchSearch;
              })
              .map((fig) => (
                <div
                  key={fig.Mã}
                  className="bg-[#fffdfa] p-4 rounded-2xl border border-[#eedec7] shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {fig.Mã} · {fig['Giai đoạn']}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-500">
                        {fig['Ghi chú loại hình']}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-[#451a03]">
                      {fig['Nhân vật']}
                    </h4>
                    <p className="text-stone-700 text-xs leading-relaxed">
                      {fig['Đóng góp/sự kiện']}
                    </p>
                    <div className="text-[11px] text-stone-600">
                      <strong>Địa danh:</strong> {fig['Địa danh liên quan']}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#f0e4d0] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-stone-500 truncate max-w-[200px]">
                      Nguồn: {fig['URL nguồn']}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingFigure({ ...fig });
                          setIsNewFigureModal(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={() => handleDeleteFigure(fig.Mã, fig['Nhân vật'])}
                        className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: RELICS MANAGEMENT
          ========================================================================= */}
      {activeTab === 'relics' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-[#451a03]">
              Danh sách Di tích Lịch sử ({cmsData.relics.length} di tích)
            </h3>
            <button
              onClick={() => {
                setEditingRelic({
                  Mã: 'DT' + String(cmsData.relics.length + 1).padStart(2, '0'),
                  'Tên di tích': '',
                  'Địa điểm': '',
                  'Giai đoạn': 'GD01',
                  'Giá trị liên quan': '',
                  'URL nguồn': 'https://dsvh.gov.vn',
                  'Trạng thái': 'Đã xuất bản'
                });
                setIsNewRelicModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Thêm di tích mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cmsData.relics
              .filter((rel) => {
                const matchPeriod = selectedPeriodFilter === 'ALL' || rel['Giai đoạn'] === selectedPeriodFilter;
                const q = searchTerm.toLowerCase();
                const matchSearch =
                  !q ||
                  rel['Tên di tích'].toLowerCase().includes(q) ||
                  rel['Địa điểm'].toLowerCase().includes(q) ||
                  rel['Giá trị liên quan'].toLowerCase().includes(q);
                return matchPeriod && matchSearch;
              })
              .map((rel) => (
                <div
                  key={rel.Mã}
                  className="bg-[#fffdfa] p-4 rounded-2xl border border-[#eedec7] shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {rel.Mã} · {rel['Giai đoạn']}
                      </span>
                      <span className="font-bold text-amber-900 text-xs flex items-center gap-1">
                        📍 {rel['Địa điểm']}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-[#451a03]">
                      {rel['Tên di tích']}
                    </h4>
                    <p className="text-stone-700 text-xs leading-relaxed">
                      {rel['Giá trị liên quan']}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#f0e4d0] flex items-center justify-between text-xs">
                    <a
                      href={rel['URL nguồn']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-800 underline truncate max-w-[200px]"
                    >
                      {rel['URL nguồn']}
                    </a>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingRelic({ ...rel });
                          setIsNewRelicModal(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={() => handleDeleteRelic(rel.Mã, rel['Tên di tích'])}
                        className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: PERIODS MANAGEMENT (GD01 - GD08)
          ========================================================================= */}
      {activeTab === 'periods' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-[#451a03]">
                8 Thời Kì Lịch Sử Việt Nam (GD01 – GD08)
              </h3>
              <p className="text-xs text-stone-600">
                Cô giáo có thể chỉnh sửa tên giai đoạn, khung thời gian, nội dung trọng tâm và nhân vật tiêu biểu trực tiếp.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {cmsData.periods.map((p) => (
              <div
                key={p.Mã}
                className="bg-[#fffdfa] p-5 rounded-2xl border-2 border-[#eedec7] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-amber-800 text-amber-100">
                      {p.Mã}
                    </span>
                    <span className="font-mono font-bold text-amber-900 text-xs">
                      Khung thời gian: {p['Thời gian']}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#451a03]">
                    {p['Tên giai đoạn']}
                  </h4>
                  <div className="text-xs text-stone-700">
                    <strong>Nội dung trọng tâm:</strong> {p['Nội dung tiêu biểu']}
                  </div>
                  <div className="text-xs text-stone-600 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span>Nhân vật: <strong>{p['Nhân vật']}</strong></span>
                    <span>Di tích / Hiện vật: <strong>{p['Di tích/hiện vật']}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => setEditingPeriod({ ...p })}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Chỉnh sửa thời kì này</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: ARTICLES MANAGEMENT (Word-like Visual Editor)
          ========================================================================= */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-[#451a03]">
                Kho Bài Viết & Tư Liệu Bổ Sung ({cmsData.articles.length} bài)
              </h3>
              <p className="text-xs text-stone-600">
                Soạn thảo bài viết trực quan giống Word với in đậm, căn lề, chèn ảnh từ kho, liên kết và video.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingArticle({
                  id: 'art-' + Date.now(),
                  title: '',
                  category: 'Chuyên đề lịch sử',
                  periodCode: 'GD01',
                  coverImage: '',
                  summary: '',
                  contentHtml: '',
                  author: 'Cô giáo Phạm Thị Thanh',
                  authorEmail: 'pham.thanhh212@gmail.com',
                  source: 'Bảo tàng Lịch sử quốc gia',
                  status: 'published',
                  galleryImages: [],
                  videoUrl: '',
                  createdAt: new Date().toISOString().split('T')[0],
                  updatedAt: new Date().toISOString()
                });
                setIsNewArticleModal(true);
              }}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Viết bài mới (Word)</span>
            </button>
          </div>

          {cmsData.articles.length === 0 ? (
            <div className="bg-[#fffdfa] p-10 rounded-2xl border-2 border-dashed border-[#eedec7] text-center space-y-3">
              <FileText className="w-10 h-10 text-amber-700/40 mx-auto" />
              <div className="font-bold text-stone-700 text-sm">Chưa có bài viết bổ sung nào</div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Cô giáo có thể viết bài mới bằng trình soạn thảo trực quan hoặc tải tệp TXT, JSON, Word có sẵn lên.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setEditingArticle({
                      id: 'art-' + Date.now(),
                      title: 'Ý nghĩa Chiến thắng Bạch Đằng năm 938 trong lịch sử dân tộc',
                      category: 'Chuyên đề lịch sử',
                      periodCode: 'GD02',
                      coverImage: '',
                      summary: 'Chiến thắng oanh liệt của Ngô Quyền chấm dứt hơn 1000 năm Bắc thuộc, mở ra kỷ nguyên độc lập lâu dài.',
                      contentHtml: '<p>Chiến thắng Bạch Đằng năm 938 là mốc son chói lọi trong lịch sử dựng nước và giữ nước của dân tộc Việt Nam...</p>',
                      author: 'Cô giáo Phạm Thị Thanh',
                      authorEmail: 'pham.thanhh212@gmail.com',
                      source: 'Đại Việt Sử ký Toàn thư',
                      status: 'published',
                      galleryImages: [],
                      videoUrl: '',
                      createdAt: new Date().toISOString().split('T')[0],
                      updatedAt: new Date().toISOString()
                    });
                    setIsNewArticleModal(true);
                  }}
                  className="px-4 py-2 bg-amber-800 text-white rounded-xl text-xs font-bold"
                >
                  Tạo bài mẫu ngay
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cmsData.articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-[#fffdfa] p-5 rounded-2xl border border-[#eedec7] shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {art.periodCode} · {art.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          art.status === 'published'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {art.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-[#451a03]">
                      {art.title}
                    </h4>
                    <p className="text-stone-600 text-xs line-clamp-2">
                      {art.summary}
                    </p>
                    <div className="text-[11px] text-stone-500">
                      Tác giả: {art.author} · Cập nhật: {art.updatedAt?.split('T')[0] || art.createdAt}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#f0e4d0] flex items-center justify-between">
                    <button
                      onClick={() => setPreviewArticle(art)}
                      className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem trước</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingArticle({ ...art });
                          setIsNewArticleModal(false);
                        }}
                        className="px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id, art.title)}
                        className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 6: KHO TƯ LIỆU CỦA TÔI (MY REPOSITORY - Images, Videos, Artifacts)
          ========================================================================= */}
      {activeTab === 'my-repository' && (
        <div className="space-y-6">
          <div className="bg-[#fffdfa] p-5 rounded-2xl border border-[#eedec7] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-amber-800" />
                <h3 className="font-display text-lg font-bold text-[#451a03]">
                  Kho Tư Liệu Đa Phương Tiện Của Cô Thanh
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-1 max-w-xl">
                Quản lý hình ảnh và video lịch sử đã tải lên. Một tư liệu có thể tái sử dụng ở nhiều bài viết, sự kiện khác nhau mà không cần tải lên nhiều lần.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddImageModalOpen(true)}
                className="px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-amber-100 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-amber-300" />
                <span>+ THÊM HÌNH ẢNH</span>
              </button>
              <button
                onClick={() => setIsAddVideoModalOpen(true)}
                className="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-amber-200" />
                <span>+ THÊM VIDEO</span>
              </button>
            </div>
          </div>

          {/* Repo Filters */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setRepoTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                repoTypeFilter === 'all'
                  ? 'bg-amber-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Tất cả tư liệu ({cmsData.media.length})
            </button>
            <button
              onClick={() => setRepoTypeFilter('image')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                repoTypeFilter === 'image'
                  ? 'bg-amber-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Hình ảnh ({cmsData.media.filter((m) => m.type === 'image').length})
            </button>
            <button
              onClick={() => setRepoTypeFilter('video')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                repoTypeFilter === 'video'
                  ? 'bg-amber-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Video & YouTube ({cmsData.media.filter((m) => m.type !== 'image').length})
            </button>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {cmsData.media
              .filter((m) => {
                if (repoTypeFilter === 'image' && m.type !== 'image') return false;
                if (repoTypeFilter === 'video' && m.type === 'image') return false;
                return true;
              })
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fffdfa] rounded-2xl border border-[#eedec7] overflow-hidden shadow-xs hover:border-amber-600 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 bg-stone-100 overflow-hidden flex items-center justify-center">
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : item.type === 'video_youtube' ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-stone-900">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                        ) : null}
                        <div className="absolute w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-amber-200 p-2">
                        <Film className="w-8 h-8 text-amber-400 mb-1" />
                        <span className="text-[10px] font-mono">Video MP4/WebM</span>
                      </div>
                    )}

                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[9px] uppercase backdrop-blur-xs">
                        {item.type === 'image' ? 'Ảnh' : item.type === 'video_youtube' ? 'YouTube' : 'Video'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-1 text-xs">
                    <h5 className="font-bold text-[#451a03] line-clamp-1" title={item.title}>
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {item.caption || item.source}
                    </p>
                    <div className="text-[10px] text-stone-400 font-mono">
                      {item.periodCode} · {item.uploadedAt?.split('T')[0]}
                    </div>
                  </div>

                  <div className="p-2.5 pt-0 flex items-center justify-between border-t border-stone-100 text-xs">
                    <button
                      onClick={() => {
                        if (item.type === 'video_youtube' || item.type === 'video_file') {
                          setPreviewVideoUrl(item.url);
                        } else {
                          window.open(item.url, '_blank');
                        }
                      }}
                      className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem</span>
                    </button>

                    <button
                      onClick={async () => {
                        if (!window.confirm('Cô có chắc muốn xóa tư liệu này khỏi kho?')) return;
                        try {
                          const res = await fetch(`/api/history/media/${item.id}`, {
                            method: 'DELETE',
                            headers: getAuthHeaders()
                          });
                          if (res.ok) {
                            showNotice('Đã xóa tư liệu khỏi kho.');
                            fetchCmsData();
                          }
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                      className="p-1 rounded text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Xóa tư liệu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: BACKUP & REVISIONS
          ========================================================================= */}
      {activeTab === 'backup-revisions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backup Export */}
            <div className="bg-[#fffdfa] p-6 rounded-3xl border border-[#eedec7] shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <Download className="w-6 h-6 text-emerald-700" />
                <h4 className="font-display text-lg font-bold text-[#451a03]">
                  Xuất Dữ Liệu Dự Phòng (JSON)
                </h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tải toàn bộ cơ sở dữ liệu (sự kiện, nhân vật, di tích, bài viết, kho tư liệu) về máy tính của cô giáo để lưu trữ an toàn lâu dài.
              </p>
              <button
                onClick={handleDownloadBackup}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-emerald-200" />
                <span>Tải tệp sao lưu JSON về máy</span>
              </button>
            </div>

            {/* Restore */}
            <div className="bg-[#fffdfa] p-6 rounded-3xl border border-[#eedec7] shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-6 h-6 text-amber-700" />
                <h4 className="font-display text-lg font-bold text-[#451a03]">
                  Khôi Phục Dữ Liệu Từ Bản Sao Lưu
                </h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Khôi phục lại toàn bộ dữ liệu lịch sử từ tệp JSON sao lưu đã lưu trước đó nếu có sự cố.
              </p>
              <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors">
                <RotateCcw className="w-4 h-4 text-amber-200" />
                <span>Chọn tệp sao lưu JSON để khôi phục</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleRestoreFromFile}
                />
              </label>
            </div>
          </div>

          {/* Revisions History Log */}
          <div className="bg-[#fffdfa] p-6 rounded-3xl border border-[#eedec7] shadow-xs space-y-4">
            <h4 className="font-display text-base font-bold text-[#451a03] flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-800" />
              <span>Nhật Ký Các Phiên Bản & Thao Tác Chỉnh Sửa</span>
            </h4>
            <div className="divide-y divide-[#f0e4d0] text-xs">
              {cmsData.revisions.length === 0 ? (
                <div className="py-4 text-stone-500 text-center">Chưa có bản ghi nhật ký mới.</div>
              ) : (
                cmsData.revisions.map((rev) => (
                  <div key={rev.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#451a03]">{rev.description}</div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {rev.timestamp} · Thực hiện bởi: {rev.authorEmail}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                      {rev.itemType}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD/EDIT EVENT
          ========================================================================= */}
      {(isNewEventModal || editingEvent) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <h3 className="font-display text-lg font-bold text-[#451a03]">
                {isNewEventModal ? 'Thêm Sự Kiện Lịch Sử Mới' : `Chỉnh Sửa Sự Kiện: ${editingEvent?.['Sự kiện']}`}
              </h3>
              <button
                onClick={() => {
                  setIsNewEventModal(false);
                  setEditingEvent(null);
                }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Mã sự kiện (Ví dụ: SK033)</label>
                  <input
                    type="text"
                    required
                    value={editingEvent?.Mã || ''}
                    onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, Mã: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Mốc thời gian (Ví dụ: Năm 938)</label>
                  <input
                    type="text"
                    required
                    value={editingEvent?.['Mốc thời gian'] || ''}
                    onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, 'Mốc thời gian': e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Mã giai đoạn *</label>
                  <select
                    value={editingEvent?.['Mã giai đoạn'] || 'GD01'}
                    onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, 'Mã giai đoạn': e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-semibold"
                  >
                    <option value="GD01">GD01: Tiền sử & Dựng nước</option>
                    <option value="GD02">GD02: Bắc thuộc & Tự chủ</option>
                    <option value="GD03">GD03: Các triều đại quân chủ</option>
                    <option value="GD04">GD04: Chống thực dân Pháp</option>
                    <option value="GD05">GD05: Kháng chiến chống Pháp</option>
                    <option value="GD06">GD06: Kháng chiến chống Mỹ</option>
                    <option value="GD07">GD07: Bảo vệ Tổ quốc 1975-1986</option>
                    <option value="GD08">GD08: Đổi mới & Hội nhập</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tên sự kiện lịch sử *</label>
                <input
                  type="text"
                  required
                  value={editingEvent?.['Sự kiện'] || ''}
                  onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, 'Sự kiện': e.target.value }))}
                  placeholder="Ví dụ: Chiến thắng Bạch Đằng năm 938"
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-sm bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Dữ kiện tóm tắt *</label>
                <textarea
                  rows={3}
                  required
                  value={editingEvent?.['Dữ kiện tóm tắt'] || ''}
                  onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, 'Dữ kiện tóm tắt': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Ý nghĩa lịch sử đối với dân tộc *</label>
                <textarea
                  rows={2}
                  value={editingEvent?.['Ý nghĩa'] || ''}
                  onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, 'Ý nghĩa': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Đường dẫn nguồn tham khảo chính thống</label>
                  <input
                    type="url"
                    value={editingEvent?.['URL nguồn'] || ''}
                    onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, 'URL nguồn': e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Trạng thái xuất bản</label>
                  <select
                    value={editingEvent?.['Trạng thái'] || 'Đã xuất bản'}
                    onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, 'Trạng thái': e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-semibold"
                  >
                    <option value="Đã xuất bản">Đã xuất bản (Hiện trên website)</option>
                    <option value="Tạm ẩn">Tạm ẩn (Chờ cô duyệt)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eedec7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewEventModal(false);
                    setEditingEvent(null);
                  }}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700 hover:bg-stone-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu sự kiện</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD/EDIT FIGURE
          ========================================================================= */}
      {(isNewFigureModal || editingFigure) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <h3 className="font-display text-lg font-bold text-[#451a03]">
                {isNewFigureModal ? 'Thêm Nhân Vật Lịch Sử Mới' : `Chỉnh Sửa Nhân Vật: ${editingFigure?.['Nhân vật']}`}
              </h3>
              <button
                onClick={() => {
                  setIsNewFigureModal(false);
                  setEditingFigure(null);
                }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFigure} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Mã nhân vật (Ví dụ: NV29)</label>
                  <input
                    type="text"
                    required
                    value={editingFigure?.Mã || ''}
                    onChange={(e) => setEditingFigure((prev: any) => ({ ...prev, Mã: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Giai đoạn lịch sử</label>
                  <select
                    value={editingFigure?.['Giai đoạn'] || 'GD01'}
                    onChange={(e) => setEditingFigure((prev: any) => ({ ...prev, 'Giai đoạn': e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-semibold"
                  >
                    <option value="GD01">GD01: Tiền sử & Dựng nước</option>
                    <option value="GD02">GD02: Bắc thuộc & Tự chủ</option>
                    <option value="GD03">GD03: Các triều đại quân chủ</option>
                    <option value="GD04">GD04: Chống thực dân Pháp</option>
                    <option value="GD05">GD05: Kháng chiến chống Pháp</option>
                    <option value="GD06">GD06: Kháng chiến chống Mỹ</option>
                    <option value="GD07">GD07: Bảo vệ Tổ quốc 1975-1986</option>
                    <option value="GD08">GD08: Đổi mới & Hội nhập</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tên nhân vật lịch sử *</label>
                <input
                  type="text"
                  required
                  value={editingFigure?.['Nhân vật'] || ''}
                  onChange={(e) => setEditingFigure((prev: any) => ({ ...prev, 'Nhân vật': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-sm bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Đóng góp & Chiến công tiêu biểu *</label>
                <textarea
                  rows={3}
                  required
                  value={editingFigure?.['Đóng góp/sự kiện'] || ''}
                  onChange={(e) => setEditingFigure((prev: any) => ({ ...prev, 'Đóng góp/sự kiện': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Địa danh / Quê hương liên quan</label>
                  <input
                    type="text"
                    value={editingFigure?.['Địa danh liên quan'] || ''}
                    onChange={(e) => setEditingFigure((prev: any) => ({ ...prev, 'Địa danh liên quan': e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Phân loại nhân vật</label>
                  <select
                    value={editingFigure?.['Ghi chú loại hình'] || 'Nhân vật lịch sử đã xác minh'}
                    onChange={(e) => setEditingFigure((prev: any) => ({ ...prev, 'Ghi chú loại hình': e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="Nhân vật lịch sử đã xác minh">Nhân vật lịch sử đã xác minh</option>
                    <option value="Nhân vật truyền thống / Dân gian">Nhân vật truyền thống / Dân gian</option>
                    <option value="Nhân vật huyền sử thời dựng nước">Nhân vật huyền sử thời dựng nước</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">URL nguồn tham khảo</label>
                <input
                  type="url"
                  value={editingFigure?.['URL nguồn'] || ''}
                  onChange={(e) => setEditingFigure((prev: any) => ({ ...prev, 'URL nguồn': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-[#eedec7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewFigureModal(false);
                    setEditingFigure(null);
                  }}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu nhân vật</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD/EDIT RELIC
          ========================================================================= */}
      {(isNewRelicModal || editingRelic) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <h3 className="font-display text-lg font-bold text-[#451a03]">
                {isNewRelicModal ? 'Thêm Di Tích Lịch Sử Mới' : `Chỉnh Sửa Di Tích: ${editingRelic?.['Tên di tích']}`}
              </h3>
              <button
                onClick={() => {
                  setIsNewRelicModal(false);
                  setEditingRelic(null);
                }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRelic} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Mã di tích (Ví dụ: DT11)</label>
                  <input
                    type="text"
                    required
                    value={editingRelic?.Mã || ''}
                    onChange={(e) => setEditingRelic((prev: any) => ({ ...prev, Mã: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Giai đoạn</label>
                  <select
                    value={editingRelic?.['Giai đoạn'] || 'GD01'}
                    onChange={(e) => setEditingRelic((prev: any) => ({ ...prev, 'Giai đoạn': e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-semibold"
                  >
                    <option value="GD01">GD01: Tiền sử & Dựng nước</option>
                    <option value="GD02">GD02: Bắc thuộc & Tự chủ</option>
                    <option value="GD03">GD03: Các triều đại quân chủ</option>
                    <option value="GD04">GD04: Chống thực dân Pháp</option>
                    <option value="GD05">GD05: Kháng chiến chống Pháp</option>
                    <option value="GD06">GD06: Kháng chiến chống Mỹ</option>
                    <option value="GD07">GD07: Bảo vệ Tổ quốc 1975-1986</option>
                    <option value="GD08">GD08: Đổi mới & Hội nhập</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tên di tích lịch sử *</label>
                <input
                  type="text"
                  required
                  value={editingRelic?.['Tên di tích'] || ''}
                  onChange={(e) => setEditingRelic((prev: any) => ({ ...prev, 'Tên di tích': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-sm bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Địa điểm (Tỉnh/Thành phố) *</label>
                <input
                  type="text"
                  required
                  value={editingRelic?.['Địa điểm'] || ''}
                  onChange={(e) => setEditingRelic((prev: any) => ({ ...prev, 'Địa điểm': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Giá trị lịch sử & kiến trúc liên quan *</label>
                <textarea
                  rows={3}
                  required
                  value={editingRelic?.['Giá trị liên quan'] || ''}
                  onChange={(e) => setEditingRelic((prev: any) => ({ ...prev, 'Giá trị liên quan': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">URL trang nguồn (Cục Di sản văn hóa / Bảo tàng)</label>
                <input
                  type="url"
                  value={editingRelic?.['URL nguồn'] || ''}
                  onChange={(e) => setEditingRelic((prev: any) => ({ ...prev, 'URL nguồn': e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-[#eedec7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewRelicModal(false);
                    setEditingRelic(null);
                  }}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu di tích</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EDIT HISTORICAL PERIOD (GD01 - GD08)
          ========================================================================= */}
      {editingPeriod && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <h3 className="font-display text-lg font-bold text-[#451a03]">
                Chỉnh Sửa Thời Kì: {editingPeriod.Mã} – {editingPeriod['Tên giai đoạn']}
              </h3>
              <button
                onClick={() => setEditingPeriod(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePeriod} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Mã thời kì</label>
                  <input
                    type="text"
                    disabled
                    value={editingPeriod.Mã}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-100 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Khung thời gian *</label>
                  <input
                    type="text"
                    required
                    value={editingPeriod['Thời gian']}
                    onChange={(e) => setEditingPeriod({ ...editingPeriod, 'Thời gian': e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tên giai đoạn lịch sử *</label>
                <input
                  type="text"
                  required
                  value={editingPeriod['Tên giai đoạn']}
                  onChange={(e) => setEditingPeriod({ ...editingPeriod, 'Tên giai đoạn': e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-sm bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Nội dung tiêu biểu & Trọng tâm *</label>
                <textarea
                  rows={3}
                  required
                  value={editingPeriod['Nội dung tiêu biểu']}
                  onChange={(e) => setEditingPeriod({ ...editingPeriod, 'Nội dung tiêu biểu': e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Nhân vật tiêu biểu</label>
                <input
                  type="text"
                  value={editingPeriod['Nhân vật']}
                  onChange={(e) => setEditingPeriod({ ...editingPeriod, 'Nhân vật': e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Di tích / Hiện vật tiêu biểu</label>
                <input
                  type="text"
                  value={editingPeriod['Di tích/hiện vật']}
                  onChange={(e) => setEditingPeriod({ ...editingPeriod, 'Di tích/hiện vật': e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Nguồn tham khảo</label>
                <input
                  type="url"
                  value={editingPeriod['Nguồn tham khảo']}
                  onChange={(e) => setEditingPeriod({ ...editingPeriod, 'Nguồn tham khảo': e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-[#eedec7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPeriod(null)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Cập nhật thời kì</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: WORD-LIKE VISUAL ARTICLE EDITOR
          ========================================================================= */}
      {(isNewArticleModal || editingArticle) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#fffdfa] rounded-3xl max-w-4xl w-full max-h-[94vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border-2 border-amber-300 space-y-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <div>
                <h3 className="font-display text-xl font-bold text-[#451a03] flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-emerald-700" />
                  <span>Trình Soạn Thảo Bài Viết Lịch Sử (Giao diện giống Word)</span>
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Đầy đủ công cụ in đậm, căn lề, thêm ảnh từ kho, trích dẫn và liên kết.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewArticleModal(false);
                  setEditingArticle(null);
                }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 block mb-1">Tiêu đề bài viết *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle?.title || ''}
                    onChange={(e) => setEditingArticle((prev: any) => ({ ...prev, title: e.target.value }))}
                    placeholder="Nhập tiêu đề bài viết lịch sử..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Giai đoạn lịch sử</label>
                  <select
                    value={editingArticle?.periodCode || 'GD01'}
                    onChange={(e) => setEditingArticle((prev: any) => ({ ...prev, periodCode: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-semibold"
                  >
                    <option value="GD01">GD01: Tiền sử & Dựng nước</option>
                    <option value="GD02">GD02: Bắc thuộc & Tự chủ</option>
                    <option value="GD03">GD03: Các triều đại quân chủ</option>
                    <option value="GD04">GD04: Chống thực dân Pháp</option>
                    <option value="GD05">GD05: Kháng chiến chống Pháp</option>
                    <option value="GD06">GD06: Kháng chiến chống Mỹ</option>
                    <option value="GD07">GD07: Bảo vệ Tổ quốc 1975-1986</option>
                    <option value="GD08">GD08: Đổi mới & Hội nhập</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tóm tắt ngắn (1-2 câu để hiển thị danh mục)</label>
                <input
                  type="text"
                  value={editingArticle?.summary || ''}
                  onChange={(e) => setEditingArticle((prev: any) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Khái quát ngắn gọn nội dung bài viết..."
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              {/* WYSIWYG Visual Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700">Nội dung bài viết *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget('article_editor');
                      setIsMediaPickerOpen(true);
                    }}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>+ Chèn ảnh từ Kho tư liệu</span>
                  </button>
                </div>
                <VisualEditor
                  value={editingArticle?.contentHtml || ''}
                  onChange={(html) => setEditingArticle((prev: any) => ({ ...prev, contentHtml: html }))}
                  placeholder="Bắt đầu viết nội dung bài giảng hoặc tư liệu lịch sử tại đây..."
                  onInsertImageClick={() => {
                    setMediaPickerTarget('article_editor');
                    setIsMediaPickerOpen(true);
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Nguồn tham khảo / Trích dẫn</label>
                  <input
                    type="text"
                    value={editingArticle?.source || ''}
                    onChange={(e) => setEditingArticle((prev: any) => ({ ...prev, source: e.target.value }))}
                    placeholder="Bảo tàng Lịch sử quốc gia, SGK Lớp 5..."
                    className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Video minh họa (Nếu có - MP4 hoặc link YouTube)</label>
                  <input
                    type="text"
                    value={editingArticle?.videoUrl || ''}
                    onChange={(e) => setEditingArticle((prev: any) => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Controls: Chỉnh sửa - Lưu - Xem trước - Đăng bài - Ẩn bài */}
            <div className="pt-3 border-t border-[#eedec7] flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  if (editingArticle) setPreviewArticle(editingArticle);
                }}
                className="px-4 py-2 border border-stone-300 hover:bg-stone-50 rounded-xl font-bold text-stone-700 flex items-center gap-1.5 text-xs transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem trước bài viết</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveArticle('draft')}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl font-bold text-stone-700 text-xs transition-colors"
                >
                  Lưu bản nháp
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveArticle('hidden')}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl font-bold text-amber-900 text-xs transition-colors"
                >
                  Ẩn bài
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveArticle('published')}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Đăng bài lên website</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ARTICLE PREVIEW
          ========================================================================= */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                XEM TRƯỚC BÀI VIẾT · {previewArticle.periodCode}
              </span>
              <button
                onClick={() => setPreviewArticle(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-extrabold text-[#451a03]">
                {previewArticle.title}
              </h2>
              <div className="text-xs text-stone-500 flex items-center gap-4">
                <span>Tác giả: <strong>{previewArticle.author}</strong></span>
                <span>Nguồn: {previewArticle.source}</span>
                <span>Ngày tạo: {previewArticle.createdAt}</span>
              </div>
              {previewArticle.summary && (
                <div className="p-3 bg-amber-50 rounded-xl border-l-4 border-amber-600 text-xs text-amber-950 font-medium italic">
                  {previewArticle.summary}
                </div>
              )}

              <div
                className="prose prose-sm max-w-none text-stone-800 leading-relaxed font-sans pt-2 border-t border-stone-200"
                dangerouslySetInnerHTML={{ __html: previewArticle.contentHtml }}
              />

              {previewArticle.videoUrl && (
                <div className="pt-4 border-t border-stone-200 space-y-2">
                  <div className="font-bold text-xs text-stone-700">Video tư liệu liên quan:</div>
                  {previewArticle.videoUrl.includes('youtube.com') || previewArticle.videoUrl.includes('youtu.be') ? (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                      <iframe
                        src={getYouTubeEmbedUrl(previewArticle.videoUrl)}
                        title={previewArticle.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video
                      src={previewArticle.videoUrl}
                      controls
                      className="w-full rounded-2xl max-h-96 bg-black"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold"
              >
                Đóng xem trước
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: + THÊM HÌNH ẢNH (Direct Upload from PC / Phone)
          ========================================================================= */}
      {isAddImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-800" />
                <h3 className="font-display text-lg font-bold text-[#451a03]">
                  + THÊM HÌNH ẢNH LỊCH SỬ
                </h3>
              </div>
              <button
                onClick={() => setIsAddImageModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitImageUpload} className="space-y-4 text-xs">
              {/* File picker */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Chọn ảnh từ máy tính hoặc điện thoại (JPG, PNG, WebP) *
                </label>
                <div className="p-4 border-2 border-dashed border-[#d6be9e] rounded-2xl bg-amber-50/50 hover:bg-amber-50 text-center cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 text-amber-700/60 mx-auto mb-1.5" />
                  <div className="font-bold text-stone-700">
                    Nhấp để chọn một hoặc nhiều ảnh cùng lúc
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Hỗ trợ tệp ảnh độ nét cao JPG, PNG, WebP (Lưu trữ thực tế)
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageFileChange}
                    className="mt-2 text-xs"
                  />
                </div>
              </div>

              {/* Previews */}
              {imageUploadForm.previewUrls.length > 0 && (
                <div>
                  <label className="font-bold text-stone-700 block mb-1.5">
                    Ảnh đã chọn ({imageUploadForm.previewUrls.length} ảnh):
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto p-2 bg-stone-100 rounded-xl">
                    {imageUploadForm.previewUrls.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-stone-300">
                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center truncate px-1">
                          Ảnh {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tiêu đề hình ảnh *</label>
                <input
                  type="text"
                  required
                  value={imageUploadForm.title}
                  onChange={(e) => setImageUploadForm({ ...imageUploadForm, title: e.target.value })}
                  placeholder="Ví dụ: Trống đồng Ngọc Lũ - Bảo vật quốc gia"
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Chú thích ảnh chi tiết</label>
                <textarea
                  rows={2}
                  value={imageUploadForm.caption}
                  onChange={(e) => setImageUploadForm({ ...imageUploadForm, caption: e.target.value })}
                  placeholder="Mô tả hiện vật, địa điểm chụp, niên đại..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Nguồn ảnh & Tác giả</label>
                  <input
                    type="text"
                    value={imageUploadForm.source}
                    onChange={(e) => setImageUploadForm({ ...imageUploadForm, source: e.target.value })}
                    placeholder="Bảo tàng Lịch sử quốc gia"
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Giai đoạn lịch sử</label>
                  <select
                    value={imageUploadForm.periodCode}
                    onChange={(e) => setImageUploadForm({ ...imageUploadForm, periodCode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                  >
                    <option value="GD01">GD01: Tiền sử & Dựng nước</option>
                    <option value="GD02">GD02: Bắc thuộc & Tự chủ</option>
                    <option value="GD03">GD03: Các triều đại quân chủ</option>
                    <option value="GD04">GD04: Chống Pháp & Độc lập</option>
                    <option value="GD05">GD05: Kháng chiến chống Pháp</option>
                    <option value="GD06">GD06: Kháng chiến chống Mỹ</option>
                    <option value="GD07">GD07: Bảo vệ Tổ quốc 1975-1986</option>
                    <option value="GD08">GD08: Đổi mới & Hội nhập</option>
                  </select>
                </div>
              </div>

              {isUploadingFile && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-stone-600 font-bold">
                    <span>Đang lưu trữ ảnh lên hệ thống...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className="h-full bg-amber-700 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-[#eedec7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddImageModalOpen(false)}
                  disabled={isUploadingFile}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUploadingFile}
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4 text-amber-200" />
                  <span>{isUploadingFile ? 'Đang tải lên...' : 'Đăng tải ảnh ngay'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: + THÊM VIDEO (Direct Upload MP4/WebM or YouTube URL)
          ========================================================================= */}
      {isAddVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-800" />
                <h3 className="font-display text-lg font-bold text-[#451a03]">
                  + THÊM VIDEO LỊCH SỬ
                </h3>
              </div>
              <button
                onClick={() => setIsAddVideoModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Method switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl text-xs font-bold text-center">
              <button
                type="button"
                onClick={() => setVideoUploadForm((prev) => ({ ...prev, method: 'upload' }))}
                className={`py-2 rounded-lg transition-colors ${
                  videoUploadForm.method === 'upload'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-amber-900'
                }`}
              >
                Cách 1: Tải video trực tiếp (MP4/WebM)
              </button>
              <button
                type="button"
                onClick={() => setVideoUploadForm((prev) => ({ ...prev, method: 'youtube' }))}
                className={`py-2 rounded-lg transition-colors ${
                  videoUploadForm.method === 'youtube'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-amber-900'
                }`}
              >
                Cách 2: Chèn đường dẫn YouTube
              </button>
            </div>

            <form onSubmit={handleSubmitVideoUpload} className="space-y-4 text-xs">
              {videoUploadForm.method === 'upload' ? (
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Chọn tệp video từ máy tính (MP4, WebM) *
                  </label>
                  <div className="p-4 border-2 border-dashed border-[#d6be9e] rounded-2xl bg-amber-50/50 text-center">
                    <Film className="w-8 h-8 text-amber-700/60 mx-auto mb-1.5" />
                    <div className="font-bold text-stone-700">Chọn tệp MP4 hoặc WebM</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Lưu trữ trực tiếp và phát trên web với điều khiển play, pause, volume, toàn màn hình.
                    </div>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg"
                      onChange={handleVideoFileChange}
                      className="mt-2 text-xs"
                    />
                  </div>
                  {videoUploadForm.previewUrl && (
                    <div className="mt-2 rounded-xl overflow-hidden bg-black max-h-48">
                      <video src={videoUploadForm.previewUrl} controls className="w-full max-h-48" />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Dán đường dẫn video YouTube *
                  </label>
                  <input
                    type="url"
                    required
                    value={videoUploadForm.youtubeUrl}
                    onChange={(e) => setVideoUploadForm({ ...videoUploadForm, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono bg-white"
                  />
                  {videoUploadForm.youtubeUrl && (
                    <div className="mt-2 aspect-video rounded-xl overflow-hidden shadow-xs">
                      <iframe
                        src={getYouTubeEmbedUrl(videoUploadForm.youtubeUrl)}
                        title="YouTube Preview"
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tiêu đề video *</label>
                <input
                  type="text"
                  required
                  value={videoUploadForm.title}
                  onChange={(e) => setVideoUploadForm({ ...videoUploadForm, title: e.target.value })}
                  placeholder="Ví dụ: Phim tư liệu: Chiến thắng Điện Biên Phủ trên không"
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mô tả nội dung video</label>
                <textarea
                  rows={2}
                  value={videoUploadForm.caption}
                  onChange={(e) => setVideoUploadForm({ ...videoUploadForm, caption: e.target.value })}
                  placeholder="Tóm tắt nội dung video phục vụ bài học lịch sử..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Nguồn video / Đài truyền hình</label>
                  <input
                    type="text"
                    value={videoUploadForm.source}
                    onChange={(e) => setVideoUploadForm({ ...videoUploadForm, source: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Giai đoạn lịch sử</label>
                  <select
                    value={videoUploadForm.periodCode}
                    onChange={(e) => setVideoUploadForm({ ...videoUploadForm, periodCode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                  >
                    <option value="GD01">GD01: Tiền sử & Dựng nước</option>
                    <option value="GD02">GD02: Bắc thuộc & Tự chủ</option>
                    <option value="GD03">GD03: Các triều đại quân chủ</option>
                    <option value="GD04">GD04: Chống Pháp & Độc lập</option>
                    <option value="GD05">GD05: Kháng chiến chống Pháp</option>
                    <option value="GD06">GD06: Kháng chiến chống Mỹ</option>
                    <option value="GD07">GD07: Bảo vệ Tổ quốc 1975-1986</option>
                    <option value="GD08">GD08: Đổi mới & Hội nhập</option>
                  </select>
                </div>
              </div>

              {isUploadingFile && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-stone-600 font-bold">
                    <span>Đang tải video lên máy chủ...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className="h-full bg-amber-700 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-[#eedec7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddVideoModalOpen(false)}
                  disabled={isUploadingFile}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUploadingFile}
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4 text-amber-200" />
                  <span>{isUploadingFile ? 'Đang xử lý...' : 'Lưu video vào kho'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: IMPORT TXT / JSON / WORD FILE
          ========================================================================= */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eedec7]">
              <div className="flex items-center gap-2">
                <FileUp className="w-5 h-5 text-amber-800" />
                <h3 className="font-display text-lg font-bold text-[#451a03]">
                  Tải Tệp TXT, JSON, Word Để Bổ Sung Dữ Liệu
                </h3>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Chọn tệp từ máy tính (.txt, .json, .docx)
                </label>
                <input
                  type="file"
                  accept=".txt,.json,.docx,.doc"
                  onChange={handleImportTextFile}
                  className="w-full p-2 border border-stone-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Hoặc dán trực tiếp nội dung văn bản / JSON vào đây:
                </label>
                <textarea
                  rows={8}
                  value={importTextContent}
                  onChange={(e) => setImportTextContent(e.target.value)}
                  placeholder="Dán nội dung bài viết, sự kiện hoặc tệp JSON tại đây..."
                  className="w-full p-3 rounded-xl border border-stone-300 font-mono text-xs bg-white leading-relaxed"
                />
              </div>

              <div className="pt-2 border-t border-[#eedec7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleExecuteImport}
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Xử lý và nhập vào cơ sở dữ liệu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MEDIA PICKER MODAL (For inserting from My Repository)
          ========================================================================= */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaList={cmsData.media}
        onSelectMedia={(mediaUrl) => {
          if (mediaPickerTarget === 'article_cover' && editingArticle) {
            setEditingArticle({ ...editingArticle, coverImage: mediaUrl });
          } else if (mediaPickerTarget === 'article_editor' && editingArticle) {
            const imgHtml = `<p><img src="${mediaUrl}" alt="Hình ảnh lịch sử" style="max-width:100%;border-radius:12px;margin:12px 0;" /></p>`;
            setEditingArticle({ ...editingArticle, contentHtml: (editingArticle.contentHtml || '') + imgHtml });
          }
        }}
        onQuickUploadNew={handleUploadSingleFile}
      />

      {/* =========================================================================
          VIDEO PREVIEW LIGHTBOX MODAL
          ========================================================================= */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-950 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-amber-600/50 space-y-2">
            <div className="p-3 bg-stone-900 flex items-center justify-between text-white text-xs">
              <span className="font-bold">Xem video tư liệu lịch sử</span>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="p-1 rounded-full text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              {previewVideoUrl.includes('youtube.com') || previewVideoUrl.includes('youtu.be') ? (
                <iframe
                  src={getYouTubeEmbedUrl(previewVideoUrl)}
                  title="YouTube Video"
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <video
                  src={previewVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
