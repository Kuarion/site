package com.kuarion.backend.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kuarion.backend.repositories.UserRepository;

@Service
public class AuthenticationService implements UserDetailsService {
  private UserRepository userRepository;
  
  // Dependency Injection (UserRepository)
  public AuthenticationService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
  
  // required UserDetailsService method. It loads an user for AuthenticationProvider
  @Override
  public UserDetails loadUserByUsername(String user) {
    // the method uses username or email
    
    // by default, it loads an user by username
    Optional<User> userDetails = this.userRepository.findByUsername(user);
    
    // if 'user' is not username, it tries to find by email
    if (userDetails.isEmpty()) {
        userDetails = this.userRepository.findByEmail(user);
    }
    
    // if 'user' is not email, it throws an exception
    if (userDetails.isEmpty()) {
        throw new UsernameNotFoundException("User not found!");
    }
    
    // return the user
    return userDetails.get();
  }
}
