import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { Event } from "@/gql/generated";
import Link from "next/link";
import { ShowEventPath } from "@/routes";

interface TicketEventCardProps {
  event: Event;
}

const TicketEventCard = ({ event }: TicketEventCardProps) => {
  return (
    <Link key={event.id} href={ShowEventPath(String(event.id))}>
      <Box
        p={4}
        boxShadow="sm"
        rounded="md"
        transition="all .2s ease-in-out"
        transform="scale(1)"
        height={250}
        _hover={{
          pointer: "cursor",
          boxShadow: "0 0 0 1px #e2e8f0",
          transition: "all .2s ease-in-out",
          transform: "scale(1.05)",
        }}
      >
        <HStack>
          {event.event_logo_url && (
            <Image
              height={50}
              src={event.event_logo_url}
              alt={event.description!}
              rounded="md"
              mb={4}
            />
          )}
          <Text as={"b"} color={"GrayText"} fontSize={"sm"}>
            {new Date(event.start_date).toLocaleDateString("es-MX", {
              day: "numeric",
              month: "long",
            })}
          </Text>
        </HStack>
        <Box fontWeight="bold">{event.name}</Box>
        <Box h="100px" overflow="hidden" textOverflow="ellipsis">
          <Text noOfLines={3}>{event.description}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default TicketEventCard;
