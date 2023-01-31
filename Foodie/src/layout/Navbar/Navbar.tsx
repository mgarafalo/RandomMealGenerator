import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box className="flex p-5 content-center justify-between w-full">
      <Link to={"/"}>
        <Text>Foodie</Text>
      </Link>
      <Link to={"/meals"}>
        <Button>Saved Meals</Button>
      </Link>
    </Box>
  );
}
