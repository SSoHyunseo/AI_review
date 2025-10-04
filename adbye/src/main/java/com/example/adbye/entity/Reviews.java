package com.example.adbye.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "reviews")
public class Reviews {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 2048)
  private String category;

  @Lob
  @Column(columnDefinition = "LONGTEXT")
  private String content;

  @Column(name = "product_name", length = 2048)
  private String productName;

  @Lob
  @Column(name = "cleaned_review", columnDefinition = "LONGTEXT")
  private String cleanedReview;

  private Integer label;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public String getCleanedReview() {
    return cleanedReview;
  }

  public void setCleanedReview(String cleanedReview) {
    this.cleanedReview = cleanedReview;
  }

  public Integer getLabel() {
    return label;
  }

  public void setLabel(Integer label) {
    this.label = label;
  }
}