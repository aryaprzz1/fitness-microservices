package com.fitness.activityservice.service;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityRespone;
import com.fitness.activityservice.model.Activity;
import com.fitness.activityservice.repository.ActivityRepository;
import com.sun.source.tree.TryTree;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository ;
    private final UserValidationService userValidationService ;

    private final KafkaTemplate<String,Activity> kafkaTemplate ;

    @Value("${kafka.topic.name}")
    private String topicName ;

    public ActivityRespone trackActivity(ActivityRequest request) {
       boolean isValidUser = userValidationService.validateUser(request.getUserId());

       if(!isValidUser){
             throw new RuntimeException("invalid user"+ request.getUserId());
       }
        Activity activity = Activity.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .additionalMetrics(request.getAdditonalMetrics())
                .build() ;

        Activity savedActivty = activityRepository.save(activity);

        try {
            kafkaTemplate.send(topicName,savedActivty.getUserId(),savedActivty);
        }catch (Exception e){
            e.printStackTrace();
        }

        return mapToResponse(savedActivty);
    }

    private ActivityRespone mapToResponse(Activity activity) {
        ActivityRespone response = new ActivityRespone();
        response.setId(activity.getId());
        response.setUserId(activity.getUserId());
        response.setType(activity.getType());
        response.setDuration(activity.getDuration()) ;
        response.setCaloriesBurned(activity.getCaloriesBurned()) ;
        response.setStartTime(activity.getStartTime()) ;
        response.setAdditonalMetrics(activity.getAdditionalMetrics()); ;
        response.setCreatedAt(activity.getCreatedAt()) ;
        response.setUpdatedAt(activity.getUpdatedAt()) ;

         return response ;

    }
}
