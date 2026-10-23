import React, { useRef, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Undo,
  Redo,
  Eye,
  Edit3,
  Code
} from 'lucide-react';

interface VisualEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onInsertImageClick?: () => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  value,
  onChange,
  placeholder = 'Nhập nội dung bài viết lịch sử tại đây...',
  onInsertImageClick
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'visual' | 'html' | 'preview'>('visual');
  const [htmlCode, setHtmlCode] = useState(value);

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlCode(html);
      onChange(html);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlCode(html);
      onChange(html);
    }
  };

  const handlePromptLink = () => {
    const url = prompt('Nhập đường dẫn liên kết (URL):', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handlePromptImage = () => {
    if (onInsertImageClick) {
      onInsertImageClick();
    } else {
      const url = prompt('Nhập đường dẫn hình ảnh (URL):', 'https://');
      if (url) {
        executeCommand('insertImage', url);
      }
    }
  };

  const handleHtmlCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtmlCode(newHtml);
    onChange(newHtml);
    if (editorRef.current) {
      editorRef.current.innerHTML = newHtml;
    }
  };

  return (
    <div className="border border-stone-300 rounded-2xl overflow-hidden bg-white shadow-2xs">
      {/* Visual Editor Toolbar */}
      <div className="p-2 bg-[#fdf9f3] border-b border-stone-200 flex flex-wrap items-center justify-between gap-1 text-xs">
        {/* Formatting controls */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => executeCommand('bold')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="In đậm (Ctrl+B)"
          >
            <Bold className="w-4 h-4 font-bold" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('italic')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="In nghiêng (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('underline')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="Gạch chân (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-stone-300 mx-1" />

          {/* Headings */}
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h1>')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors font-bold"
            title="Tiêu đề lớn (H1)"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h2>')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors font-bold"
            title="Tiêu đề vừa (H2)"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h3>')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors font-bold"
            title="Tiêu đề nhỏ (H3)"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-stone-300 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => executeCommand('justifyLeft')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="Căn trái"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('justifyCenter')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="Căn giữa"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('justifyRight')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="Căn phải"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-stone-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => executeCommand('insertUnorderedList')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="Danh sách gạch đầu dòng"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('insertOrderedList')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="Danh sách đánh số thứ tự"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<blockquote>')}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="Khung trích dẫn lời nói / sử liệu"
          >
            <Quote className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-stone-300 mx-1" />

          {/* Media & Link insertion */}
          <button
            type="button"
            onClick={handlePromptImage}
            className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-800 transition-colors flex items-center gap-1 font-semibold"
            title="Thêm ảnh vào bài viết"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">+ Thêm ảnh</span>
          </button>
          <button
            type="button"
            onClick={handlePromptLink}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
            title="Chèn liên kết"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* View Switcher: Visual, HTML, Preview */}
        <div className="flex items-center gap-1 p-0.5 bg-stone-200 rounded-lg text-[11px]">
          <button
            type="button"
            onClick={() => setViewMode('visual')}
            className={`px-2 py-1 rounded-md font-bold transition-colors ${
              viewMode === 'visual'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Soạn thảo
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-2 py-1 rounded-md font-bold transition-colors ${
              viewMode === 'preview'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Xem trước
          </button>
          <button
            type="button"
            onClick={() => setViewMode('html')}
            className={`px-2 py-1 rounded-md font-bold transition-colors ${
              viewMode === 'html'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Mã HTML
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {viewMode === 'visual' && (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          className="min-h-[220px] max-h-[480px] p-4 sm:p-5 overflow-y-auto focus:outline-none prose prose-stone max-w-none text-stone-800 leading-relaxed text-sm"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      )}

      {viewMode === 'preview' && (
        <div className="min-h-[220px] max-h-[480px] p-4 sm:p-5 overflow-y-auto bg-stone-50/50 prose prose-stone max-w-none text-sm text-stone-800 leading-relaxed">
          {htmlCode ? (
            <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
          ) : (
            <div className="text-stone-400 italic text-center py-8">
              Chưa có nội dung để xem trước. Hãy nhập bài viết vào trình soạn thảo!
            </div>
          )}
        </div>
      )}

      {viewMode === 'html' && (
        <textarea
          value={htmlCode}
          onChange={handleHtmlCodeChange}
          className="w-full min-h-[220px] max-h-[480px] p-4 font-mono text-xs text-stone-800 bg-stone-900 text-amber-200 focus:outline-none"
          placeholder="Mã HTML bài viết..."
        />
      )}

      {/* Editor Status bar */}
      <div className="px-4 py-1.5 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
        <span>Trình soạn thảo trực quan – Dấu Ấn Non Sông</span>
        <span>
          {htmlCode.replace(/<[^>]*>/g, '').trim().length} kí tự · {htmlCode.split(/\s+/).filter(Boolean).length} từ
        </span>
      </div>
    </div>
  );
};
