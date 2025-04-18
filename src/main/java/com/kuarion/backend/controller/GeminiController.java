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
        this.chatService = chatService;
    }

    // Endpoint técnico original (continua existindo)
	@PostMapping("/api/chat/message")
	public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
		// Log para verificar se o corpo da requisição chegou corretamente
		System.out.println("Recebido no backend: " + request);
	
		// Processa a mensagem e retorna a resposta
		ChatResponse response = chatService.processUserMessage(request);
		
		// Log para verificar a resposta que está sendo gerada
		System.out.println("Resposta gerada: " + response);
	
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/api/chat")
	public ResponseEntity<ChatResponse> handleChatFrontend(@RequestBody ChatRequest request) {
		// Log para verificar se o corpo da requisição chegou corretamente
		System.out.println("Recebido no frontend: " + request);
	
		// Processa a mensagem e retorna a resposta
		ChatResponse response = chatService.processUserMessage(request);
		
		// Log para verificar a resposta que está sendo gerada
		System.out.println("Resposta do frontend: " + response);
	
		return ResponseEntity.ok(response);
	}
	

    // Endpoint para pegar o histórico de chats
    @GetMapping("/api/chat/history")
    public ResponseEntity<ChatHistoryResponse> getChatHistory() {
        // Retorna o histórico de chat
        ChatHistoryResponse history = chatService.getChatHistory();
        return ResponseEntity.ok(history);
    }

    // Endpoint para limpar o histórico de chats
    @DeleteMapping("/api/chat/history")
    public ResponseEntity<Void> clearChatHistory() {
        // Limpa o histórico
        chatService.clearChatHistory();
        return ResponseEntity.noContent().build();
    }    
}
