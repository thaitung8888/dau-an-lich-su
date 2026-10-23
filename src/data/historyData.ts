import {
  HistoricalPeriod,
  TextbookLesson,
  HistoricalFigure,
  LegendStory,
  NationalArtifact,
  RelicSite,
  QuizQuestion,
  DetectiveCase,
  PassportStamp,
  DynastyInfo,
  CulturalAchievement
} from '../types';

export const HISTORICAL_PERIODS: HistoricalPeriod[] = [
  {
    id: 'period-1',
    number: 1,
    title: 'Buổi đầu dựng nước',
    timeSpan: 'Khoảng thế kỉ VII TCN đến 179 TCN',
    shortDesc: 'Thời đại các Vua Hùng dựng nước Văn Lang và An Dương Vương dựng nước Âu Lạc với thành Cổ Loa kiên cố.',
    bannerColor: 'from-amber-600 to-amber-800',
    iconName: 'Crown',
    context: 'Cư dân người Việt cổ định cư ven lưu vực sông Hồng, sông Mã, sông Cả, phát triển nghề trồng lúa nước và đúc đồng Đông Sơn rực rỡ.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sarfxlYEs-XaMHzgcIsz_kgRakxg--YjUvP818DGzw&s=10',
    imageCaption: 'Bảo vật Quốc gia Trống đồng Đông Sơn (Trống Ngọc Lũ) - Tinh hoa luyện kim và văn hóa lúa nước thời các Vua Hùng',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sarfxlYEs-XaMHzgcIsz_kgRakxg--YjUvP818DGzw&s=10',
        title: 'Trống đồng Đông Sơn (Trống Ngọc Lũ)',
        caption: 'Mặt trống khắc ngôi sao 14 cánh ở tâm, các vành chim Lạc bay và cảnh người giã gạo mở hội',
        typeLabel: 'Hiện vật bảo tàng'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHiUrXlTlD7D5AxtYOKFJQgsiwHQm903GSp2fR0zhRTA&s=10',
        title: 'Di tích Đền Hùng - Núi Nghĩa Lĩnh (Phú Thọ)',
        caption: 'Khu di tích lịch sử quốc gia đặc biệt tưởng nhớ các Vua Hùng dựng nước Văn Lang',
        typeLabel: 'Di tích thực tế'
      }
    ],
    keyEvents: [
      {
        year: 'Khoảng thế kỉ VII TCN',
        title: 'Nhà nước Văn Lang ra đời',
        description: 'Vua Hùng đóng đô tại Phong Châu (Phú Thọ ngày nay), chia nước làm 15 bộ, dạy dân cấy lúa, xăm mình tránh thủy quái.',
        location: 'Phong Châu (Phú Thọ)',
        evidenceClass: 'verified',
      },
      {
        year: 'Thế kỉ III TCN (khoảng 208 TCN)',
        title: 'Thục Phán lập nước Âu Lạc, xưng An Dương Vương',
        description: 'Hợp nhất người Lạc Việt và Tây Âu, chuyển kinh đô xuống vùng đồng bằng Cổ Loa (Đông Anh, Hà Nội).',
        location: 'Cổ Loa (Hà Nội)',
        evidenceClass: 'verified',
      },
      {
        year: 'Khoảng 208 - 179 TCN',
        title: 'Xây dựng thành Cổ Loa và chế tạo nỏ thần',
        description: 'Công trình thành lũy xoắn ốc bằng đất độc đáo bậc nhất Đông Nam Á cùng hàng vạn mũi tên đồng Cầu Vực.',
        location: 'Thành Cổ Loa (Hà Nội)',
        evidenceClass: 'verified',
      },
    ],
    famousFigures: ['Hùng Vương', 'An Dương Vương (Thục Phán)', 'Cao Lỗ'],
    relicSites: ['Khu di tích lịch sử Đền Hùng (Phú Thọ)', 'Di tích Thành Cổ Loa (Hà Nội)'],
    artifacts: ['Trống đồng Ngọc Lũ', 'Thạp đồng Đào Thịnh', 'Kho mũi tên đồng Cổ Loa'],
    meaning: 'Đặt nền móng cho ý thức nguồn cội chung "Đồng bào" và tinh thần lao động, đoàn kết dựng xây non nước.',
  },
  {
    id: 'period-2',
    number: 2,
    title: 'Bắc thuộc và giành quyền tự chủ',
    timeSpan: '179 TCN – Năm 938',
    shortDesc: 'Hơn 1000 năm kiên cường chống đồng hóa, bền bỉ đứng lên khởi nghĩa và đỉnh cao là chiến thắng Bạch Đằng năm 938.',
    bannerColor: 'from-red-600 to-rose-800',
    iconName: 'ShieldAlert',
    context: 'Các triều đại phong kiến phương Bắc đô hộ, áp đặt luật lệ hà khắc và đồng hóa văn hóa nhưng nhân dân ta vẫn giữ gìn phong tục và liên tiếp vùng lên.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRDZP-cWG_SplMvgXMK_cCCCP5Nib677MjOWvSeGnCA&s=10',
    imageCaption: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền đập tan hạm đội giặc Nam Hán, chấm dứt hơn 1000 năm Bắc thuộc',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRDZP-cWG_SplMvgXMK_cCCCP5Nib677MjOWvSeGnCA&s=10',
        title: 'Trận thủy chiến sông Bạch Đằng năm 938',
        caption: 'Ngô Quyền đứng trên thuyền chỉ huy cọc ngầm gỗ lim nhấn chìm hạm đội giặc Nam Hán',
        typeLabel: 'Tranh lịch sử'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9x_3bV7vY1ks82YUd2T_jdIVcnSrRtekN4JspacoGA&s=10',
        title: 'Khởi nghĩa Hai Bà Trưng (Năm 40)',
        caption: 'Hai Bà Trưng cưỡi voi xuất trận tại sông Hát, giành lại độc lập cho 65 thành trì',
        typeLabel: 'Tranh lịch sử'
      }
    ],
    keyEvents: [
      {
        year: 'Năm 40',
        title: 'Khởi nghĩa Hai Bà Trưng bùng nổ',
        description: 'Trưng Trắc và Trưng Nhị phất cờ khởi nghĩa tại của sông Hát (Hát Môn), đuổi sạch thái thú Tô Định, xưng vương đóng đô ở Mê Linh.',
        location: 'Hát Môn (Hà Nội)',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 248',
        title: 'Khởi nghĩa Bà Triệu',
        description: 'Triệu Thị Trinh cùng anh dấy binh ở núi Nưa (Thanh Hóa) với câu nói nổi tiếng: "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ...".',
        location: 'Căn cứ núi Nưa (Thanh Hóa)',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 542 - 544',
        title: 'Lý Bí khởi nghĩa, lập nước Vạn Xuân',
        description: 'Đánh bại quân Lương, xưng hoàng đế (Lý Nam Đế), dựng chùa Khai Quốc (chùa Trấn Quốc ngày nay).',
        location: 'Khu vực Hà Nội ngày nay',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 905',
        title: 'Khúc Thừa Dụ giành quyền tự chủ',
        description: 'Nhân lúc nhà Đường suy yếu, Khúc Thừa Dụ xưng Tiết độ sứ, đặt nền tảng tự chủ tự cường.',
        location: 'Thành Đại La',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 938',
        title: 'Chiến thắng Bạch Đằng vang dội',
        description: 'Ngô Quyền dùng trận địa cọc gỗ bịt sắt kết hợp thủy triều tiêu diệt đoàn thuyền chiến Nam Hán do Hoằng Tháo chỉ huy.',
        location: 'Sông Bạch Đằng (Quảng Ninh - Hải Phòng)',
        evidenceClass: 'verified',
      },
    ],
    famousFigures: ['Hai Bà Trưng', 'Bà Triệu', 'Lý Nam Đế', 'Khúc Thừa Dụ', 'Ngô Quyền'],
    relicSites: ['Đền Hai Bà Trưng (Mê Linh)', 'Khu di tích Bạch Đằng Giang (Hải Phòng)', 'Lăng Ngô Quyền (Đường Lâm)'],
    artifacts: ['Bãi cọc gỗ Bạch Đằng', 'Trống đồng thời Bắc thuộc'],
    meaning: 'Chấm dứt hoàn toàn hơn 1000 năm Bắc thuộc, mở ra kỉ nguyên độc lập, tự chủ lâu dài cho dân tộc.',
  },
  {
    id: 'period-3',
    number: 3,
    title: 'Các triều đại quân chủ độc lập',
    timeSpan: 'Năm 939 – Năm 1858',
    shortDesc: 'Xây dựng quốc gia Đại Việt hùng cường qua các triều Đinh, Tiền Lê, Lý, Trần, Hậu Lê, Tây Sơn và Nguyễn.',
    bannerColor: 'from-blue-600 to-indigo-900',
    iconName: 'Building2',
    context: 'Đất nước củng cố nền độc lập, mở mang bờ cõi, phát triển rực rỡ về văn hóa, giáo dục, pháp luật và ba lần đánh tan quân Nguyên Mông xâm lược.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-lnjqEEBDPCOuqmtkE5ZeTK9cu3CuQWuKhBZwzoOPRA&s=10',
    imageCaption: 'Chiếu dời đô Thăng Long năm 1010: Vua Lý Thái Tổ định đô tại Thăng Long - Rồng Bay Lên, mở đầu ngàn năm văn hiến',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-lnjqEEBDPCOuqmtkE5ZeTK9cu3CuQWuKhBZwzoOPRA&s=10',
        title: 'Chiếu dời đô về Thăng Long năm 1010',
        caption: 'Vua Lý Thái Tổ đi thuyền rồng từ Hoa Lư về Đại La, thấy rồng vàng bay lên bèn đổi tên là Thăng Long',
        typeLabel: 'Tranh lịch sử'
      },
      {
        url: 'data:image/jpeg;base64,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',
        title: 'Khuê Văn Các - Văn Miếu Quốc Tử Giám',
        caption: 'Trường đại học đầu tiên của Việt Nam, biểu tượng đỉnh cao của nền văn hiến',
        typeLabel: 'Di tích thực tế'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVy3RZhcFBxu89cavzqd9iRkTpvYeit-xRkWRuQdR_kA&s=10',
        title: 'Cửa Ngọ Môn - Cố đô Huế',
        caption: 'Di sản Văn hóa Thế giới UNESCO, kinh đô triều Nguyễn',
        typeLabel: 'Di tích thực tế'
      }
    ],
    keyEvents: [
      {
        year: 'Năm 968',
        title: 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân',
        description: 'Thống nhất đất nước, xưng Hoàng đế (Đinh Tiên Hoàng), đặt quốc hiệu Đại Cồ Việt, đóng đô tại Hoa Lư.',
        location: 'Cố đô Hoa Lư (Ninh Bình)',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 1010',
        title: 'Lý Thái Tổ dời đô về Thăng Long',
        description: 'Ban Chiếu dời đô từ Hoa Lư về thành Đại La, đổi tên là Thăng Long (Rồng bay lên).',
        location: 'Hoàng thành Thăng Long (Hà Nội)',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 1070 & 1076',
        title: 'Thành lập Văn Miếu và Quốc Tử Giám',
        description: 'Trường đại học đầu tiên của Việt Nam, mở đầu nền giáo dục khoa cử đào tạo nhân tài cho đất nước.',
        location: 'Văn Miếu - Quốc Tử Giám (Hà Nội)',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 1077',
        title: 'Kháng chiến chống Tống trên phòng tuyến sông Như Nguyệt',
        description: 'Lý Thường Kiệt chỉ huy chiến đấu, vang danh bài thơ thần "Nam quốc sơn hà".',
        location: 'Sông Cầu (Bắc Ninh)',
        evidenceClass: 'verified',
      },
      {
        year: '1258, 1285, 1288',
        title: 'Ba lần chiến thắng quân xâm lược Mông - Nguyên',
        description: 'Hưng Đạo Đại vương Trần Quốc Tuấn và quân dân nhà Trần với tinh thần "Sát Thát" làm nên chiến thắng Đông Bộ Đầu, Hàm Tử, Chương Dương, Bạch Đằng.',
        location: 'Đại Việt',
        evidenceClass: 'verified',
      },
      {
        year: '1418 - 1427',
        title: 'Khởi nghĩa Lam Sơn thắng lợi',
        description: 'Lê Lợi và Nguyễn Trãi lãnh đạo kháng chiến chống quân Minh, sau 10 năm giành lại trọn vẹn non sông.',
        location: 'Lam Kinh (Thanh Hóa)',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 1789',
        title: 'Chiến thắng Ngọc Hồi - Đống Đa',
        description: 'Vua Quang Trung hành quân thần tốc, đại phá 29 vạn quân Thanh vào mùng 5 Tết Kỷ Dậu.',
        location: 'Gò Đống Đa (Hà Nội)',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 1802',
        title: 'Nhà Nguyễn thành lập',
        description: 'Nguyễn Ánh lên ngôi lập ra triều Nguyễn, định đô tại Phú Xuân (Huế), thống nhất lãnh thổ từ Bắc chí Nam.',
        location: 'Cố đô Huế',
        evidenceClass: 'verified',
      },
    ],
    famousFigures: ['Đinh Tiên Hoàng', 'Lý Thái Tổ', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi', 'Nguyễn Trãi', 'Quang Trung - Nguyễn Huệ', 'Chu Văn An'],
    relicSites: ['Hoàng thành Thăng Long', 'Văn Miếu - Quốc Tử Giám', 'Khu di tích Lam Kinh', 'Quần thể Cố đô Huế', 'Khu di tích Đền Trần (Nam Định)'],
    artifacts: ['Bia Tiến sĩ Văn Miếu', 'Tượng Phật Bà Quan Âm chùa Bút Tháp', 'Trống đồng Cảnh Thịnh', 'Cửu đỉnh Huế'],
    meaning: 'Khẳng định vị thế một quốc gia văn hiến, có chủ quyền toàn vẹn và truyền thống hiếu học, yêu nước nồng nàn.',
  },
  {
    id: 'period-4',
    number: 4,
    title: 'Giai đoạn 1858 – 1945',
    timeSpan: '1/9/1858 – 2/9/1945',
    shortDesc: 'Đấu tranh chống thực dân Pháp xâm lược, Cách mạng tháng Tám thành công và khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    bannerColor: 'from-emerald-700 to-teal-900',
    iconName: 'Flag',
    context: 'Thực dân Pháp nổ súng xâm lược Đà Nẵng năm 1858. Các phong trào Cần Vương, Đông Du, Duy Tân diễn ra sôi nổi. Năm 1911, người thanh niên Nguyễn Tất Thành ra đi tìm đường cứu nước.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQH_2BK3M6_iecwbsYjh53UkKoU0Np1reTloePX9aWA&s=10',
    imageCaption: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình ngày 2-9-1945 khai sinh nước Việt Nam Dân chủ Cộng hòa',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQH_2BK3M6_iecwbsYjh53UkKoU0Np1reTloePX9aWA&s=10',
        title: 'Bác Hồ đọc Tuyên ngôn Độc lập 2-9-1945',
        caption: 'Giờ phút thiêng liêng khai sinh nước Việt Nam Dân chủ Cộng hòa trước hàng vạn đồng bào tại Ba Đình',
        typeLabel: 'Tranh lịch sử'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_td2dhZk9BmQJWzmj7dc4LpZrdcaM2iFvQ-7bI7luDQ&s=10',
        title: 'Bến Nhà Rồng - Sông Sài Gòn',
        caption: 'Nơi người thanh niên Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911',
        typeLabel: 'Di tích thực tế'
      }
    ],
    keyEvents: [
      {
        year: '1/9/1858',
        title: 'Thực dân Pháp nổ súng tấn công bán đảo Sơn Trà (Đà Nẵng)',
        description: 'Mở đầu cuộc xâm lược Việt Nam, quan dân Đà Nẵng dưới sự chỉ huy của Nguyễn Tri Phương kiên quyết đánh trả.',
        location: 'Đà Nẵng',
        evidenceClass: 'verified',
      },
      {
        year: '5/6/1911',
        title: 'Nguyễn Tất Thành ra đi tìm đường cứu nước',
        description: 'Từ bến cảng Nhà Rồng (Sài Gòn), người thanh niên yêu nước lên tàu Amiral Latouche-Tréville bắt đầu hành trình bôn ba khắp năm châu.',
        location: 'Bến Nhà Rồng (TP. Hồ Chí Minh)',
        evidenceClass: 'verified',
      },
      {
        year: '3/2/1930',
        title: 'Thành lập Đảng Cộng sản Việt Nam',
        description: 'Hội nghị hợp nhất các tổ chức cộng sản họp tại Cửu Long (Hương Cảng, Trung Quốc) do Nguyễn Ái Quốc chủ trì.',
        location: 'Cửu Long (Hương Cảng)',
        evidenceClass: 'verified',
      },
      {
        year: '19/8/1945',
        title: 'Cách mạng tháng Tám thắng lợi tại Hà Nội',
        description: 'Quần chúng nhân dân tổng khởi nghĩa giành chính quyền tại thủ đô, mở đường thắng lợi trên cả nước.',
        location: 'Quảng trường Cách mạng Tháng Tám (Hà Nội)',
        evidenceClass: 'verified',
      },
      {
        year: '2/9/1945',
        title: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập',
        description: 'Tại quảng trường Ba Đình lịch sử, khai sinh ra nước Việt Nam Dân chủ Cộng hòa - nhà nước công nông đầu tiên ở Đông Nam Á.',
        location: 'Quảng trường Ba Đình (Hà Nội)',
        evidenceClass: 'verified',
      },
    ],
    famousFigures: ['Hồ Chí Minh (Nguyễn Tất Thành - Nguyễn Ái Quốc)', 'Phan Bội Châu', 'Phan Châu Trinh', 'Nguyễn Tri Phương', 'Hoàng Hoa Thám'],
    relicSites: ['Bến Nhà Rồng', 'Quảng trường Ba Đình', 'Khu di tích Pác Bó (Cao Bằng)', 'Nhà tù Hỏa Lò'],
    artifacts: ['Bản thảo Tuyên ngôn Độc lập 1945', 'Chiếc micro Chủ tịch Hồ Chí Minh đọc Tuyên ngôn tại Ba Đình'],
    meaning: 'Phá tan ách thống trị của thực dân Pháp và phát xít Nhật, đưa nhân dân Việt Nam từ thân phận nô lệ trở thành người làm chủ đất nước.',
  },
  {
    id: 'period-5',
    number: 5,
    title: 'Kháng chiến chống thực dân Pháp (1945–1954)',
    timeSpan: '1945 – 1954',
    shortDesc: 'Toàn dân kháng chiến bảo vệ nền độc lập non trẻ và Chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu".',
    bannerColor: 'from-cyan-700 to-blue-900',
    iconName: 'Medal',
    context: 'Thực dân Pháp quay lại xâm lược. Hưởng ứng Lời kêu gọi Toàn quốc kháng chiến của Bác Hồ, quân dân ta rút lên chiến khu Việt Bắc trường kỳ kháng chiến.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUlLGGk1-qVyBm75BcXijEuVNuLYisrjoCf_i3GLxg6w&s=10',
    imageCaption: 'Lá cờ "Quyết chiến Quyết thắng" tung bay trên nóc hầm tướng De Castries chiều ngày 7-5-1954 lừng lẫy năm châu, chấn động địa cầu',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUlLGGk1-qVyBm75BcXijEuVNuLYisrjoCf_i3GLxg6w&s=10',
        title: 'Chiến thắng Điện Biên Phủ ngày 7-5-1954',
        caption: 'Chiến sĩ Điện Biên phất cao cờ Quyết chiến Quyết thắng trên nóc hầm De Castries',
        typeLabel: 'Tranh lịch sử'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQGAItA6hbbFYmViwjelLKwqZ_2XkiFT_dKacvdrsCQ&s=10',
        title: 'Thung lũng Mường Thanh & Đồi A1',
        caption: 'Chiến trường Điện Biên Phủ lịch sử nơi diễn ra 56 ngày đêm khoét núi ngủ hầm',
        typeLabel: 'Di tích thực tế'
      }
    ],
    keyEvents: [
      {
        year: '19/12/1946',
        title: 'Lời kêu gọi Toàn quốc kháng chiến',
        description: '"Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ...".',
        location: 'Vạn Phúc (Hà Đông)',
        evidenceClass: 'verified',
      },
      {
        year: 'Thu - Đông 1947',
        title: 'Chiến thắng Việt Bắc',
        description: 'Đập tan cuộc hành quân tấn công lên căn cứ địa kháng chiến của thực dân Pháp, bảo toàn cơ quan đầu não kháng chiến.',
        location: 'Chiến khu Việt Bắc',
        evidenceClass: 'verified',
      },
      {
        year: 'Thu - Đông 1950',
        title: 'Chiến dịch Biên Giới thắng lợi',
        description: 'Mở thông đường liên lạc với các nước xã hội chủ nghĩa, quân ta chuyển sang thế chủ động tiến công.',
        location: 'Biên giới phía Bắc (Cao Bằng - Lạng Sơn)',
        evidenceClass: 'verified',
      },
      {
        year: '7/5/1954',
        title: 'Chiến thắng Điện Biên Phủ vĩ đại',
        description: 'Sau 56 ngày đêm "khoét núi, ngủ hầm, mưa dầm, cơm vắt", quân ta bắt sống tướng De Castries, xóa sổ tập đoàn cứ điểm mạnh nhất Đông Dương.',
        location: 'Điện Biên Phủ',
        evidenceClass: 'verified',
      },
      {
        year: '21/7/1954',
        title: 'Ký kết Hiệp định Giơ-ne-vơ (Genève)',
        description: 'Pháp công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của ba nước Đông Dương.',
        location: 'Genève (Thụy Sĩ)',
        evidenceClass: 'verified',
      },
    ],
    famousFigures: ['Hồ Chí Minh', 'Đại tướng Võ Nguyên Giáp', 'Anh hùng Phan Đình Giót', 'Anh hùng Bế Văn Đàn', 'Anh hùng Tô Vĩnh Diện'],
    relicSites: ['Khu di tích Chiến trường Điện Biên Phủ (Đồi A1, Hầm De Castries)', 'An toàn khu ATK Định Hóa (Thái Nguyên)', 'Đèo Lũng Lô'],
    artifacts: ['Khẩu pháo cao xạ của Tô Vĩnh Diện', 'Xe đạp thồ Điện Biên Phủ'],
    meaning: 'Chấm dứt hoàn toàn sự đô hộ của thực dân Pháp, giải phóng miền Bắc, nêu tấm gương cổ vũ phong trào giải phóng dân tộc thế giới.',
  },
  {
    id: 'period-6',
    number: 6,
    title: 'Kháng chiến chống Mỹ, cứu nước (1954–1975)',
    timeSpan: '1954 – 30/4/1975',
    shortDesc: 'Xây dựng hậu phương miền Bắc, chi viện tiền tuyến lớn miền Nam, đỉnh cao là Đại thắng mùa Xuân năm 1975.',
    bannerColor: 'from-orange-600 to-amber-900',
    iconName: 'Compass',
    context: 'Đất nước tạm thời chia cắt làm hai miền tại vĩ tuyến 17 (sông Bến Hải). Nhân dân hai miền đồng lòng vượt qua muôn vàn gian khổ để thống nhất non sông.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRck-lHUVsyKRDtI3cj0p5IAiBwsBL394DoFjPa-zE89A&s=10',
    imageCaption: 'Xe tăng 390 húc tung cổng chính Dinh Độc Lập trưa ngày 30/4/1975 - Non sông thu về một mối',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRck-lHUVsyKRDtI3cj0p5IAiBwsBL394DoFjPa-zE89A&s=10',
        title: 'Đại thắng Mùa Xuân ngày 30-4-1975',
        caption: 'Xe tăng 390 húc đổ cổng chính Dinh Độc Lập lúc 11h30 trưa 30/4/1975 giải phóng hoàn toàn miền Nam',
        typeLabel: 'Tranh lịch sử'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeEXKqXQQcZSgmW92J7x2Net8FtQ-grnv1tuUl3lQuGQ&s=10',
        title: 'Địa đạo Củ Chi - Đất thép thành đồng',
        caption: 'Hệ thống địa đạo kháng chiến kiên cường trong lòng đất của quân dân miền Nam',
        typeLabel: 'Di tích thực tế'
      }
    ],
    keyEvents: [
      {
        year: '1959 - 1960',
        title: 'Phong trào Đồng Khởi ở Bến Tre',
        description: 'Nữ tướng Nguyễn Thị Định cùng đồng bào miền Nam vùng lên đập tan bộ máy kìm kẹp của chính quyền tay sai.',
        location: 'Mỏ Cày (Bến Tre)',
        evidenceClass: 'verified',
      },
      {
        year: '1959',
        title: 'Mở đường Trường Sơn (Đường Hồ Chí Minh)',
        description: 'Tuyến chi viện chiến lược huyền thoại xẻ dọc Trường Sơn đưa bộ đội, vũ khí và lương thực từ miền Bắc vào tiền tuyến miền Nam.',
        location: 'Dãy núi Trường Sơn',
        evidenceClass: 'verified',
      },
      {
        year: 'Tháng 12/1972',
        title: 'Chiến thắng "Điện Biên Phủ trên không"',
        description: 'Quân dân Hà Nội và miền Bắc kiên cường bắn rơi hàng chục máy bay B-52 của không quân Mỹ trong 12 ngày đêm khói lửa.',
        location: 'Bầu trời Hà Nội, Hải Phòng',
        evidenceClass: 'verified',
      },
      {
        year: '27/1/1973',
        title: 'Ký kết Hiệp định Pa-ri (Paris)',
        description: 'Mỹ buộc phải ký hiệp định chấm dứt chiến tranh, rút toàn bộ quân đội về nước.',
        location: 'Paris (Pháp)',
        evidenceClass: 'verified',
      },
      {
        year: '11 giờ 30 phút ngày 30/4/1975',
        title: 'Giải phóng miền Nam, thống nhất đất nước',
        description: 'Xe tăng mang số hiệu 390 và 843 húc đổ cổng Dinh Độc Lập, lá cờ Mặt trận Dân tộc Giải phóng tung bay trên nóc dinh.',
        location: 'Dinh Độc Lập (Sài Gòn - TP. Hồ Chí Minh)',
        evidenceClass: 'verified',
      },
    ],
    famousFigures: ['Hồ Chí Minh', 'Lê Duẩn', 'Võ Nguyên Giáp', 'Nguyễn Thị Định', 'Võ Thị Sáu', 'Nguyễn Văn Trỗi', 'Bùi Quang Thận'],
    relicSites: ['Cầu Hiền Lương - Sông Bến Hải', 'Địa đạo Củ Chi', 'Dinh Độc Lập', 'Ngã ba Đồng Lộc', 'Địa đạo Vịnh Mốc'],
    artifacts: ['Xe tăng 390 và 843 (Bảo vật quốc gia)', 'Xác máy bay B-52 tại hồ Hữu Tiệp (Hà Nội)'],
    meaning: 'Kết thúc thắng lợi 21 năm kháng chiến chống Mỹ, hoàn thành sự nghiệp giải phóng dân tộc, non sông thu về một mối.',
  },
  {
    id: 'period-7',
    number: 7,
    title: 'Thống nhất và xây dựng đất nước (1975–1986)',
    timeSpan: '1975 – 1986',
    shortDesc: 'Thống nhất đất nước về mặt nhà nước năm 1976, tái thiết sau chiến tranh và bảo vệ chủ quyền biên giới non sông.',
    bannerColor: 'from-violet-700 to-purple-900',
    iconName: 'Building2',
    context: 'Sau đại thắng 30/4/1975, đất nước bước vào công cuộc khắc phục hậu quả chiến tranh, ổn định đời sống nhân dân và hoàn thành thống nhất về mặt nhà nước.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDcM2Xm8tsVBVgaQXwyFcxYkxTxVMk3Ib2oEQz4bfJ6A&s=10',
    imageCaption: 'Dải đất hình chữ S liền một dải sau ngày non sông thống nhất, bước vào tái thiết và xây dựng đất nước',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDcM2Xm8tsVBVgaQXwyFcxYkxTxVMk3Ib2oEQz4bfJ6A&s=10',
        title: 'Non sông gấm vóc nối liền một dải',
        caption: 'Tổng tuyển cử bầu Quốc hội chung năm 1976 thống nhất đất nước',
        typeLabel: 'Di tích thực tế'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQwyG3pz3RAFcwRNHJ7KTnX3K37KFgg7LvchjUzkkqg&s=10',
        title: 'Thủ đô Hà Nội thời kỳ tái thiết',
        caption: 'Công cuộc xây dựng lại hạ tầng giao thông và nhà máy sau chiến tranh',
        typeLabel: 'Ảnh tư liệu lịch sử'
      }
    ],
    keyEvents: [
      {
        year: '25/4/1976',
        title: 'Tổng tuyển cử bầu Quốc hội chung của nước Việt Nam thống nhất',
        description: 'Ngày hội non sông lịch sử, cử tri cả nước bầu ra Quốc hội chung, quyết định đặt tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam, thủ đô là Hà Nội, đổi tên Sài Gòn thành Thành phố Hồ Chí Minh.',
        location: 'Trên khắp cả nước',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 1976 – 1985',
        title: 'Tái thiết kinh tế và bảo vệ biên cương',
        description: 'Toàn dân đồng lòng vượt qua muôn vàn gian khổ của thời kỳ bao cấp, kiên cường giữ vững chủ quyền biên giới Tây Nam và biên giới phía Bắc.',
        location: 'Cả nước và tuyến biên giới',
        evidenceClass: 'verified',
      },
    ],
    famousFigures: ['Nhân dân Việt Nam', 'Cố Tổng Bí thư Lê Duẩn', 'Đại tướng Võ Nguyên Giáp'],
    relicSites: ['Bảo tàng Lịch sử Quốc gia', 'Nhà Quốc hội Việt Nam'],
    artifacts: ['Tư liệu và hiện vật thời kỳ bao cấp trước năm 1985'],
    meaning: 'Khẳng định ý chí độc lập tự chủ và sự gắn kết keo sơn của dân tộc Việt Nam trên toàn vẹn lãnh thổ hình chữ S.',
  },
  {
    id: 'period-8',
    number: 8,
    title: 'Đổi mới và hội nhập (1986 đến nay)',
    timeSpan: '1986 – Nay',
    shortDesc: 'Đại hội VI khởi xướng công cuộc Đổi mới, gia nhập ASEAN (1995), WTO (2007) và phát triển kinh tế thị trường định hướng XHCN.',
    bannerColor: 'from-amber-600 to-rose-800',
    iconName: 'Sparkles',
    context: 'Đại hội đại biểu toàn quốc lần thứ VI của Đảng (12/1986) đề ra đường lối Đổi mới toàn diện đất nước, chuyển từ nền kinh tế bao cấp sang kinh tế thị trường, chủ động mở rộng quan hệ quốc tế.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2FrVfBbpwQ1DkEYOxD81_L4DPuL1bfqPH5hCqhZjp9Q&s=10',
    imageCaption: 'Việt Nam hiện đại, đổi mới hội nhập quốc tế và vững vàng bảo vệ chủ quyền biển đảo thiêng liêng',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2FrVfBbpwQ1DkEYOxD81_L4DPuL1bfqPH5hCqhZjp9Q&s=10',
        title: 'Việt Nam vươn mình thời kỳ Đổi mới',
        caption: 'Kinh tế phát triển năng động, hội nhập ASEAN và toàn cầu',
        typeLabel: 'Ảnh tư liệu lịch sử'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4XcKEgvVdLZkAk4LpIprnVRDRhKIXbxet-FXdkCUX3g&s=10',
        title: 'Giữ gìn chủ quyền biển đảo Tổ quốc',
        caption: 'Bảo vệ vững chắc toàn vẹn lãnh thổ và biển đảo thiêng liêng Hoàng Sa - Trường Sa',
        typeLabel: 'Di tích thực tế'
      }
    ],
    keyEvents: [
      {
        year: 'Tháng 12/1986',
        title: 'Khởi đầu công cuộc Đổi mới',
        description: 'Đại hội VI Đảng Cộng sản Việt Nam đề ra đường lối đổi mới kinh tế và xã hội, giải phóng sức sản xuất và cải thiện đời sống nhân dân.',
        location: 'Hà Nội',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 1995',
        title: 'Việt Nam chính thức gia nhập ASEAN',
        description: 'Mốc son đánh dấu bước tiến hội nhập khu vực Đông Nam Á, xây dựng môi trường hòa bình, hữu nghị và hợp tác cùng phát triển.',
        location: 'Khu vực Đông Nam Á',
        evidenceClass: 'verified',
      },
      {
        year: 'Năm 2007',
        title: 'Việt Nam trở thành thành viên thứ 150 của WTO',
        description: 'Gia nhập Tổ chức Thương mại Thế giới, khẳng định vị thế và uy tín ngày càng cao của Việt Nam trên trường quốc tế.',
        location: 'Quốc tế',
        evidenceClass: 'verified',
      },
      {
        year: 'Hiện nay',
        title: 'Giữ gìn chủ quyền biển đảo & Vươn mình phát triển',
        description: 'Kiên quyết, kiên trì bảo vệ vững chắc chủ quyền biển đảo thiêng liêng Hoàng Sa – Trường Sa, ứng dụng chuyển đổi số và công nghệ để xây dựng đất nước phồn vinh.',
        location: 'Toàn vẹn lãnh thổ và biển đảo Việt Nam',
        evidenceClass: 'verified',
      },
    ],
    famousFigures: ['Cố Tổng Bí thư Nguyễn Văn Linh', 'Thế hệ trẻ Việt Nam thời đại số', 'Nhân dân Việt Nam'],
    relicSites: ['Cột mốc chủ quyền Trường Sa', 'Bảo tàng Lịch sử Quốc gia'],
    artifacts: ['Hình ảnh Việt Nam thời kỳ phát triển', 'Tư liệu lịch sử chứng minh chủ quyền Hoàng Sa, Trường Sa'],
    meaning: 'Nâng cao đời sống nhân dân, giữ vững hòa bình, độc lập và vị thế vươn mình của dân tộc Việt Nam trên trường quốc tế.',
  },
];

