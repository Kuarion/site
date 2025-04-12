package com.kuarion.backend.entities;

import java.util.Collection;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.kuarion.backend.roles.Roles;

@Entity @Table(name = "users")
@Getter @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode
public class User implements UserDetails {
  
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // primary key
  
  @Setter @Column(nullable = false, unique = false)
  private String firstName;
  
  @Setter @Column(nullable = true, unique = false)
  private String lastName;
   
  @Setter @Column(nullable = true, unique = true)
  private String email;
  
  @Setter @Column(nullable = false, unique = false)
  private String password;
  
  @Setter @Enumerated(EnumType.STRING)
  private Roles roles; // user role
  
  // require methods from UserDetails interface
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    
    // if user is ADMIN, he has all roles
    if (this.role == role.ADMIN) {
      return List.of(
        new SimpleGrantedAuthority("ROLE_ADMIN"),
        new SimpleGrantedAuthority("ROLE_USER"),
        new SimpleGrantedAuthority("ROLE_ENTERPRISE")
      )
    } else if (this.role == role.USER) {
      return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    } else {
      return List.of(new SimpleGrantedAuthority("ROLE_ENTERPRISE"));
    }
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
}