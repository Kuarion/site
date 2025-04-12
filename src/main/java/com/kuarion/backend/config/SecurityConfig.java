package com.kuarion.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
            .csrf(AbstractHttpConfigurer::disable)
            .formLogin(httpForm ->{
              httpForm.loginPage("/login").permitAll();
                httpForm.defaultSuccessUrl("/index", true).permitAll();
                
            })
    
            
            .authorizeHttpRequests(registry ->{
            	registry.requestMatchers("/api/chat").permitAll();
            	registry.anyRequest().authenticated();
                
            })
            .build();
    }
}
