package com.example.adbye.entity;

// Lob 어노테이션 임포트
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import com.example.adbye.entity.User;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "history")
public class History {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "history_id")
  private Long historyId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
  private User user;

  @Column(nullable = false)
  private String category;

  @Lob
  @Column(name = "input_review", nullable = false, columnDefinition = "TEXT")
  private String inputReview;

  @Column(name = "similarity_score")
  private Double similarityScore;

  @Lob
  @Column(name = "most_similar_review", columnDefinition = "TEXT")
  private String mostSimilarReview;

  @Column(name = "ad_keywords", length = 2048)
  private String adKeywords;

  @Column(name = "non_ad_keywords", length = 2048)
  private String nonAdKeywords;

  private String judgment;

  @Lob
  @Column(name = "result_details", columnDefinition = "TEXT")
  private String resultDetails;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  // --- DTO 변환을 위한 정적 메서드 ---
  public static History from(User user, com.example.adbye.dto.HistoryDto.HistoryRequestDto requestDto) {
    return History.builder()
        .user(user)
        .category(requestDto.getCategory())
        .inputReview(requestDto.getInputReview())
        .similarityScore(requestDto.getSimilarityScore())
        .mostSimilarReview(requestDto.getMostSimilarReview())
        .adKeywords(requestDto.getAdKeywords())
        .nonAdKeywords(requestDto.getNonAdKeywords())
        .judgment(requestDto.getJudgment())
        .resultDetails(requestDto.getResultDetails())
        .build();
  }

  public com.example.adbye.dto.HistoryDto.HistoryResponseDto toResponseDto() {
    return com.example.adbye.dto.HistoryDto.HistoryResponseDto.builder()
        .historyId(this.historyId)
        .category(this.category)
        .inputReview(this.inputReview)
        .similarityScore(this.similarityScore)
        .mostSimilarReview(this.mostSimilarReview)
        .adKeywords(this.adKeywords)
        .nonAdKeywords(this.nonAdKeywords)
        .judgment(this.judgment)
        .resultDetails(this.resultDetails)
        .createdAt(this.createdAt)
        .build();
  }
}