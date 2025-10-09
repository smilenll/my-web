# AWS Amplify User Roles - Best Practices

## ✅ The Proper Way (Now Implemented)

### Using JWT Token Claims (Recommended by AWS)

Groups are automatically included in Cognito JWT tokens as `cognito:groups` claim. This is:
- **Faster** - No API call needed
- **More secure** - Token-based, verified by AWS
- **Scalable** - Works in serverless/edge environments
- **Standard** - Follow OAuth2/OpenID Connect best practices

### How It Works

1. **User signs in** → Cognito issues JWT tokens
2. **Access/ID tokens contain** → `cognito:groups: ["admin", "user"]`
3. **Your app reads the claim** → No API calls needed!

---

## Implementation Details

### Server-Side (auth-server.ts)

```typescript
import { fetchAuthSession } from 'aws-amplify/auth/server';

// Get groups from JWT token
export async function getUserGroups(): Promise<string[]> {
  const session = await fetchAuthSession(contextSpec);
  const groups = session?.tokens?.accessToken?.payload['cognito:groups'];
  return Array.isArray(groups) ? groups : [];
}

// Check role
export async function userHasRole(role: string): Promise<boolean> {
  const groups = await getUserGroups();
  return groups.includes(role);
}
```

### Client-Side (auth-context.tsx)

```typescript
import { fetchAuthSession } from 'aws-amplify/auth';

const session = await fetchAuthSession();
const groups = session.tokens?.idToken?.payload['cognito:groups'] || [];
```

---

## Why This is Better Than API Calls

### ❌ Old Approach (Less Optimal)
```typescript
// Making API call to Cognito every time
const client = new CognitoIdentityProviderClient();
const command = new AdminListGroupsForUserCommand({
  UserPoolId: poolId,
  Username: username
});
const result = await client.send(command); // Extra latency!
```

**Problems:**
- Extra API call (latency)
- Requires AWS SDK client
- More complex error handling
- Doesn't work in edge environments
- Costs money (API calls)

### ✅ New Approach (Optimal)
```typescript
// Reading from existing JWT token
const groups = session.tokens.accessToken.payload['cognito:groups'];
```

**Benefits:**
- Zero latency (already have the token)
- No AWS SDK needed
- Simple error handling
- Works everywhere
- Free

---

## Managing User Groups

### Option 1: AWS Console (Easiest)
1. Go to AWS Cognito Console
2. Select your User Pool
3. Go to "Groups" tab
4. Add users to groups

### Option 2: AWS CLI
```bash
# Add user to admin group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-2_gpiIQxNkd \
  --username user@example.com \
  --group-name admin \
  --region us-east-2
```

### Option 3: Automated (Lambda Trigger)
Automatically assign groups after user signup:

```typescript
// amplify/functions/post-confirmation.ts
import { defineFunction } from '@aws-amplify/backend';

export const postConfirmation = defineFunction({
  entry: './handler.ts'
});

// handler.ts
export const handler = async (event: any) => {
  const { userPoolId, userName } = event;

  // Auto-assign new users to 'user' group
  await addUserToGroup(userPoolId, userName, 'user');

  return event;
};
```

Then in `amplify/auth/resource.ts`:
```typescript
import { postConfirmation } from '../functions/post-confirmation';

export const auth = defineAuth({
  loginWith: { email: true },
  groups: ['admin', 'user'],
  triggers: {
    postConfirmation: postConfirmation,
  },
});
```

---

## Advanced: Custom Group Claims

If you need custom group logic (e.g., from external database):

```typescript
// amplify/auth/resource.ts
import { preTokenGeneration } from '../functions/pre-token-generation';

export const auth = defineAuth({
  loginWith: { email: true },
  triggers: {
    preTokenGeneration: preTokenGeneration, // Modify token before issuing
  },
});

// amplify/functions/pre-token-generation/handler.ts
export const handler = async (event: any) => {
  // Fetch groups from your database
  const groups = await fetchGroupsFromDB(event.userName);

  // Add custom groups to token
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        'cognito:groups': groups.join(','),
      },
    },
  };

  return event;
};
```

---

## Data-Level Authorization

For Amplify Data (GraphQL), you can use groups directly in your schema:

```typescript
// amplify/data/resource.ts
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      owner: a.string(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.group('admin'), // Admins can do anything
      allow.group('user').to(['read']), // Users can only read
    ]),
});
```

---

## Multi-Tenancy with Groups

For SaaS apps with multiple organizations:

```typescript
// Groups like: org_123_admin, org_123_user, org_456_admin
const groups = await getUserGroups();
const userOrgs = groups
  .filter(g => g.startsWith('org_'))
  .map(g => g.split('_')[1]);
```

---

## Performance Comparison

| Approach | Latency | Scalability | Cost |
|----------|---------|-------------|------|
| **JWT Token** | ~0ms | Infinite | Free |
| API Call | ~50-200ms | Limited | $$ |

---

## Security Considerations

### Token Expiration
- Access tokens expire (default: 1 hour)
- Groups are updated on next token refresh
- Use `fetchAuthSession({ forceRefresh: true })` to get fresh tokens

### Token Validation
- Amplify automatically validates JWT signatures
- Groups in token are cryptographically verified
- Cannot be tampered with by client

### Best Practices
1. ✅ Read groups from JWT tokens
2. ✅ Verify tokens on server-side
3. ✅ Use server-side authorization for sensitive operations
4. ❌ Don't trust client-side role checks alone
5. ❌ Don't store sensitive permissions in custom claims

---

## Migration Checklist

- [x] Update `userHasRole()` to use JWT token
- [x] Remove CognitoIdentityProviderClient for role checks
- [x] Keep API approach only for admin user management
- [x] Test role-based access control
- [x] Document the approach for team

---

## References

- [AWS Amplify Gen 2 - User Groups](https://docs.amplify.aws/react/build-a-backend/auth/concepts/user-groups/)
- [Cognito JWT Tokens](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html)
- [Override Token Claims](https://docs.amplify.aws/react/build-a-backend/functions/examples/override-token/)
