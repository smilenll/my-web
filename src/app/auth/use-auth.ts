'use client';

import { getCurrentUser, signOut, fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

interface User {
  userId: string;
  username: string;
  email?: string;
  groups?: string[];
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
      const session = await fetchAuthSession();

      // Get groups from the ID token payload
      const idToken = session.tokens?.idToken;
      let groups: string[] = [];

      if (idToken) {
        const payload = idToken.payload;
        const cognitoGroups = payload['cognito:groups'];
        groups = Array.isArray(cognitoGroups) ? cognitoGroups.filter(g => typeof g === 'string') : [];

      }

      setAuthState({
        user: {
          userId: currentUser.userId,
          username: currentUser.username,
          email: (typeof idToken?.payload.email === 'string' ? idToken.payload.email : undefined) || currentUser.signInDetails?.loginId || currentUser.username,
          groups: groups
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
    return authState.user?.groups || [];
  }

  function hasRole(role: string): boolean {
    const groups = getUserGroups();
    return groups.some(group => group.toLowerCase() === role.toLowerCase());
  }

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    checkUser,
    signOut: handleSignOut,
    getUserGroups,
    hasRole,
    isAuthenticated: !!authState.user,
    isAdmin: hasRole('admin')
  };
}
