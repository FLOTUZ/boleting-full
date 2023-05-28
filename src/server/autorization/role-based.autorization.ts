import { PrismaClient } from "@prisma/client";

interface AutorizedRoles {
  authorized_roles: string[];
  id_user: number | null;
  prisma: PrismaClient;
}

export const autorizedRoles = async ({
  authorized_roles,
  id_user,
  prisma,
}: AutorizedRoles) => {
  if (authorized_roles.length === 0) return;

  const userRoles = await prisma.user.findUnique({
    where: { id: id_user! },
    select: { roles: { select: { name: true } } },
  });

  const roleNames = userRoles?.roles.map((r) => r.name);

  if (!roleNames?.some((r) => authorized_roles.includes(r)))
    throw new Error("Unauthorized");
};
