package com.kuarion.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kuarion.backend.model.ChatHistoryResponse;
import com.kuarion.backend.model.ChatRequest;
import com.kuarion.backend.model.ChatResponse;
import com.kuarion.backend.service.ChatService;

@RestController
public class GeminiController {
	
	private final ChatService chatService;
	
	
		@Autowired
	    public GeminiController(ChatService chatService) {
			super();
			this.chatService = chatService;
		}
		
		
	  @PostMapping("/api/chat")
	    public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
	        ChatResponse response = chatService.processUserMessage(request);
	        return ResponseEntity.ok(response);
	    }

	    @GetMapping("/history")
	    public ResponseEntity<ChatHistoryResponse> getChatHistory() {
	        ChatHistoryResponse history = chatService.getChatHistory();
	        return ResponseEntity.ok(history);
	    }

	    @DeleteMapping("/history")
	    public ResponseEntity<Void> clearChatHistory() {
	        chatService.clearChatHistory();
	        return ResponseEntity.noContent().build();
	    }    
    
}