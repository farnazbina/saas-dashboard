// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
    // 1. ایجاد دسته‌بندی‌ها
    const categories = await prisma.category.createMany({
        data: [
            { name: 'Web Development' },
            { name: 'Mobile App' },
            { name: 'UI?UX Design' },
            { name: 'Support' },
            { name: 'Data Analyze' },
        ],
        skipDuplicates: true,
    });

    // 2. ایجاد کلاینت‌ها
    const clients = await prisma.client.createMany({
        data: [
            { name: 'Company A', email: 'a@example.com', company: 'A-Tech' },
            { name: 'Company B', email: 'b@example.com', company: 'B-Saz' },
            { name: 'Shop C', email: 'c@example.com', phone: '09121112222' },
        ],
        skipDuplicates: true,
    });

    // 3. ایجاد کاربران (تیم لید و اعضا)
    const users = await prisma.user.createMany({
        data: [
            { name: 'Ali Mohammadi', email: 'ali@example.com', role: Role.TEAM_LEAD },
            { name: 'Sara Hosseini', email: 'sara@example.com', role: Role.TEAM_LEAD },
            { name: 'Reza Karimi', email: 'reza@example.com', role: Role.MEMBER },
            { name: 'Maryam Nouri', email: 'maryam@example.com', role: Role.MEMBER },
            { name: 'Mohammad Rezaei', email: 'mohammad@example.com', role: Role.MEMBER },
            { name: 'Zahra Mousavi', email: 'zahra@example.com', role: Role.ADMIN },
        ],
        skipDuplicates: true,
    });

    console.log('داده‌های اولیه با موفقیت درج شدند.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });