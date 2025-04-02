**Instala las dependencias**
`npm install`

**Ubica lo siguiente en un archivo .env o .env.local**
```
NODE_TLS_REJECT_UNAUTHORIZED=0
```

# Configuración de NextAuth
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-at-least-32-chars-long
```

# Configuración de Keycloak
```
KEYCLOAK_ID=client-sample
KEYCLOAK_SECRET=689F9QQ6OdMvA0an0LHdvLpt0hHShAv1
KEYCLOAK_ISSUER=https://auth-qa.xrmcorp.com/realms/realmeikonsaasdev
KEYCLOAK_REALM=realmeikonsaasdev
KEYCLOAK_URL=https://auth-qa.xrmcorp.com
```

