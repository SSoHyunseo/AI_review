package com.example.adbye.service;

import com.example.adbye.entity.User;
import com.example.adbye.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
// DB에서 사용자 정보 불러옴
public class UserDetailsServiceImpl implements UserDetailsService {

    // JPA Repository를 주입받아 DB와 통신
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
     * 사용자 아이디를 기반으로 DB에서 사용자 정보 조회
     * 
     * @param username 로긍니 또는 토큰에서 추출된 사용자의 아이디
     * 
     * @return Spring Security가 이해할 수 있는 UserDetails 객체
     * throws UsernameNotFoundException 해당 사용자를 찾을 수 없을때 발생하는 예외
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // userRepository를 사용해서 DB에서 username에 해당하는 User 엔티티 조회
        // 이떄 findByUsername 메소드는 UserRepository에 정의되어있어야함
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("아이디를 찾을 수 없습니다: " + username)); // 예외는 Spring
                                                                                                  // Security가 자동으로 처리

        // 조회된 User 엔티티를 Spring Security가 사용하는 UserDetails 객체로 변환하여 반환
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), // 사용자 아이디
                user.getPassword(), // 사용자의 암호화된 비밀번호
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole())) // 사용자 권한 목록
        );
    }
}