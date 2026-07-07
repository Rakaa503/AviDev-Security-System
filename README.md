# AVSS Lite

A lightweight authentication framework built with TypeScript.

## Features

- JWT Authentication
- Session Management
- OAuth Providers
- Route Guards
- Permissions
- Authentication Hooks
- Cache Layer
- Security Utilities
- Logger
- Terminal Utilities

## Installation

```bash
npm install avss-lite

# AVSS Lite - Testing Documentation

## Overview

AVSS Lite menggunakan pengujian berlapis untuk memastikan setiap modul keamanan bekerja dengan benar, aman, dan stabil sebelum digunakan pada aplikasi production.

---

# Testing Structure

```

tests/
│
├── unit/
│ ├── jwt.test.ts
│ ├── bcrypt.test.ts
│ ├── csrf.test.ts
│ ├── xss.test.ts
│ ├── sanitizer.test.ts
│ ├── validator.test.ts
│ ├── logger.test.ts
│ └── error-handler.test.ts
│
├── integration/
│ ├── auth.test.ts
│ ├── middleware.test.ts
│ └── request-flow.test.ts
│
├── security/
│ ├── jwt-security.test.ts
│ ├── csrf-security.test.ts
│ ├── xss-security.test.ts
│ └── injection.test.ts
│
├── performance/
│ ├── jwt-performance.test.ts
│ ├── bcrypt-performance.test.ts
│ └── middleware-performance.test.ts
│
└── setup/
├── setup.ts
└── teardown.ts

```

---

# Unit Testing

Unit testing memastikan setiap module bekerja secara independen.

## JWT

### Generate Token

* Generate access token
* Generate refresh token
* Validate payload

### Verify Token

* Valid token
* Invalid token
* Expired token
* Invalid secret
* Empty token

---

## Password Hash (bcrypt)

### Hash Password

* Hash string
* Hash unique result
* Salt generation

### Compare Password

* Correct password
* Incorrect password
* Empty password

---

## CSRF

* Generate token
* Verify token
* Invalid token
* Missing token
* Expired token

---

## XSS Protection

Input:

```

<script>alert("XSS")</script>

```

Expected:

```

alert("XSS")

```

or escaped output.

---

## Sanitizer

Testing:

* HTML removal
* Script removal
* SQL keyword filtering
* Whitespace cleanup

---

## Validator

Validate:

* Email
* Password
* Username
* URL
* Phone Number
* Required field
* Min length
* Max length

---

## Logger

Testing:

* INFO
* SUCCESS
* WARNING
* ERROR

Expected output:

```

[INFO]
[SUCCESS]
[WARNING]
[ERROR]

```

---

## Error Handler

Testing:

* Bad Request
* Unauthorized
* Forbidden
* Not Found
* Internal Server Error

---

# Integration Testing

## Authentication Flow

```

Login
↓
Password Compare
↓
JWT Generate
↓
Response

```

Expected:

* Login Success
* Invalid Password
* User Not Found

---

## Middleware Flow

```

Incoming Request
↓
JWT Middleware
↓
CSRF Middleware
↓
Validation Middleware
↓
Controller

```

Expected:

Only valid requests reach the controller.

---

## Request Flow

```

Client
↓
Security Middleware
↓
Validation
↓
Business Logic
↓
Response

```

---

# Security Testing

## JWT Attack Test

* Invalid Signature
* Modified Payload
* Expired Token
* Missing Token

Expected:

Request rejected.

---

## CSRF Attack Test

* Missing Token
* Invalid Token
* Expired Token

Expected:

HTTP 403 Forbidden.

---

## XSS Attack Test

Payload:

```

<script>alert(1)</script>

```

Expected:

Payload sanitized.

---

## Injection Test

Input:

```

' OR 1=1 --

```

Expected:

Rejected or sanitized.

---

# Performance Testing

Measure execution time for:

* JWT Generate
* JWT Verify
* Password Hash
* Password Compare
* Middleware Execution

Target:

* Stable execution
* No memory leak
* Consistent response time

---

# Test Coverage

Minimum target:

```

95%

```

Recommended:

```

100%

```

---

# Test Commands

Run all tests

```

npm test

```

Run unit tests

```

npm run test:unit

```

Run integration tests

```

npm run test:integration

```

Run security tests

```

npm run test:security

```

Run performance tests

```

npm run test:performance

```

Run coverage

```

npm run test:coverage

```

---

# Testing Checklist

| Module           | Status |
| ---------------- | ------ |
| JWT              | ✅      |
| Password Hash    | ✅      |
| Password Compare | ✅      |
| CSRF             | ✅      |
| XSS Protection   | ✅      |
| Sanitizer        | ✅      |
| Validator        | ✅      |
| Logger           | ✅      |
| Error Handler    | ✅      |
| Middleware       | ✅      |
| Integration Test | ✅      |
| Security Test    | ✅      |
| Performance Test | ✅      |
| Coverage Report  | ✅      |

---

# Conclusion

AVSS Lite dinyatakan siap digunakan apabila seluruh unit test, integration test, security test, dan performance test berhasil dijalankan tanpa kegagalan, serta mencapai target code coverage minimal 95%.
```
