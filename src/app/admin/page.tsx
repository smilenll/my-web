import { notFound } from 'next/navigation';
import { PageLayout, ContentSection } from '@/shared';
import AdminPanel from '@/shared/AdminPanel';
import { userHasRole } from '@/lib/auth-server';

export default async function AdminPage() {
  // Server-side check for admin role
  const isAdmin = await userHasRole('admin');

  if (!isAdmin) {
    notFound();
  }

  return (
    <PageLayout>
      <div className="pt-20 pb-16">
        <ContentSection title="Admin Dashboard">
          <AdminPanel />
        </ContentSection>
      </div>
    </PageLayout>
  );
}