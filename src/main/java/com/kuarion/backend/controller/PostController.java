package com.kuarion.backend.controller;

import com.kuarion.backend.entities.Post;
import com.kuarion.backend.entities.Comment;
import com.kuarion.backend.dtos.PostCommentDTO;
import com.kuarion.backend.service.PostService;
import com.kuarion.backend.service.CommentService;
import com.kuarion.backend.errors.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")  // Define a base para as rotas de posts
public class PostController {

    private final PostService postService;
    private final CommentService commentService;

    public PostController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();  // Pega o nome de usuário do token JWT

        // Define o autor do post como o nome do usuário autenticado
        post.setAuthor(username);

        Post createdPost = postService.createPost(post);
        return ResponseEntity.status(201).body(createdPost);  // Retorna o post criado com status 201
    }

    @GetMapping
    public ResponseEntity<List<Post>> listPosts() {
        List<Post> posts = postService.listPosts();
        return ResponseEntity.ok(posts);  // Retorna a lista de posts com status 200
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostCommentDTO> getPostWithComments(@PathVariable Long id) {
        PostCommentDTO postWithComments = postService.getPostWithComments(id);
        if (postWithComments == null) {
            return ResponseEntity.notFound().build();  // Retorna 404 se o post não for encontrado
        }
        return ResponseEntity.ok(postWithComments);  // Retorna o post com os comentários
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        try {
            Comment createdComment = commentService.createComment(postId, comment);
            return ResponseEntity.status(201).body(createdComment);  // Retorna o comentário criado com status 201
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build();  // Retorna 404 se o post não for encontrado
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteAllPostsAndComments() {
        postService.deleteAllPostsAndComments();
        return ResponseEntity.noContent().build();  // Retorna 204 sem conteúdo após a deleção
    }
}
