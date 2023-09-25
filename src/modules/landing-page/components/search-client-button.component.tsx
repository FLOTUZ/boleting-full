import { Button } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchClientButtonComponent = () => {
  return (
    <Button w={"15rem"} colorScheme="gray" color={"gray"}>
      <AiOutlineSearch />
      &nbsp; Buscar
    </Button>
  );
};

export default SearchClientButtonComponent;
