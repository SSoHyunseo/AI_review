package com.example.adbye.entity;

import jakarta.persistence.*;

@Entity
public class AdReviewText {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGTEXT") // LONGTEXT를 명시적으로 지정
    private String content;

    public AdReviewText() {
    }

    public AdReviewText(String content) {
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }
}