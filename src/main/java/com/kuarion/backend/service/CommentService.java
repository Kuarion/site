package com.kuarion.backend.service;

import com.kuarion.backend.entities.Comment;
import com.kuarion.backend.entities.Post;
import com.kuarion.backend.repositories.PostRepository;
import com.kuarion.backend.repositories.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // injeção de dependência
    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    // cria um comentário e associa ao post
    public Comment createComment(Long postId, Comment comment) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found")); // ou lança uma exceção customizada

        comment.setPost(post);  // associa o comentário ao post
        comment.setCreationDate(LocalDateTime.now());  // define a data de criação do comentário

        return commentRepository.save(comment);  // salva o comentário no banco
    }
}
