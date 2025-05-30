# OAuth2 Flows з Keycloak (OpenID Connect)

Цей документ містить опис і приклади всіх основних потоків авторизації OAuth2, протестованих із сервером авторизації Keycloak (OpenID Connect). Також наведено фрагмент опису для OpenAPI 3.

---

## Описано та протестовано:

- Authorization Code Flow
- Implicit Flow
- Resource Owner Password Credentials Flow (Password Grant)
- Client Credentials Flow

---

## OpenAPI 3.0: Опис securitySchemes

```yaml
components:
  securitySchemes:
    keycloakOAuth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: http://localhost:8080/realms/Sofa/protocol/openid-connect/auth
          tokenUrl: http://localhost:8080/realms/Sofa/protocol/openid-connect/token
          scopes:
            openid: OpenID Connect scope
        implicit:
          authorizationUrl: http://localhost:8080/realms/Sofa/protocol/openid-connect/auth
          scopes:
            openid: OpenID Connect scope
        password:
          tokenUrl: http://localhost:8080/realms/Sofa/protocol/openid-connect/token
          scopes:
            openid: OpenID Connect scope
        clientCredentials:
          tokenUrl: http://localhost:8080/realms/Sofa/protocol/openid-connect/token
          scopes:
            openid: OpenID Connect scope

security:
  - keycloakOAuth2: [openid]
```

---

## Authorization Code Flow

**Postman**  
`POST http://localhost:8080/realms/Sofa/protocol/openid-connect/token`

**Body** (x-www-form-urlencoded):

```
client_id=nest-app
grant_type=authorization_code
code=<YOUR_CODE>
redirect_uri=http://localhost:3000/callback
```

**Response:**
```json
{
  "access_token": "eyJh...",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJh...",
  "token_type": "Bearer",
  "id_token": "eyJh...",
  "not-before-policy": 0,
  "session_state": "ac2ea...",
  "scope": "openid profile email"
}
```

---

## Implicit Flow

**URL для авторизації:**

```
http://localhost:8080/realms/Sofa/protocol/openid-connect/auth?client_id=nest-app&response_type=token&scope=openid&redirect_uri=http://localhost:3000/callback
```

Після авторизації `access_token` буде вказано у фрагменті URI (`#access_token=...`).

---

## Password Credentials Flow

**Postman**  
`POST http://localhost:8080/realms/Sofa/protocol/openid-connect/token`

**Body** (x-www-form-urlencoded):

```
client_id=nest-app
grant_type=password
username=User1
password=123456
```

**Response:**
```json
{
  "access_token": "eyJh...",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJh...",
  "token_type": "Bearer",
  "not-before-policy": 0,
  "session_state": "7c2db...",
  "scope": "profile email"
}
```

---

## Client Credentials Flow

**Postman**  
`POST http://localhost:8080/realms/Sofa/protocol/openid-connect/token`

**Body** (x-www-form-urlencoded):

```
client_id=nest-app
client_secret=<client_secret>  # якщо є, для confidential client
grant_type=client_credentials
```

**Response:**
```json
{
  "access_token": "eyJh...",
  "expires_in": 300,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0,
  "scope": "profile email"
}
```

