package com.kuarion.backend.roles;

public enum QuestionType {
	MULTIPLE_CHOICE("QUESTION_MULTIPLE_CHOICE"),
	TEXT("QUESTION_TEXT");
	
	private final String type;

	  QuestionType(String type) {
	    this.type = type;
	  }

	  // require method from GrantedAuthority. It returns the string "type"
	  
	  public String getType() {
	    return this.type;
	  }
	  
	  // method to get a role (constant enum) from a string
	  public static QuestionType fromString(String type) {
	    for (QuestionType questionType : QuestionType.values()) {
	        if (questionType.type.equalsIgnoreCase(type)) {
	            return questionType;
	        }
	    }
	    throw new IllegalArgumentException("Invalid question type: " + type);
	  }
}
