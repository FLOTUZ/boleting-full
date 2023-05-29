import { Center, Box, HStack, VStack } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

interface Columns {
  header: String;
  accessor: any;
}

const DatatableComponent = () => {
  const [columns, setColumns] = useState<Columns[]>([]);
  const [data, setdata] = useState<any[]>([]);

  useEffect(() => {
    setColumns([
      {
        header: "Id",
        accessor: "id",
      },
      {
        header: "Event Name",
        accessor: "name",
      },
      {
        header: "Event Date",
        accessor: "date",
      },
      {
        header: "Location",
        accessor: "location",
      },
      {
        header: "Actions",
        accessor: "actions",
      },
      {
        header: "Actions",
        accessor: "actions2",
      },
    ]);
    // Create random data for testing
    const data: any[] = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i,
        name: faker.lorem.words(3),
        date: faker.date.recent().toLocaleDateString(),
        location: faker.address.city(),
        actions: faker.lorem.words(3),
        actions2: faker.lorem.words(3),
      });

      setdata(data);
    }
  }, []);

  return (
    <Center h={"100%"} padding={"4rem"}>
      <Box
        w={"100%"}
        h={"100%"}
        borderRadius={"md"}
        overflowX={"scroll"}
        overflowY={"scroll"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
            height: "6px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray.300",
            borderRadius: "24px",
          },
        }}
      >
        <Box
          w={"fit-content"}
          minW={"100%"}
          borderRadius={"md"}
          borderColor={"gray"}
          borderWidth={"thin"}
        >
          <HStack
            spacing={"4px"}
            pb={4}
            w={"100%"}
            position={"sticky"}
            top={0}
            bgColor={"green"}
          >
            {columns.map((column, index) => (
              <Box key={index} w={"100%"} maxW={"100%"} h={"auto"} p={4}>
                {column.header}
              </Box>
            ))}
          </HStack>

          <Box h={"100%"}>
            {data.map((row, index) => (
              <HStack
                key={index}
                spacing={"4px"}
                w={"100%"}
                pb={4}
                bgColor={"blue"}
              >
                {columns.map((column, index) => (
                  <Box key={index} w={"100%"} h={"auto"}>
                    {row[column.accessor]}
                  </Box>
                ))}
              </HStack>
            ))}
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default DatatableComponent;
