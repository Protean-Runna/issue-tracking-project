import "dotenv/config"

import { PrismaClient } from "@/app/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg";
const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
}; 

const adapter =  new PrismaPg({
  connectionString: process.env.DATABASE_URL
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