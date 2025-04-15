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

    public ChatResponse askGemini(ChatRequest request) { 
        try {
            String systemPrompt = "Você é um assistente especializado em energia solar. Siga as regras:  Regras: responda de forma técnica mas acessível, com foco em São Paulo.\n\n";

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
                request.message().replace("\"", "\\\""),
                systemPrompt.replace("\"", "\\\"")
            );
             
            GeminiResponse response = restClient.post()
                .uri("/v1beta/models/{model}:generateContent?key={key}", 
                    geminiApiModel, geminiApiKey)
                .body(requestBody)
                .retrieve()
                .body(GeminiResponse.class);
            
            if (response != null && 
                !response.candidates().isEmpty() && 
                !response.candidates().get(0).content().parts().isEmpty()) {
                String textResponse = response.candidates().get(0).content().parts().get(0).text();
                return new ChatResponse(textResponse);
            }
            
            return new ChatResponse("Não foi possível obter uma resposta do Gemini.");
            
        } catch (HttpClientErrorException e) {
            log.error("Erro na chamada à API do Gemini: {}", e.getResponseBodyAsString());
            return new ChatResponse("Erro ao comunicar com o Gemini: " + e.getMessage());
        } catch (Exception e) {
            log.error("Erro inesperado", e);
            return new ChatResponse("Erro interno no servidor");
        }
    }
    

}