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
    
<<<<<<< HEAD
    @GetMapping({"/landing_page", "/social", "/chat", "/survey", 
=======
    @GetMapping({"/landing_page", "/landing_page2","/blog", "/social", "/chat", "/survey", 
>>>>>>> f8f543a9c708898ba316f6c78d97ab7b84547662
    "/forum", "/dashboard", "/statistics", "/auth",
    "/login", "/register", "/forgot-password", "/reset-password","/post"})    
    public String forwardToApp() {
        return "forward:/index.html";
    }
}