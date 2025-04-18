package com.kuarion.backend.controller;

import com.kuarion.backend.entities.Comment;
import com.kuarion.backend.entities.Post;
import com.kuarion.backend.repositories.CommentRepository;
import com.kuarion.backend.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/forum/communities/{communityId}/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @PostMapping
    public ResponseEntity<Comment> comentar(@RequestParam Long postId, @RequestBody Comment comentario) {
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isEmpty()) {
            return ResponseEntity.notFound().build(); // Se o post não for encontrado, retorna 404
        }

        comentario.setPost(postOpt.get()); // Associando o post ao comentário
        comentario.setCreationDate(LocalDateTime.now()); // Definindo a data de criação do comentário
        return ResponseEntity.ok(commentRepository.save(comentario)); // Salvando o comentário no banco
    }
}
