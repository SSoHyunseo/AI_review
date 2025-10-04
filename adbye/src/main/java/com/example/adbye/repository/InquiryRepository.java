package com.example.adbye.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.adbye.entity.Inquiry;
import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
  List<Inquiry> findByUsername(String username);
}