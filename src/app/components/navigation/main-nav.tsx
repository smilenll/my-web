'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from '@/app/components/ui/navigation-menu';
import { ThemeToggle } from '../theme-toggle';
import { UserMenu } from '@/app/auth';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Portfolio', href: '/', testId: 'nav-portfolio' },
  { name: 'Contact Me', href: '/contact', testId: 'nav-contact-us' },
];

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const { isAdmin, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background when scrolled
      setIsScrolled(currentScrollY > 10);

      // Hide/show navigation based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navigationClass = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
    {
      'transform -translate-y-full': !isVisible,
      'bg-background/80 backdrop-blur-md border-b border-border': isScrolled,
      'bg-transparent': !isScrolled,
    }
  );

  return (
    <header className={navigationClass}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" data-test="site-logo">
          <Image
            src="/GreenSMiL.png"
            alt="SmiL Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="font-bold text-lg">SmiL</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-6">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md',
                      pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Admin Section */}
            {isAuthenticated && isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/admin"
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md',
                      pathname === '/admin'
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground'
                    )}
                  >
                    Admin
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle data-test="theme-toggle" />
          <UserMenu />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle data-test="theme-toggle-mobile" />
          <UserMenu />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-test="mobile-menu-button">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]" data-test="mobile-menu">
              <div className="flex flex-col space-y-4 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-test={`mobile-${item.testId}`}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md',
                      pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Admin Section */}
                {isAuthenticated && isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-test="mobile-nav-admin"
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md',
                      pathname === '/admin'
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground'
                    )}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}