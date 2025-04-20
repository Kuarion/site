package com.kuarion.backend.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kuarion.backend.entities.EnterpriseAnswer;
import com.kuarion.backend.entities.Question;
import com.kuarion.backend.service.SurveyService;

@RestController
public class SurveyController {

	@Autowired
	private SurveyService surveyService;
	
	@GetMapping("/survey/status/{userId}")
	public ResponseEntity<?> checkResponseStatus(@PathVariable Long userId){
		boolean hasResponded = surveyService.hasResponded(userId);
		return ResponseEntity.ok(Collections.singletonMap("hasResponded", hasResponded));
		
	}
	
	@GetMapping("/survey/status/enterprise/{enterpriseId}")
	public ResponseEntity<?> checkEnterpriseResponseStatus(@PathVariable Long enterpriseId){
		boolean hasResponded = surveyService.hasEnterpriseResponded(enterpriseId);
		return ResponseEntity.ok(Collections.singletonMap("hasResponded", hasResponded));
		
	}
	
	@PostMapping("/survey/submit/{userId}")
    public ResponseEntity<?> submitQuestionnaire(
            @PathVariable Long userId,
            @RequestBody Map<Long, String> answers) { // Usava Long (ID da questão) como chave
        try { 
            surveyService.submitSurveyAnswer(userId, answers);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
	
	@PostMapping("/survey/enterprise/submit/{enterpriseId}")
	public ResponseEntity<?> submitCompanySurvey(@PathVariable Long enterpriseId, @RequestBody Map<Long, String> answers){
		try {
			
			surveyService.submitCompanySurveyAnswer(enterpriseId, answers);
			return ResponseEntity.ok().build();
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	
	@GetMapping("/survey/enterprise/statistics")
	public ResponseEntity<?> getEnterpriseStatistics(){
		Map<String, Map<String, Long>> statistics = surveyService.getEnterpriseQuestionStatistics();
		return ResponseEntity.ok(statistics);
	}
	
	@GetMapping("/survey/statistics")
	    public ResponseEntity<?> getStatistics() {
	        Map<String, Map<String, Long>> statistics = surveyService.getQuestionStatistics();
	        return ResponseEntity.ok(statistics);
	    }
	
	    
	    @GetMapping("/survey/questions")
	    public List<Question> getQuestions() {
	    	return surveyService.getAllQuestions();
	    }
	    
	    @GetMapping("/survey/enterprise/answers") 
	    public List<String> getAnswers(){
	    	return surveyService.getAllAnswers();
	    }
	    
	    /*
	    @GetMapping("/statistics/user/{userId}")
	    public ResponseEntity<SurveyAnswers> getUserStatistics(@PathVariable Long userId){
	    	SurveyAnswers surveyAnswers = surveyService.getUserSurvey(userId);
	    	return ResponseEntity.ok(surveyAnswers);
	    }*/
	    
}
