package com.kuarion.backend.entities;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.validation.constraints.Pattern;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Entity @Table(name = "enterprises")
public class Enterprise implements UserDetails {
  
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // primary key
  
  @Column(nullable = false, unique = true)
  private String name;
  
  @Column(nullable = false, unique = true)
  private String username;
  
  @Column(nullable = false, unique = true)
  private String email;
  
  @Column(length = 18, nullable = false, unique = true)
  @Pattern(regexp = "^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$", message = "Invalid CNPJ! Expected format: XX.XXX.XXX/XXXX.XX") // regex: verifies if CNPJ is correct
  private String cnpj;
  
  @Column(nullable = false, unique = false)
  private String password;
  
  @Column(nullable = false, unique = false)
  private String ownerName;
  
  public Enterprise() {}
  
  public Enterprise(String name, String username, String email, String cnpj, String password, String ownerName) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.cnpj = cnpj;
    this.password = password;
    this.ownerName = ownerName;
  }
  
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_ENTERPRISE"));
  }
  
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
  
  @Override
  public String getUsername() {
    return this.username;
  }
  
  public void setUsername(String username) {
    this.username = username;
  }
  
  @Override
  public String getPassword() {
    return this.password;
  }
  
  public void setPassword(String password) {
    this.password = password;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getEmail() {
    return this.email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public String getCnpj() {
    return this.cnpj;
  }
  
  public void setCnpj(String cnpj) {
    this.cnpj = cnpj;
  }
  
  public String getOwnerName() {
    return this.ownerName;
  }
  
  public void setOwnerName(String ownerName) {
    this.ownerName = ownerName;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    Enterprise other = (Enterprise) obj;
    return Objects.equals(id, other.id);
  }
        
  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}