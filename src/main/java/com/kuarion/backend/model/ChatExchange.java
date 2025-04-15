package com.kuarion.backend.model;

import java.time.LocalDateTime;

public record ChatExchange(String userMessage, String botResponse, LocalDateTime timestamp) {

}
