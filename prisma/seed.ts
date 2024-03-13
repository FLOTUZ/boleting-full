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
        name: "Kpop",
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

  // =========== Logos ================

  const tomorrowlandLogo = await prisma.image.create({
    data: {
      new_name: "tomorrowland-logo",
      size: 100,
      url: "https://soundcinemas.files.wordpress.com/2020/04/logo-tomorrowland.jpg",
    },
  });

  const edcLogo = await prisma.image.create({
    data: {
      new_name: "edc-logo",
      size: 100,
      url: "https://img.ocesa.com.mx/events/EDC_Mexico/squared/1691707934321.jpg",
    },
  });

  const blackpinkLogo = await prisma.image.create({
    data: {
      new_name: "blackpink-logo",
      size: 100,
      url: "https://i.pinimg.com/originals/00/5b/36/005b36c78f2ba0585416fccd55d58439.jpg",
    },
  });

  //=========== Banner ================

  const tomorrowlandBanner = await prisma.image.create({
    data: {
      new_name: "tomorrowland-banner",
      size: 100,
      url: "https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/opengraph/festival-2022.jpg",
    },
  });

  const edcBanner = await prisma.image.create({
    data: {
      new_name: "edc-banner",
      size: 100,
      url: "https://prismic-images.tmol.io/ticketmaster-tm-mx/f3cbd96f-daf7-457b-b38e-dc5701a8ccd4_EDC24_fotos_tipodeboleto_HEADER1024x432px.jpg",
    },
  });

  const blackpinkBanner = await prisma.image.create({
    data: {
      new_name: "blackpink-banner",
      size: 100,
      url: "https://i.pinimg.com/736x/b3/6c/0c/b36c0c7d7e0fdb71a597ba8edc3730cd.jpg",
    },
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
      event_logoId: tomorrowlandLogo.id,
      event_bannerId: tomorrowlandBanner.id,
      event_location_url: "https://goo.gl/maps/yBHzTgwNdsRJGR5Q6",
      re_entry: true,
      userId: 1,
      event_social_media: {
        create: {
          name: "Facebook",
          url: "https://www.facebook.com/tomorrowland/",
        },
      },
      event_sub_categories: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  await prisma.accessType.createMany({
    data: [
      { name: "GA", price: 1000, eventId: 1, available_tickets_count: 30 },
      { name: "VIP", price: 1000, eventId: 1, available_tickets_count: 10 },
      {
        name: "PATREON",
        price: 1000,
        eventId: 1,
        available_tickets_count: 100,
        is_courtesy: true,
      },
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
      event_logoId: edcLogo.id,
      event_bannerId: edcBanner.id,
      event_location_url: "https://goo.gl/maps/G2JymRFzCGzKbgeF7",
      re_entry: true,
      userId: 1,
      event_social_media: {
        create: {
          name: "Facebook",
          url: "https://www.facebook.com/ElectricDaisyCarnivalMexico",
        },
      },
      event_sub_categories: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  await prisma.accessType.createMany({
    data: [
      { name: "GA", price: 1000, eventId: 2, available_tickets_count: 15 },
    ],
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
      event_logoId: blackpinkLogo.id,
      event_bannerId: blackpinkBanner.id,
      event_location_url: "https://goo.gl/maps/G2JymRFzCGzKbgeF7",
      re_entry: false,
      userId: 1,
      event_social_media: {
        create: {
          name: "Facebook",
          url: "https://www.facebook.com/BLACKPINKOFFICIAL",
        },
      },
      event_sub_categories: {
        connect: [{ id: 4 }],
      },
    },
  });

  await prisma.accessType.createMany({
    data: [
      {
        name: "GENERAL A",
        price: 1000,
        eventId: 3,
        available_tickets_count: 10,
      },
      {
        name: "GENERAL B",
        price: 1000,
        eventId: 3,
        available_tickets_count: 10,
      },
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
