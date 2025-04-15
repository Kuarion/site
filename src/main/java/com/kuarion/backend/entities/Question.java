package com.kuarion.backend.entities;

import com.kuarion.backend.roles.QuestionType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private String text;

	
	private QuestionType type;
	
	
	public Long getId() {
		return id;
	}
	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public QuestionType getType() {
		return type;
	}
	public void setType(QuestionType type) {
		this.type = type;
	}

	public Question( String text, QuestionType type) {
		this.text = text;
		this.type = type;
	}


	public Question() {
	}
	
	
	
	
}
