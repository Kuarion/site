/*package com.kuarion.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kuarion.backend.entities.User;
import com.kuarion.backend.repositories.UserRepository;
import com.kuarion.backend.roles.Roles;

@Service
public class UserService {
  private UserRepository userRepository;
  
  // Dependencies Injection
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
  
  // method to create a new user
  public void createUser(String firstName, String lastName, String username, String email, String password, Roles role) {
    User user = new User();
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRole(role);
    userRepository.save(user);
  }
  
  public boolean emailExists(String email) {
    Optional<User> user = this.userRepository.findByEmail(email);
    if (!user.isEmpty()) {
      return true;
    }
    return false;
  }
  
  public boolean usernameExists(String username) {
    Optional<User> user = this.userRepository.findByUsername(username);
    if (!user.isEmpty()) {
      return true;
    }
    return false;
  }
}
*/