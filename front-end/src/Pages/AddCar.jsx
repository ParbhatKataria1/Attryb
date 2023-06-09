import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  ModalBody,
  ModalFooter,
  Select,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios_create from "../Utils/axios_instance";
import Slider from "react-slick";
import AwesomeSlider from "react-awesome-slider";
const init = {
  image: "",
  description: [],
  odometer: "",
  original_paint: "",
  oem_spec: "",
  previous_buyer: "",
  registration_place: "",
  reported_accident: "",
  scratches: "",
  title: "",
};

const AddCar = () => {
  axios_create.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token");
  const [item, setitem] = useState(init);
  const inputRef = useRef();
  const [oemdata, set_oemdata] = useState([]);
  const [oemid, set_oemid] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const [search, setseach] = useState("");
  function change(e) {
    let name = e.target.name;
    let value = e.target.value;
    setitem({ ...item, [name]: value });
  }

  function deleteItem(i) {
    let obj = { ...item };
    let arr = obj.description.filter((el, ind) => {
      return ind != i;
    });
    obj.description = arr;
    setitem(obj);
  }
  function addvalue(e) {
    let value = inputRef.current.value;
    let obj = { ...item };
    obj.description.push(value);
    setitem(obj);
    inputRef.current.value = "";
  }
  async function fetch_oem() {
    let data = await axios_create.get("/oem");
    data = data.data;
    console.log(data);
    set_oemdata(data);
  }

  function selected_oem(ind, id) {
    set_oemid(id);
    setitem({ ...item, oem_spec: id });
  }
  useEffect(() => {
    fetch_oem();
  }, []);

  async function submitPost() {
    try {
      setloading(true);
      await axios_create.post(`/inventory`, { ...item });
      setloading(false);
      toast({
        title: "Item Posted",
        description: "Item is stored in Database",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setitem({ ...init });
    } catch (error) {
      setloading(false);
      toast({
        title: "Error in Posting",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  }
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };
  return (
    <Box pb="20px" bg="white" color={"black"}>
      <Box
        w="95%"
        p="20px"
        borderRadius={"10px"}
        border={"2px solid #eaeaea"}
        m="auto"
        py="2rem"
      >
        <Box>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <FormControl w="100%" id="image">
              <FormLabel>Image</FormLabel>
              <InputGroup>
                <InputLeftAddon children="Link" />
                <Input value={item.image} onChange={change} name="image" />
              </InputGroup>
            </FormControl>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <FormControl mt="10px" w="45%" id="title">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                onChange={change}
                value={item.title}
                name="title"
              />
            </FormControl>

            <FormControl mt="10px" w="45%" id="original_paint">
              <FormLabel>Original Paint</FormLabel>
              <Select
                onChange={change}
                value={item.original_paint}
                placeholder="Choose Color"
                name="original_paint"
              >
                <option value="silver">Silver</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
                <option value="black">Black</option>
              </Select>
            </FormControl>
          </Flex>
          <Divider mt="20px" />
          <Flex justifyContent={"space-between"}>
            <Box pr='20px' borderRight={"1px solid #eaeaea"} textAlign={"left"} w="60%">
              <Flex justifyContent={"space-between"}>
                <Button
                  textAlign={"left"}
                  fontWeight={"semibold"}
                  cursor={"no-drop"}
                  mt="20px"
                  mb="10px"
                  fontSize={"17px"}
                >
                  Click On Any Model From The Table
                </Button>
                <FormControl mt="20px" w="60%" id="oem_spec">
                  <Flex justifyContent={"end"} alignItems={"center"}>
                    <FormLabel>Filter Oem Spec</FormLabel>
                    <Input
                      w="40%"
                      placeholder="Search OEM"
                      onChange={(e) => {
                        setseach(e.target.value);
                      }}
                    ></Input>
                  </Flex>
                </FormControl>
              </Flex>
              <TableContainer>
                <Table size="sm" fontSize={"23px"}>
                  <Thead>
                    <Tr>
                      <Th>Model</Th>
                      <Th isNumeric>Year</Th>
                      <Th isNumeric>Price</Th>
                      <Th isNumeric>Max Speed</Th>
                      <Th isNumeric>Mileage</Th>
                      <Th isNumeric>Power</Th>
                      <Th>Color</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {!oemdata.length
                      ? null
                      : oemdata
                          .filter((el) =>
                            el.model
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          .map((data, ind) => {
                            return (
                              <Tr
                                cursor={"pointer"}
                                onClick={() => {
                                  selected_oem(ind, data._id);
                                }}
                                w="95%"
                                border={
                                  oemid == data._id
                                    ? "2px solid green"
                                    : "2px solid #eaeaea"
                                }
                                textAlign={"left"}
                                borderRadius={"10px"}
                                fontSize={"15px"}
                                p="8px"
                              >
                                <Td>{data.model}</Td>
                                <Td isNumeric>{data.year}</Td>
                                <Td isNumeric>{data.price} Rs</Td>
                                <Td isNumeric>{data.max_speed} Km/h</Td>
                                <Td isNumeric>{data.mileage} Km/l</Td>
                                <Td isNumeric>{data.power} BHP</Td>
                                <Td>
                                  {
                                    <Flex
                                      alignItems={"center"}
                                      justifyContent={"space-between"}
                                    >
                                      {data.color.map((col) => {
                                        return (
                                          <Box
                                            display={"inline-flex"}
                                            borderRadius={"50%"}
                                            m="5px"
                                            w="15px"
                                            h="15px"
                                            bg={col}
                                            border="2px solid lightgray"
                                          ></Box>
                                        );
                                      })}
                                    </Flex>
                                  }
                                </Td>
                              </Tr>
                            );
                          })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Divider orientation="vertical" />
            <Flex w="38%" alignItems={"start"} >
              <Box w="100%" m="20px auto">
                <FormControl w="100%" id="description">
                  <Flex textAlign={"center"} alignItems={"center"}>
                    <FormLabel fontSize={"17px"}>Description</FormLabel>
                    <InputGroup>
                      <Input ref={inputRef} name="description" />
                      <Button onClick={addvalue}>
                        <InputRightAddon w="100%" children="Add" />
                      </Button>
                    </InputGroup>
                  </Flex>
                </FormControl>
                <Box
                  border={
                    item.description.length ? "2px solid #eaeaea" : "none"
                  }
                  p={item.description.length ? "5px" : "0px"}
                  borderRadius={"10px"}
                  mt="10px"
                >
                  {!item.description.length
                    ? null
                    : item.description?.map((el, ind) => {
                        return (
                          <Flex
                            mt="4px"
                            borderRadius={"10px"}
                            justifyContent={"space-between"}
                            p="7px"
                            bg="pink.400"
                            color="white"
                          >
                            {el}
                            <span
                              onClick={() => {
                                deleteItem(ind);
                              }}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                stroke-linejoin="round"
                                width="30px"
                                height="30px"
                                stroke-miterlimit="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                              >
                                <path
                                  fill="white"
                                  d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                                />
                              </svg>
                            </span>
                          </Flex>
                        );
                      })}
                </Box>
              </Box>
            </Flex>
          </Flex>
          <Divider mt="20px" />
          <Flex justifyContent={"space-between"}>
            <FormControl mt="20px" w="45%" id="previous_buyer">
              <FormLabel>Previous Buyer</FormLabel>
              <Input
                onChange={change}
                value={item.previous_buyer}
                type="number"
                name="previous_buyer"
              />
            </FormControl>
            <FormControl mt="20px" w="45%" id="registration_place">
              <FormLabel>Registration Place</FormLabel>
              <Input
                onChange={change}
                value={item.registration_place}
                type="text"
                name="registration_place"
              />
            </FormControl>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <FormControl mt="10px" w="45%" id="odometer">
              <FormLabel>Odometer</FormLabel>
              <Input
                type="number"
                onChange={change}
                value={item.odometer}
                name="odometer"
              />
            </FormControl>
            <FormControl mt="10px" w="45%" id="reported_accident">
              <FormLabel>Reported Accident</FormLabel>
              <Input
                onChange={change}
                value={item.reported_accident}
                type="number"
                name="reported_accident"
              />
            </FormControl>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <FormControl mt="10px" w="45%" id="scratches">
              <FormLabel>Scratches</FormLabel>
              <Input
                onChange={change}
                value={item.scratches}
                type="number"
                name="scratches"
              />
            </FormControl>
            <Box textAlign={"right"}>
              <Button
                textAlign={"right"}
                width="200px"
                display={"inline-flex"}
                justifyContent={"space-between"}
                mt="40px"
                onClick={submitPost}
                variant="solid"
                bg={"red.500"}
                _hover={{
                  bg: "red.300",
                }}
                color={"white"}
              >
                Submit{" "}
                <Spinner visibility={loading ? "unset" : "hidden"} ml="10px" />
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCar;
