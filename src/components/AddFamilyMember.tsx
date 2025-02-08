import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddFamilyMemberProps {
  onAdd: (name: string) => void;
  onClose: () => void;
}

export default function AddFamilyMember({ onAdd, onClose }: AddFamilyMemberProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add Family Member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}