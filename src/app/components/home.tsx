'use client';

import { withAuthenticator } from "@aws-amplify/ui-react";

interface AuthenticatedHomeProps {
  signOut?: () => void;
  user?: {
    username: string;
  };
  renderedAt: string;
}

function AuthenticatedHome({ signOut, user, renderedAt }: AuthenticatedHomeProps) {
  return (
    <div style={{ padding: 50 }}>
      <h1>Logged in as {user?.username}.</h1>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
      <p suppressHydrationWarning>
        This page was server-side rendered on {renderedAt}.
      </p>
    </div>
  );
}

export default withAuthenticator(AuthenticatedHome);