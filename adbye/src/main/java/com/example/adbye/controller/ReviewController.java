package com.example.adbye.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.example.adbye.dto.HistoryDto;
import com.example.adbye.service.HistoryService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.adbye.dto.AnalyzeRequest;
import com.example.adbye.dto.AnalyzeResponse;
import com.example.adbye.entity.Reviews;
import com.example.adbye.service.FastApiClient;
import com.example.adbye.repository.ReviewsRepository;

// RestAPI 컨트롤러로 설정
@RestController
// URL 아래의 엔드포인트 정의
@RequestMapping("/review")
// 프론트와 통신
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewsRepository reviewsRepository; // 새로운 reviewsRepository 주입
    // FastApi 서버와 통신하는 틀라이언트 (리뷰 분석 요청 및 결과 수신
    private final FastApiClient fastApiClient;
    private final HistoryService historyService;

    // 카테고리 매핑
    private static final Map<String, String> categoryMap = new HashMap<>();
    static {
        categoryMap.put("패션잡화", "FashionGrocery");
        categoryMap.put("식품건강", "FoodHealth");
        categoryMap.put("뷰티", "Beauty");
        categoryMap.put("생활주방", "Household/kitchen");
        categoryMap.put("유아동", "Childbirth/indolder");
        categoryMap.put("문구오피스", "Toy/Stationery");
    }

    public ReviewController(ReviewsRepository reviewsRepository, FastApiClient fastApiClient,
            HistoryService historyService) {
        this.reviewsRepository = reviewsRepository;
        this.fastApiClient = fastApiClient;
        this.historyService = historyService;
    }

    @PostMapping("/check")
    public AnalyzeResponse checkReview(@RequestBody Map<String, String> payload, Authentication authentication) {
        String userReview = payload.get("userReview");
        String category = payload.get("category");

        // 현재 로그인한 사용자 정보 가져오기
        String username = null;
        if (authentication != null && authentication.isAuthenticated()) {
            username = authentication.getName();
        }

        List<Reviews> adReviewsEntities;
        // 카테고리가 지정되었고, '스포츠레저'나 '가전디지털'이 아닌 경우 해당 카테고리에서 검색
        if (category != null && !category.isEmpty() && !"스포츠레저".equals(category) && !"가전디지털".equals(category)) {
            String dbCategory = categoryMap.get(category);
            adReviewsEntities = reviewsRepository.findByCategoryAndLabel(dbCategory, 1);
        } else {
            // 카테고리가 없거나 '스포츠레저', '가전디지털'인 경우 전체 DB에서 검색
            adReviewsEntities = reviewsRepository.findAllByLabel(1);
        }

        // 전처리된 리뷰를 key로, 원문 리뷰를 value로 갖는 맵 생성
        Map<String, String> cleanedToOriginalReviewMap = adReviewsEntities.stream()
                .collect(Collectors.toMap(Reviews::getCleanedReview, Reviews::getContent,
                        (existing, replacement) -> existing));

        // FastAPI에 보낼 전처리된 리뷰 리스트
        List<String> cleanedAdReviews = new ArrayList<>(cleanedToOriginalReviewMap.keySet());

        AnalyzeRequest req = new AnalyzeRequest(userReview, cleanedAdReviews);
        AnalyzeResponse analyzeResponse = fastApiClient.analyzeReview(req);

        // FastAPI로부터 받은 가장 유사한 '전처리된' 리뷰
        String mostSimilarCleanedReview = analyzeResponse.getMostSimilarAdReview();
        // 맵을 사용해 원문 리뷰를 찾음
        String mostSimilarOriginalReview = cleanedToOriginalReviewMap.getOrDefault(mostSimilarCleanedReview,
                mostSimilarCleanedReview);

        // 응답 객체를 새로 생성하여 원문 리뷰로 교체
        AnalyzeResponse finalResponse = new AnalyzeResponse(analyzeResponse.getInputReview(),
                analyzeResponse.getSimilarityScore(), mostSimilarOriginalReview, analyzeResponse.getAdKeywords(),
                analyzeResponse.getNonAdKeywords(), analyzeResponse.getDecision());

        // 로그인한 사용자인 경우에만 히스토리 저장
        if (username != null) {
            HistoryDto.HistoryRequestDto historyRequestDto = new HistoryDto.HistoryRequestDto(
                    category,
                    finalResponse.getInputReview(),
                    finalResponse.getSimilarityScore(),
                    finalResponse.getMostSimilarAdReview(), // 원문 리뷰를 히스토리에 저장
                    finalResponse.getAdKeywords() != null ? String.join(", ", finalResponse.getAdKeywords()) : "",
                    finalResponse.getNonAdKeywords() != null ? String.join(", ", finalResponse.getNonAdKeywords()) : "",
                    finalResponse.getDecision());
            historyService.saveHistory(username, historyRequestDto);
        }

        return finalResponse;
    }
}