import React from 'react';
import { Box, Heading, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon
import { Link } from 'react-router-dom';
function Header() {
  const handleProfileClick = () => {
    // Functionality to be added later
    console.log("Profile button clicked");
  };

  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex alignItems="center">
        <Heading size="lg">TASKIFY</Heading>
        <Spacer />
        <Link to="/Profile">
        <IconButton
          icon={<FaUserCircle />} // Using the user icon
          aria-label="User Profile"
          variant="outline"
          colorScheme="whiteAlpha"
          onClick={handleProfileClick} // Adding click handler
        />
        </Link>
      </Flex>
    </Box>
  );
}

export default Header;