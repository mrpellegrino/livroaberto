---
trigger: always_on
---

Define a single ORM provider per project.

Current ORM provider: Prisma.

Rules:

Use only one ORM provider across the backend.
Do not mix TypeORM and Prisma in the same project unless explicitly approved.
All repositories and database access patterns must follow the selected provider.
If the provider changes, update this rule first and then apply the provider-specific standards.

Provider switch policy:

When using TypeORM, follow the TypeORM database standards.
When using Prisma, follow the Prisma database standards.