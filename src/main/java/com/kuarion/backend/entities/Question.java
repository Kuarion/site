package com.kuarion.backend.entities;

import com.kuarion.backend.roles.QuestionType;
import com.kuarion.backend.roles.QuestionPublic;

import jakarta.persistence.Entity;
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
	
	private QuestionPublic publico;
	
	
	
	public QuestionPublic getPublico() {
		return publico;
	}

	public void setPublico(QuestionPublic publico) {
		this.publico = publico;
	}

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

	public Question( String text, QuestionType type, QuestionPublic publico) {
		this.text = text;
		this.type = type;
		this.publico = publico;
	}


	public Question() {
	}
	
	
	
	
}
