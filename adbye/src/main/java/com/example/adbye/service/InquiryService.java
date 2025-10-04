package com.example.adbye.service;

import com.example.adbye.entity.Inquiry;
import com.example.adbye.repository.InquiryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class InquiryService {
  private final InquiryRepository inquiryRepository;

  public InquiryService(InquiryRepository inquiryRepository) {
    this.inquiryRepository = inquiryRepository;
  }

  public Inquiry saveInquiry(Inquiry inquiry) {
    return inquiryRepository.save(inquiry);
  }

  public Optional<Inquiry> getInquiry(Long id) {
    return inquiryRepository.findById(id);
  }

  // 🔹 관리자 답변 기능
  public Inquiry answerInquiry(Long id, String answer) {
    Inquiry inquiry = inquiryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("문의가 존재하지 않습니다."));
    inquiry.setAnswer(answer);
    inquiry.setAnsweredAt(LocalDateTime.now());
    return inquiryRepository.save(inquiry);
  }
}