"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export function LoginButton() {
  const { data: session } = useSession();

  async function keycloakSessionLogOut() {
    try {
        await fetch(`/api/auth/logout`, { method: 'GET' });
    } catch (err) {
        console.error(err);
    }
}

  if (session) {
    return (
      <Button
        onClick={() => keycloakSessionLogOut().then(() => signOut({callbackUrl: '/'}))}
        variant="destructive"
        className="w-full sm:w-auto"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn("keycloak")} className="w-full sm:w-auto">
      <LogIn className="mr-2 h-4 w-4" />
      Sign In with Keycloak
    </Button>
  );
}