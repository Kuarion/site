package com.kuarion.backend.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
import org.springframework.web.bind.annotation.CrossOrigin;

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
  
  private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);  // Criando o logger

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
      logger.info("Registro solicitado para tipo: " + type);  // Logando o tipo de registro
      if (type.equalsIgnoreCase("pf")) {
        var email = this.userService.emailExists(data.email());
        var username = this.userService.usernameExists(data.username());
        if (email || username) {
          throw new EmailOrUsernameAlreadyExists("Email or username already exists!");
        }
        String encryptedPassword = this.passwordEncoder.encode(data.password());
        this.userService.createUser(data.firstName(), data.lastName(), data.username(), data.email(), encryptedPassword, role.fromString("ROLE_USER"));
        logger.info("Usuário criado com sucesso: " + data.username());  // Logando sucesso no registro
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("Message", "User created successfully!"));
      } else {
        logger.warn("Tipo de registro inválido: " + type);  // Logando tipo de registro inválido
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "URI not found!"));
      }
    } catch (EmailOrUsernameAlreadyExists e) {
      logger.error("Erro de registro: " + e.getMessage(), e);  // Logando erro de usuário ou email já existente
      return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
    }
  }
  
  @PostMapping(value = "/{type}/login")
  public ResponseEntity signin(@RequestBody LoginDTO data, @PathVariable String type, HttpServletResponse res) {
    logger.info("Tentando login para usuário: " + data.username());  // Logando a tentativa de login
    try {
      if (type.equalsIgnoreCase("pf")) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(authenticationToken);
        var token = this.tokenService.createToken((User) auth.getPrincipal());

        logger.info("Autenticação bem-sucedida para usuário: " + data.username());  // Logando sucesso no login

        Cookie cookie = this.generateCookie(token);
        res.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("token", token));
      } else {
        logger.warn("Tipo de login inválido: " + type);  // Logando tipo de login inválido
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "URI not found!"));
      }
    } catch (BadCredentialsException e) {
      logger.error("Credenciais inválidas para usuário: " + data.username(), e);  // Logando erro de credenciais inválidas
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials!"));
    } catch (LockedException e) {
      logger.error("Conta bloqueada para usuário: " + data.username(), e);  // Logando erro de conta bloqueada
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Please, verify your email!"));
    }
  }
  
  private Cookie generateCookie(String token) {
    Cookie cookie = new Cookie("jwtToken", token);
    cookie.setHttpOnly(true); // evitar ataques XSS
    cookie.setSecure(false); // deve ser true (use false apenas para testes)
    cookie.setPath("/"); // para todos os caminhos
    cookie.setAttribute("SameSite", "None"); // para evitar ataques CSRF
    cookie.setMaxAge(18000); // expira em 5 horas
    return cookie;
  }
}
