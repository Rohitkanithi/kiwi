# Kiwi

E-commerce platform. Modular monolith backend (Spring Boot), React frontend.

## Local development

Backend:
    cd backend && ./mvnw spring-boot:run

Frontend:
    cd frontend && npm run dev

## Structure

- `backend/` — Spring Boot app, modules: user, catalog, cart, order, payment, inventory
- `frontend/` — React + TypeScript
- `infra/` — Docker Compose, deployment config