package com.kuarion.backend.roles;

import org.springframework.security.core.GrantedAuthority;

public enum Roles implements GrantedAuthority {
  ADMIN("ROLE_ADMIN"),
  USER("ROLE_USER"),
  ENTERPRISE("ROLE_ENTERPRISE");

  private final String role;

  Roles(String role) {
    this.role = role;
  }

  // require method from GrantedAuthority. It returns the string "role"
  @Override
  public String getAuthority() {
    return this.role;
  }
  
  // method to get a role (constant enum) from a string
  public static Roles fromString(String role) {
    for (Roles roleValue : Roles.values()) {
        if (roleValue.role.equalsIgnoreCase(role)) {
            return roleValue;
        }
    }
    throw new IllegalArgumentException("Invalid role: " + role);
  }
}