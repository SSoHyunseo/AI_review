package com.example.adbye.data;

import com.example.adbye.entity.AdReviewText;
import com.example.adbye.repository.AdReviewTextRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.charset.StandardCharsets;

@Component
public class AdReviewImporter implements CommandLineRunner {

    private final AdReviewTextRepository repo;

    public AdReviewImporter(AdReviewTextRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        InputStream is = getClass().getResourceAsStream("/data/ad_reviews.csv");

        if (is == null) {
            System.out.println("❌ ad_reviews.csv 파일을 찾을 수 없습니다.");
            return;
        }

        BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
        String line;
        int count = 0;

        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty() || line.toLowerCase().contains("content"))
                continue;

            AdReviewText review = new AdReviewText();
            review.setContent(line);
            repo.save(review);
            count++;
        }

        System.out.println("✅ 광고 리뷰 " + count + "건이 DB에 저장되었습니다.");
    }
}