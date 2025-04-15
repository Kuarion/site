package com.kuarion.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.SurveyAnswers;

public interface SurveyAnswersRepository extends JpaRepository<SurveyAnswers, Long> {
	
}
