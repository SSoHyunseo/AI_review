package com.example.adbye.service;

import com.example.adbye.dto.HistoryDto;
import com.example.adbye.entity.History;
import com.example.adbye.entity.User;

import com.example.adbye.repository.HistoryRepository;
import com.example.adbye.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HistoryService {

  private final HistoryRepository historyRepository;
  private final UserRepository userRepository;

  @Transactional
  public HistoryDto.HistoryResponseDto saveHistory(String username, HistoryDto.HistoryRequestDto requestDto) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

    History history = History.from(user, requestDto);
    History savedHistory = historyRepository.save(history);
    return savedHistory.toResponseDto();
  }

  public List<HistoryDto.HistoryResponseDto> getHistoryByUsername(String username) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

    return historyRepository.findByUser_IdOrderByCreatedAtDesc(user.getId())
        .stream()
        .map(History::toResponseDto)
        .collect(Collectors.toList());
  }
}