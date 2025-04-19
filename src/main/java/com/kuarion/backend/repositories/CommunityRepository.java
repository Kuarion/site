package com.kuarion.backend.repositories;

import com.kuarion.backend.entities.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}
