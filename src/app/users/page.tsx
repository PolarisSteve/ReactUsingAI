'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { userService } from '@/services/userService';
import UserList from '@/components/UserList';
import UserForm from '@/components/UserForm';
import UserDetail from '@/components/UserDetail';

type View = 'list' | 'add' | 'edit' | 'detail';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    const userData = userService.getAllUsers();
    setUsers(userData);
    setLoading(false);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setCurrentView('add');
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView('edit');
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView('detail');
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      userService.deleteUser(userId);
      loadUsers();
    }
  };

  const handleUserSaved = () => {
    loadUsers();
    setCurrentView('list');
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage users, their addresses, and phone contacts</p>
      </div>

      {currentView === 'list' && (
        <UserList
          users={users}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          onViewUser={handleViewUser}
          onDeleteUser={handleDeleteUser}
        />
      )}

      {(currentView === 'add' || currentView === 'edit') && (
        <UserForm
          user={selectedUser}
          onSave={handleUserSaved}
          onCancel={handleCancel}
        />
      )}

      {currentView === 'detail' && selectedUser && (
        <UserDetail
          user={selectedUser}
          onEdit={() => handleEditUser(selectedUser)}
          onBack={handleCancel}
          onUserUpdated={loadUsers}
        />
      )}
    </div>
  );
};

export default UsersPage;
