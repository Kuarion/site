package com.kuarion.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kuarion.backend.entities.ChatExchangeEntity;

public interface ChatExchangeRepository extends JpaRepository<ChatExchangeEntity, Long>{
	  List<ChatExchangeEntity> findAllByOrderByTimestampAsc();
}
