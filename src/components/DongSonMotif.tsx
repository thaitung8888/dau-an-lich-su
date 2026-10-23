import React from 'react';

/**
 * Ngôi sao nhiều cánh ở tâm trống đồng Đông Sơn
 */
export const DongSonStar: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = 'text-amber-600' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric rings */}
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />

    {/* 14 Star rays radiating from center */}
    {Array.from({ length: 14 }).map((_, i) => {
      const angle = (i * (360 / 14) * Math.PI) / 180;
      const x1 = 50 + 16 * Math.cos(angle);
      const y1 = 50 + 16 * Math.sin(angle);
      const x2 = 50 + 40 * Math.cos(angle);
      const y2 = 50 + 40 * Math.sin(angle);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    })}

    {/* Center dot */}
    <circle cx="50" cy="50" r="4" fill="currentColor" />
  </svg>
);

/**
 * Chim Lạc Đông Sơn bay sải cánh
 */
export const ChimLacSVG: React.FC<{ size?: number; className?: string; flip?: boolean }> = ({
  size = 48,
  className = 'text-amber-600',
  flip = false,
}) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 120 72"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flip ? '-scale-x-100' : ''}`}
    aria-hidden="true"
  >
    {/* Body & Long beak */}
    <path d="M 12 36 Q 24 32 38 33 Q 46 26 56 25 Q 70 25 82 32 Q 95 35 116 34 Q 98 40 85 41 Q 68 42 54 38 Q 42 42 32 44 Q 20 44 12 36 Z" />
    {/* Crest feathers on head */}
    <path d="M 38 30 Q 32 18 20 12 Q 28 20 34 26 Z" />
    <path d="M 42 28 Q 38 14 30 8 Q 36 16 40 24 Z" />
    {/* Upward long wing */}
    <path d="M 52 26 Q 66 10 92 4 Q 80 16 68 28 Z" opacity="0.9" />
    <path d="M 58 26 Q 74 14 100 12 Q 86 22 72 31 Z" opacity="0.8" />
    {/* Tail feathers */}
    <path d="M 88 38 Q 106 44 118 54 Q 104 48 92 42 Z" />
    <path d="M 82 40 Q 98 52 110 64 Q 96 52 86 44 Z" />
    {/* Eye */}
    <circle cx="28" cy="34" r="2.5" fill="#ffffff" />
    <circle cx="28" cy="34" r="1.2" fill="currentColor" />
  </svg>
);

/**
 * Trống đồng Đông Sơn trọn vẹn (Ngọc Lũ)
 */
export const DongSonDrumSVG: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-amber-700',
  size = 140,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer border & dots */}
    <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="2" />
    <circle cx="100" cy="100" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="2" />
    <circle cx="100" cy="100" r="16" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />

    {/* Central Sun with 14 rays */}
    {Array.from({ length: 14 }).map((_, i) => {
      const angle = (i * (360 / 14) * Math.PI) / 180;
      const x1 = 100 + 16 * Math.cos(angle);
      const y1 = 100 + 16 * Math.sin(angle);
      const x2 = 100 + 29 * Math.cos(angle);
      const y2 = 100 + 29 * Math.sin(angle);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    })}

    {/* Concentric flying Chim Lạc birds on outer ring (8 birds) */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const bx = 100 + 69 * Math.cos(angle);
      const by = 100 + 69 * Math.sin(angle);
      return (
        <path
          key={i}
          d={`M ${bx - 6} ${by + 2} Q ${bx} ${by - 6} ${bx + 6} ${by + 2}`}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );
    })}

    {/* Saw-tooth pattern ring */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const sx = 100 + 82 * Math.cos(angle);
      const sy = 100 + 82 * Math.sin(angle);
      return (
        <circle key={i} cx={sx} cy={sy} r="1" fill="currentColor" />
      );
    })}
  </svg>
);

/**
 * Dải hoa văn Đông Sơn trang trí ngang (Header band, Footer band, Card divider)
 */
