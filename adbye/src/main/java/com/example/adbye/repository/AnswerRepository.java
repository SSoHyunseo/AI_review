package com.example.adbye.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adbye.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
  Optional<Answer> findByQuestionId(Long questionId);
}