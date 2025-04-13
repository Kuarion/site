package com.kuarion.backend.config;

import java.io.IOException;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import com.kuarion.backend.service.AuthenticationService;
import com.kuarion.backend.service.TokenService;

@Component
public class TokenFilter extends OncePerRequestFilter {
  private AuthenticationService authenticationService;
  private TokenService tokenService;
  
  // Dependencies Injection
  public TokenFilter(AuthenticationService authenticationService, TokenService tokenService) {
    this.authenticationService = authenticationService;
    this.tokenService = tokenService;
  }
  
  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
    // get current URI
    String uri = req.getRequestURI();
    // it calls "recoverToken" method to get token
    var token = this.recoverToken(req);
    // condition to verify if token were found
    if (token != null) {
      // recover user from tokenService "validateToken" method
      var tokenSubject = this.tokenService.validateToken(token);
      // loads an user using authenticationService "loadUserByUsername" method
      var user = this.authenticationService.loadUserByUsername(tokenSubject);
      // create a token to keep the current user authenticated, password (in this case, password is null because user has already been authenticated by AuthenticationController) and its roles
      var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
      // create a new object of SecurityContext from SecurityContextHolder class
      SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
      // put the "authentication" token into SecurityContext
      securityContext.setAuthentication(authentication);
      // now, the modified securityContext is placed in SecurityContextHolder. It keeps the user authenticated while the session is active
      SecurityContextHolder.setContext(securityContext);
      // if the URI starts with "/dashboard" (o.g. /dashboard/account) or it's a file, the requisition continues
      if (uri.startsWith("/dashboard") || uri.matches(".*\\.(css|js|png|jpg|svg|ico)$")) {
        filterChain.doFilter(req, res);
        return;
      }
      // for all other cases, the user will be redirected to "/dashboard"
      res.sendRedirect("/dashboard");
      return;
    }
    // if token is null, the requisition continues
    filterChain.doFilter(req, res);
    return;
  }
  
  private String recoverToken(HttpServletRequest req) {
    // condition that verify if has active cookies in HTTP session
    if (req.getCookies() != null) {
      // loop that iterate for each cookie
      for (Cookie cookie : req.getCookies()) {
        // condition that tries to found a cookie with name "jwtCookie"
        if ("jwtCookie".equals(cookie.getName())) {
          // if it were found, return it
          return cookie.getValue();
        }
        // if there's no cookie with name "jwtCookie", return null
        return null;
      }
    }
    // if there's no cookie, return null
    return null;
  }
}
