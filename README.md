# 🏋️ Fitness Tracker Platform (Monolith → Microservices)

A **production‑style Fitness Tracking Platform** built with **Spring Boot**, evolving from a **monolithic application to a scalable microservices architecture**.
The system tracks user activities, generates AI‑powered fitness recommendations using **Gemini**, and demonstrates real‑world backend architecture patterns.

---

## 📌 Key Highlights

* Monolith → **Microservices migration**
* **Spring Boot + Spring Cloud** ecosystem
* **OAuth2 / Keycloak** authentication
* **Kafka‑driven async communication**
* **AI recommendations** using Gemini API
* Polyglot persistence (PostgreSQL + MongoDB)
* Dockerized & cloud‑ready

---

## 🧱 Architecture Overview

### High‑Level Architecture

```
[ React Frontend ]
        |
        v
[ API Gateway ]  ──►  [ Eureka Discovery ]
        |
        v
-------------------------------------------------
| User Service | Activity Service | AI Service   |
| PostgreSQL   | MongoDB          | MongoDB      |
-------------------------------------------------
              |
              v
           [ Kafka ]
              |
              v
        [ Gemini API (External AI Service) ]
```

[ React Frontend ]
|
v
[ API Gateway ]  ──►  [ Eureka Discovery ]
|
v
-

| User Service | Activity Service | AI Service   |
| PostgreSQL   | MongoDB          | MongoDB      |
--------------------------------------------------

```
          |
          v
       [ Kafka ]
```

````

### Architecture Principles

- Loose coupling via **Kafka**
- Centralized configuration via **Config Server**
- Single entry point via **API Gateway**
- Stateless services → easy horizontal scaling

---

## 🧩 Services Breakdown

### 1️⃣ User Service

- **Responsibility**: User profile management
- **Database**: PostgreSQL
- **Tech**:
  - Spring Boot
  - Spring Data JPA
  - Bean Validation
- **Notes**:
  - Authentication handled by **Keycloak**
  - Service stores only application‑specific user data

---

### 2️⃣ Activity Service

- **Responsibility**: Track fitness activities
- **Database**: MongoDB
- **Features**:
  - Store activity metrics (type, duration, calories, metrics)
  - Publish activity events to Kafka
- **Tech**:
  - Spring Boot
  - MongoDB
  - Kafka Producer

---

### 3️⃣ AI Recommendation Service

- **Responsibility**: Generate fitness recommendations
- **Database**: MongoDB
- **Flow**:
  1. Consume activity events from Kafka
  2. Call **Gemini API**
  3. Persist structured recommendations
- **Recommendation Structure**:
  - Improvements
  - Safety
  - Suggestions

---

## 🔐 Security & Authentication

- **OAuth2 + OpenID Connect**
- **Keycloak** as Identity Provider
- **JWT‑based authentication**
- **API Gateway** acts as Resource Server
- User identity propagated using JWT claims

---

## ⚙️ Technology Stack

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring WebFlux (Gateway)
- Spring Cloud (Eureka, Config Server)

### Databases

- PostgreSQL (User Service)
- MongoDB (Activity & Recommendation Services)

### Messaging

- Apache Kafka

### AI

- Gemini API

### DevOps

- Docker & Docker Compose
- Environment‑based configuration
- Cloud‑ready architecture

---

## 🗃️ Database Design

### User (PostgreSQL)

- id
- email
- firstName
- lastName
- role
- createdAt / updatedAt

### Activity (MongoDB)

- id
- userId
- type
- duration
- caloriesBurned
- startTime
- additionalMetrics (JSON)

### Recommendation (MongoDB)

- id
- activityId
- userId
- improvements (JSON)
- safety (JSON)
- suggestions (JSON)
- createdAt

---

## 🔁 Async Flow (Kafka)

1. User submits activity
2. Activity Service saves data
3. Activity event published to Kafka
4. AI Service consumes event
5. Gemini generates recommendation
6. Recommendation persisted

---

## 📦 DTO & Validation Patterns

- Request / Response DTO separation
- Validation using `@NotNull`, `@NotBlank`, `@Min`
- No entities exposed directly to controllers

---

## 📄 API Documentation

- Swagger / OpenAPI enabled
- Centralized exception handling
- Consistent error response structure

---

## 🐳 Docker Support

Each service includes:

- Dockerfile
- Environment‑based configuration

Run locally:

```bash
docker-compose up
````

---

## ☁️ Cloud Deployment Ready

* Stateless services
* Externalized configuration
* Service discovery
* Horizontal scaling friendly

Deployable to:

* AWS / Azure / GCP
* Kubernetes (future extension)

---

## 🚀 Future Improvements

* Circuit breakers (Resilience4j)
* Rate limiting at Gateway
* Observability (Prometheus + Grafana)
* Kubernetes deployment
* AI model switching per environment

---

## 👨‍💻 Learning Outcomes

This project demonstrates:

* Real‑world microservice design
* Secure authentication with Keycloak
* Event‑driven architecture
* AI integration in backend systems
* Production‑ready Spring Boot patterns

---

## 📜 License

This project is for **learning and demonstration purposes**.

---

⭐ If you found this project helpful, feel free to star the repository!
