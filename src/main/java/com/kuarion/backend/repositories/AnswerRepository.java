package com.kuarion.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.Answer;
import com.kuarion.backend.entities.Question;

public interface AnswerRepository extends JpaRepository<Answer, Long>{
    List<Answer> findByQuestion(Question question);
    boolean existsByQuestionAndAnswerAndResponseIsNull(Question question, String answer);
 boolean existsByQuestionInAndResponseIsNull(List<Question> questions);
}
