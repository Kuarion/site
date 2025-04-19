package com.kuarion.backend.repositories;

import com.kuarion.backend.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCommunityId(Long communityId);  // Busca posts pela comunidade
    Optional<Post> findByCommunityIdAndId(Long communityId, Long postId);  // Busca um post específico pela comunidade e postId
}
