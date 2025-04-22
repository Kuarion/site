package com.kuarion.backend.config;

import com.kuarion.backend.dtos.CommunityDTO;
import com.kuarion.backend.service.CommunityService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public CommandLineRunner run(CommunityService communityService) {
        return args -> {
            // Verificar se as comunidades já existem no banco
            if (communityService.listCommunities().isEmpty()) {
                // Criar comunidades padrão, convertendo para DTO
                communityService.createCommunity(new CommunityDTO("k/rural", "Comunidade sobre questões rurais"));
                communityService.createCommunity(new CommunityDTO("k/domiciliar", "Comunidade sobre energia solar em casa"));
                communityService.createCommunity(new CommunityDTO("k/caseira", "Comunidade sobre projetos caseiros"));
                communityService.createCommunity(new CommunityDTO("k/projetos", "Comunidade para discussão de projetos"));
                communityService.createCommunity(new CommunityDTO("k/discutindo", "Comunidade para discussões diversas"));
                communityService.createCommunity(new CommunityDTO("k/newbies", "Comunidade para iniciantes"));
            }
        };
    }
}
