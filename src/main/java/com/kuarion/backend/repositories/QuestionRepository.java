package com.kuarion.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.Question;

public interface QuestionRepository extends JpaRepository<Question, Long>{
	
}
