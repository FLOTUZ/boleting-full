import { UnauthorizedError } from "../utils/unautorized.error";
import { prisma } from "../prisma.instance";

interface AuthorizedAbilities {
  authorized_abilities: string[];
  id_user: number | null;
}

/**
@description
Check if user have abilities for this action
@param {authorized_abilities: string[]}
@param {id_user: number | null}
@returns {Promise<void>}
**/
export const autorizedAbilities = async ({
  authorized_abilities,
  id_user,
}: AuthorizedAbilities) => {
  if (authorized_abilities.length === 0) return;
  if (!id_user) {
    throw new UnauthorizedError(
      "Acción no autorizada - Usuario no autenticado"
    );
  }
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
    throw new UnauthorizedError("No tienes permisos para realizar esta acción");
  }
};
