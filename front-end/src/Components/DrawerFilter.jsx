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
import React, { useContext } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Filter from "./Filter";
import { LightmodeContext } from "../Context/LightMode";

export default function DrawerFilter({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { mode, setmode,light,outline, dark, white } = useContext(LightmodeContext)

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
        <DrawerContent bg={mode?dark:'white'}>
          <Flex mt="20px">
            <Heading ml="15px" color={mode?white:"#003a5e"} textAlign={"center"}>
              Filteration
            </Heading>

            <DrawerCloseButton color={mode?white:"#003a5e"} mt='20px'/>
          </Flex>

          <Filter item={item} />

          <DrawerFooter>
            <Button variant="outline" mr={3} color={mode?'white':"#003a5e"} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
