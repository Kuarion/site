package com.kuarion.backend.roles;

public enum QuestionPublic {
	COMPANY("QUESTION_COMPANY"),
	USER("QUESTION_USER");
	
	private final String type;
	
	QuestionPublic(String type){
		this.type = type;
	}
	
	public String getType() {
		return this.type;
		
	}
	
	
	public static QuestionPublic fromString(String type) {
		for(QuestionPublic questionPublic : QuestionPublic.values()) {
			if(questionPublic.type.equalsIgnoreCase(type)) {
				return questionPublic;
			}
		}
		throw new IllegalArgumentException("invalid question public type");
	}
}
