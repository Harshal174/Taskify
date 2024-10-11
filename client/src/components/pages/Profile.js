// src/components/pages/Profile.js
import React from 'react';
import {
  Box,
  Heading,
  Text,
  Avatar,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const Profile = () => {
  // Sample user data (you can replace this with actual data from your state or API)
  const user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    profileImage: 'https://bit.ly/broken-link', // Replace with actual image URL
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2">User Profile</Heading>

        {/* Profile Image */}
        <Avatar size="xl" name={user.username} src={user.profileImage} />

        {/* Username Field */}
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input value={user.username} readOnly />
        </FormControl>

        {/* Email Field */}
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input value={user.email} readOnly />
        </FormControl>

        {/* Edit Button (Optional) */}
        <Button colorScheme="teal" mt={4}>
          Edit Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;