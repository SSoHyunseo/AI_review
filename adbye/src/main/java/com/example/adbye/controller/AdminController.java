package com.example.adbye.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

  @GetMapping("/users")
  public ResponseEntity<String> getAllUsers() {
    // 이 API는 관리자만 모든 사용자 목록 조회 가능
    // 실제 DB에서 사용자 목록을 가져와 반환하는 로직 들어감
    return ResponseEntity.ok("Admin access: All users list.");
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable Long id) {
    // 이 API는 관리자가 특정 사용자 삭제할 때 사용
    // 실제 해당 ID의 사용자를 DB에서 삭제하는 로직 들어감
    return ResponseEntity.ok("Admin access: User " + id + " has been deleted.");
  }

  @GetMapping("/dashboard")
  public ResponseEntity<String> getAdminDashboard() {
    // 이 API는 관리자 대시보드 데이터 제공
    return ResponseEntity.ok("Admin access: Dashboard data.");
  }
}