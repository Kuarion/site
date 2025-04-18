package com.kuarion.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.entities.User;
import com.kuarion.backend.repositories.EnterpriseRepository;
import com.kuarion.backend.repositories.UserRepository;

@Service
public class AuthenticationService implements UserDetailsService {
  private UserRepository userRepository;
  private EnterpriseRepository enterpriseRepository;
  
  // Dependencies Injection
  public AuthenticationService(UserRepository userRepository, EnterpriseRepository enterpriseRepository) {
    this.userRepository = userRepository;
    this.enterpriseRepository = enterpriseRepository;
  }
  
  // required UserDetailsService method. It loads an user for AuthenticationProvider
  @Override
  public UserDetails loadUserByUsername(String user) {
    
    // by default, it loads an user by username
    Optional<User> userDetails = this.userRepository.findByUsername(user);
    
    // if 'user' is not username, it tries to find by email
    if (userDetails.isEmpty()) {
        userDetails = this.userRepository.findByEmail(user);
    }
    
    // if 'user' is not email, it throws an exception
    if (userDetails.isPresent()) {
      // returns the user
      return userDetails.get();
    }
    
    Optional<Enterprise> enterpriseDetails = this.enterpriseRepository.findByUsername(user);
    
    if (enterpriseDetails.isEmpty()) {
      enterpriseDetails = this.enterpriseRepository.findByName(user);
    }
    
    if (enterpriseDetails.isEmpty()) {
      enterpriseDetails = this.enterpriseRepository.findByEmail(user);
    }
    
    if (enterpriseDetails.isEmpty()) {
      enterpriseDetails = this.enterpriseRepository.findByCnpj(user);
    }
    
    if (enterpriseDetails.isPresent()) {
      // returns the enterprise
      return enterpriseDetails.get();
    } else {
      throw new UsernameNotFoundException("User not found");
    }
  }
}
