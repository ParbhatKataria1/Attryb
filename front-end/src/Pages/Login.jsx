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
import React, { useContext, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import axios_create from "../Utils/axios_instance";
import { LightmodeContext } from "../Context/LightMode";
const init = {
  email: "",
  password: "",
};
const Login = () => {
  const [data, setdata] = useState(init);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  let { mode, setmode, light, outline, dark  } = useContext(LightmodeContext);
dark = '#353b45'
  function change(e) {
    let name = e.target.name;
    let value = e.target.value;
    setdata({ ...data, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setloading(true);
    try {
      let info = await axios_create.post("/auth/login", { ...data });
      toast({
        title: "Login Successful",
        description: "You can see the other pages as well",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      const token = info.data.token;
      sessionStorage.setItem("token", info.data.token);
      sessionStorage.setItem("id", info.data.id);
      sessionStorage.setItem("username", info.data.username);
      sessionStorage.setItem("email", info.data.email);
      setloading(false);
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: 'Provide Correct Credentials',
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setloading(false);
    }
  }

  return (
    <Box
      w={{ base: "90%", md: "70%", lg: "50%", xl: "35%" }}
      m="3rem auto"
      color={mode ? "black" : "white"}
    >
      <Heading color={mode ? "white" : "black"} fontSize={"2rem"}>
        Please Enter Your Credentials to Login✌️
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          mt="15px"
          fontSize={"1.3rem"}
          visibility={loading ? "unset" : "hidden"}
          color={mode?'white':'black'}
        >
          <span style={{ marginRight: "5px" }}>Processing</span>{" "}
          <Spinner color={mode?'white':'black'}  />
        </Flex>
      </Heading>
      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl
            w="100%"
            flexDir={"column"}
            alignContent={"center"}
            justifyContent={"space-around"}
            borderRadius={"10px"}
            p="19px"
            m=" 3rem auto"
            bg={mode ? dark : 'white'}
            color={mode ? "white" : "black"}
            boxShadow={' rgba(0, 0, 0, 0.35) 0px 5px 15px;'}
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
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
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
              <Box color={mode ? "white" : "black"}>
                <Link
                  display={"inline"}
                  to="/auth/sign-up"
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    fontWeight: "bolder",
                  }}
                >
                  SignUp
                </Link>
              </Box>
            </Flex>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};



export default Login;
