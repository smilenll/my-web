'use client';

import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAuth } from "../../hooks/useAuth";
import { LoadingSpinner, ErrorDisplay } from "./ui/LoadingSpinner";

interface HomeProps {
  signOut?: () => void;
  user?: {
    username: string;
  };
  renderedAt: string;
}

function Home({ renderedAt }: HomeProps) {
  const { user, loading, error, signOut, hasRole, getUserGroups } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
  }

  if (!user) {
    return <ErrorDisplay error="No user found" />;
  }

  const userGroups = getUserGroups();
  const isAdmin = hasRole('admin');

  return (
    <div className="flex w-full justify-center items-center flex-col bg-cyan-950 min-h-screen text-white p-8">
      <div className="max-w-md w-full bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username:</label>
            <p className="text-lg">{user.username}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User ID:</label>
            <p className="text-sm text-gray-300 font-mono">{user.userId}</p>
          </div>


          {userGroups.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-1">Groups:</label>
              <div className="flex flex-wrap gap-2">
                {userGroups.map((group) => (
                  <span
                    key={group}
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="bg-yellow-500/20 border border-yellow-500 rounded p-3">
              <p className="text-sm">🔑 Admin access granted</p>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={signOut}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Sign Out
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center" suppressHydrationWarning>
          Server-side rendered on {renderedAt}
        </p>
      </div>
    </div>
  );
}

export default withAuthenticator(Home);