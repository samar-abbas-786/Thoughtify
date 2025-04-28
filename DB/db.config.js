import { PrismaClient } from "../app/generated/prisma/client.js";

const prisma = new PrismaClient({
  log: ["query"],
});

export default prisma;
