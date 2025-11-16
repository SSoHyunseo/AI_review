package com.example.adbye.service;

import com.example.adbye.dto.AnalyzeResponse;
import com.example.adbye.entity.Reviews;
import com.example.adbye.repository.ReviewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewService {

    private final ReviewsRepository reviewsRepository;

    public ReviewService(ReviewsRepository reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

    @Transactional
    public void saveReviewBasedOnAnalysis(String userReview, String category, AnalyzeResponse response) {
        double score = response.getSimilarityScore();

        // 점수(0-100)를 기준으로 저장 여부 결정
        if (score <= 55.0 || score >= 80.0) {
            Reviews newReview = new Reviews();
            newReview.setContent(userReview);
            // 모델이 원문을 사용하므로, 전처리된 리뷰 필드에도 원문을 저장
            newReview.setCleanedReview(userReview);
            
            // 카테고리가 있는 경우에만 설정
            if (category != null && !category.isEmpty()) {
                newReview.setCategory(category);
            }

            if (score <= 55.0) {
                newReview.setLabel(0); // 비광고
            } else { // score >= 80.0
                newReview.setLabel(1); // 광고
            }
            
            reviewsRepository.save(newReview);
        }
    }
}


