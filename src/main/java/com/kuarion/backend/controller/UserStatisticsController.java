package com.kuarion.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.kuarion.backend.dtos.UserStatisticsRequest;
import com.kuarion.backend.entities.UserStatistics;
import com.kuarion.backend.repositories.UserRepository;
import com.kuarion.backend.repositories.UserStatisticsRepository;
import com.kuarion.backend.service.UserStatisticsService;

@Controller
public class UserStatisticsController {

	private final UserStatisticsRepository userStatisticsRepository;
	
	@Autowired
	private UserStatisticsService userStatisticsService;
	
	/*
	@Autowired
	private User user;
	*/
	
	
	@Autowired
	private UserRepository userRepository;
	
	  @Autowired
	    public UserStatisticsController(UserStatisticsRepository userStatisticsRepository) {
	        this.userStatisticsRepository = userStatisticsRepository;
	    }

	
	@PostMapping("/customizeExperience")
	public void userStatistics(@RequestBody UserStatisticsRequest request) {
		UserStatistics  userStats = new UserStatistics();
		
		userStats.setDado1(request.getDado1());
		userStats.setDado2(request.getDado2());
		userStats.setDado3(request.getDado3());
		userStats.setDado4(request.getDado4());
		userStats.setDado5(request.getDado5());
		   
	//	userStatisticsService.saveUserStatistics(user.getId(), userStats);
	}
/*

	 @GetMapping("/all")
    public List<UserStatistics> getAllUserStatistics() {
        return userStatisticsRepository.findAll();
    }
*/	
	
}
