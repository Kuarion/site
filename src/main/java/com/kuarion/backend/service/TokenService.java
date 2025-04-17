package com.kuarion.backend.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.JWT;

import com.kuarion.backend.entities.User;

@Service
public class TokenService {
  
  // environment variable
  @Value("${token.secret}")
  private String tokenSecret;
  
  public String createToken(User user) {
    try {
      
      // the environment variable is hashed using HMAC 256 bits
      Algorithm algorithm = Algorithm.HMAC256(tokenSecret);
      
      return JWT.create()
             .withIssuer("jwtToken")
             .withSubject(user.getUsername())
             .withExpiresAt(expirationTime())
             .sign(algorithm);
    } catch (JWTVerificationException e) {
      throw new RuntimeException("Token could not be created: ", e);
    }
  }
  
  public String validateToken(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(tokenSecret);
      
      return JWT.require(algorithm)
             .withIssuer("jwtToken")
             .build()
             .verify(token)
             // return authenticated user
             .getSubject();
    } catch (JWTVerificationException e) {
      return "";
    }
  }
  
  private Instant expirationTime() {
    
    // the JWT token has 5 hours of duration
    return LocalDateTime.now().plusHours(5).toInstant(ZoneOffset.of("-03:00"));
  }
}