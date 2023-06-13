//@ts-nocheck
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient();

if (process.env.VERCEL_ENV === "development") global.prisma = prisma;

export default prisma