# Hướng dẫn tùy chỉnh cho GitHub Copilot

Các hướng dẫn trong tệp này nhằm cung cấp cho GitHub Copilot thông tin liên quan và ngữ cảnh về dự án. Những hướng dẫn này ngắn gọn, tự chứa và áp dụng rộng rãi cho hầu hết các yêu cầu trong ngữ cảnh của kho lưu trữ.

## Tổng quan dự án

- **Mục đích:** Xây dựng một ứng dụng chat thời gian thực cơ bản sử dụng Websocket.
- **Mục tiêu:** Cung cấp một giao diện người dùng trực quan, sinh động và hiệu quả cho việc trao đổi tin nhắn.
- **Công nghệ Frontend:** Vite, React, TypeScript, React Router v6.4+, Tailwind CSS.
- **Công nghệ Backend:** Websocket (triển khai độc lập hoặc sử dụng thư viện phổ biến).

## Cấu trúc thư mục quan trọng

- `/frontend`: Chứa mã nguồn của ứng dụng React frontend.
- `/backend`: Chứa mã nguồn của dịch vụ backend (nếu có trong cùng repo).
- `/src`: Thư mục chính cho mã nguồn React trong frontend.
- `/src/components`: Chứa các thành phần UI có thể tái sử dụng.
- `/src/pages`: Chứa các trang chính của ứng dụng.
- `/src/assets`: Chứa các tài nguyên tĩnh như hình ảnh, font chữ.
- `/src/hooks`: Chứa các React Hooks tùy chỉnh.
- `/src/utils`: Chứa các hàm tiện ích.
- `/src/styles`: Chứa các tệp cấu hình Tailwind CSS và CSS tùy chỉnh.

## Tiêu chuẩn và quy ước mã hóa

- **Quy ước đặt tên:**
  - Thành phần React: PascalCase (ví dụ: `ChatWindow`, `MessageInput`).
  - Biến và hàm: camelCase (ví dụ: `sendMessage`, `userName`).
  - Tệp: kebab-case hoặc PascalCase tùy thuộc vào ngữ cảnh (ví dụ: `message-input.tsx` hoặc `ChatWindow.tsx`).
- **Định dạng:** Tuân thủ Prettier và ESLint đã cấu hình.
- **Best Practices:** Ưu tiên mã sạch, dễ đọc, có khả năng mở rộng và sử dụng TypeScript để đảm bảo kiểu dữ liệu. Sử dụng Hooks hiệu quả, quản lý trạng thái phù hợp (ví dụ: Context API, Redux/Zustand nếu cần thiết).

## Công cụ và Thư viện chính

- **Vite:** Công cụ build nhanh.
- **React:** Thư viện giao diện người dùng.
- **TypeScript:** Ngôn ngữ lập trình có kiểu.
- **React Router v6.4+:** Quản lý định tuyến.
- **Tailwind CSS:** Framework CSS utility-first.
- **Websocket API/Thư viện:** Để kết nối backend (ví dụ: `websocket-ts` hoặc `socket.io-client`).
- **Icon Library:** (Sẽ được đề xuất trong `reacttypescript.md`).
