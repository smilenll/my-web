export default function AdminPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the administration panel</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,247</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-2">Active Sessions</h3>
          <p className="text-3xl font-bold text-green-600">89</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-2">System Status</h3>
          <p className="text-3xl font-bold text-green-600">Online</p>
        </div>
      </div>
    </div>
  );
}