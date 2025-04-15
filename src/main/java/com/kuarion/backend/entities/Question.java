package com.kuarion.backend.entities;

import com.kuarion.backend.roles.QuestionType;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String text;
	private QuestionType type;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public Question(Long id, String text, QuestionType type) {
		super();
		this.id = id;
		this.text = text;
		this.type = type;
	}
	public Question() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
