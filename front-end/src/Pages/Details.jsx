import React from "react";

const Details = () => {
  const { id } = useParams();
  
  return (
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
          <Text>{el.oem_spec.title ? el.oem_spec.title : "Not Mentioned"}</Text>
        </Flex>
        <Flex
          fontSize={"19px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text>Model: </Text>
          <Text>{el.oem_spec.model ? el.oem_spec.model : "Not Mentioned"}</Text>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize={"17px"}
          mt="15px"
        >
          <Text>Year</Text>
          <Text>{el.oem_spec.year ? el.oem_spec.year : "Not Mentioned"}</Text>
        </Flex>

        <Divider orientation="horizontal" />
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize={"17px"}
        >
          <Text>Price</Text>
          <Text>
            {el.oem_spec.price ? el.oem_spec.price + " Rs" : "Not Mentioned"}
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
            {el.oem_spec.power ? el.oem_spec.power + "BHP" : "Not Mentioned"}
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
  );
};

export default Details;
