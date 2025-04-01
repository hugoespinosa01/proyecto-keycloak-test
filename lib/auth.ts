import { encrypt } from '@/utils/encrypt-decrypt-auth';
import { jwtDecode } from 'jwt-decode';
import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { Agent } from 'https';

async function refreshAccessToken(token: JWT) {

    const resp = await fetch(
        `${process.env.KEYCLOAK_URL}realms/ucsg/protocol/openid-connect/token`,
        {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.KEYCLOAK_ID || '',
                client_secret: process.env.KEYCLOAK_SECRET || '',
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token,
            }),
            method: 'POST',
        },
    );
    const refreshToken = await resp.json();
    if (!resp.ok) throw refreshToken;

    return {
        ...token,
        access_token: refreshToken.access_token,
        decoded: jwtDecode(refreshToken.access_token),
        id_token: refreshToken.id_token,
        expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
        refresh_token: refreshToken.refresh_token,
    } as JWT;
}


const auth: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID || '',
            clientSecret: process.env.KEYCLOAK_SECRET || '',
            issuer: process.env.KEYCLOAK_ISSUER,
            httpOptions: {
                agent: new Agent({
                    rejectUnauthorized: false // SOLO PARA DESARROLLO
                })
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account }){
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
                token.accessToken = account.access_token;
                token.id_token = account.id_token ?? '';
            } else if (nowTimeStamp < token.expires_at) {
                return token;
            } 
            return token;
            
        },
        async session({ session, token }) {
            return {
                ...session,
                accessToken: token.accessToken,
                id_token : encrypt(token.id_token),
            };
        },
    },
    pages: {
        signIn: '/',
        error: '/auth/error',
    },
}

export default auth;