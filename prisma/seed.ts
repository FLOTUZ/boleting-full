import { faker } from "@faker-js/faker";
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
        name: "DESARROLLADOR",
      },
      {
        name: "MANAGER",
      },
      {
        name: "ASISTENTE",
      },
      {
        name: "CAJERO",
      },
      {
        name: "SPONSOR",
      },
    ],
  });

  await prisma.organization.create({
    data: {
      name: "The Core Events",
    },
  });

  await prisma.organization.create({
    data: {
      name: "Test Organization",
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

  await prisma.userClient.create({
    data: {
      name: "Asistente",
      last_name: "Asistente",
      email: "asistente@thecore.events",
      password: await argon2.hash("asistente"),
      role: {
        connect: {
          name: "ASISTENTE",
        },
      },
    },
  });

  const fakeUserClients = Array.from({ length: 100 }).map(async () => {
    return {
      name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: await argon2.hash("asistente"),
      roleId: roles.find((role) => role.name === "ASISTENTE")?.id!,
    };
  });

  await prisma.userClient.createMany({
    data: await Promise.all(fakeUserClients),
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

  await prisma.event.create({
    data: {
      name: "Electric Daisy Carnival",
      description:
        "Electric Daisy Carnival es un festival de música electrónica",
      organizationId: 1,
      event_location: "CDMX, México",
      start_date: new Date("2024-02-26"),
      end_date: new Date("2024-02-28"),
      start_time: "14:00",
      end_time: "23:00",
      event_logo_url:
        "https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/11/12181722/edc_2020_web_our_world_tile_1080x1080_r01v2.jpg",
      event_banner_url:
        "https://majomontemayor.com/wp-content/uploads/2019/08/EDCLV2019_0517_193353-1603_CCW.jpg",
      event_location_url: "https://goo.gl/maps/G2JymRFzCGzKbgeF7",
      re_entry: true,
      userId: 1,
      event_social_media: {
        create: {
          name: "Facebook",
          url: "https://www.facebook.com/ElectricDaisyCarnivalMexico",
        },
      },
    },
  });

  await prisma.event.create({
    data: {
      name: "Blackpink",
      description: "Blackpink es un grupo de K-pop",
      organizationId: 2,
      event_location: "CDMX, México",
      start_date: new Date("2021-12-02"),
      end_date: new Date("2021-12-02"),
      start_time: "20:00",
      end_time: "23:00",
      event_logo_url:
        "https://i.pinimg.com/originals/7e/82/80/7e8280cc0fd26eeb00d17821a4e6f0e2.jpg",
      event_banner_url:
        "https://kpopvip.com/wp-content/uploads/2022/04/Blackpink-este-2022-1024x650.jpg",
      event_location_url: "https://goo.gl/maps/G2JymRFzCGzKbgeF7",
      re_entry: false,
      userId: 1,
      event_social_media: {
        create: {
          name: "Facebook",
          url: "https://www.facebook.com/BLACKPINKOFFICIAL",
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
