# Family Todo List

A beautiful and intuitive todo list application designed for families, allowing each family member to maintain their own separate task list.

![Family Todo List](https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&q=80&w=1000)

## Features

### 🏠 Family Member Management
- Default family members (Mom, Dad, Son) included
- Add new family members through an intuitive modal interface
- Delete family members and their associated tasks
- Persistent storage of family member list
- Easy switching between family members via dropdown menu

### ✅ Todo List Features
- **Independent Storage**: Each family member has their own separate todo list
- **Task Management**:
  - Add new tasks
  - Mark tasks as complete/incomplete
  - Delete tasks with a single click
  - Clear all tasks option
- **Visual Feedback**:
  - Smooth animations
  - Hover effects
  - Clear completion status
  - Strike-through for completed tasks

### 💾 Data Persistence
- All data is stored in the browser's local storage
- Separate storage keys for family members list and individual todo lists
- Data persists across page refreshes and browser sessions
- Automatic cleanup of todo lists when deleting family members

### 🎨 UI/UX Features
- Modern, clean design with gradient background
- Responsive layout that works on all devices
- Intuitive navigation with clear visual hierarchy
- Smooth transitions and animations
- Accessible design with proper contrast and focus states

## Technologies Used

- **React**: Frontend framework
- **Lucide React**: Beautiful, consistent icons
- **Local Storage**: Browser-based data persistence
- **Vite**: Next-generation frontend tooling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd family-todo-list
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the provided local server URL

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage Guide

### Managing Family Members
1. Click the menu icon in the top right corner
2. To add a member:
   - Click "Add Family Member"
   - Enter the name in the modal
   - Click "Add Member" or press Enter
3. To delete a member:
   - Hover over the member's name in the menu
   - Click the trash icon that appears
   - The member and their tasks will be permanently removed

### Managing Tasks
1. Select a family member from the menu
2. Add new tasks using the input field at the top
3. Click the circle icon to mark tasks as complete
4. Hover over a task to reveal the delete button
5. Click the trash icon to delete a task

### Data Storage
- All data is stored locally in your browser
- Clearing browser data will reset the application
- Each family member's tasks are stored independently
- Deleting a family member also removes their tasks

## Project Structure

```
src/
├── components/
│   ├── AddFamilyMember.jsx   # New family member modal
│   └── TodoList.jsx          # Todo list component
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- Design inspired by modern UI/UX practices
- Built with [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)