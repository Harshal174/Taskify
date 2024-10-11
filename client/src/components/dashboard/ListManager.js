import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
} from '@chakra-ui/react';
import TodoList from './ToDoList'; // Import the TodoList component
import Sidebar from './Sidebar'; // Import the Sidebar component

function ListManager() {
  const [lists, setLists] = useState([{ id: Date.now(), name: 'My Tasks', tasks: [] }]);
  const [currentListId, setCurrentListId] = useState(lists[0].id);
  
  // Modal states
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const [newListName, setNewListName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  
  const handleAddList = () => {
    if (newListName.trim()) {
      const newList = { id: Date.now(), name: newListName, tasks: [] };
      setLists([...lists, newList]);
      setNewListName('');
      setIsListModalOpen(false); // Close modal
    }
  };

  const handleSwitchList = (id) => {
    setCurrentListId(id);
  };

  const handleDeleteList = (id) => {
    if (id !== lists[0].id) {
      setLists(lists.filter(list => list.id !== id));
      if (currentListId === id) {
        setCurrentListId(lists[0].id);
      }
    }
  };

  const handleAddTask = (taskText) => {
    if (taskText.trim()) {
      const updatedLists = lists.map(list => {
        if (list.id === currentListId) {
          return { 
            ...list, 
            tasks: [...list.tasks, { id: Date.now(), text: taskText, completed: false }] 
          };
        }
        return list;
      });
      setLists(updatedLists);
      setIsTaskModalOpen(false); // Close modal
    }
  };

  const handleToggleTask = (taskId) => {
    const updatedLists = lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          tasks: list.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const handleEditTask = (taskId, newText) => {
    const updatedLists = lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          tasks: list.tasks.map(task =>
            task.id === taskId ? { ...task, text: newText } : task
          ),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const handleDeleteTask = (taskId) => {
    const updatedLists = lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          tasks: list.tasks.filter(task => task.id !== taskId),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  return (
    <Box display="flex" mt="50px">
      
      {/* Sidebar */}
      <Sidebar 
        lists={lists}
        currentListId={currentListId}
        onSwitchList={(id) => handleSwitchList(id)}
        onDeleteList={(id) => handleDeleteList(id)}
        onAddTask={() => setIsTaskModalOpen(true)} // Open task modal
        onOpenListModal={() => setIsListModalOpen(true)} // Open list modal
      />

      {/* Main Content Area */}
      <Box marginLeft="250px" width="100%" p={5} mt={5}>
        <Heading as="h2" size="lg" mb={4}>Tasks in {lists.find(list => list.id === currentListId)?.name}</Heading>

        {/* Render TodoLists */}
        {lists.map(list =>
          list.id === currentListId && (
            <TodoList 
              key={list.id} 
              tasks={list.tasks} 
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onEditTask={handleEditTask}
            />
          )
        )}
      </Box>

      {/* Create New List Modal */}
      <Modal isOpen={isListModalOpen} onClose={() => setIsListModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="New List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddList}>
              Create List
            </Button>
            <Button variant="ghost" onClick={() => setIsListModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create New Task Modal */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Add Task"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            {/* Dropdown to select the list for the task */}
            <Select
              placeholder=""
              mt={3}
              value={currentListId}
              onChange={(e) => setCurrentListId(e.target.value)}
            >
              {lists.map(list => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={() => handleAddTask(newTaskName)}>
              Add Task
            </Button>
            <Button variant="ghost" onClick={() => setIsTaskModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
}

export default ListManager;