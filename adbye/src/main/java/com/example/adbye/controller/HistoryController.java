package com.example.adbye.controller;

import com.example.adbye.dto.HistoryDto;
import com.example.adbye.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoryController {

  private final HistoryService historyService;

  // 생성자를 직접 작성하여 의존성 주입
  public HistoryController(HistoryService historyService) {
    this.historyService = historyService;
  }

  /**
   * 현재 로그인된 사용자의 분석 기록을 저장합니다.
   */
  @PostMapping
  public ResponseEntity<HistoryDto.HistoryResponseDto> saveHistory(
      Authentication authentication,
      @RequestBody HistoryDto.HistoryRequestDto requestDto) {
    String username = authentication.getName();
    return ResponseEntity.ok(historyService.saveHistory(username, requestDto));
  }

  /**
   * 현재 로그인된 사용자의 모든 분석 기록을 조회합니다.
   */
  @GetMapping
  public ResponseEntity<List<HistoryDto.HistoryResponseDto>> getHistory(Authentication authentication) {
    if (authentication == null || !authentication.isAuthenticated()) {
      // 로그인하지 않은 사용자는 빈 목록 반환
      return ResponseEntity.ok(List.of());
    }
    String username = authentication.getName();
    return ResponseEntity.ok(historyService.getHistoryByUsername(username));
  }
}