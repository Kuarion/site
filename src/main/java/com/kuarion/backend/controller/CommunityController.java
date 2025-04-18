package com.kuarion.backend.controller;

import com.kuarion.backend.dtos.CommunityDTO;
import com.kuarion.backend.service.CommunityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forum/communities")
public class CommunityController {

    private final CommunityService communityService;

    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    // Método para criar uma nova comunidade
    @PostMapping
    public ResponseEntity<CommunityDTO> createCommunity(@RequestBody CommunityDTO communityDTO) {
        CommunityDTO createdCommunityDTO = communityService.createCommunity(communityDTO);
        return ResponseEntity.status(201).body(createdCommunityDTO);
    }

    // Método para listar todas as comunidades
    @GetMapping
    public ResponseEntity<List<CommunityDTO>> listCommunities() {
        List<CommunityDTO> communityDTOs = communityService.listCommunities();
        return ResponseEntity.ok(communityDTOs);
    }

    // Método para obter uma comunidade pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<CommunityDTO> getCommunityById(@PathVariable Long id) {
        return communityService.getCommunityById(id)
            .map(community -> new CommunityDTO(community.getId(), community.getName(), community.getDescription()))
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
