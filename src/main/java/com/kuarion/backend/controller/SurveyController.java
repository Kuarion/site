package com.kuarion.backend.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kuarion.backend.entities.Question;
import com.kuarion.backend.entities.SurveyAnswers;
import com.kuarion.backend.service.SurveyService;

@RestController
public class SurveyController {

	@Autowired
	private SurveyService surveyService;
	
	
	@GetMapping("/status/{userId}")
	public ResponseEntity<?> checkResponseStatus(@PathVariable Long userId){
		boolean hasResponded = surveyService.hasResponded(userId);
		return ResponseEntity.ok(Collections.singletonMap("hasResponded", hasResponded));
		
	}
	
	  @PostMapping("/submit/{userId}")
	    public ResponseEntity<?> submitQuestionnaire(
	            @PathVariable Long userId,
	            @RequestBody Map<Long, String> answers) {
	        
	        try {
	            SurveyAnswers response = surveyService.submitSurveyAnswer(userId, answers);
	            return ResponseEntity.ok(response);
	        } catch (IllegalStateException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }
	    
	    @GetMapping("/statistics")
	    public ResponseEntity<?> getStatistics() {
	        Map<Question, Map<String, Long>> statistics = surveyService.getQuestionStatistics();
	        return ResponseEntity.ok(statistics);
	    }

}
