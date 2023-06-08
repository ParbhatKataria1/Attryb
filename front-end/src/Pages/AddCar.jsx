import { Box, Button, Divider, Flex, FormControl, FormLabel, Grid, Input, InputGroup, InputLeftAddon, InputRightAddon, ModalBody, Select, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios_create from "../Utils/axios_instance";

const init = {
  image: "",
  description: "",
  odometer: "",
  original_paint: "",
  oem_spec: "",
  previous_buyer: "",
  registration_place: "",
  reported_accident: "",
  scratches: "",
};

const AddCar = () => {
  const [item, setitem] = useState(init);
  const inputRef = useRef();
  const [oemdata, set_oemdata] = useState([]);
  const [oemind, set_oemind] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
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
    set_oemdata(data);
  }

  function selected_oem(ind, id) {
    set_oemind(ind);
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
  return (
    <Box>
      <Box>
        <ModalBody>
          <FormControl w="100%" id="image">
            <FormLabel>Image</FormLabel>
            <InputGroup>
              <InputLeftAddon children="https://" />
              <Input value={item.image} onChange={change} name="image" />
            </InputGroup>
          </FormControl>
          <FormControl mt="10px" w="100%" id="description">
            <FormLabel>Description</FormLabel>
            <InputGroup>
              <Input ref={inputRef} name="description" />
              <Button onClick={addvalue}>
                <InputRightAddon children="Add" />
              </Button>
            </InputGroup>
          </FormControl>
          <Box>
            {item.description.length &&
              item.description?.map((el, ind) => {
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
          <FormControl mt="10px" w="100%" id="oem_spec">
            <FormLabel>OEM Spec</FormLabel>
            <Input
              onChange={change}
              placeholder="6480d1b..."
              type="text"
              name="oem_spec"
            />
          </FormControl>
          <Box>
            <Grid mt="10px" templateColumns="repeat(2, 1fr)" gap={1}>
              {oemdata.length &&
                oemdata.map((data, ind) => {
                  return (
                    <Box
                      cursor={"pointer"}
                      onClick={() => {
                        selected_oem(ind, data._id);
                      }}
                      w="95%"
                      border={
                        oemind == ind ? "2px solid green" : "2px solid #eaeaea"
                      }
                      textAlign={"left"}
                      borderRadius={"10px"}
                      fontSize={"15px"}
                      p="8px"
                    >
                      <Flex
                        fontSize={"15px"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Text>Model: </Text>
                        <Text>{data.model ? data.model : "Not Mentioned"}</Text>
                      </Flex>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"13px"}
                        mt="5px"
                      >
                        <Text>Year</Text>
                        <Text>{data.year ? data.year : "Not Mentioned"}</Text>
                      </Flex>

                      <Divider orientation="horizontal" />
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"13px"}
                      >
                        <Text>Price</Text>
                        <Text>
                          {data.price ? data.price + " Rs" : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Divider orientation="horizontal" />
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"13px"}
                      >
                        <Text>Max Speed</Text>
                        <Text>
                          {data.max_speed
                            ? data.max_speed + "Km/h"
                            : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Divider orientation="horizontal" />
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"13px"}
                      >
                        <Text>Mileage</Text>
                        <Text>
                          {data.mileage
                            ? data.mileage + "Km/l"
                            : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Divider orientation="horizontal" />
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"13px"}
                      >
                        <Text>Power</Text>
                        <Text>
                          {data.power ? data.power + "BHP" : "Not Mentioned"}
                        </Text>
                      </Flex>

                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"15px"}
                        mt="5px"
                      >
                        <Text>Colors</Text>
                        <Flex
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          {data.color.map((col) => {
                            return (
                              <Box
                                display={"inline-flex"}
                                borderRadius={"50%"}
                                m="10px"
                                w="15px"
                                h="15px"
                                bg={col}
                                border="2px solid lightgray"
                              ></Box>
                            );
                          })}
                        </Flex>
                      </Flex>
                    </Box>
                  );
                })}
            </Grid>
          </Box>
          <Flex justifyContent={"space-between"}>
            <FormControl mt="10px" w="45%" id="previous_buyer">
              <FormLabel>Previous Buyer</FormLabel>
              <Input
                onChange={change}
                value={item.previous_buyer}
                type="number"
                name="previous_buyer"
              />
            </FormControl>
            <FormControl mt="10px" w="45%" id="registration_place">
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
            <FormControl mt="10px" w="45%" id="reported_accident">
              <FormLabel>Reported Accident</FormLabel>
              <Input
                onChange={change}
                value={item.reported_accident}
                type="number"
                name="reported_accident"
              />
            </FormControl>
            <FormControl mt="10px" w="45%" id="scratches">
              <FormLabel>Scratches</FormLabel>
              <Input
                onChange={change}
                value={item.scratches}
                type="number"
                name="scratches"
              />
            </FormControl>
          </Flex>
        </ModalBody>
      </Box>
      <Box>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={submitUpdate} variant="ghost">
            Done <Spinner visibility={loading ? "unset" : "hidden"} ml="10px" />
          </Button>
        </ModalFooter>
      </Box>
    </Box>
  );
};

export default AddCar;
