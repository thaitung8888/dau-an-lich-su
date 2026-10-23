import {
  OfficialHistoryDataset,
  DatasetGiaiDoan,
  DatasetSuKien,
  DatasetNhanVat,
  DatasetDiTich,
  DatasetTruyenThuyet,
  DatasetHinhAnh,
  DatasetNguonTuLieu
} from '../types';

// Raw data imported directly from the user's provided official history dataset
export const OFFICIAL_DATASET: OfficialHistoryDataset = {
  "ten_bo_tu_lieu": "DẤU ẤN NON SÔNG – Kho tư liệu Lịch sử Việt Nam",
  "muc_dich": "Dữ liệu văn bản tiếng Việt phục vụ nhập vào Google AI Studio để xây dựng website giáo dục lịch sử.",
  "ghi_chu_kiem_chung": "Nội dung chuyển nguyên từ bảng tính; trạng thái duyệt và giới hạn về nguồn, hình ảnh giữ theo bảng gốc. Không mặc định mọi chi tiết đã được giáo viên thẩm định.",
  "huong_dan_goc": [
    { "cot_1": "BỘ DỮ LIỆU NỀN – DẤU ẤN NON SÔNG", "cot_2": null },
    { "cot_1": "Mục đích", "cot_2": "Biên tập kiến thức Lịch sử Việt Nam cho học sinh lớp 4–5 và chuẩn bị nhập website." },
    { "cot_1": "Phạm vi", "cot_2": "Tổng hợp các dữ kiện tiêu biểu từ nội dung đã trao đổi; KHÔNG phải cơ sở dữ liệu hoàn chỉnh." },
    { "cot_1": "Quan trọng", "cot_2": "Nguồn URL là đường dẫn tham khảo, chưa thay thế việc kiểm chứng từng chi tiết bởi giáo viên." },
    { "cot_1": "Hình ảnh", "cot_2": "Sheet Hình ảnh chỉ chứa DANH MỤC và link trang nguồn; chưa nhúng ảnh, chưa xác minh giấy phép sao chép." },
    { "cot_1": "Ngày tạo", "cot_2": "20/10/2026" },
    { "cot_1": null, "cot_2": null },
    { "cot_1": "HƯỚNG DẪN", "cot_2": null },
    { "cot_1": "1", "cot_2": "Lọc theo Mã giai đoạn để liên kết sự kiện – nhân vật – di tích – hình ảnh." },
    { "cot_1": "2", "cot_2": "Duyệt nguồn và nội dung trước khi chuyển trạng thái sang 'Đã duyệt'." },
    { "cot_1": "3", "cot_2": "Với hình ảnh, thêm URL file gốc và giấy phép rõ ràng trước khi đăng tải." },
    { "cot_1": "4", "cot_2": "Bổ sung nội dung SGK theo từng bài; không tự động coi toàn bộ dòng dữ liệu đã đạt chuẩn SGK." },
    { "cot_1": "5", "cot_2": "Nhập Firebase từng nhóm bảng sau khi đã rà soát." }
  ],
  "giai_doan": [
    {
      "Mã": "GD01",
      "Tên giai đoạn": "Tiền sử và buổi đầu dựng nước",
      "Thời gian": "Trước thế kỉ II TCN",
      "Nội dung tiêu biểu": "Văn hóa Đông Sơn; Văn Lang; Âu Lạc",
      "Nhân vật": "Vua Hùng; An Dương Vương",
      "Di tích/hiện vật": "Trống Ngọc Lũ; Cổ Loa; Đền Hùng",
      "Nguồn tham khảo": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "GD02",
      "Tên giai đoạn": "Bắc thuộc và đấu tranh giành tự chủ",
      "Thời gian": "179 TCN–938",
      "Nội dung tiêu biểu": "Hai Bà Trưng; Bà Triệu; Lý Bí; họ Khúc; Bạch Đằng 938",
      "Nhân vật": "Hai Bà Trưng; Ngô Quyền",
      "Di tích/hiện vật": "Di tích Bạch Đằng",
      "Nguồn tham khảo": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "GD03",
      "Tên giai đoạn": "Các triều đại quân chủ độc lập",
      "Thời gian": "939–1858",
      "Nội dung tiêu biểu": "Ngô; Đinh; Tiền Lê; Lý; Trần; Hồ; Lê; Mạc; Tây Sơn; Nguyễn",
      "Nhân vật": "Đinh Bộ Lĩnh; Lý Công Uẩn; Trần Quốc Tuấn; Quang Trung",
      "Di tích/hiện vật": "Hoàng thành Thăng Long; Văn Miếu; Cố đô Huế",
      "Nguồn tham khảo": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "GD04",
      "Tên giai đoạn": "Chống thực dân Pháp và giành độc lập",
      "Thời gian": "1858–1945",
      "Nội dung tiêu biểu": "Phong trào Cần Vương; Đông Du; thành lập Đảng 1930; Cách mạng tháng Tám",
      "Nhân vật": "Trương Định; Phan Bội Châu; Hồ Chí Minh",
      "Di tích/hiện vật": "Quảng trường Ba Đình",
      "Nguồn tham khảo": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "GD05",
      "Tên giai đoạn": "Kháng chiến chống thực dân Pháp",
      "Thời gian": "1945–1954",
      "Nội dung tiêu biểu": "Toàn quốc kháng chiến; Biên giới 1950; Điện Biên Phủ 1954",
      "Nhân vật": "Hồ Chí Minh; Võ Nguyên Giáp",
      "Di tích/hiện vật": "Chiến trường Điện Biên Phủ",
      "Nguồn tham khảo": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "GD06",
      "Tên giai đoạn": "Đấu tranh thống nhất đất nước",
      "Thời gian": "1954–1975",
      "Nội dung tiêu biểu": "Hiệp định Paris; Đại thắng mùa Xuân; 30/4/1975",
      "Nhân vật": "Võ Nguyên Giáp; Nguyễn Thị Định",
      "Di tích/hiện vật": "Dinh Độc Lập",
      "Nguồn tham khảo": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "GD07",
      "Tên giai đoạn": "Thống nhất và xây dựng đất nước",
      "Thời gian": "1975–1986",
      "Nội dung tiêu biểu": "Thống nhất về mặt nhà nước năm 1976; tái thiết, bảo vệ đất nước",
      "Nhân vật": "Nhân dân Việt Nam",
      "Di tích/hiện vật": "Tư liệu đời sống thời bao cấp",
      "Nguồn tham khảo": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "GD08",
      "Tên giai đoạn": "Đổi mới và hội nhập",
      "Thời gian": "1986–nay",
      "Nội dung tiêu biểu": "Đổi mới 1986; gia nhập ASEAN 1995; gia nhập WTO 2007",
      "Nhân vật": "Nhân dân Việt Nam",
      "Di tích/hiện vật": "Hình ảnh Việt Nam thời kỳ phát triển",
      "Nguồn tham khảo": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Cần nguồn bổ sung"
    }
  ],
  "su_kien": [
    {
      "Mã": "SK001",
      "Sự kiện": "Văn Lang hình thành",
      "Mốc thời gian": "Khoảng thế kỉ VII TCN",
      "Mã giai đoạn": "GD01",
      "Dữ kiện tóm tắt": "Gắn với thời đại các Vua Hùng",
      "Ý nghĩa": "Bước đầu hình thành nhà nước sơ khai",
      "URL nguồn": "https://baotanglichsu.vn/vi/Articles/1001/19707/bao-vat-quoc-gia-viet-nam-trong-djong-ngoc-lu.html",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK002",
      "Sự kiện": "Khởi nghĩa Hai Bà Trưng",
      "Mốc thời gian": "40",
      "Mã giai đoạn": "GD02",
      "Dữ kiện tóm tắt": "Hai Bà Trưng lãnh đạo khởi nghĩa",
      "Ý nghĩa": "Thể hiện ý chí đấu tranh giành độc lập",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK003",
      "Sự kiện": "Khởi nghĩa Bà Triệu",
      "Mốc thời gian": "248",
      "Mã giai đoạn": "GD02",
      "Dữ kiện tóm tắt": "Bà Triệu nổi dậy chống ách đô hộ",
      "Ý nghĩa": "Tiêu biểu cho tinh thần đấu tranh",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK004",
      "Sự kiện": "Khởi nghĩa Lý Bí",
      "Mốc thời gian": "542",
      "Mã giai đoạn": "GD02",
      "Dữ kiện tóm tắt": "Lý Bí khởi nghĩa",
      "Ý nghĩa": "Tiền đề thành lập nhà nước Vạn Xuân",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK005",
      "Sự kiện": "Chiến thắng Bạch Đằng",
      "Mốc thời gian": "938",
      "Mã giai đoạn": "GD02",
      "Dữ kiện tóm tắt": "Ngô Quyền đánh bại quân Nam Hán",
      "Ý nghĩa": "Mở ra thời kì độc lập tự chủ",
      "URL nguồn": "https://baotanglichsu.vn/vi/Articles/3098/13934/ngo-quyen-va-chienthang-bach-dang-nam-938.html",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK006",
      "Sự kiện": "Ngô Quyền xưng vương",
      "Mốc thời gian": "939",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Thiết lập chính quyền tự chủ",
      "Ý nghĩa": "Củng cố nền độc lập",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK007",
      "Sự kiện": "Đinh Bộ Lĩnh thống nhất đất nước",
      "Mốc thời gian": "968",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Thống nhất sau loạn 12 sứ quân",
      "Ý nghĩa": "Thành lập nhà Đinh, quốc hiệu Đại Cồ Việt",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK008",
      "Sự kiện": "Kháng chiến chống Tống",
      "Mốc thời gian": "981",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Gắn với Lê Hoàn",
      "Ý nghĩa": "Bảo vệ nền độc lập",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK009",
      "Sự kiện": "Dời đô ra Thăng Long",
      "Mốc thời gian": "1010",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Lý Công Uẩn dời đô",
      "Ý nghĩa": "Thăng Long trở thành trung tâm chính trị quan trọng",
      "URL nguồn": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK010",
      "Sự kiện": "Dựng Văn Miếu",
      "Mốc thời gian": "1070",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Xây dựng Văn Miếu",
      "Ý nghĩa": "Biểu tượng truyền thống giáo dục",
      "URL nguồn": "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK011",
      "Sự kiện": "Thành lập Quốc Tử Giám",
      "Mốc thời gian": "1076",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Cơ sở giáo dục thời Lý",
      "Ý nghĩa": "Gắn với lịch sử giáo dục Việt Nam",
      "URL nguồn": "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK012",
      "Sự kiện": "Ba lần kháng chiến chống Mông – Nguyên",
      "Mốc thời gian": "Thế kỉ XIII",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Thời Trần",
      "Ý nghĩa": "Bảo vệ độc lập và chủ quyền",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK013",
      "Sự kiện": "Khởi nghĩa Lam Sơn thắng lợi",
      "Mốc thời gian": "1427–1428",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Gắn với Lê Lợi, Nguyễn Trãi",
      "Ý nghĩa": "Chấm dứt sự đô hộ của nhà Minh",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK014",
      "Sự kiện": "Chiến thắng Ngọc Hồi – Đống Đa",
      "Mốc thời gian": "1789",
      "Mã giai đoạn": "GD03",
      "Dữ kiện tóm tắt": "Quang Trung lãnh đạo đánh quân Thanh",
      "Ý nghĩa": "Giữ vững độc lập",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK015",
      "Sự kiện": "Liên quân Pháp – Tây Ban Nha tấn công Đà Nẵng",
      "Mốc thời gian": "1858",
      "Mã giai đoạn": "GD04",
      "Dữ kiện tóm tắt": "Mở đầu cuộc xâm lược của thực dân Pháp",
      "Ý nghĩa": "Bước ngoặt lịch sử cận đại",
      "URL nguồn": "https://baotanglichsu.vn/vi/Articles/4052/cuoc-djau-tranh-gianh-djoc-lap-cua-dan-toc-viet-nam-1858-1945",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK016",
      "Sự kiện": "Phong trào Cần Vương bắt đầu",
      "Mốc thời gian": "1885",
      "Mã giai đoạn": "GD04",
      "Dữ kiện tóm tắt": "Phong trào chống thực dân Pháp",
      "Ý nghĩa": "Tiêu biểu cho tinh thần yêu nước",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK017",
      "Sự kiện": "Nguyễn Tất Thành ra đi tìm đường cứu nước",
      "Mốc thời gian": "1911",
      "Mã giai đoạn": "GD04",
      "Dữ kiện tóm tắt": "Hành trình tìm con đường giải phóng dân tộc",
      "Ý nghĩa": "Mốc quan trọng trong cuộc đời Nguyễn Ái Quốc",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK018",
      "Sự kiện": "Đảng Cộng sản Việt Nam thành lập",
      "Mốc thời gian": "1930",
      "Mã giai đoạn": "GD04",
      "Dữ kiện tóm tắt": "Sự kiện chính trị quan trọng",
      "Ý nghĩa": "Tác động đến tiến trình lịch sử Việt Nam",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK019",
      "Sự kiện": "Cách mạng tháng Tám",
      "Mốc thời gian": "8/1945",
      "Mã giai đoạn": "GD04",
      "Dữ kiện tóm tắt": "Tổng khởi nghĩa giành chính quyền",
      "Ý nghĩa": "Dẫn tới thành lập nước Việt Nam Dân chủ Cộng hòa",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK020",
      "Sự kiện": "Tuyên ngôn Độc lập",
      "Mốc thời gian": "2/9/1945",
      "Mã giai đoạn": "GD04",
      "Dữ kiện tóm tắt": "Hồ Chí Minh đọc tại Quảng trường Ba Đình",
      "Ý nghĩa": "Tuyên bố nền độc lập",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK021",
      "Sự kiện": "Toàn quốc kháng chiến",
      "Mốc thời gian": "12/1946",
      "Mã giai đoạn": "GD05",
      "Dữ kiện tóm tắt": "Bắt đầu cuộc kháng chiến trên phạm vi toàn quốc",
      "Ý nghĩa": "Bảo vệ nền độc lập",
      "URL nguồn": "https://baotanglichsu.vn/vi/Articles/4055/cuoc-khang-chien-chong-thuc-dan-phap-1946-1954",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK022",
      "Sự kiện": "Chiến dịch Biên giới",
      "Mốc thời gian": "1950",
      "Mã giai đoạn": "GD05",
      "Dữ kiện tóm tắt": "Chiến dịch trong kháng chiến chống Pháp",
      "Ý nghĩa": "Bước phát triển của cuộc kháng chiến",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK023",
      "Sự kiện": "Chiến thắng Điện Biên Phủ",
      "Mốc thời gian": "7/5/1954",
      "Mã giai đoạn": "GD05",
      "Dữ kiện tóm tắt": "Chiến dịch Điện Biên Phủ",
      "Ý nghĩa": "Bước ngoặt của kháng chiến chống Pháp",
      "URL nguồn": "https://dsvh.gov.vn/di-tich-lich-su-chien-truong-dien-bien-phu-bo-sung-23-diem-di-tich-1537",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK024",
      "Sự kiện": "Hiệp định Genève",
      "Mốc thời gian": "1954",
      "Mã giai đoạn": "GD06",
      "Dữ kiện tóm tắt": "Đất nước tạm thời chia cắt",
      "Ý nghĩa": "Bối cảnh lịch sử giai đoạn 1954–1975",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK025",
      "Sự kiện": "Tổng tiến công Tết Mậu Thân",
      "Mốc thời gian": "1968",
      "Mã giai đoạn": "GD06",
      "Dữ kiện tóm tắt": "Sự kiện tiêu biểu trong chiến tranh",
      "Ý nghĩa": "Tác động đến cục diện chiến tranh",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK026",
      "Sự kiện": "Hiệp định Paris",
      "Mốc thời gian": "1973",
      "Mã giai đoạn": "GD06",
      "Dữ kiện tóm tắt": "Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam",
      "Ý nghĩa": "Mốc quan trọng trong tiến trình chấm dứt chiến tranh",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK027",
      "Sự kiện": "Chiến dịch Hồ Chí Minh",
      "Mốc thời gian": "26–30/4/1975",
      "Mã giai đoạn": "GD06",
      "Dữ kiện tóm tắt": "Chiến dịch cuối cùng trong cuộc chiến tranh",
      "Ý nghĩa": "Kết thúc chiến tranh",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK028",
      "Sự kiện": "Ngày 30/4/1975",
      "Mốc thời gian": "30/4/1975",
      "Mã giai đoạn": "GD06",
      "Dữ kiện tóm tắt": "Chiến tranh kết thúc",
      "Ý nghĩa": "Mở đường thống nhất đất nước về mặt nhà nước",
      "URL nguồn": "https://baotanglichsu.vn/VI/Articles/3097/18025/ngay-djat-nuoc-thong-nhat-30-4-1975-voi-su-ra-djoi-cua-buc-anh-me-con-ngay-gap-mat.html",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK029",
      "Sự kiện": "Thống nhất đất nước về mặt nhà nước",
      "Mốc thời gian": "1976",
      "Mã giai đoạn": "GD07",
      "Dữ kiện tóm tắt": "Hoàn thành thống nhất nhà nước",
      "Ý nghĩa": "Tạo cơ sở xây dựng đất nước thống nhất",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK030",
      "Sự kiện": "Khởi đầu công cuộc Đổi mới",
      "Mốc thời gian": "1986",
      "Mã giai đoạn": "GD08",
      "Dữ kiện tóm tắt": "Đại hội VI Đảng Cộng sản Việt Nam",
      "Ý nghĩa": "Mở đầu công cuộc Đổi mới",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK031",
      "Sự kiện": "Việt Nam gia nhập ASEAN",
      "Mốc thời gian": "1995",
      "Mã giai đoạn": "GD08",
      "Dữ kiện tóm tắt": "Hội nhập khu vực",
      "Ý nghĩa": "Mốc hội nhập quan trọng",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "SK032",
      "Sự kiện": "Việt Nam gia nhập WTO",
      "Mốc thời gian": "2007",
      "Mã giai đoạn": "GD08",
      "Dữ kiện tóm tắt": "Hội nhập thương mại quốc tế",
      "Ý nghĩa": "Mốc hội nhập kinh tế",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    }
  ],
  "nhan_vat": [
    {
      "Mã": "NV01",
      "Nhân vật": "Các Vua Hùng",
      "Giai đoạn": "GD01",
      "Đóng góp/sự kiện": "Thời đại dựng nước Văn Lang",
      "Địa danh liên quan": "Đền Hùng",
      "Ghi chú loại hình": "Hình tượng lịch sử – truyền thống; cần phân biệt truyền thuyết",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV02",
      "Nhân vật": "An Dương Vương",
      "Giai đoạn": "GD01",
      "Đóng góp/sự kiện": "Nước Âu Lạc, thành Cổ Loa",
      "Địa danh liên quan": "Cổ Loa",
      "Ghi chú loại hình": "Nhiều chi tiết gắn với truyền thuyết",
      "URL nguồn": "https://dsvh.gov.vn/di-tich-lich-su-kien-truc-nghe-thuat-va-khao-co-co-loa-2958",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV03",
      "Nhân vật": "Hai Bà Trưng",
      "Giai đoạn": "GD02",
      "Đóng góp/sự kiện": "Khởi nghĩa năm 40",
      "Địa danh liên quan": "Đền thờ Hai Bà Trưng",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV04",
      "Nhân vật": "Bà Triệu",
      "Giai đoạn": "GD02",
      "Đóng góp/sự kiện": "Khởi nghĩa năm 248",
      "Địa danh liên quan": "Thanh Hóa",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV05",
      "Nhân vật": "Lý Bí",
      "Giai đoạn": "GD02",
      "Đóng góp/sự kiện": "Khởi nghĩa năm 542",
      "Địa danh liên quan": "Di tích liên quan",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV06",
      "Nhân vật": "Mai Thúc Loan",
      "Giai đoạn": "GD02",
      "Đóng góp/sự kiện": "Phong trào đấu tranh thời Bắc thuộc",
      "Địa danh liên quan": "Nghệ An",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV07",
      "Nhân vật": "Phùng Hưng",
      "Giai đoạn": "GD02",
      "Đóng góp/sự kiện": "Đấu tranh chống đô hộ",
      "Địa danh liên quan": "Di tích liên quan",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV08",
      "Nhân vật": "Ngô Quyền",
      "Giai đoạn": "GD02",
      "Đóng góp/sự kiện": "Chiến thắng Bạch Đằng năm 938",
      "Địa danh liên quan": "Bạch Đằng",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi/Articles/3098/13934/ngo-quyen-va-chienthang-bach-dang-nam-938.html",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV09",
      "Nhân vật": "Đinh Bộ Lĩnh",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Thống nhất đất nước 968",
      "Địa danh liên quan": "Hoa Lư",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV10",
      "Nhân vật": "Lê Hoàn",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Kháng chiến chống Tống 981",
      "Địa danh liên quan": "Hoa Lư",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV11",
      "Nhân vật": "Lý Công Uẩn",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Dời đô năm 1010",
      "Địa danh liên quan": "Thăng Long",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV12",
      "Nhân vật": "Lý Thường Kiệt",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Lịch sử bảo vệ đất nước thời Lý",
      "Địa danh liên quan": "Di tích liên quan",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV13",
      "Nhân vật": "Trần Quốc Tuấn",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Kháng chiến chống Mông – Nguyên",
      "Địa danh liên quan": "Di tích thời Trần",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV14",
      "Nhân vật": "Trần Nhân Tông",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Thời Trần",
      "Địa danh liên quan": "Yên Tử",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV15",
      "Nhân vật": "Lê Lợi",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Khởi nghĩa Lam Sơn",
      "Địa danh liên quan": "Lam Kinh",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV16",
      "Nhân vật": "Nguyễn Trãi",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Khởi nghĩa Lam Sơn; văn hóa",
      "Địa danh liên quan": "Côn Sơn",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV17",
      "Nhân vật": "Quang Trung – Nguyễn Huệ",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Chiến thắng năm 1789",
      "Địa danh liên quan": "Đống Đa",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV18",
      "Nhân vật": "Nguyễn Du",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Di sản văn học",
      "Địa danh liên quan": "Hà Tĩnh",
      "Ghi chú loại hình": "Nhân vật văn hóa",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV19",
      "Nhân vật": "Gia Long",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Thành lập triều Nguyễn năm 1802",
      "Địa danh liên quan": "Huế",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV20",
      "Nhân vật": "Minh Mạng",
      "Giai đoạn": "GD03",
      "Đóng góp/sự kiện": "Vua nhà Nguyễn",
      "Địa danh liên quan": "Huế",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV21",
      "Nhân vật": "Trương Định",
      "Giai đoạn": "GD04",
      "Đóng góp/sự kiện": "Kháng chiến chống Pháp",
      "Địa danh liên quan": "Nam Bộ",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV22",
      "Nhân vật": "Nguyễn Trung Trực",
      "Giai đoạn": "GD04",
      "Đóng góp/sự kiện": "Kháng chiến chống Pháp",
      "Địa danh liên quan": "Nam Bộ",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV23",
      "Nhân vật": "Phan Đình Phùng",
      "Giai đoạn": "GD04",
      "Đóng góp/sự kiện": "Phong trào Cần Vương",
      "Địa danh liên quan": "Hà Tĩnh",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV24",
      "Nhân vật": "Phan Bội Châu",
      "Giai đoạn": "GD04",
      "Đóng góp/sự kiện": "Phong trào yêu nước đầu thế kỉ XX",
      "Địa danh liên quan": "Nghệ An",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV25",
      "Nhân vật": "Phan Châu Trinh",
      "Giai đoạn": "GD04",
      "Đóng góp/sự kiện": "Phong trào duy tân",
      "Địa danh liên quan": "Quảng Nam",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV26",
      "Nhân vật": "Hồ Chí Minh",
      "Giai đoạn": "GD04–GD06",
      "Đóng góp/sự kiện": "Cách mạng 1945; lịch sử Việt Nam hiện đại",
      "Địa danh liên quan": "Bảo tàng Hồ Chí Minh",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV27",
      "Nhân vật": "Võ Nguyên Giáp",
      "Giai đoạn": "GD05–GD06",
      "Đóng góp/sự kiện": "Kháng chiến chống Pháp và giai đoạn sau",
      "Địa danh liên quan": "Điện Biên Phủ",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "NV28",
      "Nhân vật": "Nguyễn Thị Định",
      "Giai đoạn": "GD06",
      "Đóng góp/sự kiện": "Giai đoạn đấu tranh thống nhất",
      "Địa danh liên quan": "Bến Tre",
      "Ghi chú loại hình": "Nhân vật lịch sử",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    }
  ],
  "di_tich": [
    {
      "Mã": "DT01",
      "Tên di tích": "Đền Hùng",
      "Địa điểm": "Phú Thọ",
      "Giai đoạn": "GD01",
      "Giá trị liên quan": "Di tích gắn với tín ngưỡng thờ cúng Hùng Vương",
      "URL nguồn": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT02",
      "Tên di tích": "Thành Cổ Loa",
      "Địa điểm": "Hà Nội",
      "Giai đoạn": "GD01",
      "Giá trị liên quan": "Di tích khảo cổ và thành cổ Âu Lạc",
      "URL nguồn": "https://dsvh.gov.vn/di-tich-lich-su-kien-truc-nghe-thuat-va-khao-co-co-loa-2958",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT03",
      "Tên di tích": "Khu di tích Bạch Đằng",
      "Địa điểm": "Vùng sông Bạch Đằng",
      "Giai đoạn": "GD02",
      "Giá trị liên quan": "Gắn với các chiến thắng trên sông Bạch Đằng",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT04",
      "Tên di tích": "Hoàng thành Thăng Long",
      "Địa điểm": "Hà Nội",
      "Giai đoạn": "GD03",
      "Giá trị liên quan": "Di sản qua nhiều triều đại",
      "URL nguồn": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT05",
      "Tên di tích": "Văn Miếu – Quốc Tử Giám",
      "Địa điểm": "Hà Nội",
      "Giai đoạn": "GD03",
      "Giá trị liên quan": "Di tích giáo dục truyền thống",
      "URL nguồn": "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT06",
      "Tên di tích": "Quần thể Cố đô Huế",
      "Địa điểm": "Huế",
      "Giai đoạn": "GD03",
      "Giá trị liên quan": "Di tích triều Nguyễn",
      "URL nguồn": "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-quan-the-kien-truc-co-do-hue-2944",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT07",
      "Tên di tích": "Quảng trường Ba Đình",
      "Địa điểm": "Hà Nội",
      "Giai đoạn": "GD04",
      "Giá trị liên quan": "Nơi đọc Tuyên ngôn Độc lập năm 1945",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT08",
      "Tên di tích": "Chiến trường Điện Biên Phủ",
      "Địa điểm": "Điện Biên",
      "Giai đoạn": "GD05",
      "Giá trị liên quan": "Di tích quốc gia đặc biệt về chiến dịch 1954",
      "URL nguồn": "https://dsvh.gov.vn/di-tich-lich-su-chien-truong-dien-bien-phu-bo-sung-23-diem-di-tich-1537",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT09",
      "Tên di tích": "Dinh Độc Lập",
      "Địa điểm": "TP. Hồ Chí Minh",
      "Giai đoạn": "GD06",
      "Giá trị liên quan": "Gắn với ngày 30/4/1975",
      "URL nguồn": "https://baotanglichsu.vn/vi",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "DT10",
      "Tên di tích": "Địa đạo Củ Chi",
      "Địa điểm": "TP. Hồ Chí Minh",
      "Giai đoạn": "GD06",
      "Giá trị liên quan": "Di tích thời chiến tranh",
      "URL nguồn": "https://dsvh.gov.vn",
      "Trạng thái": "Chờ giáo viên duyệt"
    }
  ],
  "truyen_thuyet": [
    {
      "Mã": "TT01",
      "Tên truyền thuyết": "Con Rồng cháu Tiên",
      "Giai đoạn": "GD01",
      "Nội dung liên hệ": "Truyền thuyết về nguồn gốc cộng đồng người Việt",
      "Lưu ý phân biệt": "Không trình bày yếu tố thần kì như sự kiện thật",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "TT02",
      "Tên truyền thuyết": "Bánh chưng, bánh giầy",
      "Giai đoạn": "GD01",
      "Nội dung liên hệ": "Văn hóa nông nghiệp, thờ cúng tổ tiên",
      "Lưu ý phân biệt": "Phân biệt truyền thuyết và bằng chứng lịch sử",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "TT03",
      "Tên truyền thuyết": "Sơn Tinh – Thủy Tinh",
      "Giai đoạn": "GD01",
      "Nội dung liên hệ": "Quan niệm dân gian về lũ lụt và thiên nhiên",
      "Lưu ý phân biệt": "Các yếu tố thần kì thuộc truyền thuyết",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "TT04",
      "Tên truyền thuyết": "Thánh Gióng",
      "Giai đoạn": "GD01",
      "Nội dung liên hệ": "Hình tượng anh hùng bảo vệ cộng đồng",
      "Lưu ý phân biệt": "Không coi chi tiết thần kì là sử kiện",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "TT05",
      "Tên truyền thuyết": "An Dương Vương và Mị Châu – Trọng Thủy",
      "Giai đoạn": "GD01",
      "Nội dung liên hệ": "Gắn với ký ức văn hóa về Âu Lạc, Cổ Loa",
      "Lưu ý phân biệt": "Cần tách sử liệu khảo cổ và kể chuyện",
      "Trạng thái": "Chờ giáo viên duyệt"
    },
    {
      "Mã": "TT06",
      "Tên truyền thuyết": "Sự tích Hồ Gươm",
      "Giai đoạn": "GD03",
      "Nội dung liên hệ": "Truyền thuyết gắn với Lê Lợi, khởi nghĩa Lam Sơn",
      "Lưu ý phân biệt": "Phân biệt truyền thuyết và lịch sử",
      "Trạng thái": "Chờ giáo viên duyệt"
    }
  ],
  "hinh_anh": [
    {
      "Mã": "HA01",
      "Hình ảnh đề xuất": "Trống đồng Ngọc Lũ",
      "Loại tư liệu": "Hiện vật bảo tàng",
      "Giai đoạn": "GD01",
      "Cơ quan cung cấp": "Bảo tàng Lịch sử quốc gia",
      "URL trang nguồn": "https://baotanglichsu.vn/vi/Articles/1001/19707/bao-vat-quoc-gia-viet-nam-trong-djong-ngoc-lu.html",
      "URL ảnh trực tiếp": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Trong_dong_Ngoc_Lu.jpg/800px-Trong_dong_Ngoc_Lu.jpg",
      "Quyền sử dụng": "Tư liệu bảo vật quốc gia",
      "Trạng thái": "Đã có ảnh tham khảo (cần duyệt bản quyền)"
    },
    {
      "Mã": "HA02",
      "Hình ảnh đề xuất": "Thành Cổ Loa",
      "Loại tư liệu": "Ảnh di tích",
      "Giai đoạn": "GD01",
      "Cơ quan cung cấp": "Cục Di sản văn hóa",
      "URL trang nguồn": "https://dsvh.gov.vn/di-tich-lich-su-kien-truc-nghe-thuat-va-khao-co-co-loa-2958",
      "URL ảnh trực tiếp": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Co_Loa_citadel.jpg/800px-Co_Loa_citadel.jpg",
      "Quyền sử dụng": "Di tích quốc gia đặc biệt",
      "Trạng thái": "Đã có ảnh tham khảo (cần duyệt bản quyền)"
    },
    {
      "Mã": "HA03",
      "Hình ảnh đề xuất": "Văn Miếu – Quốc Tử Giám",
      "Loại tư liệu": "Ảnh di tích",
      "Giai đoạn": "GD03",
      "Cơ quan cung cấp": "Cục Di sản văn hóa",
      "URL trang nguồn": "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953",
      "URL ảnh trực tiếp": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Khue_Van_Cac_Hanoi.jpg/800px-Khue_Van_Cac_Hanoi.jpg",
      "Quyền sử dụng": "Di tích quốc gia đặc biệt",
      "Trạng thái": "Đã có ảnh tham khảo (cần duyệt bản quyền)"
    },
    {
      "Mã": "HA04",
      "Hình ảnh đề xuất": "Quần thể Cố đô Huế",
      "Loại tư liệu": "Ảnh di tích",
      "Giai đoạn": "GD03",
      "Cơ quan cung cấp": "Cục Di sản văn hóa",
      "URL trang nguồn": "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-quan-the-kien-truc-co-do-hue-2944",
      "URL ảnh trực tiếp": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ngo_Mon_Gate_Hue.jpg/800px-Ngo_Mon_Gate_Hue.jpg",
      "Quyền sử dụng": "Di sản Thế giới UNESCO",
      "Trạng thái": "Đã có ảnh tham khảo (cần duyệt bản quyền)"
    },
    {
      "Mã": "HA05",
      "Hình ảnh đề xuất": "Chiến trường Điện Biên Phủ",
      "Loại tư liệu": "Ảnh di tích/hiện vật",
      "Giai đoạn": "GD05",
      "Cơ quan cung cấp": "Cục Di sản văn hóa",
      "URL trang nguồn": "https://dsvh.gov.vn/di-tich-lich-su-chien-truong-dien-bien-phu-bo-sung-23-diem-di-tich-1537",
      "URL ảnh trực tiếp": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/De_Castries_bunker_Dien_Bien_Phu.jpg/800px-De_Castries_bunker_Dien_Bien_Phu.jpg",
      "Quyền sử dụng": "Di tích quốc gia đặc biệt",
      "Trạng thái": "Đã có ảnh tham khảo (cần duyệt bản quyền)"
    },
    {
      "Mã": "HA06",
      "Hình ảnh đề xuất": "Ảnh Mẹ con ngày gặp mặt",
      "Loại tư liệu": "Ảnh tư liệu",
      "Giai đoạn": "GD06",
      "Cơ quan cung cấp": "Bảo tàng Lịch sử quốc gia",
      "URL trang nguồn": "https://baotanglichsu.vn/VI/Articles/3097/18025/ngay-djat-nuoc-thong-nhat-30-4-1975-voi-su-ra-djoi-cua-buc-anh-me-con-ngay-gap-mat.html",
      "URL ảnh trực tiếp": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Tank_390_Hanoi.jpg/800px-Tank_390_Hanoi.jpg",
      "Quyền sử dụng": "Tư liệu lưu trữ lịch sử",
      "Trạng thái": "Đã có ảnh tham khảo (cần duyệt bản quyền)"
    },
    {
      "Mã": "HA07",
      "Hình ảnh đề xuất": "Hiện vật thời bao cấp",
      "Loại tư liệu": "Hiện vật",
      "Giai đoạn": "GD07",
      "Cơ quan cung cấp": "Bảo tàng Lịch sử quốc gia",
      "URL trang nguồn": "https://baotanglichsu.vn/vi/Articles/4087/hien-vat-thoi-ky-bao-cap-truoc-nam-1985",
      "URL ảnh trực tiếp": null,
      "Quyền sử dụng": "Bảo tàng Lịch sử quốc gia",
      "Trạng thái": "Chưa tải ảnh"
    }
  ],
  "nguon_tu_lieu": [
    {
      "Mã": "NG01",
      "Nguồn/tổ chức": "Bảo tàng Lịch sử quốc gia",
      "URL": "https://baotanglichsu.vn/vi",
      "Phạm vi tư liệu": "Bài nghiên cứu; hiện vật; ảnh tư liệu",
      "Lưu ý": "Cần kiểm tra từng trang và điều kiện sử dụng"
    },
    {
      "Mã": "NG02",
      "Nguồn/tổ chức": "Cục Di sản văn hóa",
      "URL": "https://dsvh.gov.vn",
      "Phạm vi tư liệu": "Di tích; hồ sơ di sản",
      "Lưu ý": "Cần kiểm tra từng trang và điều kiện sử dụng"
    },
    {
      "Mã": "NG03",
      "Nguồn/tổ chức": "Bộ Giáo dục và Đào tạo",
      "URL": "https://moet.gov.vn",
      "Phạm vi tư liệu": "Chương trình GDPT 2018",
      "Lưu ý": "Cần kiểm tra từng trang và điều kiện sử dụng"
    },
    {
      "Mã": "NG04",
      "Nguồn/tổ chức": "Danh mục di tích quốc gia đặc biệt",
      "URL": "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752",
      "Phạm vi tư liệu": "Danh mục di tích",
      "Lưu ý": "Cần kiểm tra từng trang và điều kiện sử dụng"
    },
    {
      "Mã": "NG05",
      "Nguồn/tổ chức": "Trưng bày Ngô – Đinh – Tiền Lê",
      "URL": "https://baotanglichsu.vn/vi/Articles/4046/trieu-ngo-djinh-tien-le-939-1009",
      "Phạm vi tư liệu": "Lịch sử 939–1009",
      "Lưu ý": "Cần kiểm tra từng trang và điều kiện sử dụng"
    },
    {
      "Mã": "NG06",
      "Nguồn/tổ chức": "Kháng chiến chống Pháp",
      "URL": "https://baotanglichsu.vn/vi/Articles/4055/cuoc-khang-chien-chong-thuc-dan-phap-1946-1954",
      "Phạm vi tư liệu": "Lịch sử 1946–1954",
      "Lưu ý": "Cần kiểm tra từng trang và điều kiện sử dụng"
    },
    {
      "Mã": "NG07",
      "Nguồn/tổ chức": "Tư liệu ảnh thống nhất và Đổi mới",
      "URL": "https://baotanglichsu.vn/vi/Articles/4107/69008/anh-tu-lieu.html",
      "Phạm vi tư liệu": "Ảnh giai đoạn hiện đại",
      "Lưu ý": "Cần kiểm tra từng trang và điều kiện sử dụng"
    }
  ]
};

