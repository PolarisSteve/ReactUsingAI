'use client';

import { useState } from 'react';
import { PhoneContact, CreatePhoneContactDto, UpdatePhoneContactDto, PhoneType, PHONE_TYPES } from '@/types/phone';
import { userService } from '@/services/userService';

interface PhoneManagerProps {
  userId: string;
  phoneContacts: PhoneContact[];
  onChange: () => void;
}

const PhoneManager = ({ userId, phoneContacts, onChange }: PhoneManagerProps) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<CreatePhoneContactDto>({
    areaCode: '',
    prefix: '',
    suffix: '',
    extension: '',
    type: 'Primary',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      areaCode: '',
      prefix: '',
      suffix: '',
      extension: '',
      type: 'Primary',
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.areaCode.trim()) {
      newErrors.areaCode = 'Area code is required';
    } else if (!/^\d{3}$/.test(formData.areaCode.trim())) {
      newErrors.areaCode = 'Area code must be 3 digits';
    }

    if (!formData.prefix.trim()) {
      newErrors.prefix = 'Prefix is required';
    } else if (!/^\d{3}$/.test(formData.prefix.trim())) {
      newErrors.prefix = 'Prefix must be 3 digits';
    }

    if (!formData.suffix.trim()) {
      newErrors.suffix = 'Suffix is required';
    } else if (!/^\d{4}$/.test(formData.suffix.trim())) {
      newErrors.suffix = 'Suffix must be 4 digits';
    }

    if (formData.extension && !/^\d+$/.test(formData.extension.trim())) {
      newErrors.extension = 'Extension must contain only digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    setIsAdding(true);
    resetForm();
  };

  const handleEdit = (phone: PhoneContact) => {
    setIsEditing(phone.id);
    setFormData({
      areaCode: phone.areaCode,
      prefix: phone.prefix,
      suffix: phone.suffix,
      extension: phone.extension || '',
      type: phone.type,
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const phoneData = {
      ...formData,
      extension: formData.extension?.trim() || undefined,
    };

    if (isAdding) {
      userService.addPhoneContact(userId, phoneData);
    } else if (isEditing) {
      const updateData: UpdatePhoneContactDto = {
        id: isEditing,
        ...phoneData,
      };
      userService.updatePhoneContact(updateData);
    }

    setIsAdding(false);
    setIsEditing(null);
    resetForm();
    onChange();
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    resetForm();
  };

  const handleDelete = (phoneId: string) => {
    if (confirm('Are you sure you want to delete this phone number?')) {
      userService.deletePhoneContact(phoneId);
      onChange();
    }
  };

  const handleInputChange = (field: keyof CreatePhoneContactDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPhoneNumber = (phone: PhoneContact): string => {
    let formatted = `(${phone.areaCode}) ${phone.prefix}-${phone.suffix}`;
    if (phone.extension) {
      formatted += ` ext. ${phone.extension}`;
    }
    return formatted;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Phone Numbers</h3>
        {!isAdding && !isEditing && (
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Add Phone Number
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && (
        <div className="bg-gray-50 rounded-lg p-4 border">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            {isAdding ? 'Add New Phone Number' : 'Edit Phone Number'}
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area Code *
                </label>
                <input
                  type="text"
                  value={formData.areaCode}
                  onChange={(e) => handleInputChange('areaCode', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.areaCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="212"
                  maxLength={3}
                />
                {errors.areaCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.areaCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prefix *
                </label>
                <input
                  type="text"
                  value={formData.prefix}
                  onChange={(e) => handleInputChange('prefix', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.prefix ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="555"
                  maxLength={3}
                />
                {errors.prefix && (
                  <p className="mt-1 text-sm text-red-600">{errors.prefix}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Suffix *
                </label>
                <input
                  type="text"
                  value={formData.suffix}
                  onChange={(e) => handleInputChange('suffix', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.suffix ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0123"
                  maxLength={4}
                />
                {errors.suffix && (
                  <p className="mt-1 text-sm text-red-600">{errors.suffix}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Extension
                </label>
                <input
                  type="text"
                  value={formData.extension}
                  onChange={(e) => handleInputChange('extension', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.extension ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1234"
                />
                {errors.extension && (
                  <p className="mt-1 text-sm text-red-600">{errors.extension}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as PhoneType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PHONE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                {isAdding ? 'Add Phone Number' : 'Update Phone Number'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Phone List */}
      {phoneContacts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No phone numbers found. Click "Add Phone Number" to create the first phone number.
        </div>
      ) : (
        <div className="space-y-4">
          {phoneContacts.map((phone) => (
            <div
              key={phone.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {formatPhoneNumber(phone)}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      phone.type === 'Primary' 
                        ? 'bg-green-100 text-green-800'
                        : phone.type === 'Secondary'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {phone.type}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(phone)}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                    disabled={isAdding || isEditing !== null}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(phone.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                    disabled={isAdding || isEditing !== null}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneManager;
