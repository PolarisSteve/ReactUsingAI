'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { Address } from '@/types/address';
import { PhoneContact } from '@/types/phone';
import { userService } from '@/services/userService';
import AddressManager from '@/components/AddressManager';
import PhoneManager from '@/components/PhoneManager';

interface UserDetailProps {
  user: User;
  onEdit: () => void;
  onBack: () => void;
  onUserUpdated: () => void;
}

const UserDetail = ({ user: initialUser, onEdit, onBack, onUserUpdated }: UserDetailProps) => {
  const [user, setUser] = useState<User>(initialUser);
  const [activeTab, setActiveTab] = useState<'info' | 'addresses' | 'phones'>('info');

  useEffect(() => {
    // Refresh user data when component mounts or user changes
    const updatedUser = userService.getUserById(initialUser.id);
    if (updatedUser) {
      setUser(updatedUser);
    }
  }, [initialUser.id]);

  const refreshUser = () => {
    const updatedUser = userService.getUserById(user.id);
    if (updatedUser) {
      setUser(updatedUser);
      onUserUpdated();
    }
  };

  const handleAddressChange = () => {
    refreshUser();
  };

  const handlePhoneChange = () => {
    refreshUser();
  };

  const tabs = [
    { key: 'info' as const, label: 'User Info' },
    { key: 'addresses' as const, label: `Addresses (${user.addresses.length})` },
    { key: 'phones' as const, label: `Phone Numbers (${user.phoneContacts.length})` },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user.firstName} {user.middleInitial ? `${user.middleInitial}. ` : ''}{user.lastName}
          </h2>
          <p className="text-sm text-gray-500">User Details</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Edit User
          </button>
          <button
            onClick={onBack}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Back to List
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.firstName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.lastName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Initial</label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.middleInitial || 'N/A'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.age}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Addresses</label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.addresses.length}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Phone Numbers</label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.phoneContacts.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <AddressManager
            userId={user.id}
            addresses={user.addresses}
            onChange={handleAddressChange}
          />
        )}

        {activeTab === 'phones' && (
          <PhoneManager
            userId={user.id}
            phoneContacts={user.phoneContacts}
            onChange={handlePhoneChange}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetail;
