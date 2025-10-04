package com.example.adbye.dto;

import java.util.List;

// FastApiClient에서 사용
public class AnalyzeRequest {
    private String review; // 사용자 리뷰
    private List<String> ad_reviews; // 광고성 리뷰 DB

    public AnalyzeRequest() {
    }

    public AnalyzeRequest(String review, List<String> ad_reviews) {
        this.review = review;
        this.ad_reviews = ad_reviews;
    }

    // 기본적인 getter, setter (접근자, 변경자) > 이를 통하여 JSON으로 쉽게 변경 가능
    // FastApiClient에서 FastAPI 요청 JSON
    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    // FastApiClient에서 광고 문장 개수
    public List<String> getAd_reviews() {
        return ad_reviews;
    }

    public void setAd_reviews(List<String> ad_reviews) {
        this.ad_reviews = ad_reviews;
    }
}