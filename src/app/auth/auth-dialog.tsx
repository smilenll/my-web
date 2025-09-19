'use client';

import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { User, LogOut, Settings, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
import { Button } from '@/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface AuthDialogProps {
  children: React.ReactNode;
}

export function AuthDialog({ children }: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [wasAuthenticatedOnOpen, setWasAuthenticatedOnOpen] = useState(false);
  const { user, isAuthenticated, signOut, getUserGroups, isAdmin } = useAuth();

  // Track authentication state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setWasAuthenticatedOnOpen(isAuthenticated);
    }
  }, [isOpen, isAuthenticated]);

  // Close dialog when user becomes authenticated (only if they weren't authenticated when opening)
  useEffect(() => {
    if (isAuthenticated && isOpen && !wasAuthenticatedOnOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 500); // Slightly longer delay to ensure smooth UX
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isOpen, wasAuthenticatedOnOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isAuthenticated && user) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>User Profile</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 space-y-6 py-2">
            {/* User Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate">{user.username}</h3>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>

              {/* User Groups/Roles */}
              <div className="bg-muted/30 p-3 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Groups</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {getUserGroups().length > 0 ? (
                    getUserGroups().map((group) => (
                      <span
                        key={group}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          group === 'admin'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}
                      >
                        {group}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No groups assigned</span>
                  )}
                </div>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 p-3 rounded-lg text-center border">
                  <div className="text-base font-semibold">
                    {isAdmin ? 'Admin' : 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground">Role</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center border">
                  <div className="text-base font-semibold font-mono">{user.userId.slice(-6)}</div>
                  <div className="text-xs text-muted-foreground">User ID</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions - Fixed at bottom */}
          <div className="border-t pt-4 space-y-3 flex-shrink-0">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                setIsOpen(false);
                // Add navigation to settings page if needed
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>

            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Show authentication form for non-authenticated users
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Welcome to MyWeb</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-2">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            <Authenticator
              hideSignUp={false}
              variation="modal"
            >
            {({ signOut: amplifySignOut }) => {
              // Use the amplify signOut if available, otherwise use our hook
              const handleAmplifySignOut = () => {
                if (amplifySignOut) {
                  amplifySignOut();
                }
                setIsOpen(false);
              };

              return (
                <div className="text-center p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Authentication successful! The dialog will close automatically.
                  </p>
                  <Button onClick={handleAmplifySignOut} variant="outline" size="sm">
                    Sign Out
                  </Button>
                </div>
              );
            }}
            </Authenticator>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
