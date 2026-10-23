// DỮ LIỆU LỊCH SỬ VIỆT NAM CHUẨN HÓA CHO WEBSITE "DẤU ẤN NON SÔNG"
// Nguồn gốc: File Du_lieu_Lich_su_Viet_Nam_cho_Web_b5775d23.json do giáo viên cung cấp
// Lớp: 5A8 - Trường Tiểu học Tiền Phong
// Giáo viên hướng dẫn: Cô giáo Phạm Thị Thanh

export interface UserPeriod {
  Mã: string; // GD01 -> GD08
  'Tên giai đoạn': string;
  'Thời gian': string;
  'Nội dung tiêu biểu': string;
  'Nhân vật': string;
  'Di tích/hiện vật': string;
  'Nguồn tham khảo': string;
  'Trạng thái': string;
}

export interface UserEvent {
  Mã: string; // SK001 -> SK032
  'Sự kiện': string;
  'Mốc thời gian': string;
  'Mã giai đoạn': string;
  'Dữ kiện tóm tắt': string;
  'Ý nghĩa': string;
  'URL nguồn': string;
  'Trạng thái': string;
}

export interface UserFigure {
  Mã: string; // NV01 -> NV28
  'Nhân vật': string;
  'Giai đoạn': string;
  'Đóng góp/sự kiện': string;
  'Địa danh liên quan': string;
  'Ghi chú loại hình': string;
  'URL nguồn': string;
  'Trạng thái': string;
}

export interface UserRelic {
  Mã: string; // DT01 -> DT10
  'Tên di tích': string;
  'Địa điểm': string;
  'Giai đoạn': string;
  'Giá trị liên quan': string;
  'URL nguồn': string;
  'Trạng thái': string;
}

export interface UserLegend {
  Mã: string; // TT01 -> TT06
  'Tên truyền thuyết': string;
  'Giai đoạn': string;
  'Nội dung liên hệ': string;
  'Lưu ý phân biệt': string;
  'Trạng thái': string;
}

export interface UserImageProposal {
  Mã: string; // HA01 -> HA07
  'Hình ảnh đề xuất': string;
  'Loại tư liệu': string;
  'Giai đoạn': string;
  'Cơ quan cung cấp': string;
  'URL trang nguồn': string;
  'URL ảnh trực tiếp': string | null;
  'Quyền sử dụng': string;
  'Trạng thái': string;
}

export interface UserOfficialSource {
  Mã: string; // NG01 -> NG07
  'Nguồn/tổ chức': string;
  URL: string;
  'Phạm vi tư liệu': string;
  'Lưu ý': string;
}

export const USER_HISTORY_METADATA = {
  ten_bo_tu_lieu: 'DẤU ẤN NON SÔNG – Kho tư liệu Lịch sử Việt Nam',
  muc_dich: 'Dữ liệu văn bản tiếng Việt phục vụ nhập vào Google AI Studio để xây dựng website giáo dục lịch sử.',
  ghi_chu_kiem_chung: 'Nội dung chuyển nguyên từ bảng tính; trạng thái duyệt và giới hạn về nguồn, hình ảnh giữ theo bảng gốc. Không mặc định mọi chi tiết đã được giáo viên thẩm định.',
  lop_phu_trach: '5A8 - Trường Tiểu học Tiền Phong',
  giao_vien: 'Phạm Thị Thanh',
  ngay_tao: '20/10/2026',
  huong_dan: [
    'Lọc theo Mã giai đoạn để liên kết sự kiện – nhân vật – di tích – hình ảnh.',
    'Duyệt nguồn và nội dung trước khi chuyển trạng thái sang "Đã duyệt".',
    'Với hình ảnh, thêm URL file gốc và giấy phép rõ ràng trước khi đăng tải.',
    'Bổ sung nội dung SGK theo từng bài; không tự động coi toàn bộ dòng dữ liệu đã đạt chuẩn SGK.',
    'Nhập Firebase từng nhóm bảng sau khi đã rà soát.'
  ]
};

export const USER_PERIODS: UserPeriod[] = [
  {
    Mã: 'GD01',
    'Tên giai đoạn': 'Tiền sử và buổi đầu dựng nước',
    'Thời gian': 'Trước thế kỉ II TCN',
    'Nội dung tiêu biểu': 'Văn hóa Đông Sơn; Văn Lang; Âu Lạc',
    'Nhân vật': 'Vua Hùng; An Dương Vương',
    'Di tích/hiện vật': 'Trống Ngọc Lũ; Cổ Loa; Đền Hùng',
    'Nguồn tham khảo': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'GD02',
    'Tên giai đoạn': 'Bắc thuộc và đấu tranh giành tự chủ',
    'Thời gian': '179 TCN–938',
    'Nội dung tiêu biểu': 'Hai Bà Trưng; Bà Triệu; Lý Bí; họ Khúc; Bạch Đằng 938',
    'Nhân vật': 'Hai Bà Trưng; Ngô Quyền',
    'Di tích/hiện vật': 'Di tích Bạch Đằng',
    'Nguồn tham khảo': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'GD03',
    'Tên giai đoạn': 'Các triều đại quân chủ độc lập',
    'Thời gian': '939–1858',
    'Nội dung tiêu biểu': 'Ngô; Đinh; Tiền Lê; Lý; Trần; Hồ; Lê; Mạc; Tây Sơn; Nguyễn',
    'Nhân vật': 'Đinh Bộ Lĩnh; Lý Công Uẩn; Trần Quốc Tuấn; Quang Trung',
    'Di tích/hiện vật': 'Hoàng thành Thăng Long; Văn Miếu; Cố đô Huế',
    'Nguồn tham khảo': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'GD04',
    'Tên giai đoạn': 'Chống thực dân Pháp và giành độc lập',
    'Thời gian': '1858–1945',
    'Nội dung tiêu biểu': 'Phong trào Cần Vương; Đông Du; thành lập Đảng 1930; Cách mạng tháng Tám',
    'Nhân vật': 'Trương Định; Phan Bội Châu; Hồ Chí Minh',
    'Di tích/hiện vật': 'Quảng trường Ba Đình',
    'Nguồn tham khảo': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'GD05',
    'Tên giai đoạn': 'Kháng chiến chống thực dân Pháp',
    'Thời gian': '1945–1954',
    'Nội dung tiêu biểu': 'Toàn quốc kháng chiến; Biên giới 1950; Điện Biên Phủ 1954',
    'Nhân vật': 'Hồ Chí Minh; Võ Nguyên Giáp',
    'Di tích/hiện vật': 'Chiến trường Điện Biên Phủ',
    'Nguồn tham khảo': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'GD06',
    'Tên giai đoạn': 'Đấu tranh thống nhất đất nước',
    'Thời gian': '1954–1975',
    'Nội dung tiêu biểu': 'Hiệp định Paris; Đại thắng mùa Xuân; 30/4/1975',
    'Nhân vật': 'Võ Nguyên Giáp; Nguyễn Thị Định',
    'Di tích/hiện vật': 'Dinh Độc Lập',
    'Nguồn tham khảo': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'GD07',
    'Tên giai đoạn': 'Thống nhất và xây dựng đất nước',
    'Thời gian': '1975–1986',
    'Nội dung tiêu biểu': 'Thống nhất về mặt nhà nước năm 1976; tái thiết, bảo vệ đất nước',
    'Nhân vật': 'Nhân dân Việt Nam',
    'Di tích/hiện vật': 'Tư liệu đời sống thời bao cấp',
    'Nguồn tham khảo': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'GD08',
    'Tên giai đoạn': 'Đổi mới và hội nhập',
    'Thời gian': '1986–nay',
    'Nội dung tiêu biểu': 'Đổi mới 1986; gia nhập ASEAN 1995; gia nhập WTO 2007',
    'Nhân vật': 'Nhân dân Việt Nam',
    'Di tích/hiện vật': 'Hình ảnh Việt Nam thời kỳ phát triển',
    'Nguồn tham khảo': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Cần nguồn bổ sung'
  }
];

