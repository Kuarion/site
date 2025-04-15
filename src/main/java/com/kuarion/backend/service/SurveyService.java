package com.kuarion.backend.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.kuarion.backend.entities.Answer;
import com.kuarion.backend.entities.Question;
import com.kuarion.backend.entities.SurveyAnswers;
import com.kuarion.backend.entities.User;
import com.kuarion.backend.repositories.AnswerRepository;
import com.kuarion.backend.repositories.QuestionRepository;
import com.kuarion.backend.repositories.SurveyAnswersRepository;
import com.kuarion.backend.repositories.UserRepository;

public class SurveyService {
	
	@Autowired
	private SurveyAnswersRepository surveyRepository;
	
	 @Autowired
	 private UserRepository userRepository;
	 
	 @Autowired
	 private QuestionRepository questionRepository;
	
	 @Autowired
	 private AnswerRepository answerRepository;
	 
	 public Boolean hasResponded(Long userId) {
		 	User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario não encontrado!"));
		 return surveyRepository.existsByUser(user);
	 }
	 
	 public SurveyAnswers submitSurveyAnswer(Long userId, Map<Long, String> answers) {
		 if(hasResponded(userId)) {
			 throw new IllegalStateException("User has already responded to the questionnaire");
		 }
		 
		 User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario não encontrado !"));
	
		 SurveyAnswers surveyAnswers = new SurveyAnswers();
		 surveyAnswers.setUser(user);
		 surveyAnswers.setResponseData(LocalDateTime.now());
		 surveyAnswers = surveyRepository.save(surveyAnswers);
		 
		 for(Map.Entry<Long, String> entry : answers.entrySet()) {
			 Question question = questionRepository.findById(entry.getKey())
					 .orElseThrow(() -> new RuntimeException("Questão não encontrada!"));
			 
			 Answer answer = new Answer();
			 answer.setResponse(surveyAnswers);
	            answer.setQuestion(question);
	            answer.setAnswer(entry.getValue());
	            surveyAnswers.getAnswers().add(answer);
		 }
		 
		  return surveyRepository.save(surveyAnswers);
	 }
	 
	 public Map<Question, Map<String, Long>> getQuestionStatistics(){
		 List<Question> questions = questionRepository.findAll();
		 Map<Question, Map<String, Long>> statistics = new HashMap<>();
		 
		 for(Question question : questions) {
			 List<Answer> answers = answerRepository.findByQuestion(question);
			 Map<String, Long> countMap = answers.stream()
					 .collect(Collectors.groupingBy(Answer::getAnswer, Collectors.counting()));
		 
			 statistics.put(question, countMap);
		 }
	 
	 return statistics;
	 }
	 
	 
}
