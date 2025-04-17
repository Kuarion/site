package com.kuarion.backend.components;

import com.kuarion.backend.entities.Question;
import com.kuarion.backend.repositories.QuestionRepository;
import com.kuarion.backend.roles.QuestionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionInitializer implements CommandLineRunner {

    @Autowired 
    private QuestionRepository questionRepository;
    
    @Override
    public void run(String... args) {
        if(questionRepository.count() == 0) {
            List<Question> defaultQuestions = List.of(
                new Question("Oi como voce tá", QuestionType.TEXT),
                new Question("Quantos cômodos tem na sua casa", QuestionType.MULTIPLE_CHOICE),
                new Question("Quanto voce gasta por mes com energia eletrica", QuestionType.MULTIPLE_CHOICE)
            );
            questionRepository.saveAll(defaultQuestions);
        }
    }
}