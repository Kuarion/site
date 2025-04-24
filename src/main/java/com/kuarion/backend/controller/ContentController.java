package com.kuarion.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.reactive.result.view.RedirectView;

@Controller
public class ContentController {
    
    
    @GetMapping("/")
    public RedirectView redirectToLandingPage() {
        return new RedirectView("/landing");
    }
    
    @GetMapping({"/landing", "/social", "/chat", "/survey", "/forum", "/dashboard", "/statistics", "/auth"})    
    public String forwardToApp() {
        return "forward:/index.html";
    }
}