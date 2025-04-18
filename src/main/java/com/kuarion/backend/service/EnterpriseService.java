package com.kuarion.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.repositories.EnterpriseRepository;
import com.kuarion.backend.roles.Roles;

@Service
public class EnterpriseService {
  private EnterpriseRepository enterpriseRepository;
  
  // Dependencies Injection
  public EnterpriseService(EnterpriseRepository enterpriseRepository) {
    this.enterpriseRepository = enterpriseRepository;
  }
  
  public void createEnterprise(String name, String username, String email, String cnpj, String password, String ownerName) {
    Enterprise enterprise = new Enterprise();
    enterprise.setName(name);
    enterprise.setUsername(username);
    enterprise.setEmail(email);
    enterprise.setCnpj(cnpj);
    enterprise.setPassword(password);
    enterprise.setOwnerName(ownerName);
    this.enterpriseRepository.save(enterprise);
  }
  
  public boolean emailExists(String email) {
    Optional<Enterprise> enterprise = this.enterpriseRepository.findByEmail(email);
    if (!enterprise.isEmpty()) {
      return true;
    }
    return false;
  }
  
  public boolean nameExists(String name) {
    Optional<Enterprise> enterprise = this.enterpriseRepository.findByEmail(name);
    if (!enterprise.isEmpty()) {
      return true;
    }
    return false;
  }
  
  public boolean usernameExists(String username) {
    Optional<Enterprise> enterprise = this.enterpriseRepository.findByUsername(username);
    if (!enterprise.isEmpty()) {
      return true;
    }
    return false;
  }
  
  public boolean cnpjExists(String cnpj) {
    Optional<Enterprise> enterprise = this.enterpriseRepository.findByCnpj(cnpj);
    if (!enterprise.isEmpty()) {
      return true;
    }
    return false;
  }
}