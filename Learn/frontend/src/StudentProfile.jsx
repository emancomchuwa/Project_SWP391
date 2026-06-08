import React, { useState, useEffect } from 'react';

function StudentProfile() {
  // 1. STATE CHỨA DANH SÁCH SINH VIÊN
  const [students, setStudents] = useState([]);

  // 2. STATE CHỨA DỮ LIỆU TỪ FORM THÊM MỚI (Các ô nhập liệu)
  const [newFullName, setNewFullName] = useState('');
  const [newMajor, setNewMajor] = useState('');
  const [newAge, setNewAge] = useState('');

  // STATE ĐỂ BIẾT TA ĐANG THÊM HAY SỬA
  // Nếu null -> Đang thêm mới. Nếu có số (vd: 5) -> Đang sửa sinh viên số 5
  const [editingId, setEditingId] = useState(null);

  // STATE CHO TÌM KIẾM (BỘ LỌC)
  const [searchMajor, setSearchMajor] = useState('');
  const [searchAge, setSearchAge] = useState('0'); // Mặc định 0 để tìm mọi tuổi

  // 3. HÀM TẢI DỮ LIỆU TỪ DATABASE (Dùng chung cho lúc mới mở web và lúc vừa thêm xong)
  const fetchStudents = () => {
    fetch('http://localhost:8081/api/students', { method: 'GET' })
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  };

  // Vừa mở trang là gọi hàm tải dữ liệu ngay
  useEffect(() => {
    fetchStudents();
  }, []);

  // 4. HÀM XỬ LÝ KHI BẤM NÚT LƯU (Gọi API POST hoặc PUT)
  const handleSaveStudent = () => {
    const studentData = {
      fullName: newFullName,
      major: newMajor,
      age: parseInt(newAge) 
    };

    // Kiểm tra xem đang ở chế độ Thêm mới (POST) hay Sửa (PUT)
    if (editingId === null) {
      // ĐANG THÊM MỚI
      fetch('http://localhost:8081/api/students', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      })
        .then(response => response.json())
        .then(() => {
          alert('Đã thêm sinh viên mới thành công!');
          resetForm();
          fetchStudents();
        })
        .catch(error => console.error("Lỗi khi thêm:", error));
    } else {
      // ĐANG CHỈNH SỬA
      fetch(`http://localhost:8081/api/students/${editingId}`, {
        method: 'PUT', // Động từ PUT = Cập nhật dữ liệu cũ
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      })
        .then(response => response.json())
        .then(() => {
          alert('Đã cập nhật thông tin thành công!');
          resetForm();
          fetchStudents();
        })
        .catch(error => console.error("Lỗi khi sửa:", error));
    }
  };

  // Hàm tiện ích để dọn dẹp Form sau khi Lưu xong
  const resetForm = () => {
    setNewFullName('');
    setNewMajor('');
    setNewAge('');
    setEditingId(null);
  };

  // 5. HÀM XỬ LÝ KHI BẤM NÚT "XÓA" (Gọi API DELETE)
  const handleDelete = (id) => {
    // Hỏi lại cho chắc chắn
    if (!window.confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
      return; 
    }

    // Nối mã id vào cuối đường link, ví dụ: /api/students/5
    fetch(`http://localhost:8081/api/students/${id}`, {
      method: 'DELETE' // Khai báo rõ là muốn đi XÓA
    })
      .then(response => response.json()) // Cạy thùng hàng lấy dữ liệu JSON
      .then(data => {
        // data lúc này chính là Object { message: "Xác nhận từ Backend..." } do Java gửi
        alert(data.message); // In câu nói của Java ra màn hình!
        fetchStudents(); // Cập nhật lại giao diện
      })
      .catch(error => console.error("Lỗi khi xóa:", error));
  };

  // 6. HÀM TÌM KIẾM NÂNG CAO (Gọi API /search)
  const handleSearch = () => {
    if (!searchMajor) {
      alert("Vui lòng nhập ngành học cần tìm!");
      return;
    }
    // Đảm bảo cổng trùng khớp với cổng Backend (8081 hoặc 8080 tùy máy bạn)
    fetch(`http://localhost:8081/api/students/search?major=${encodeURIComponent(searchMajor)}&age=${searchAge}`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Lỗi tìm kiếm:", err));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      
      {/* ================= KHU VỰC 1: FORM NHẬP LIỆU ================= */}
      <div style={{ padding: '20px', backgroundColor: editingId ? '#fef08a' : '#f0fdf4', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>{editingId ? `✏️ Đang sửa thông tin SV (Mã số: ${editingId})` : '➕ Thêm Sinh Viên Mới'}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <input 
            type="text" 
            placeholder="Nhập họ và tên..." 
            value={newFullName} 
            onChange={(e) => setNewFullName(e.target.value)} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="text" 
            placeholder="Ngành học..." 
            value={newMajor} 
            onChange={(e) => setNewMajor(e.target.value)} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="number" 
            placeholder="Tuổi..." 
            value={newAge} 
            onChange={(e) => setNewAge(e.target.value)} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            onClick={handleSaveStudent}
            style={{ padding: '10px', backgroundColor: editingId ? '#eab308' : '#22c55e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {editingId ? 'Cập Nhật Lên CSDL' : 'Thêm Vào Database'}
          </button>
          
          {editingId && (
            <button 
              onClick={resetForm}
              style={{ padding: '10px', backgroundColor: '#9ca3af', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Hủy Chỉnh Sửa
            </button>
          )}
        </div>
      </div>


      {/* ================= KHU VỰC 2: TÌM KIẾM NÂNG CAO (NATIVE QUERY) ================= */}
      <div style={{ padding: '15px', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '8px', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#0369a1' }}>🔍 Bộ lọc sinh viên (Sử dụng Native Query)</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Nhập Ngành học (VD: IT)" 
            value={searchMajor} 
            onChange={(e) => setSearchMajor(e.target.value)} 
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
          />
          <input 
            type="number" 
            placeholder="Tuổi lớn hơn..." 
            value={searchAge} 
            onChange={(e) => setSearchAge(e.target.value)} 
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '120px' }}
          />
          <button 
            onClick={handleSearch}
            style={{ padding: '6px 15px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Lọc Dữ Liệu
          </button>
          <button 
            onClick={() => {
              setSearchMajor('');
              setSearchAge('0');
              fetchStudents(); // Gọi lại hàm tải danh sách gốc
            }}
            style={{ padding: '6px 15px', backgroundColor: '#94a3b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Hủy Lọc
          </button>
        </div>
      </div>

      {/* ================= KHU VỰC 3: HIỂN THỊ DANH SÁCH ================= */}
      <h2 style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>
        Danh Sách Sinh Viên (Từ SQL Server)
      </h2>
      
      {students.length === 0 ? (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>Chưa có sinh viên nào trong CSDL. Hãy nhập thông tin phía trên để thêm nhé!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {students.map((stu) => (
            <div key={stu.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
              <p style={{ margin: '5px 0' }}><strong>Mã SV:</strong> {stu.id}</p>
              <p style={{ margin: '5px 0' }}><strong>Họ Tên:</strong> {stu.fullName}</p>
              <p style={{ margin: '5px 0' }}><strong>Ngành Học:</strong> {stu.major}</p>
              <p style={{ margin: '5px 0' }}><strong>Tuổi:</strong> {stu.age}</p>
              
              {/* Cụm Nút Bấm */}
              <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => {
                    // Khi bấm nút Sửa, ta bê dữ liệu của ông này nhét ngược lên form
                    setEditingId(stu.id);
                    setNewFullName(stu.fullName);
                    setNewMajor(stu.major);
                    setNewAge(stu.age);
                  }}
                  style={{ padding: '5px 10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Sửa
                </button>
                <button 
                  onClick={() => handleDelete(stu.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default StudentProfile;
