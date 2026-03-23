---
trigger: always_on
---

Apply secure backend practices.

Authentication must use JWT or secure session strategies.

Passwords must be hashed using bcrypt.

Never store plaintext passwords.

Secrets must only be stored in environment variables.

Validate all request inputs using DTO validation.

Implement protections such as:

rate limiting on authentication endpoints

secure HTTP headers

CORS configuration

Never log sensitive data such as passwords, tokens or personal identifiers.

Routes must be protected by default unless explicitly marked public.