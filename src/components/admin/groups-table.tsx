'use client';

import { useState } from 'react';
import { CognitoGroup, createGroup, deleteGroup, addUserToGroupAction } from '@/actions/group-actions';
import { getUsersAction } from '@/actions/user-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, UserPlus } from 'lucide-react';

interface GroupsTableProps {
  groups: CognitoGroup[];
}

export function GroupsTable({ groups: initialGroups }: GroupsTableProps) {
  const [groups, setGroups] = useState(initialGroups);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [addingUsersTo, setAddingUsersTo] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  const handleCreate = async (formData: FormData) => {
    const groupName = formData.get('groupName') as string;
    const description = formData.get('description') as string;
    
    setLoading('create');
    try {
      await createGroup(groupName, description);
      setIsCreateOpen(false);
      window.location.reload();
    } catch (error) {
      alert('Failed to create group');
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (groupName: string) => {
    if (!confirm(`Are you sure you want to delete group "${groupName}"?`)) return;
    
    setLoading(groupName);
    try {
      await deleteGroup(groupName);
      setGroups(groups.filter(g => g.groupName !== groupName));
    } catch (error) {
      alert('Failed to delete group');
    } finally {
      setLoading(null);
    }
  };

  const handleAddUsers = async (groupName: string) => {
    setAddingUsersTo(groupName);
    try {
      const { users } = await getUsersAction(60);
      setUsers(users);
    } catch (error) {
      alert('Failed to load users');
    }
  };

  const handleAddUserToGroup = async (username: string) => {
    if (!addingUsersTo) return;
    
    setLoading('addUser');
    try {
      await addUserToGroupAction(username, addingUsersTo);
      alert('User added to group successfully');
    } catch (error) {
      alert('Failed to add user to group');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Groups ({groups.length})</h2>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              <Input name="groupName" placeholder="Group name (e.g., admin, user)" required />
              <Input name="description" placeholder="Description (optional)" />
              <Button type="submit" disabled={loading === 'create'}>
                {loading === 'create' ? 'Creating...' : 'Create Group'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">Group Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Users</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.groupName} className="border-t">
                <td className="px-4 py-3">
                  <Badge variant="outline">{group.groupName}</Badge>
                </td>
                <td className="px-4 py-3">{group.description || 'No description'}</td>
                <td className="px-4 py-3">{group.userCount}</td>
                <td className="px-4 py-3">
                  {new Date(group.creationDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddUsers(group.groupName)}
                      disabled={loading === group.groupName}
                    >
                      <UserPlus className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(group.groupName)}
                      disabled={loading === group.groupName}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addingUsersTo && (
        <Dialog open={!!addingUsersTo} onOpenChange={() => setAddingUsersTo(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Users to {addingUsersTo}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div key={user.username} className="flex justify-between items-center p-2 border rounded">
                  <span>{user.email}</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddUserToGroup(user.username)}
                    disabled={loading === 'addUser'}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}