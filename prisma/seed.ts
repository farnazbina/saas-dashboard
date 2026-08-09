// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 شروع فرآیند Seed...')

  // 1. ایجاد دسته‌بندی‌ها (Categories)
  const webDev = await prisma.category.create({
    data: { name: 'Web Development' }
  })
  const mobileDev = await prisma.category.create({
    data: { name: 'Mobile Development' }
  })
  const uiUx = await prisma.category.create({
    data: { name: 'UI/UX Design' }
  })
  console.log('✅ دسته‌بندی‌ها ایجاد شدند.')

  // 2. ایجاد مشتریان (Clients)
  const client1 = await prisma.client.create({
    data: {
      name: 'Company A',
      email: 'client1@example.com',
      phone: '09121234567',
      company: 'Company A'
    }
  })
  const client2 = await prisma.client.create({
    data: {
      name: 'Company B',
      email: 'client2@example.com',
      phone: '09127654321',
      company: 'Company B'
    }
  })
  const client3 = await prisma.client.create({
    data: {
      name: 'Company C',
      email: 'client3@example.com',
      phone: '09123334444',
      company: 'Company C'
    }
  })
  console.log('✅ مشتریان ایجاد شدند.')

  // 3. ایجاد کاربران (Users) با نقش‌های مختلف
  // تیم‌لیدها
  const teamLead1 = await prisma.user.create({
    data: { name: 'Maryam Nouri', email: 'teamlead1@example.com', role: 'TEAM_LEAD' }
  })
  const teamLead2 = await prisma.user.create({
    data: { name: 'Zahra Asadi', email: 'teamlead2@example.com', role: 'TEAM_LEAD' }
  })
  const teamLead3 = await prisma.user.create({
    data: { name: 'Sara Ahmadi', email: 'teamlead3@example.com', role: 'TEAM_LEAD' }
  })
  // اعضای عادی
  const member1 = await prisma.user.create({
    data: { name: 'Reza Mohammadi', email: 'member1@example.com', role: 'MEMBER' }
  })
  const member2 = await prisma.user.create({
    data: { name: 'Ali Karimi', email: 'member2@example.com', role: 'MEMBER' }
  })
  console.log('✅ کاربران ایجاد شدند.')

  // 4. ایجاد پروژه‌ها (Projects) با ارجاع به رکوردهای بالا
  await prisma.project.createMany({
    data: [
      {
        name: 'Online Store Project',
        description: 'Online store website with React and Next.js',
        status: 'IN_PROGRESS',
        categoryId: webDev.id,
        clientId: client1.id,
        teamLeadId: teamLead1.id,
        memberId: member1.id,
      },
      {
        name: 'Financial Management Mobile App',
        description: 'Mobile app for financial management with React Native',
        status: 'TODO',
        categoryId: mobileDev.id,
        clientId: client2.id,
        teamLeadId: teamLead2.id,
        memberId: member2.id,
      },
      {
        name: 'Dashboard Design',
        description: 'UI/UX design for the dashboard',
        status: 'DONE',
        categoryId: uiUx.id,
        clientId: client3.id,
        teamLeadId: teamLead3.id,
        memberId: member1.id,
      }
    ],
    skipDuplicates: true, // در صورت اجرای مجدد، از ایجاد تکراری جلوگیری می‌کند
  })
  console.log('✅ پروژه‌ها ایجاد شدند.')

  console.log('🎉 تمام داده‌های اولیه با موفقیت درج شدند.')
}

main()
  .catch((e) => {
    console.error('❌ خطا در seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })