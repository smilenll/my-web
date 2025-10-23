# Fix Admin Role Issue - Amplify Gen 1 to Gen 2 Migration

## Problem
The `userHasRole()` function checks for `cognito:groups` attribute, but Amplify Gen 2 doesn't include groups in user attributes by default. Groups must be fetched separately.

## Solution Options

### Option 1: Fix the Role Check (Recommended - Quick Fix)
Update `src/lib/auth-server.ts` to fetch groups from Cognito API instead of attributes.

### Option 2: Add User to Admin Group Manually
Use AWS CLI or Console to add yourself to the admin group.

---

## OPTION 1: Fix the Code (Recommended)

Replace the `userHasRole()` function in `src/lib/auth-server.ts` with this:

```typescript
import { CognitoIdentityProviderClient, AdminListGroupsForUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import outputs from '../../amplify_outputs.json';

/**
 * Check if user has a specific role/group
 */
export async function userHasRole(role: string): Promise<boolean> {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return false;
    }

    // Fetch groups from Cognito API (Gen 2 compatible)
    const client = new CognitoIdentityProviderClient({
      region: outputs.auth.aws_region,
    });

    const command = new AdminListGroupsForUserCommand({
      UserPoolId: outputs.auth.user_pool_id,
      Username: user.username,
    });

    const result = await client.send(command);
    const groups = result.Groups?.map(g => g.GroupName || '') || [];

    return groups.includes(role);
  } catch (error) {
    console.error('Role check error:', error);
    return false;
  }
}
```

---

## OPTION 2: Add Yourself to Admin Group

### Using AWS CLI:

```bash
# Get your username (email if using email login)
aws cognito-idp list-users \
  --user-pool-id us-east-2_gpiIQxNkd \
  --region us-east-2

# Add user to admin group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-2_gpiIQxNkd \
  --username YOUR_EMAIL@example.com \
  --group-name admin \
  --region us-east-2
```

### Using AWS Console:

1. Go to AWS Console → Cognito → User Pools
2. Select your pool: `us-east-2_gpiIQxNkd`
3. Go to "Groups" tab
4. Click "admin" group
5. Click "Add user to group"
6. Enter your email/username
7. Click "Add"

---

## OPTION 3: Create Admin Group if Missing

If the admin group doesn't exist:

```bash
# Create admin group
aws cognito-idp create-group \
  --user-pool-id us-east-2_gpiIQxNkd \
  --group-name admin \
  --description "Administrator group" \
  --region us-east-2

# Then add yourself to it
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-2_gpiIQxNkd \
  --username YOUR_EMAIL@example.com \
  --group-name admin \
  --region us-east-2
```

---

## Verify Your Fix

After applying the fix:

1. Sign out and sign back in
2. Navigate to the admin page
3. Try to fetch users

You should now see the users list without the "Role 'admin' required" error.

---

## Why This Happened

**Amplify Gen 1**: Groups were included in JWT token claims as `cognito:groups`
**Amplify Gen 2**: Groups must be fetched via API call to `AdminListGroupsForUser`

The migration requires updating role-checking code to use the Cognito API.
