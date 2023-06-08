import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios_create from "../Utils/axios_instance";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Deals = () => {
  axios_create.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [filter, setfilter] = useState({});
  const [userid, setuserid] = useState("");
  const toast = useToast();

  async function fetchData() {
    setloading(true);
    try {
      let item = await axios_create.get("/inventory");
      item = item.data;
      setuserid(item.userid);
      setdata(item.data);
      setloading(false);
    } catch (error) {
      toast({
        title: "Not able to Get The Data",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setloading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [filter]);
  console.log(data);
  return (
    <Flex w="100%" m=" auto">
      <Box
        minH={"100vh"}
        w="20%"
        p="20px"
        pt="3rem"
        bg="white"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <InputGroup>
          <Input name="search" type="search" />
          <InputRightElement h={"full"}>
            <Button variant={"ghost"}>
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box
          mt="30px"
          justifyContent={"space-between"}
          alignItems={"center"}
          color="#003a5e"
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text
              textAlign={"left"}
              fontWeight={"bolder"}
              fontSize={"21px"}
              w="150px"
            >
              Min Price :
            </Text>
            <Input w="50px" placeholder="-1" outline={"#003a5e"}></Input>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text
              textAlign={"left"}
              fontWeight={"bolder"}
              fontSize={"21px"}
              w="150px"
            >
              Max Price :
            </Text>
            <Input w="50px" placeholder="-1"></Input>
          </Flex>
        </Box>

        <Box
          mt="30px"
          justifyContent={"space-between"}
          alignItems={"center"}
          color="#003a5e"
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text
              textAlign={"left"}
              fontWeight={"bolder"}
              fontSize={"21px"}
              w="150px"
            >
              Min Mileage :
            </Text>
            <Input w="50px" placeholder="-1" outline={"#003a5e"}></Input>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text
              textAlign={"left"}
              fontWeight={"bolder"}
              fontSize={"21px"}
              w="150px"
            >
              Max Mileage :
            </Text>
            <Input w="50px" placeholder="-1"></Input>
          </Flex>
        </Box>

        <Select
          mt="30px"
          fontWeight={"bold"}
          colorScheme="#003a5e"
          bg="#003a5e"
          color={"lightgray"}
          w="100%"
          placeholder="Choose Color"
        >
          <option value="silver">Silver</option>
          <option value="black">Black</option>
          <option value="gray">Gray</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="white">White</option>
        </Select>
      </Box>
      <Box p="20px">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {data.length &&
            data.map((el) => {
              return (
                <GridItem
                  borderRadius={"10px"}
                  color={"black"}
                  key={el._id}
                  w="100%"
                  bg="white"
                >
                  <Flex>
                    <Image
                      w="40%"
                      h="350px"
                      objectFit={"contain"}
                      borderRight={"2px solid gray"}
                      src={el.image}
                    />
                    <Box
                      textAlign={"left"}
                      w="60%"
                      borderRadius={"10px"}
                      fontSize={"21px"}
                      p="20px"
                      justifyContent={"space-between"}
                      alignContent={"space-between"}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontWeight={"bolder"}
                      >
                        <Text>Title : </Text>
                        <Text>
                          {el.oem_spec.title
                            ? el.oem_spec.title
                            : "Not Mentioned"}
                        </Text>
                      </Flex>
                      <Flex
                        fontSize={"19px"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Text>Model: </Text>
                        <Text>
                          {el.oem_spec.model
                            ? el.oem_spec.model
                            : "Not Mentioned"}
                        </Text>
                      </Flex>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"17px"}
                        mt="15px"
                      >
                        <Text>Year</Text>
                        <Text>
                          {el.oem_spec.year
                            ? el.oem_spec.year
                            : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Divider orientation="horizontal" />
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"17px"}
                      >
                        <Text>Price</Text>
                        <Text>
                          {el.oem_spec.price
                            ? el.oem_spec.price + " Rs"
                            : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Divider orientation="horizontal" />
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"17px"}
                      >
                        <Text>Max Speed</Text>
                        <Text>
                          {el.oem_spec.max_speed
                            ? el.oem_spec.max_speed + "Km/h"
                            : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Divider orientation="horizontal" />
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"17px"}
                      >
                        <Text>Mileage</Text>
                        <Text>
                          {el.oem_spec.mileage
                            ? el.oem_spec.mileage + "Km/l"
                            : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Divider orientation="horizontal" />
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"17px"}
                      >
                        <Text>Power</Text>
                        <Text>
                          {el.oem_spec.power
                            ? el.oem_spec.power + "BHP"
                            : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"19px"}
                        mt="15px"
                      >
                        <Text>Colors</Text>
                        <Flex
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          {el.oem_spec.color.map((col) => {
                            return (
                              <Box
                                display={"inline-flex"}
                                borderRadius={"50%"}
                                m="10px"
                                w="30px"
                                h="30px"
                                bg={col}
                                border="2px solid lightgray"
                              ></Box>
                            );
                          })}
                        </Flex>
                      </Flex>
                      <Flex justifyContent={"space-between"}>
                        <Link to={`/${el._id}`}>
                          <Button>More Details</Button>
                        </Link>
                        {userid == el.dealer._id && <Button>Edit</Button>}
                        {userid == el.dealer._id && <Button>Delete</Button>}
                      </Flex>
                    </Box>
                  </Flex>
                </GridItem>
              );
            })}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Deals;
