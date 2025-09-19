import { HeroSection } from '@/app/components/hero-section';
import { ContentSection } from '@/app/components/content-section';
import { AdminSection } from '@/app/components/AdminSection';

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Welcome to MyWeb"
        subtitle="Build amazing experiences with modern technology"
        description="Create stunning web applications with our cutting-edge platform. Fast, secure, and scalable solutions for your business needs."
        primaryAction={{ text: "Get Started", href: "/contact" }}
        secondaryAction={{ text: "Learn More", href: "#features" }}
      />

      <ContentSection title="Our Features" className="bg-muted/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
          <div className="text-center p-6 rounded-lg bg-background border border-border">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">Optimized for speed and performance with modern web technologies.</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-background border border-border">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground text-xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-muted-foreground">Built with security best practices and enterprise-grade protection.</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-background border border-border">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground text-xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Responsive</h3>
            <p className="text-muted-foreground">Works perfectly on all devices and screen sizes.</p>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are building amazing applications with our platform.
            Start your journey today and see the difference.
          </p>

          {/* Admin-only section */}
          <AdminSection />
        </div>
      </ContentSection>
    </>
  );
}