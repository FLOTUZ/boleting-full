import { Center, CircularProgress } from "@chakra-ui/react";

const CircularLoaderComponent = () => {
    return (
        <Center w={"100vw"} h={"100vh"}>
            <CircularProgress isIndeterminate color="green.300" />
        </Center>
    );
}

export default CircularLoaderComponent;