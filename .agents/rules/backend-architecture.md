---
trigger: always_on
---

Use NestJS as the backend framework.

Do not build backend modules with plain Express or alternative backend frameworks unless explicitly approved.

Organize the backend by feature modules.

Each module must follow this structure:

application -> use cases

infrastructure -> database repositories and integrations

presentation -> controllers and DTOs

Controllers must remain thin and contain no business logic.

Business logic must live inside UseCases.

Repositories must only handle database access.

