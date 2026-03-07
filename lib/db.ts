import "dotenv/config"

import { PrismaClient } from "@/app/generated/prisma/client"; 
import { PrismaMariaDb } from "@prisma/adapter-mariadb"; 
const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
}; 

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prismaClientSingleton = () =>{
    return new PrismaClient({adapter})
}
declare const globalThis:{
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma; 
export default prisma; 