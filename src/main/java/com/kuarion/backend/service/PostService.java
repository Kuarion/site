package com.kuarion.backend.service;

import com.kuarion.backend.entities.Post;
import com.kuarion.backend.entities.Comment;
import com.kuarion.backend.repositories.PostRepository;
import com.kuarion.backend.repositories.CommentRepository;
import com.kuarion.backend.dtos.PostCommentDTO;
import com.kuarion.backend.errors.ResourceNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    // Criar Post
    public Post createPost(Post post) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        post.setAuthor(username);
        post.setCreationDate(LocalDateTime.now());
        return postRepository.save(post);
    }

    // Listar Posts por Comunidade
    public List<Post> listPostsByCommunity(Long communityId) {
        return postRepository.findByCommunityId(communityId);  // Filtra os posts pela comunidade
    }

    // Buscar Post com Comentários
    public PostCommentDTO getPostWithComments(Long communityId, Long postId) {
        Post post = postRepository.findByCommunityIdAndId(communityId, postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post não encontrado para a comunidade com o ID: " + postId));
        List<Comment> comments = commentRepository.findByPostId(postId);
        return new PostCommentDTO(post, comments);
    }

    public void deleteAllPostsAndComments() {
        commentRepository.deleteAll();
        postRepository.deleteAll();
    }

    public Post updatePost(Long postId, Post updatedPost) {
        if (!postRepository.existsById(postId)) {
            throw new ResourceNotFoundException("Post não encontrado com o ID: " + postId);
        }
        updatedPost.setId(postId);
        return postRepository.save(updatedPost);
    }
}
