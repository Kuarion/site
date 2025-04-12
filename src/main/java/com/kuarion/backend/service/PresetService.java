package com.kuarion.backend.service;

import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class PresetService {
	
	//perguntas de exemplo
	private final Map<String, String> presets = Map.of(
		"WHAT_IS_SOLAR_ENERGY",
		"O que é energia solar e como ela funciona?",
		"LEGAL_COMPLICATIONS",
		"Preciso de autorização da prefeitura para instalar painéis solares?",
		"HOW_MANY_PANELS",
		"Como calcular a quantidade de painéis que preciso?",
		"WHAT_IS_KUARION",
		"O que é a Kuarion e como ela funciona?",
		"KUARION_BUDGET",
		"A Kuarion pode me ajudar a fazer um orçamento?"
	);
	
	
	//manuseando chave-valor com nomeVariável-texto
	public String getEnhancedQuestion(String presetKey, String...details) {
		String template = presets.get(presetKey);
		return String.format(template, (Object[]) details);
	}
}