export const USER_EVENTS: UserEvent[] = [
  {
    Mã: 'SK001',
    'Sự kiện': 'Văn Lang hình thành',
    'Mốc thời gian': 'Khoảng thế kỉ VII TCN',
    'Mã giai đoạn': 'GD01',
    'Dữ kiện tóm tắt': 'Gắn với thời đại các Vua Hùng đóng đô Phong Châu',
    'Ý nghĩa': 'Bước đầu hình thành nhà nước sơ khai',
    'URL nguồn': 'https://baotanglichsu.vn/vi/Articles/1001/19707/bao-vat-quoc-gia-viet-nam-trong-djong-ngoc-lu.html',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK002',
    'Sự kiện': 'Khởi nghĩa Hai Bà Trưng',
    'Mốc thời gian': 'Năm 40',
    'Mã giai đoạn': 'GD02',
    'Dữ kiện tóm tắt': 'Hai Bà Trưng phất cờ khởi nghĩa tại cửa sông Hát đuổi Tô Định',
    'Ý nghĩa': 'Thể hiện ý chí quật cường giành lại độc lập dân tộc',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK003',
    'Sự kiện': 'Khởi nghĩa Bà Triệu',
    'Mốc thời gian': 'Năm 248',
    'Mã giai đoạn': 'GD02',
    'Dữ kiện tóm tắt': 'Bà Triệu (Triệu Thị Trinh) dấy binh chống ách đô hộ nhà Ngô tại căn cứ núi Nưa',
    'Ý nghĩa': 'Khẳng định khí phách quật khởi của phụ nữ Việt Nam',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK004',
    'Sự kiện': 'Khởi nghĩa Lý Bí',
    'Mốc thời gian': 'Năm 542',
    'Mã giai đoạn': 'GD02',
    'Dữ kiện tóm tắt': 'Lý Bí khởi nghĩa đánh đuổi quân Lương, lập nước Vạn Xuân năm 544',
    'Ý nghĩa': 'Tiền đề thành lập nhà nước Vạn Xuân độc lập lâu bền',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK005',
    'Sự kiện': 'Chiến thắng Bạch Đằng',
    'Mốc thời gian': 'Năm 938',
    'Mã giai đoạn': 'GD02',
    'Dữ kiện tóm tắt': 'Ngô Quyền dùng trận địa cọc ngầm đánh tan quân Nam Hán',
    'Ý nghĩa': 'Chấm dứt hơn 1000 năm Bắc thuộc, mở ra kỉ nguyên độc lập tự chủ',
    'URL nguồn': 'https://baotanglichsu.vn/vi/Articles/3098/13934/ngo-quyen-va-chienthang-bach-dang-nam-938.html',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK006',
    'Sự kiện': 'Ngô Quyền xưng vương',
    'Mốc thời gian': 'Năm 939',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Ngô Quyền định đô ở Cổ Loa, lập ra vương triều độc lập',
    'Ý nghĩa': 'Củng cố nền độc lập vững chắc của dân tộc',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK007',
    'Sự kiện': 'Đinh Bộ Lĩnh thống nhất đất nước',
    'Mốc thời gian': 'Năm 968',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, đặt quốc hiệu Đại Cồ Việt',
    'Ý nghĩa': 'Thành lập nhà Đinh, khẳng định độc lập ngang hàng các hoàng đế phương Bắc',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK008',
    'Sự kiện': 'Kháng chiến chống Tống lần thứ nhất',
    'Mốc thời gian': 'Năm 981',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Thập đạo Tướng quân Lê Hoàn lãnh đạo quân dân phá tan quân Tống trên sông Bạch Đằng và Tây Kết',
    'Ý nghĩa': 'Bảo vệ vững chắc nền độc lập non trẻ của Đại Cồ Việt',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK009',
    'Sự kiện': 'Lý Thái Tổ dời đô ra Thăng Long',
    'Mốc thời gian': 'Năm 1010',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Lý Công Uẩn ban Chiếu dời đô từ Hoa Lư về Đại La, đổi tên là Thăng Long',
    'Ý nghĩa': 'Thăng Long trở thành trung tâm chính trị, văn hóa, kinh tế muôn đời',
    'URL nguồn': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK010',
    'Sự kiện': 'Dựng Văn Miếu',
    'Mốc thời gian': 'Năm 1070',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Vua Lý Thánh Tông cho xây dựng Văn Miếu thờ Chu Công, Khổng Tử',
    'Ý nghĩa': 'Biểu tượng ngời sáng của truyền thống văn hiến và giáo dục dân tộc',
    'URL nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK011',
    'Sự kiện': 'Thành lập Quốc Tử Giám',
    'Mốc thời gian': 'Năm 1076',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Vua Lý Nhân Tông lập trường đại học đầu tiên của Việt Nam',
    'Ý nghĩa': 'Mở đầu thời kỳ giáo dục khoa cử đào tạo nhân tài cho đất nước',
    'URL nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK012',
    'Sự kiện': 'Ba lần kháng chiến chống Mông – Nguyên',
    'Mốc thời gian': '1258, 1285, 1288 (Thế kỉ XIII)',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Quân dân nhà Trần dưới sự chỉ huy của Trần Quốc Tuấn đồng lòng đánh tan quân xâm lược hung bạo',
    'Ý nghĩa': 'Bảo vệ vững chắc độc lập, làm rạng danh hào khí Đông A',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK013',
    'Sự kiện': 'Khởi nghĩa Lam Sơn toàn thắng',
    'Mốc thời gian': '1418–1428',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Lê Lợi và Nguyễn Trãi lãnh đạo 10 năm gian khổ đánh đuổi quân Minh xâm lược',
    'Ý nghĩa': 'Chấm dứt 20 năm đô hộ tàn bạo của nhà Minh, lập ra triều Hậu Lê',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK014',
    'Sự kiện': 'Chiến thắng Ngọc Hồi – Đống Đa',
    'Mốc thời gian': 'Mùng 5 Tết Kỷ Dậu 1789',
    'Mã giai đoạn': 'GD03',
    'Dữ kiện tóm tắt': 'Vua Quang Trung hành quân thần tốc đánh tan 29 vạn quân Mãn Thanh',
    'Ý nghĩa': 'Giữ vững độc lập, đập tan âm mưu thôn tính của ngoại bang',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK015',
    'Sự kiện': 'Liên quân Pháp – Tây Ban Nha tấn công Đà Nẵng',
    'Mốc thời gian': '1/9/1858',
    'Mã giai đoạn': 'GD04',
    'Dữ kiện tóm tắt': 'Thực dân Pháp nổ súng tại bán đảo Sơn Trà, mở đầu cuộc xâm lược Việt Nam',
    'Ý nghĩa': 'Bước ngoặt lịch sử cận đại, nhân dân đứng lên kháng chiến',
    'URL nguồn': 'https://baotanglichsu.vn/vi/Articles/4052/cuoc-djau-tranh-gianh-djoc-lap-cua-dan-toc-viet-nam-1858-1945',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK016',
    'Sự kiện': 'Phong trào Cần Vương bùng nổ',
    'Mốc thời gian': 'Năm 1885',
    'Mã giai đoạn': 'GD04',
    'Dữ kiện tóm tắt': 'Vua Hàm Nghi ban Chiếu Cần Vương kêu gọi nhân dân giúp vua cứu nước',
    'Ý nghĩa': 'Tiêu biểu cho tinh thần yêu nước quật cường chống thực dân Pháp',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK017',
    'Sự kiện': 'Nguyễn Tất Thành ra đi tìm đường cứu nước',
    'Mốc thời gian': '5/6/1911',
    'Mã giai đoạn': 'GD04',
    'Dữ kiện tóm tắt': 'Từ bến cảng Nhà Rồng, người thanh niên yêu nước lên tàu Amiral Latouche-Tréville bôn ba hải ngoại',
    'Ý nghĩa': 'Mốc quan trọng quyết định con đường giải phóng cho dân tộc Việt Nam',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK018',
    'Sự kiện': 'Đảng Cộng sản Việt Nam thành lập',
    'Mốc thời gian': '3/2/1930',
    'Mã giai đoạn': 'GD04',
    'Dữ kiện tóm tắt': 'Hội nghị thành lập Đảng do lãnh tụ Nguyễn Ái Quốc chủ trì tại Cửu Long (Hương Cảng)',
    'Ý nghĩa': 'Bước ngoặt vô cùng quan trọng, mở ra kỷ nguyên mới của cách mạng Việt Nam',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK019',
    'Sự kiện': 'Cách mạng tháng Tám toàn thắng',
    'Mốc thời gian': 'Tháng 8/1945',
    'Mã giai đoạn': 'GD04',
    'Dữ kiện tóm tắt': 'Tổng khởi nghĩa quần chúng lật đổ ách thống trị của thực dân và phát xít',
    'Ý nghĩa': 'Dẫn tới sự ra đời của nước Việt Nam Dân chủ Cộng hòa',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK020',
    'Sự kiện': 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập',
    'Mốc thời gian': '2/9/1945',
    'Mã giai đoạn': 'GD04',
    'Dữ kiện tóm tắt': 'Tại Quảng trường Ba Đình lịch sử, Bác Hồ đọc bản Tuyên ngôn Độc lập',
    'Ý nghĩa': 'Tuyên bố với thế giới nước Việt Nam có quyền hưởng tự do và độc lập',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK021',
    'Sự kiện': 'Toàn quốc kháng chiến bùng nổ',
    'Mốc thời gian': '19/12/1946',
    'Mã giai đoạn': 'GD05',
    'Dữ kiện tóm tắt': 'Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến bảo vệ nền độc lập non trẻ',
    'Ý nghĩa': 'Khẳng định ý chí quyết tử cho Tổ quốc quyết sinh',
    'URL nguồn': 'https://baotanglichsu.vn/vi/Articles/4055/cuoc-khang-chien-chong-thuc-dan-phap-1946-1954',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK022',
    'Sự kiện': 'Chiến dịch Biên giới Thu - Đông',
    'Mốc thời gian': 'Năm 1950',
    'Mã giai đoạn': 'GD05',
    'Dữ kiện tóm tắt': 'Chiến dịch tiến công lớn đầu tiên giải phóng dải biên giới phía Bắc',
    'Ý nghĩa': 'Quân ta giành quyền chủ động chiến lược trên chiến trường chính Bắc Bộ',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK023',
    'Sự kiện': 'Chiến thắng Điện Biên Phủ "Lừng lẫy năm châu"',
    'Mốc thời gian': '7/5/1954',
    'Mã giai đoạn': 'GD05',
    'Dữ kiện tóm tắt': 'Quân đội ta tiêu diệt hoàn toàn tập đoàn cứ điểm mạnh nhất Đông Dương của Pháp',
    'Ý nghĩa': 'Bước ngoặt đập tan ý chí xâm lược của thực dân Pháp',
    'URL nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-chien-truong-dien-bien-phu-bo-sung-23-diem-di-tich-1537',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK024',
    'Sự kiện': 'Ký kết Hiệp định Genève',
    'Mốc thời gian': '21/7/1954',
    'Mã giai đoạn': 'GD06',
    'Dữ kiện tóm tắt': 'Pháp công nhận độc lập, chủ quyền của Việt Nam; đất nước tạm chia cắt tại vĩ tuyến 17',
    'Ý nghĩa': 'Mở ra chặng đường đấu tranh thống nhất non sông',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK025',
    'Sự kiện': 'Tổng tiến công Tết Mậu Thân',
    'Mốc thời gian': 'Năm 1968',
    'Mã giai đoạn': 'GD06',
    'Dữ kiện tóm tắt': 'Quân và dân miền Nam đồng loạt tiến công vào sào huyệt đối phương',
    'Ý nghĩa': 'Làm lung lay ý chí xâm lược của đế quốc Mỹ, buộc Mỹ phải ngồi vào bàn đàm phán',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK026',
    'Sự kiện': 'Ký kết Hiệp định Paris',
    'Mốc thời gian': '27/1/1973',
    'Mã giai đoạn': 'GD06',
    'Dữ kiện tóm tắt': 'Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký kết',
    'Ý nghĩa': 'Mỹ buộc phải rút toàn bộ quân viễn chinh về nước',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK027',
    'Sự kiện': 'Chiến dịch Hồ Chí Minh lịch sử',
    'Mốc thời gian': '26–30/4/1975',
    'Mã giai đoạn': 'GD06',
    'Dữ kiện tóm tắt': 'Chiến dịch giải phóng Sài Gòn - Gia Định, đỉnh cao của cuộc Tổng tiến công mùa Xuân 1975',
    'Ý nghĩa': 'Giải phóng hoàn toàn miền Nam, thống nhất đất nước',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK028',
    'Sự kiện': 'Đại thắng Ngày 30/4/1975',
    'Mốc thời gian': '11 giờ 30 phút ngày 30/4/1975',
    'Mã giai đoạn': 'GD06',
    'Dữ kiện tóm tắt': 'Lá cờ Mặt trận Giải phóng tung bay trên nóc Dinh Độc Lập',
    'Ý nghĩa': 'Kết thúc vẻ vang 30 năm chiến tranh giải phóng dân tộc và bảo vệ Tổ quốc',
    'URL nguồn': 'https://baotanglichsu.vn/VI/Articles/3097/18025/ngay-djat-nuoc-thong-nhat-30-4-1975-voi-su-ra-djoi-cua-buc-anh-me-con-ngay-gap-mat.html',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK029',
    'Sự kiện': 'Thống nhất đất nước về mặt nhà nước',
    'Mốc thời gian': 'Năm 1976',
    'Mã giai đoạn': 'GD07',
    'Dữ kiện tóm tắt': 'Quốc hội khóa VI quyết định đặt tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    'Ý nghĩa': 'Hoàn thành trọn vẹn sự nghiệp thống nhất non sông về mặt pháp lý và nhà nước',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK030',
    'Sự kiện': 'Khởi đầu công cuộc Đổi mới',
    'Mốc thời gian': 'Tháng 12/1986',
    'Mã giai đoạn': 'GD08',
    'Dữ kiện tóm tắt': 'Đại hội đại biểu toàn quốc lần thứ VI của Đảng đề ra đường lối Đổi mới toàn diện',
    'Ý nghĩa': 'Mở ra thời kỳ phát triển kinh tế thị trường, nâng cao đời sống nhân dân',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK031',
    'Sự kiện': 'Việt Nam chính thức gia nhập ASEAN',
    'Mốc thời gian': '28/7/1995',
    'Mã giai đoạn': 'GD08',
    'Dữ kiện tóm tắt': 'Việt Nam trở thành thành viên thứ 7 của Hiệp hội các quốc gia Đông Nam Á',
    'Ý nghĩa': 'Mốc son đánh dấu bước tiến hội nhập khu vực và hòa bình',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'SK032',
    'Sự kiện': 'Việt Nam gia nhập Tổ chức Thương mại Thế giới (WTO)',
    'Mốc thời gian': '11/1/2007',
    'Mã giai đoạn': 'GD08',
    'Dữ kiện tóm tắt': 'Việt Nam chính thức trở thành thành viên thứ 150 của WTO',
    'Ý nghĩa': 'Mốc hội nhập kinh tế quốc tế sâu rộng, nâng cao vị thế dân tộc',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  }
];

