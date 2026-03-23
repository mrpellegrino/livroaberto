---
trigger: always_on
---

All API responses must follow a consistent structure.

Response format:

{
  data: ...,
  meta: ...,
  error: ...
}

Rules:

data contains the result

meta contains metadata such as pagination and requestId

error contains error information or null

List endpoints must support pagination using page and pageSize.

Never return database entities directly. Use response DTOs.