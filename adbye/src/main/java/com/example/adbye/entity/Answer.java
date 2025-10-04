package com.example.adbye.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Answer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String content;

  private LocalDateTime createdAt = LocalDateTime.now();

  @OneToOne
  @JoinColumn(name = "question_id")
  private Question question;

  // getters/setters
}