package com.example.adbye.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

  @GetMapping("/profile")
  public ResponseEntity<String> getUserProfile() {
    // 현재 인증된 사용자의 정보를 가져옴
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUsername = authentication.getName();

    // 이 API는 사용자가 자신의 프로필 조회할 때 사용
    return ResponseEntity.ok("User access: " + currentUsername + "'s profile data.");
  }

  @GetMapping("/settings")
  public ResponseEntity<String> getUserSettings() {
    // 이 API는 사용자가 개인 설정 변경 시 사용
    return ResponseEntity.ok("User access: User settings page.");
  }
}