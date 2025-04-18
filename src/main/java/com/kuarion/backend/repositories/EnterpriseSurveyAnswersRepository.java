package com.kuarion.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.entities.EnterpriseSurveyAnswers;

public interface EnterpriseSurveyAnswersRepository extends JpaRepository<EnterpriseSurveyAnswers, Long>{
	 boolean existsByEnterprise(Enterprise enterprise);
	    Optional<EnterpriseSurveyAnswers> findByEnterprise(Enterprise enterprise);
}
