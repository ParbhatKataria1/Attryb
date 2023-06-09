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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  InputLeftElement,
  InputLeftAddon,
  UnorderedList,
  InputRightAddon,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios_create from "../Utils/axios_instance";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Deals = () => {
  axios_create.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [userid, setuserid] = useState("");
  const toast = useToast();
  const [limit, setlimit] = useState(4);
  const [length, setlength] = useState();
  let [searchParams, setSearchParams] = useSearchParams();

  let obj = {};
  if (searchParams.get("page")) obj.page = searchParams.get("page");
  if (searchParams.get("limit")) obj.limit = searchParams.get("limit");
  if (searchParams.get("min_price"))
    obj.min_price = searchParams.get("min_price");
  if (searchParams.get("max_price"))
    obj.max_price = searchParams.get("max_price");
  if (searchParams.get("min_mileage"))
    obj.min_mileage = searchParams.get("min_mileage");
  if (searchParams.get("max_mileage"))
    obj.max_mileage = searchParams.get("max_mileage");
  if (searchParams.get("color")) obj.color = searchParams.get("color");
  if (searchParams.get("model")) obj.model = searchParams.get("model");
  const [filter, setfilter] = useState(obj);

  let temp = searchParams.get("page") ? +searchParams.get("page") : 1;
  const [page, setpage] = useState(temp);

  async function fetchData(data = null) {
    setloading(true);
    try {
      let item = await axios_create.get("/inventory", {
        params: data ? { ...data, limit } : { ...filter, limit },
      });
      item = item.data;
      setuserid(item.userid);
      setlength(item.length);
      setdata(item.data);
      setloading(false);
    } catch (error) {
      toast({
        title: "Error",
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
    setSearchParams({...filter});
    fetchData();
  }, [page]);

  async function delete_item(id) {
    try {
      await axios_create.delete(`/inventory/${id}`);
      fetchData();
      toast({
        title: "Item Deleted",
        description: "Item is deleted from the Database",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Not Delete",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  }

  function update_date() {
    fetchData();
  }
  return (
    <Flex w="100%" m=" auto">
      <Box
        position={"sticky"}
        top="10vh"
        h={"100vh"}
        w="20%"
        p="20px"
        pt="3rem"
        bg="white"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <InputGroup>
          <Input
            value={filter?.model || ""}
            color={"black"}
            onChange={(e) => {
              setfilter((prev) => ({ ...prev, model: e.target.value }));
              setSearchParams({
                ...filter,
                model: e.target.value,
                page,
                limit,
              });
              fetchData();
            }}
            name="search"
            type="search"
          />
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
            <Input
              value={filter?.min_price || 0}
              w="100px"
              placeholder="-1"
              outline={"#003a5e"}
              onChange={(e) => {
                setfilter((prev) => {
                  setSearchParams({ ...prev, min_price: +e.target.value });
                  return { ...prev, min_price: +e.target.value, limit, page };
                });
              }}
            ></Input>
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
            <Input
              value={filter?.max_price || 0}
              onChange={(e) => {
                setfilter((prev) => {
                  setSearchParams({
                    ...prev,
                    max_price: +e.target.value,
                    limit,
                    page,
                  });
                  return { ...prev, max_price: +e.target.value };
                });
              }}
              w="100px"
              placeholder="-1"
            ></Input>
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
            <Input
              value={filter?.min_mileage || 0}
              onChange={(e) => {
                setfilter((prev) => {
                  setSearchParams({
                    ...prev,
                    min_mileage: +e.target.value,
                    limit,
                    page,
                  });
                  return {
                    ...prev,
                    min_mileage: +e.target.value,
                  };
                });
              }}
              w="100px"
              placeholder="-1"
              outline={"#003a5e"}
            ></Input>
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
            <Input
              value={filter?.max_mileage || 0}
              onChange={(e) => {
                setfilter((prev) => {
                  setSearchParams({
                    ...prev,
                    max_mileage: +e.target.value,
                    limit,
                    page,
                  });
                  return {
                    ...prev,
                    max_mileage: +e.target.value,
                  };
                });
              }}
              w="100px"
              placeholder="-1"
            ></Input>
          </Flex>
        </Box>

        <Select
          mt="30px"
          value={filter?.color}
          fontWeight={"bold"}
          colorScheme="white"
          color={"#003a5e"}
          w="100%"
          placeholder="Choose Color"
          onChange={(e) => {
            setfilter((prev) => {
              setSearchParams({ ...prev, color: e.target.value, limit, page });
              return { ...prev, color: e.target.value };
            });
          }}
        >
          <option value="silver">Silver</option>
          <option value="black">Black</option>
          <option value="gray">Gray</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="white">White</option>
        </Select>
        <Button
          color="white"
          mt="20px"
          bg="#003a5e"
          colorScheme="blue"
          w="100%"
          onClick={(e) => {
            fetchData();
          }}
        >
          Apply Filters
        </Button>
        <Button
          color="white"
          mt="20px"
          bg="#003a5e"
          colorScheme="blue"
          w="100%"
          onClick={(e) => {
            setfilter({});
            setSearchParams({});
            fetchData({});
          }}
        >
          Remove All Filters
        </Button>
      </Box>
      <Box m="auto" mt="20px" w="78%" p="20px">
        {!loading ? null : <Spinner size="xl" />}
        <Box w="100%">
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {!data.length
              ? null
              : data.map((el) => {
                  return (
                    <GridItem
                      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
                      borderRadius={"10px"}
                      color={"black"}
                      key={el._id}
                      w="100%"
                      bg="white"
                    >
                      <Flex alignItems={"center"}>
                        <Image
                          w="40%"
                          h="370px"
                          objectFit={"contain"}
                          borderRight={"2px solid #f3efef"}
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
                            <Text>{el.title ? el.title : "Not Mentioned"}</Text>
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
                          <Flex mt="20px" justifyContent={"space-between"}>
                            <Link to={`/${el._id}`}>
                              <Button>More Details</Button>
                            </Link>
                            {userid == el.dealer._id && (
                              <BasicUsage data={el} update_date={update_date} />
                            )}
                            {userid == el.dealer._id && (
                              <Button
                                onClick={() => {
                                  delete_item(el._id);
                                }}
                              >
                                Delete
                              </Button>
                            )}
                          </Flex>
                        </Box>
                      </Flex>
                    </GridItem>
                  );
                })}
          </Grid>
        </Box>

        <Box>
          <Flex
            alignItems={"center"}
            w={"98%"}
            justifyContent={"center"}
            m={"auto"}
          >
            {
              <Button
                isDisabled={page !== 1 ? false : true}
                className="prevBtn"
                data-testid="prevBtn"
                onClick={() =>
                  setpage((prev) => {
                    setSearchParams({ page: page - 1, limit });
                    setfilter((prev) => ({ ...prev, page: page - 1 }));
                    return prev - 1;
                  })
                }
              >
                Prev
              </Button>
            }

            {/* render the buttons here, directly. Ensure, each button has the "data-testid='btn'" prop. Add the className, activeBtn, if the current button is the activePage*/}

            <Button m="9px">{page}</Button>

            {
              <Button
                isDisabled={page != Math.ceil(length / limit) ? false : true}
                className="nextBtn"
                data-testid="nextBtn"
                onClick={() =>
                  setpage((prev) => {
                    setSearchParams({ page: page + 1, limit });

                    setfilter((prev) => ({ ...prev, page: page + 1 }));
                    return prev + 1;
                  })
                }
              >
                Next
              </Button>
            }
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
// const init = {
//   image: "",
//   description: "",
//   odometer: "",
//   original_paint: "",
//   oem_spec: "",
//   previous_buyer: "",
//   registration_place: "",
//   reported_accident: "",
//   scratches: "",
// };
function BasicUsage({ data, update_date }) {
  axios_create.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [item, setitem] = useState(data);
  const inputRef = useRef();
  const [oemdata, set_oemdata] = useState([]);
  const [oemind, set_oemind] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const [search, setsearch] = useState("");
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
  async function submitUpdate() {
    try {
      setloading(true);
      await axios_create.patch(`/inventory/${item._id}`, { ...item });
      update_date();
      setloading(false);
      toast({
        title: "Changes Updated",
        description: "Changes are saved in the System",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    } catch (error) {
      setloading(false);
      toast({
        title: "Error in Updating",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  }
  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal w="700px" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Details </ModalHeader>
          <ModalCloseButton />
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
            <Box
              border={item.description.length ? "2px solid #eaeaea" : "none"}
              p={item.description.length ? "5px" : "0px"}
              borderRadius={"10px"}
              mt="10px"
            >
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
              <Flex alignItems={"center"}>
                <FormLabel>OEM Spec</FormLabel>
                <Input
                  w="70%"
                  placeholder="Search OEM"
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                ></Input>
              </Flex>
            </FormControl>
            <Box>
              <Grid mt="10px" templateColumns="repeat(2, 1fr)" gap={1}>
                {oemdata.length &&
                  oemdata
                    .filter((el) =>
                      el.model.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((data, ind) => {
                      return (
                        <Box
                          cursor={"pointer"}
                          onClick={() => {
                            selected_oem(ind, data._id);
                          }}
                          w="95%"
                          border={
                            oemind == ind
                              ? "2px solid green"
                              : "2px solid #eaeaea"
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
                            <Text>
                              {data.model ? data.model : "Not Mentioned"}
                            </Text>
                          </Flex>
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontSize={"13px"}
                            mt="5px"
                          >
                            <Text>Year</Text>
                            <Text>
                              {data.year ? data.year : "Not Mentioned"}
                            </Text>
                          </Flex>

                          <Divider orientation="horizontal" />
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontSize={"13px"}
                          >
                            <Text>Price</Text>
                            <Text>
                              {data.price
                                ? data.price + " Rs"
                                : "Not Mentioned"}
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
                              {data.power
                                ? data.power + "BHP"
                                : "Not Mentioned"}
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

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={submitUpdate} variant="ghost">
              Done{" "}
              <Spinner visibility={loading ? "unset" : "hidden"} ml="10px" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function OEM_Specs({ data }) {
  return (
    <Box
      border={"2px solid #eaeaea"}
      textAlign={"left"}
      borderRadius={"10px"}
      fontSize={"21px"}
      p="20px"
    >
      <Flex
        fontSize={"19px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text>Model: </Text>
        <Text>{data.model ? data.model : "Not Mentioned"}</Text>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        fontSize={"17px"}
        mt="15px"
      >
        <Text>Year</Text>
        <Text>{data.year ? data.year : "Not Mentioned"}</Text>
      </Flex>

      <Divider orientation="horizontal" />
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        fontSize={"17px"}
      >
        <Text>Price</Text>
        <Text>{data.price ? data.price + " Rs" : "Not Mentioned"}</Text>
      </Flex>

      <Divider orientation="horizontal" />
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        fontSize={"17px"}
      >
        <Text>Max Speed</Text>
        <Text>
          {data.max_speed ? data.max_speed + "Km/h" : "Not Mentioned"}
        </Text>
      </Flex>

      <Divider orientation="horizontal" />
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        fontSize={"17px"}
      >
        <Text>Mileage</Text>
        <Text>{data.mileage ? data.mileage + "Km/l" : "Not Mentioned"}</Text>
      </Flex>

      <Divider orientation="horizontal" />
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        fontSize={"17px"}
      >
        <Text>Power</Text>
        <Text>
          {data.oem_spec.power ? data.oem_spec.power + "BHP" : "Not Mentioned"}
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
          {data.color.map((col) => {
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
    </Box>
  );
}

export default Deals;
