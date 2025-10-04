package com.example.adbye.repository;

import com.example.adbye.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewsRepository extends JpaRepository<Reviews, Long> {
  List<Reviews> findByCategoryAndLabel(String category, Integer label);

  List<Reviews> findAllByLabel(Integer label);
}