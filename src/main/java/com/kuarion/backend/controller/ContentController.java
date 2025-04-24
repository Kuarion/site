package com.kuarion.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContentController {
    
    @GetMapping({"/", "/social", "/survey", "/forum", "/dashboard", "/statistics"})    
    public String social() {
        return "forward:/index.html";
    }
}