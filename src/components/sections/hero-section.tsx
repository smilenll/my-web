'use client';

import { ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
}

export function HeroSection({
  title = "Welcome to SmiL",
  subtitle = "Build amazing experiences with modern technology",
  description = "Create stunning web applications with our cutting-edge platform. Fast, secure, and scalable solutions for your business needs.",
  primaryAction = { text: "Get Started", href: "/contact" },
  secondaryAction = { text: "Learn More", href: "#features" }
}: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20" data-test="hero-section">
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Image
            src="/GreenSMiL.png"
            alt="Smilen Lyubenov"
            width={160}
            height={160}
            className="w-32 h-32 md:w-40 md:h-40 not-only:object-cover mx-auto"
            priority
          />

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground">
            {subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <a href={primaryAction.href} className="flex items-center space-x-2">
                <span>{primaryAction.text}</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              <a href={secondaryAction.href} className="flex items-center space-x-2">
                <PlayCircle className="h-5 w-5" />
                <span>{secondaryAction.text}</span>
              </a>
            </Button>
          </div>

          {/* Stats or Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-border/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}