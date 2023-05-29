import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: "ADMIN",
      },
      {
        name: "DEVELOPER",
      },
      {
        name: "MANAGER",
      },
      {
        name: "ATTENDEE",
      },
    ],
  });

  const roles = await prisma.role.findMany();

  await prisma.user.create({
    data: {
      name: "Administrador",
      last_name: "Admin",
      email: "admin@thecore.events",
      password: await argon2.hash("admin"),
      roles: {
        connect: {
          name: "ADMIN",
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "Desarrollador",
      last_name: "Developer",
      email: "developer@thecore.events",
      password: await argon2.hash("developer"),
      roles: {
        connect: roles.map((role) => ({ id: role.id })),
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "Gerente",
      last_name: "Manager",
      email: "gerente@thecore.events",
      password: await argon2.hash("gerente"),
      roles: {
        connect: {
          name: "MANAGER",
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "Asistente",
      last_name: "Attendee",
      email: "asistente@thecore.events",
      password: await argon2.hash("asistente"),
      roles: {
        connect: {
          name: "ATTENDEE",
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("====== Seed finished ====== ✔");
  });
