package com.example.adbye.service;

import com.example.adbye.dto.AnalyzeRequest;
import com.example.adbye.dto.AnalyzeResponse;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FastApiClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String FASTAPI_URL = "http://localhost:8000/analyze";

    public AnalyzeResponse analyzeReview(AnalyzeRequest request) {

        System.out.println("➡ FastAPI 요청 JSON: " + request.getReview() 
                           + " / 광고 문장 개수: " + request.getAd_reviews().size());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<AnalyzeRequest> entity = new HttpEntity<>(request, headers);

        
        ResponseEntity<AnalyzeResponse> response = restTemplate.exchange(
                FASTAPI_URL,
                HttpMethod.POST,
                entity,
                AnalyzeResponse.class
        );


        System.out.println("⬅ FastAPI 응답 수신 완료: " + response.getBody());

        return response.getBody();
    }
}

