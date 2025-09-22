'use client';

import { Authenticator, ThemeProvider, Theme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Simplified theme to avoid TypeScript issues
const customTheme: Theme = {
  name: 'custom-auth-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f0f9ff',
          80: '#0369a1',
          90: '#0284c7',
          100: '#0ea5e9',
        },
      },
    },
  },
};

interface CustomAuthenticatorProps {
  children?: (props: { signOut?: () => void; user?: unknown }) => React.ReactElement;
  hideSignUp?: boolean;
  variation?: 'default' | 'modal';
  className?: string;
}

export function CustomAuthenticator({
  children,
  hideSignUp = false,
  variation = 'default',
  className = ''
}: CustomAuthenticatorProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <div className={className}>
        <Authenticator
          hideSignUp={hideSignUp}
          variation={variation}
          loginMechanisms={['email']}
          signUpAttributes={['email']}
        >
          {children}
        </Authenticator>
      </div>
    </ThemeProvider>
  );
}