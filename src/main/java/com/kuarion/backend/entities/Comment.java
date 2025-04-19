package com.kuarion.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;
    private String message;
    private LocalDateTime creationDate;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
