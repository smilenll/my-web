'use client';

import { getCurrentUser, signOut, fetchUserAttributes } from 'aws-amplify/auth';
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
      const userAttributes = await fetchUserAttributes();

      // Extract groups from cognito:groups attribute
      const cognitoGroups = userAttributes['cognito:groups'];
      const groups = cognitoGroups ? cognitoGroups.split(',') : [];

      // Fallback: if user email is admin email and no groups, treat as admin
      const isAdminEmail = userAttributes.email === 'smilenlyubenov@gmail.com';
      if (isAdminEmail && groups.length === 0) {
        groups.push('admin');
      }

      setAuthState({
        user: {
          userId: currentUser.userId,
          username: currentUser.username,
          email: userAttributes.email || currentUser.signInDetails?.loginId || currentUser.username,
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