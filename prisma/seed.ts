// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  // اضافه کردن تیم لیدها با نام صحیح مدل
  const teamLead = await prisma.teamLead.createMany({
    data: [
      { name: 'Maryam Nouri', email: 'teamlead1@example.com', phone: '091212312312' },
      { name: 'Zahra Asadi', email: 'teamlead2@example.com', phone: '091245645656' },
      { name: 'Sara Ahmadi', email: 'teamlead3@example.com', phone: '09121112222' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ داده‌های اولیه با موفقیت درج شدند.');
}

main()
  .catch((e) => {
    console.error('❌ خطا در seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });