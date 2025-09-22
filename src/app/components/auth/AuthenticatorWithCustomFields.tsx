'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Custom sign up fields
const formFields = {
  signUp: {
    email: {
      order: 1,
      placeholder: 'Enter your email address',
      label: 'Email *',
      required: true,
    },
    password: {
      order: 2,
      placeholder: 'Create a secure password',
      label: 'Password *',
      required: true,
    },
    confirm_password: {
      order: 3,
      placeholder: 'Confirm your password',
      label: 'Confirm Password *',
      required: true,
    },
    given_name: {
      order: 4,
      placeholder: 'Enter your first name',
      label: 'First Name',
      required: false,
    },
    family_name: {
      order: 5,
      placeholder: 'Enter your last name',
      label: 'Last Name',
      required: false,
    },
  },
  signIn: {
    email: {
      placeholder: 'Enter your email',
      label: 'Email',
    },
    password: {
      placeholder: 'Enter your password',
      label: 'Password',
    },
  },
};

// Custom components
const components = {
  Header() {
    return (
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to MyWeb
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Sign in to access your account or create a new one
        </p>
      </div>
    );
  },

  Footer() {
    return (
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    );
  },

  SignIn: {
    Header() {
      return (
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Sign In</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Please sign in to your account.
          </p>
        </div>
      );
    },
    Footer() {
      return (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
          </p>
        </div>
      );
    },
  },

  SignUp: {
    Header() {
      return (
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Create Account</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Join us today! Create your account to get started.
          </p>
        </div>
      );
    },
    Footer() {
      return (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account? Switch to sign in above.
          </p>
        </div>
      );
    },
  },
};

interface AuthenticatorWithCustomFieldsProps {
  children?: (props: { signOut?: () => void; user?: unknown }) => React.ReactElement;
  hideSignUp?: boolean;
}

export function AuthenticatorWithCustomFields({
  children,
  hideSignUp = false
}: AuthenticatorWithCustomFieldsProps) {
  return (
    <Authenticator
      formFields={formFields}
      components={components}
      hideSignUp={hideSignUp}
      loginMechanisms={['email']}
      signUpAttributes={['email', 'given_name', 'family_name']}
      variation="default"
    >
      {children}
    </Authenticator>
  );
}