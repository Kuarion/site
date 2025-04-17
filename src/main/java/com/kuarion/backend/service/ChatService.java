package com.kuarion.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kuarion.backend.model.ChatExchange;
import com.kuarion.backend.model.ChatHistoryResponse;
import com.kuarion.backend.model.ChatRequest;
import com.kuarion.backend.model.ChatResponse;

@Service
public class ChatService {
	
	private final GeminiService geminiService;
	private final List<ChatExchange> chatHistory = new ArrayList<>();
	
	public ChatService(GeminiService geminiService) {
		super();
		this.geminiService = geminiService;
	}
	
	public ChatResponse processUserMessage(ChatRequest request, String systemPrompt) {
		  // using geminiService to process and get it's answer
        String botResponse = geminiService.getGeminiResponse(request.message(), systemPrompt);
        
        // Registering the exchange between request - response
        ChatExchange exchange = new ChatExchange(
            request.message(),
            botResponse,
            LocalDateTime.now()
        );
        
        // Add to history
        chatHistory.add(exchange);
        
        // return answer - back to first step
        return new ChatResponse(botResponse, LocalDateTime.now());
	}
	
	public ChatHistoryResponse getChatHistory() {
		return new ChatHistoryResponse(List.copyOf(chatHistory));
	}
	
	public void clearChatHistory() {
		chatHistory.clear();
	}
}