package com.example.adbye.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Question {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String content;

  private String username; // 작성자 ID

  private LocalDateTime createdAt = LocalDateTime.now();

  @OneToOne(mappedBy = "question", cascade = CascadeType.ALL)
  private Answer answer;

  // getters/setters
}