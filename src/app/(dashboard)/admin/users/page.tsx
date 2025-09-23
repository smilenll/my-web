import UserList from '../components/user-list';

export default function UsersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-600 mt-2">View and manage all users in the system</p>
      </div>
      <UserList />
    </div>
  );
}