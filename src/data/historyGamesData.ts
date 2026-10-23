// Datasets for AI-Powered Interactive Games:
// 1. AI Mystery Figure Clues ("Đoán tên Nhân vật qua Manh mối AI")
// 2. Memory Match Cards ("Lật Thẻ Trí Nhớ Lịch Sử Vang Son")

export interface MysteryFigureGame {
  id: string;
  name: string;
  title: string;
  era: string;
  imageUrl: string;
  options: string[];
  correctName: string;
  clues: {
    order: number;
    category: 'Thời kỳ & Xuất thân' | 'Biểu tượng & Vũ khí' | 'Chiến công vang dội' | 'Câu nói / Áng văn';
    text: string;
  }[];
  revealedSummary: string;
  aiPrompt: string;
}

export const MYSTERY_FIGURES_GAMES: MysteryFigureGame[] = [
  {
    id: 'mys-1',
    name: 'Ngô Quyền',
    title: 'Vị vua mở nền độc lập muôn đời',
    era: 'Năm 897 – 944',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Ngo_Quyen_statue.jpg/800px-Ngo_Quyen_statue.jpg',
    options: ['Ngô Quyền', 'Đinh Bộ Lĩnh', 'Lê Hoàn', 'Lý Thường Kiệt'],
    correctName: 'Ngô Quyền',
    clues: [
      {
        order: 1,
        category: 'Thời kỳ & Xuất thân',
        text: 'Vị anh hùng sinh ra tại đất Đường Lâm (Sơn Tây, Hà Nội), là tướng tài và con rể của Tiết độ sứ Dương Đình Nghệ.'
      },
      {
        order: 2,
        category: 'Biểu tượng & Vũ khí',
        text: 'Nổi tiếng với mưu kế cắm cọc gỗ lim vót nhọn, đầu bịt sắt ngầm dưới lòng sông, kết hợp chặt chẽ quy luật thủy triều lên xuống.'
      },
      {
        order: 3,
        category: 'Chiến công vang dội',
        text: 'Chỉ huy thủy quân đánh tan hạm đội giặc Nam Hán trên sông Bạch Đằng năm 938, chém chết tướng giặc Lưu Hoằng Tháo.'
      },
      {
        order: 4,
        category: 'Câu nói / Áng văn',
        text: '"Hoằng Tháo là đứa trẻ dại, đem quân từ xa đến... Nếu ta cắm cọc lớn ở cửa biển thì thuyền giặc không vào được. Ta đánh tất thắng!" Sau đó lên ngôi vua, đóng đô ở Cổ Loa.'
      }
    ],
    revealedSummary: 'Ngô Quyền (897 – 944) là vị anh hùng dân tộc vĩ đại với chiến thắng Bạch Đằng năm 938, chính thức chấm dứt hơn một thiên niên kỷ Bắc thuộc, mở ra thời kỳ độc lập tự chủ lâu dài cho dân tộc.',
    aiPrompt: 'Hãy kể cho em nghe chi tiết về trận thủy chiến Bạch Đằng của Ngô Quyền năm 938 một cách lôi cuốn cho học sinh tiểu học!'
  },
  {
    id: 'mys-2',
    name: 'Hai Bà Trưng',
    title: 'Hai Nữ anh hùng phất cờ khởi nghĩa đầu tiên',
    era: 'Thế kỉ I (Năm 40 – 43)',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScRmeHyvODhbB4Vu0Ir3JXpwLccDKO7yeQhz-oyvjICA&s=10',
    options: ['Hai Bà Trưng', 'Bà Triệu', 'Nàng Mị Châu', 'Bùi Thị Xuân'],
    correctName: 'Hai Bà Trưng',
    clues: [
      {
        order: 1,
        category: 'Thời kỳ & Xuất thân',
        text: 'Hai chị em sinh đôi quê ở huyện Mê Linh (Hà Nội), là con gái của một vị Lạc tướng dòng dõi Hùng Vương.'
      },
      {
        order: 2,
        category: 'Biểu tượng & Vũ khí',
        text: 'Hình ảnh oai nghiêm mặc giáp đồng lộng lẫy, cưỡi voi trắng xuất trận tại cửa sông Hát Môn ca vang khúc khải hoàn.'
      },
      {
        order: 3,
        category: 'Chiến công vang dội',
        text: 'Đánh đuổi tên thái thú tàn bạo Tô Định của nhà Đông Hán bỏ chạy tháo thân về phương Bắc, thu hồi 65 thành trì ở Lĩnh Nam.'
      },
      {
        order: 4,
        category: 'Câu nói / Áng văn',
        text: '"Một xin rửa sạch nước thù / Hai xin đem lại nghiệp xưa họ Hùng / Ba kẻo oan ức lòng chồng / Bốn xin vẹn vẹn sở công lênh này."'
      }
    ],
    revealedSummary: 'Hai Bà Trưng (Trưng Trắc và Trưng Nhị) là hai nữ anh hùng đầu tiên trong lịch sử dân tộc đã phất cờ khởi nghĩa đánh tan quân đô hộ Đông Hán năm 40, xưng vương dựng nước.',
    aiPrompt: 'Tại sao cuộc khởi nghĩa của Hai Bà Trưng năm 40 lại có ý nghĩa lịch sử vô cùng to lớn đối với phụ nữ và dân tộc Việt Nam?'
  },
  {
    id: 'mys-3',
    name: 'Trần Hưng Đạo',
    title: 'Quốc công Tiết chế - Vị tướng bách chiến bách thắng',
    era: 'Năm 1228 – 1300',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Tran_Hung_Dao_Nam_Dinh.jpg/800px-Tran_Hung_Dao_Nam_Dinh.jpg',
    options: ['Trần Hưng Đạo', 'Trần Quốc Toản', 'Trần Thủ Độ', 'Trần Quang Khải'],
    correctName: 'Trần Hưng Đạo',
    clues: [
      {
        order: 1,
        category: 'Thời kỳ & Xuất thân',
        text: 'Tên thật là Trần Quốc Tuấn, hoàng thân nhà Trần, quê gốc ở phủ Thiên Trường (Nam Định).'
      },
      {
        order: 2,
        category: 'Biểu tượng & Vũ khí',
        text: 'Tác giả của áng thiên cổ hùng văn "Hịch tướng sĩ", khuyên răn tướng sĩ "quên ăn vì căm giận giặc, nửa đêm vỗ gối, ruột đau như cắt, nước mắt đầm đìa".'
      },
      {
        order: 3,
        category: 'Chiến công vang dội',
        text: 'Thống lĩnh toàn quân ba lần đánh bại đội quân xâm lược Mông - Nguyên hùng mạnh bậc nhất thế giới thời bấy giờ.'
      },
      {
        order: 4,
        category: 'Câu nói / Áng văn',
        text: 'Khi vua Trần lo lắng hỏi kế đánh giặc, người khẳng khái tâu: "Nếu bệ hạ muốn hàng, xin hãy chém đầu thần trước đã!"'
      }
    ],
    revealedSummary: 'Trần Hưng Đạo (1228 – 1300) là vị thiên tài quân sự kiệt xuất, danh tướng ba lần đánh thắng quân Nguyên Mông, để lại lời căn dặn muôn đời: "Khoan thư sức dân để làm kế sâu rễ bền gốc".',
    aiPrompt: 'Lời khuyên "Khoan thư sức dân để làm kế sâu rễ bền gốc" của Trần Hưng Đạo có ý nghĩa sâu sắc thế nào?'
  },
  {
    id: 'mys-4',
    name: 'Quang Trung (Nguyễn Huệ)',
    title: 'Vị anh hùng áo vải cờ đào - Hoàng đế Tây Sơn',
    era: 'Năm 1753 – 1792',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Quang_Trung_statue_Dong_Da.jpg/800px-Quang_Trung_statue_Dong_Da.jpg',
    options: ['Quang Trung (Nguyễn Huệ)', 'Nguyễn Nhạc', 'Lê Lợi', 'Đinh Bộ Lĩnh'],
    correctName: 'Quang Trung (Nguyễn Huệ)',
    clues: [
      {
        order: 1,
        category: 'Thời kỳ & Xuất thân',
        text: 'Vị anh hùng phát tích từ phong trào khởi nghĩa nông dân Tây Sơn (Bình Định) cùng hai người anh em.'
      },
      {
        order: 2,
        category: 'Biểu tượng & Vũ khí',
        text: 'Nghệ thuật hành quân thần tốc vô song: Ghép ba người một nhóm thay nhau khiêng cáng chạy suốt ngày đêm từ Phú Xuân ra Thăng Long.'
      },
      {
        order: 3,
        category: 'Chiến công vang dội',
        text: 'Đánh tan 5 vạn quân Xiêm ở Rạch Gầm - Xoài Mút và quét sạch 29 vạn quân Mãn Thanh vào mùa xuân Kỷ Dậu 1789 tại gò Đống Đa.'
      },
      {
        order: 4,
        category: 'Câu nói / Áng văn',
        text: '"Đánh cho để dài tóc / Đánh cho để đen răng / Đánh cho nó chích luân bất phản / Đánh cho nó phiến giáp bất hoàn / Đánh cho sử tri nam quốc anh hùng chi hữu chủ!"'
      }
    ],
    revealedSummary: 'Quang Trung - Nguyễn Huệ (1753 – 1792) là nhà quân sự thiên tài bách chiến bách thắng, người giải phóng Thăng Long trong chiến thắng Ngọc Hồi - Đống Đa mùa xuân Kỷ Dậu 1789.',
    aiPrompt: 'Tại sao cuộc hành quân thần tốc của vua Quang Trung dịp Tết Kỷ Dậu 1789 lại khiến quân Thanh trở tay không kịp?'
  },
  {
    id: 'mys-5',
    name: 'Chủ tịch Hồ Chí Minh',
    title: 'Lãnh tụ vĩ đại của dân tộc - Bác Hồ kính yêu',
    era: 'Năm 1890 – 1969',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ho_Chi_Minh_reads_the_Declaration_of_Independence_1945.jpg/800px-Ho_Chi_Minh_reads_the_Declaration_of_Independence_1945.jpg',
    options: ['Chủ tịch Hồ Chí Minh', 'Đại tướng Võ Nguyên Giáp', 'Phan Bội Châu', 'Huỳnh Thúc Kháng'],
    correctName: 'Chủ tịch Hồ Chí Minh',
    clues: [
      {
        order: 1,
        category: 'Thời kỳ & Xuất thân',
        text: 'Sinh ra tại Làng Sen, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An; thuở nhỏ mang tên Nguyễn Sinh Cung.'
      },
      {
        order: 2,
        category: 'Biểu tượng & Vũ khí',
        text: 'Ngày 5/6/1911 từ bến cảng Nhà Rồng (Sài Gòn), người thanh niên yêu nước với tên Văn Ba đã ra đi tìm đường cứu nước trên tàu Amiral Latouche-Tréville.'
      },
      {
        order: 3,
        category: 'Chiến công vang dội',
        text: 'Sáng lập Đảng Cộng sản Việt Nam, đọc bản Tuyên ngôn Độc lập ngày 2-9-1945 tại Quảng trường Ba Đình khai sinh nước Việt Nam Dân chủ Cộng hòa.'
      },
      {
        order: 4,
        category: 'Câu nói / Áng văn',
        text: '"Không có gì quý hơn độc lập, tự do!" và "Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước."'
      }
    ],
    revealedSummary: 'Chủ tịch Hồ Chí Minh (1890 – 1969) là Người Cha già kính yêu của dân tộc, Danh nhân văn hóa thế giới, người đã hiến dâng trọn đời mình cho sự nghiệp độc lập tự do của Tổ quốc và hạnh phúc nhân dân.',
    aiPrompt: 'Em hãy kể về tình cảm thương yêu bao la của Bác Hồ dành cho các cháu thiếu niên, nhi đồng Việt Nam!'
  },
  {
    id: 'mys-6',
    name: 'Trần Quốc Toản',
    title: 'Thiếu niên anh hùng bóp nát quả cam - Cờ sáu chữ vàng',
    era: 'Năm 1267 – 1285',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tran_Quoc_Toan_Dong_Ho.jpg/800px-Tran_Quoc_Toan_Dong_Ho.jpg',
    options: ['Trần Quốc Toản', 'Kim Đồng', 'La Văn Cầu', 'Lê Văn Tám'],
    correctName: 'Trần Quốc Toản',
    clues: [
      {
        order: 1,
        category: 'Thời kỳ & Xuất thân',
        text: 'Thiếu niên hoàng tộc nhà Trần, được phong tước Hoài Văn Hầu khi mới hơn mười tuổi đầu.'
      },
      {
        order: 2,
        category: 'Biểu tượng & Vũ khí',
        text: 'Lá cờ đỏ thêu sáu chữ vàng chói lọi tung bay: "Phá cường địch, báo hoàng ân" (Đánh tan giặc dữ, đền ơn vua cha).'
      },
      {
        order: 3,
        category: 'Chiến công vang dội',
        text: 'Tự chiêu mộ hơn một nghìn gia nô tráng sĩ, cùng danh tướng Trần Nhật Duật giải phóng bến Chương Dương và bến Tây Kết.'
      },
      {
        order: 4,
        category: 'Câu nói / Áng văn',
        text: 'Vì căm tức không được dự hội nghị quân sự Bình Than do tuổi còn nhỏ, chàng đã vô tình bóp nát quả cam quý vua ban lúc nào không hay.'
      }
    ],
    revealedSummary: 'Trần Quốc Toản (1267 – 1285) là biểu tượng bất diệt cho tinh thần "Tuổi nhỏ chí lớn" và lòng yêu nước căm thù giặc sâu sắc của thiếu niên Việt Nam trong kháng chiến chống Nguyên Mông.',
    aiPrompt: 'Ý nghĩa của hành động bóp nát quả cam của Trần Quốc Toản tại hội nghị Bình Than đối với thiếu nhi ngày nay là gì?'
  }
];

