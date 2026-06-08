package com.hello.student.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Lớp (Class) này là một Entity đại diện cho một đối tượng dữ liệu trong ứng dụng.
 * Trong ngữ cảnh của Spring Data JPA, nó ánh xạ (map) trực tiếp 1-1 với một bảng (table) trong cơ sở dữ liệu quan hệ (SQL Server).
 */
@Entity // Annotation này khai báo cho Hibernate/JPA biết rằng lớp này cần được ánh xạ thành một bảng trong CSDL. Mặc định tên bảng sẽ là 'student'.
@Data   // Annotation của thư viện Lombok. Khi biên dịch, nó tự động sinh ra các phương thức Getter/Setter (ví dụ: getFullName(), setFullName()), constructor, toString(),... giúp giảm mã boilerplate (code lặp lại).
public class Student {
    
    @Id // Annotation đánh dấu thuộc tính này là Khóa chính (Primary Key) của bảng.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Xác định chiến lược tạo giá trị cho khóa chính. IDENTITY giao việc tự động tăng giá trị (auto-increment) cho hệ quản trị CSDL (SQL Server sẽ dùng thuộc tính IDENTITY(1,1)).
    private Integer id;
    
    // Các thuộc tính bên dưới sẽ tự động được ánh xạ thành các cột (column) trong bảng 'student' với kiểu dữ liệu tương ứng (String -> VARCHAR, Integer -> INT).
    private String fullName;
    private String major;
    private Integer age;
}
