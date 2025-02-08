import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddFamilyMember({ onAdd, onClose }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add Family Member</h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            className="modal-input"
          />
          
          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}