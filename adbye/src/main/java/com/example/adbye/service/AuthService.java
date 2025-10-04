package com.example.adbye.service;

import com.example.adbye.entity.User;
import com.example.adbye.repository.UserRepository;
import com.example.adbye.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service // @Service 애너테이션 추가
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private JavaMailSender mailSender;

  @Autowired // PasswordEncoder 의존성 추가
  private PasswordEncoder passwordEncoder;

  // 아이디 찾기 로직
  @Transactional(readOnly = true)
  public String findUsernameByEmail(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("해당 이메일로 가입된 사용자를 찾을 수 없습니다."));

    String username = user.getUsername();
    if (username.length() > 5) {
      return username.substring(0, 2) + "*****" + username.substring(username.length() - 3);
    }
    return username.substring(0, 1) + "*****";
  }

  // 비밀번호 재설정 요청 로직
  public void requestPasswordReset(String username, String email) {
    User user = userRepository.findByUsernameAndEmail(username, email)
        .orElse(null); // 사용자가 없어도 에러를 발생시키지 않음

    if (user != null) {
      // 비밀번호 재설정용 토큰 생성 (만료 시간 30분)
      String resetToken = jwtUtils.generatePasswordResetToken(user.getUsername());

      // 이메일 발송
      sendPasswordResetEmail(user.getEmail(), resetToken);
    }
    // 사용자가 존재하지 않아도, 공격자에게 정보 노출을 막기 위해 아무 작업도 하지 않고 넘어갑니다.
  }

  // 비밀번호 재설정 이메일 발송
  private void sendPasswordResetEmail(String toEmail, String token) {
    String subject = "[re:view] 비밀번호 재설정 요청";
    // 프론트엔드 재설정 페이지 URL
    String resetUrl = "http://localhost:3000/reset-password?token=" + token;
    String message = "비밀번호를 재설정하려면 아래 링크를 클릭하세요. (30분 내에 만료됩니다)\n" + resetUrl;

    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(toEmail);
    email.setSubject(subject);
    email.setText(message);
    mailSender.send(email);
  }

  // 새 비밀번호 설정 로직
  @Transactional
  public void resetPassword(String token, String newPassword) {
    if (!jwtUtils.validateJwtToken(token)) {
      throw new RuntimeException("유효하지 않거나 만료된 토큰입니다.");
    }

    String username = jwtUtils.getUserNameFromJwtToken(token);
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

    // 새 비밀번호 암호화 및 저장
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
  }

}
