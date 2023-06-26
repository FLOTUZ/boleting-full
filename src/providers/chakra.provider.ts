import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    semiTransparentContainer: "#ffffff1a",
  },
};

const components = {
  Input: {
    defaultProps: {
      variant: "filled",
    },
  },
};

export const theme = extendTheme({
  colors,
  components,
});
