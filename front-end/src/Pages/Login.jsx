import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Form, Link } from "react-router-dom";
import axios_create from "../Utils/axios_instance";
const init = {
  email: "",
  password: "",
};
const Login = () => {
  const [data, setdata] = useState(init);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const toast = useToast();

  function change(e) {
    let name = e.target.name;
    let value = e.target.value;
    setdata({ ...data, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("first");
    setloading(true);
    try {
      await axios_create.post("/auth/login", { ...data });
      setdata({ ...init });
      toast({
        title: "Login Successful",
        description: "You are see the other pages as well",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setloading(false);
    } catch (error) {
      toast({
        title: "Provide Correct Credentials",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setloading(false);
    }
  }
  console.log(data);

  return (
    <Box w="35%" m="5rem auto" bg="#282c34">
      <Heading fontSize={"2rem"}>
        Please Enter Your Credentials to Login✌️
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          mt="18px"
          fontSize={"1.3rem"}
          visibility={loading ? "unset" : "hidden"}
        >
          <span style={{ marginRight: "5px" }}>Processing</span>{" "}
          <Spinner color="white" />
        </Flex>
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          w="100%"
          bg="white"
          color={"black"}
          flexDir={"column"}
          alignContent={"center"}
          justifyContent={"space-around"}
          borderRadius={"10px"}
          p="19px"
          m=" 3rem auto"
        >
          <Text mt="10px" mr="4px" fontSize={"18px"} textAlign={"left"}>
            Enter Your Email
            <span
              style={{
                color: "red",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              **
            </span>
          </Text>
          <Input
            onChange={change}
            isRequired
            my="10px"
            name="email"
            type="email"
            p={"5px"}
            value={data.email}
          />
          <Text mt="10px" fontSize={"18px"} textAlign={"left"}>
            Enter Your password
            <span
              style={{
                color: "red",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              **
            </span>
          </Text>

          <InputGroup
            onChange={change}
            value={data.password}
            isRequired
            my="10px"
            type="password"
            p="5px"
          >
            <Input name="password" type={showPassword ? "text" : "password"} />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit" w="100%" my="10px" p="0px" colorScheme="blue">
            Submit
          </Button>

          <Flex w="100%" justifyContent={"center"} alignItems={"center"}>
            <Text mr="10px" display={"inline"}>
              Already a User?
            </Text>
            <Link
              display={"inline"}
              to="/auth/sing-up"
              style={{
                color: "#282c34",
                fontSize: "14px",
                textDecoration: "underline",
                fontWeight:"bolder"
              }}
            >
              SignUp
            </Link>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};

export default Login;