import { Button, useMediaQuery } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchClientButtonComponent = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 420px)");
  return (
    <Button maxW={"fit-content"} colorScheme="gray" color={"gray"}>
      <AiOutlineSearch />
      &nbsp;
      {isLargerThan800 ? "Buscar" : null}
    </Button>
  );
};

export default SearchClientButtonComponent;
