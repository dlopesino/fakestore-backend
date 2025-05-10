import { PrismaClient } from '../../../generated/prisma/index';

export const prismaClient = new PrismaClient({
  // * Esta línea le dice a prisma que loguee todas las queries
  //   log: ['query'],
});
