import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Input,
  Button,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaEllipsisV } from 'react-icons/fa';

function TodoList({ tasks, onAddTask, onDeleteTask, onToggleTask, onEditTask }) {
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleAddTask = () => {
    if (taskInput.trim()) {
      onAddTask(taskInput); // Call the function passed as a prop to add a new task
      setTaskInput(''); // Clear input field after adding
    }
  };

  const handleUpdateTask = () => {
    if (editInput.trim()) {
      onEditTask(editTaskId, editInput); // Call edit function passed as a prop
      setEditTaskId(null); // Clear edit state
      setEditInput(''); // Clear input field after updating
    }
  };

  return (
    <Box mt={5}>
      <VStack spacing={4} mb={4} align="stretch"> {/* Use VStack for vertical stacking */}
    <Input
      placeholder="Add a new task"
      value={taskInput}
      onChange={(e) => setTaskInput(e.target.value)}
    />
    <Button colorScheme="teal" onClick={handleAddTask}>Add Task</Button>
  </VStack>

      <List spacing={3}>
        {tasks.length === 0 ? (
          <ListItem>No tasks available. Please add a task.</ListItem>
        ) : (
          tasks.map(task => (
            <ListItem key={task.id} display="flex" alignItems="center">
              <Checkbox 
                isChecked={task.completed} 
                onChange={() => onToggleTask(task.id)} // Call toggle function passed as a prop
                mr={3}
              />
              {editTaskId === task.id ? (
                <>
                  <Input
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    placeholder="Edit your task"
                    size="sm"
                    mr={3}
                  />
                  <Button colorScheme="teal" onClick={handleUpdateTask}>Update</Button>
                </>
              ) : (
                <>
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.text}
                  </span>
                  {/* Vertical Ellipsis Menu */}
                  <Menu>
                    <MenuButton as={IconButton} icon={<FaEllipsisV />} aria-label="Options" ml="auto" />
                    <MenuList>
                      <MenuItem 
                        icon={<FaEdit />} 
                        onClick={() => { 
                          setEditTaskId(task.id); 
                          setEditInput(task.text); 
                        }}
                      >
                        Edit Task
                      </MenuItem>
                      <MenuItem 
                        icon={<FaTrash />} 
                        color="red.500"
                        onClick={() => onDeleteTask(task.id)} // Call delete function passed as a prop
                      >
                        Delete Task
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}

export default TodoList;
