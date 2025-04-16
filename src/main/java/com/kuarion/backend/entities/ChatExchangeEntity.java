package com.kuarion.backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ChatExchangeEntity {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @Column(nullable = false, length = 2048)
	    private String userMessage;
	    
	    @Column(nullable = false)
	    private String botResponse;
	    
	    @Column(nullable = false)
	    private LocalDateTime timestamp;

		public String getUserMessage() {
			return userMessage;
		}

		public void setUserMessage(String userMessage) {
			this.userMessage = userMessage;
		}

		public String getBotResponse() {
			return botResponse;
		}

		public void setBotResponse(String botResponse) {
			this.botResponse = botResponse;
		}

		public LocalDateTime getTimestamp() {
			return timestamp;
		}

		public void setTimestamp(LocalDateTime timestamp) {
			this.timestamp = timestamp;
		}

		public Long getId() {
			return id;
		}

		public ChatExchangeEntity(String userMessage, String botResponse, LocalDateTime timestamp) {
			this.userMessage = userMessage;
			this.botResponse = botResponse;
			this.timestamp = timestamp;
		}

		public ChatExchangeEntity() {
		}		
}
