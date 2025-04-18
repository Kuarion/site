package com.kuarion.backend.components;

import com.kuarion.backend.entities.Question;
import com.kuarion.backend.repositories.QuestionRepository;
import com.kuarion.backend.roles.QuestionPublic;
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
                new Question("Oi como voce tá", QuestionType.TEXT, QuestionPublic.USER),
                new Question("Quantos cômodos tem na sua casa", QuestionType.MULTIPLE_CHOICE, QuestionPublic.USER),
                new Question("Quanto voce gasta por mes com energia eletrica", QuestionType.MULTIPLE_CHOICE, QuestionPublic.USER)
            );
            
            
            List<Question> defaultQuestionsCompany = List.of(
            		new Question("Em qual cidade está situada sua empresa?", QuestionType.TEXT, QuestionPublic.COMPANY),
            		new Question("Qual o tamanho da sua empresa?", QuestionType.MULTIPLE_CHOICE, QuestionPublic.COMPANY),
            		new Question("Qual a especialização técnica da sua empresa?", QuestionType.MULTIPLE_CHOICE, QuestionPublic.COMPANY),
            		new Question("Qual a fase da cadeia que a sua empresa atua?", QuestionType.MULTIPLE_CHOICE, QuestionPublic.COMPANY),
            		new Question("Qual o modelo de negócio da sua empresa?", QuestionType.MULTIPLE_CHOICE, QuestionPublic.COMPANY)            		
            		);
            questionRepository.saveAll(defaultQuestions);
            questionRepository.saveAll(defaultQuestionsCompany);
        }
    }
}