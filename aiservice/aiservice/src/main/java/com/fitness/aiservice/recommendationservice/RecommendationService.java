package com.fitness.aiservice.recommendationservice;

import com.fitness.aiservice.RecommendationRepository.RecommendationRepository;
import com.fitness.aiservice.models.Recommendation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final RecommendationRepository recommendationRepository;

    public List<Recommendation> getUserRecommendation(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public Recommendation getActivityRecommendation(String activityId) {
        return recommendationRepository.findByActivityId(activityId)
                .orElseThrow(
                        ()-> new RuntimeException("no recommendation not found" + activityId)
                );
    }
}
