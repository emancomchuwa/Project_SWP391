// Bước 1: Luôn phải import thư viện React đầu tiên ở mọi tệp .jsx
import React from 'react';

// Bước 2: Khai báo một hàm (function). Tên hàm bắt buộc viết Hoa chữ cái đầu.
// Thông thường người ta đặt tên hàm giống y hệt tên file cho dễ quản lý (Ở đây là About)
function About() {
  
  // Bước 3: Lệnh return (Trả về). Tất cả những mã HTML bạn muốn vẽ lên màn hình đều phải nằm trong lệnh return này.
  return (
    // Lưu ý của React: Lệnh return chỉ được phép trả về MỘT thẻ gốc duy nhất. 
    // Vì vậy ta thường dùng một thẻ <div> (hoặc <>) để bọc tất cả các thẻ con vào trong.
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Trang Giới Thiệu</h1>
      
      <p style={{ marginTop: '10px', fontSize: '18px' }}>
        Xin chào! Đây là trang giới thiệu siêu đơn giản được tạo bằng React.
      </p>
      
      <p style={{ marginTop: '5px', color: 'gray' }}>
        Nội dung của trang này đang nằm hoàn toàn trong tệp <b>About.jsx</b>.
      </p>
    </div>
  );

}

// Bước 4: Khai báo lệnh xuất (export). 
// Nếu không có dòng này, file này sẽ bị cô lập, file App.jsx không thể lôi nó ra dùng được!
export default About;
