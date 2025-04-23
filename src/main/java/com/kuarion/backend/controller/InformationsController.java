package com.kuarion.backend.controller;

import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kuarion.backend.config.TokenFilter;
import com.kuarion.backend.dtos.UserDTO;
import com.kuarion.backend.dtos.EnterpriseDTO;
import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.entities.User;

@RestController @RequestMapping(value = "/info")
public class InformationsController {
  private TokenFilter tokenFilter;
  
  public InformationsController(TokenFilter tokenFilter) {
    this.tokenFilter = tokenFilter;
  }
  
  @GetMapping
  public Object getAuthenticatedUser() {
    UserDetails user = this.tokenFilter.getUsername();
    
    if (user instanceof User) {
      User authenticatedUser = (User) user;
      return new UserDTO(authenticatedUser);
    } else if (user instanceof Enterprise) {
      Enterprise authenticatedEnterprise = (Enterprise) user;
      return new EnterpriseDTO(authenticatedEnterprise);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}