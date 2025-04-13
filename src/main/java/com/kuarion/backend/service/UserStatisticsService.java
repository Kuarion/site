package com.kuarion.backend.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.kuarion.backend.entities.UserStatistics;
import com.kuarion.backend.repositories.UserRepository;
import com.kuarion.backend.repositories.UserStatisticsRepository;

public class UserStatisticsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserStatisticsRepository userStatisticsRepository;
	
	
	public void saveUserStatistics(Long id, UserStatistics userStats) {
		/*User user = 
				userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
		
				userStatisticsRepository.save(userStats);
		
				user.setUserStatistics(userStats);
				userRepository.save(user);
			*/	
				 
	}
	
}
