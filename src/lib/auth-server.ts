import { cookies } from 'next/headers';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth/server';
import awsExports from '../aws-exports';

const { runWithAmplifyServerContext } = createServerRunner({
  config: awsExports,
});

export interface ServerUser {
  userId: string;
  username: string;
  attributes?: Record<string, string | undefined>;
}

/**
 * Get the authenticated user on the server side
 * Use this in API routes and server actions
 */
export async function getAuthenticatedUser(): Promise<ServerUser | null> {
  try {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        try {
          return await getCurrentUser(contextSpec);
        } catch (authError: unknown) {
          // Handle authentication errors gracefully
          if (authError instanceof Error &&
              (authError.name === 'UserUnAuthenticatedException' ||
               authError.message?.includes('User needs to be authenticated'))) {
            return null;
          }
          throw authError;
        }
      },
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
        try {
          const currentUser = await getCurrentUser(contextSpec);
          if (!currentUser) return null;

          const attributes = await fetchUserAttributes(contextSpec);

          return {
            userId: currentUser.userId,
            username: currentUser.username,
            attributes
          };
        } catch (authError: unknown) {
          // Handle authentication errors gracefully
          if (authError instanceof Error &&
              (authError.name === 'UserUnAuthenticatedException' ||
               authError.message?.includes('User needs to be authenticated'))) {
            return null;
          }
          throw authError;
        }
      },
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

    if (!user?.attributes) {
      return false;
    }

    const userGroups = user.attributes['cognito:groups'];

    if (typeof userGroups === 'string') {
      const groups = userGroups.split(',');
      return groups.includes(role);
    }
    return false;
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
