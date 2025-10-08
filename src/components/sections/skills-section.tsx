import { ContentSection } from './content-section';
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
  { name: 'Postman', logo: '/technologies/postman.svg', website: 'https://www.postman.com/' },
];

const toolsTechnologies = [
  { name: 'Docker', logo: '/technologies/docker.svg', website: 'https://www.docker.com/' },
  { name: 'AWS', logo: '/technologies/aws.svg', website: 'https://aws.amazon.com/' },
  { name: 'JIRA', logo: '/technologies/jira.svg', website: 'https://www.atlassian.com/software/jira' },
  { name: 'Cloudflare', logo: '/technologies/cloudflare.svg', website: 'https://www.cloudflare.com/' },
  { name: 'Git', logo: '/technologies/git.svg', website: 'https://git-scm.com/' },
  { name: 'Linux', logo: '/technologies/linux.svg', website: 'https://www.linux.org/' },
  { name: 'Figma', logo: '/technologies/figma.svg', website: 'https://www.figma.com/' },
  { name: 'Claude Code', logo: '/technologies/claude.png', website: 'https://docs.claude.com/en/docs/claude-code' },
  { name: 'Cursor', logo: '/technologies/cursor.svg', website: 'https://cursor.com/' },
];

export function SkillsSection() {
  return (
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
  );
}
