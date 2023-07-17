import { Button } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { UsersPath } from "@/routes";
import { useRouter } from "next/router";

const UsersComponent = () => {
  const router = useRouter();
  const redirect = () => router.replace(UsersPath);
  return (
    <>
      <Button onClick={redirect}>
        <FaUserAlt />
      </Button>
    </>
  );
};

export default UsersComponent;
