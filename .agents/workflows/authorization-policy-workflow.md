---
description: Authorization flow using global guard, role policies, and deny-by-default
---

Use this workflow for every protected endpoint.

1. Request reaches global AuthorizationGuard.
2. If endpoint is explicitly public (for example login/health), skip authorization.
3. Resolve resource and action automatically from HTTP method + route path.
4. If endpoint is custom, infer action from last route segment.
5. Read authenticated user context (id, roles, tenant/unit/scopes if available).
6. Load module policy map for the resolved resource/action.
7. Call AuthorizationService.can(user, { resource, action }, context).
8. AuthorizationService evaluates:
   - deny-by-default baseline
   - RBAC role rules
   - optional user-specific grants
   - optional ABAC conditions
9. If ABAC requires subject data, load subject in authorization layer (not controller).
10. If denied, return HTTP 403 with standardized error format.
11. If allowed, continue to controller -> use-case flow.

Checks before finishing:

- No @Permissions('resource:action') in routes/controllers.
- No authorization logic in controllers.
- Protected-by-default behavior is preserved.
- Resource/action inference is deterministic and testable.
- Backend remains source of truth for access control.

