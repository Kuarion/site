package com.kuarion.backend.entities;

import java.util.Objects;

import com.kuarion.backend.roles.AnswerType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class EnterpriseAnswer {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@ManyToOne
	@JoinColumn(name = "reponse_id")
	private EnterpriseSurveyAnswers response;

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

	public EnterpriseSurveyAnswers getResponse() {
		return response;
	}

	public void setResponse(EnterpriseSurveyAnswers response) {
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

	public EnterpriseAnswer(EnterpriseSurveyAnswers response, Question question, String answer, AnswerType answerType) {
		this.answerType = answerType;
		this.response = response;
		this.question = question;
		this.answer = answer;
	}

	public EnterpriseAnswer() {
	}

	@Override
	public int hashCode() {
		return Objects.hash(answer, answerType, id, question, response);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EnterpriseAnswer other = (EnterpriseAnswer) obj;
		return Objects.equals(answer, other.answer) && answerType == other.answerType 
				&& Objects.equals(question, other.question) && Objects.equals(response, other.response);
	}
	
	
}
