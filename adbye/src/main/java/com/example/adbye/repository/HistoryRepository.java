package com.example.adbye.repository;

import com.example.adbye.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
  List<History> findByUser_IdOrderByCreatedAtDesc(Long userId);
}