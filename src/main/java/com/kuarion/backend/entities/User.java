package com.kuarion.backend.entities;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.kuarion.backend.roles.Roles;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
  private String username;
  
  @Setter @Column(nullable = true, unique = true)
  private String email;
  
  @Setter @Column(nullable = false, unique = false)
  private String password;
  
  @Setter @Enumerated(EnumType.STRING)
  private Roles role; // user role
  
  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
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
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    
    // if user is ADMIN, he has all roles
    if (this.role == role.ADMIN) {
      return List.of(
        new SimpleGrantedAuthority("ROLE_ADMIN"),
        new SimpleGrantedAuthority("ROLE_USER"),
        new SimpleGrantedAuthority("ROLE_ENTERPRISE")
      );
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

public String getFirstName() {
	return firstName;
}

public void setFirstName(String firstName) {
	this.firstName = firstName;
}

public String getLastName() {
	return lastName;
}

public void setLastName(String lastName) {
	this.lastName = lastName;
}

public String getUsername() {
	return username;
}

public void setUsername(String username) {
	this.username = username;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public Roles getRole() {
	return role;
}

public void setRole(Roles role) {
	this.role = role;
}

  

}