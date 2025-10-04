package com.example.adbye;

// 스프링부트 애플리케이션 실행
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//이 클래스가 스프링부트의 시작점임을 알림
@SpringBootApplication
// 내장 서버 (기본적으로 8080포트)가 실행됨
public class AdbyeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdbyeApplication.class, args);
	}

}