package com.kuarion.backend;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class KuarionApplication {

	public static void main(String[] args) {
		SpringApplication.run(KuarionApplication.class, args);
	}


	
	//apenas testando algumas coisas
	
	/*
	@Bean
	CommandLineRunner commandLineRunner(ChatClient .Builder builder) {
		return args -> {
		    var client = builder.build();
			var response = client.prompt("Tell me an interesting fact about Carapicuiba, Sao Paulo")
					.call()
					.content();

			System.out.println(response);
		};
	
	}
*/
}
