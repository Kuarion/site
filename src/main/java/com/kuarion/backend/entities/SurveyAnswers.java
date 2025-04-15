package com.kuarion.backend.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class SurveyAnswers {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	  @OneToOne
	  @JoinColumn(name = "user_id")
	  private User user;
	  
	  @OneToMany(mappedBy = "response", cascade = CascadeType.ALL)
	  private List<Answer> answers = new ArrayList<>();
	  
	  private LocalDateTime responseData;

	public SurveyAnswers() {
		super();
	}
	
	public SurveyAnswers(Long id, User user, List<Answer> answers, LocalDateTime responseData) {
		super();
		this.id = id;
		this.user = user;
		this.answers = answers;
		this.responseData = responseData;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public List<Answer> getAnswers() {
		return answers;
	}
	
	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}
	
	public LocalDateTime getResponseData() {
		return responseData;
	}
	
	public void setResponseData(LocalDateTime responseData) {
		this.responseData = responseData;
	}
	  
	  
	
}