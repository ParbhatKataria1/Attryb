{
  /* <Flex
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
                          </Flex> */
}
