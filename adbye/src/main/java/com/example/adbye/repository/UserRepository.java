package com.example.adbye.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.adbye.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    // 이메일로 사용자 찾기
    Optional<User> findByEmail(String email);

    // 사용자 이름과 이메일로 사용자 찾기
    Optional<User> findByUsernameAndEmail(String username, String email);

    // ↓↓↓ UserService에서 사용하고 있는 이 메서드를 추가해야 합니다! ↓↓↓
    boolean existsByEmail(String email);
}