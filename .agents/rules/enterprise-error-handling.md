---
trigger: always_on
---

Implement consistent error handling.

Use a global exception handler to standardize API errors.

Errors must include:

error code

message

optional details

requestId

Never expose stack traces or internal system details to clients.

All requests must generate a requestId for traceability.

Validation errors must return HTTP 400 with structured field information.