package com.kuarion.backend.entities;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kuarion.backend.roles.Roles;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity @Table(name = "users")
public class User implements UserDetails {
  
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // primary key
  
  @Column(nullable = false, unique = false)
  private String firstName;
  
  @Column(nullable = false, unique = false)
  private String lastName;
   
  @Column(nullable = false, unique = true)
  private String username;
  
  @Column(nullable = false, unique = true)
  private String email;
  
  @Column(nullable = false, unique = false)
  private String password;
  
  @Enumerated(EnumType.STRING)
  private Roles role; // user role
  
  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
  @JoinColumn(name = "response_id", nullable = true)
@JsonIgnore
  private SurveyAnswers surveyAnswers;
  

  
  public SurveyAnswers getSurveyAnswers() {
	return surveyAnswers;
}

public void setSurveyAnswers(SurveyAnswers surveyAnswers) {
	this.surveyAnswers = surveyAnswers;
}

public Long getId() {
	return id;
}

// required methods from UserDetails interface
  public User() {}
  
  public User(String firstName, String lastName, String username, String email, String password, Roles role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
  
  // required methods from UserDetails interface
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    
    // if user is ADMIN, he has all roles
    if (this.role == role.ADMIN) {
      return List.of(
        new SimpleGrantedAuthority("ROLE_ADMIN"),
        new SimpleGrantedAuthority("ROLE_USER"),
        new SimpleGrantedAuthority("ROLE_ENTERPRISE")
      );
    } else {
      return List.of(new SimpleGrantedAuthority("ROLE_USER"));
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
  
  public String getFirstName() {
    return this.firstName;
  }
  
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }
  
  public String getLastName() {
    return this.lastName;
  }
  
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  
  public String getEmail() {
    return this.email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public Roles getRole() {
    return this.role;
  }
  
  public void setRole(Roles role) {
    this.role = role;
  }
  
  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    User other = (User) obj;
    return Objects.equals(id, other.id);
  }
        
  @Override
  public int hashCode() {
    return Objects.hash(id);
  } 
}