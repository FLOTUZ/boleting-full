import type { AppProps } from "next/app";

import RootLayout from "@/layouts/layout";

import { ChakraBaseProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import { apolloClient, theme } from "@/providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraBaseProvider theme={theme}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ChakraBaseProvider>
    </ApolloProvider>
  );
}
