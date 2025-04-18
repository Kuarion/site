package com.kuarion.backend.service;

import com.kuarion.backend.dtos.CommunityDTO;
import com.kuarion.backend.entities.Community;
import com.kuarion.backend.repositories.CommunityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommunityService {

    private final CommunityRepository communityRepository;

    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    // Alterado para mapear o DTO para a entidade Community no serviço
    public List<CommunityDTO> listCommunities() {
        List<Community> communities = communityRepository.findAll();
        return communities.stream()
                .map(community -> new CommunityDTO(community.getId(), community.getName(), community.getDescription()))
                .collect(Collectors.toList());
    }

    // Alterado para receber CommunityDTO, converter para Community e salvar
    public CommunityDTO createCommunity(CommunityDTO communityDTO) {
        Community community = new Community(communityDTO.getName(), communityDTO.getDescription());  // Converter DTO para Entity
        Community savedCommunity = communityRepository.save(community);
        return new CommunityDTO(savedCommunity.getId(), savedCommunity.getName(), savedCommunity.getDescription());
    }

    // Método para obter uma comunidade pelo ID
    public Optional<Community> getCommunityById(Long id) {
        return communityRepository.findById(id);
    }
}
