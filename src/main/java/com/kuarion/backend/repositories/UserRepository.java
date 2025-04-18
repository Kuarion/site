package com.kuarion.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.User;

// UserRepository interface extends JpaRepository interface
public interface UserRepository extends JpaRepository<User, Long> {
  
  // finds an user by username
  Optional<User> findByUsername(String username);
  
  // finds an user by email
  Optional<User> findByEmail(String email);
}