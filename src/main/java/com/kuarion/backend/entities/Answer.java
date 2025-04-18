package com.kuarion.backend.entities;

import com.kuarion.backend.roles.AnswerType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Answer {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@ManyToOne
	@JoinColumn(name = "reponse_id")
	private SurveyAnswers response;

	@ManyToOne
	private Question question;
	
	private String answer;

	private AnswerType answerType;
	
	
	public AnswerType getAnswerType() {
		return answerType;
	}

	public void setAnswerType(AnswerType answerType) {
		this.answerType = answerType;
	}

	public Long getId() {
		return id;
	}

	public SurveyAnswers getResponse() {
		return response;
	}

	public void setResponse(SurveyAnswers response) {
		this.response = response;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Answer(SurveyAnswers response, Question question, String answer, AnswerType answerType) {
		this.answerType = answerType;
		this.response = response;
		this.question = question;
		this.answer = answer;
	}

	public Answer() {
	}
	
	
}
