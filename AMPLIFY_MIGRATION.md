# 🎯 Amplify Gen 2 Full-Stack Migration TODO

## Missing Backend Features

### Add Amplify Data (GraphQL API)

- [ ] Define TypeScript schema with `defineData()`
- [ ] Add CRUD operations for content/portfolio items
- [ ] Set up authorization rules per table
- [ ] Replace any REST API calls with GraphQL queries/mutations

### Add Amplify Storage (S3)

- [ ] Define storage bucket with `defineStorage()`
- [ ] Configure access controls (public, protected, private)
- [ ] Add file upload functionality for portfolio images
- [ ] Add file download/preview capabilities

### Add Amplify Functions (Lambda)

- [ ] Migrate SES email logic from direct SDK to Lambda function
- [ ] Create function for contact form processing
- [ ] Create function for admin operations (if needed)
- [ ] Set up function triggers and schedules (if needed)

### Migrate Direct AWS SDK Usage

- [ ] Replace `@aws-sdk/client-ses` with Amplify Function
- [ ] Replace direct `@aws-sdk/client-cognito-identity-provider` calls with Amplify Auth APIs
- [ ] Update environment variables to use Amplify backend config

### Additional Considerations

- [ ] Add real-time GraphQL subscriptions (if needed for admin dashboard)
- [ ] Configure custom domain for API endpoints
- [ ] Set up backend environments (dev, staging, prod)
- [ ] Add data seeding scripts for development

---

## Current State

✅ **Completed:**
- Amplify Gen 2 Auth with Cognito
- User groups (admin)
- Client and server-side auth utilities
- amplify_outputs.json configuration

❌ **Not Yet Implemented:**
- Amplify Data (no GraphQL API)
- Amplify Storage (no S3 integration)
- Amplify Functions (using direct AWS SDK calls)

---

**Status**: Frontend-oriented with Auth only
**Last Updated**: October 2025
