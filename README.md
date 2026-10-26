# Phòng chống đuối nước – Website nghiên cứu khoa học

## Cấu trúc thư mục
```
phong-chong-duoi-nuoc/
├── index.html          # Trang chính (7 mục, điều hướng bằng #hash)
├── css/style.css       # Toàn bộ giao diện
├── js/main.js          # Logic: điều hướng, trò chơi, quiz, khảo sát, trợ lý AI
├── bai-hoc/            # Thư viện bài học và các bài học tương tác
│   ├── index.html      # Danh sách bài học
│   ├── bai-1-duoi-nuoc-o-tre-em.html
│   ├── bai-2-an-toan-nuoc.html
│   ├── bai-3-an-toan-gia-dinh.html
│   ├── bai-5-mua-mua-bao-lu-lut.html
│   ├── bai-6-xu-ly-khi-bi-chuot-rut.html
│   ├── bai-7-thoat-hiem-khi-gap-vung-nuoc-xoay.html
│   ├── bai-8-thoat-hiem-khi-bi-dong-chay-cuon-ra-xa-bo.html
│   ├── bai-9-ky-nang-cuu-duoi.html
│   └── bai-10-to-chuc-tap-huan-ky-nang-an-toan.html
├── tro-choi/           # Các trang trò chơi (mở riêng)
├── assets/images/      # Hình ảnh, infographic
├── assets/videos/      # Video (hoặc nhúng YouTube)
└── .vscode/            # Cấu hình gợi ý cho VS Code
```

## Chạy trên VS Code
1. Cài VS Code, mở thư mục `phong-chong-duoi-nuoc` (File → Open Folder).
2. Cài extension **Live Server** (VS Code sẽ tự gợi ý).
3. Mở `index.html`, bấm **Go Live** ở góc dưới bên phải. Trang sẽ chạy tại http://127.0.0.1:5500.

## Lưu ý khi phát triển
- Điều hướng trang chính dùng hash tự nhiên: `#home`, `#kienthuc`, `#baihoc`, `#bai1`, `#trochoi`, `#bando`, `#trola`, `#khaosat`, `#gioithieu`. Thư viện bài học riêng nằm ở `bai-hoc/index.html`; thêm bài mới tại thư mục này và cập nhật danh sách bài học.
- Thay các nội dung trong ngoặc vuông `[...]` bằng dữ liệu thật.
- Khảo sát hiện chưa lưu dữ liệu; để thu thập kết quả, kết nối Google Form hoặc backend.
- Trợ lý AI đang dùng bộ câu hỏi có sẵn trong `js/main.js` (biến `KB`); có thể thay bằng API AI.
- Mã QR trong trang Giới thiệu là ô minh họa; tạo mã thật từ đường dẫn công khai sau khi triển khai.

## Triển khai miễn phí
Đẩy thư mục lên GitHub rồi bật GitHub Pages, hoặc kéo-thả thư mục lên Netlify Drop.
