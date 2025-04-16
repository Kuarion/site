package com.kuarion.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private final SimpMessagingTemplate messagingTemplate;
    private static final Logger logger = LoggerFactory.getLogger(GeminiController.class);
    
   
    @Autowired
    public GeminiController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }
    
    @PostMapping("/api/chat/message")
    public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
        
    	   logger.info("Nova mensagem recebida: {}", request.message());
    	ChatResponse response = chatService.processUserMessage(request);
        logger.info("Enviando atualização para Websocket");
        messagingTemplate.convertAndSend("/topic/chat-updates", chatService.getChatHistory());
        
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
        
        messagingTemplate.convertAndSend("/topic/chat-updates", new ChatHistoryResponse(List.of()));
        
        return ResponseEntity.noContent().build();
    }    
}