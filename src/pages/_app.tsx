import type { AppProps } from "next/app";

import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";

import { ApolloProvider } from "@apollo/client";
import client from "../server/apollo.config";
import RootLayout from "@/layouts/layout";

import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraBaseProvider theme={theme}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ChakraBaseProvider>
    </ApolloProvider>
  );
}
