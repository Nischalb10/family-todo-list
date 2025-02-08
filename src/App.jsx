import React, { useState } from 'react';
import { Users, Plus, Menu, Trash2, Flashlight } from 'lucide-react';
import TodoList from './components/TodoList';
import AddFamilyMember from './components/AddFamilyMember';

function App() {
  const [selectedMember, setSelectedMember] = useState(() => {
    const members = JSON.parse(localStorage.getItem('familyMembers') || '["Mom", "Dad", "Son"]');
    return members[0];
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  
  const [familyMembers, setFamilyMembers] = useState(() => {
    return JSON.parse(localStorage.getItem('familyMembers') || '["Mom", "Dad", "Son"]');
  });

  const addFamilyMember = (name) => {
    const newMembers = [...familyMembers, name];
    setFamilyMembers(newMembers);
    localStorage.setItem('familyMembers', JSON.stringify(newMembers));
    setIsAddMemberOpen(false);
  };

  const deleteFamilyMember = (memberToDelete) => {
    // Remove member from the list
    const newMembers = familyMembers.filter(member => member !== memberToDelete);
    setFamilyMembers(newMembers);
    localStorage.setItem('familyMembers', JSON.stringify(newMembers));

    // Remove member's todo list from localStorage
    localStorage.removeItem(`todos-${memberToDelete}`);

    // If the deleted member was selected, select the first available member
    if (selectedMember === memberToDelete) {
      setSelectedMember(newMembers[0] || '');
    }

    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-brand">
              <Users size={24} />
              <span>Family Tasks</span>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="nav-menu-button"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Family Member Selection Menu */}
      {isMenuOpen && (
        <div className="menu">
          {familyMembers.map((member) => (
            <div key={member} className="menu-item-container">
              <button
                onClick={() => {
                  setSelectedMember(member);
                  setIsMenuOpen(false);
                }}
                className={`menu-item ${selectedMember === member ? 'selected' : ''}`}
              >
                {member}
              </button>
              <button
                onClick={() => deleteFamilyMember(member)}
                className="delete-member-button"
                title={`Delete ${member}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setIsAddMemberOpen(true);
              setIsMenuOpen(false);
            }}
            className="menu-item add-member"
          >
            <Plus size={16} />
            Add Family Member
          </button>
        </div>
      )}

      {/* Add Family Member Modal */}
      {isAddMemberOpen && (
        <AddFamilyMember
          onAdd={addFamilyMember}
          onClose={() => setIsAddMemberOpen(false)}
        />
      )}

      {/* Todo List */}
      <main className="main">
        {selectedMember ? (
          <TodoList selectedMember={selectedMember} />
        ) : (
          <div className="empty-family">
            <p>No family members. Add a family member to get started!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;