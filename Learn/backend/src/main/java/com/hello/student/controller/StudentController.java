package com.hello.student.controller;

import com.hello.student.entity.Student;
import com.hello.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController 
@RequestMapping("/api/students") 
@CrossOrigin(origins = "*") 
public class StudentController {

    // Kéo anh Thủ kho (Repository) vào đây để Lễ tân có người sai vặt lấy đồ.
    // @Autowired là cơ chế Tiêm phụ thuộc (Dependency Injection), Spring sẽ tự động cung cấp một anh Thủ kho cho ta xài.
    @Autowired
    private StudentRepository studentRepository;

    /**
     * API 1: Lấy danh sách TẤT CẢ sinh viên trong Database (GET)
     */
    @GetMapping 
    public List<Student> getAllStudents() {
        // Sai thủ kho lội vào CSDL lấy tất cả dữ liệu (Tương đương câu lệnh: SELECT * FROM student)
        return studentRepository.findAll(); 
    }

    /**
     * API 2: Thêm mới 1 sinh viên vào Database (POST)
     * Khi React gửi 1 đơn POST kèm theo cục JSON thông tin sinh viên mới, nó sẽ lọt vào đây.
     */
    @PostMapping
    public Student createStudent(@RequestBody Student newStudent) {
        // @RequestBody sẽ dịch ngược cục JSON từ React thành Object Java (newStudent).
        // Sau đó sai thủ kho lưu xuống CSDL (Tương đương câu lệnh: INSERT INTO student...)
        return studentRepository.save(newStudent);
    }

    /**
     * API 3: Xóa 1 sinh viên khỏi Database (DELETE)
     * Đường dẫn sẽ có dạng: DELETE http://localhost:8081/api/students/5
     */
    @DeleteMapping("/{id}")
    public Map<String, String> deleteStudent(@PathVariable Integer id) {
        // Sai thủ kho xóa dòng dữ liệu
        studentRepository.deleteById(id);
        
        // Tạo một gói hàng JSON chứa câu thông báo để gửi về cho React
        Map<String, String> response = new HashMap<>();
        response.put("message", "Xác nhận từ Backend: Đã xóa vĩnh viễn sinh viên mang mã số " + id);
        
        return response;
    }

    /**
     * API 4: Cập nhật thông tin sinh viên (PUT)
     * Đường dẫn: PUT http://localhost:8081/api/students/5
     */
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Integer id, @RequestBody Student updatedStudent) {
        // Bước quan trọng: Ép mã ID của Object gửi lên trùng với mã ID trên đường dẫn
        // Nhờ vậy, anh Thủ kho (JPA) sẽ hiểu lệnh .save() này là CẬP NHẬT (UPDATE) chứ không phải THÊM MỚI (INSERT)
        updatedStudent.setId(id);
        return studentRepository.save(updatedStudent);
    }

    /**
     * API 5: TÌM KIẾM NÂNG CAO (Thử nghiệm Native Query)
     * Đường link sẽ có dạng: http://localhost:8081/api/students/search?major=IT&age=20
     */
    @GetMapping("/search")
    public List<Student> timKiemNangCao(@RequestParam String major, @RequestParam Integer age) {
        return studentRepository.timSinhVienLonTuoi(major, age);
    }
}
