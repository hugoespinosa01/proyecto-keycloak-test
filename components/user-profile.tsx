"use client";

import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

export function UserProfile() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-primary rounded-full p-3">
          <User className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <p className="text-sm text-gray-500">Authenticated with Keycloak</p>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Name</label>
          <p className="text-lg">{session.user?.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-lg">{session.user?.email}</p>
        </div>
      </div>
    </Card>
  );
}