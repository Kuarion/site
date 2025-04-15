package com.kuarion.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.ModelAndView;

import com.kuarion.backend.model.ChatRequest;
import com.kuarion.backend.model.ChatResponse;
import com.kuarion.backend.service.GeminiService;

@RestController
public class GeminiController {

    @Autowired
    private GeminiService geminiService; 
     
    @RequestMapping("/api/chat")
    public ModelAndView test() {
        ModelAndView mdv = new ModelAndView();
        mdv.setViewName("test");
        return mdv;
    }
     
    @PostMapping("/api/chat")
    public ChatResponse askGemini(@RequestBody ChatRequest request) {
        return geminiService.askGemini(request);    
    }
}