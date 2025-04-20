package com.kuarion.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kuarion.backend.dtos.EnterpriseDTO;
import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.repositories.EnterpriseRepository;

@Service
public class EnterpriseFilterService {

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Transactional(readOnly = true) 
    public Page<EnterpriseDTO> filterByTags(List<String> tags, Pageable pageable) {
        Page<Enterprise> enterprisePage = enterpriseRepository.findByAnyTag(
            tags.stream()
                .map(String::toLowerCase)
                .collect(Collectors.toList()),
            pageable
        );

        List<EnterpriseDTO> dtoContent = enterprisePage.getContent().stream()
            .map(EnterpriseDTO::fromEntity)
            .collect(Collectors.toList());

        return new PageImpl<>(
            dtoContent,
            pageable,
            enterprisePage.getTotalElements()
        );
    }
}