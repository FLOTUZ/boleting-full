import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  SimpleGrid,
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

      <SimpleGrid columns={[2, 3, 4]} spacing={2}>
        {eventCategories.map((item, index) => (
          <Button key={index} as={Link} href={item.link} variant="outline">
            <Center>
              <Icon as={item.icon} />
            </Center>
            {item.text}
          </Button>
        ))}
      </SimpleGrid>

      <EventCards />
    </Box>
  );
};

export default EventsSection;
