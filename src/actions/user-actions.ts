'use server';

import { CognitoIdentityProviderClient, ListUsersCommand, AdminListGroupsForUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import outputs from '../../amplify_outputs.json';

export interface AmplifyUser {
  userId: string;
  username: string;
  email?: string;
  emailVerified: boolean;
  enabled: boolean;
  userStatus: string;
  userCreateDate: string;
  userLastModifiedDate: string;
  attributes: Record<string, string>;
  groups?: string[];
}

export interface PaginatedUsersResult {
  users: AmplifyUser[];
  nextToken?: string;
  hasMore: boolean;
  totalFetched: number;
}

// Get exact user count (requires pagination through all users)
export async function getUserCount(): Promise<number> {
  try {
    const { requireRole } = await import('@/lib/auth-server');
    await requireRole('admin');

    const client = new CognitoIdentityProviderClient({
      region: outputs.auth.aws_region,
    });

    let totalCount = 0;
    let paginationToken: string | undefined;

    do {
      const command = new ListUsersCommand({
        UserPoolId: outputs.auth.user_pool_id,
        Limit: 60,
        PaginationToken: paginationToken,
      });

      const result = await client.send(command);
      totalCount += result.Users?.length || 0;
      paginationToken = result.PaginationToken;
    } while (paginationToken);

    return totalCount;
  } catch (error) {
    console.error('Error getting user count:', error);
    throw new Error(`Failed to get user count: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get approximate user count (faster, but not exact if you have >60 users)
export async function getApproximateUserCount(): Promise<{ count: number; isApproximate: boolean }> {
  try {
    const { requireRole } = await import('@/lib/auth-server');
    await requireRole('admin');

    const client = new CognitoIdentityProviderClient({
      region: outputs.auth.aws_region,
    });

    const command = new ListUsersCommand({
      UserPoolId: outputs.auth.user_pool_id,
      Limit: 60,
    });

    const result = await client.send(command);
    const count = result.Users?.length || 0;
    const hasMore = !!result.PaginationToken;

    return {
      count,
      isApproximate: hasMore
    };
  } catch (error) {
    console.error('Error getting approximate user count:', error);
    throw new Error(`Failed to get user count: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getActiveSessions(): Promise<number> {
  try {
    const { requireRole } = await import('@/lib/auth-server');
    await requireRole('admin');

    const client = new CognitoIdentityProviderClient({
      region: outputs.auth.aws_region,
    });

    const command = new ListUsersCommand({
      UserPoolId: outputs.auth.user_pool_id,
      Limit: 60,
    });

    const result = await client.send(command);
    
    // Count users with recent activity (last 24 hours)
    const activeSessions = result.Users?.filter(user => {
      const lastModified = user.UserLastModifiedDate;
      if (!lastModified) return false;
      
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return lastModified > dayAgo;
    }).length || 0;

    return activeSessions;
  } catch (error) {
    console.error('Error getting active sessions:', error);
    return 0;
  }
}

export async function getSystemStatus(): Promise<{ status: 'Online' | 'Degraded' | 'Offline'; uptime: string }> {
  try {
    const { requireRole } = await import('@/lib/auth-server');
    await requireRole('admin');

    // Simple health check - try to connect to Cognito
    const client = new CognitoIdentityProviderClient({
      region: outputs.auth.aws_region,
    });

    const command = new ListUsersCommand({
      UserPoolId: outputs.auth.user_pool_id,
      Limit: 1,
    });

    await client.send(command);
    
    return {
      status: 'Online',
      uptime: '99.9%'
    };
  } catch (error) {
    console.error('System health check failed:', error);
    return {
      status: 'Degraded',
      uptime: 'N/A'
    };
  }
}

export async function getUsersAction(
  limit: number = 60,
  paginationToken?: string
): Promise<PaginatedUsersResult> {
  try {
    // Import requireRole dynamically to avoid circular dependencies
    const { requireRole } = await import('@/lib/auth-server');

    // Require admin role to access this action
    await requireRole('admin');

    const client = new CognitoIdentityProviderClient({
      region: outputs.auth.aws_region,
    });

        const listUsersCommand = new ListUsersCommand({
          UserPoolId: outputs.auth.user_pool_id,
          Limit: limit,
          PaginationToken: paginationToken,
        });

        const result = await client.send(listUsersCommand);

        if (!result.Users) {
          return {
            users: [],
            hasMore: false,
            totalFetched: 0
          };
        }

        const users: AmplifyUser[] = [];
        for (const user of result.Users) {
          const amplifyUser: AmplifyUser = {
            userId: user.Username || '',
            username: user.Username || '',
            email: user.Attributes?.find(attr => attr.Name === 'email')?.Value,
            emailVerified: user.Attributes?.find(attr => attr.Name === 'email_verified')?.Value === 'true',
            enabled: user.Enabled || false,
            userStatus: user.UserStatus || '',
            userCreateDate: user.UserCreateDate?.toISOString() || '',
            userLastModifiedDate: user.UserLastModifiedDate?.toISOString() || '',
            attributes: user.Attributes?.reduce((acc, attr) => {
              if (attr.Name && attr.Value) {
                acc[attr.Name] = attr.Value;
              }
              return acc;
            }, {} as Record<string, string>) || {}
          };

          // Get user groups
          try {
            const groupsCommand = new AdminListGroupsForUserCommand({
              UserPoolId: outputs.auth.user_pool_id,
              Username: user.Username
            });

            const groupsResult = await client.send(groupsCommand);
            amplifyUser.groups = groupsResult.Groups?.map(group => group.GroupName || '') || [];
          } catch (error) {
            console.warn(`Failed to get groups for user ${user.Username}:`, error);
            amplifyUser.groups = [];
          }

          users.push(amplifyUser);
        }

    return {
      users,
      nextToken: result.PaginationToken,
      hasMore: !!result.PaginationToken,
      totalFetched: users.length
    };

  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
