package com.kuarion.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Post> posts; // Relacionamento com posts

    // Construtor com parâmetros
    public Community(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Construtor sem parâmetros, necessário para o JPA
    public Community() {
    }
}
