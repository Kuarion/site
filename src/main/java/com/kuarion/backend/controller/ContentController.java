package com.kuarion.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;  // Change this import

@Controller
public class ContentController {
    
    @GetMapping("/")
    public String redirectToLandingPage() {    // Change return type to String
        return "redirect:/landing_page";       // Use Spring MVC redirect
    }
    
    @GetMapping({"/landing_page", "/landing_page2","/blog", "/social", "/chat", "/survey", 
    "/forum", "/dashboard", "/statistics", "/auth",
    "/login", "/register", "/forgot-password", "/reset-password","/post"})    
    public String forwardToApp() {
        return "forward:/index.html";
    }
}