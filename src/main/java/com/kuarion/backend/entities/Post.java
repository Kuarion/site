package com.kuarion.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private LocalDateTime creationDate;

    private String author;

    @ManyToOne
    @JoinColumn(name = "community_id")
    @JsonBackReference // Prevents infinite recursion
    private Community community;
}