import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { Agent } from "https";
import auth from "@/lib/auth";

if (!process.env.KEYCLOAK_ID || !process.env.KEYCLOAK_SECRET || !process.env.KEYCLOAK_ISSUER) {
  throw new Error('Missing required environment variables for Keycloak configuration');
}

const handler = NextAuth(auth);

export { handler as GET, handler as POST };