package com.kuarion.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kuarion.backend.dtos.EnterpriseDTO;
import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.service.EnterpriseFilterService;

@Controller
public class SearchEnterpriseController {

	
	@Autowired
	private EnterpriseFilterService filterService;
	
	@GetMapping("/api/enterprises")
	public ResponseEntity<Page<EnterpriseDTO>> searchEnterprises(
	    @RequestParam List<String> tags,
	    Pageable pageable) {
	    
	    return ResponseEntity.ok(filterService.filterByTags(tags, pageable));
	}
	
}
