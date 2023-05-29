import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../utils/unautorized.error";

interface AuthorizedAbilities {
  authorized_abilities: string[];
  id_user: number | null;
  prisma: PrismaClient;
}

export const autorizedAbilities = async ({
  authorized_abilities,
  id_user,
  prisma,
}: AuthorizedAbilities) => {
  if (authorized_abilities.length === 0) return;
  const userAbilities = await prisma.abilities.findMany({
    select: { name: true },
    where: {
      role: {
        some: {
          users: {
            some: {
              id: id_user!,
            },
          },
        },
      },
    },
  });

  const userAbilitiesNames = userAbilities.map((ability) => ability.name);

  const isAuthorized = !authorized_abilities.some((ability) =>
    userAbilitiesNames.includes(ability)
  );

  if (isAuthorized) {
    throw new UnauthorizedError("You not have ability for this action");
  }
};
