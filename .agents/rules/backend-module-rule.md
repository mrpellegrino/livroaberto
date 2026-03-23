---
trigger: always_on
---

Follow the backend module pattern used in this project.

Project structure must be organized as:

src/common -> shared technical modules (config, database, logger, mail, etc.)
src/modules -> business modules (auth, institutions, job-openings, users, etc.)

Each business module must contain:

dtos
presentation/controllers
repositories
use-cases
<module-name>.module.ts

Architecture rules:

Controllers must stay thin and contain no business rules.
UseCases are the application entry point for business behavior.
Repositories must not contain HTTP logic.
DTOs must be used for input validation and response contracts.
Avoid generic service folders when a UseCase can express intent.
Module internals must be cohesive and isolated from other modules.
Cross-module access must happen through explicit interfaces/use-cases, never by bypassing boundaries.

Naming conventions:

<action>-<entity>.dto.ts
<action>-<entity>.usecase.ts
<entity>.repository.ts
<entity>.controller.ts
<module-name>.module.ts
