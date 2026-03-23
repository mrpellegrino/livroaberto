---
description: Standard backend request workflow for domain modules
---

Use this workflow for every module action.

1. Controller receives the HTTP request.
2. Controller validates input using DTOs and extracts request context (for example, authenticated user).
3. Controller calls one UseCase entry point for the action.
4. UseCase runs the business workflow and coordinates repositories/integrations.
5. Repository performs data access only.
6. UseCase returns the application result.
7. Controller maps the output to response DTO/contract.
8. Return standardized API response.

Checks before finishing:

- No business rule in controller.
- No HTTP concern inside repository.
- No direct database query in controller/use-case.
- Naming conventions and folder structure respected.