// Helper function to get stage linkage according to Rule 1: "Lọc theo Mã giai đoạn để liên kết sự kiện – nhân vật – di tích – hình ảnh."
export function getLinkedStageData(stageCode: string) {
  const stage = OFFICIAL_DATASET.giai_doan.find((g) => g.Mã === stageCode);
  const events = OFFICIAL_DATASET.su_kien.filter((sk) => sk['Mã giai đoạn'] === stageCode);
  const figures = OFFICIAL_DATASET.nhan_vat.filter((nv) => {
    // Some figures span multiple stages like GD04-GD06
    return nv['Giai đoạn'].includes(stageCode);
  });
  const relics = OFFICIAL_DATASET.di_tich.filter((dt) => dt['Giai đoạn'] === stageCode);
  const legends = OFFICIAL_DATASET.truyen_thuyet.filter((tt) => tt['Giai đoạn'] === stageCode);
  const images = OFFICIAL_DATASET.hinh_anh.filter((ha) => ha['Giai đoạn'] === stageCode);

  return {
    stage,
    events,
    figures,
    relics,
    legends,
    images,
  };
}

// Local storage management for teacher verification reviews
const REVIEW_STORAGE_KEY = 'dauan_teacher_review_statuses';

export function getTeacherReviews(): Record<string, { status: string; note?: string; verifiedBy?: string; verifiedAt?: string }> {
  try {
    const raw = localStorage.getItem(REVIEW_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse teacher reviews from localStorage', e);
  }
  return {};
}

export function saveTeacherReview(itemCode: string, status: string, note?: string, teacherName?: string) {
  try {
    const reviews = getTeacherReviews();
    reviews[itemCode] = {
      status,
      note,
      verifiedBy: teacherName || 'Cô giáo Phạm Thị Thanh',
      verifiedAt: new Date().toISOString(),
    };
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
  } catch (e) {
    console.error('Failed to save teacher review', e);
  }
}
