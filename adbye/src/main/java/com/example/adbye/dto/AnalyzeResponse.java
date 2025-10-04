package com.example.adbye.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class AnalyzeResponse {

    @JsonProperty("입력 리뷰")
    private String inputReview;

    @JsonProperty("유사도 점수")
    private double similarityScore;

    @JsonProperty("가장 유사한 광고 리뷰")
    private String mostSimilarAdReview;

    @JsonProperty("광고 키워드")
    private List<String> adKeywords;

    // 비광고 키워드 일단 지우기
    @JsonProperty("비광고 키워드")
    private List<String> nonAdKeywords;

    @JsonProperty("판단")
    private String decision;

    // Getter/Setter
    @JsonProperty("입력 리뷰")
    public String getInputReview() {
        return inputReview;
    }

    public void setInputReview(String inputReview) {
        this.inputReview = inputReview;
    }

    @JsonProperty("유사도 점수")
    public double getSimilarityScore() {
        return similarityScore;
    }

    public void setSimilarityScore(double similarityScore) {
        this.similarityScore = similarityScore;
    }

    @JsonProperty("가장 유사한 광고 리뷰")
    public String getMostSimilarAdReview() {
        return mostSimilarAdReview;
    }

    public void setMostSimilarAdReview(String mostSimilarAdReview) {
        this.mostSimilarAdReview = mostSimilarAdReview;
    }

    @JsonProperty("광고 키워드")
    public List<String> getAdKeywords() {
        return adKeywords;
    }

    public void setAdKeywords(List<String> adKeywords) {
        this.adKeywords = adKeywords;
    }

    // 비광고 키워드 일단 지우기
    @JsonProperty("비광고 키워드")
    public List<String> getNonAdKeywords() {
        return nonAdKeywords;
    }

    // 비광고 키워드 일단 지우기
    public void setNonAdKeywords(List<String> nonAdKeywords) {
        this.nonAdKeywords = nonAdKeywords;
    }

    @JsonProperty("판단")
    public String getDecision() {
        return decision;
    }

    public void setDecision(String decision) {
        this.decision = decision;
    }
}
