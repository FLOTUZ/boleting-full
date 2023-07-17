import { Button } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";

const UsersComponent = () => {
  const onRedirect = () => {
    console.log("recibi un click");
  };

  return (
    <>
      <Button onClick={onRedirect}>
        <FaUserAlt />
      </Button>
    </>
  );
};

export default UsersComponent;
