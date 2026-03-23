---
trigger: always_on
---

Follow database standards according to the selected ORM provider.

The ORM decision must come only from database-orm-provider.md.

All schema changes must be implemented through migrations.

Do not write raw SQL inside controllers or business logic.

Database queries must be implemented in repository classes.

Never create direct database queries in controllers, use-cases, or business/domain code.

Entities/models must define explicit field types and relations.

Sensitive fields must never be exposed in API responses.
