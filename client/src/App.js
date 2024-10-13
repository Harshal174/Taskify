import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import Login from './components/auth/Login';
import Homepage from './components/pages/Homepage';
import Signup from './components/auth/Signup';
import ListManager from './components/dashboard/ListManager';
import Sidebar from './components/dashboard/Sidebar'; // Import your Sidebar component
import Header from './components/pages/Header';
import Profile from './components/pages/Profile';

function App() {
  const { isOpen, onToggle } = useDisclosure(); // Manage sidebar state
  return (
    <Router>
      <Header onToggleSidebar={onToggle} /> {/* Pass toggle function to Header */}
      <Sidebar 
        lists={[{ id: 1, name: 'Task List 1' }, { id: 2, name: 'Task List 2' }]} // Example lists
        currentListId={1} // Example current list ID
        onSwitchList={(id) => console.log(`Switched to list ${id}`)} // Example switch list function
        onDeleteList={(id) => console.log(`Deleted list ${id}`)} // Example delete list function
        onAddTask={() => console.log('Add Task')} // Example add task function
        onOpenListModal={() => console.log('Open List Modal')} // Example open list modal function
        isOpen={isOpen} // Pass isOpen state to Sidebar
      />
      <Routes>
      <Route path='/' Component={Homepage} />
      <Route path='/login' Component={Login} />
      <Route path='/signup' Component={Signup} />
      <Route path="/profile" Component={Profile} />
      <Route path='/listmanager' Component={ListManager} />
      </Routes>
    </Router>
  );
}

export default App;