export const DongSonBorderBand: React.FC<{ className?: string }> = ({ className = 'text-amber-600/30' }) => (
  <div className={`w-full overflow-hidden flex items-center justify-center py-1 ${className}`} aria-hidden="true">
    <svg width="100%" height="16" viewBox="0 0 1200 16" fill="currentColor" preserveAspectRatio="none">
      {/* Repeating Saw-tooth and circle motif */}
      <defs>
        <pattern id="dongson-band-pattern" x="0" y="0" width="80" height="16" patternUnits="userSpaceOnUse">
          {/* Saw-tooth triangles */}
          <polygon points="0,16 10,2 20,16" opacity="0.6" />
          <polygon points="20,16 30,2 40,16" opacity="0.6" />
          {/* Circular spiral / dots */}
          <circle cx="50" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="9" r="1.5" />
          {/* Stylized small bird */}
          <path d="M 60 12 Q 68 4 76 10 Q 72 13 60 12 Z" opacity="0.8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="16" fill="url(#dongson-band-pattern)" />
    </svg>
  </div>
);

/**
 * Góc hoa văn Đông Sơn trang trí thẻ
 */
export const DongSonCorner: React.FC<{ className?: string; position?: 'tl' | 'tr' | 'bl' | 'br' }> = ({
  className = 'text-amber-600/40',
  position = 'tl',
}) => {
  const transform =
    position === 'tr'
      ? 'scale-x-[-1]'
      : position === 'bl'
      ? 'scale-y-[-1]'
      : position === 'br'
      ? 'scale-[-1]'
      : '';

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${transform}`}
      aria-hidden="true"
    >
      <path d="M 2 38 L 2 2 L 38 2" strokeWidth="2" strokeLinecap="round" />
      <path d="M 8 26 L 8 8 L 26 8" strokeWidth="1.5" strokeDasharray="2 2" strokeLinecap="round" />
      <circle cx="6" cy="6" r="2" fill="currentColor" />
    </svg>
  );
};

/**
 * Linh vật Bạn Sử Nhí AI (với mũ Đông Sơn, áo truyền thống, tay cầm sách cổ)
 */
export const BanSuNhiAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-1 shadow-md flex items-center justify-center text-white shrink-0 ${className}`}
  >
    <svg viewBox="0 0 64 64" className="w-full h-full text-white" fill="none">
      {/* Head & Face */}
      <circle cx="32" cy="34" r="21" fill="#fed7aa" />
      {/* Sparkly cartoon eyes */}
      <circle cx="25" cy="34" r="2.8" fill="#451a03" />
      <circle cx="39" cy="34" r="2.8" fill="#451a03" />
      <circle cx="26" cy="33" r="1" fill="white" />
      <circle cx="40" cy="33" r="1" fill="white" />
      {/* Rosy cheeks */}
      <circle cx="19" cy="38" r="3" fill="#f87171" fillOpacity="0.4" />
      <circle cx="45" cy="38" r="3" fill="#f87171" fillOpacity="0.4" />
      {/* Warm cheerful smile */}
      <path d="M 27 41 Q 32 46 37 41" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Đông Sơn stylized feathered headpiece */}
      <path d="M 15 23 Q 32 15 49 23 L 47 27 Q 32 19 17 27 Z" fill="#d97706" />
      <circle cx="32" cy="18" r="4.5" fill="#fde047" stroke="#b45309" strokeWidth="1" />
      <path d="M 32 9 L 32 14" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 26 11 L 30 15" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 38 11 L 34 15" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
      {/* Ancient History Book in hand */}
      <rect x="36" y="44" width="16" height="7" rx="2" fill="#fef3c7" stroke="#92400e" strokeWidth="1" transform="rotate(12 36 44)" />
    </svg>
  </div>
);

/**
 * Học sinh tiểu học Chibi vui tươi học lịch sử
 */
export const ChibiStudentIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-800 p-1 shadow-md flex items-center justify-center text-white shrink-0 ${className}`}
  >
    <svg viewBox="0 0 64 64" className="w-full h-full text-white" fill="none">
      {/* Head */}
      <circle cx="32" cy="33" r="20" fill="#ffedd5" />
      {/* Hair with neat school cut */}
      <path d="M 14 30 Q 18 16 32 16 Q 46 16 50 30 Q 44 22 32 23 Q 20 22 14 30 Z" fill="#292524" />
      {/* Red scarf (Khăn quàng đỏ) */}
      <polygon points="32,48 24,58 32,54 40,58" fill="#dc2626" />
      {/* Big happy eyes */}
      <circle cx="26" cy="34" r="2.5" fill="#292524" />
      <circle cx="38" cy="34" r="2.5" fill="#292524" />
      <circle cx="27" cy="33" r="0.8" fill="white" />
      <circle cx="39" cy="33" r="0.8" fill="white" />
      {/* Cheerful smile */}
      <path d="M 28 41 Q 32 45 36 41" stroke="#292524" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/**
 * Lược đồ cọc gỗ Bạch Đằng
 */
export const BachDangStakesGraphic: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 240 120" className={className} fill="none">
    {/* Water waves */}
    <path d="M 0 60 Q 60 50 120 60 T 240 60 L 240 120 L 0 120 Z" fill="#e0f2fe" opacity="0.8" />
    <path d="M 0 75 Q 60 65 120 75 T 240 75 L 240 120 L 0 120 Z" fill="#bae6fd" opacity="0.9" />
    <path d="M 0 90 Q 60 80 120 90 T 240 90 L 240 120 L 0 120 Z" fill="#7dd3fc" />

    {/* Wooden Stakes with iron-covered tips emerging */}
    <polygon points="50,45 56,105 44,105" fill="#78350f" />
    <polygon points="50,45 53,60 47,60" fill="#94a3b8" />

    <polygon points="90,35 97,105 83,105" fill="#5c2606" />
    <polygon points="90,35 94,52 86,52" fill="#94a3b8" />

    <polygon points="140,40 146,110 134,110" fill="#78350f" />
    <polygon points="140,40 144,55 136,55" fill="#94a3b8" />

    <polygon points="185,50 191,110 179,110" fill="#5c2606" />
    <polygon points="185,50 189,65 181,65" fill="#94a3b8" />

    {/* Ancient battle flag on boat far away */}
    <path d="M 20 40 L 20 20 L 32 25 Z" fill="#dc2626" />
    <line x1="20" y1="40" x2="20" y2="20" stroke="#78350f" strokeWidth="2" />
  </svg>
);
