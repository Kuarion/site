package com.kuarion.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kuarion.backend.entities.Answer;
import com.kuarion.backend.entities.Question;
import com.kuarion.backend.roles.AnswerType;

public interface AnswerRepository extends JpaRepository<Answer, Long>{
    List<Answer> findByQuestion(Question question);
    boolean existsByQuestionAndAnswerAndResponseIsNull(Question question, String answer);
    boolean existsByQuestionInAndResponseIsNull(List<Question> questions);
	List<Answer> findByAnswerType(AnswerType answerType);
	
	
}
