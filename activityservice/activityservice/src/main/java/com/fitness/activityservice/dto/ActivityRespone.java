package com.fitness.activityservice.dto;

import com.fitness.activityservice.model.ActivityType;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ActivityRespone {
    private String id;
    private String userId ;
    private ActivityType type ;

    private Integer Duration ;
    private Integer caloriesBurned ;
    private LocalDateTime startTime;

    private Map<String,Object> additonalMetrics;
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
