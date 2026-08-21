# Kiwi — Architecture

## 1. Overview
Implementing nav-bar
Kiwi is a web application with a location-aware home page (app bar with company logo, location selector, search, profile menu, and cart). This doc is the shared reference for both the frontend agent (Codex) and backend agent (Claude Code) — read this before implementing anything, and update it before changing any cross-cutting decision.

## 2. Tech Stack

**Frontend**
- React (Vite)
- Language: TypeScript
- State management: Redux Toolkit (cart, location, auth/session state as slices)
- Styling: Tailwind CSS

**Backend**
- Java 17
- Spring Boot
- Build tool: Maven

**Data layer**
- Primary DB: PostgreSQL
- Cache: Redis (session data, location list, search suggestions cache)

**Infra**
- Backend hosting: AWS ECS (Fargate — no server management)
- Backend packaging: Docker container built from Spring Boot JAR
- Frontend hosting: AWS S3 + CloudFront
- CI/CD: GitHub Actions (separate workflows for frontend and backend deploys)

## 3. High-Level Components

| Component | Responsibility |
|---|---|
| Auth Service | Login, signup, JWT issuance/validation |
| Location Service | List of supported cities, user's selected location — location scopes search/cart results |
| Search Service | Search query handling, results, (later) autocomplete |
| Profile Service | User profile data, settings |
| Cart Service | Phase 2 — not built yet. Phase 1: cart is client-side only (Redux Toolkit + localStorage), no backend involvement. |

Each maps to a Spring Boot module/package on the backend and a corresponding API client + UI section on the frontend.

## 4. Folder Structure

```
kiwi/
  ARCHITECTURE.md
  API_CONTRACT.md
  CLAUDE.md
  AGENTS.md
  frontend/
    src/
      components/
      pages/
      api/          # API client functions, one file per service
      context/
  backend/
    src/main/java/com/kiwi/
      auth/
      location/
      search/
      profile/
      cart/
      common/       # shared config, exceptions, utils
```

## 5. Naming Conventions

- **Backend**: Java standard — camelCase for variables/methods, PascalCase for classes, snake_case for DB columns.
- **Frontend**: camelCase for variables/functions, PascalCase for components.
- **API endpoints**: REST, plural nouns, lowercase, hyphenated if multi-word — e.g. `/api/cart-items`.
- **Env vars**: SCREAMING_SNAKE_CASE, prefixed by service where relevant (e.g. `DB_HOST`, `REDIS_URL`).

## 6. Environment Variables (initial list — expand as needed)

| Variable | Used by | Purpose |
|---|---|---|
| `DB_URL` | backend | Database connection string |
| `DB_USERNAME` / `DB_PASSWORD` | backend | DB credentials |
| `REDIS_URL` | backend | Cache connection |
| `JWT_SECRET` | backend | Auth token signing |
| `API_BASE_URL` | frontend | Backend API root, per environment |

## 7. Cross-Cutting Rules for Both Agents

1. No endpoint gets implemented (frontend or backend) unless it's documented in `API_CONTRACT.md` first.
2. Any change to response shape, auth requirements, or route naming = update `API_CONTRACT.md` first, flag it, then implement.
3. Shared conventions (naming, folder structure, env vars) live here — don't invent local conventions inside `frontend/` or `backend/` that diverge from this file.
4. Open questions (marked TBD above) should be resolved and this doc updated before the relevant component is built out — not decided silently mid-implementation.

## 8. Key Architectural Decisions

**Auth: JWT (stateless)**
- Login/signup issue a JWT; client sends it as `Authorization: Bearer <token>` on subsequent requests.
- No server-side session store needed for auth itself (though Redis may still cache user/session-adjacent data separately).
- Backend validates JWT on protected routes (profile, cart, order history).

**Location scoping (USA market — revised from city-list model)**
- Location is not just a UI display preference — it filters backend data. Search results and product/cart availability are scoped by the user's selected delivery address.
- Model is a saved US address (ZIP code, street address, city, state), not a city id. A user can save multiple addresses and switch between them; the selected address's ZIP is what scopes availability.
- Practical implication: once a Location Service backend exists, the selected address's ZIP (not a city id) must be passed as a parameter on search and relevant data-fetching endpoints.
- Phase 1 (current): addresses are client-side only — Redux `location` slice (`frontend/src/store/locationSlice.ts`) persisted to localStorage, no backend involvement, same pattern as the Cart Service below. No geolocation auto-detect; the user enters ZIP + address manually via the navbar's address selector.
- Phase 2 (later): persist addresses server-side per user account (Location/Profile Service), sync selected address across devices, add ZIP-based geolocation/autofill once an endpoint is documented in `API_CONTRACT.md`.

**Search**
- Search-as-you-type autocomplete — requires a backend endpoint that returns suggestions fast (debounced on frontend, likely Redis-cached on backend for common queries).

**Cart (Phase 1)**
- Client-side only — Redux Toolkit slice persisted to localStorage. No Cart API yet.
- Phase 2 (later): move to server-side persistence, including guest-cart-to-account merge logic on login.

## 9. Open Decisions — All Resolved
- [x] DB choice: **PostgreSQL**
- [x] Build tool: **Maven**
- [x] Frontend language: **TypeScript**
- [x] Frontend framework: **React (Vite)** — not Next.js, to match static S3+CloudFront hosting
- [x] Frontend state management: **Redux Toolkit**
- [x] Styling: **Tailwind CSS**
- [x] Frontend hosting: **AWS S3 + CloudFront**
- [x] Backend hosting: **AWS ECS (Fargate)**, Docker container
- [x] CI/CD: **GitHub Actions**