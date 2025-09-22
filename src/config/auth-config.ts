// Additional Amplify Auth configuration options
// This would typically go in your aws-exports.js or be configured via Amplify CLI

export const authConfig = {
  // Password requirements
  passwordSettings: {
    minimumLength: 8,
    requireNumbers: true,
    requireUppercase: true,
    requireLowercase: true,
    requireSymbols: true,
  },

  // Sign up configuration
  signUpConfig: {
    // Auto confirm users (useful for development)
    autoConfirmUser: false,

    // Required attributes for sign up
    requiredAttributes: ['email'],

    // Optional attributes
    optionalAttributes: ['given_name', 'family_name', 'phone_number'],

    // Email settings
    emailSettings: {
      emailMessage: 'Your verification code is {####}',
      emailSubject: 'Your MyWeb verification code',
    },
  },

  // Sign in configuration
  signInConfig: {
    // Allow users to sign in with email
    allowedSignInMethods: ['email'],

    // Multi-factor authentication
    mfaConfiguration: 'OFF', // 'OFF' | 'OPTIONAL' | 'REQUIRED'

    // Remember device settings
    deviceTracking: {
      challengeRequiredOnNewDevice: true,
      deviceOnlyRememberedOnUserPrompt: false,
    },
  },

  // Social providers (if you want to add them)
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
    facebook: {
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
    },
    // Add more providers as needed
  },
};

// Validation functions you can use
export const passwordValidation = {
  validatePassword: (password: string) => {
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};