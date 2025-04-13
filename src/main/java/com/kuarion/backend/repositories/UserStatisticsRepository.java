package com.kuarion.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.UserStatistics;

public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long>{
	Optional<UserStatistics> findByUsername(String username);
	
	
}
