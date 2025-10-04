package com.example.adbye.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Inquiry {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String username; // 문의 작성자
  private String title;
  private String content;

  private String answer; // 관리자 답변

  private LocalDateTime createdAt;
  private LocalDateTime answeredAt;

  public Inquiry() {
    this.createdAt = LocalDateTime.now();
  }

  // getter / setter
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getAnsweredAt() {
    return answeredAt;
  }

  public void setAnsweredAt(LocalDateTime answeredAt) {
    this.answeredAt = answeredAt;
  }
}