import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  await prisma.ability.createMany({
    data: [
      {
        name: "read:organizations",
      },
      {
        name: "read:courtesy-ticket",
      },
      {
        name: "create:courtesy-ticket",
      },
    ],
  });

  await prisma.organization.createMany({
    data: [
      {
        name: "The Core Events",
      },
      {
        name: "Test Organization",
      },
    ],
  });

  await prisma.role.createMany({
    data: [
      {
        name: "ADMIN",
        description: "Super Administrador",
        organizationId: 1,
      },
      {
        name: "DESARROLLADOR",
        description: "Desarrollador de la plataforma",
        organizationId: 1,
      },
      {
        name: "MANAGER",
        description: "Gerente de la organización",
        organizationId: 1,
      },

      {
        name: "CAJERO",
        description: "Cajero de la organización",
        organizationId: 1,
      },
      {
        name: "SPONSOR",
        description: "Patrocinador de la organización",
        organizationId: 1,
      },
      {
        name: "ASISTENTE",
        description: "Clientes que asisten a los eventos",
        organizationId: 1,
      },
      {
        name: "DEALER",
        description: "Dispensario de tickets en efectivo",
        organizationId: 1,
      },
    ],
  });

  const adminHabilities = [
    "read:organizations",
    "create:courtesy-ticket",
    "read:courtesy-ticket",
  ];
  await prisma.role.update({
    where: { name: "ADMIN" },
    data: {
      abilities: {
        connect: adminHabilities.map((ability) => ({ name: ability })),
      },
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

  await prisma.user.create({
    data: {
      name: "Distribuidor",
      last_name: "Autorizado",
      email: "distribuidor@thecore.events",
      password: await argon2.hash("distribuidor"),
      roles: {
        connect: { name: "DEALER" },
      },
      organization: {
        connect: { name: "The Core Events" },
      },
    },
  });

  await prisma.authorizedDealer.create({
    data: {
      name: "Distribuidor autorizado",
      description: "Pago vía distribuidor autorizado",
      address: "1000, Madero, Colonia Centro, Morelia, Mich., México",
      email: "distribuidor@thecore.events",
      telephone: "555 555 555",
      is_verified: true,
      commision: 5,
      user: {
        connect: { email: "distribuidor@thecore.events" },
      },
    },
  });

  await prisma.paymentMethod.create({
    data: {
      payment_type: "DEALER",
      description: "Pago vía distribuidor autorizado",
    },
  });

  await prisma.paymentMethod.create({
    data: {
      payment_type: "DEBIT_CARD",
      description: "Pago vía tarjeta de debito",
      payment_card: {
        create: {
          nick_name: "TEST CARD",
          card_number: "1111 2222 3333 4444",
          expiration_date: "10/25",
          is_credit_card: false,
          owner_name: "TEST",
          country: "MX",
          user_clientId: 1,
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
        event_categoryId: 1,
      },
      {
        name: "Festivales",
        event_categoryId: 1,
      },
      {
        name: "Rock & Metal",
        event_categoryId: 1,
      },
      {
        name: "Drama",
        event_categoryId: 2,
      },
      {
        name: "Musica clasica",
        event_categoryId: 2,
      },
      {
        name: "Automovilismo",
        event_categoryId: 3,
      },
      {
        name: "Futbol",
        event_categoryId: 3,
      },
      {
        name: "Seminarios y conferencias",
        event_categoryId: 4,
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

  await prisma.accessType.createMany({
    data: [
      { name: "GA", price: 1000, eventId: 1 },
      { name: "VIP", price: 1000, eventId: 1 },
      { name: "PATREON", price: 1000, eventId: 1 },
    ],
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

  await prisma.accessType.createMany({
    data: [{ name: "GA", price: 1000, eventId: 2 }],
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
  await prisma.accessType.createMany({
    data: [
      { name: "GENERAL A", price: 1000, eventId: 3 },
      { name: "GENERAL B", price: 1000, eventId: 3 },
    ],
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
