package com.kuarion.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.SurveyAnswers;
import com.kuarion.backend.entities.User;

public interface SurveyAnswersRepository extends JpaRepository<SurveyAnswers, Long> {
	   boolean existsByUser(User user);
	    Optional<SurveyAnswers> findByUser(User user);	 
}
