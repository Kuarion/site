package com.kuarion.backend.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import jakarta.servlet.http.Cookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;

import org.springframework.web.bind.annotation.PathVariable;
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

import com.kuarion.backend.dtos.LoginDTO;
import com.kuarion.backend.dtos.RegisterDTO;
import com.kuarion.backend.entities.User;
import com.kuarion.backend.errors.EmailOrUsernameAlreadyExists;
import com.kuarion.backend.roles.Roles;
import com.kuarion.backend.service.TokenService;
import com.kuarion.backend.service.UserService;

@RestController @RequestMapping(value = "/authentication")
public class AuthenticationController {
  private UserService userService;
  private PasswordEncoder passwordEncoder;
  private AuthenticationManager authenticationManager;
  private TokenService tokenService;
  
  // Dependencies Injection
  public AuthenticationController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenService tokenService) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
  }
  
  @PostMapping(value = "/{type}/register")
  public ResponseEntity signup(@PathVariable String type, @RequestBody RegisterDTO data, Roles role) {
    try {
      // condition to verify if it's a common user
      if (type.equalsIgnoreCase("pf")) {
        var email = this.userService.emailExists(data.email());
        var username = this.userService.usernameExists(data.username());
        // condition to verify if email or username already exists
        if (email || username) {
          throw new EmailOrUsernameAlreadyExists("Email or username already exists!");
        }
        // it calls the bean `passwordEncoder`
        String encryptedPassword = this.passwordEncoder.encode(data.password());
        // create a new user
        this.userService.createUser(data.firstName(), data.lastName(), data.username(), data.email(), encryptedPassword, role.fromString("ROLE_USER"));
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("Message", "User created successfully!"));
      // condition to verify if it's an enterprise
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "URI not found!"));
      }
    } catch (EmailOrUsernameAlreadyExists e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
    }
  }
  
  @PostMapping(value = "/{type}/login")
  public ResponseEntity signin(@RequestBody LoginDTO data, @PathVariable String type, HttpServletResponse res) {
    try {
      // condition to verify if it's a common user
      if (type.equalsIgnoreCase("pf")) {
        // create a new authentication token to represents user authentication
        var authenticationToken = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        // it calls AuthenticationManager bean that will call an AuthenticationProvider. After this, AuthenticationProvider will use UserDetailsService and compare the password with the hashed one in the database
        var auth = this.authenticationManager.authenticate(authenticationToken);
        // create the JWT token using current username as subject
        var token = this.tokenService.createToken((User) auth.getPrincipal());
        // it calls the generateCookie method to create cookie that will keep token
        Cookie cookie = this.generateCookie(token);
        // add cookie in HTTP header
        res.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("token", token));
        
        // important: the AuthenticationManager will not authenticate user itself. It will be a trigger to create cookie and token that will verified by TokenFilter
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "URI not found!"));
      }
    } catch (BadCredentialsException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials!"));
    } catch (LockedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Please, verify your email!"));
    }
  }
  
  private Cookie generateCookie(String token) {
    Cookie cookie = new Cookie("jwtToken", token);
    
    cookie.setHttpOnly(true); // avoid XSS attacks
    cookie.setSecure(false); // it must be true (use false only for tests)
    cookie.setPath("/"); // all paths
    cookie.setAttribute("SameSite", "Strict"); // the cookie will be active only in the same sime it was created (avoid CSRF attacks)
    cookie.setMaxAge(18000); // it will expire in five hours
    
    return cookie;
  }
}