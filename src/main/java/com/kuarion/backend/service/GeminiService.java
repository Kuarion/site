package com.kuarion.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import com.kuarion.backend.model.ChatRequest;
import com.kuarion.backend.model.GeminiResponse;
import com.kuarion.backend.model.ChatResponse;

@Service
public class GeminiService {
    private static final Logger log = LoggerFactory.getLogger(GeminiService.class); // Corrigido para GeminiService
        
    @Value("${spring.ai.openai.api-key}")
    private String geminiApiKey;
    
    @Value("${gemini.api.model}")
    private String geminiApiModel;
    
    @Value("${gemini.api.base-url}")
    private String geminiApiUrl;
     
    private final RestClient restClient;
    
    public GeminiService(RestClient.Builder builder) {
        this.restClient = builder
            .baseUrl("https://generativelanguage.googleapis.com")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

    public String getGeminiResponse(String userMessage) {
        try {
            String systemPrompt = "Você é um assistente especializado em energia solar...";
            
            String requestBody = String.format("""
                {
                    "contents": [{
                        "parts": [{
                            "text": "%s"
                        }]
                    }],
                    "system_instruction": {
                        "parts": [{
                            "text": "%s"
                        }]
                    }
                }
                """, 
                userMessage.replace("\"", "\\\""),
                systemPrompt.replace("\"", "\\\"")
            );
            
            GeminiResponse response = restClient.post()
                .uri("/v1beta/models/{model}:generateContent?key={key}", 
                    geminiApiModel, geminiApiKey)
                .body(requestBody)
                .retrieve()
                .body(GeminiResponse.class);
            
            if (response != null && !response.candidates().isEmpty()) {
                return response.candidates().get(0).content().parts().get(0).text();
            }
            return "Não foi possível obter uma resposta do Gemini.";
            
        } catch (Exception e) {
            log.error("Erro ao chamar API do Gemini", e);
            return "Desculpe, estou com problemas técnicos. Tente novamente mais tarde.";
        }
    }    

}