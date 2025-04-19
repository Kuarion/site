package com.kuarion.backend.controller;

import com.kuarion.backend.entities.Post;
import com.kuarion.backend.entities.Comment;
import com.kuarion.backend.entities.Community;  // A classe Community já está importada
import com.kuarion.backend.dtos.PostCommentDTO;
import com.kuarion.backend.service.PostService;
import com.kuarion.backend.service.CommentService;
import com.kuarion.backend.errors.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forum/communities/{communityId}/posts")  // Define a base para as rotas de posts
public class PostController {

    private final PostService postService;
    private final CommentService commentService;

    public PostController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    // Criar Post
    @PostMapping
    public ResponseEntity<Post> createPost(@PathVariable Long communityId, @RequestBody Post post) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();  // Pega o nome de usuário do token JWT
        
        // Define o autor do post e associa o post à comunidade
        post.setAuthor(username);
        
        // Aqui, você cria a instância de Community e a associa ao post
        Community community = new Community();
        community.setId(communityId);
        post.setCommunity(community);  // Associa o post à comunidade específica

        Post createdPost = postService.createPost(post);
        return ResponseEntity.status(201).body(createdPost);  // Retorna o post criado com status 201
    }

    // Listar Posts por Comunidade
    @GetMapping
    public ResponseEntity<List<Post>> listPosts(@PathVariable Long communityId) {
        List<Post> posts = postService.listPostsByCommunity(communityId);  // Filtra pelos posts da comunidade correta
        return ResponseEntity.ok(posts);  // Retorna a lista de posts da comunidade específica
    }

    // Buscar Post com Comentários
    @GetMapping("/{id}")
    public ResponseEntity<PostCommentDTO> getPostWithComments(@PathVariable Long communityId, @PathVariable Long id) {
        PostCommentDTO postWithComments = postService.getPostWithComments(communityId, id);
        if (postWithComments == null) {
            return ResponseEntity.notFound().build();  // Retorna 404 se o post não for encontrado
        }
        return ResponseEntity.ok(postWithComments);  // Retorna o post com os comentários
    }

    // Adicionar Comentário no Post
    @PostMapping("/{postId}/add-comment")
    public ResponseEntity<Comment> addComment(@PathVariable Long communityId, @PathVariable Long postId, @RequestBody Comment comment) {
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
