import { PrismaClient } from "@prisma/client";

//Prisma Client instance for production
declare global {
  // eslint-disable-next-line no-var
  var prismaRepository: PrismaClient | undefined;
}

//Prisma Client instance for development
export const prismaRepository =
  global.prismaRepository ||
  new PrismaClient({
    log: ["error"],
    //Logging for querys in development
    // log: ["query"],
  });

if (process.env.NODE_ENV !== "production")
  global.prismaRepository = prismaRepository;