export const USER_FIGURES: UserFigure[] = [
  {
    Mã: 'NV01',
    'Nhân vật': 'Các Vua Hùng',
    'Giai đoạn': 'GD01',
    'Đóng góp/sự kiện': 'Thời đại dựng nước Văn Lang, khai sinh giống nòi',
    'Địa danh liên quan': 'Khu di tích Đền Hùng (Phú Thọ)',
    'Ghi chú loại hình': 'Hình tượng lịch sử – truyền thống; cần phân biệt truyền thuyết',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV02',
    'Nhân vật': 'An Dương Vương (Thục Phán)',
    'Giai đoạn': 'GD01',
    'Đóng góp/sự kiện': 'Dựng nước Âu Lạc, xây thành Cổ Loa, chế tạo nỏ thần',
    'Địa danh liên quan': 'Thành Cổ Loa (Đông Anh, Hà Nội)',
    'Ghi chú loại hình': 'Nhiều chi tiết gắn với truyền thuyết và khảo cổ thực tế',
    'URL nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-kien-truc-nghe-thuat-va-khao-co-co-loa-2958',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV03',
    'Nhân vật': 'Hai Bà Trưng (Trưng Trắc & Trưng Nhị)',
    'Giai đoạn': 'GD02',
    'Đóng góp/sự kiện': 'Khởi nghĩa năm 40 đánh đuổi thái thú Tô Định',
    'Địa danh liên quan': 'Đền thờ Hai Bà Trưng (Mê Linh, Hà Nội)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV04',
    'Nhân vật': 'Bà Triệu (Triệu Thị Trinh)',
    'Giai đoạn': 'GD02',
    'Đóng góp/sự kiện': 'Khởi nghĩa năm 248 chống quân Đông Ngô',
    'Địa danh liên quan': 'Khu di tích Đền Bà Triệu (Hậu Lộc, Thanh Hóa)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV05',
    'Nhân vật': 'Lý Bí (Lý Nam Đế)',
    'Giai đoạn': 'GD02',
    'Đóng góp/sự kiện': 'Khởi nghĩa năm 542, lập nước Vạn Xuân năm 544',
    'Địa danh liên quan': 'Chùa Trấn Quốc (Hà Nội), đền thờ Lý Nam Đế',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV06',
    'Nhân vật': 'Mai Thúc Loan (Mai Hắc Đế)',
    'Giai đoạn': 'GD02',
    'Đóng góp/sự kiện': 'Lãnh đạo khởi nghĩa Hoan Châu năm 713 chống ách đô hộ nhà Đường',
    'Địa danh liên quan': 'Khu di tích Vua Mai Hắc Đế (Nam Đàn, Nghệ An)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV07',
    'Nhân vật': 'Phùng Hưng (Bố Cái Đại Vương)',
    'Giai đoạn': 'GD02',
    'Đóng góp/sự kiện': 'Đấu tranh chống đô hộ nhà Đường, bao vây thành Tống Bình',
    'Địa danh liên quan': 'Đình Phùng Hưng (Đường Lâm, Sơn Tây, Hà Nội)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV08',
    'Nhân vật': 'Ngô Quyền',
    'Giai đoạn': 'GD02',
    'Đóng góp/sự kiện': 'Chỉ huy Chiến thắng Bạch Đằng năm 938, xưng vương mở nền độc lập',
    'Địa danh liên quan': 'Lăng Ngô Quyền (Đường Lâm), Di tích Bạch Đằng',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi/Articles/3098/13934/ngo-quyen-va-chienthang-bach-dang-nam-938.html',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV09',
    'Nhân vật': 'Đinh Bộ Lĩnh (Đinh Tiên Hoàng)',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Dẹp loạn 12 sứ quân, thống nhất đất nước năm 968, lập nước Đại Cồ Việt',
    'Địa danh liên quan': 'Cố đô Hoa Lư (Ninh Bình)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV10',
    'Nhân vật': 'Lê Hoàn (Lê Đại Hành)',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Lãnh đạo kháng chiến chống quân Tống xâm lược thắng lợi năm 981',
    'Địa danh liên quan': 'Đền vua Lê Đại Hành (Hoa Lư, Ninh Bình)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV11',
    'Nhân vật': 'Lý Công Uẩn (Lý Thái Tổ)',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Sáng lập triều Lý, ban Chiếu dời đô về Thăng Long năm 1010',
    'Địa danh liên quan': 'Tượng đài Lý Thái Tổ, Hoàng thành Thăng Long (Hà Nội)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV12',
    'Nhân vật': 'Lý Thường Kiệt',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Đánh tan quân Tống trên phòng tuyến sông Như Nguyệt, vang danh Nam quốc sơn hà',
    'Địa danh liên quan': 'Đền thờ Lý Thường Kiệt (Yên Phong, Bắc Ninh)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV13',
    'Nhân vật': 'Trần Quốc Tuấn (Hưng Đạo Đại vương)',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Chỉ huy quân dân ba lần đại thắng quân Mông – Nguyên, soạn Hịch tướng sĩ',
    'Địa danh liên quan': 'Khu di tích Kiếp Bạc (Hải Dương), Đền Trần (Nam Định)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV14',
    'Nhân vật': 'Trần Nhân Tông (Phật hoàng)',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Hai lần lãnh đạo kháng chiến chống Nguyên Mông, sáng lập Thiền phái Trúc Lâm',
    'Địa danh liên quan': 'Khu di tích danh thắng Yên Tử (Quảng Ninh)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV15',
    'Nhân vật': 'Lê Lợi (Lê Thái Tổ)',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Lãnh tụ Khởi nghĩa Lam Sơn, đánh đuổi giặc Minh, lập nên nhà Hậu Lê',
    'Địa danh liên quan': 'Khu di tích Lam Kinh (Thanh Hóa), Hồ Hoàn Kiếm (Hà Nội)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV16',
    'Nhân vật': 'Nguyễn Trãi (Ức Trai)',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Quân sư khởi nghĩa Lam Sơn, Danh nhân văn hóa thế giới, tác giả Bình Ngô đại cáo',
    'Địa danh liên quan': 'Khu di tích Côn Sơn (Hải Dương)',
    'Ghi chú loại hình': 'Nhân vật lịch sử – văn hóa đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV17',
    'Nhân vật': 'Quang Trung – Nguyễn Huệ',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Vị anh hùng áo vải cờ đào, đại phá 29 vạn quân Thanh năm 1789',
    'Địa danh liên quan': 'Gò Đống Đa (Hà Nội), Bảo tàng Quang Trung (Bình Định)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV18',
    'Nhân vật': 'Đại thi hào Nguyễn Du',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Danh nhân văn hóa thế giới, tác giả kiệt tác Truyện Kiều',
    'Địa danh liên quan': 'Khu lưu niệm Nguyễn Du (Nghi Xuân, Hà Tĩnh)',
    'Ghi chú loại hình': 'Nhân vật văn hóa đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV19',
    'Nhân vật': 'Gia Long (Nguyễn Ánh)',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Thành lập triều Nguyễn năm 1802, thống nhất giang sơn từ Nam chí Bắc',
    'Địa danh liên quan': 'Lăng Gia Long, Quần thể di tích Cố đô Huế',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV20',
    'Nhân vật': 'Minh Mạng',
    'Giai đoạn': 'GD03',
    'Đóng góp/sự kiện': 'Tiến hành cải cách hành chính sâu rộng, chia cả nước thành 30 tỉnh và 1 phủ',
    'Địa danh liên quan': 'Lăng Minh Mạng (Cố đô Huế)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV21',
    'Nhân vật': 'Trương Định (Bình Tây Đại nguyên soái)',
    'Giai đoạn': 'GD04',
    'Đóng góp/sự kiện': 'Lãnh đạo phong trào kháng chiến chống thực dân Pháp ở Nam Bộ',
    'Địa danh liên quan': 'Đền thờ Trương Định (Gò Công, Tiền Giang)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV22',
    'Nhân vật': 'Nguyễn Trung Trực',
    'Giai đoạn': 'GD04',
    'Đóng góp/sự kiện': 'Đốt tàu Pháp trên sông Vàm Cỏ Đông với câu nói: "Bao giờ người Tây nhổ hết cỏ nước Nam..."',
    'Địa danh liên quan': 'Đền thờ Nguyễn Trung Trực (Rạch Giá, Kiên Giang)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV23',
    'Nhân vật': 'Phan Đình Phùng',
    'Giai đoạn': 'GD04',
    'Đóng góp/sự kiện': 'Thủ lĩnh khởi nghĩa Hương Khê - cuộc khởi nghĩa tiêu biểu nhất trong phong trào Cần Vương',
    'Địa danh liên quan': 'Khu di tích Phan Đình Phùng (Hà Tĩnh)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV24',
    'Nhân vật': 'Phan Bội Châu',
    'Giai đoạn': 'GD04',
    'Đóng góp/sự kiện': 'Khởi xướng phong trào Đông Du, lãnh đạo Việt Nam Quang phục hội',
    'Địa danh liên quan': 'Khu lưu niệm Phan Bội Châu (Nam Đàn, Nghệ An)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV25',
    'Nhân vật': 'Phan Châu Trinh',
    'Giai đoạn': 'GD04',
    'Đóng góp/sự kiện': 'Chủ xướng phong trào Duy Tân với chủ trương "Khai dân trí, chấn dân khí, hậu dân sinh"',
    'Địa danh liên quan': 'Khu lưu niệm Phan Châu Trinh (Quảng Nam)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV26',
    'Nhân vật': 'Chủ tịch Hồ Chí Minh (Bác Hồ)',
    'Giai đoạn': 'GD04–GD06',
    'Đóng góp/sự kiện': 'Lãnh tụ vĩ đại của dân tộc Việt Nam, Danh nhân văn hóa kiệt xuất, khai sinh nước Việt Nam Dân chủ Cộng hòa',
    'Địa danh liên quan': 'Lăng Chủ tịch Hồ Chí Minh, Bảo tàng Hồ Chí Minh, Khu di tích Kim Liên',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV27',
    'Nhân vật': 'Đại tướng Võ Nguyên Giáp',
    'Giai đoạn': 'GD05–GD06',
    'Đóng góp/sự kiện': 'Tổng Tư lệnh Quân đội Nhân dân Việt Nam, chỉ huy chiến thắng Điện Biên Phủ và Chiến dịch Hồ Chí Minh',
    'Địa danh liên quan': 'Khu di tích Mường Phăng (Điện Biên), Vũng Chùa – Đảo Yến (Quảng Bình)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'NV28',
    'Nhân vật': 'Nữ tướng Nguyễn Thị Định',
    'Giai đoạn': 'GD06',
    'Đóng góp/sự kiện': 'Nữ tướng đầu tiên của Quân đội ta, lãnh đạo phong trào Đồng Khởi Bến Tre và Đội quân tóc dài',
    'Địa danh liên quan': 'Khu lưu niệm Nguyễn Thị Định (Giồng Trôm, Bến Tre)',
    'Ghi chú loại hình': 'Nhân vật lịch sử đã xác minh',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  }
];

