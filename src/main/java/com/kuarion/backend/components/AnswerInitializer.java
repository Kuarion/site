package com.kuarion.backend.components;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.kuarion.backend.entities.Answer;
import com.kuarion.backend.entities.Question;
import com.kuarion.backend.repositories.AnswerRepository;
import com.kuarion.backend.repositories.QuestionRepository;
import com.kuarion.backend.roles.QuestionType;

@Component
public class AnswerInitializer implements CommandLineRunner{

	@Autowired
	private AnswerRepository answerRepository;
	
	@Autowired
	private QuestionRepository questionRepository;
	
	
	
	@Override
	public void run(String... args) {
        List<Question> questions = questionRepository.findAll();
        
        
        for(Question question : questions) {
        	if(question.getType() == QuestionType.MULTIPLE_CHOICE && hasDefaultAnswers(questions) != true) {
        		List<Answer> answers = Arrays.asList(
        				createDefaultAnswer(question, "OPÇÃO 1"),
        				createDefaultAnswer(question, "OPÇÃO 2"),
        				createDefaultAnswer(question, "OPÇÃO 3"),
        				createDefaultAnswer(question, "OPÇÃO 4")
        				);
        		answerRepository.saveAll(answers);
        	}
        }
       
	}
	
	private boolean hasDefaultAnswers(List<Question> questions) {
        return answerRepository.existsByQuestionInAndResponseIsNull(questions);
    }
	 private Answer createDefaultAnswer(Question question, String text) {
	        Answer answer = new Answer();
	        answer.setQuestion(question);
	        answer.setAnswer(text);
	        answer.setResponse(null);
	        return answer;
	    }
}
