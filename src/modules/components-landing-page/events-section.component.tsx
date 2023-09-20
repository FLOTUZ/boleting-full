import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
} from "@chakra-ui/react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FaGlassMartiniAlt, FaGuitar } from "react-icons/fa";
import {
  MdBusinessCenter,
  MdColorLens,
  MdSportsHandball,
} from "react-icons/md";
import { RiMentalHealthLine } from "react-icons/ri";
import { TbChristmasTree } from "react-icons/tb";
import EventCards from "./event-cards.component";

const eventCategories = [
  {
    text: "Musica",
    icon: BsMusicNoteBeamed,
    link: "#",
  },
  {
    text: "Hobbies",
    icon: FaGuitar,
    link: "#",
  },
  {
    text: "Artes",
    icon: MdColorLens,
    link: "#",
  },
  {
    text: "Negocios",
    icon: MdBusinessCenter,
    link: "#",
  },
  {
    text: "Dias festivos",
    icon: TbChristmasTree,
    link: "#",
  },
  {
    text: "Salud",
    icon: RiMentalHealthLine,
    link: "#",
  },
  {
    text: "Comida y bebida",
    icon: FaGlassMartiniAlt,
    link: "#",
  },
  {
    text: "Deporte y fitness",
    icon: MdSportsHandball,
    link: "#",
  },
];

const EventsSection = () => {
  return (
    <Box margin={9}>
      <Heading as="h3" size="lg">
        Eventos y categorias
      </Heading>
      <Grid
        margin={4}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {eventCategories.map((item, index) => (
          <GridItem key={index}>
            <Center h="100%">
              <Box>
                <Button
                  as={Link}
                  href={item.link}
                  variant="outline"
                  leftIcon={<Icon as={item.icon} ml={2} />}
                  display="inline-flex"
                  w="200px"
                  _light={{
                    color: "#1a202ceb",
                  }}
                  _dark={{
                    bg: "brand.500",
                  }}
                  _hover={{
                    bg: "#dae5f1f7",
                    _dark: {
                      bg: "#2c313d",
                    },
                  }}
                >
                  {item.text}
                </Button>
              </Box>
            </Center>
          </GridItem>
        ))}
      </Grid>
      <EventCards />
    </Box>
  );
};

export default EventsSection;
