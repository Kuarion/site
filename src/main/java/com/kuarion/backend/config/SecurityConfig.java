package com.kuarion.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  private TokenFilter tokenFilter;
  
  public SecurityConfig(TokenFilter tokenFilter) {
    this.tokenFilter = tokenFilter;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
     return httpSecurity
        .csrf(csrf -> csrf.disable())
          
        // authentication based in token: stateless security policy
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
          .requestMatchers(HttpMethod.GET, "/", "/login", "/index", "/api/chat/message","/status/**" ,"/statistics" , "/api/chat/history", "/questions").permitAll()
          .requestMatchers(HttpMethod.POST, "/authentication/**", "/api/chat/message", "/submit/**").permitAll()
          .requestMatchers(HttpMethod.DELETE, "/api/chat/history/delete").permitAll()
          
          .requestMatchers(HttpMethod.GET, "/dashboard").authenticated()
          
          .requestMatchers(HttpMethod.GET, "/statistics").permitAll()
          
          .anyRequest().denyAll()
        )
        .logout(logout -> logout
           .logoutUrl("/dashboard/logout")
           .logoutSuccessUrl("/")
           .invalidateHttpSession(true)
           .deleteCookies("jwtToken")
           .permitAll()
         )
        .addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }
    
	
	
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
    }
}