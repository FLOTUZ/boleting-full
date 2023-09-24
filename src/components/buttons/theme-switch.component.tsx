import { Button, useColorMode } from "@chakra-ui/react";
import { BsSunFill } from "react-icons/bs";
import { TbMoonFilled } from "react-icons/tb";

const ThemeSwitchComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? (
        <TbMoonFilled size={18} />
      ) : (
        <BsSunFill size={18} />
      )}
    </Button>
  );
};

export default ThemeSwitchComponent;
