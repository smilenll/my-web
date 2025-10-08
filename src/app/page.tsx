import {
  HeroSection,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  ContactSection,
} from '@/components/sections';

export default function PortfolioPage() {
  return (
    <>
      <HeroSection
        title="Smilen Lyubenov"
        subtitle="Full Stack Developer"
        description="Full-stack developer with experience in startup, product, and service companies. Skilled in visualizing complex data, optimizing system performance, and maintaining scalable architecture. Strong background in team collaboration, project planning, and mentoring."
        primaryAction={{ text: "Contact Me", href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` }}
        secondaryAction={{ text: "LinkedIn", href: "https://linkedin.com/in/smilenll/" }}
      />

      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}