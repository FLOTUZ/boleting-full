import { Ability } from "@/gql/generated";
import { Badge, Box, Text } from "@chakra-ui/react";

interface AbilityBadgeProps {
  ability: Ability;
}

const AbilityBadge = ({ ability }: AbilityBadgeProps) => {
  const colors: {
    name: string;
    color: string;
  }[] = [
    { name: "create", color: "green" },
    { name: "read", color: "blue" },
    { name: "update", color: "yellow" },
    { name: "delete", color: "red" },
  ];

  const badgeColor = () => {
    const action = ability.name.split(":")[0];
    const color = colors.find((color: any) => color.name === action)?.color;
    return color ? color : "gray";
  };

  return (
    <>
      <Box key={ability.id} alignItems={"center"} display={"flex"}>
        <Badge colorScheme={badgeColor()} mr={2}>
          {ability.name.split(":")[0]}
        </Badge>
        <Text>{ability.name.split(":")[1]}</Text>
      </Box>
    </>
  );
};

export default AbilityBadge;
