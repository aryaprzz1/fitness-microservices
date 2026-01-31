package com.fitness.userservice.service;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.models.User;
import com.fitness.userservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public UserResponse register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){

            User existingUser = userRepository.findByEmail(request.getEmail());

            UserResponse userResponse = new UserResponse();
            userResponse.setId(existingUser.getId());
            userResponse.setKeyCloakId(request.getKeyCloakId());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setPassword(existingUser.getPassword());
            userResponse.setFirstname(existingUser.getFirstname());
            userResponse.setLastname(existingUser.getLastname());
            userResponse.setRole(existingUser.getRole());
            userResponse.setCreatedAt(existingUser.getCreatedAt());
            userResponse.setUpdatedAt(existingUser.getUpdatedAt());

            return userResponse;
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .keyCloakId(request.getKeyCloakId())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .build();

        User savedUser = userRepository.save(user);

        UserResponse userResponse = mapToResponse(savedUser);

        return userResponse;
    }

    public UserResponse mapToResponse(User user){
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setPassword(user.getPassword());
        userResponse.setFirstname(user.getFirstname());
        userResponse.setLastname(user.getLastname());
        userResponse.setRole(user.getRole());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());

        return userResponse;
    }

    public UserResponse findById(String userId) {
        User user =userRepository.findById(userId).orElseThrow(
                ()-> new RuntimeException("not found id")
        );

        UserResponse userResponse =mapToResponse(user);
        return userResponse;

    }

    public Boolean existsByUserId(String userId){
        log.info("calling User Service for{userId}");
        return userRepository.existsByKeyCloakId(userId);
    }
}
