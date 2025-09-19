'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AdminPanel() {
  const { user, isAdmin, loading, getUserGroups } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to access this area.</div>;
  }

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  const userGroups = getUserGroups();

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <p className="mb-2">Welcome, {user.email}!</p>
      <p className="mb-2">Groups: {userGroups.join(', ')}</p>
      <p className="mb-4">You have admin privileges with full CRUD access.</p>

      <div className="space-y-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Manage Users
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
          System Settings
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 ml-2">
          Database Operations
        </button>
      </div>
    </div>
  );
}