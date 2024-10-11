import React from 'react';
import { Box, Heading, Flex, Spacer } from '@chakra-ui/react';

function Header() {
  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex alignItems="center">
        <Heading size="lg">TASKIFY</Heading>
        <Spacer />
        {/* You can add additional buttons or icons here if needed */}
      </Flex>
    </Box>
  );
}

export default Header;