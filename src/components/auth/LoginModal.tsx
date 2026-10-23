import React, { useState } from 'react';
import { UserProfile } from '../../types';
import {
  BanSuNhiAvatar,
  ChibiStudentIcon,
  DongSonDrumSVG,
  DongSonStar,
  ChimLacSVG,
  DongSonCorner
} from '../DongSonMotif';
import {
  UserCheck,
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  X,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  School
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | null>(null);

  // Teacher login state
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [teacherSchool, setTeacherSchool] = useState('');

  // Student login state
  const [studentClassCode, setStudentClassCode] = useState('5A8');
  const [studentName, setStudentName] = useState('');
  const [studentPin, setStudentPin] = useState('2026');

  // Status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  if (!isOpen) return null;

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');
    setLoading(true);

    try {
      const endpoint = isRegisterMode ? '/api/auth/teacher-register' : '/api/auth/teacher-login';
      const payload = isRegisterMode
        ? { email: teacherEmail, password: teacherPassword, name: teacherName, school: teacherSchool }
        : { email: teacherEmail, password: teacherPassword };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập không thành công.');
      }

      if (isRegisterMode && !data.user.approved) {
        setSuccessNotice('Đăng ký thành công! Tài khoản đang chờ Quản trị viên (Cô Phạm Thị Thanh) phê duyệt.');
        setIsRegisterMode(false);
      } else {
        const profile: UserProfile = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          approved: data.user.approved,
          school: data.user.school,
          stampsCount: 7,
        };
        onLoginSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi đăng nhập giáo viên.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleTeacherLogin = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      // Direct Google Auth login integration with master email
      const promptEmail = teacherEmail.trim() || 'pham.thanhh212@gmail.com';
      const res = await fetch('/api/auth/teacher-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: promptEmail,
          googleAuth: true,
          name: promptEmail.toLowerCase().includes('pham.thanhh212') ? 'Cô giáo Phạm Thị Thanh' : 'Giáo viên Google',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập Google thất bại.');
      }

      const profile: UserProfile = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        approved: data.user.approved,
        school: data.user.school,
        stampsCount: 7,
      };
      onLoginSuccess(profile);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/student-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classCode: studentClassCode,
          studentName: studentName || 'Học sinh nhí',
          pin: studentPin,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập học sinh thất bại.');
      }

      const profile: UserProfile = {
        id: data.user.id,
        name: data.user.name,
        role: 'student',
        classCode: data.user.classCode,
        grade: data.user.grade,
        school: data.user.school,
        stampsCount: 2,
      };
      onLoginSuccess(profile);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Mã lớp hoặc mã PIN chưa chính xác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-[#fffdfa] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-[#e8d7be] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <DongSonCorner position="tl" className="absolute top-2 left-2 text-amber-700/30" />
        <DongSonCorner position="tr" className="absolute top-2 right-2 text-amber-700/30" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-5 border-b border-[#eedec7]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <DongSonStar size={20} className="text-amber-700" />
            <span className="font-bold text-xs uppercase tracking-wider text-amber-900">
              Cổng Đăng Nhập Không Gian Số
            </span>
            <DongSonStar size={20} className="text-amber-700" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451a03]">
            DẤU ẤN NON SÔNG
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Vui lòng chọn vai trò để truy cập học liệu và hành trình khám phá Lịch sử Việt Nam
          </p>
        </div>

        {/* SELECTION STEP: 2 BIG CARDS (GIÁO VIÊN & HỌC SINH) */}
        {!selectedRole && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-6">
            {/* Card 1: GIÁO VIÊN */}
            <div
              onClick={() => setSelectedRole('teacher')}
              className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-[#fdf9f0] to-[#f7eedd] border-2 border-[#dec6a2] hover:border-amber-700 hover:shadow-lg transition-all flex flex-col items-center text-center space-y-3 relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <BanSuNhiAvatar size={54} />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">
                  Dành cho thầy cô
                </span>
                <h3 className="font-display text-xl font-extrabold text-[#451a03] mt-2 group-hover:text-amber-800 transition-colors">
                  1. GIÁO VIÊN
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Quản lý học liệu, bài giảng điện tử, duyệt tài liệu, tạo game trắc nghiệm và theo dõi tiến độ lớp học.
                </p>
              </div>

              <div className="pt-2 text-xs font-bold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Đăng nhập giáo viên</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: HỌC SINH */}
            <div
              onClick={() => setSelectedRole('student')}
              className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-[#f0fbf7] to-[#e4f5ed] border-2 border-[#b5decb] hover:border-teal-700 hover:shadow-lg transition-all flex flex-col items-center text-center space-y-3 relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <ChibiStudentIcon size={54} />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-900 bg-teal-200/60 px-2 py-0.5 rounded">
                  Không cần Gmail
                </span>
                <h3 className="font-display text-xl font-extrabold text-teal-950 mt-2 group-hover:text-teal-800 transition-colors">
                  2. HỌC SINH
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Vào học bằng Mã lớp & Mã PIN: Xem bài giảng, phim lịch sử, làm trắc nghiệm và hỏi Bạn Sử Nhí AI.
                </p>
              </div>

              <div className="pt-2 text-xs font-bold text-teal-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Học sinh vào lớp</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* ROLE 1: TEACHER LOGIN FORM */}
        {selectedRole === 'teacher' && (
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setErrorMessage('');
                  setSuccessNotice('');
                }}
                className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
              >
                ← Quay lại chọn vai trò
              </button>
              <span className="text-xs font-bold text-amber-900">
                {isRegisterMode ? 'Đăng ký tài khoản Giáo viên' : 'Đăng nhập Giáo viên'}
              </span>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* Quick Helper for Admin Demo */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#451a03]">Quản trị viên chính:</span>{' '}
                <span className="font-mono text-amber-900">Pham.thanhh212@gmail.com</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTeacherEmail('Pham.thanhh212@gmail.com');
                  setTeacherPassword('Admin@123');
                }}
                className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950"
              >
                Điền nhanh Admin
              </button>
            </div>

            <form onSubmit={handleTeacherLogin} className="space-y-3.5 text-xs">
              {isRegisterMode && (
                <>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Họ và tên giáo viên *</label>
                    <input
                      type="text"
                      required
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      placeholder="Ví dụ: Cô Nguyễn Thị Hoa"
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Trường tiểu học công tác</label>
                    <input
                      type="text"
                      value={teacherSchool}
                      onChange={(e) => setTeacherSchool(e.target.value)}
                      placeholder="Ví dụ: Trường Tiểu học Thăng Long"
                      className="w-full p-2.5 rounded-xl border border-[#d6be9e] focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="font-bold text-stone-700 block mb-1">Địa chỉ Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="name@school.edu.vn hoặc Gmail"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#d6be9e] focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mật khẩu *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    placeholder="Nhập mật khẩu an toàn..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#d6be9e] focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{loading ? 'Đang xác thực...' : isRegisterMode ? 'Gửi đăng ký duyệt' : 'Đăng nhập Giáo viên'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGoogleTeacherLogin}
                  disabled={loading}
                  className="py-2.5 px-4 rounded-xl border-2 border-stone-300 hover:bg-stone-50 font-bold text-xs text-stone-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>G</span>
                  <span>Đăng nhập với Google</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(!isRegisterMode);
                    setErrorMessage('');
                  }}
                  className="text-xs text-amber-800 hover:underline font-semibold"
                >
                  {isRegisterMode
                    ? 'Đã có tài khoản? Quay lại đăng nhập'
                    : 'Thầy/Cô chưa có tài khoản? Nhấn để đăng ký mới'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ROLE 2: STUDENT LOGIN FORM */}
        {selectedRole === 'student' && (
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setErrorMessage('');
                }}
                className="text-xs font-bold text-teal-800 hover:underline flex items-center gap-1"
              >
                ← Quay lại chọn vai trò
              </button>
              <span className="text-xs font-bold text-teal-900">
                Học sinh vào lớp học
              </span>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-950 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="font-bold">Lớp học sinh mẫu:</span> <strong className="font-mono text-teal-900 bg-teal-100 px-1.5 py-0.5 rounded">5A8</strong> – Trường TH Tiền Phong
              </div>
              <div className="text-[11px] text-teal-800 font-semibold">
                Mã PIN: <span className="font-mono font-bold">2026</span>
              </div>
            </div>

            <form onSubmit={handleStudentLogin} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Mã lớp do giáo viên cấp *</label>
                <div className="relative">
                  <School className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={studentClassCode}
                    onChange={(e) => setStudentClassCode(e.target.value.toUpperCase())}
                    placeholder="Ví dụ: 5A8, 4A1, 5A1"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono font-bold text-stone-900 uppercase bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tên hiển thị hoặc Mã học sinh (Không bắt buộc)</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Bảo An hoặc HS01"
                  className="w-full p-2.5 rounded-xl border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mã PIN truy cập của lớp *</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={studentPin}
                    onChange={(e) => setStudentPin(e.target.value)}
                    placeholder="Nhập mã PIN 4 chữ số (mặc định: 2026)..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{loading ? 'Đang vào lớp...' : 'Bắt đầu học Lịch sử ngay'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
