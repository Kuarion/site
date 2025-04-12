package com.kuarion.backend.model;

import java.util.List;

public record GeminiResponse(
	    List<Candidate> candidates
	) {
	    public record Candidate(
	        Content content,
	        String finishReason,
	        int index,
	        List<SafetyRating> safetyRatings
	    ) {
	        public record Content(
	            List<Part> parts,
	            String role
	        ) {
	            public record Part(String text) {}
	        }
	        
	        public record SafetyRating(
	            String category,
	            String probability
	        ) {}
	    }
	}