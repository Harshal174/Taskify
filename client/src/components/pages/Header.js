import React,{useState,useEffect} from 'react';
import { Box, Heading, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa'; 
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [showProfileButton, setShowProfileButton] = useState(true);

  useEffect(() => {
    if (location.pathname === "/signup" || location.pathname === "/") {
      setShowProfileButton(false);
    } else {
      setShowProfileButton(true);
    }
  }, [location.pathname]);

  const handleProfileClick = () => {
    console.log("Profile button clicked");
  };

  const isListManagerPage = location.pathname === "/listmanager";

  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex alignItems="center" position="sticky" width="100%" >
        {isListManagerPage && (
          <IconButton
            icon={<RxHamburgerMenu />}
            aria-label="Open Menu"
            colorScheme="teal"
            _hover={{ bg: "teal.600" }}
            marginRight={"14px"}
          />
        )}
        <Heading size="lg">TASKIFY</Heading>
        <Spacer />
        {showProfileButton && (
          <Link to="/Profile">
            <IconButton
              icon={<FaUserCircle />} 
              aria-label="User Profile"
              variant="outline"
              colorScheme="whiteAlpha"
              onClick={handleProfileClick} 
            />
          </Link>
        )}
      </Flex>
    </Box>
  );
}

export default Header;
