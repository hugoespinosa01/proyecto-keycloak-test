import { LoginButton } from "@/components/login-button";
import { UserProfile } from "@/components/user-profile";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Keycloak Demo Test
            </h1>
            <p className="text-lg text-gray-600">
              Test authentication and authorization with Keycloak
            </p>
          </div>
          
          <div className="space-y-8 text-center">
            <LoginButton />
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
}