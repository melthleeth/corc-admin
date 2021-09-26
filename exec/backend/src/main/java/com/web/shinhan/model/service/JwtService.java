package com.web.shinhan.model.service;

import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.web.shinhan.model.AdminDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.UserDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtService {

  public static final Logger logger = LoggerFactory.getLogger(JwtService.class);

  private String signature = "VUETOKEN";
  private Long expireMin = 10L;

  // 로그인 성공시 사용자 정보를 기반으로 JWTToken을 생성하여 반환.
  public String create(UserDto userDto) {
    JwtBuilder jwtBuilder = Jwts.builder();

    // Header 설정
    jwtBuilder.setHeaderParam("typ", "JWT"); // 토큰의 타입으로 고정 값.

    // Payload 설정
    jwtBuilder.setSubject("로그인토큰") // 토큰의 제목 설정
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expireMin)) // 유효기간 설정
        .claim("user", userDto).claim("greeting", "환영합니다. ");

    // signature 설정
    jwtBuilder.signWith(SignatureAlgorithm.HS256, signature.getBytes());

    // 마지막 직렬화 처리
    String jwt = jwtBuilder.compact();
    return jwt;
  }

  // 로그인 성공시 사용자 정보를 기반으로 JWTToken을 생성하여 반환.
  public String createAdmin(AdminDto adminDto) {
    JwtBuilder jwtBuilder = Jwts.builder();

    // Header 설정
    jwtBuilder.setHeaderParam("typ", "JWT"); // 토큰의 타입으로 고정 값.

    // Payload 설정
    jwtBuilder.setSubject("로그인토큰") // 토큰의 제목 설정
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expireMin)) // 유효기간 설정
        .claim("user", adminDto).claim("greeting", "환영합니다. ");

    // signature 설정
    jwtBuilder.signWith(SignatureAlgorithm.HS256, signature.getBytes());

    // 마지막 직렬화 처리
    String jwt = jwtBuilder.compact();
    return jwt;
  }

  // 로그인 성공시 사용자 정보를 기반으로 JWTToken을 생성하여 반환.
  public String createStore(StoreDto storeDto) {
    JwtBuilder jwtBuilder = Jwts.builder();

    // Header 설정
    jwtBuilder.setHeaderParam("typ", "JWT"); // 토큰의 타입으로 고정 값.

    // Payload 설정
    jwtBuilder.setSubject("로그인토큰") // 토큰의 제목 설정
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expireMin)) // 유효기간 설정
        .claim("user", storeDto).claim("greeting", "환영합니다. ");

    // signature 설정
    jwtBuilder.signWith(SignatureAlgorithm.HS256, signature.getBytes());

    // 마지막 직렬화 처리
    String jwt = jwtBuilder.compact();
    return jwt;
  }

  // 전달 받은 토큰이 제대로 생성된것이니 확인 하고 문제가 있다면 RuntimeException을 발생.
  public void checkValid(String jwt) {
    Jwts.parser().setSigningKey(signature.getBytes()).parseClaimsJws(jwt);
  }

  // JWT Token을 분석해서 필요한 정보를 반환.
  public Map<String, Object> get(String jwt) {
    Jws<Claims> claims = null;

    try {
      claims = Jwts.parser().setSigningKey(signature.getBytes()).parseClaimsJws(jwt);
    } catch (final Exception e) {
      throw new RuntimeException();
    }

    // Claims는 Map의 구현체이다.
    return claims.getBody();
  }
}