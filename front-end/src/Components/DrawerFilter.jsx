import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Filter from "./Filter";

export default function DrawerFilter({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button color='white' ref={btnRef} bg="#003a5e" onClick={onOpen}>
        {/* <HamburgerIcon /> */}
        Filter Result
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Flex mt="20px">
            <Heading ml="15px" color={"#003a5e"} textAlign={"center"}>
              Filteration
            </Heading>

            <DrawerCloseButton mt='20px'/>
          </Flex>

          <Filter item={item} />

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
