package com.kuarion.backend.controller;

import java.util.List;

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
    
    @Autowired
    public GeminiController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }
    
    @PostMapping("/api/chat/message")
    public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
        ChatResponse response = chatService.processUserMessage(request);
        
        // Envia a atualização do histórico para todos os clientes conectados
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
        
        // Notifica os clientes que o histórico foi limpo
        messagingTemplate.convertAndSend("/topic/chat-updates", new ChatHistoryResponse(List.of()));
        
        return ResponseEntity.noContent().build();
    }    
}