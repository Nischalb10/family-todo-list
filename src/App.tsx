import React, { useState } from 'react';
import { Users, Plus, Menu } from 'lucide-react';
import TodoList from './components/TodoList';
import AddFamilyMember from './components/AddFamilyMember';

function App() {
  const [selectedMember, setSelectedMember] = useState<string>(() => {
    const members = JSON.parse(localStorage.getItem('familyMembers') || '["Mom", "Dad", "Son"]');
    return members[0];
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  
  const [familyMembers, setFamilyMembers] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('familyMembers') || '["Mom", "Dad", "Son"]');
  });

  const addFamilyMember = (name: string) => {
    const newMembers = [...familyMembers, name];
    setFamilyMembers(newMembers);
    localStorage.setItem('familyMembers', JSON.stringify(newMembers));
    setIsAddMemberOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Family Tasks</span>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Family Member Selection Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {familyMembers.map((member) => (
              <button
                key={member}
                onClick={() => {
                  setSelectedMember(member);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedMember === member
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {member}
              </button>
            ))}
            <button
              onClick={() => {
                setIsAddMemberOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-indigo-600 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Family Member
            </button>
          </div>
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TodoList selectedMember={selectedMember} />
      </main>
    </div>
  );
}

export default App;