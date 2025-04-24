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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private TokenFilter tokenFilter;
    
    public SecurityConfig(TokenFilter tokenFilter) {
        this.tokenFilter = tokenFilter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));  // Temporarily allow all origins
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(false);  // Must be false when allowedOrigins has "*"
        configuration.setMaxAge(3600L);
         
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            // Static resources from build output
            .requestMatchers(
                "/",
                "/index.html",
                "/assets/**",  // This covers the bundled JS and CSS
                "/Kuarion.svg",
                "/*.js",
                "/*.css",
                "/*.html",
                "/*.ico",
                "/*.json",
                "/*.png"
            ).permitAll()
                // Frontend routes
                .requestMatchers(
                    "/social",
                    "/survey",
                    "/forum",
                    "/statistics",
                    "/login",
                    "/auth",
                    "landing_page",
                    "/",
                    "landing_page2"
                ).permitAll()
                // API endpoints
                .requestMatchers(HttpMethod.POST, "/api/dev/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/chat/**", "/survey/**", "/forum/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/authentication/**", "/api/chat/message", "/survey/**", "/forum/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/chat/history/delete", "/forum/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/dashboard").authenticated()
                .requestMatchers(HttpMethod.GET, "/statistics").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/chat").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/chat").permitAll()
                .requestMatchers(HttpMethod.GET, "/dashboard/**", "/info").authenticated()
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