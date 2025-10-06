import { HeroSection, ContentSection } from '@/components/sections';
import { AdminSection } from '@/app/components/admin-section';
import { SkillCard } from '@/components/ui/skill-card';

const frontendTechnologies = [
  { name: 'TypeScript', logo: '/technologies/typescript.svg', website: 'https://www.typescriptlang.org/' },
  { name: 'JavaScript', logo: '/technologies/javascript.svg', website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'React', logo: '/technologies/react.svg', website: 'https://react.dev/' },
  { name: 'Angular', logo: '/technologies/angular.svg', website: 'https://angular.dev/' },
  { name: 'Jest', logo: '/technologies/jest.svg', website: 'https://jestjs.io/' },
  { name: 'Vitest', logo: '/technologies/vitest.svg', website: 'https://vitest.dev/' },
  { name: 'HTML', logo: '/technologies/html.svg', website: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', logo: '/technologies/css.svg', website: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
];

const backendTechnologies = [
  { name: 'Go', logo: '/technologies/go.svg', website: 'https://go.dev/' },
  { name: 'PHP', logo: '/technologies/php.svg', website: 'https://www.php.net/' },
  { name: 'NestJS', logo: '/technologies/nestjs.svg', website: 'https://nestjs.com/' },
  { name: 'Laravel', logo: '/technologies/laravel.svg', website: 'https://laravel.com/' },
  { name: 'Next.js', logo: '/technologies/nextjs.svg', website: 'https://nextjs.org/' },
  { name: 'MySQL', logo: '/technologies/mysql.svg', website: 'https://www.mysql.com/' },
  { name: 'PostgreSQL', logo: '/technologies/postgresql.svg', website: 'https://www.postgresql.org/' },
  { name: 'Node.js', logo: '/technologies/nodejs.svg', website: 'https://nodejs.org/' },
];

const toolsTechnologies = [
  { name: 'Docker', logo: '/technologies/docker.svg', website: 'https://www.docker.com/' },
  { name: 'AWS', logo: '/technologies/aws.svg', website: 'https://aws.amazon.com/' },
   { name: 'JIRA', logo: '/technologies/jira.svg', website: 'https://www.atlassian.com/software/jira' },
  { name: 'Cloudflare', logo: '/technologies/cloudflare.svg', website: 'https://www.cloudflare.com/' },
  { name: 'Git', logo: '/technologies/git.svg', website: 'https://git-scm.com/' },
  { name: 'Linux', logo: '/technologies/linux.svg', website: 'https://www.linux.org/' },
   { name: 'Claude Code', logo: '/technologies/claude.png', website: 'https://docs.claude.com/en/docs/claude-code' },
  { name: 'Cursor', logo: '/technologies/cursor.svg', website: 'https://cursor.com/' },

];

export default function PortfolioPage() {
  return (
    <>
      <HeroSection
        title="Smilen Lyubenov"
        subtitle="Full Stack Developer"
        description="Full-stack developer with experience in startup, product, and service companies. Skilled in visualizing complex data, optimizing system performance, and maintaining scalable architecture. Strong background in team collaboration, project planning, and mentoring."
        primaryAction={{ text: "Contact Me", href: "mailto:smilenlyubenov@gmail.com" }}
        secondaryAction={{ text: "LinkedIn", href: "https://linkedin.com/in/smilenll/" }}
      />

      <ContentSection title="Skills" className="bg-muted/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
          <SkillCard
            icon="💻"
            title="Front-end"
            technologies={frontendTechnologies}
          />

          <SkillCard
            icon="⚙️"
            title="Back-end"
            technologies={backendTechnologies}
          />

          <SkillCard
            icon="🔧"
            title="Tools"
            technologies={toolsTechnologies}
          />
        </div>
      </ContentSection>

      <ContentSection title="Professional Experience">
        <div className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h3 className="text-xl font-semibold">Full Stack Developer</h3>
              <span className="text-sm text-muted-foreground">June 2024 - July 2025</span>
            </div>
            <p className="text-primary font-medium mb-3">Dermatic Health - Boston, MA, USA</p>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>• Building mobile and web apps from UI designs, ensuring smooth user experience</li>
              <li>• Integrating third-party identity APIs to authenticate and manage users, groups, and permissions</li>
              <li>• Owning a core system enabling users to create complex custom forms for data collection</li>
              <li>• Developing APIs to manage data and automate workflows effectively</li>
              <li>• Migrating to React Native, enhancing mobile performance and UX</li>
            </ul>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h3 className="text-xl font-semibold">Senior Fullstack Developer</h3>
              <span className="text-sm text-muted-foreground">February 2019 - May 2024</span>
            </div>
            <p className="text-primary font-medium mb-3">AtScale - Boston, MA, USA</p>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>• Owning core integration tools, connecting AtScale and third-party systems</li>
              <li>• Creating test plans and implementing automated tests to enable CI/CD workflows</li>
              <li>• Acting as Deputy Team Leader, leading Agile ceremonies and mentoring junior developers</li>
              <li>• Collaborating cross-functionally with Engineering, DevOps, QA, and Data Science teams</li>
            </ul>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h3 className="text-xl font-semibold">Full Stack Developer</h3>
              <span className="text-sm text-muted-foreground">January 2017 - September 2018</span>
            </div>
            <p className="text-primary font-medium mb-3">Next-Stream - Sofia, Bulgaria</p>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>• Developing data APIs and optimizing system structure</li>
              <li>• Reduced build time by 15% through system deployment distribution</li>
              <li>• Integrating external services</li>
            </ul>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h3 className="text-xl font-semibold">Co-founder & Full Stack Developer</h3>
              <span className="text-sm text-muted-foreground">October 2017 - December 2023</span>
            </div>
            <p className="text-primary font-medium mb-3">Web4U - Sofia, Bulgaria</p>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>• Building a user-friendly client-side interfaces for 10+ projects</li>
              <li>• Developing eCommerce web applications and CRMs using the MVC design pattern</li>
              <li>• Participating in project planning and estimations</li>
              <li>• Communicating with clients</li>
              <li>• Designing front-end, back-end, and databases</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Education & Certifications" className="bg-muted/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Telerik Academy</h4>
                <p className="text-sm text-muted-foreground">Software Development Certification</p>
                <p className="text-xs text-muted-foreground">January 2018 - February 2019</p>
              </div>
              <div>
                <h4 className="font-medium">Technical University of Varna</h4>
                <p className="text-sm text-muted-foreground">Bachelor&apos;s, Computer Science</p>
                <p className="text-xs text-muted-foreground">September 2013 - September 2017</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span className="text-sm">Meta UI/UX</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span className="text-sm">Meta React Advanced</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span className="text-sm">Meta React Native</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <span className="text-sm">EU Operational Program - Software Development</span>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Based in Atlanta, GA. Available for full-time opportunities and consulting projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:smilenlyubenov@gmail.com" className="text-primary hover:underline">
              📧 smilenlyubenov@gmail.com
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+16789946355" className="text-primary hover:underline">
              📱 +1 (678) 994-6355
            </a>
          </div>

          {/* Admin-only section */}
          <div className="mt-12">
            <AdminSection />
          </div>
        </div>
      </ContentSection>
    </>
  );
}