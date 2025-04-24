package com.kuarion.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.reactive.result.view.RedirectView;

@Controller
public class ContentController {
    
    
    @GetMapping("/")
    public RedirectView redirectToLandingPage() {
        return new RedirectView("/landing_page");
    }
    
    @GetMapping({"/landing_page", "/social", "/chat", "/survey", 
    "/forum", "/dashboard", "/statistics", "/auth",
"/login", "/register", "/forgot-password", "/reset-password","/post"})    
    public String forwardToApp() {
        return "forward:/index.html";
    }
}