export const TEXTBOOK_LESSONS: TextbookLesson[] = [
  {
    id: 'les-4-01',
    code: 'LS4-B01',
    grade: 4,
    title: 'Làm quen với phương tiện học tập môn Lịch sử và Địa lí',
    periodId: 'period-1',
    objectives: [
      'Biết cách đọc lược đồ, bản đồ lịch sử đơn giản',
      'Bước đầu phân biệt hiện vật lịch sử và lời kể truyền miệng',
      'Yêu thích khám phá các di sản văn hóa'
    ],
    fiveCorePoints: [
      'Bản đồ và lược đồ lịch sử giúp ta xác định vị trí, không gian diễn ra các sự kiện.',
      'Dòng thời gian (Trục niên đại) giúp sắp xếp sự việc theo thứ tự trước - sau.',
      'Hiện vật khảo cổ (như trống đồng, mảnh gốm, mũi tên) là bằng chứng xác thực nhất của lịch sử.',
      'Truyền thuyết phản ánh ước mơ và cách giải thích của người xưa, cần phân biệt với sử liệu chứng minh.',
      'Mỗi học sinh đều có thể trở thành một nhà thám tử lịch sử nhỏ tuổi bằng cách quan sát và đặt câu hỏi.'
    ],
    timeline: [
      { year: 'Thời tiền sử', event: 'Con người sinh sống trong các hang động ở Lạng Sơn, Hòa Bình' },
      { year: 'Cách mạng 4.0', event: 'Ứng dụng công nghệ số và trí tuệ nhân tạo để học lịch sử' }
    ],
    figures: ['Các nhà khảo cổ học Việt Nam', 'Bạn Sử Nhí AI'],
    relics: ['Bảo tàng Lịch sử Quốc gia'],
    primarySource: 'SGK Lịch sử và Địa lí 4 - Bộ Kết nối tri thức với cuộc sống (Trang 6-10)',
    actionTask: 'Quan sát một hiện vật hoặc bức ảnh xưa trong gia đình em và hỏi ông bà/bố mẹ về nguồn gốc của bức ảnh đó.'
  },
  {
    id: 'les-4-02',
    code: 'LS4-B02',
    grade: 4,
    title: 'Nước Văn Lang và Âu Lạc',
    periodId: 'period-1',
    objectives: [
      'Nêu được thời gian ra đời và địa bàn của nước Văn Lang, Âu Lạc',
      'Kể lại được cuộc sống của người Lạc Việt qua văn hóa Đông Sơn',
      'Mô tả được sự kiên cố của thành Cổ Loa'
    ],
    fiveCorePoints: [
      'Nước Văn Lang hình thành khoảng thế kỉ VII TCN, đứng đầu là Vua Hùng đóng đô ở Phong Châu (Phú Thọ).',
      'Người dân Văn Lang biết trồng lúa nước, dệt vải, làm bánh chưng bánh giầy và đúc trống đồng tinh xảo.',
      'Thục Phán hợp nhất Lạc Việt và Tây Âu, xưng An Dương Vương lập ra nước Âu Lạc khoảng cuối thế kỉ III TCN.',
      'Thành Cổ Loa có 3 vòng thành đất xoắn ốc kiên cố, vừa là căn cứ bộ binh vừa có hào nước cho thủy binh.',
      'Kho hàng vạn mũi tên đồng Cầu Vực tìm thấy ở Cổ Loa chứng minh vũ khí nỏ thần bắn nhiều mũi tên là có thật trong lịch sử.'
    ],
    timeline: [
      { year: 'Thế kỉ VII TCN', event: 'Nước Văn Lang thành lập' },
      { year: 'Khoảng 208 TCN', event: 'An Dương Vương lập nước Âu Lạc' },
      { year: 'Năm 179 TCN', event: 'Triệu Đà dùng mưu chiếm Âu Lạc' }
    ],
    figures: ['Hùng Vương', 'An Dương Vương', 'Cao Lỗ'],
    relics: ['Đền Hùng (Phú Thọ)', 'Thành Cổ Loa (Đông Anh, Hà Nội)'],
    primarySource: 'Đại Việt sử ký toàn thư & Khảo cổ học Việt Nam (Khu di tích Cổ Loa)',
    actionTask: 'Vẽ sơ đồ 3 vòng thành Cổ Loa (thành Ngoại, thành Trung, thành Nội) và ghi nhớ công ơn các Vua Hùng.'
  },
  {
    id: 'les-4-03',
    code: 'LS4-B03',
    grade: 4,
    title: 'Khởi nghĩa Hai Bà Trưng (Năm 40)',
    periodId: 'period-2',
    objectives: [
      'Trình bày nguyên nhân, diễn biến chính và ý nghĩa của cuộc khởi nghĩa Hai Bà Trưng',
      'Kính trọng tinh thần quật cường của phụ nữ Việt Nam'
    ],
    fiveCorePoints: [
      'Mùa xuân năm 40, Trưng Trắc cùng em gái là Trưng Nhị phất cờ khởi nghĩa tại cửa sông Hát (Hát Môn, Hà Nội).',
      'Nguyên nhân: Do thái thú Tô Định cai trị tàn bạo, bóc lột hà khắc và giết hại ông Thi Sách (chồng bà Trưng Trắc).',
      'Lời thề xuất quân: "Một xin rửa sạch nước thù / Hai xin đem lại nghiệp xưa họ Hùng / Ba kẻo oan ức lòng chồng / Bốn xin vẹn vẹn sở công lênh này".',
      'Khởi nghĩa thắng lợi giòn giã, Tô Định cắt tóc cạo râu trốn về nước; Trưng Trắc lên ngôi vua (Trưng Nữ Vương).',
      'Ý nghĩa: Cuộc khởi nghĩa đầu tiên khẳng định ý chí quật cường, tinh thần độc lập tự chủ của dân tộc sau hơn 200 năm bị áp bức.'
    ],
    timeline: [
      { year: 'Mùa xuân năm 40', event: 'Hai Bà Trưng tế cờ khởi nghĩa ở Hát Môn' },
      { year: 'Năm 40 - 43', event: 'Trưng Nữ Vương trị vì, đóng đô tại Mê Linh' }
    ],
    figures: ['Trưng Trắc', 'Trưng Nhị', 'Lê Chân', 'Bát Nàn'],
    relics: ['Đền Hai Bà Trưng (Mê Linh, Hà Nội)', 'Đền Hát Môn (Phúc Thọ, Hà Nội)'],
    primarySource: 'Đại Việt sử ký toàn thư (Kỷ Trưng Nữ Vương) & SGK Lịch sử 4',
    actionTask: 'Cùng người thân tìm hiểu tên một đường phố hoặc ngôi trường mang tên Hai Bà Trưng gần nơi em sống.'
  },
  {
    id: 'les-4-04',
    code: 'LS4-B04',
    grade: 4,
    title: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
    periodId: 'period-2',
    objectives: [
      'Hiểu rõ kế sách cắm cọc gỗ độc đáo của Ngô Quyền trên sông Bạch Đằng',
      'Nêu được nguyên nhân thắng lợi và ý nghĩa lịch sử to lớn của năm 938'
    ],
    fiveCorePoints: [
      'Cuối năm 938, quân Nam Hán do tướng Lưu Hoằng Tháo chỉ huy theo đường biển tiến vào cửa sông Bạch Đằng.',
      'Ngô Quyền nắm rõ quy luật thủy triều lên xuống của sông, cho đẵn gỗ lim vót nhọn, bịt sắt cắm ngầm dưới lòng sông.',
      'Khi triều lên ngập bãi cọc, quân ta cử thuyền nhẹ ra khiêu chiến rồi vờ thua rút lui dụ địch vào sâu bên trong.',
      'Đúng lúc triều rút nhanh, cọc gỗ nhô lên, thuyền lớn của giặc va vào cọc thủng nát đắm chìm; Hoằng Tháo bị tiêu diệt.',
      'Chiến thắng Bạch Đằng năm 938 chấm dứt hoàn toàn hơn một nghìn năm Bắc thuộc, mở ra kỷ nguyên độc lập muôn đời cho Tổ quốc.'
    ],
    timeline: [
      { year: 'Cuối năm 938', event: 'Trận thủy chiến Bạch Đằng đại phá quân Nam Hán' },
      { year: 'Mùa xuân năm 939', event: 'Ngô Quyền lên ngôi vua, đóng đô tại Cổ Loa' }
    ],
    figures: ['Ngô Quyền', 'Dương Đình Nghệ'],
    relics: ['Bãi cọc Bạch Đằng (Yên Hưng, Quảng Ninh)', 'Khu di tích Bạch Đằng Giang (Tràng Kênh, Hải Phòng)'],
    primarySource: 'Khâm định Việt sử thông giám cương mục & Báo cáo khảo cổ bãi cọc Cao Quỳ',
    actionTask: 'Tự vẽ lược đồ minh họa dòng nước thủy triều sông Bạch Đằng và vị trí bãi cọc gỗ của Ngô Quyền.'
  },
  {
    id: 'les-5-01',
    code: 'LS5-B01',
    grade: 5,
    title: 'Cách mạng tháng Tám năm 1945 và Ngày Quốc khánh 2-9',
    periodId: 'period-4',
    objectives: [
      'Kể lại diễn biến cuộc khởi nghĩa ở Hà Nội, Huế, Sài Gòn tháng 8/1945',
      'Mô tả không khí trang nghiêm ngày 2/9/1945 tại Quảng trường Ba Đình'
    ],
    fiveCorePoints: [
      'Mùa thu năm 1945, chớp thời cơ phát xít Nhật đầu hàng, nhân dân cả nước nhất tề vùng lên khởi nghĩa giành chính quyền.',
      'Ngày 19/8/1945 khởi nghĩa thắng lợi rực rỡ tại Hà Nội; tiếp đó là Huế (23/8) và Sài Gòn (25/8).',
      'Ngày 2/9/1945, tại Quảng trường Ba Đình rợp bóng cờ đỏ sao vàng, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập.',
      'Tuyên ngôn khẳng định quyền tự do, bình đẳng và quyền mưu cầu hạnh phúc của mọi dân tộc trên thế giới.',
      'Nước Việt Nam Dân chủ Cộng hòa ra đời, chấm dứt hơn 80 năm đô hộ của thực dân và chế độ phong kiến nghìn năm.'
    ],
    timeline: [
      { year: '19/8/1945', event: 'Khởi nghĩa thắng lợi tại Hà Nội' },
      { year: '2/9/1945', event: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Ba Đình' }
    ],
    figures: ['Chủ tịch Hồ Chí Minh', 'Đại tướng Võ Nguyên Giáp'],
    relics: ['Quảng trường Ba Đình', 'Nhà số 48 Hàng Ngang (Hà Nội)'],
    primarySource: 'Tuyên ngôn Độc lập năm 1945 & Hồ Chí Minh toàn tập',
    actionTask: 'Hát vang bài Quốc ca Việt Nam (Tiến quân ca của nhạc sĩ Văn Cao) với tư thế trang nghiêm.'
  },
  {
    id: 'les-5-02',
    code: 'LS5-B02',
    grade: 5,
    title: 'Chiến thắng Điện Biên Phủ năm 1954',
    periodId: 'period-5',
    objectives: [
      'Trình bày được 3 đợt tiến công của chiến dịch Điện Biên Phủ',
      'Nêu được những tấm gương anh dũng hy sinh vì độc lập dân tộc'
    ],
    fiveCorePoints: [
      'Thực dân Pháp xây dựng Điện Biên Phủ thành tập đoàn cứ điểm gồm 49 cứ điểm kiên cố, tự coi là "pháo đài bất khả xâm phạm".',
      'Quân ta mở chiến dịch Điện Biên Phủ từ ngày 13/3/1954 đến ngày 7/5/1954 dưới sự chỉ huy trực tiếp của Đại tướng Võ Nguyên Giáp.',
      'Chiến dịch trải qua 3 đợt tiến công ác liệt; hàng vạn thanh niên xung phong, dân công hỏa tuyến chở lương thực, kéo pháo qua đèo cao vực sâu.',
      'Gương sáng ngời: Phan Đình Giót lấy thân mình lấp lỗ châu mai; Bế Văn Đàn lấy vai làm giá súng; Tô Vĩnh Diện lấy thân chèn pháo.',
      'Chiều 7/5/1954, lá cờ "Quyết chiến Quyết thắng" tung bay trên nóc hầm tướng De Castries; toàn bộ tập đoàn cứ điểm bị tiêu diệt hoàn toàn.'
    ],
    timeline: [
      { year: '13/3/1954', event: 'Mở màn chiến dịch, tiến công cụm cứ điểm Him Lam' },
      { year: '17h30 ngày 7/5/1954', event: 'Tướng De Castries đầu hàng, chiến dịch toàn thắng' }
    ],
    figures: ['Đại tướng Võ Nguyên Giáp', 'Phan Đình Giót', 'Bế Văn Đàn', 'Tô Vĩnh Diện'],
    relics: ['Đồi A1', 'Hầm chỉ huy De Castries', 'Sở chỉ huy chiến dịch Mường Phăng'],
    primarySource: 'Hồi ức "Điện Biên Phủ - Điểm hẹn lịch sử" của Đại tướng Võ Nguyên Giáp',
    actionTask: 'Kể lại cho bạn bè nghe về hành động dũng cảm của anh hùng Tô Vĩnh Diện khi cứu pháo trên đèo.'
  },
  {
    id: 'les-5-03',
    code: 'LS5-B03',
    grade: 5,
    title: 'Đại thắng mùa Xuân năm 1975 và Ngày giải phóng miền Nam',
    periodId: 'period-6',
    objectives: [
      'Hiểu ý nghĩa mốc son 11h30 ngày 30/4/1975',
      'Cảm nhận giá trị to lớn của hòa bình, độc lập và sự thống nhất non sông'
    ],
    fiveCorePoints: [
      'Sau hơn 20 năm kháng chiến chống Mỹ gian khổ, mùa xuân 1975 quân ta mở cuộc Tổng tiến công và nổi dậy trên toàn miền Nam.',
      'Chiến dịch Hồ Chí Minh lịch sử bắt đầu từ ngày 26/4/1975, năm cánh quân tiến thẳng vào sào huyệt cuối cùng của địch tại Sài Gòn.',
      'Vào lúc 11 giờ 30 phút ngày 30/4/1975, xe tăng quân giải phóng húc đổ cổng Dinh Độc Lập, cắm cờ chiến thắng trên nóc Dinh.',
      'Tổng thống chính quyền Sài Gòn Dương Văn Minh tuyên bố đầu hàng không điều kiện; chiến dịch Hồ Chí Minh toàn thắng.',
      'Đại thắng mùa Xuân 1975 đã giải phóng hoàn toàn miền Nam, non sông Việt Nam nối liền một dải từ địa đầu Móng Cái đến mũi Cà Mau.'
    ],
    timeline: [
      { year: '26/4/1975', event: 'Mở màn Chiến dịch Hồ Chí Minh' },
      { year: '11h30 ngày 30/4/1975', event: 'Lá cờ chiến thắng tung bay trên nóc Dinh Độc Lập' }
    ],
    figures: ['Đại tướng Võ Nguyên Giáp', 'Bùi Quang Thận', 'Vũ Đăng Toàn'],
    relics: ['Dinh Độc Lập (TP. Hồ Chí Minh)', 'Bảo tàng Chứng tích Chiến tranh'],
    primarySource: 'Lịch sử Quân đội Nhân dân Việt Nam & Bộ GD&ĐT',
    actionTask: 'Viết một tấm thiệp hoặc đoạn văn ngắn bày tỏ lòng biết ơn các liệt sĩ đã hy sinh vì nền hòa bình hôm nay.'
  }
];

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: 'fig-hai-ba-trung',
    name: 'Hai Bà Trưng (Trưng Trắc & Trưng Nhị)',
    title: 'Nữ anh hùng dân tộc đầu tiên khởi nghĩa giành độc lập',
    era: 'Thế kỉ I (Năm 40 - 43)',
    periodId: 'period-2',
    origin: 'Huyện Mê Linh (nay thuộc Hà Nội)',
    contribution: 'Lãnh đạo cuộc khởi nghĩa đầu tiên của nhân dân ta chống lại ách đô hộ của nhà Đông Hán, giành lại độc lập trong hơn 3 năm, xưng vương dựng nước.',
    memorableQuote: 'Một xin rửa sạch nước thù / Hai xin đem lại nghiệp xưa họ Hùng...',
    evidenceClass: 'verified',
    reflectionQuestion: 'Em học được đức tính gì từ lòng quả cảm và khí phách của Hai Bà Trưng?',
    primaryImage: {
      id: 'img-hbt-dongho',
      title: 'Hai Bà Trưng cưỡi voi xuất trận (Năm 40)',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScRmeHyvODhbB4Vu0Ir3JXpwLccDKO7yeQhz-oyvjICA&s=10',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Hai Bà Trưng phất cờ khởi nghĩa cưỡi voi xuất trận tại Hát Môn năm 40.',
      authorOrProvider: 'Dòng tranh dân gian Việt Nam / Bảo tàng Mỹ thuật Việt Nam',
      sourceName: 'Bảo tàng Mỹ thuật Việt Nam & SGK Lịch sử 4 (Bộ Kết nối tri thức)',
      sourceUrl: 'https://baotangmythuat.vn',
      license: 'Di sản văn hóa dân gian (Phạm vi công cộng)',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Kỷ Trưng Nữ Vương)',
      'SGK Lịch sử và Địa lí 4 - Bộ sách Kết nối tri thức với cuộc sống (Trang 28)',
      'Hồ sơ Di tích quốc gia đặc biệt Đền Hai Bà Trưng (Mê Linh, Hà Nội)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-ngo-quyen',
    name: 'Ngô Quyền',
    title: 'Vị vua mở nền độc lập muôn đời',
    era: 'Năm 897 – 944',
    periodId: 'period-2',
    origin: 'Đường Lâm (Sơn Tây, Hà Nội)',
    contribution: 'Sáng tạo mưu kế cắm cọc gỗ nhọn bịt sắt trên sông Bạch Đằng, chỉ huy quân sĩ nhấn chìm thuyền giặc Nam Hán, chấm dứt hơn 1000 năm Bắc thuộc.',
    memorableQuote: 'Hoằng Tháo là đứa trẻ dại, đem quân từ xa đến... Nếu ta cắm cọc lớn vạt nhọn đầu bịt sắt ở cửa biển...',
    evidenceClass: 'verified',
    reflectionQuestion: 'Tại sao việc hiểu rõ địa hình và thiên nhiên (thủy triều) lại giúp Ngô Quyền chiến thắng giặc mạnh?',
    primaryImage: {
      id: 'img-nq-statue',
      title: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbUSq-hjkOqFAcmh_YeYqy9mSZgTDtTmTWswpyhHtNw&s=10',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Kế cắm cọc gỗ lim bịt sắt của Ngô Quyền đại phá hạm đội Nam Hán trên sông Bạch Đằng năm 938.',
      authorOrProvider: 'Ban quản lý Di tích Làng cổ Đường Lâm (Hà Nội)',
      sourceName: 'Bảo tàng Lịch sử Quốc gia & Cục Di sản văn hóa',
      sourceUrl: 'https://baotanglichsu.vn',
      license: 'Tư liệu di tích quốc gia đặc biệt',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Kỷ Tiền Ngô Vương)',
      'Báo cáo khoa học Khảo cổ học Bãi cọc Cao Quỳ - Viện Khảo cổ học',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức (Trang 34)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-ly-thuong-kiet',
    name: 'Lý Thường Kiệt',
    title: 'Danh tướng kiệt xuất thời nhà Lý',
    era: 'Năm 1019 – 1105',
    periodId: 'period-3',
    origin: 'Phường Thái Hòa, kinh thành Thăng Long',
    contribution: 'Chủ động tiến công tự vệ trước quân Tống xâm lược, lập phòng tuyến sông Như Nguyệt vững chắc và đọc bài thơ thần "Nam quốc sơn hà" khẳng định chủ quyền non sông.',
    memorableQuote: 'Nam quốc sơn hà Nam đế cư / Tiệt nhiên định phận tại thiên thư...',
    evidenceClass: 'verified',
    reflectionQuestion: 'Bài thơ "Nam quốc sơn hà" được ví như bản Tuyên ngôn Độc lập đầu tiên của nước ta vì sao?',
    primaryImage: {
      id: 'img-ltk-statue',
      title: 'Tượng đài danh tướng Lý Thường Kiệt bên dòng sông Như Nguyệt',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0I7PHOE_P_zBP7BHHqtKQtPnKo1BcZrZLYFFxWTmhBA&s=10',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tượng đài Lý Thường Kiệt tại Khu tưởng niệm bờ nam sông Cầu (Tam Giang, Yên Phong, Bắc Ninh).',
      authorOrProvider: 'Sở Văn hóa, Thể thao và Du lịch tỉnh Bắc Ninh',
      sourceName: 'Cục Di sản văn hóa & Bảo tàng Tỉnh Bắc Ninh',
      sourceUrl: 'https://dsvh.gov.vn',
      license: 'Giáo dục mở & Di sản địa phương',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Bản kỷ toàn thư - Kỷ nhà Lý)',
      'Việt điện u linh tập (Chuyện thần sông Như Nguyệt)',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức (Trang 48)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-tran-hung-dao',
    name: 'Trần Hưng Đạo (Trần Quốc Tuấn)',
    title: 'Quốc công Tiết chế - Vị tướng bách chiến bách thắng',
    era: 'Năm 1228 – 1300',
    periodId: 'period-3',
    origin: 'Phủ Thiên Trường (Nam Định)',
    contribution: 'Thống lĩnh toàn quân Đại Việt ba lần đánh tan đạo quân Mông - Nguyên hùng mạnh bậc nhất thế giới thời bấy giờ, tác giả Hịch tướng sĩ bất hủ.',
    memorableQuote: 'Nếu bệ hạ muốn hàng, xin hãy chém đầu thần trước đã!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Lời dặn "Khoan thư sức dân để làm kế sâu rễ bền gốc" của Trần Hưng Đạo có ý nghĩa giáo dục sâu sắc thế nào?',
    primaryImage: {
      id: 'img-thd-statue',
      title: 'Chiến địa và di tích Quốc công Tiết chế Trần Hưng Đạo',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzOQNd9raqse9JfA3VUal9pK9ivDoyeT7ZLRigegz5iw&s=10',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Di tích đền Trần và sông Lục Đầu, nơi Hưng Đạo Đại vương thao luyện thủy binh đánh tan quân Mông - Nguyên.',
      authorOrProvider: 'Bảo tàng Tỉnh Nam Định & Cục Di sản văn hóa',
      sourceName: 'Bảo tàng Tỉnh Nam Định',
      sourceUrl: 'https://baotangnamdinh.vn',
      license: 'Tư liệu di tích quốc gia',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Kỷ nhà Trần)',
      'Hịch tướng sĩ (Bản dịch của Viện Sử học)',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-le-loi',
    name: 'Lê Lợi (Lê Thái Tổ)',
    title: 'Anh hùng khởi nghĩa Lam Sơn - Người sáng lập nhà Hậu Lê',
    era: 'Năm 1385 – 1433',
    periodId: 'period-3',
    origin: 'Lam Sơn, Thanh Hóa',
    contribution: 'Lãnh đạo nhân dân kiên trì kháng chiến chống ách đô hộ của nhà Minh suốt 10 năm gian khổ, giành lại giang sơn và phục hưng nền văn hiến Đại Việt.',
    memorableQuote: 'Việc nhân nghĩa cốt ở yên dân / Quân điếu phạt trước lo trừ bạo (Bình Ngô đại cáo)',
    evidenceClass: 'verified',
    reflectionQuestion: 'Hình ảnh rùa vàng nhận lại gươm thần ở Hồ Gươm thể hiện khát vọng gì của nhân dân ta?',
    primaryImage: {
      id: 'img-ll-statue',
      title: 'Tượng đài Vua Lê Thái Tổ bên bờ Hồ Hoàn Kiếm (Hà Nội)',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4b_snpduVc_o-Z4k6wOEt9ZHWOC_35ukrF2LuywiUSA&s=10',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tượng đài vua Lê Lợi tay cầm gươm báu hướng ra mặt hồ Tả Vọng (Hồ Gươm), tưởng nhớ sự tích trả gươm báu.',
      authorOrProvider: 'Ban quản lý Di tích danh thắng Hồ Hoàn Kiếm (Hà Nội)',
      sourceName: 'Bảo tàng Hà Nội & Sở Văn hóa Thể thao Hà Nội',
      sourceUrl: 'https://hoankiem.hanoi.gov.vn',
      license: 'Tư liệu di tích quốc gia đặc biệt',
    },
    sourceReferences: [
      'Đại Việt thông sử (Lê Quý Đôn)',
      'Bình Ngô đại cáo (Nguyễn Trãi soạn năm 1428)',
      'Khu di tích quốc gia đặc biệt Lam Sơn (Thanh Hóa)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-quang-trung',
    name: 'Quang Trung (Nguyễn Huệ)',
    title: 'Vị anh hùng áo vải cờ đào - Thiên tài quân sự',
    era: 'Năm 1753 – 1792',
    periodId: 'period-3',
    origin: 'Tây Sơn, Bình Định',
    contribution: 'Lãnh đạo phong trào Tây Sơn xóa bỏ chia cắt Đàng Trong - Đàng Ngoài, đánh tan quân Xiêm ở Rạch Gầm - Xoài Mút và quét sạch 29 vạn quân Mãn Thanh vào mùa xuân Kỷ Dậu 1789.',
    memorableQuote: 'Đánh cho để dài tóc / Đánh cho để đen răng / Đánh cho nó chích luân bất phản / Đánh cho nó phiến giáp bất hoàn...',
    evidenceClass: 'verified',
    reflectionQuestion: 'Tốc độ hành quân thần tốc của vua Quang Trung từ Phú Xuân ra Thăng Long dạy chúng ta bài học gì về tính quyết đoán?',
    primaryImage: {
      id: 'img-qt-statue',
      title: 'Tượng đài Hoàng đế Quang Trung tại Công viên văn hóa Gò Đống Đa',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpTiwxBJm1OZnv8MQuPF_kyNDm0D0NZDgEutxpS75KVw&s=10',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tượng đài Quang Trung - Nguyễn Huệ bằng đồng sừng sững tại di tích lịch sử Gò Đống Đa (Hà Nội).',
      authorOrProvider: 'Ban quản lý Di tích Gò Đống Đa (Hà Nội)',
      sourceName: 'Bảo tàng Hà Nội & Cục Di sản văn hóa',
      sourceUrl: 'https://dsvh.gov.vn',
      license: 'Di tích quốc gia đặc biệt',
    },
    sourceReferences: [
      'Đại Nam chính biên liệt truyện',
      'Hoàng Lê nhất thống chí (Ngô gia văn phái)',
      'Bảo tàng Quang Trung (Tây Sơn, Bình Định)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-ho-chi-minh',
    name: 'Chủ tịch Hồ Chí Minh',
    title: 'Lãnh tụ vĩ đại của dân tộc - Danh nhân văn hóa thế giới',
    era: '19/5/1890 – 2/9/1969',
    periodId: 'period-4',
    origin: 'Làng Sen, Kim Liên, Nam Đàn, Nghệ An',
    contribution: 'Người tìm ra con đường cứu nước giải phóng dân tộc, sáng lập Đảng Cộng sản Việt Nam, khai sinh nước Việt Nam Dân chủ Cộng hòa và lãnh đạo kháng chiến giành độc lập trọn vẹn.',
    memorableQuote: 'Không có gì quý hơn độc lập, tự do!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Em đã thực hiện theo 5 điều Bác Hồ dạy thiếu niên, nhi đồng như thế nào trong học tập và sinh hoạt hàng ngày?',
    primaryImage: {
      id: 'img-hcm-declaration',
      title: 'Bác Hồ đọc Tuyên ngôn Độc lập tại Ba Đình (2/9/1945)',
      url: '/src/assets/images/ba_dinh_1945_1792643653339.jpg',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa ngày 2-9-1945.',
      authorOrProvider: 'Trung tâm Lưu trữ Quốc gia III & Thông tấn xã Việt Nam',
      sourceName: 'Cục Văn thư và Lưu trữ nhà nước & Thông tấn xã Việt Nam',
      sourceUrl: 'https://archives.gov.vn',
      license: 'Tư liệu lưu trữ quốc gia Việt Nam',
    },
    sourceReferences: [
      'Bản gốc Tuyên ngôn Độc lập năm 1945 - Trung tâm Lưu trữ Quốc gia III',
      'Hồ Chí Minh toàn tập (Nhà xuất bản Chính trị Quốc gia)',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-vo-nguyen-giap',
    name: 'Đại tướng Võ Nguyên Giáp',
    title: 'Người Anh Cả của Quân đội Nhân dân Việt Nam',
    era: '25/8/1911 – 4/10/2013',
    periodId: 'period-5',
    origin: 'Lệ Thủy, Quảng Bình',
    contribution: 'Tổng tư lệnh chỉ huy chiến dịch Điện Biên Phủ 1954 và chiến dịch Hồ Chí Minh 1975, được thế giới tôn vinh là một trong những danh tướng kiệt xuất của mọi thời đại.',
    memorableQuote: 'Thần tốc, thần tốc hơn nữa; táo bạo, táo bạo hơn nữa; tranh thủ từng phút, từng giờ; xốc tới mặt trận, giải phóng miền Nam!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Quyết định chuyển từ "đánh nhanh, thắng nhanh" sang "đánh chắc, tiến chắc" ở Điện Biên Phủ cho thấy tinh thần trách nhiệm gì của vị tướng?',
    primaryImage: {
      id: 'img-vng-muongphang',
      title: 'Đại tướng Võ Nguyên Giáp và Chiến thắng Điện Biên Phủ',
      url: '/src/assets/images/dien_bien_phu_1792643655116.jpg',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Chiến thắng lịch sử Điện Biên Phủ ngày 7/5/1954 dưới sự chỉ huy thao lược của Đại tướng Võ Nguyên Giáp.',
      authorOrProvider: 'Bảo tàng Lịch sử Quân sự Việt Nam',
      sourceName: 'Bảo tàng Lịch sử Quân sự Việt Nam',
      sourceUrl: 'https://btlsqsvn.org.vn',
      license: 'Tư liệu lưu trữ quốc gia',
    },
    sourceReferences: [
      'Hồi ức "Điện Biên Phủ - Điểm hẹn lịch sử" của Đại tướng Võ Nguyên Giáp',
      'Bảo tàng Chiến thắng lịch sử Điện Biên Phủ',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-dinh-bo-linh',
    name: 'Đinh Bộ Lĩnh (Đinh Tiên Hoàng)',
    title: 'Vạn Thắng Vương - Vị hoàng đế đầu tiên của Đại Cồ Việt',
    era: 'Năm 924 – 979',
    periodId: 'period-3',
    origin: 'Gia Viễn, Ninh Bình',
    contribution: 'Từ trò chơi cờ lau tập trận thuở nhỏ, lớn lên đã mưu trí và dũng cảm đánh dẹp 12 sứ quân, thống nhất non sông, xưng Hoàng đế (Đinh Tiên Hoàng), đặt quốc hiệu Đại Cồ Việt và định đô tại Hoa Lư.',
    memorableQuote: 'Đại Cồ Việt là quốc gia độc lập có chủ quyền, ngang hàng với các đế chế phương Bắc.',
    evidenceClass: 'verified',
    reflectionQuestion: 'Trò chơi "Cờ lau tập trận" của Đinh Bộ Lĩnh dạy cho thiếu nhi bài học gì về tính tự lập, kỷ luật và tinh thần đoàn kết bè bạn?',
    primaryImage: {
      id: 'img-dbl-statue',
      title: 'Cố đô Hoa Lư - Nơi Vua Đinh Tiên Hoàng định đô',
      url: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&w=600&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Quần thể Cố đô Hoa Lư (Ninh Bình), kinh đô đầu tiên của nước Đại Cồ Việt độc lập tự chủ.',
      authorOrProvider: 'Ban quản lý Di tích Cố đô Hoa Lư & Sở VHTT Ninh Bình',
      sourceName: 'Cục Di sản Văn hóa & Bảo tàng Ninh Bình',
      sourceUrl: 'https://dsvh.gov.vn',
      license: 'Di tích quốc gia đặc biệt',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Kỷ nhà Đinh)',
      'Khâm định Việt sử thông giám cương mục',
      'SGK Lịch sử và Địa lí 4 - Bộ sách Kết nối tri thức (Trang 38)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-ly-thai-to',
    name: 'Lý Thái Tổ (Lý Công Uẩn)',
    title: 'Vị vua khai sáng triều Lý - Người ban Chiếu dời đô về Thăng Long',
    era: 'Năm 974 – 1028',
    periodId: 'period-3',
    origin: 'Cổ Pháp (Từ Sơn, Bắc Ninh)',
    contribution: 'Năm 1010, ban Chiếu dời đô lịch sử chuyển kinh đô từ Hoa Lư chật hẹp về Đại La, đổi tên thành Thăng Long (Rồng bay lên), mở ra thời kì phát triển rực rỡ nghìn năm văn hiến của thủ đô Hà Nội.',
    memorableQuote: 'Ở vào nơi trung tâm trời đất, được thế rồng cuộn hổ ngồi... Là chốn tụ hội trọng yếu của bốn phương đất nước, đúng là nơi định đô bậc nhất của muôn đời đế vương (Chiếu dời đô).',
    evidenceClass: 'verified',
    reflectionQuestion: 'Tại sao quyết định dời đô về Thăng Long của vua Lý Thái Tổ được coi là tầm nhìn chiến lược vĩ đại cho tương lai đất nước?',
    primaryImage: {
      id: 'img-ltt-statue',
      title: 'Vua Lý Thái Tổ dời đô về Thăng Long năm 1010',
      url: '/src/assets/images/thang_long_1010_1792643652874.jpg',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Đoàn thuyền rồng vua Lý Thái Tổ cập bến Đại La, thấy rồng vàng bay lên bèn đổi tên thành Thăng Long năm 1010.',
      authorOrProvider: 'UBND Thành phố Hà Nội & Sở VHTT Hà Nội',
      sourceName: 'Bảo tàng Hà Nội & Đại Việt Sử ký Toàn thư',
      sourceUrl: 'https://baotanghanoi.vn',
      license: 'Công trình văn hóa biểu tượng Thủ đô',
    },
    sourceReferences: [
      'Chiếu dời đô (Thiên đô chiếu - Năm 1010)',
      'Đại Việt sử ký toàn thư (Kỷ nhà Lý)',
      'SGK Lịch sử và Địa lí 4 - Bộ Kết nối tri thức (Trang 42)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-chu-van-an',
    name: 'Chu Văn An',
    title: 'Người thầy của muôn đời (Vạn thế sư biểu)',
    era: 'Năm 1292 – 1370',
    periodId: 'period-3',
    origin: 'Thanh Trì, Hà Nội',
    contribution: 'Tư nghiệp Quốc Tử Giám, dâng "Thất trảm sớ" xin chém 7 tên nịnh thần lộng hành. Nêu tấm gương sáng ngời về đức tính cương trực, liêm khiết và tận tụy với sự nghiệp giáo dục trồng người.',
    memorableQuote: 'Ta chưa từng thấy người nào không học mà có thể trở thành người có đức độ, có tài năng giúp ích cho đời.',
    evidenceClass: 'verified',
    reflectionQuestion: 'Tinh thần "Tôn sư trọng đạo" và tính cương trực của thầy Chu Văn An nhắc nhở chúng ta điều gì trong việc rèn luyện đạo đức?',
    primaryImage: {
      id: 'img-cva-statue',
      title: 'Tượng thờ Danh sư Chu Văn An tại Văn Miếu - Quốc Tử Giám',
      url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tượng thờ Vạn thế sư biểu Chu Văn An tại Nhà Thái Học - Văn Miếu Quốc Tử Giám (Hà Nội).',
      authorOrProvider: 'Trung tâm Hoạt động VHKH Văn Miếu - Quốc Tử Giám',
      sourceName: 'Văn Miếu - Quốc Tử Giám & UNESCO',
      sourceUrl: 'https://vanmieu.gov.vn',
      license: 'Di sản quốc gia đặc biệt',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Bản kỷ nhà Trần)',
      'Văn bia Văn Miếu - Quốc Tử Giám',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-kim-dong',
    name: 'Anh hùng Kim Đồng (Nông Văn Dền)',
    title: 'Người đội trưởng đầu tiên của Đội Thiếu niên Tiền phong Hồ Chí Minh',
    era: 'Năm 1929 – 15/2/1943',
    periodId: 'period-4',
    origin: 'Thôn Nà Mạ, xã Trường Hà, huyện Hà Quảng, tỉnh Cao Bằng',
    contribution: 'Làm nhiệm vụ giao liên, bảo vệ cán bộ cách mạng tại chiến khu Pác Bó. Trong một lần canh gác, phát hiện quân địch phục kích, anh đã dũng cảm đánh lạc hướng để các cán bộ rút lui an toàn và anh dũng hy sinh khi mới 14 tuổi.',
    memorableQuote: 'Tuổi nhỏ chí lớn, vì độc lập tự do của Tổ quốc mà không sợ hiểm nguy gian khổ!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Tấm gương anh dũng hy sinh của anh Kim Đồng khi bảo vệ bí mật cách mạng truyền cho thiếu nhi Việt Nam bài học gì về lòng yêu nước?',
    primaryImage: {
      id: 'img-kd-monument',
      title: 'Khu di tích lịch sử mộ Anh hùng Kim Đồng tại Nà Mạ (Cao Bằng)',
      url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tượng đài người thiếu niên anh hùng Kim Đồng tay cầm chú chim nhỏ tung bay tại Khu di tích Pác Bó (Cao Bằng).',
      authorOrProvider: 'Tỉnh Đoàn Cao Bằng & Hội đồng Đội Trung ương',
      sourceName: 'Bảo tàng Lịch sử Quốc gia & Trung ương Đoàn TNCS Hồ Chí Minh',
      sourceUrl: 'https://doanthanhnien.vn',
      license: 'Di tích lịch sử thiếu nhi Việt Nam',
    },
    sourceReferences: [
      'Lịch sử Đội Thiếu niên Tiền phong Hồ Chí Minh',
      'Hồ sơ Khu di tích quốc gia đặc biệt Pác Bó (Cao Bằng)',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-vo-thi-sau',
    name: 'Nữ anh hùng Võ Thị Sáu',
    title: 'Người con gái Đất Đỏ kiên trung bất khuất',
    era: 'Năm 1933 – 23/1/1952',
    periodId: 'period-5',
    origin: 'Đất Đỏ, Bà Rịa - Vũng Tàu',
    contribution: 'Tham gia kháng chiến từ năm 14 tuổi, dũng cảm làm nhiệm vụ trinh sát và diệt ác trừ gian. Bị địch bắt đày ra nhà tù Côn Đảo, trước họng súng kẻ thù chị vẫn hiên ngang ngẩng cao đầu hát vang bài Tiến quân ca.',
    memorableQuote: 'Tôi không có tội. Chỉ có kẻ cướp nước và tay sai mới là có tội!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Hình ảnh chị Võ Thị Sáu cài hoa lên mái tóc trước khi ra pháp trường thể hiện tinh thần lạc quan và khí phách yêu nước như thế nào?',
    primaryImage: {
      id: 'img-vts-monument',
      title: 'Tượng đài Nữ anh hùng liệt sĩ Võ Thị Sáu tại Đất Đỏ',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tượng đài chị Võ Thị Sáu bằng đồng hiên ngang tạc vào mây trời quê hương Đất Đỏ (Bà Rịa - Vũng Tàu).',
      authorOrProvider: 'Sở VHTTDL Tỉnh Bà Rịa - Vũng Tàu',
      sourceName: 'Khu di tích Lịch sử Nhà tù Côn Đảo & Bảo tàng Phụ nữ Nam Bộ',
      sourceUrl: 'https://dsvh.gov.vn',
      license: 'Di tích lịch sử văn hóa quốc gia',
    },
    sourceReferences: [
      'Bảo tàng Côn Đảo - Hồ sơ Nữ anh hùng LLVTND Võ Thị Sáu',
      'Lịch sử Phụ nữ Nam Bộ kháng chiến',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-to-vinh-dien',
    name: 'Anh hùng Tô Vĩnh Diện',
    title: 'Người anh hùng lấy thân mình chèn pháo Điện Biên Phủ',
    era: 'Năm 1924 – 1/2/1954',
    periodId: 'period-5',
    origin: 'Nông Cống, Thanh Hóa',
    contribution: 'Trong đêm kéo pháo cao xạ 37mm nặng hơn 2 tấn vượt dốc Bờ Chuối đèo dốc hiểm trở về vị trí tập kết an toàn theo phương châm "đánh chắc tiến chắc", khi dây tời đứt pháo lao xuống dốc, anh đã không ngần ngại lao mình vào bánh pháo để cứu pháo không rơi xuống vực sâu.',
    memorableQuote: 'Thà hy sinh thân mình chứ quyết không để pháo hỏng!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Hành động quên mình cứu pháo của anh Tô Vĩnh Diện thể hiện ý thức trách nhiệm và tình yêu đồng đội, yêu vũ khí ra sao?',
    primaryImage: {
      id: 'img-tvd-art',
      title: 'Khẩu pháo cao xạ 37mm số hiệu 510681 được anh Tô Vĩnh Diện cứu (Bảo vật Quốc gia)',
      url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
      type: 'museum_artifact',
      typeLabel: 'Hiện vật bảo tàng',
      caption: 'Khẩu pháo cao xạ 37mm gắn liền với chiến công hy sinh chèn pháo của Anh hùng Tô Vĩnh Diện tại Bảo tàng Phòng không - Không quân.',
      authorOrProvider: 'Bảo tàng Phòng không - Không quân (Hà Nội)',
      sourceName: 'Bảo tàng Chiến thắng Lịch sử Điện Biên Phủ & Cục Di sản văn hóa',
      sourceUrl: 'https://baotanglichsu.vn',
      license: 'Bảo vật Quốc gia Việt Nam',
    },
    sourceReferences: [
      'Bảo tàng Chiến dịch Điện Biên Phủ',
      'Hồ sơ Bảo vật quốc gia: Khẩu pháo cao xạ 37mm',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức (Trang 52)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-phan-dinh-giot',
    name: 'Anh hùng Phan Đình Giót',
    title: 'Người chiến sĩ lấy thân mình lấp lỗ châu mai',
    era: 'Năm 1922 – 13/3/1954',
    periodId: 'period-5',
    origin: 'Cẩm Xuyên, Hà Tĩnh',
    contribution: 'Trận mở màn chiến dịch Điện Biên Phủ đánh cứ điểm Him Lam ngày 13/3/1954, hỏa lực địch từ lỗ châu mai bắn rát cản bước tiến quân ta. Dù đã bị thương nhiều vết, anh vẫn bò sát lỗ châu mai, dùng cả lồng ngực mình bịt chặt họng súng giặc, mở đường cho đồng đội xông lên cắm cờ chiến thắng.',
    memorableQuote: 'Quyết tử cho Tổ quốc quyết sinh!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Lòng quả cảm phi thường của anh Phan Đình Giót tiếp thêm ngọn lửa nhiệt huyết gì cho thế hệ trẻ ngày nay?',
    primaryImage: {
      id: 'img-pdg-himlam',
      title: 'Bức tranh đắp nổi tái hiện Anh hùng Phan Đình Giót tại đồi Him Lam',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Bia tưởng niệm anh hùng liệt sĩ Phan Đình Giót tại cứ điểm Him Lam (Chiến trường Điện Biên Phủ).',
      authorOrProvider: 'Khu di tích Chiến trường Điện Biên Phủ',
      sourceName: 'Bảo tàng Lịch sử Quân sự Việt Nam',
      sourceUrl: 'https://dienbien.gov.vn',
      license: 'Di tích quốc gia đặc biệt',
    },
    sourceReferences: [
      'Lịch sử Sư đoàn 312 - Quân đoàn 1',
      'Bảo tàng Chiến thắng Điện Biên Phủ',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-be-van-dan',
    name: 'Anh hùng Bế Văn Đàn',
    title: 'Người chiến sĩ lấy vai mình làm giá súng',
    era: 'Năm 1931 – 12/12/1953',
    periodId: 'period-5',
    origin: 'Quảng Uyên, Cao Bằng (Dân tộc Tày)',
    contribution: 'Trong trận chiến đấu quyết liệt tại Mường Pồn (Điện Biên) cuối năm 1953, khẩu trung liên của đồng đội thiếu điểm tựa không thể bắn kiềm chế quân địch. Bế Văn Đàn đã lao tới ghì chặt hai càng súng lên vai mình và hô: "Kẻ thù trước mặt, đồng chí hãy bắn đi!", cổ vũ đồng đội tiêu diệt gọn đại đội địch.',
    memorableQuote: 'Kẻ thù trước mặt, đồng chí hãy bắn đi!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Câu nói của anh Bế Văn Đàn thể hiện tinh thần đoàn kết keo sơn vì mục tiêu chung của dân tộc như thế nào?',
    primaryImage: {
      id: 'img-bvd-muongpon',
      title: 'Tượng đài Anh hùng Bế Văn Đàn tại xã Mường Pồn (Điện Biên)',
      url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tượng đài anh hùng Bế Văn Đàn sừng sững tại thung lũng Mường Pồn, tỉnh Điện Biên.',
      authorOrProvider: 'UBND Tỉnh Điện Biên & Huyện Điện Biên',
      sourceName: 'Bảo tàng Lịch sử Quân sự Việt Nam',
      sourceUrl: 'https://btlsqsvn.org.vn',
      license: 'Di tích lịch sử quốc gia',
    },
    sourceReferences: [
      'Lịch sử Sư đoàn 316 - Bông hoa Rừng Tây Bắc',
      'Bảo tàng Lịch sử Quân sự Việt Nam',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-hung-vuong',
    name: 'Thời đại Hùng Vương (18 đời Vua Hùng)',
    title: 'Thủy tổ dựng nước Văn Lang - Mở đầu lịch sử dân tộc',
    era: 'Khoảng thế kỷ VII TCN đến 258 TCN',
    periodId: 'period-1',
    origin: 'Kinh đô Phong Châu (nay thuộc Phú Thọ)',
    contribution: 'Khai sinh quốc gia Văn Lang - nhà nước đầu tiên của người Việt cổ trên đất Phong Châu (Phú Thọ), đặt nền móng văn minh lúa nước, chế tác trống đồng Đông Sơn và truyền thống đoàn kết cộng đồng Lạc Việt.',
    biography: 'Theo sử cũ, thời Hùng Vương trải qua 18 đời vua, cai quản 15 bộ lạc, chia quan tướng thành Lạc hầu, Lạc tướng và Bố chính. Người dân thời bấy giờ chăm chỉ cấy lúa nước, săn bắn, đánh cá và sáng tạo nền văn hóa đồng thau rực rỡ.',
    achievements: [
      'Thành lập nhà nước sơ khai Văn Lang, định hình cương thổ đầu tiên của dân tộc',
      'Sáng tạo nền văn hóa Đông Sơn đỉnh cao với trống đồng, thạp đồng, lưỡi cày đồng',
      'Khởi nguồn cho đạo lý "Uống nước nhớ nguồn" và tín ngưỡng Giỗ Tổ Hùng Vương (mùng 10 tháng 3 âm lịch)'
    ],
    anecdote: 'Bác Hồ khi về thăm Đền Hùng ngày 19/9/1954 đã căn dặn cán bộ, chiến sĩ Đại đoàn Quân Tiên Phong câu nói lịch sử: "Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước."',
    memorableQuote: 'Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước! (Lời Bác Hồ tại Đền Hùng)',
    evidenceClass: 'verified',
    reflectionQuestion: 'Tại sao ngày Giỗ Tổ Hùng Vương mùng 10 tháng 3 âm lịch lại trở thành ngày Quốc lễ thiêng liêng của toàn thể người dân Việt Nam?',
    primaryImage: {
      id: 'img-den-hung-phutho',
      title: 'Đền Thượng - Khu di tích lịch sử quốc gia đặc biệt Đền Hùng (Phú Thọ)',
      url: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Khu Di tích Quốc gia đặc biệt Đền Hùng trên núi Nghĩa Lĩnh (Phú Thọ), cội nguồn tổ tiên của muôn triệu con Lạc cháu Hồng.',
      authorOrProvider: 'Ban quản lý Khu di tích lịch sử Đền Hùng & Sở VHTTDL Phú Thọ',
      sourceName: 'Khu Di tích Lịch sử Đền Hùng & UNESCO (Tín ngưỡng thờ cúng Hùng Vương)',
      sourceUrl: 'https://dsvh.gov.vn',
      license: 'Di sản văn hóa phi vật thể đại diện của nhân loại',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Ngoại kỷ - Kỷ Hồng Bàng thị)',
      'Hồ sơ UNESCO công nhận Tín ngưỡng thờ cúng Hùng Vương',
      'SGK Lịch sử và Địa lí 4 - Bộ Kết nối tri thức (Trang 16)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-an-duong-vuong',
    name: 'An Dương Vương (Thục Phán)',
    title: 'Vua nước Âu Lạc - Người xây thành Cổ Loa độc đáo',
    era: 'Thế kỷ III TCN (257 TCN – 208 TCN)',
    periodId: 'period-1',
    origin: 'Kinh đô Cổ Loa (Đông Anh, Hà Nội)',
    contribution: 'Hợp nhất người Tây Âu và Lạc Việt lập nên quốc gia Âu Lạc phát triển, dời đô về Cổ Loa xây dựng thành ốc xoáy 9 tầng kiên cố cùng nỏ liên châu bắn ra hàng ngàn mũi tên đồng bảo vệ đất nước.',
    biography: 'Thục Phán là thủ lĩnh tài ba của bộ tộc Tây Âu. Sau khi đánh lui quân Tần xâm lược, ông nối tiếp sự nghiệp các Vua Hùng, đổi quốc hiệu thành Âu Lạc, xưng An Dương Vương và chọn vùng Cổ Loa trù phú làm trung tâm chính trị quân sự.',
    achievements: [
      'Xây dựng thành Cổ Loa xoáy trôn ốc 9 vòng bằng đất và đá kiên cố bậc nhất Đông Nam Á',
      'Phát triển quân sự vượt bậc với kho mũi tên đồng Cầu Vực và nỏ liên châu huyền thoại',
      'Đánh bại nhiều cuộc tấn công xâm lược của quân Triệu Đà'
    ],
    anecdote: 'Theo truyền thuyết, Rùa Vàng (Kim Quy) hiện lên chỉ cho vua cách đắp thành không bị sụt lở và trao vuốt rùa cho danh tướng Cao Lỗ làm lẫy nỏ thần bắn bách phát bách trúng.',
    memorableQuote: 'Thành Cổ Loa: Thành rộng nghìn trượng, xoáy như hình con ốc, lũy cao hào sâu muôn thuở vững bền.',
    evidenceClass: 'verified',
    reflectionQuestion: 'Bài học cảnh giác từ bi kịch mất nỏ thần và thành Cổ Loa trong lịch sử nhắc nhở chúng ta điều gì trong việc bảo vệ bí mật và an ninh đất nước?',
    primaryImage: {
      id: 'img-coloa-den',
      title: 'Đền thờ An Dương Vương tại trung tâm Thành Cổ Loa (Đông Anh, Hà Nội)',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Đền Thượng Cổ Loa (Hà Nội) nơi thờ Vua An Dương Vương, xung quanh còn lưu giữ dấu tích lũy thành và hào nước.',
      authorOrProvider: 'Ban quản lý Khu di tích Cổ Loa (Hà Nội)',
      sourceName: 'Cục Di sản văn hóa & Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội',
      sourceUrl: 'https://hoangthanhthanglong.vn',
      license: 'Di tích quốc gia đặc biệt',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Kỷ nhà Thục)',
      'Báo cáo khảo cổ học khai quật hàng vạn mũi tên đồng Cổ Loa',
      'SGK Lịch sử và Địa lí 4 - Bộ Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-ba-trieu',
    name: 'Bà Triệu (Triệu Thị Trinh)',
    title: 'Nữ kiệt Lạc Việt - "Muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ"',
    era: 'Năm 225 – 248',
    periodId: 'period-2',
    origin: 'Miền núi Quan Yên, quận Cửu Chân (nay thuộc Thanh Hóa)',
    contribution: 'Lãnh đạo cuộc khởi nghĩa kiên cường chống lại quân xâm lược nhà Đông Ngô năm 248, làm rung chuyển cả chính quyền đô hộ phương Bắc, để lại tấm gương khí phách ngút trời.',
    biography: 'Triệu Thị Trinh mồ côi cha mẹ từ nhỏ, sống với anh trai là Triệu Quốc Đạt. Năm 19 tuổi, bà cùng anh tập hợp nghĩa quân tại núi Nưa (Triệu Sơn, Thanh Hóa) rồi tiến xuống đồng bằng đánh đuổi quan lại nhà Ngô.',
    achievements: [
      'Chỉ huy nghĩa binh liên tiếp hạ nhiều thành trì của giặc Ngô ở Cửu Chân, Cửu Đức',
      'Tạo nên biểu tượng nữ tướng oai phong mặc áo giáp vàng, đi guốc ngà, cưỡi voi trắng xuất trận',
      'Khẳng định ý chí độc lập bất khuất của dân tộc trước mọi kẻ thù hùng mạnh'
    ],
    anecdote: 'Khi anh trai khuyên bà nên lấy chồng yên phận phụ nữ, Bà Triệu khẳng khái đáp câu nói bất hủ lưu truyền muôn đời: "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông, lấy lại giang sơn, dựng nền độc lập, cởi ách nô lệ, chứ không chịu khom lưng làm tì thiếp cho người!"',
    memorableQuote: 'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông, lấy lại giang sơn, dựng nền độc lập, cởi ách nô lệ...',
    evidenceClass: 'verified',
    reflectionQuestion: 'Khí phách hiên ngang và khát vọng tự do của Bà Triệu truyền cảm hứng gì cho thế hệ trẻ ngày nay?',
    primaryImage: {
      id: 'img-ba-trieu-tranh',
      title: 'Bà Triệu cưỡi voi trắng xuất trận đánh quân Đông Ngô (Tranh dân gian)',
      url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
      type: 'illustration',
      typeLabel: 'Tranh minh họa',
      caption: 'Bức họa dân gian tái hiện hình ảnh Nữ tướng Bà Triệu oai phong lẫm liệt trên lưng voi trắng xông pha trận mạc.',
      authorOrProvider: 'Bảo tàng Phụ nữ Việt Nam & Bảo tàng Mỹ thuật Việt Nam',
      sourceName: 'Bảo tàng Phụ nữ Việt Nam & SGK Lịch sử và Địa lí 4',
      sourceUrl: 'https://baotangphunu.org.vn',
      license: 'Di sản văn hóa dân gian Việt Nam',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Ngoại kỷ - Kỷ thuộc Ngô, Tấn, Tống, Tề, Lương)',
      'Di tích Lịch sử và Kiến trúc nghệ thuật Đền Bà Triệu (Hậu Lộc, Thanh Hóa)',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-tran-quoc-toan',
    name: 'Trần Quốc Toản (Hoài Văn Hầu)',
    title: 'Thiếu niên anh hùng bóp nát quả cam - Cờ thêu sáu chữ vàng',
    era: 'Năm 1267 – 1285',
    periodId: 'period-3',
    origin: 'Hoàng tộc nhà Trần (Phủ Thiên Trường, Nam Định)',
    contribution: 'Dù tuổi còn nhỏ không được dự bàn việc quân tại hội nghị Bình Than, chàng thiếu niên đã tự chiêu mộ hơn một nghìn gia nô thân thuộc, sắm vũ khí chiến thuyền, thêu cờ sáu chữ vàng "Phá cường địch, báo hoàng ân" xông pha tiền tuyến đánh giặc Nguyên Mông.',
    biography: 'Trần Quốc Toản được phong tước Hoài Văn Hầu khi mới hơn mười tuổi. Khi quân Mông - Nguyên lăm le xâm lược, vua Trần mở hội nghị Bình Than triệu tập vương hầu bàn kế sách. Vì chưa đến tuổi thành niên nên Quốc Toản không được dự.',
    achievements: [
      'Tự thân tập hợp hơn 1.000 tráng sĩ, rèn đúc vũ khí tổ chức thành đội quân tinh nhuệ',
      'Lập chiến công xuất sắc giải phóng bến Chương Dương và Tây Kết bên cạnh danh tướng Trần Nhật Duật',
      'Biểu tượng sáng ngời của tinh thần "Tuổi nhỏ chí lớn", yêu nước thương nòi của thiếu nhi Việt Nam'
    ],
    anecdote: 'Tại hội nghị Bình Than, vua Trần Nhân Tông thấy Hoài Văn Hầu còn nhỏ tuổi mà khí khái hơn người, bèn ban cho một quả cam quý. Vì ấm ức không được dự bàn việc lớn đánh giặc và sục sôi lòng căm thù quân cướp nước, chàng đã vô tình bóp nát quả cam trong tay lúc nào không hay.',
    memorableQuote: 'Phá cường địch, báo hoàng ân (Đánh tan giặc dữ, đền ơn vua cha - Sáu chữ vàng trên lá cờ xuất trận)',
    evidenceClass: 'verified',
    reflectionQuestion: 'Hành động bóp nát quả cam và may cờ xuất trận của Trần Quốc Toản dạy chúng ta bài học gì về trách nhiệm của người trẻ tuổi đối với quê hương đất nước?',
    primaryImage: {
      id: 'img-tqt-dongho',
      title: 'Trần Quốc Toản bóp nát quả cam và phất cờ sáu chữ vàng (Tranh khắc gỗ)',
      url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      type: 'illustration',
      typeLabel: 'Tranh minh họa',
      caption: 'Bức họa thiếu niên anh hùng Trần Quốc Toản cầm quả cam giận sôi trước bến Bình Than, sau lưng là lá cờ sáu chữ vàng tung bay.',
      authorOrProvider: 'Bảo tàng Lịch sử Quốc gia & NXB Giáo dục Việt Nam',
      sourceName: 'Đại Việt sử ký toàn thư & SGK Lịch sử và Địa lí 4',
      sourceUrl: 'https://baotanglichsu.vn',
      license: 'Giáo dục truyền thống thiếu niên Việt Nam',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Bản kỷ toàn thư - Kỷ nhà Trần)',
      'Tác phẩm "Lá cờ thêu sáu chữ vàng" của nhà văn Nguyễn Huy Tưởng',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức (Trang 50)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-nguyen-trai',
    name: 'Nguyễn Trãi (Ức Trai)',
    title: 'Danh nhân văn hóa thế giới - Quân sư lỗi lạc khởi nghĩa Lam Sơn',
    era: 'Năm 1380 – 1442',
    periodId: 'period-3',
    origin: 'Làng Nhị Khê (Thường Tín, Hà Nội) & Chí Linh (Hải Dương)',
    contribution: 'Quân sư đắc lực bên cạnh Lê Lợi trong 10 năm khởi nghĩa Lam Sơn gian khổ, dùng ngòi bút "mưu phạt tâm công" đánh tan ý chí quân Minh, tác giả bản Tuyên ngôn Độc lập thứ hai: Bình Ngô đại cáo.',
    biography: 'Nguyễn Trãi đỗ Thái học sinh thời nhà Hồ. Khi giặc Minh sang xâm lược tàn bạo, ông trốn khỏi Đông Quan vào Lam Sơn dâng cho Lê Lợi tập "Bình Ngô sách" với tư tưởng: đánh vào lòng người là thượng sách, đánh vào thành trì là hạ sách.',
    achievements: [
      'Đóng góp quyết định về tư tưởng và sách lược quân sự - ngoại giao giúp nghĩa quân Lam Sơn toàn thắng',
      'Soạn thảo "Bình Ngô đại cáo" áng thiên cổ hùng văn bất hủ khẳng định chủ quyền và văn hiến Đại Việt',
      'Được tổ chức UNESCO vinh danh là Danh nhân văn hóa thế giới năm 1980'
    ],
    anecdote: 'Tương truyền Nguyễn Trãi cho người dùng mỡ và mật ong viết lên các lá cây rừng dòng chữ: "Lê Lợi vi quân, Nguyễn Trãi vi thần". Kiến ăn mật đục thủng lá cây hiện rõ chữ, trôi theo dòng suối, khiến nhân dân và quân lính đều tin Lê Lợi là bậc chân mệnh thiên tử thuận lòng trời.',
    memorableQuote: 'Việc nhân nghĩa cốt ở yên dân / Quân điếu phạt trước lo trừ bạo... Như nước Đại Việt ta từ trước, vốn xưng nền văn hiến đã lâu (Bình Ngô đại cáo)',
    evidenceClass: 'verified',
    reflectionQuestion: 'Tư tưởng "Lấy đại nghĩa để thắng hung tàn, lấy chí nhân để thay cường bạo" của Nguyễn Trãi có giá trị hòa bình nhân đạo sâu sắc thế nào?',
    primaryImage: {
      id: 'img-nguyen-trai-chan-dung',
      title: 'Chân dung Danh nhân văn hóa thế giới Nguyễn Trãi tại đền Côn Sơn',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      type: 'museum_artifact',
      typeLabel: 'Hiện vật bảo tàng',
      caption: 'Bức họa chân dung cụ Nguyễn Trãi - Bảo vật Quốc gia lưu giữ tại Bảo tàng Lịch sử Quốc gia.',
      authorOrProvider: 'Bảo tàng Lịch sử Quốc gia & Ban quản lý Di tích Côn Sơn - Kiếp Bạc',
      sourceName: 'UNESCO & Bảo tàng Lịch sử Quốc gia',
      sourceUrl: 'https://baotanglichsu.vn',
      license: 'Bảo vật Quốc gia Việt Nam',
    },
    sourceReferences: [
      'Bình Ngô đại cáo (Bản dịch của GS. Ngô Tất Tố)',
      'Lam Sơn thực lục & Đại Việt thông sử',
      'Hồ sơ UNESCO vinh danh Danh nhân văn hóa Nguyễn Trãi (1980)'
    ],
    lastVerifiedDate: 'Năm 2026',
  },
  {
    id: 'fig-la-van-cau',
    name: 'Anh hùng La Văn Cầu',
    title: 'Tấm gương dũng cảm phi thường trong Chiến dịch Biên Giới 1950',
    era: 'Sinh năm 1931 (Dân tộc Tày)',
    periodId: 'period-5',
    origin: 'Huyện Trùng Khánh, tỉnh Cao Bằng',
    contribution: 'Trong trận đánh cứ điểm đồn Đông Khê mở màn Chiến dịch Biên giới Thu Đông 1950, khi bị trúng đạn giặc giập nát cánh tay phải, anh đã nhờ đồng đội dùng dao chặt đứt cánh tay vướng víu rồi tiếp tục ôm bộc phá xông lên phá tan lô cốt địch.',
    biography: 'La Văn Cầu sinh ra trong một gia đình dân tộc Tày nghèo yêu nước ở Cao Bằng. Năm 16 tuổi anh xung phong nhập ngũ. Trong chiến dịch Biên Giới 1950, anh là tổ trưởng bộc phá chỉ huy mũi tấn công then chốt vào đồn Đông Khê.',
    achievements: [
      'Lập chiến công phá vỡ lô cốt hỏa điểm chính của địch tại cứ điểm Đông Khê, quyết định thắng lợi của trận đánh',
      'Được phong tặng danh hiệu Anh hùng Lực lượng Vũ trang Nhân dân ngay trong đợt đầu tiên năm 1952',
      'Tấm gương sáng ngời về tinh thần kiên quyết tiến công không quản hy sinh xương máu'
    ],
    anecdote: 'Khi cánh tay bị trúng đạn lủng lẳng cản trở việc ôm bộc phá, La Văn Cầu đã bình tĩnh nói với đồng đội Nông Văn Thang: "Anh hãy chặt giùm cánh tay này cho tôi để tôi tiếp tục ôm bộc phá lao vào lô cốt!" Tinh thần quả cảm ấy làm xúc động hàng triệu trái tim đồng đội trên toàn mặt trận.',
    memorableQuote: 'Chặt đứt cánh tay cho tôi để tôi ôm bộc phá xông lên diệt đồn giặc!',
    evidenceClass: 'verified',
    reflectionQuestion: 'Ý chí kiên cường và lòng dũng cảm phi thường của anh La Văn Cầu để lại bài học gì cho chúng ta khi đối diện với khó khăn, thử thách trong cuộc sống?',
    primaryImage: {
      id: 'img-la-van-cau-1950',
      title: 'Anh hùng La Văn Cầu và chiến công đồn Đông Khê (Chiến dịch Biên Giới 1950)',
      url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
      type: 'archive_photo',
      typeLabel: 'Ảnh tư liệu lịch sử',
      caption: 'Anh hùng La Văn Cầu - biểu tượng quả cảm của quân đội ta trong Chiến dịch Biên Giới Thu - Đông 1950.',
      authorOrProvider: 'Bảo tàng Lịch sử Quân sự Việt Nam & Thông tấn xã Việt Nam',
      sourceName: 'Bảo tàng Lịch sử Quân sự Việt Nam',
      sourceUrl: 'https://btlsqsvn.org.vn',
      license: 'Tư liệu lưu trữ quốc gia',
    },
    sourceReferences: [
      'Lịch sử Quân đội Nhân dân Việt Nam (Tập 1)',
      'Hồ sơ Anh hùng LLVTND La Văn Cầu - Bảo tàng Quân đội',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức'
    ],
    lastVerifiedDate: 'Năm 2026',
  }
];

export const LEGEND_STORIES: LegendStory[] = [
  {
    id: 'leg-con-rong-chau-tien',
    title: 'Truyền thuyết Con Rồng Cháu Tiên',
    associatedHero: 'Lạc Long Quân và Âu Cơ',
    period: 'Buổi đầu dựng nước',
    storySummary: 'Lạc Long Quân thuộc dòng Rồng kết duyên cùng Âu Cơ thuộc dòng Tiên, sinh ra bọc trăm trứng nở thành một trăm người con trai khỏe mạnh. Năm mươi người con theo cha xuống biển, năm mươi người con theo mẹ lên núi, người con trưởng lên làm Vua Hùng.',
    symbolism: 'Biểu tượng thiêng liêng về tinh thần đoàn kết keo sơn của 54 dân tộc anh em trên dải đất hình chữ S, đều cùng chung một bọc trứng, gọi nhau bằng hai tiếng "Đồng bào".',
    historicalCore: 'Phản ánh quá trình khai hoang, định cư của các nhóm cư dân cổ trên cả vùng đồng bằng ven biển và vùng rừng núi trung du Bắc Bộ.',
    distinctionNote: 'Chi tiết bọc trăm trứng sinh ra người là yếu tố huyền ảo dân gian; cốt lõi lịch sử là tinh thần đoàn kết cội nguồn và quá trình hình thành cộng đồng dân cư thời Hùng Vương.',
    primaryImage: {
      id: 'img-leg-con-rong',
      title: 'Tranh minh họa: Lạc Long Quân và Âu Cơ sinh bọc trăm trứng',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      type: 'illustration',
      typeLabel: 'Tranh minh họa',
      caption: 'Tranh minh họa truyền thuyết biểu tượng nguồn cội Tiên Rồng và tinh thần đoàn kết 54 dân tộc anh em.',
      authorOrProvider: 'Họa sĩ sách giáo khoa Lịch sử & Văn học',
      sourceName: 'Lĩnh Nam chích quái & SGK Lịch sử và Địa lí 4',
      sourceUrl: 'https://dsvh.gov.vn',
      license: 'Giáo dục mở & Di sản văn hóa dân gian',
    },
    sourceReferences: [
      'Lĩnh Nam chích quái (Truyện họ Hồng Bàng)',
      'Đại Việt sử ký toàn thư (Ngoại kỷ - Kỷ Hồng Bàng thị)',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức'
    ]
  },
  {
    id: 'leg-thanh-giong',
    title: 'Truyền thuyết Thánh Gióng (Phù Đổng Thiên Vương)',
    associatedHero: 'Cậu bé làng Phù Đổng',
    period: 'Thời Hùng Vương thứ 6',
    storySummary: 'Cậu bé Gióng lên ba tuổi chưa biết nói biết cười, khi nghe sứ giả tìm người tài đánh giặc Ân liền cất tiếng đòi ngựa sắt, áo giáp sắt, roi sắt. Ăn bảy nong cơm ba nong cà lớn nhanh như thổi, vung roi sắt nhổ tre quật tan quân giặc rồi bay về trời.',
    symbolism: 'Biểu tượng cho sức mạnh quật khởi phi thường của nhân dân ta khi đất nước có giặc ngoại xâm; vũ khí sắt và ngựa sắt phản ánh bước tiến rực rỡ của thời đại đồ sắt.',
    historicalCore: 'Thời đại các Vua Hùng đã từng trải qua nhiều cuộc chiến đấu cam go để tự vệ chống lại các bộ tộc phương Bắc xâm lấn, đồng thời thuật luyện kim đúc sắt đã bắt đầu phát triển.',
    distinctionNote: 'Cậu bé lớn nhanh như thổi và bay lên trời là hình tượng nghệ thuật dân gian lãng mạn hóa sức mạnh đoàn kết toàn dân nuôi dưỡng người anh hùng đánh giặc cứu nước.',
    primaryImage: {
      id: 'img-leg-giong',
      title: 'Tượng đài Thánh Gióng cưỡi ngựa sắt bay về trời trên đỉnh núi Sóc',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      type: 'illustration',
      typeLabel: 'Tranh minh họa',
      caption: 'Hình ảnh Thánh Gióng nhổ tre đằng ngà quật tan giặc Ân, biểu tượng cho sức mạnh quật cường của thiếu nhi và dân tộc Việt Nam.',
      authorOrProvider: 'Bảo tàng Lịch sử Quốc gia & Khu di tích Đền Sóc',
      sourceName: 'Hội Gióng đền Phù Đổng và đền Sóc (Di sản văn hóa phi vật thể đại diện của nhân loại - UNESCO)',
      sourceUrl: 'https://unesco.org',
      license: 'Di sản văn hóa UNESCO & Giáo dục mở',
    },
    sourceReferences: [
      'Đại Việt sử ký toàn thư (Kỷ Hùng Vương)',
      'Việt điện u linh tập (Chuyện Sóc Thiên Vương)',
      'Hồ sơ Di sản UNESCO: Hội Gióng ở đền Phù Đổng và đền Sóc (2010)'
    ]
  },
  {
    id: 'leg-son-tinh-thuy-tinh',
    title: 'Truyền thuyết Sơn Tinh - Thủy Tinh',
    associatedHero: 'Thần Tản Viên (Sơn Tinh)',
    period: 'Thời Hùng Vương thứ 18',
    storySummary: 'Sơn Tinh (Thần Núi Ba Vì) và Thủy Tinh (Thần Nước) cùng cầu hôn công chúa Mị Nương. Sơn Tinh mang lễ vật đến trước rước Mị Nương về núi. Thủy Tinh nổi giận dâng nước đuổi đánh, Sơn Tinh bốc từng quả đồi ngăn dòng nước lũ, hàng năm Thủy Tinh vẫn dâng nước đánh nhưng luôn thua.',
    symbolism: 'Ý chí kiên cường, bền bỉ của người Việt cổ trong cuộc chiến chinh phục thiên nhiên, đắp đê ngăn lũ, bảo vệ mùa màng lúa nước ven đồng bằng sông Hồng.',
    historicalCore: 'Cư dân nông nghiệp Văn Lang định cư lưu vực sông Hồng hàng năm phải đối mặt với mùa lũ lớn; việc trị thủy là điều kiện sống còn của nhà nước sơ khai.',
    distinctionNote: 'Phép màu hô mưa gọi gió là tưởng tượng dân gian; cốt lõi lịch sử là truyền thống đắp đê trị thủy bảo vệ đồng ruộng của tổ tiên ta ngàn đời nay.',
    primaryImage: {
      id: 'img-leg-st-tt',
      title: 'Tranh minh họa: Sơn Tinh bốc đồi đắp lũ ngăn dòng nước cuộn của Thủy Tinh',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      type: 'illustration',
      typeLabel: 'Tranh minh họa',
      caption: 'Tranh minh họa cuộc đọ sức huyền thoại giữa Sơn Tinh và Thủy Tinh, phản ánh truyền thống chống lũ trị thủy đắp đê sông Hồng.',
      authorOrProvider: 'Họa sĩ dân gian / Nhà xuất bản Giáo dục Việt Nam',
      sourceName: 'Lĩnh Nam chích quái & SGK Tiếng Việt - Lịch sử',
      sourceUrl: 'https://baotanglichsu.vn',
      license: 'Giáo dục mở',
    },
    sourceReferences: [
      'Lĩnh Nam chích quái (Truyện núi Tản Viên)',
      'Truyền thuyết dân gian sông Hồng - Viện Văn học',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức'
    ]
  },
  {
    id: 'leg-su-tich-ho-guom',
    title: 'Sự tích Hồ Gươm (Hồ Hoàn Kiếm)',
    associatedHero: 'Lê Lợi và Rùa Vàng',
    period: 'Khởi nghĩa Lam Sơn (Thế kỉ XV)',
    storySummary: 'Khi Lê Lợi khởi nghĩa chống quân Minh ở Lam Sơn, Đức Long Quân cho mượn gươm thần Thuận Thiên để đánh giặc. Sau khi đuổi sạch giặc Minh, nhà vua ngự thuyền rồng trên hồ Tả Vọng, rùa vàng nổi lên đón nhận lại gươm thần.',
    symbolism: 'Khát vọng hòa bình cháy bỏng của dân tộc Việt Nam: vũ khí chỉ dùng khi buộc phải tự vệ đánh đuổi quân xâm lược; khi đất nước thanh bình, gươm giáo được cất đi để chăm lo cho nhân dân no ấm.',
    historicalCore: 'Khởi nghĩa Lam Sơn (1418 - 1427) là sự kiện lịch sử hoàn toàn có thật; thanh gươm hội tụ từ lưỡi gươm dưới lưới Lê Thận và chuôi gươm trên rừng của Lê Lợi tượng trưng cho sức mạnh đồng lòng giữa miền xuôi và miền ngược.',
    distinctionNote: 'Rùa vàng đòi gươm là hình tượng biểu tượng thiêng liêng thể hiện tư tưởng yêu hòa bình cao cả của dân tộc Đại Việt.',
    primaryImage: {
      id: 'img-leg-ho-guom',
      title: 'Tháp Rùa Hồ Gươm và tranh phục dựng rùa thần nhận lại gươm báu',
      url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tháp Rùa cổ kính giữa lòng Hồ Gươm (Hà Nội), biểu tượng gắn liền với truyền thuyết trả gươm thần và khát vọng hòa bình.',
      authorOrProvider: 'Ban quản lý Di tích danh thắng Hà Nội',
      sourceName: 'Sở Văn hóa và Thể thao Hà Nội',
      sourceUrl: 'https://hoankiem.hanoi.gov.vn',
      license: 'Di tích quốc gia đặc biệt',
    },
    sourceReferences: [
      'Lam Sơn thực lục (Nguyễn Trãi soạn)',
      'Đại Việt thông sử (Lê Quý Đôn)',
      'Hồ sơ Di tích quốc gia đặc biệt Hồ Hoàn Kiếm và Đền Ngọc Sơn'
    ]
  }
];

export const NATIONAL_ARTIFACTS: NationalArtifact[] = [
  {
    id: 'art-trong-dong-ngoc-lu',
    name: 'Trống đồng Ngọc Lũ (Bảo vật Quốc gia)',
    era: 'Khoảng thế kỉ III - II TCN (Văn hóa Đông Sơn)',
    material: 'Đồng thau nguyên chất đúc tinh xảo',
    locationPreserved: 'Bảo tàng Lịch sử Quốc gia (Hà Nội)',
    historicalSignificance: 'Là biểu tượng đỉnh cao của nền văn minh lúa nước và nghệ thuật đúc đồng Đông Sơn thời các Vua Hùng dựng nước.',
    discoveryStory: 'Được phát hiện năm 1893 tại xã Như Trác, huyện Nam Xang (nay là huyện Lý Nhân, tỉnh Hà Nam) khi người dân đào đắp đê hữu ngạn sông Hồng.',
    source: 'Bảo tàng Lịch sử Quốc gia & Quyết định công nhận Bảo vật Quốc gia đợt 1 (2012)',
    primaryImage: {
      id: 'img-art-ngoc-lu',
      title: 'Mặt và thân Trống đồng Ngọc Lũ I (Bảo vật Quốc gia)',
      url: '/src/assets/images/dong_son_drum_1792643655430.jpg',
      type: 'museum_artifact',
      typeLabel: 'Hiện vật bảo tàng',
      caption: 'Bảo vật quốc gia Trống đồng Ngọc Lũ I với ngôi sao 14 cánh ở tâm, các vành chim Lạc bay, người giã gạo và cảnh đua thuyền lễ hội.',
      authorOrProvider: 'Bảo tàng Lịch sử Quốc gia (Hà Nội)',
      sourceName: 'Bảo tàng Lịch sử Quốc gia',
      sourceUrl: 'https://baotanglichsu.vn',
      license: 'Bảo vật Quốc gia Việt Nam',
    },
    sourceReferences: [
      'Hồ sơ Bảo vật quốc gia - Cục Di sản văn hóa',
      'Sách ảnh "Trống đồng Đông Sơn" - Bảo tàng Lịch sử quốc gia',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức'
    ]
  },
  {
    id: 'art-coc-go-bach-dang',
    name: 'Cọc gỗ bãi cọc Bạch Đằng (Bảo vật Quốc gia)',
    era: 'Năm 938 (thời Ngô Quyền) & 1288 (thời Trần Hưng Đạo)',
    material: 'Gỗ lim rừng, thân thẳng, đẽo vạt nhọn một đầu',
    locationPreserved: 'Bảo tàng Lịch sử Quốc gia & Bảo tàng Quảng Ninh',
    historicalSignificance: 'Chứng tích vật chất độc nhất vô nhị phản ánh tài nghệ quân sự và sự am hiểu con nước thủy triều của cha ông ta.',
    discoveryStory: 'Người dân và các nhà khảo cổ đã khai quật hàng trăm cọc gỗ còn nguyên vẹn nằm sâu trong bùn lầy tại Yên Giang (Yên Hưng, Quảng Ninh) và Cao Quỳ (Thủy Nguyên, Hải Phòng).',
    source: 'Viện Khảo cổ học Việt Nam',
    primaryImage: {
      id: 'img-art-coc-go',
      title: 'Chiến trường Bạch Đằng và cọc gỗ lim bịt sắt',
      url: '/src/assets/images/bach_dang_938_1792643651901.jpg',
      type: 'museum_artifact',
      typeLabel: 'Hiện vật bảo tàng',
      caption: 'Kế cắm cọc gỗ lim vạt nhọn ngâm hàng nghìn năm trong phù sa sông Bạch Đằng, minh chứng sống động cho chiến thuật thủy chiến cha ông.',
      authorOrProvider: 'Bảo tàng Quảng Ninh & Viện Khảo cổ học',
      sourceName: 'Viện Khảo cổ học Việt Nam',
      sourceUrl: 'https://khao-co-hoc.vn',
      license: 'Hiện vật bảo tàng quốc gia',
    },
    sourceReferences: [
      'Báo cáo khai quật Bãi cọc Cao Quỳ (Hải Phòng, 2019)',
      'Bảo tàng Lịch sử Quốc gia',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức'
    ]
  },
  {
    id: 'art-bia-tien-si-van-mieu',
    name: '82 Bia Tiến sĩ Văn Miếu - Quốc Tử Giám (Di sản Tư liệu Thế giới)',
    era: 'Từ năm 1484 (thời vua Lê Thánh Tông) đến năm 1780',
    material: 'Đá xanh nguyên khối đặt trên lưng rùa đá',
    locationPreserved: 'Văn Miếu - Quốc Tử Giám (Hà Nội)',
    historicalSignificance: 'Tôn vinh tinh thần hiếu học, đề cao hiền tài với triết lý khắc sâu trên bia: "Hiền tài là nguyên khí của quốc gia".',
    discoveryStory: 'Được bảo tồn nguyên vẹn suốt hơn 500 năm qua mưa nắng và chiến tranh, lưu danh 1.304 nhà trí thức lớn của dân tộc.',
    source: 'Trung tâm Hoạt động VHKH Văn Miếu - Quốc Tử Giám & UNESCO',
    primaryImage: {
      id: 'img-art-bia-ts',
      title: 'Hàng Bia Tiến sĩ đặt trên lưng rùa đá tại Văn Miếu - Quốc Tử Giám',
      url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
      type: 'museum_artifact',
      typeLabel: 'Hiện vật bảo tàng',
      caption: 'Bia đá Thân Nhân Trung năm 1484 với câu danh ngôn bất hủ: "Hiền tài là nguyên khí của quốc gia".',
      authorOrProvider: 'Trung tâm Hoạt động VHKH Văn Miếu - Quốc Tử Giám (Hà Nội)',
      sourceName: 'UNESCO & Trung tâm Hoạt động VHKH Văn Miếu',
      sourceUrl: 'https://vanmieu.gov.vn',
      license: 'Di sản Tư liệu Thế giới (UNESCO)',
    },
    sourceReferences: [
      'Hồ sơ Di sản tư liệu thế giới Ký ức thế giới (UNESCO, 2011)',
      'Văn bia Tiến sĩ Văn Miếu - Quốc Tử Giám (Nhà xuất bản Hà Nội)',
      'SGK Lịch sử và Địa lí 4 - Kết nối tri thức'
    ]
  },
  {
    id: 'art-xe-tang-390',
    name: 'Xe tăng T-54B mang số hiệu 390 (Bảo vật Quốc gia)',
    era: 'Chiến dịch Hồ Chí Minh (Ngày 30/4/1975)',
    material: 'Thép hợp kim bọc giáp chiến đấu',
    locationPreserved: 'Bảo tàng Lực lượng Tăng - Thiết giáp (Hà Nội)',
    historicalSignificance: 'Chiếc xe tăng lịch sử đã húc đổ cánh cổng chính Dinh Độc Lập vào trưa ngày 30/4/1975, đánh dấu thắng lợi hoàn toàn của kháng chiến chống Mỹ.',
    discoveryStory: 'Do Trung úy Vũ Đăng Toàn làm trưởng xe, pháo thủ Ngô Sĩ Nguyên chỉ huy xung phong mở đường vào dinh tổng thống Sài Gòn.',
    source: 'Bảo tàng Lực lượng Tăng - Thiết giáp & Bộ Văn hóa, Thể thao và Du lịch',
    primaryImage: {
      id: 'img-art-xe-tang',
      title: 'Xe tăng 390 húc đổ cổng Dinh Độc Lập trưa 30-4-1975',
      url: '/src/assets/images/dinh_doc_lap_1792643656843.jpg',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Xe tăng T-54B số hiệu 390 được công nhận là Bảo vật Quốc gia, biểu tượng của Đại thắng Mùa Xuân 1975.',
      authorOrProvider: 'Bảo tàng Lực lượng Tăng - Thiết giáp (Hà Nội)',
      sourceName: 'Bảo tàng Lực lượng Tăng - Thiết giáp & Bộ VHTTDL',
      sourceUrl: 'https://baotanglichsu.vn',
      license: 'Bảo vật Quốc gia Việt Nam',
    },
    sourceReferences: [
      'Quyết định số 1426/QĐ-TTg của Thủ tướng Chính phủ công nhận Bảo vật Quốc gia',
      'Ảnh tư liệu của nhà báo Pháp Françoise De Mulder',
      'SGK Lịch sử và Địa lí 5 - Kết nối tri thức'
    ]
  }
];

export const RELIC_SITES: RelicSite[] = [
  {
    id: 'site-den-hung',
    name: 'Khu di tích lịch sử Đền Hùng',
    location: 'Núi Nghĩa Lĩnh, xã Hy Cương, TP. Việt Trì, Phú Thọ',
    region: 'Bắc',
    period: 'Buổi đầu dựng nước',
    historicalRole: 'Nơi thờ phụng các Vua Hùng có công dựng nước Văn Lang, trung tâm tín ngưỡng nguồn cội thiêng liêng của toàn thể dân tộc Việt Nam.',
    coordinates: { x: 38, y: 16 },
    highlights: ['Đền Hạ', 'Đền Trung', 'Đền Thượng', 'Lăng Vua Hùng', 'Bảo tàng Hùng Vương'],
    primaryImage: {
      id: 'img-site-den-hung',
      title: 'Cổng chính Khu di tích lịch sử Đền Hùng (Phú Thọ)',
      url: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Cổng vào Khu di tích lịch sử Đền Hùng uy nghiêm trên núi Nghĩa Lĩnh (Phú Thọ).',
      authorOrProvider: 'Khu di tích lịch sử Đền Hùng (Phú Thọ)',
      sourceName: 'Cục Di sản văn hóa & UNESCO (Tín ngưỡng thờ cúng Hùng Vương)',
      license: 'Di tích quốc gia đặc biệt',
    }
  },
  {
    id: 'site-co-loa',
    name: 'Di tích Thành Cổ Loa',
    location: 'Huyện Đông Anh, Thủ đô Hà Nội',
    region: 'Bắc',
    period: 'Buổi đầu dựng nước & Thời Ngô Quyền',
    historicalRole: 'Kinh đô cổ của nước Âu Lạc dưới thời An Dương Vương và kinh đô của nước ta dưới triều Ngô Quyền sau chiến thắng Bạch Đằng.',
    coordinates: { x: 42, y: 18 },
    highlights: ['Thành Ngoại - Trung - Nội', 'Đền Thượng thờ An Dương Vương', 'Giếng Ngọc', 'Bảo tàng mũi tên đồng'],
    primaryImage: {
      id: 'img-site-co-loa',
      title: 'Đền Thượng thờ An Dương Vương tại Cổ Loa (Hà Nội)',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Đền thờ An Dương Vương tọa lạc trên gò đất trung tâm thành Nội Cổ Loa hình xoáy trôn ốc.',
      authorOrProvider: 'Ban quản lý Khu di tích Cổ Loa',
      sourceName: 'Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội',
      license: 'Di tích quốc gia đặc biệt',
    }
  },
  {
    id: 'site-bach-dang',
    name: 'Khu di tích Bạch Đằng Giang',
    location: 'Huyện Thủy Nguyên, TP. Hải Phòng & TX. Quảng Yên, Quảng Ninh',
    region: 'Bắc',
    period: 'Bắc thuộc & Các triều đại quân chủ',
    historicalRole: 'Dòng sông địa linh nhân kiệt ghi dấu ba chiến công oanh liệt đánh tan giặc ngoại xâm phương Bắc: Ngô Quyền (938), Lê Hoàn (981) và Trần Hưng Đạo (1288).',
    coordinates: { x: 46, y: 17 },
    highlights: ['Quảng trường Chiến thắng Bạch Đằng', 'Bãi cọc phục dựng', 'Đền thờ 3 vị anh hùng dân tộc'],
    primaryImage: {
      id: 'img-site-bach-dang',
      title: 'Quảng trường Chiến thắng Bạch Đằng Giang & Trận Bạch Đằng',
      url: '/src/assets/images/bach_dang_938_1792643651901.jpg',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Kế cắm cọc gỗ lim bịt sắt của Ngô Quyền đại phá hạm đội Nam Hán trên sông Bạch Đằng năm 938.',
      authorOrProvider: 'Ban quản lý Di tích Bạch Đằng Giang & Bảo tàng Lịch sử',
      sourceName: 'UBND Thành phố Hải Phòng & Đại Việt Sử ký',
      license: 'Khu di tích lịch sử văn hóa tiêu biểu',
    }
  },
  {
    id: 'site-van-mieu',
    name: 'Văn Miếu - Quốc Tử Giám',
    location: 'Quận Đống Đa, Thủ đô Hà Nội',
    region: 'Bắc',
    period: 'Thời Lý - Trần - Lê',
    historicalRole: 'Trường đại học đầu tiên của Việt Nam, cái nôi đào tạo hàng ngàn nhân tài Nho học cho đất nước.',
    coordinates: { x: 41, y: 20 },
    highlights: ['Khuê Văn Các', '82 Bia Tiến sĩ', 'Giếng Thiên Quang', 'Đền Khải Thánh'],
    primaryImage: {
      id: 'img-site-van-mieu',
      title: 'Khuê Văn Các - Biểu tượng văn hiến Thủ đô Hà Nội',
      url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Khuê Văn Các soi bóng bên giếng Thiên Quang tại Văn Miếu - Quốc Tử Giám.',
      authorOrProvider: 'Trung tâm Hoạt động VHKH Văn Miếu - Quốc Tử Giám',
      sourceName: 'UNESCO & Cục Di sản văn hóa',
      license: 'Di tích quốc gia đặc biệt',
    }
  },
  {
    id: 'site-hoa-lu',
    name: 'Cố đô Hoa Lư',
    location: 'Huyện Hoa Lư, tỉnh Ninh Bình',
    region: 'Bắc',
    period: 'Thời Đinh - Tiền Lê',
    historicalRole: 'Kinh đô đầu tiên của nhà nước phong kiến tập quyền Đại Cồ Việt sau khi dẹp loạn 12 sứ quân.',
    coordinates: { x: 42, y: 23 },
    highlights: ['Đền vua Đinh Tiên Hoàng', 'Đền vua Lê Đại Hành', 'Núi Mã Yên'],
    primaryImage: {
      id: 'img-site-hoa-lu',
      title: 'Đền vua Đinh Tiên Hoàng tại Cố đô Hoa Lư (Ninh Bình)',
      url: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Khu đền thờ vua Đinh Tiên Hoàng cổ kính nép mình dưới chân núi Mã Yên tại Cố đô Hoa Lư.',
      authorOrProvider: 'Ban quản lý Quần thể Di sản Tràng An - Cố đô Hoa Lư',
      sourceName: 'Sở VHTT Tỉnh Ninh Bình',
      license: 'Di sản Văn hóa và Thiên nhiên Thế giới (UNESCO)',
    }
  },
  {
    id: 'site-dien-bien-phu',
    name: 'Di tích Chiến trường Điện Biên Phủ',
    location: 'TP. Điện Biên Phủ, tỉnh Điện Biên',
    region: 'Bắc',
    period: 'Kháng chiến chống Pháp (1945–1954)',
    historicalRole: 'Nơi diễn ra trận quyết chiến chiến lược chấn động địa cầu năm 1954 chấm dứt ách đô hộ của thực dân Pháp.',
    coordinates: { x: 26, y: 15 },
    highlights: ['Đồi A1', 'Hầm De Castries', 'Bảo tàng Chiến thắng Điện Biên Phủ với bức tranh Panorama khổng lồ'],
    primaryImage: {
      id: 'img-site-dien-bien',
      title: 'Chiến thắng Điện Biên Phủ - Đồi A1 và Hầm De Castries',
      url: '/src/assets/images/dien_bien_phu_1792643655116.jpg',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Lá cờ Quyết chiến Quyết thắng phấp phới trên nóc hầm De Castries chiều ngày 7/5/1954 chấn động địa cầu.',
      authorOrProvider: 'Ban quản lý Di tích Chiến trường Điện Biên Phủ',
      sourceName: 'Bảo tàng Chiến thắng Lịch sử Điện Biên Phủ',
      license: 'Di tích quốc gia đặc biệt',
    }
  },
  {
    id: 'site-co-do-hue',
    name: 'Quần thể Di tích Cố đô Huế',
    location: 'Thành phố Huế, tỉnh Thừa Thiên Huế',
    region: 'Trung',
    period: 'Triều Nguyễn (1802–1945)',
    historicalRole: 'Kinh đô của triều đại phong kiến cuối cùng trong lịch sử Việt Nam, di sản văn hóa thế giới đầu tiên của nước ta được UNESCO công nhận.',
    coordinates: { x: 50, y: 44 },
    highlights: ['Ngọ Môn', 'Điện Thái Hòa', 'Tử Cấm Thành', 'Chùa Thiên Mụ', 'Lăng Khải Định - Tự Đức'],
    primaryImage: {
      id: 'img-site-hue',
      title: 'Cửa Ngọ Môn - Đại Nội Kinh thành Huế',
      url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Cửa Ngọ Môn lộng lẫy và cổ kính nhìn ra Kỳ Đài bên bờ sông Hương xứ Huế.',
      authorOrProvider: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
      sourceName: 'UNESCO & UBND Tỉnh Thừa Thiên Huế',
      license: 'Di sản Văn hóa Thế giới (UNESCO)',
    }
  },
  {
    id: 'site-nga-ba-dong-loc',
    name: 'Khu di tích Ngã ba Đồng Lộc',
    location: 'Huyện Can Lộc, tỉnh Hà Tĩnh',
    region: 'Trung',
    period: 'Kháng chiến chống Mỹ (1954–1975)',
    historicalRole: 'Tọa độ lửa trên đường Trường Sơn huyền thoại ghi dấu sự hy sinh anh dũng của 10 cô gái thanh niên xung phong bảo đảm mạch máu giao thông.',
    coordinates: { x: 45, y: 33 },
    highlights: ['Khu mộ 10 nữ liệt sĩ', 'Tháp chuông Đồng Lộc', 'Nhà bia tưởng niệm thanh niên xung phong'],
    primaryImage: {
      id: 'img-site-dong-loc',
      title: 'Khu tưởng niệm 10 cô gái Ngã ba Đồng Lộc (Hà Tĩnh)',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Tượng đài Chiến thắng và khu mộ 10 nữ anh hùng thanh niên xung phong Ngã ba Đồng Lộc.',
      authorOrProvider: 'Ban quản lý Khu di tích Ngã ba Đồng Lộc (Hà Tĩnh)',
      sourceName: 'Trung ương Đoàn TNCS Hồ Chí Minh & Tỉnh đoàn Hà Tĩnh',
      license: 'Di tích lịch sử quốc gia đặc biệt',
    }
  },
  {
    id: 'site-dia-dao-cu-chi',
    name: 'Khu di tích Lịch sử Địa đạo Củ Chi',
    location: 'Huyện Củ Chi, TP. Hồ Chí Minh',
    region: 'Nam',
    period: 'Kháng chiến chống Mỹ (1954–1975)',
    historicalRole: '"Thành phố trong lòng đất" dài hơn 250km, biểu tượng sáng ngời cho tinh thần bám trụ chiến đấu kiên cường của quân dân miền Nam.',
    coordinates: { x: 48, y: 78 },
    highlights: ['Hầm cứu thương', 'Hầm hội họp', 'Bếp Hoàng Cầm không khói', 'Chiến hào đất'],
    primaryImage: {
      id: 'img-site-cu-chi',
      title: 'Lối vào hầm Địa đạo Củ Chi (TP. Hồ Chí Minh)',
      url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      type: 'relic_site',
      typeLabel: 'Di tích thực tế',
      caption: 'Nắp hầm bí mật ngụy trang bằng lá khô của hệ thống địa đạo Củ Chi đất thép thành đồng.',
      authorOrProvider: 'Khu di tích lịch sử Địa đạo Củ Chi (TP. Hồ Chí Minh)',
      sourceName: 'Bộ Tư lệnh TP. Hồ Chí Minh & Cục Di sản văn hóa',
      license: 'Di tích quốc gia đặc biệt',
    }
  },
  {
    id: 'site-dinh-doc-lap',
    name: 'Di tích Lịch sử Dinh Độc Lập',
    location: 'Quận 1, TP. Hồ Chí Minh',
    region: 'Nam',
    period: 'Đại thắng mùa Xuân 1975',
    historicalRole: 'Nơi đánh dấu giờ phút lịch sử 11h30 ngày 30/4/1975, giải phóng hoàn toàn miền Nam thống nhất non sông.',
    coordinates: { x: 50, y: 80 },
    highlights: ['Cổng chính nơi xe tăng húc đổ', 'Phòng Khánh tiết', 'Hầm tác chiến', 'Khu trưng bày chuyên đề'],
    primaryImage: {
      id: 'img-site-dinh-doc-lap',
      title: 'Mặt tiền Dinh Độc Lập & Xe tăng 390 trưa 30/4/1975',
      url: '/src/assets/images/dinh_doc_lap_1792643656843.jpg',
      type: 'illustration',
      typeLabel: 'Tranh lịch sử',
      caption: 'Xe tăng 390 húc tung cổng chính Dinh Độc Lập trưa ngày 30/4/1975 non sông thu về một mối.',
      authorOrProvider: 'Hội trường Thống Nhất & Bảo tàng Tăng - Thiết giáp',
      sourceName: 'Bộ Văn hóa, Thể thao và Du lịch',
      license: 'Di tích quốc gia đặc biệt',
    }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    lessonCode: 'LS4-B02',
    question: 'Ai là người lãnh đạo nhân dân hợp nhất người Lạc Việt và Tây Âu để lập nên nước Âu Lạc?',
    options: ['Vua Hùng Vương thứ 18', 'Thục Phán (An Dương Vương)', 'Ngô Quyền', 'Lý Nam Đế'],
    correctIndex: 1,
    explanation: 'Thục Phán đã chỉ huy nhân dân đánh tan quân xâm lược Tần, sau đó hợp nhất Tây Âu và Lạc Việt lập nên nước Âu Lạc, xưng An Dương Vương.',
    source: 'SGK Lịch sử và Địa lí 4 - Bộ Kết nối tri thức với cuộc sống (Trang 18)',
    truthLayer: 'verified'
  },
  {
    id: 'q2',
    lessonCode: 'LS4-B04',
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
    id: 'q3',
    lessonCode: 'LS4-B03',
    question: 'Khởi nghĩa Hai Bà Trưng phất cờ tại cửa sông nào vào mùa xuân năm 40?',
    options: ['Cửa sông Bạch Đằng', 'Cửa sông Gianh', 'Cửa sông Hát (Hát Môn)', 'Cửa sông Như Nguyệt'],
    correctIndex: 2,
    explanation: 'Mùa xuân năm 40, Trưng Trắc cùng Trưng Nhị làm lễ xuất quân khởi nghĩa tại cửa sông Hát (Hát Môn, nay thuộc Phúc Thọ, Hà Nội).',
    source: 'SGK Lịch sử và Địa lí 4 (Trang 22)',
    truthLayer: 'verified'
  },
  {
    id: 'q4',
    lessonCode: 'LS5-B01',
    question: 'Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đã đọc văn kiện quan trọng nào?',
    options: ['Hịch tướng sĩ', 'Bình Ngô đại cáo', 'Bản Tuyên ngôn Độc lập', 'Lời kêu gọi Toàn quốc kháng chiến'],
    correctIndex: 2,
    explanation: 'Chủ tịch Hồ Chí Minh đã đọc bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa.',
    source: 'SGK Lịch sử và Địa lí 5 - Bộ Kết nối tri thức với cuộc sống',
    truthLayer: 'verified'
  },
  {
    id: 'q5',
    lessonCode: 'LS5-B02',
    question: 'Trong chiến dịch Điện Biên Phủ 1954, người anh hùng nào đã lấy thân mình chèn bánh pháo trên đèo dốc?',
    options: ['Anh hùng Phan Đình Giót', 'Anh hùng Tô Vĩnh Diện', 'Anh hùng Bế Văn Đàn', 'Anh hùng Trần Can'],
    correctIndex: 1,
    explanation: 'Anh hùng Tô Vĩnh Diện đã dũng cảm lấy thân mình chèn vào bánh pháo để khẩu pháo không bị lao xuống vực sâu trong đêm kéo pháo cam go.',
    source: 'Bảo tàng Chiến thắng Lịch sử Điện Biên Phủ',
    truthLayer: 'verified'
  },
  {
    id: 'q6',
    lessonCode: 'LS5-B03',
    question: 'Chiếc xe tăng nào đã dũng mãnh húc tung cánh cổng chính Dinh Độc Lập vào trưa ngày 30/4/1975?',
    options: ['Xe tăng số hiệu 390', 'Xe tăng số hiệu 843', 'Xe tăng số hiệu 985', 'Xe tăng số hiệu 102'],
    correctIndex: 0,
    explanation: 'Xe tăng 390 do trung úy Vũ Đăng Toàn chỉ huy là chiếc xe đầu tiên húc đổ cánh cổng chính của Dinh Độc Lập lúc 11h30 ngày 30/4/1975.',
    source: 'Hồ sơ Di sản Bảo vật Quốc gia - Bộ VHTTDL',
    truthLayer: 'verified'
  },
  {
    id: 'q7',
    lessonCode: 'LS4-B01',
    question: 'Chi tiết "Cậu bé Gióng lớn nhanh như thổi sau khi ăn cơm cà và cưỡi ngựa sắt bay về trời" thuộc lớp sự thật nào?',
    options: [
      'Sự kiện lịch sử được ghi chép trong hồ sơ khảo cổ học',
      'Truyền thuyết dân gian giàu tính biểu tượng cho sức mạnh quật cường',
      'Thông tin sai lệch không có giá trị giáo dục',
      'Báo cáo khoa học quân sự'
    ],
    correctIndex: 1,
    explanation: 'Đây là truyền thuyết dân gian thiêng liêng thể hiện sức mạnh đoàn kết toàn dân nuôi dưỡng tinh thần đánh giặc bảo vệ Tổ quốc.',
    source: 'Viện Văn hóa Dân gian & SGK Lịch sử 4',
    truthLayer: 'legend'
  },
  {
    id: 'q8',
    lessonCode: 'LS4-B02',
    question: 'Thành Cổ Loa được thiết kế theo hình dáng đặc biệt nào?',
    options: ['Hình vuông bàn cờ như thành La Mã', 'Hình xoáy trôn ốc gồm 3 vòng khép kín', 'Hình đa giác không có hào nước', 'Hình ngôi sao 5 cánh'],
    correctIndex: 1,
    explanation: 'Thành Cổ Loa đắp bằng đất theo hình xoắn ốc gồm 3 vòng thành kiên cố: Thành Ngoại, Thành Trung và Thành Nội.',
    source: 'Khu di tích Cổ Loa & SGK Lịch sử 4',
    truthLayer: 'verified'
  }
];

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'det-1',
    title: 'Vụ án: Chiếc nỏ thần bắn một phát trăm phát trúng ở Cổ Loa',
    claim: 'Lời đồn: "Nỏ thần của An Dương Vương do rùa vàng trao vuốt thật sự có thể bắn ra phép thuật thần kỳ một phát giết hàng ngàn tên địch".',
    proposedStatement: 'Liệu nỏ thần có phép thuật hay là thành tựu kỹ thuật quân sự thực tế?',
    evidenceText: 'Các nhà khảo cổ học đã khai quật được tại Cổ Loa một kho chứa hàng vạn mũi tên đồng 3 cạnh sắc bén cùng lẫy nỏ bằng đồng có thể gắn nhiều mũi tên bắn cùng một lúc.',
    actualCategory: 'verified',
    explanation: 'Sử liệu và khảo cổ chứng minh nỏ bắn nhiều mũi tên và kho hàng vạn mũi tên đồng Cầu Vực là có thật 100%! Yếu tố "rùa vàng tặng móng" là truyền thuyết nhân gian ca ngợi trí tuệ của tổ tiên.',
    historicalSource: 'Viện Khảo cổ học Việt Nam - Báo cáo khai quật di tích Cổ Loa (Đông Anh, Hà Nội)'
  },
  {
    id: 'det-2',
    title: 'Vụ án: Bọc trăm trứng của mẹ Âu Cơ',
    claim: 'Lời đồn: "Tất cả 54 dân tộc Việt Nam đều sinh ra từ một người mẹ sinh bọc trăm quả trứng nở ra người".',
    proposedStatement: 'Đây là hiện tượng sinh học hay biểu tượng văn hóa đoàn kết cội nguồn?',
    evidenceText: 'Trong sinh học con người không sinh trứng. Nhưng trong văn hóa dân gian Việt Nam, hình tượng "đồng bào" (cùng chung bọc trứng) là biểu tượng thiêng liêng về tình nghĩa ruột thịt.',
    actualCategory: 'legend',
    explanation: 'Đây là TRUYỀN THUYẾT BIỂU TƯỢNG VĂN HÓA, không phải sự kiện sinh học. Câu chuyện dạy cho chúng ta bài học về sự gắn bó keo sơn giữa các dân tộc anh em.',
    historicalSource: 'Giáo trình Lịch sử Văn hóa Việt Nam - GS. Phan Huy Lê'
  },
  {
    id: 'det-3',
    title: 'Vụ án: Bãi cọc gỗ Bạch Đằng năm 938',
    claim: 'Lời đồn: "Chuyện Ngô Quyền cắm cọc gỗ trên sông Bạch Đằng chỉ là truyền thuyết kể miệng chứ không còn chứng tích".',
    proposedStatement: 'Có tìm thấy cọc gỗ thật dưới lòng đất không?',
    evidenceText: 'Viện Khảo cổ học và Bảo tàng Lịch sử Quốc gia đã khai quật các bãi cọc Yên Giang, Đồng Vạn Muối và mới nhất là bãi cọc Cao Quỳ (Hải Phòng), thu được hàng chục cọc gỗ lim vót nhọn, giám định niên đại Carbon-14 trùng khớp thời kỳ thế kỉ X và XIII.',
    actualCategory: 'verified',
    explanation: 'Đây là SỰ KIỆN ĐÃ ĐƯỢC CHỨNG MINH 100% bằng hiện vật khảo cổ học chính xác và bảo tồn trong các bảo tàng quốc gia.',
    historicalSource: 'Hồ sơ giám định cổ vật Viện Khảo cổ học Việt Nam'
  },
  {
    id: 'det-4',
    title: 'Vụ án: Niên đại chính xác ngày sinh tháng đẻ của Vua Hùng đầu tiên',
    claim: 'Lời đồn: "Có tài liệu ghi chính xác ngày sinh, giờ sinh của Kinh Dương Vương và Vua Hùng thứ nhất".',
    proposedStatement: 'Liệu các con số ngày giờ này có cơ sở khoa học khảo cổ không?',
    evidenceText: 'Thời tiền sử cách đây hơn 2.500 - 4.000 năm chưa có hệ thống lịch viết ghi ngày giờ cụ thể của từng cá nhân. Các tài liệu ngọc phả đời sau thường do các thần tích ghi lại theo quan niệm thờ cúng.',
    actualCategory: 'debated',
    explanation: 'Đây là THÔNG TIN CHƯA ĐỦ CĂN CỨ KHOA HỌC. Các nhà sử học xác nhận thời kỳ Hùng Vương kéo dài nhiều thế hệ dựa trên nền văn hóa khảo cổ Phùng Nguyên, Đồng Đậu, Gò Mun, Đông Sơn, chứ không thể xác định ngày sinh cụ thể của từng vua.',
    historicalSource: 'Viện Sử học Việt Nam - "Thời đại Hùng Vương"'
  }
];

export const INITIAL_PASSPORT_STAMPS: PassportStamp[] = [
  {
    id: 'stamp-1',
    siteOrMilestone: 'Đền Hùng - Đất Tổ',
    periodTitle: 'Buổi đầu dựng nước',
    icon: 'Crown',
    unlocked: true,
    dateEarned: '2026-04-15',
    knowledgeNote: 'Hiểu về nguồn cội "Con Lạc cháu Hồng" và các Vua Hùng dựng nước Văn Lang.'
  },
  {
    id: 'stamp-2',
    siteOrMilestone: 'Cổ Loa Thành',
    periodTitle: 'Buổi đầu dựng nước',
    icon: 'Shield',
    unlocked: true,
    dateEarned: '2026-04-18',
    knowledgeNote: 'Nắm được 3 vòng thành xoáy trôn ốc và kho mũi tên đồng nỏ thần của An Dương Vương.'
  },
  {
    id: 'stamp-3',
    siteOrMilestone: 'Sông Bạch Đằng oanh liệt',
    periodTitle: 'Bắc thuộc & Tự chủ',
    icon: 'Anchor',
    unlocked: false,
    knowledgeNote: 'Chiến thuật cọc gỗ lim bịt sắt và quy luật thủy triều của Ngô Quyền năm 938.'
  },
  {
    id: 'stamp-4',
    siteOrMilestone: 'Văn Miếu - Quốc Tử Giám',
    periodTitle: 'Các triều đại quân chủ',
    icon: 'BookOpen',
    unlocked: false,
    knowledgeNote: 'Khám phá trường đại học đầu tiên và 82 tấm Bia Tiến sĩ đề cao hiền tài.'
  },
  {
    id: 'stamp-5',
    siteOrMilestone: 'Quảng trường Ba Đình',
    periodTitle: 'Giai đoạn 1858–1945',
    icon: 'Flag',
    unlocked: false,
    knowledgeNote: 'Mốc son 2/9/1945 Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập.'
  },
  {
    id: 'stamp-6',
    siteOrMilestone: 'Đồi A1 Điện Biên Phủ',
    periodTitle: 'Kháng chiến chống Pháp',
    icon: 'Medal',
    unlocked: false,
    knowledgeNote: 'Chiến thắng lịch sử 7/5/1954 "Lừng lẫy năm châu, chấn động địa cầu".'
  },
  {
    id: 'stamp-7',
    siteOrMilestone: 'Dinh Độc Lập thống nhất',
    periodTitle: 'Kháng chiến chống Mỹ',
    icon: 'Award',
    unlocked: false,
    knowledgeNote: 'Thời khắc trưa 30/4/1975 giải phóng hoàn toàn miền Nam, thống nhất non sông.'
  }
];

export const TODAY_IN_HISTORY_DATA = [
  {
    dateStr: '19 tháng 8',
    year: '1945',
    title: 'Cách mạng tháng Tám thắng lợi tại Thủ đô Hà Nội',
    summary: 'Hàng chục vạn quần chúng nhân dân mít tinh tại Quảng trường Nhà hát Lớn rồi tiến chiếm Phủ Khâm sai, giành lại toàn bộ chính quyền về tay nhân dân.',
    source: 'Bảo tàng Lịch sử Quốc gia',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhfqsJxFzBR-tn55qw38VYkQuu_ll7-9bh--O81P0uSQ&s=10'
  },
  {
    dateStr: '2 tháng 9',
    year: '1945',
    title: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa',
    summary: 'Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử trước nửa triệu đồng bào cả nước, khẳng định quyền tự do độc lập thiêng liêng.',
    source: 'Hồ Chí Minh toàn tập & Trung tâm Lưu trữ Quốc gia III',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80'
  },
  {
    dateStr: '10 tháng 10',
    year: '1954',
    title: 'Giải phóng Thủ đô - Trùng trùng quân đi như sóng',
    summary: 'Đoàn quân chiến thắng của Đại đoàn Quân Tiên Phong tiến vào tiếp quản năm cửa ô Hà Nội giữa rừng cờ hoa rực rỡ và niềm hân hoan vỡ òa của đồng bào Thủ đô.',
    source: 'Bảo tàng Hà Nội & Thông tấn xã Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    dateStr: '7 tháng 5',
    year: '1954',
    title: 'Chiến thắng Điện Biên Phủ "Lừng lẫy năm châu, chấn động địa cầu"',
    summary: 'Lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm tướng De Castries, kết thúc thắng lợi cuộc kháng chiến 9 năm chống thực dân Pháp gian khổ anh dũng.',
    source: 'Bảo tàng Lịch sử Quân sự Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80'
  },
  {
    dateStr: '30 tháng 4',
    year: '1975',
    title: 'Đại thắng Mùa Xuân - Giải phóng miền Nam, thống nhất non sông',
    summary: 'Chiến dịch Hồ Chí Minh lịch sử toàn thắng, non sông gấm vóc liền một dải từ địa đầu Móng Cái đến mũi Cà Mau, mở ra kỷ nguyên hòa bình và độc lập vĩnh viễn.',
    source: 'Bộ Quốc phòng & Quân đội Nhân dân Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  }
];

export const VIETNAMESE_DYNASTIES: DynastyInfo[] = [
  {
    id: 'dyn-hongbang',
    name: 'Thời đại Hùng Vương - Nước Văn Lang',
    era: 'Khoảng thế kỉ VII TCN đến 258 TCN (hoặc 208 TCN)',
    founder: 'Kinh Dương Vương / Vua Hùng thứ nhất',
    capital: 'Phong Châu (Bạch Hạc, Phú Thọ)',
    countryName: 'Văn Lang',
    keyHighlights: [
      'Chia nước làm 15 bộ, dạy dân cấy lúa nước, đúc đồng Đông Sơn',
      'Phong tục làm bánh chưng bánh giầy, ăn trầu, nhuộm răng đen',
      'Đứng đầu là Hùng Vương, giúp việc có Lạc hầu, Lạc tướng, Bồ chính'
    ],
    historicalSignificance: 'Thời kì mở đầu dựng nước thiêng liêng, khai sinh ý thức cội nguồn chung của cộng đồng dân tộc Việt Nam.',
    representativeFigures: ['Kinh Dương Vương', 'Lạc Long Quân', 'Hùng Vương', 'Lang Liêu'],
    primarySource: 'Đại Việt sử ký toàn thư (Ngoại kỷ - Kỷ Hồng Bàng thị) & SGK Lịch sử 4'
  },
  {
    id: 'dyn-aulac',
    name: 'Nước Âu Lạc - Thời An Dương Vương',
    era: 'Khoảng 208 TCN – 179 TCN',
    founder: 'Thục Phán (An Dương Vương)',
    capital: 'Cổ Loa (Đông Anh, Hà Nội)',
    countryName: 'Âu Lạc',
    keyHighlights: [
      'Hợp nhất người Lạc Việt và người Tây Âu tạo thành khối đại đoàn kết',
      'Xây dựng tòa thành đất xoáy ốc 3 vòng kiên cố bậc nhất Đông Nam Á',
      'Chế tạo nỏ thần liên châu bắn nhiều mũi tên cùng lúc (mũi tên đồng Cổ Loa)'
    ],
    historicalSignificance: 'Bước phát triển vượt bậc về quân sự, phòng thủ và kiến trúc thành lũy cổ của người Việt.',
    representativeFigures: ['An Dương Vương (Thục Phán)', 'Tướng quân Cao Lỗ', 'Nàng Mị Châu'],
    primarySource: 'Khảo cổ học Cổ Loa & Đại Việt sử ký toàn thư'
  },
  {
    id: 'dyn-bacthuoc-khoinghia',
    name: 'Thời kỳ Bắc thuộc & Các cuộc khởi nghĩa giành tự chủ',
    era: '179 TCN – Năm 938',
    founder: 'Các anh hùng hào kiệt dấy binh cứu nước',
    capital: 'Mê Linh, Vạn Xuân (Long Biên), Đại La',
    countryName: 'Giao Chỉ, Vạn Xuân, An Nam',
    keyHighlights: [
      'Khởi nghĩa Hai Bà Trưng (Năm 40) xưng vương đóng đô Mê Linh',
      'Khởi nghĩa Bà Triệu (Năm 248) tại núi Nưa (Thanh Hóa)',
      'Lý Bí lập nước Vạn Xuân (Năm 544), xưng Lý Nam Đế, dựng chùa Khai Quốc',
      'Mai Thúc Loan (Mai Hắc Đế - 713-722), Phùng Hưng (Bố Cái Đại Vương - 776-791)',
      'Khúc Thừa Dụ (905) giành quyền tự chủ, Dương Đình Nghệ (931)',
      'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền đập tan mưu đồ xâm lược Nam Hán'
    ],
    historicalSignificance: 'Bền bỉ gìn giữ bản sắc văn hóa tiếng Việt, liên tục khởi nghĩa vũ trang, mở đường tái lập nền độc lập muôn đời.',
    representativeFigures: ['Hai Bà Trưng', 'Bà Triệu', 'Lý Nam Đế', 'Triệu Quang Phục', 'Khúc Thừa Dụ', 'Ngô Quyền'],
    primarySource: 'Đại Việt sử ký toàn thư, Khâm định Việt sử thông giám cương mục'
  },
  {
    id: 'dyn-ngo',
    name: 'Triều Ngô',
    era: 'Năm 939 – 965',
    founder: 'Tiền Ngô Vương Ngô Quyền',
    capital: 'Cổ Loa (Hà Nội)',
    countryName: 'Đại Việt tự chủ',
    keyHighlights: [
      'Bỏ chức Tiết độ sứ của phong kiến phương Bắc, chính thức xưng vương',
      'Định đô tại Cổ Loa nối tiếp truyền thống thời An Dương Vương',
      'Thiết lập triều đình phong kiến độc lập đầu tiên sau nghìn năm Bắc thuộc'
    ],
    historicalSignificance: 'Vị vua mở nền độc lập vững bền cho Tổ quốc.',
    representativeFigures: ['Ngô Quyền', 'Dương Tam Kha', 'Ngô Xương Ngập', 'Ngô Xương Văn'],
    primarySource: 'Đại Việt sử ký toàn thư (Kỷ Tiền Ngô Vương)'
  },
  {
    id: 'dyn-dinh',
    name: 'Triều Đinh',
    era: 'Năm 968 – 980',
    founder: 'Đinh Tiên Hoàng (Đinh Bộ Lĩnh)',
    capital: 'Hoa Lư (Ninh Bình)',
    countryName: 'Đại Cồ Việt',
    keyHighlights: [
      'Đánh dẹp 12 sứ quân, thu non sông về một mối',
      'Lên ngôi Hoàng đế (Đinh Tiên Hoàng), khẳng định vị thế quốc gia ngang hàng với phương Bắc',
      'Đặt quốc hiệu độc lập "Đại Cồ Việt", đúc tiền đồng "Thái Bình hưng bảo"'
    ],
    historicalSignificance: 'Nhà nước phong kiến tập quyền tập trung đầu tiên của dân tộc Việt Nam.',
    representativeFigures: ['Đinh Bộ Lĩnh', 'Đinh Liễn', 'Nguyễn Bặc', 'Đinh Điền', 'Lê Hoàn'],
    primarySource: 'Đại Việt sử ký toàn thư & Cố đô Hoa Lư'
  },
  {
    id: 'dyn-tien-le',
    name: 'Triều Tiền Lê',
    era: 'Năm 980 – 1009',
    founder: 'Lê Đại Hành (Lê Hoàn)',
    capital: 'Hoa Lư (Ninh Bình)',
    countryName: 'Đại Cồ Việt',
    keyHighlights: [
      'Thái hậu Dương Vân Nga trao áo long bào cho Lê Hoàn để lãnh đạo đất nước',
      'Chiến thắng quân Tống xâm lược trên sông Bạch Đằng và ải Chi Lăng năm 981',
      'Khởi xướng lễ hội Tịch điền cày ruộng khuyến nông đầu xuân'
    ],
    historicalSignificance: 'Đánh thắng quân xâm lược Tống, giữ vững giang sơn non nước Đại Cồ Việt.',
    representativeFigures: ['Lê Hoàn (Lê Đại Hành)', 'Thái hậu Dương Vân Nga', 'Lê Long Đĩnh'],
    primarySource: 'Đại Việt sử ký toàn thư (Kỷ nhà Lê)'
  },
  {
    id: 'dyn-ly',
    name: 'Triều Lý',
    era: 'Năm 1009 – 1225 (216 năm)',
    founder: 'Lý Thái Tổ (Lý Công Uẩn)',
    capital: 'Thăng Long (Hà Nội)',
    countryName: 'Đại Việt',
    keyHighlights: [
      'Năm 1010: Ban Chiếu dời đô chuyển kinh đô về Thăng Long',
      'Năm 1054: Đổi quốc hiệu là Đại Việt',
      'Năm 1070: Xây dựng Văn Miếu; Năm 1076: Lập Quốc Tử Giám - Trường đại học đầu tiên',
      'Năm 1077: Lý Thường Kiệt lãnh đạo kháng chiến chống Tống trên sông Như Nguyệt, vang danh bài thơ "Nam quốc sơn hà"',
      'Xây dựng chùa Một Cột (Diên Hựu tự) năm 1049'
    ],
    historicalSignificance: 'Kỷ nguyên Thăng Long rực rỡ, phát triển thịnh vượng kinh tế, giáo dục khoa cử và Phật giáo hòa nhập văn hóa dân tộc.',
    representativeFigures: ['Lý Thái Tổ', 'Lý Thái Tông', 'Lý Thánh Tông', 'Lý Nhân Tông', 'Lý Thường Kiệt', 'Nguyên phi Ỷ Lan'],
    primarySource: 'Đại Việt sử ký toàn thư (Bản kỷ nhà Lý) & SGK Lịch sử 4'
  },
  {
    id: 'dyn-tran',
    name: 'Triều Trần',
    era: 'Năm 1225 – 1400 (175 năm)',
    founder: 'Trần Thái Tông (Trần Cảnh) / Thái sư Trần Thủ Độ',
    capital: 'Thăng Long (Hà Nội) & Thiên Trường (Nam Định)',
    countryName: 'Đại Việt',
    keyHighlights: [
      'Ba lần đại thắng đế chế Mông - Nguyên hùng mạnh nhất thế giới (1258, 1285, 1288)',
      'Hội nghị Diên Hồng - Biểu tượng muôn người cùng hô "Đánh!"',
      'Hưng Đạo Đại vương Trần Quốc Tuấn với áng văn "Hịch tướng sĩ" bất hủ',
      'Thầy giáo Chu Văn An dâng Thất trảm sớ, phát triển Nho học'
    ],
    historicalSignificance: 'Hào khí Đông A lẫy lừng, tinh thần "Vua tôi đồng lòng, anh em hòa mục, cả nước góp sức" đánh tan giặc dữ.',
    representativeFigures: ['Trần Thái Tông', 'Trần Nhân Tông (Phật hoàng Trúc Lâm)', 'Trần Hưng Đạo', 'Trần Quang Khải', 'Trần Khánh Dư', 'Trần Quốc Toản', 'Chu Văn An'],
    primarySource: 'Đại Việt sử ký toàn thư (Kỷ nhà Trần) & SGK Lịch sử 4'
  },
  {
    id: 'dyn-ho',
    name: 'Triều Hồ',
    era: 'Năm 1400 – 1407',
    founder: 'Hồ Quý Ly',
    capital: 'Tây Đô - Thành nhà Hồ (Vĩnh Lộc, Thanh Hóa)',
    countryName: 'Đại Ngu',
    keyHighlights: [
      'Xây dựng Thành đá kiên cố Thành Nhà Hồ (Di sản Thế giới UNESCO)',
      'Cải cách táo bạo: Phát hành tiền giấy "Thông bảo hội sao" đầu tiên',
      'Hồ Nguyên Trừng chế tạo súng thần cơ và chiến thuyền cổ lâu'
    ],
    historicalSignificance: 'Những cải cách hành chính, tài chính và kỹ nghệ quân sự độc đáo sớm trước thời đại.',
    representativeFigures: ['Hồ Quý Ly', 'Hồ Hán Thương', 'Hồ Nguyên Trừng'],
    primarySource: 'Đại Việt sử ký toàn thư & Di sản Thế giới Thành Nhà Hồ'
  },
  {
    id: 'dyn-hau-le',
    name: 'Triều Hậu Lê (Lê Sơ & Lê Trung Hưng)',
    era: 'Năm 1428 – 1789 (Thời Lê Sơ: 1428–1527)',
    founder: 'Lê Thái Tổ (Lê Lợi)',
    capital: 'Đông Kinh (Thăng Long - Hà Nội) & Lam Kinh (Thanh Hóa)',
    countryName: 'Đại Việt',
    keyHighlights: [
      'Khởi nghĩa Lam Sơn 10 năm nếm mật nằm gai giành lại hoàn toàn độc lập',
      'Nguyễn Trãi viết "Bình Ngô đại cáo" - Bản Tuyên ngôn Độc lập thứ hai',
      'Thời vua Lê Thánh Tông ban hành Bộ luật Hồng Đức (Quốc triều hình luật) tiến bộ',
      'Khởi dựng 82 tấm Bia Tiến sĩ tại Văn Miếu tôn vinh hiền tài là nguyên khí quốc gia'
    ],
    historicalSignificance: 'Thời kì hoàng kim của chế độ quân chủ phong kiến Đại Việt về cương vực lãnh thổ, luật pháp và văn hóa khoa cử.',
    representativeFigures: ['Lê Lợi', 'Nguyễn Trãi', 'Lê Thánh Tông', 'Ngô Sĩ Liên', 'Thân Nhân Trung', 'Lương Thế Vinh'],
    primarySource: 'Đại Việt thông sử, Lam Sơn thực lục, Bia Tiến sĩ Văn Miếu'
  },
  {
    id: 'dyn-tay-son',
    name: 'Triều Tây Sơn',
    era: 'Năm 1778 – 1802',
    founder: 'Quang Trung - Nguyễn Huệ',
    capital: 'Quy Nhơn & Phú Xuân (Huế)',
    countryName: 'Đại Việt',
    keyHighlights: [
      'Xóa bỏ ranh giới chia cắt Đàng Trong - Đàng Ngoài suốt 200 năm',
      'Chiến thắng Rạch Gầm - Xoài Mút năm 1785 đánh tan 5 vạn quân Xiêm',
      'Hành quân thần tốc mùa xuân Kỷ Dậu 1789 đại phá 29 vạn quân Thanh tại Ngọc Hồi - Đống Đa',
      'Khuyến khích dùng chữ Nôm, ban Chiếu khuyến nông và Chiếu lập học'
    ],
    historicalSignificance: 'Vị anh hùng áo vải cờ đào bách chiến bách thắng, bảo vệ trọn vẹn chủ quyền đất nước và thúc đẩy chữ viết dân tộc.',
    representativeFigures: ['Nguyễn Nhạc', 'Nguyễn Huệ (Quang Trung)', 'Nguyễn Lữ', 'Nữ tướng Bùi Thị Xuân', 'Ngô Thì Nhậm'],
    primarySource: 'Hoàng Lê nhất thống chí, Đại Nam chính biên liệt truyện'
  },
  {
    id: 'dyn-nguyen',
    name: 'Triều Nguyễn',
    era: 'Năm 1802 – 1945 (143 năm)',
    founder: 'Gia Long (Nguyễn Ánh)',
    capital: 'Phú Xuân (Huế)',
    countryName: 'Việt Nam (Từ năm 1804) / Đại Nam (Từ năm 1838)',
    keyHighlights: [
      'Thống nhất lãnh thổ từ ải Nam Quan đến mũi Cà Mau',
      'Khẳng định và thực thi chủ quyền thiêng liêng trên hai quần đảo Hoàng Sa và Trường Sa',
      'Xây dựng Quần thể Cố đô Huế nguy nga tráng lệ (Di sản Thế giới UNESCO)',
      'Năm 1945, vua Bảo Đại thoái vị trao ấn kiếm cho chính quyền cách mạng'
    ],
    historicalSignificance: 'Triều đại phong kiến cuối cùng trong lịch sử Việt Nam, định hình biên cương thống nhất đất nước hình chữ S.',
    representativeFigures: ['Vua Gia Long', 'Vua Minh Mạng', 'Đại thi hào Nguyễn Du (Truyện Kiều)', 'Nguyễn Tri Phương', 'Vua Hàm Nghi'],
    primarySource: 'Đại Nam thực lục, Châu bản triều Nguyễn, Hồ sơ Di sản UNESCO Cố đô Huế'
  },
  {
    id: 'dyn-hien-dai',
    name: 'Kỷ nguyên Độc lập - Tự do & Hội nhập Quốc tế',
    era: 'Năm 1945 đến nay',
    founder: 'Chủ tịch Hồ Chí Minh & Đảng Cộng sản Việt Nam',
    capital: 'Hà Nội',
    countryName: 'Việt Nam Dân chủ Cộng hòa (1945-1976) / Cộng hòa Xã hội Chủ nghĩa Việt Nam (1976-nay)',
    keyHighlights: [
      'Cách mạng tháng Tám 1945 thành công, khai sinh nước Việt Nam Dân chủ Cộng hòa',
      'Chiến thắng Điện Biên Phủ 1954 chấm dứt ách đô hộ của thực dân Pháp',
      'Đại thắng mùa Xuân 30/4/1975 giải phóng miền Nam, thống nhất non sông',
      'Công cuộc Đổi mới (1986), công nghiệp hóa - hiện đại hóa và hội nhập quốc tế sâu rộng'
    ],
    historicalSignificance: 'Đưa nhân dân Việt Nam từ thân phận nô lệ trở thành chủ nhân đất nước, xây dựng quốc gia hòa bình, ấm no và phát triển.',
    representativeFigures: ['Chủ tịch Hồ Chí Minh', 'Đại tướng Võ Nguyên Giáp', 'Cố Tổng Bí thư Lê Duẩn', 'Cố Tổng Bí thư Nguyễn Văn Linh'],
    primarySource: 'Tuyên ngôn Độc lập 1945, Văn kiện Đại hội Đảng, Lịch sử Quân đội Nhân dân Việt Nam'
  }
];

export const CULTURAL_ACHIEVEMENTS: CulturalAchievement[] = [
  {
    id: 'cult-dongson',
    title: 'Văn minh Đông Sơn & Nghệ thuật đúc đồng đỉnh cao',
    category: 'Kỹ nghệ & Khảo cổ',
    era: 'Thế kỉ VII TCN - Thế kỉ I SCN',
    summary: 'Kỹ thuật luyện kim đồng thau đạt đến trình độ siêu đẳng thế giới cổ đại với các hiện vật Trống đồng Ngọc Lũ, Hoàng Hạ, Thạp đồng Đào Thịnh. Hoa văn khắc họa sinh động cảnh giã gạo, múa hát, chèo thuyền đua và chim Lạc bay.',
    significance: 'Khẳng định người Việt cổ đã xây dựng được một nền văn minh nông nghiệp lúa nước rực rỡ và có tổ chức xã hội phát triển.',
    historicalFigures: ['Cư dân Lạc Việt cổ', 'Các nghệ nhân đúc đồng Đông Sơn'],
    relicsOrArtifacts: ['Trống đồng Ngọc Lũ (Bảo vật Quốc gia)', 'Thạp đồng Đào Thịnh', 'Kho mũi tên đồng Cổ Loa'],
    sourceReference: 'Viện Khảo cổ học Việt Nam & Bảo tàng Lịch sử Quốc gia'
  },
  {
    id: 'cult-quoc-tu-giam',
    title: 'Quốc Tử Giám - Trường đại học đầu tiên của Việt Nam',
    category: 'Giáo dục & Khoa cử',
    era: 'Năm 1076 (Thời vua Lý Nhân Tông)',
    summary: 'Được xây dựng năm 1076 kề sau Văn Miếu, Quốc Tử Giám là nơi thu nhận và đào tạo con em quý tộc cùng học trò giỏi xuất sắc trong cả nước, đặt nền móng cho hệ thống thi cử Nho học bài bản.',
    significance: 'Đề cao việc học tập, rèn luyện nhân cách, đào tạo hàng ngàn bậc hiền tài kinh bang tế thế giúp ích cho non sông.',
    historicalFigures: ['Vua Lý Thánh Tông', 'Vua Lý Nhân Tông', 'Vạn thế sư biểu Chu Văn An'],
    relicsOrArtifacts: ['Khu di tích Văn Miếu - Quốc Tử Giám (Hà Nội)', 'Nhà Thái Học', 'Khuê Văn Các'],
    sourceReference: 'Trung tâm Hoạt động VHKH Văn Miếu - Quốc Tử Giám & SGK Lịch sử 4'
  },
  {
    id: 'cult-bia-tien-si',
    title: '82 Bia Tiến sĩ Văn Miếu: "Hiền tài là nguyên khí của quốc gia"',
    category: 'Giáo dục & Khoa cử',
    era: 'Năm 1484 (Thời vua Lê Thánh Tông)',
    summary: 'Khởi dựng từ năm 1484 ghi danh 1.304 nhà trí thức đỗ Đại khoa. Tấm bia năm 1484 do Thân Nhân Trung soạn có câu danh ngôn bất hủ: "Hiền tài là nguyên khí của quốc gia, nguyên khí thịnh thì thế nước mạnh, rồi lên cao; nguyên khí suy thì thế nước yếu, rồi xuống thấp".',
    significance: 'Di sản Tư liệu Thế giới ghi nhận truyền thống hiếu học tôn sư trọng đạo độc đáo của dân tộc Việt Nam.',
    historicalFigures: ['Vua Lê Thánh Tông', 'Tiến sĩ Thân Nhân Trung', 'Trạng nguyên Lương Thế Vinh'],
    relicsOrArtifacts: ['82 tấm Bia Tiến sĩ trên lưng rùa đá (Di sản Ký ức Thế giới UNESCO)'],
    sourceReference: 'UNESCO Ký ức Thế giới & Cục Di sản Văn hóa'
  },
  {
    id: 'cult-luat-hong-duc',
    title: 'Bộ luật Hồng Đức (Quốc triều hình luật)',
    category: 'Pháp luật & Quản trị',
    era: 'Nửa cuối thế kỉ XV (Triều vua Lê Thánh Tông)',
    summary: 'Bộ luật hoàn chỉnh và đồ sộ nhất thời phong kiến Việt Nam gồm 722 điều. Điểm nhân văn vượt trội là có những quy định bảo vệ quyền lợi của phụ nữ (quyền thừa kế hương hỏa, quyền ly hôn khi bị ruồng bỏ) và bảo vệ người già yếu, trẻ mồ côi.',
    significance: 'Đỉnh cao của tư tưởng pháp trị kết hợp đức trị nhân văn, giữ vững kỉ cương phép nước và công bằng xã hội.',
    historicalFigures: ['Hoàng đế Lê Thánh Tông', 'Các quan ngự sử triều Lê Sơ'],
    relicsOrArtifacts: ['Bản khắc in Quốc triều hình luật - Viện Nghiên cứu Hán Nôm'],
    sourceReference: 'Viện Nghiên cứu Hán Nôm & Giáo trình Lịch sử Nhà nước và Pháp luật Việt Nam'
  },
  {
    id: 'cult-y-hoc-dan-toc',
    title: 'Nền Y học cổ truyền: "Nam dược trị Nam nhân"',
    category: 'Y học & Khoa học',
    era: 'Thế kỉ XIV (Thời Trần) & Thế kỉ XVIII (Thời Hậu Lê)',
    summary: 'Thiền sư Tuệ Tĩnh khởi xướng phương châm "Nam dược trị Nam nhân" (Thuốc Nam chữa bệnh cho người Nam), sưu tầm hàng ngàn cây thuốc quanh vườn nhà. Đại danh y Hải Thượng Lãn Ông Lê Hữu Trác soạn bộ "Hải Thượng y tông tâm lĩnh" 66 quyển đồ sộ về y đức và y thuật.',
    significance: 'Tạo dựng nền y học nhân bản, cứu chữa bệnh tật cho nhân dân nghèo và bảo tồn tri thức dược liệu quý của non sông.',
    historicalFigures: ['Đại danh y Tuệ Tĩnh', 'Đại danh y Hải Thượng Lãn Ông Lê Hữu Trác'],
    relicsOrArtifacts: ['Tác phẩm Nam dược thần hiệu', 'Bộ sách Hải Thượng y tông tâm lĩnh', 'Khu di tích Y miếu Thăng Long'],
    sourceReference: 'Bộ Y tế & Hội Đông y Việt Nam'
  },
  {
    id: 'cult-chu-quoc-ngu',
    title: 'Sự ra đời và lan tỏa của Chữ Quốc ngữ',
    category: 'Văn hóa & Di sản',
    era: 'Thế kỉ XVII đến đầu thế kỉ XX',
    summary: 'Hệ chữ viết ghi âm tiếng Việt bằng chữ cái Latin do các giáo sĩ phương Tây cùng người Việt cùng chung tay sáng tạo từ thế kỉ XVII (như Alexandre de Rhodes với từ điển Việt - Bồ - La năm 1651). Về sau trở thành chữ viết chính thức của quốc gia, giúp phổ cập việc đọc viết thần tốc.',
    significance: 'Công cụ truyền bá tri thức khoa học, văn hóa và khơi dậy phong trào xóa nạn mù chữ Bình dân học vụ năm 1945.',
    historicalFigures: ['Các học giả Việt Nam thế kỉ XVII', 'Alexandre de Rhodes', 'Chủ tịch Hồ Chí Minh (Phong trào Bình dân học vụ)'],
    relicsOrArtifacts: ['Bản in Từ điển Dictionarium Annamiticum Lusitanum et Latinum (1651)'],
    sourceReference: 'Viện Ngôn ngữ học Việt Nam & Trung tâm Lưu trữ Quốc gia'
  }
];
