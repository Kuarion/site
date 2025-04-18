package com.kuarion.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.Question;
import com.kuarion.backend.roles.QuestionType;

public interface QuestionRepository extends JpaRepository<Question, Long>{
	Optional<Question> findByType(QuestionType questionType);
}
