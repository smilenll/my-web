import AdminPanel from './components/admin-panel';

export default function AdminPage() {
  // Auth check is handled by the AdminPanel component on the client side
  // This avoids server/client auth context synchronization issues

  return (
    <div className="min-h-screen pt-16">
      <AdminPanel />
    </div>
  );
}