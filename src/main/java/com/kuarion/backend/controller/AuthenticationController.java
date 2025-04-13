package com.kuarion.backend.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import jakarta.servlet.http.Cookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;

import com.kuarion.backend.dtos.RegisterDTO;
import com.kuarion.backend.entities.User;
import com.kuarion.backend.errors.EmailOrUsernameAlreadyExists;
import com.kuarion.backend.roles.Roles;

@RestController @RequestMapping(value = "/authentication")
public class AuthenticationService {
  private UserService userService;
  private PasswordEncoder passwordEncoder;
  
  // Dependencies Injection
  public AuthenticationController(UserService userService, PasswordEncoder, passwordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }
  
  @PostMapping(value = "{type}/register")
  public ResponseEntity signup(@PathVariable String type, @RequestBody RegisterDTO data, Roles role) {
    try {
      
      // condition to verify if it's an user
      if (type.equalsIgnoreCase("pf")) {
        var email = this.userService.emailExists(data.email());
        var username = this.userService.usernameExists(data.username());
        if (email || username) {
          throw new EmailOrUsernameAlreadyExists("Email or username already exists!");
        }
        
        // it calls the bean `passwordEncoder`
        String encryptedPassword = this.passwordEncoder.encode(data.password());
        this.userService.createUser(data.firstName(), data.lastName(), data.username(), data.email(), encryptedPassword, role.fromString());
        
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("Message", "User created successfully!"));
      // condition to verify if it's an enterprise
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "URI not found!"));
      }
    } catch (EmailOrUsernameAlreadyExists e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
    }
  }
}
