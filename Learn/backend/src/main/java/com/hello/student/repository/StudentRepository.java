package com.hello.student.repository;

import com.hello.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * REPOSITORY - NGƯỜI THỦ KHO CỦA DATABASE
 * Lớp này chịu trách nhiệm lội vào SQL Server để Thêm, Sửa, Xóa, Tìm kiếm dữ liệu.
 * Bằng cách kế thừa (extends) JpaRepository, Spring Boot sẽ TỰ ĐỘNG viết sẵn cho chúng ta 
 * hàng chục câu lệnh SQL cơ bản (như SELECT * FROM, INSERT INTO...) mà không cần ta phải gõ dòng SQL nào!
 */
@Repository // Đóng dấu: Báo cho Spring Boot biết đây là Thủ kho.
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // JpaRepository<Tên_Entity, Kiểu_dữ_liệu_của_Khóa_Chính>
    // Chỉ cần để trống thế này thôi, Spring Boot đã ngầm cấp cho nó sức mạnh vô biên rồi.

    // Tuyệt chiêu Native Query: Tìm sinh viên theo Ngành học và Lớn hơn độ tuổi chỉ định
    @Query(value = "SELECT * FROM student WHERE major = :nganhHoc AND age > :tuoi", nativeQuery = true)
    List<Student> timSinhVienLonTuoi(@Param("nganhHoc") String nganhHoc, @Param("tuoi") Integer tuoi);
}
