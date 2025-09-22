'use client';

import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { User, LogOut } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

interface AuthDialogProps {
  children: React.ReactNode;
}

export function AuthDialog({ children }: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();


  // If user is authenticated, show simple profile
  if (isAuthenticated && user) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-medium">{user.username}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // If not authenticated, show simple auth form
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>

        <Authenticator hideSignUp={false} />
      </DialogContent>
    </Dialog>
  );
}