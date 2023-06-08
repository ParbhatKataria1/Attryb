import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="white">
      <Flex p="15px" w="95%" m="auto" justifyContent={"space-between"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="#003a5e"
          >
            <path d="M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z" />
          </svg>
          <Text
            ml="15px"
            fontWeight={"bolder"}
            fontSize={"23px"}
            color={"#003a5e"}
            display={"inline"}
          >
            BuyCar
          </Text>
        </Flex>
        <Flex alignItems={"center"} w="16%" justifyContent={"space-between"}>
          <Link to="/">
            <Button
              bg={"red.500"}
              _hover={{
                bg: "red.300",
              }}
              color={"white"}
            >
              Home
            </Button>
          </Link>
          <Link to="/addcar">
            <Button>Add Car</Button>
          </Link>
          <Flex
            justifyContent={"center"}
            borderRadius={"50%"}
            w="37px"
            h="37px"
            alignItems={"center"}
            cursor={'pointer'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" />
            </svg>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
