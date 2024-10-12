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
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi'
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
  const [selectedListForTask, setSelectedListForTask] = useState(currentListId); // Track selected list for task
  
  const handleAddList = () => {
    if (newListName.trim()) {
      const newList = { id: Date.now(), name: newListName, tasks: [] };
      setLists([...lists, newList]);
      setNewListName('');
      setCurrentListId(newList.id); // Automatically set the new list as the current list
      setSelectedListForTask(newList.id); // Sync selected list for task modal
      setIsListModalOpen(false); // Close modal
    }
  };

  const handleSwitchList = (id) => {
    setCurrentListId(id);
    setSelectedListForTask(id); // Sync selected list for task modal
  };

  const handleDeleteList = (id) => {
    if (id !== lists[0].id) {
      setLists(lists.filter(list => list.id !== id));
      if (currentListId === id) {
        setCurrentListId(lists[0].id);
        setSelectedListForTask(lists[0].id); // Sync selected list for task modal
      }
    }
  };

  const handleAddTask = (taskText) => {
    if (taskText.trim()) {
      const updatedLists = lists.map(list => {
        if (list.id === currentListId) { // Add to current list
          return { 
            ...list, 
            tasks: [...list.tasks, { id: Date.now(), text: taskText, completed: false }] 
          };
        }
        return list;
      });
      setLists(updatedLists);
      setNewTaskName(''); // Clear task input after adding
    }
  };

  const handleModalAddTask = () => {
    if (newTaskName.trim()) {
      const updatedLists = lists.map(list => {
        if (list.id === selectedListForTask) { // Use selected list for task in modal
          return {
            ...list,
            tasks: [...list.tasks, { id: Date.now(), text: newTaskName, completed: false }]
          };
        }
        return list;
      });
      setLists(updatedLists);
      setNewTaskName('');
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
    <Box display="flex" overflow="auto">
      
      {/* Sidebar */}
      <Sidebar 
        lists={lists}
        currentListId={currentListId}
        onSwitchList={handleSwitchList}
        onDeleteList={handleDeleteList}
        onAddTask={() => setIsTaskModalOpen(true)} // Open task modal
        onOpenListModal={() => setIsListModalOpen(true)} // Open list modal
      />

      {/* Main Content Area */}
      <Box marginLeft="250px" width="100%" p={5} mt={5}>
        <Box width="100%" p={5} mt={5}>
          <Flex 
            direction="row" 
            flexWrap="none" 
            justifyContent="flex-start" 
            gap={5} // Adjusts spacing between cards
            overflowX="none"
          >
            {lists.map(list => (
              <Box 
                key={list.id} 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                p={4}
                width="400px" // Fixed width for each card
                height="520px" // Maintain original height
                boxShadow="md"
                flexShrink={0} // Prevents cards from shrinking
              >
               <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Heading as="h3" size="md" mb={3}>{list.name}</Heading>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FiMoreVertical />}
                      variant="ghost"
                      aria-label="Options"
                      mb={2}
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleDeleteList(list.id)}><FaTrash style={{ marginRight: '8px' }} />Delete List</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
                <Box maxH="420px" overflowY="auto" borderWidth="1px" borderRadius="md" p={4}>
                  <TodoList 
                    tasks={list.tasks} 
                    onAddTask={handleAddTask}
                    onDeleteTask={handleDeleteTask}
                    onToggleTask={handleToggleTask}
                    onEditTask={handleEditTask}
                  />
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
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
              value={selectedListForTask} // Bind to selectedListForTask state              
              onChange={(e) => setSelectedListForTask(Number(e.target.value))} // Update selected list for task
            >
              {lists.map(list => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleModalAddTask}>
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
