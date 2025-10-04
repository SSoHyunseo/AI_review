package com.example.adbye.controller;

import com.example.adbye.entity.Inquiry;
import com.example.adbye.service.InquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

  private final InquiryService inquiryService;

  public InquiryController(InquiryService inquiryService) {
    this.inquiryService = inquiryService;
  }

  @PostMapping
  public ResponseEntity<Inquiry> createInquiry(@RequestBody Inquiry inquiry) {
    return ResponseEntity.ok(inquiryService.saveInquiry(inquiry));
  }

  // 🔹 관리자 답변 API
  @PutMapping("/{id}/answer")
  // @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Inquiry> answerInquiry(
      @PathVariable Long id,
      @RequestBody String answer) {
    return ResponseEntity.ok(inquiryService.answerInquiry(id, answer));
  }
}