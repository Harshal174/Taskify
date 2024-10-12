import React from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { FaPlus} from 'react-icons/fa';

function Sidebar({ lists, currentListId, onSwitchList, onDeleteList, onAddTask, onOpenListModal }) {
  return (
    <Box 
      width="250px" 
      height="calc(100vh - 50px)" // Adjust height based on header height
      bg="gray.100" 
      p={4} 
      position="fixed"
      top="50px" // Start from below the header
      boxShadow="md"
      mt="22px"
      zIndex={1}
    >
      <VStack spacing={4} align="stretch">
        {/* Create Task Button */}
        <Button 
          leftIcon={<FaPlus style={{ fontSize: '25px', color: 'white' }} />} // Larger icon
          colorScheme="teal" 
          borderRadius="full" 
          width="full"
          onClick={onAddTask} // Open task modal
          mt="50px"
        >
          Create
        </Button>


        <Heading as="h4" size="md">My Lists</Heading>
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
              {/* Delete button for non-default lists
              {list.id !== lists[0].id && (
                <IconButton 
                  icon={<FaTrash />} 
                  aria-label="Delete List" 
                  onClick={() => onDeleteList(list.id)} 
                  colorScheme="red"
                />
              )} */}
            </Box>
          ))}
        </VStack>
        
        {/* Button to open modal for adding a new list */}
        <Button 
          leftIcon={<FaPlus />} 
          colorScheme="blue" // Different color scheme for this button
          variant="outline" // Make it outlined for distinction
          onClick={onOpenListModal} // Function to open list modal
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