package com.fitness.aiservice.recommendationservice;

import lombok.RequiredArgsConstructor;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class GeminiService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String apiUrl ;

    @Value("${gemini.api.key}")
    private String apiKey ;

    public GeminiService(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.build() ;
    }

    public String getRecommendation(String details){
        Map<String,Object>  requestBody =
                Map.of("contents", new Object[]{
                Map.of("parts", new Object[]{
                Map.of("text",details)
                })
        }
        );

        String response = webClient.post()
                .uri(apiUrl)
                .header("Content-Type","application/json")
                .header("X-goog-api-key",apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }
}
