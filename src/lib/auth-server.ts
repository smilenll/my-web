import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@aws-amplify/adapter-nextjs/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth/server';
import awsExports from '../aws-exports';

export interface ServerUser {
  userId: string;
  username: string;
  attributes?: Record<string, any>;
}

/**
 * Get the authenticated user on the server side
 * Use this in API routes and server actions
 */
export async function getAuthenticatedUser(): Promise<ServerUser | null> {
  try {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
      config: awsExports
    });

    if (!user) return null;

    return {
      userId: user.userId,
      username: user.username
    };
  } catch (error) {
    console.error('Server auth error:', error);
    return null;
  }
}

/**
 * Get user attributes on the server side
 */
export async function getAuthenticatedUserWithAttributes(): Promise<ServerUser | null> {
  try {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        const currentUser = await getCurrentUser(contextSpec);
        if (!currentUser) return null;

        const attributes = await fetchUserAttributes(contextSpec);

        return {
          userId: currentUser.userId,
          username: currentUser.username,
          attributes
        };
      },
      config: awsExports
    });

    return user;
  } catch (error) {
    console.error('Server auth with attributes error:', error);
    return null;
  }
}

/**
 * Check if user has a specific role/group
 */
export async function userHasRole(role: string): Promise<boolean> {
  try {
    const user = await getAuthenticatedUserWithAttributes();
    if (!user?.attributes) return false;

    const userGroups = user.attributes['cognito:groups'] || [];
    return userGroups.includes(role);
  } catch (error) {
    console.error('Role check error:', error);
    return false;
  }
}

/**
 * Require authentication for server actions/API routes
 * Throws error if user is not authenticated
 */
export async function requireAuth(): Promise<ServerUser> {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
}

/**
 * Require specific role for server actions/API routes
 */
export async function requireRole(role: string): Promise<ServerUser> {
  const user = await requireAuth();
  const hasRole = await userHasRole(role);

  if (!hasRole) {
    throw new Error(`Role '${role}' required`);
  }

  return user;
}