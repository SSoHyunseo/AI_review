package com.example.adbye.dto;

import lombok.Data;

@Data
public class PasswordResetRequest {
  private String username;
  private String email;
}