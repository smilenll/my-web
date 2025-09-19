'use client';

import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

interface User {
  userId: string;
  username: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const currentUser = await getCurrentUser();

      setAuthState({
        user: {
          userId: currentUser.userId,
          username: currentUser.username
        },
        loading: false,
        error: null
      });
    } catch (err) {
      setAuthState({
        user: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Authentication failed'
      });
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setAuthState({
        user: null,
        loading: false,
        error: null
      });
    } catch (err) {
      setAuthState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Sign out failed'
      }));
    }
  }

  function getUserGroups(): string[] {
    return [];
  }

  function hasRole(role: string): boolean {
    return false;
  }

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    checkUser,
    signOut: handleSignOut,
    getUserGroups,
    hasRole,
    isAuthenticated: !!authState.user
  };
}