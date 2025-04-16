package com.kuarion.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kuarion.backend.model.ChatExchange;
import com.kuarion.backend.model.ChatHistoryResponse;
import com.kuarion.backend.model.ChatRequest;
import com.kuarion.backend.model.ChatResponse;
import com.kuarion.backend.service.ChatService;

@RestController
public class GeminiController {
    
    private final ChatService chatService;
    private StringBuilder sb = new StringBuilder();
   
    @Autowired
    public GeminiController(ChatService chatService) {
        this.chatService = chatService;
    }
    
    @PostMapping("/api/chat/message")
    public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
        String systemPrompt = "";
    	ChatHistoryResponse chatResponse = chatService.getChatHistory();
    	if(chatResponse != null && chatResponse.exchanges().size() <= 10) {
    		for(ChatExchange ce : chatResponse.exchanges()) {
    		systemPrompt =
    			sb.append("Essa NÃO é a primeira vez que o usuário te envia uma mensagem. "
    					+ "Você deve levar as mensagens anteriores em consideração as mensagens anteriores que ele já tenha mandado"
    					+ " a mensagem anterior do usuário foi" + ce.userMessage())
    			.append("e a sua resposta foi" + ce.botResponse())
    			.toString();
    		}
        }else {
        	systemPrompt =
        			sb.append("essa é a primeira mensagem que o usuário te envia uma mensagem !").toString();
        }
    	ChatResponse response = chatService.processUserMessage(request, systemPrompt);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/chat/history")
    public ResponseEntity<ChatHistoryResponse> getChatHistory() {
        ChatHistoryResponse history = chatService.getChatHistory();
        return ResponseEntity.ok(history);
    } 

    @DeleteMapping("/api/chat/history")
    public ResponseEntity<Void> clearChatHistory() {
        chatService.clearChatHistory();
        
        
        return ResponseEntity.noContent().build();
    }    
    
    
}