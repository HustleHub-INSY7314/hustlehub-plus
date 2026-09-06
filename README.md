# HustleHub+ — Part 1: Secure Foundations

## 1. Purpose

HustleHub+ is a secure freelance marketplace backend. Part 1 establishes the secure backend foundation required before marketplace functionality is added in Part 2.

The Part 1 API supports:
- User registration
- Secure password hashing
- User login
- JWT generation
- JWT validation on protected routes
- Input validation
- HTTPS
- Controlled error responses
- Local file-based user storage
- Basic API testing through Postman

## 2. Architecture

```text
Client / Postman
       |
       | HTTPS
       v
+-----------------------+
| Node.js + Express API |
|-----------------------|
| Routes                |
| Controllers           |
| Validation            |
| JWT Middleware        |
| Error Handling        |
+-----------+-----------+
            |
            v
     data/users.json
```

The API boundary is HTTPS. Authentication credentials are received by the API over HTTPS, passwords are hashed with bcrypt before storage, and JWTs are used for subsequent authenticated requests.

## 3. Project structure

```text
HustleHubPlus-Part1/
├── certs/
│   ├── server.crt
│   └── server.key
├── data/
│   └── users.json
├── postman/
│   └── HustleHub-Part1.postman_collection.json
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validate.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   └── userStore.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 4. Installation

Requirements:
- Node.js 20 LTS or later
- npm
- Postman

Run:

```bash
npm install
```

Create the environment file:

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Change `JWT_SECRET` in `.env` to a long random value.

## 5. Create the local HTTPS certificate

For a development certificate, install OpenSSL and run:

```bash
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout certs/server.key \
  -out certs/server.crt \
  -days 365 \
  -subj "/C=ZA/ST=Gauteng/L=Johannesburg/O=HustleHubPlus/OU=Development/CN=localhost"
```

The certificate is for local development only.

## 6. Run the server

```bash
npm start
```

Development mode:

```bash
npm run dev
```

The API runs at:

`https://localhost:3443`

Because the certificate is self-signed, a browser/Postman may warn that the certificate is not trusted. This is expected for local development.

## 7. Authentication flow

### Registration

`POST /api/auth/register`

Example:

```json
{
  "name": "John Freelancer",
  "email": "john@example.com",
  "password": "StrongPass123",
  "role": "freelancer"
}
```

The password is never stored directly. The backend hashes it using bcrypt and stores only the resulting password hash.

### Login

`POST /api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

A successful login returns a JWT.

### Protected request

`GET /api/auth/me`

Header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

The JWT middleware verifies:
- signature
- expiry
- issuer
- audience

Only after successful validation does the request continue.

## 8. Security decisions

### Password hashing
Passwords are hashed using bcrypt with a cost factor of 12. Plain-text passwords are never stored.

### JWT
The login endpoint creates a signed JWT containing the user's ID, email and role. The secret is stored in `.env`, not hard-coded in source code.

### HTTPS
The server uses Node's HTTPS module with a local SSL certificate. This protects credentials and tokens while they are transmitted.

### Input validation
Registration and login requests are validated with `express-validator`. Invalid fields receive HTTP 400 responses.

### Error handling
The API returns controlled messages. Stack traces, file paths, environment variables and configuration values are not returned to clients.

### Duplicate accounts
Registration checks whether the email already exists and returns HTTP 409 if it does.

### Invalid credentials
Login uses the same generic response for an unknown email and incorrect password, reducing user-enumeration risk.

### HTTP status codes
- 201: registration successful
- 200: login/protected request successful
- 400: validation failure
- 401: authentication failure
- 404: route/resource not found
- 409: duplicate user
- 500: controlled server error

## 9. Part 1 limitations

The assessment explicitly allows local in-memory or file-based storage for Part 1. A database is required later. This implementation therefore uses `data/users.json`.

The client, gig management, booking, transactions, income and tax features are intentionally left for later parts.

## 10. Postman tests

Import the supplied Postman collection from:

`postman/HustleHub-Part1.postman_collection.json`

Test:
1. Health check
2. Successful registration
3. Duplicate registration
4. Invalid registration
5. Successful login
6. Invalid login
7. Protected request without token
8. Protected request with JWT

## 11. Evidence to capture

For the Part 1 submission, capture screenshots showing:
- project structure
- server running over HTTPS
- successful registration
- password hash in `users.json` (do not show a real password)
- successful login with JWT
- failed login
- validation failure
- protected route without JWT
- protected route with valid JWT
- Postman collection/tests

Do not commit `.env`, `server.key`, or real secrets to GitHub.

## 12. Suggested Git commits

Use meaningful commits such as:

```text
feat: initialise secure express backend
feat: add user registration
feat: add bcrypt password hashing
feat: add jwt authentication
feat: protect authenticated routes
feat: add input validation
feat: add https configuration
feat: add controlled error handling
test: add postman authentication tests
docs: add part 1 security documentation
```
