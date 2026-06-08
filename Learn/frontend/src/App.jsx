// Import React: Công cụ cốt lõi để xây dựng giao diện (Bắt buộc phải có ở các file giao diện)
import React from 'react';
// Import các công cụ từ react-router-dom để làm chức năng chuyển trang không cần tải lại
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// Nhúng (Import) trang Hồ Sơ Sinh Viên từ file StudentProfile.jsx cùng thư mục
import StudentProfile from './StudentProfile';
// Nhúng (Import) trang Giới Thiệu từ file About.jsx cùng thư mục
import About from './About';

// Hàm Home(): Đại diện cho trang chủ. (Trong React, mỗi thành phần giao diện là một hàm)
function Home() {
  return (
    // Dùng thẻ div để bọc nội dung. style={{}} dùng để nhúng mã CSS trực tiếp vào thẻ
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Tiêu đề trang */}
      <h1>🏠 Chào mừng đến với Hello Student</h1>
      {/* Một đoạn văn bản mô tả ngắn */}
      <p style={{ marginTop: '10px', color: '#555' }}>Đây là Trang Chủ. Hãy thử bấm nút bên dưới để thấy sự kì diệu của React Router.</p>
      
      {/* Thẻ Link: Giống hệt thẻ <a> trong HTML nhưng xịn hơn ở chỗ không làm tải lại (reload) trình duyệt */}
      <Link to="/profile">
        {/* Một nút bấm (button) được trang trí bằng CSS */}
        <button style={{ 
          marginTop: '20px', padding: '10px 20px', fontSize: '16px', 
          cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', 
          border: 'none', borderRadius: '5px', fontWeight: 'bold' 
        }}>
          Xem Hồ Sơ Sinh Viên
        </button>
      </Link>
    </div>
  );
}

// Hàm App(): Hàm trung tâm của toàn bộ ứng dụng (Giống như hàm main() trong Java)
function App() {
  return (
    // BrowserRouter: Vỏ bọc bao quanh toàn bộ Web, báo hiệu rằng chúng ta đang bật chế độ định tuyến (chuyển trang)
    <BrowserRouter>
      
      {/* 1. THANH MENU (NAVBAR) - Nằm bên ngoài <Routes> nên trang nào cũng sẽ nhìn thấy thanh này */}
      <nav style={{ background: '#1e293b', padding: '15px', display: 'flex', gap: '15px' }}>
        {/* Nút bấm để quay về Trang chủ (Đường dẫn là "/") */}
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Trang Chủ</Link>
        {/* Nút bấm sang trang Hồ sơ (Đường dẫn là "/profile") */}
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Hồ Sơ</Link>
        {/* Nút bấm sang trang Giới thiệu (Đường dẫn là "/about") */}
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Giới Thiệu</Link>
      </nav>

      {/* 2. VÙNG NỘI DUNG THAY ĐỔI: Đây là nơi màn hình sẽ tự động tráo đổi tùy theo người dùng bấm nút nào */}
      <Routes>
        {/* Nếu trên thanh địa chỉ là / thì hiện ra màn hình <Home /> */}
        <Route path="/" element={<Home />} />
        {/* Nếu trên thanh địa chỉ là /profile thì hiện ra màn hình <StudentProfile /> */}
        <Route path="/profile" element={<StudentProfile />} />
        {/* Nếu trên thanh địa chỉ là /about thì hiện ra màn hình <About /> */}
        <Route path="/about" element={<About />} />
      </Routes>
      
    </BrowserRouter>
  );
}

// Lệnh export default: Xuất hàm App ra để file main.jsx có thể mang đi in lên trình duyệt
export default App;