export const USER_RELICS: UserRelic[] = [
  {
    Mã: 'DT01',
    'Tên di tích': 'Khu di tích lịch sử Đền Hùng',
    'Địa điểm': 'Núi Nghĩa Lĩnh, Việt Trì, Phú Thọ',
    'Giai đoạn': 'GD01',
    'Giá trị liên quan': 'Di tích quốc gia đặc biệt, cội nguồn tín ngưỡng thờ cúng Hùng Vương',
    'URL nguồn': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT02',
    'Tên di tích': 'Thành Cổ Loa',
    'Địa điểm': 'Đông Anh, Hà Nội',
    'Giai đoạn': 'GD01',
    'Giá trị liên quan': 'Di tích khảo cổ học và tòa thành quân sự xoắn ốc độc đáo thời Âu Lạc',
    'URL nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-kien-truc-nghe-thuat-va-khao-co-co-loa-2958',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT03',
    'Tên di tích': 'Khu di tích lịch sử Bạch Đằng',
    'Địa điểm': 'Quảng Yên (Quảng Ninh) & Thủy Nguyên (Hải Phòng)',
    'Giai đoạn': 'GD02',
    'Giá trị liên quan': 'Gắn với các chiến thắng hiển hách trên sông Bạch Đằng (938, 981, 1288)',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT04',
    'Tên di tích': 'Khu Trung tâm Hoàng thành Thăng Long',
    'Địa điểm': 'Ba Đình, Hà Nội',
    'Giai đoạn': 'GD03',
    'Giá trị liên quan': 'Di sản văn hóa thế giới, trung tâm quyền lực nối tiếp qua 13 thế kỷ',
    'URL nguồn': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT05',
    'Tên di tích': 'Văn Miếu – Quốc Tử Giám',
    'Địa điểm': 'Đống Đa, Hà Nội',
    'Giai đoạn': 'GD03',
    'Giá trị liên quan': 'Trường đại học đầu tiên, 82 bia tiến sĩ được UNESCO ghi danh là Di sản tư liệu thế giới',
    'URL nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT06',
    'Tên di tích': 'Quần thể Di tích Cố đô Huế',
    'Địa điểm': 'Thành phố Huế, Thừa Thiên Huế',
    'Giai đoạn': 'GD03',
    'Giá trị liên quan': 'Di sản văn hóa thế giới đầu tiên của Việt Nam, kinh đô triều Nguyễn (1802-1945)',
    'URL nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-quan-the-kien-truc-co-do-hue-2944',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT07',
    'Tên di tích': 'Quảng trường Ba Đình',
    'Địa điểm': 'Ba Đình, Hà Nội',
    'Giai đoạn': 'GD04',
    'Giá trị liên quan': 'Nơi Bác Hồ đọc Tuyên ngôn Độc lập ngày 2/9/1945, trung tâm chính trị của cả nước',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT08',
    'Tên di tích': 'Chiến trường Điện Biên Phủ',
    'Địa điểm': 'TP. Điện Biên Phủ, tỉnh Điện Biên',
    'Giai đoạn': 'GD05',
    'Giá trị liên quan': 'Di tích quốc gia đặc biệt với Đồi A1, Hầm De Castries, Tượng đài Chiến thắng',
    'URL nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-chien-truong-dien-bien-phu-bo-sung-23-diem-di-tich-1537',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT09',
    'Tên di tích': 'Dinh Độc Lập (Dinh Thống Nhất)',
    'Địa điểm': 'Quận 1, TP. Hồ Chí Minh',
    'Giai đoạn': 'GD06',
    'Giá trị liên quan': 'Chứng nhân lịch sử trưa ngày 30/4/1975, biểu tượng non sông trọn niềm vui thống nhất',
    'URL nguồn': 'https://baotanglichsu.vn/vi',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'DT10',
    'Tên di tích': 'Địa đạo Củ Chi',
    'Địa điểm': 'Huyện Củ Chi, TP. Hồ Chí Minh',
    'Giai đoạn': 'GD06',
    'Giá trị liên quan': 'Kỳ quan nghệ thuật quân sự độc đáo trong lòng đất dài hơn 250km',
    'URL nguồn': 'https://dsvh.gov.vn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  }
];

export const USER_LEGENDS: UserLegend[] = [
  {
    Mã: 'TT01',
    'Tên truyền thuyết': 'Con Rồng cháu Tiên',
    'Giai đoạn': 'GD01',
    'Nội dung liên hệ': 'Giải thích cội nguồn thiêng liêng của dân tộc Việt Nam (Lạc Long Quân và Âu Cơ)',
    'Lưu ý phân biệt': 'Không trình bày yếu tố thần kì như sự kiện thật; giáo dục tinh thần đồng bào keo sơn',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'TT02',
    'Tên truyền thuyết': 'Bánh chưng, bánh giầy',
    'Giai đoạn': 'GD01',
    'Nội dung liên hệ': 'Hoàng tử Lang Liêu làm bánh dâng cúng tổ tiên, phản ánh nền văn minh nông nghiệp lúa nước',
    'Lưu ý phân biệt': 'Phân biệt giữa câu chuyện văn hóa đạo lý và bằng chứng lịch sử khảo cổ',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'TT03',
    'Tên truyền thuyết': 'Sơn Tinh – Thủy Tinh',
    'Giai đoạn': 'GD01',
    'Nội dung liên hệ': 'Phản ánh công cuộc đắp đê chống lũ lụt hàng năm của tổ tiên người Việt ven sông Hồng',
    'Lưu ý phân biệt': 'Các yếu tố thần thông biến hóa thuộc về trí tưởng tượng dân gian',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'TT04',
    'Tên truyền thuyết': 'Thánh Gióng (Phù Đổng Thiên Vương)',
    'Giai đoạn': 'GD01',
    'Nội dung liên hệ': 'Biểu tượng của sức mạnh quật cường chống giặc ngoại xâm của tuổi trẻ Việt Nam',
    'Lưu ý phân biệt': 'Không coi chi tiết thần kì (nhổ tre đánh giặc, bay về trời) là sự kiện quân sự thực tế',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'TT05',
    'Tên truyền thuyết': 'An Dương Vương và Mị Châu – Trọng Thủy',
    'Giai đoạn': 'GD01',
    'Nội dung liên hệ': 'Gắn với ký ức văn hóa về thành Cổ Loa, bài học cảnh giác bảo vệ non sông đất nước',
    'Lưu ý phân biệt': 'Cần tách biệt giữa sử liệu thành lũy, mũi tên đồng thực tế với chuyện nỏ thần rùa vàng hư cấu',
    'Trạng thái': 'Chờ giáo viên duyệt'
  },
  {
    Mã: 'TT06',
    'Tên truyền thuyết': 'Sự tích Hồ Gươm (Hồ Hoàn Kiếm)',
    'Giai đoạn': 'GD03',
    'Nội dung liên hệ': 'Truyền thuyết Rùa Vàng đòi gươm báu gắn với cuộc kháng chiến Lam Sơn thắng lợi của vua Lê Thái Tổ',
    'Lưu ý phân biệt': 'Phân biệt ý nghĩa khát vọng hòa bình của truyền thuyết với diễn biến 10 năm chiến đấu gian khổ',
    'Trạng thái': 'Chờ giáo viên duyệt'
  }
];

export const USER_IMAGE_CATALOG: UserImageProposal[] = [
  {
    Mã: 'HA01',
    'Hình ảnh đề xuất': 'Trống đồng Ngọc Lũ',
    'Loại tư liệu': 'Hiện vật bảo tàng',
    'Giai đoạn': 'GD01',
    'Cơ quan cung cấp': 'Bảo tàng Lịch sử quốc gia',
    'URL trang nguồn': 'https://baotanglichsu.vn/vi/Articles/1001/19707/bao-vat-quoc-gia-viet-nam-trong-djong-ngoc-lu.html',
    'URL ảnh trực tiếp': null,
    'Quyền sử dụng': 'Chưa xác minh quyền',
    'Trạng thái': 'Chưa tải ảnh / Chờ duyệt'
  },
  {
    Mã: 'HA02',
    'Hình ảnh đề xuất': 'Thành Cổ Loa',
    'Loại tư liệu': 'Ảnh di tích',
    'Giai đoạn': 'GD01',
    'Cơ quan cung cấp': 'Cục Di sản văn hóa',
    'URL trang nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-kien-truc-nghe-thuat-va-khao-co-co-loa-2958',
    'URL ảnh trực tiếp': null,
    'Quyền sử dụng': 'Chưa xác minh quyền',
    'Trạng thái': 'Chưa tải ảnh / Chờ duyệt'
  },
  {
    Mã: 'HA03',
    'Hình ảnh đề xuất': 'Văn Miếu – Quốc Tử Giám',
    'Loại tư liệu': 'Ảnh di tích',
    'Giai đoạn': 'GD03',
    'Cơ quan cung cấp': 'Cục Di sản văn hóa',
    'URL trang nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953',
    'URL ảnh trực tiếp': null,
    'Quyền sử dụng': 'Chưa xác minh quyền',
    'Trạng thái': 'Chưa tải ảnh / Chờ duyệt'
  },
  {
    Mã: 'HA04',
    'Hình ảnh đề xuất': 'Quần thể Cố đô Huế',
    'Loại tư liệu': 'Ảnh di tích',
    'Giai đoạn': 'GD03',
    'Cơ quan cung cấp': 'Cục Di sản văn hóa',
    'URL trang nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-quan-the-kien-truc-co-do-hue-2944',
    'URL ảnh trực tiếp': null,
    'Quyền sử dụng': 'Chưa xác minh quyền',
    'Trạng thái': 'Chưa tải ảnh / Chờ duyệt'
  },
  {
    Mã: 'HA05',
    'Hình ảnh đề xuất': 'Chiến trường Điện Biên Phủ',
    'Loại tư liệu': 'Ảnh di tích/hiện vật',
    'Giai đoạn': 'GD05',
    'Cơ quan cung cấp': 'Cục Di sản văn hóa',
    'URL trang nguồn': 'https://dsvh.gov.vn/di-tich-lich-su-chien-truong-dien-bien-phu-bo-sung-23-diem-di-tich-1537',
    'URL ảnh trực tiếp': null,
    'Quyền sử dụng': 'Chưa xác minh quyền',
    'Trạng thái': 'Chưa tải ảnh / Chờ duyệt'
  },
  {
    Mã: 'HA06',
    'Hình ảnh đề xuất': 'Ảnh Mẹ con ngày gặp mặt',
    'Loại tư liệu': 'Ảnh tư liệu',
    'Giai đoạn': 'GD06',
    'Cơ quan cung cấp': 'Bảo tàng Lịch sử quốc gia',
    'URL trang nguồn': 'https://baotanglichsu.vn/VI/Articles/3097/18025/ngay-djat-nuoc-thong-nhat-30-4-1975-voi-su-ra-djoi-cua-buc-anh-me-con-ngay-gap-mat.html',
    'URL ảnh trực tiếp': null,
    'Quyền sử dụng': 'Chưa xác minh quyền',
    'Trạng thái': 'Chưa tải ảnh / Chờ duyệt'
  },
  {
    Mã: 'HA07',
    'Hình ảnh đề xuất': 'Hiện vật thời bao cấp',
    'Loại tư liệu': 'Hiện vật',
    'Giai đoạn': 'GD07',
    'Cơ quan cung cấp': 'Bảo tàng Lịch sử quốc gia',
    'URL trang nguồn': 'https://baotanglichsu.vn/vi/Articles/4087/hien-vat-thoi-ky-bao-cap-truoc-nam-1985',
    'URL ảnh trực tiếp': null,
    'Quyền sử dụng': 'Chưa xác minh quyền',
    'Trạng thái': 'Chưa tải ảnh / Chờ duyệt'
  }
];

export const USER_OFFICIAL_SOURCES: UserOfficialSource[] = [
  {
    Mã: 'NG01',
    'Nguồn/tổ chức': 'Bảo tàng Lịch sử quốc gia',
    URL: 'https://baotanglichsu.vn/vi',
    'Phạm vi tư liệu': 'Bài nghiên cứu; hiện vật bảo vật quốc gia; ảnh tư liệu lịch sử',
    'Lưu ý': 'Cần kiểm tra từng trang và điều kiện quyền sử dụng'
  },
  {
    Mã: 'NG02',
    'Nguồn/tổ chức': 'Cục Di sản văn hóa',
    URL: 'https://dsvh.gov.vn',
    'Phạm vi tư liệu': 'Di tích quốc gia đặc biệt; hồ sơ di sản văn hóa vật thể và phi vật thể',
    'Lưu ý': 'Cơ quan quản lý nhà nước về di sản của Bộ Văn hóa, Thể thao và Du lịch'
  },
  {
    Mã: 'NG03',
    'Nguồn/tổ chức': 'Bộ Giáo dục và Đào tạo',
    URL: 'https://moet.gov.vn',
    'Phạm vi tư liệu': 'Chương trình Giáo dục phổ thông 2018; chuẩn kiến thức kĩ năng môn Lịch sử và Địa lí 4–5',
    'Lưu ý': 'Căn cứ sư phạm cốt lõi cho mọi bài giảng'
  },
  {
    Mã: 'NG04',
    'Nguồn/tổ chức': 'Danh mục di tích quốc gia đặc biệt',
    URL: 'https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752',
    'Phạm vi tư liệu': 'Danh mục các di tích lịch sử và danh lam thắng cảnh xếp hạng cấp quốc gia đặc biệt',
    'Lưu ý': 'Hồ sơ pháp lý di tích chính thống'
  },
  {
    Mã: 'NG05',
    'Nguồn/tổ chức': 'Trưng bày Ngô – Đinh – Tiền Lê',
    URL: 'https://baotanglichsu.vn/vi/Articles/4046/trieu-ngo-djinh-tien-le-939-1009',
    'Phạm vi tư liệu': 'Lịch sử 939–1009; hiện vật khảo cổ Cổ Loa, Hoa Lư',
    'Lưu ý': 'Bảo tàng Lịch sử quốc gia biên soạn'
  },
  {
    Mã: 'NG06',
    'Nguồn/tổ chức': 'Kháng chiến chống thực dân Pháp (1946–1954)',
    URL: 'https://baotanglichsu.vn/vi/Articles/4055/cuoc-khang-chien-chong-thuc-dan-phap-1946-1954',
    'Phạm vi tư liệu': 'Lịch sử 1946–1954; các chiến dịch Việt Bắc, Biên giới, Điện Biên Phủ',
    'Lưu ý': 'Tư liệu lưu trữ quốc gia'
  },
  {
    Mã: 'NG07',
    'Nguồn/tổ chức': 'Tư liệu ảnh thống nhất và Đổi mới',
    URL: 'https://baotanglichsu.vn/vi/Articles/4107/69008/anh-tu-lieu.html',
    'Phạm vi tư liệu': 'Ảnh giai đoạn hiện đại từ năm 1975 đến nay',
    'Lưu ý': 'Bảo tàng Lịch sử quốc gia lưu trữ'
  }
];
