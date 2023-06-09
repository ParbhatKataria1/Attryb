import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Select,
  Spinner,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios_create from "../Utils/axios_instance";

const Details = () => {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const toast = useToast();

  async function fetchData() {
    axios_create.defaults.headers.common["Authorization"] =
      sessionStorage.getItem("token");
    setloading(true);
    try {
      let item = await axios_create.get(`/inventory/${id}`);
      item = item.data;
      setdata(item);
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
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);
  if (!data._id) {
    return (
      <Spinner
        mt="80px"
        thickness="4px"
        speed="0.95s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }
  return (
    <Box pb="20px" bg="white" minH="90vh">
      <Heading
        textTransform={"uppercase"}
        color={"blue.900"}
        fontWeight={600}
        bg="blue.50"
        p={2}
        alignSelf={"flex-start"}
        rounded={"md"}
        w='20%'
fontSize={'25px'}
m=' auto'
      >
        All Details
      </Heading>
      <Flex w="95%" m="2rem auto" bg="white" color="black">
        <Image w="60%" h="350px" objectFit={"contain"} src={data.image} />
        <Box
          border={"2px solid #eaeaea"}
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
              {data.oem_spec.title ? data.oem_spec.title : "Not Mentioned"}
            </Text>
          </Flex>
          <Flex
            fontSize={"19px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>Model: </Text>
            <Text>
              {data.oem_spec.model ? data.oem_spec.model : "Not Mentioned"}
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
              {data.oem_spec.year ? data.oem_spec.year : "Not Mentioned"}
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
              {data.oem_spec.price
                ? data.oem_spec.price + " Rs"
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
              {data.oem_spec.max_speed
                ? data.oem_spec.max_speed + "Km/h"
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
              {data.oem_spec.mileage
                ? data.oem_spec.mileage + "Km/l"
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
              {data.oem_spec.power
                ? data.oem_spec.power + "BHP"
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
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              {data.oem_spec.color.map((col) => {
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
          <Flex
            mt="20px"
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Reported Accidents</Text>
            <Text>{data.reported_accident || 0}</Text>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Scratches</Text>
            <Text>{data.scratches || 0}</Text>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Previous Buyer</Text>
            <Text>{data.previous_buyer || 0}</Text>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Original Paint</Text>
            <Box
              display={"inline-flex"}
              borderRadius={"50%"}
              w="30px"
              h="30px"
              mt="8px"
              bg={data.original_paint}
              border="2px solid lightgray"
            ></Box>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Odometer</Text>
            <Text>{data.odometer || 0} Km/h</Text>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Registration Place</Text>
            <Text>{data.registration_place || 0}</Text>
          </Flex>

          <Box mt="20px" fontSize={"17px"} color={"black"}>
            <Text fontSize={"19px"}>Description</Text>
            <UnorderedList mt="8px">
              {data.description.map((el, ind) => {
                return <ListItem key={ind}>{el}</ListItem>;
              })}
            </UnorderedList>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Details;
