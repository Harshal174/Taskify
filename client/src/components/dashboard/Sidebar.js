import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FaPlus, FaCaretDown, FaTrash } from 'react-icons/fa';

function Sidebar({ lists, currentListId, onSwitchList, onDeleteList, onAddTask, onOpenListModal, isOpen }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Box 
      width="250px" 
      height="calc(100vh - 50px)" 
      bg="gray.100" 
      p={4} 
      position="fixed"
      top="50px" 
      boxShadow="md"
      mt="22px"
      zIndex={1}
      display={isOpen ? 'block' : 'none'} // Show or hide based on isOpen state
      >
      <VStack spacing={4} align="stretch">
        {/* Create Task Button */}
        <Button 
          leftIcon={<FaPlus style={{ fontSize: '20px', color: 'white' }} />}
          colorScheme="teal" 
          borderRadius="full" 
          width="full"
          onClick={onAddTask}
          mt="50px"
          
        >
          Create
        </Button>

        <Heading as="h4" size="md" display="flex" alignItems="center">
          Lists
          <Button onClick={toggleDropdown} variant="link" rightIcon={<FaCaretDown />} ml={-4}>
            {/* Dropdown Arrow */}
          </Button>
        </Heading>

        {/* Dropdown for Lists */}
        {isDropdownOpen && (
          <VStack spacing={2} align="stretch">
            {lists.map(list => (
              <Box key={list.id} display="flex" alignItems="center">
                <Button
                  onClick={() => onSwitchList(list.id)}
                  variant={currentListId === list.id ? 'solid' : 'outline'}
                  mr={2}
                  flexGrow={1}
                >
                  {list.name}
                </Button>
                {/* Delete button for non-default lists */}
                {/* {list.id !== lists[0].id && (
                  <IconButton 
                    icon={<FaTrash />} 
                    aria-label="Delete List" 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent menu closure when clicking delete
                      onDeleteList(list.id);
                    }} 
                    colorScheme="red"
                    size="sm"
                  />
                )} */}
              </Box>
            ))}
          </VStack>
        )}

        {/* Button to open modal for adding a new list */}
        <Button 
          leftIcon={<FaPlus />} 
          colorScheme="blue" 
          variant="outline" 
          onClick={onOpenListModal} 
          borderRadius="full"
          width="full"
        >
          New List
        </Button>
      </VStack>
    </Box>
  );
}

export default Sidebar;