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

  await prisma.organization.create({
    data: {
      name: "The Core Events",
    },
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
      organization: {
        connect: {
          name: "The Core Events",
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
      organization: {
        connect: {
          name: "The Core Events",
        },
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
      organization: {
        connect: {
          name: "The Core Events",
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
      organization: {
        connect: {
          name: "The Core Events",
        },
      },
    },
  });

  await prisma.eventCategory.createMany({
    data: [
      {
        name: "Conciertos y festivales", //1
      },
      {
        name: "Teatro y cultura", //2
      },
      {
        name: "Deportes", //3
      },
      {
        name: "Familiares", //4
      },
      {
        name: "Especiales", //5
      },
    ],
  });

  await prisma.eventSubCategory.createMany({
    data: [
      {
        name: "Electronica",
        parent_event_categoryId: 1,
      },
      {
        name: "Festivales",
        parent_event_categoryId: 1,
      },
      {
        name: "Rock & Metal",
        parent_event_categoryId: 1,
      },
      {
        name: "Drama",
        parent_event_categoryId: 2,
      },
      {
        name: "Musica clasica",
        parent_event_categoryId: 2,
      },
      {
        name: "Automovilismo",
        parent_event_categoryId: 4,
      },
      {
        name: "Futbol",
        parent_event_categoryId: 4,
      },
      {
        name: "Seminarios y conferencias",
        parent_event_categoryId: 5,
      },
    ],
  });

  await prisma.event.create({
    data: {
      name: "Tomorrowland",
      description: "Tomorrowland es un festival de música electrónica",
      organizationId: 1,
      event_location: "Bélgica",
      start_date: new Date("2021-07-16"),
      end_date: new Date("2021-07-18"),
      start_time: "23:00",
      end_time: "23:00",
      event_logo_url:
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Logo-tomorrowland.jpg",
      event_banner_url:
        "https://media.resources.festicket.com/www/admin/uploads/images/Tomorrowland2022-1.jpg",
      event_location_url: "https://goo.gl/maps/yBHzTgwNdsRJGR5Q6",
      re_entry: true,
      userId: 1,
      event_social_media: {
        create: {
          name: "Facebook",
          url: "https://www.facebook.com/tomorrowland/",
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
