package com.example.adbye.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class HistoryDto {

  @Getter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class HistoryRequestDto {
    private String category;
    private String inputReview;
    private Double similarityScore;
    private String mostSimilarReview;
    private String adKeywords;
    private String nonAdKeywords;
    private String judgment;
    private String resultDetails;

    public HistoryRequestDto(String category, String inputReview, double similarityScore, String mostSimilarReview, String adKeywords, String nonAdKeywords, String judgment, String resultDetails) {
        this.category = category;
        this.inputReview = inputReview;
        this.similarityScore = similarityScore;
        this.mostSimilarReview = mostSimilarReview;
        this.adKeywords = adKeywords;
        this.nonAdKeywords = nonAdKeywords;
        this.judgment = judgment;
        this.resultDetails = resultDetails;
    }
  }

  @Getter
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class HistoryResponseDto {
    private Long historyId;
    private String category;
    private String inputReview;
    private Double similarityScore;
    private String mostSimilarReview;
    private String adKeywords;
    private String nonAdKeywords;
    private String judgment;
    private String resultDetails;
    private LocalDateTime createdAt;
  }
}