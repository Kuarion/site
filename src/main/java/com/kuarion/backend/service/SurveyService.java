package com.kuarion.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kuarion.backend.entities.Answer;
import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.entities.EnterpriseAnswer;
import com.kuarion.backend.entities.EnterpriseSurveyAnswers;
import com.kuarion.backend.entities.Question;
import com.kuarion.backend.entities.SurveyAnswers;
import com.kuarion.backend.entities.User;
import com.kuarion.backend.repositories.AnswerRepository;
import com.kuarion.backend.repositories.EnterpriseAnswerRepository;
import com.kuarion.backend.repositories.EnterpriseRepository;
import com.kuarion.backend.repositories.EnterpriseSurveyAnswersRepository;
import com.kuarion.backend.repositories.QuestionRepository;
import com.kuarion.backend.repositories.SurveyAnswersRepository;
import com.kuarion.backend.repositories.UserRepository;
import com.kuarion.backend.roles.AnswerType;

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
    
    @Autowired
    private EnterpriseRepository enterpriseRepository;
    
    @Autowired
    private EnterpriseAnswerRepository enterpriseAnswerRepository;
    
    @Autowired
    private EnterpriseSurveyAnswersRepository enterpriseSurveyAnswersRepository;
    
    public Boolean hasResponded(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
        return surveyRepository.existsByUser(user);
    }
    
    public Boolean hasEnterpriseResponded(Long enterpriseId) {
        Enterprise enterprise = enterpriseRepository.findById(enterpriseId)
            .orElseThrow(() -> new RuntimeException("Empresa não encontrada!"));
        return enterpriseSurveyAnswersRepository.existsByEnterprise(enterprise);
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
            answer.setAnswerType(AnswerType.USER_ANSWER);
            
            surveyAnswers.getAnswers().add(answer);
        }
        
        return surveyRepository.save(surveyAnswers);
    }
    
    public EnterpriseSurveyAnswers submitCompanySurveyAnswer(Long enterpriseId, Map<Long, String> answers) {
    	Enterprise enterprise = enterpriseRepository.findById(enterpriseId).orElseThrow(() -> new RuntimeException("Empresa não encontrada !!"));
    
    	if(hasEnterpriseResponded(enterpriseId)) {
    		throw new IllegalStateException("Empresa já respondeu o formulário !");
    	}
    	
    	EnterpriseSurveyAnswers enterpriseSurveyAnswers = new EnterpriseSurveyAnswers();
    	enterpriseSurveyAnswers.setEnterprise(enterprise);
    	
    	for (Map.Entry<Long, String> entry : answers.entrySet()) {
            Question question = questionRepository.findById(entry.getKey())
                .orElseThrow(() -> new RuntimeException("Questão não encontrada com ID: " + entry.getKey()));
            
            EnterpriseAnswer answer = new EnterpriseAnswer();
            answer.setQuestion(question);
            answer.setAnswer(entry.getValue());
            answer.setResponse(enterpriseSurveyAnswers);
            answer.setAnswerType(AnswerType.USER_ANSWER);
            
            enterpriseSurveyAnswers.getAnswers().add(answer);
        }

    	return enterpriseSurveyAnswersRepository.save(enterpriseSurveyAnswers);
    }

    
    public Map<String, Map<String, Long>> getQuestionStatistics() {
        List<Question> questions = questionRepository.findAll();
        Map<String, Map<String, Long>> statistics = new HashMap<>();
        
        for (Question question : questions) {
            List<Answer> answers = answerRepository.findByQuestion(question);
            Map<String, Long> countMap = answers.stream()
                .collect(Collectors.groupingBy(Answer::getAnswer, Collectors.counting()));
            
            statistics.put(question.getText(), countMap);
        }
        
        return statistics;
    }
    
    
    public Map<String, Map<String, Long>> getEnterpriseQuestionStatistics(){
        List<Question> questions = questionRepository.findAll();
        Map<String, Map<String, Long>> statistics = new HashMap<>();
        
        for (Question question : questions) {
            List<EnterpriseAnswer> answers = enterpriseAnswerRepository.findByQuestion(question);
            Map<String, Long> countMap = answers.stream()
                .collect(Collectors.groupingBy(EnterpriseAnswer::getAnswer, Collectors.counting()));
            
            statistics.put(question.getText(), countMap);
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
    
    
    
    
    public List<Answer> getAllAnswers(){
    	return answerRepository.findAll();
    }
    
    /*
    public SurveyAnswers getUserSurvey(Long id) {
    	User user = userRepository.findById(id)
    			.orElseThrow(() -> new RuntimeException("Usuário não encontrado !"));
   
    
    	SurveyAnswers sa = user.getSurveyAnswers();

    	
    }*/	
    
    
    
    
}