// Memory Card Match Pairs (12 Cards = 6 Pairs)
export interface MemoryCard {
  id: string;
  pairId: string;
  title: string;
  content: string;
  imageUrl?: string;
  isImageCard: boolean;
}

export const INITIAL_MEMORY_CARDS: MemoryCard[] = [
  // Pair 1: Hai Bà Trưng
  {
    id: 'mc-1a',
    pairId: 'pair-hbt',
    title: 'Tranh dân gian Đông Hồ',
    content: 'Hai Bà Trưng cưỡi voi xuất trận',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hai_Ba_Trung_Dong_Ho.jpg/800px-Hai_Ba_Trung_Dong_Ho.jpg',
    isImageCard: true
  },
  {
    id: 'mc-1b',
    pairId: 'pair-hbt',
    title: 'Sự kiện lịch sử năm 40',
    content: 'Khởi nghĩa Hai Bà Trưng tại cửa sông Hát Môn, đánh đuổi giặc Đông Hán giành 65 thành',
    isImageCard: false
  },

  // Pair 2: Ngô Quyền
  {
    id: 'mc-2a',
    pairId: 'pair-nq',
    title: 'Tượng thờ Tiền Ngô Vương',
    content: 'Ngô Quyền tại đền Đường Lâm (Hà Nội)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Ngo_Quyen_statue.jpg/800px-Ngo_Quyen_statue.jpg',
    isImageCard: true
  },
  {
    id: 'mc-2b',
    pairId: 'pair-nq',
    title: 'Chiến công năm 938',
    content: 'Chiến thắng cọc gỗ sông Bạch Đằng, chấm dứt hơn 1000 năm Bắc thuộc',
    isImageCard: false
  },

  // Pair 3: Lý Thái Tổ
  {
    id: 'mc-3a',
    pairId: 'pair-ltt',
    title: 'Tượng đài Vua Lý Thái Tổ',
    content: 'Bên bờ Hồ Hoàn Kiếm (Hà Nội)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ly_Thai_To_statue_Hanoi.jpg/800px-Ly_Thai_To_statue_Hanoi.jpg',
    isImageCard: true
  },
  {
    id: 'mc-3b',
    pairId: 'pair-ltt',
    title: 'Sự kiện mùa thu năm 1010',
    content: 'Chiếu dời đô từ Hoa Lư về Đại La, đổi tên thành kinh đô Thăng Long',
    isImageCard: false
  },

  // Pair 4: Trần Hưng Đạo
  {
    id: 'mc-4a',
    pairId: 'pair-thd',
    title: 'Tượng đồng Trần Hưng Đạo',
    content: 'Quốc công Tiết chế tại Nam Định',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Tran_Hung_Dao_Nam_Dinh.jpg/800px-Tran_Hung_Dao_Nam_Dinh.jpg',
    isImageCard: true
  },
  {
    id: 'mc-4b',
    pairId: 'pair-thd',
    title: 'Chiến công Thế kỷ XIII',
    content: 'Ba lần đánh tan quân xâm lược Mông - Nguyên, tác giả Hịch tướng sĩ bất hủ',
    isImageCard: false
  },

  // Pair 5: Bác Hồ Ba Đình
  {
    id: 'mc-5a',
    pairId: 'pair-hcm',
    title: 'Ảnh tư liệu lịch sử 1945',
    content: 'Bác Hồ đọc Tuyên ngôn Độc lập tại Ba Đình',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ho_Chi_Minh_reads_the_Declaration_of_Independence_1945.jpg/800px-Ho_Chi_Minh_reads_the_Declaration_of_Independence_1945.jpg',
    isImageCard: true
  },
  {
    id: 'mc-5b',
    pairId: 'pair-hcm',
    title: 'Ngày 2 tháng 9 năm 1945',
    content: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa, mở ra kỷ nguyên độc lập tự do',
    isImageCard: false
  },

  // Pair 6: Điện Biên Phủ
  {
    id: 'mc-6a',
    pairId: 'pair-dbp',
    title: 'Đại tướng Võ Nguyên Giáp',
    content: 'Tại Sở chỉ huy Mường Phăng (Điện Biên)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Vo_Nguyen_Giap_Dien_Bien_Phu_1954.jpg/800px-Vo_Nguyen_Giap_Dien_Bien_Phu_1954.jpg',
    isImageCard: true
  },
  {
    id: 'mc-6b',
    pairId: 'pair-dbp',
    title: 'Ngày 7 tháng 5 năm 1954',
    content: 'Chiến thắng lịch sử Điện Biên Phủ "Lừng lẫy năm châu, chấn động địa cầu"',
    isImageCard: false
  }
];
