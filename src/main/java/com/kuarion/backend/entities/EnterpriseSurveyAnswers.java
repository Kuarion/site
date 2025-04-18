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
public class EnterpriseSurveyAnswers {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	  @OneToOne
	  @JoinColumn(name = "enterprise_id")
	  private Enterprise enterprise;
	  
	  @OneToMany(mappedBy = "response", cascade = CascadeType.ALL)
	  private List<EnterpriseAnswer> answers = new ArrayList<>();
	  
	  private LocalDateTime responseData;

	public EnterpriseSurveyAnswers() {
		super();
	}
	
	public EnterpriseSurveyAnswers(Long id, Enterprise enterprise, List<EnterpriseAnswer> answers, LocalDateTime responseData) {
		super();
		this.id = id;
		this.enterprise = enterprise;
		this.answers = answers;
		this.responseData = responseData;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public Enterprise getEnterprise() {
		return enterprise;
	}

	public void setEnterprise(Enterprise enterprise) {
		this.enterprise = enterprise;
	}

	public List<EnterpriseAnswer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<EnterpriseAnswer> answers) {
		this.answers = answers;
	}

	public LocalDateTime getResponseData() {
		return responseData;
	}
	
	public void setResponseData(LocalDateTime responseData) {
		this.responseData = responseData;
	}
	  
	  
	
}