'use server';

import { CognitoIdentityProviderClient, ListUsersCommand, AdminListGroupsForUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import config from '@/amplifyconfiguration.json';

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

export async function getUsersAction(): Promise<AmplifyUser[]> {
  try {
    // Use AWS SDK with default credentials (from IAM role)
    const client = new CognitoIdentityProviderClient({
      region: config.aws_cognito_region,
    });

        const listUsersCommand = new ListUsersCommand({
          UserPoolId: config.aws_user_pools_id,
          Limit: 60
        });

        const result = await client.send(listUsersCommand);

        if (!result.Users) {
          return [];
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
              UserPoolId: config.aws_user_pools_id,
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

    return users;

  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}