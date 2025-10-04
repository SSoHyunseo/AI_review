package com.example.adbye.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // @PreAuthorize 사용 가능하게
public class SecurityConfig {

  private final JwtRequestFilter jwtRequestFilter;

  public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
    this.jwtRequestFilter = jwtRequestFilter;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        // CSRF 비활성화 (JWT 사용 시 필요)
        .csrf(AbstractHttpConfigurer::disable)

        // CORS 설정
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))

        // 권한별 URL 접근 설정
        .authorizeHttpRequests(auth -> auth
            // 인증 없이 접근 가능
            .requestMatchers("/api/auth/**").permitAll() // 회원가입/로그인
            .requestMatchers("/review/check").permitAll() // 리뷰 분석 (원하시면 인증 걸 수도 있음)
            .requestMatchers("/auth/**", "/public/**").permitAll()

            // Role 기반 접근
            .requestMatchers("/api/inquiries/**").hasAnyRole("USER", "ADMIN") // 문의 관련 API는 인증 필요
            .requestMatchers("/admin/**").hasRole("ADMIN") // 관리자 전용
            .requestMatchers("/user/**").hasRole("USER") // 회원 전용

            // 나머지 모든 요청은 인증 필요
            .anyRequest().authenticated())

        // JWT 필터 등록 (Spring Security 필터 체인에 추가)
        .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)

        // 기본 로그인/세션 방식 비활성화 (JWT만 사용)
        .formLogin(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable);

    return http.build();
  }

  // AuthenticationManager (로그인 시 AuthenticationProvider 사용)
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }

  // PasswordEncoder (회원가입/로그인 시 비밀번호 암호화)
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // CORS 정책 설정
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowCredentials(true);
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 프론트 React 주소
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}