import { ContentSection } from '@/app/components/content-section';
import AdminPanel from '@/app/admin/components/AdminPanel';

export default function AdminPage() {
  // Auth check is handled by the AdminPanel component on the client side
  // This avoids server/client auth context synchronization issues

  return (
    <div className="pt-20 pb-16">
      <ContentSection title="Admin Dashboard">
        <AdminPanel />
      </ContentSection>
    </div>
  );
}