import { getGroups } from "@/actions/group-actions";
import { GroupsTable } from "@/components/admin/groups-table";

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Groups Management</h1>
        <p className="text-gray-600 mt-2">Manage user groups and permissions</p>
      </div>
      
      <GroupsTable groups={groups} />
    </div>
  );
}