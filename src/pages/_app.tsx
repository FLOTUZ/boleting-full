import { apolloClient, theme } from "@/providers";
import type { AppProps } from "next/app";

// Apollo graphql
import { ApolloProvider } from "@apollo/client";

//Chackra UI
import { ChakraProvider } from "@chakra-ui/react";

// Import react context

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
