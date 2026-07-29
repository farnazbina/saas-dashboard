import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// استفاده از adapter مخصوص PostgreSQL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

// جلوگیری از ایجاد چندین نمونه در حالت development
const globalForPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma