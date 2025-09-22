# Amplify Authenticator Configuration Guide

## 📋 Basic Configuration Options

### 1. **Core Props**
```tsx
<Authenticator
  // Control sign up visibility
  hideSignUp={false} // true to hide sign up tab

  // Layout variation
  variation="default" // "default" | "modal"

  // Initial state
  initialState="signIn" // "signIn" | "signUp"

  // Login methods
  loginMechanisms={['email']} // ['email', 'username', 'phone_number']

  // Required sign up attributes
  signUpAttributes={['email']} // ['email', 'phone_number', 'given_name', etc.]

  // Social providers (if configured)
  socialProviders={['google', 'facebook']}
/>
```

### 2. **Custom Form Fields**
```tsx
const formFields = {
  signIn: {
    email: {
      placeholder: 'Enter your email',
      label: 'Email Address',
    },
    password: {
      placeholder: 'Enter your password',
      label: 'Password',
    },
  },
  signUp: {
    email: {
      order: 1,
      placeholder: 'Enter your email',
      label: 'Email *',
      required: true,
    },
    password: {
      order: 2,
      placeholder: 'Create password (min 8 chars)',
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
      placeholder: 'First name',
      label: 'First Name',
      required: false,
    },
    family_name: {
      order: 5,
      placeholder: 'Last name',
      label: 'Last Name',
      required: false,
    },
  },
};

<Authenticator formFields={formFields} />
```

### 3. **Custom Components**
```tsx
const components = {
  Header() {
    return <div>Custom Header</div>;
  },
  Footer() {
    return <div>Custom Footer</div>;
  },
  SignIn: {
    Header() {
      return <h2>Sign In to MyWeb</h2>;
    },
    Footer() {
      return <p>Need help? Contact support</p>;
    },
  },
  SignUp: {
    Header() {
      return <h2>Create Your Account</h2>;
    },
    Footer() {
      return <p>Already have an account?</p>;
    },
  },
};

<Authenticator components={components} />
```

### 4. **Theming with CSS Variables**
```css
/* Custom CSS for Authenticator */
.amplify-authenticator {
  --amplify-colors-font-primary: hsl(var(--foreground));
  --amplify-colors-background-primary: hsl(var(--background));
  --amplify-colors-brand-primary-80: hsl(var(--primary));
  --amplify-colors-brand-primary-90: hsl(var(--primary));
  --amplify-colors-brand-primary-100: hsl(var(--primary));
  --amplify-radii-small: calc(var(--radius) - 2px);
  --amplify-radii-medium: var(--radius);
}

.amplify-button--primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.amplify-input {
  border-color: hsl(var(--border));
  background-color: hsl(var(--background));
}
```

### 5. **Theme Provider Integration**
```tsx
import { ThemeProvider, Theme } from '@aws-amplify/ui-react';

const customTheme: Theme = {
  name: 'my-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: 'hsl(var(--primary)/0.1)',
          80: 'hsl(var(--primary)/0.8)',
          90: 'hsl(var(--primary)/0.9)',
          100: 'hsl(var(--primary))',
        },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
        },
      },
    },
  },
};

<ThemeProvider theme={customTheme}>
  <Authenticator />
</ThemeProvider>
```

## 🔧 Advanced Configuration

### **Password Requirements**
Configure in AWS Cognito User Pool:
- Minimum length
- Require uppercase/lowercase
- Require numbers
- Require special characters

### **Email Templates**
Configure in AWS Cognito:
- Verification email subject/body
- Password reset email
- Welcome email

### **Multi-Factor Authentication**
```tsx
// Configure in Cognito User Pool
// Then use in component:
<Authenticator
  mfaConfig={{
    smsEnabled: true,
    totpEnabled: true,
  }}
/>
```

### **Social Sign-In**
1. Configure providers in Cognito
2. Add to Authenticator:
```tsx
<Authenticator
  socialProviders={['google', 'facebook', 'amazon']}
/>
```

## 🎨 Styling Options

### **1. CSS Classes**
```css
/* Target specific elements */
.amplify-authenticator__container {
  /* Container styles */
}

.amplify-tabs__item {
  /* Tab styles */
}

.amplify-button--primary {
  /* Primary button styles */
}
```

### **2. CSS-in-JS with Theme**
```tsx
const theme = {
  tokens: {
    components: {
      authenticator: {
        router: {
          boxShadow: 'none',
          borderWidth: '1px',
        },
      },
      button: {
        primary: {
          backgroundColor: 'blue',
        },
      },
    },
  },
};
```

### **3. Custom CSS Variables**
```css
:root {
  --amplify-colors-brand-primary-100: #your-color;
  --amplify-radii-medium: 8px;
  --amplify-space-medium: 1rem;
}
```

## 📝 Implementation Examples

Check the following files in your project:
- `/src/components/auth/CustomAuthenticator.tsx` - Themed version
- `/src/components/auth/AuthenticatorWithCustomFields.tsx` - Custom fields
- `/src/config/auth-config.ts` - Configuration reference
- `/src/app/auth/auth-dialog.tsx` - Current implementation

## 🚀 Quick Tips

1. **Better UX**: Use `initialState="signIn"` for returning users
2. **Security**: Always validate on the backend, not just frontend
3. **Accessibility**: Custom labels improve screen reader support
4. **Performance**: Import only needed Authenticator styles
5. **Testing**: Use `variation="default"` for easier E2E testing