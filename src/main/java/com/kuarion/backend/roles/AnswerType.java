package com.kuarion.backend.roles;

public enum AnswerType {
	DEFAULT_ANSWER("ANSWER_DEFAULT_ANSWER"),
	USER_ANSWER("ANSWER_USER_ANSWER");
	
	
	private final String type;
	
	AnswerType(String type){
		this.type = type;
	}
	
	public String getType() {
		return this.type;
	}
	
	
	public static AnswerType fromString(String type) {
		for(AnswerType answerType : AnswerType.values()) {
			if(answerType.type.equals(type)) {
				return answerType;
			}
		}
		
		throw new IllegalArgumentException("Invalid answer type: " + type);
	}
}
