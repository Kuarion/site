package com.kuarion.backend.repositories;

import com.kuarion.backend.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

// interfacezinha básica q o spring usa pra mexer no banco com os posts
public interface PostRepository extends JpaRepository<Post, Long> {
    
}
