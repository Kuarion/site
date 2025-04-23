package com.kuarion.backend.dtos;

import com.kuarion.backend.entities.Enterprise;

public class EnterpriseDTO {
  private Long id;
  private String name;
  private String username;
  private String email;
  
  public EnterpriseDTO() {}
  
  public EnterpriseDTO(Enterprise entity) {
    this.id = entity.getId();
    this.name = entity.getName();
    this.username = entity.getUsername();
    this.email = entity.getEmail();
  }
}