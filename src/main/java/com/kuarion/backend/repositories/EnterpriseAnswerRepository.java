package com.kuarion.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kuarion.backend.entities.EnterpriseAnswer;
import com.kuarion.backend.entities.Question;

public interface EnterpriseAnswerRepository extends JpaRepository<EnterpriseAnswer, Long> {
    List<EnterpriseAnswer> findByQuestion(Question question);

    @Query("SELECT DISTINCT ea.answer FROM EnterpriseAnswer ea")
    List<String> findUniqueAnswers();
}
