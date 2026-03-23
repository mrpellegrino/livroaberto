---
trigger: always_on
---

Use this authorization approach.

Goal:

Do not require permissions to be declared on routes/controllers.
Do not use manual decorators like @Permissions('resource:action') on endpoints.
Authorization must be resolved centrally from user role(s), endpoint, and module policies.

Core principles:

Authorization is deny-by-default.
Controllers must contain no authorization logic.
All decisions must go through AuthorizationService.
Routes are protected by default unless explicitly marked public.

Support model:

RBAC (role-based access control)
user-specific grants/overrides (optional)
ABAC policies (tenant/unit ownership, self-only, resource state)

Route -> action resolution (no permission decorators):

GET /<resource> -> list
GET /<resource>/:id -> read
POST /<resource> -> create
PATCH /<resource>/:id -> update
DELETE /<resource>/:id -> delete

For custom endpoints, infer action from the last route segment:

POST /billing/:id/approve -> approve
POST /students/:id/enroll -> enroll
POST /reports/export -> export

Resource must be inferred from controller base path.

Policy map per module:

Each module must define one policy map file, for example:

modules/students/authorization/students.policy.ts
modules/billing/authorization/billing.policy.ts

Policy map must define:

RBAC rules: roles -> allowed actions
optional ABAC conditions per action

ABAC execution:

If ABAC needs target entity data, load it in a dedicated authorization layer (for example AuthorizationSubjectLoader), never in controllers.

Frontend alignment:

Frontend must not be source of truth for access control.
Frontend may use roles/capabilities for UI gates, but backend must always enforce authorization.

Non-negotiables:

No authorization checks inside controllers.
No manual @Permissions('x:y') on routes.
All authorization decisions go through AuthorizationService + module policy maps.
Deny-by-default.

