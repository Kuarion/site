package com.kuarion.backend.dtos;

import com.kuarion.backend.entities.User;

public class UserDTO {
  private Long id;
  private String firstName;
  private String username;
  private String email;
  
  public UserDTO() {}
  
  public UserDTO(User entity) {
    this.id = entity.getId();
    this.firstName = entity.getFirstName();
    this.username = entity.getUsername();
    this.email = entity.getEmail();
  }
}