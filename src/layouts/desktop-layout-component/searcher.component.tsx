import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  VStack,
  Card,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const SearcherComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResult, setSearchResult] = useState<any>([]);

  const simulateSearch = async (query: string) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        setSearchResult([
          {
            id: 1,
            name: "Evento 1",
          },
          {
            id: 2,
            name: "Evento 2",
          },
        ]);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <Box w={"100%"}>
      <Button w={"100%"} colorScheme="gray" color={"gray"} onClick={onOpen}>
        Buscar
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSearchResult([]);
          onClose();
        }}
        motionPreset="slideInBottom"
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent shadow={"none"}>
          <ModalBody>
            <Input
              variant={"filled"}
              placeholder="Buscar..."
              w={"100%"}
              onChange={(e) => simulateSearch(e.target.value)}
            />
            {
              <VStack pt={4}>
                {searchResult.map((item: any) => {
                  return (
                    <Card
                      key={item.id}
                      p={4}
                      h={100}
                      w={"100%"}
                      bgColor={"gray.600"}
                    >
                      {item.name}
                    </Card>
                  );
                })}
              </VStack>
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SearcherComponent;
