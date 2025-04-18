package com.kuarion.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.Enterprise;

// EnterpriseRepository interface extends JpaRepository interface
public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
  
  // finds an enterprise by its name
  Optional<Enterprise> findByName(String name);
  
  // finds an enterprise by its username
  Optional<Enterprise> findByUsername(String username);
  
  // finds an enterprise by its email
  Optional<Enterprise> findByEmail(String email);
  
  // finds an enterprise by its cnpj
  Optional<Enterprise> findByCnpj(String cnpj);
}