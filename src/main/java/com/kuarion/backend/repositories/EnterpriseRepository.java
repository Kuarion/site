package com.kuarion.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.entities.EnterpriseAnswer;

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
  
  
  //customized query to find enterprises based on it's answers on survey
  @Query("SELECT DISTINCT e FROM Enterprise e " +
	       "JOIN e.enterpriseSurveyAnswers sa " +
	       "JOIN sa.answers a " +
	       "WHERE LOWER(a.answer) IN :tags")
	Page<Enterprise> findByAnyTag(@Param("tags") List<String> tags, Pageable pageable);
  

}