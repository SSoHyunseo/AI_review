package com.example.adbye.controller;

import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.adbye.dto.AuthRequest;
import com.example.adbye.dto.AuthResponse;
import com.example.adbye.service.UserService;
import com.example.adbye.service.AuthService; // AuthService import 추가
import com.example.adbye.dto.FindIdRequest;
import com.example.adbye.dto.FindIdResponse;
import com.example.adbye.dto.PasswordResetRequest;
import com.example.adbye.dto.MessageResponse;
import com.example.adbye.dto.NewPasswordRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final AuthService authService; // AuthService 의존성 추가

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        try {
            userService.registerUser(request);
            return ResponseEntity.ok("회원가입 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            String token = userService.loginUser(request.getUsername(), request.getPassword());
            AuthResponse response = new AuthResponse();
            response.setToken(token);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // 현재 로그인한 사용자 role 확인
    @GetMapping("/role")
    public ResponseEntity<Map<String, String>> getUserRole(Authentication authentication) {
        Map<String, String> response = new HashMap<>();

        if (authentication == null || !authentication.isAuthenticated()) {
            response.put("role", "GUEST");
            System.out.println("role check: GUEST");
            return ResponseEntity.ok(response);
        }

        // ROLE_USER, ROLE_ADMIN 등 가져오기
        String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority();
        System.out.println("role check: " + role);

        response.put("role", role);
        return ResponseEntity.ok(response);
    }

    // 아이디 찾기
    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody FindIdRequest findIdRequest) {
        String maskedUsername = authService.findUsernameByEmail(findIdRequest.getEmail());
        return ResponseEntity.ok(new FindIdResponse(maskedUsername));
    }

    // 비밀번호 재설정 링크 요청
    @PostMapping("/request-password-reset")
    public ResponseEntity<?> requestPasswordReset(@RequestBody PasswordResetRequest request) {
        authService.requestPasswordReset(request.getUsername(), request.getEmail());
        return ResponseEntity.ok(new MessageResponse("비밀번호 재설정 요청이 처리되었습니다. 이메일을 확인해주세요."));
    }

    // 비밀번호 재설정
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token,
            @RequestBody NewPasswordRequest newPasswordRequest) {
        authService.resetPassword(token, newPasswordRequest.getNewPassword());
        return ResponseEntity.ok(new MessageResponse("비밀번호가 성공적으로 변경되었습니다."));
    }
}