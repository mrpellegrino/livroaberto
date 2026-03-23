---
trigger: always_on
---

Organize the backend by domain modules.

Each module must contain:

application

presentation

UseCases must implement application logic and expose:

execute(input): Promise<output>

Controllers must only handle routing and validation.

Avoid generic folders like services.

Modules must be self-contained and clearly separated.