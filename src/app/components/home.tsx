'use client';

import { withAuthenticator } from "@aws-amplify/ui-react";
import { JobScraperButton } from "./JobScraperButton";

interface AuthenticatedHomeProps {
  signOut?: () => void;
  user?: {
    username: string;
  };
  renderedAt: string;
}

function AuthenticatedHome({ signOut, user, renderedAt }: AuthenticatedHomeProps) {
  return (
    <div className="flex w-full justify-center items-center flex-col bg-cyan-950">
      <h1>Logged in as {user?.username}.</h1>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
      <p suppressHydrationWarning>
        This page was server-side rendered on {renderedAt}.
      </p>
      <JobScraperButton />
    </div>
  );
}

export default withAuthenticator(AuthenticatedHome);