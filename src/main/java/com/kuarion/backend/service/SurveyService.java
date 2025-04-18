package com.kuarion.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kuarion.backend.entities.Answer;
import com.kuarion.backend.entities.Question;
import com.kuarion.backend.entities.SurveyAnswers;
import com.kuarion.backend.entities.User;
import com.kuarion.backend.repositories.AnswerRepository;
import com.kuarion.backend.repositories.QuestionRepository;
import com.kuarion.backend.repositories.SurveyAnswersRepository;
import com.kuarion.backend.repositories.UserRepository;

@Service
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
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
        return surveyRepository.existsByUser(user);
    }
    
    public SurveyAnswers submitSurveyAnswer(Long userId, Map<Long, String> answers) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (hasResponded(userId)) {
            throw new IllegalStateException("Usuário já respondeu ao questionário");
        }
        
        SurveyAnswers surveyAnswers = new SurveyAnswers();
        surveyAnswers.setUser(user);
        
        for (Map.Entry<Long, String> entry : answers.entrySet()) {
            Question question = questionRepository.findById(entry.getKey())
                .orElseThrow(() -> new RuntimeException("Questão não encontrada com ID: " + entry.getKey()));
            
            Answer answer = new Answer();
            answer.setQuestion(question);
            answer.setAnswer(entry.getValue());
            answer.setResponse(surveyAnswers);
            
            surveyAnswers.getAnswers().add(answer);
        }
        
        return surveyRepository.save(surveyAnswers);
    }
    
    public Map<Question, Map<String, Long>> getQuestionStatistics() {
        List<Question> questions = questionRepository.findAll();
        Map<Question, Map<String, Long>> statistics = new HashMap<>();
        
        for (Question question : questions) {
            List<Answer> answers = answerRepository.findByQuestion(question);
            Map<String, Long> countMap = answers.stream()
                .collect(Collectors.groupingBy(Answer::getAnswer, Collectors.counting()));
            
            statistics.put(question, countMap);
        }
        
        return statistics;
    }
    
    
    public Map<String, Long> getSingleQuestionStatistics(Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Questão não encontrada, tente com outro ID, por favor !"));
        
        List<Answer> answers = answerRepository.findByQuestion(question);
        
        Map<String, Long> statistics = answers.stream()
                .collect(Collectors.groupingBy(
                    Answer::getAnswer, 
                    Collectors.counting()
                ));
        
        return statistics;
    }
    
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
   
    /*
    public SurveyAnswers getUserSurvey(Long id) {
    	User user = userRepository.findById(id)
    			.orElseThrow(() -> new RuntimeException("Usuário não encontrado !"));
   
    
    	SurveyAnswers sa = user.getSurveyAnswers();

    	
    }*/
    
    
    
}