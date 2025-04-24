package com.kuarion.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kuarion.backend.model.ChatExchange;
import com.kuarion.backend.model.ChatHistoryResponse;
import com.kuarion.backend.model.ChatRequest;
import com.kuarion.backend.model.ChatResponse;
import com.kuarion.backend.service.ChatService;


@CrossOrigin(origins = "http://srv802017.hstgr.cloud")
@RestController
@RequestMapping("/api/chat")
public class GeminiController {
    
    private final ChatService chatService;
    private StringBuilder sb = new StringBuilder();
   
    @Autowired
    public GeminiController(ChatService chatService) {
        this.chatService = chatService;
    }
    
    @PostMapping("/message")
    public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
        String systemPrompt = "";
    	ChatHistoryResponse chatResponse = chatService.getChatHistory();
    	systemPrompt = sb.append("Olá, seu nome é KuarIA. Você é um agente chatbot da empresa Kuarion. "
    			+ "Kuarion é uma empresa virtual cuja proposta é conscientizar o povo sobre o uso de energia solar,  "
    			+ "ajudar o cliente nesse processo e na compra, e fazer um sistema que ajuda universalmente as empresas de energia solar."
    			+ "Como um agente de IA chatbot profissional, sua tarefa é ajudar a Kuarion a cumprir seus objetivos. Fale com o cliente"
    			+ "de forma clara, objetiva e compreensiva. Se não souber a resposta para alguma coisa, não minta nem faça suposições,"
    			+ "explique que não sabe a resposta e porquê não sabe. Ajude a Kuarion a alcançar suas metas, sem apostar em suposições com pouco embasamento."
    			+ "Ajude o cliente a se tornar mais informado e interessado sobre o assunto. Lembre-se também da possibilidade de Empresas registradas na Kuarion"
    			+ "falarem com você também. Boa sorte, KuarIA!")
    			.toString();
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
        System.out.println(systemPrompt);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<ChatHistoryResponse> getChatHistory() {
        ChatHistoryResponse history = chatService.getChatHistory();
        return ResponseEntity.ok(history);
    } 

    @DeleteMapping("/history/delete")
    public ResponseEntity<Void> clearChatHistory() {
        chatService.clearChatHistory();
        
        
        return ResponseEntity.noContent().build();
    }    
    
    
}