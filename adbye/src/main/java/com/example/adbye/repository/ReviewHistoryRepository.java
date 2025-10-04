// ReviewHistoryRepository.java
package com.example.adbye.repository;

import com.example.adbye.entity.ReviewHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewHistoryRepository extends JpaRepository<ReviewHistory, Long> {
    List<ReviewHistory> findByUserIdOrderByCreatedAtDesc(String userId);
}