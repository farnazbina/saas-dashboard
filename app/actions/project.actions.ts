'use server'

import prisma from "@/lib/prisma";
import { revalidatePath, updateTag, unstable_cache } from "next/cache";
import { cache } from "react";
import z, { success } from "zod";

const projectSchema = z.object({
    name: z.string().min(3, 'نام پروژه حداقل ۳ کاراکتر است.').max(64),
    description: z.string().min(10, 'توضیحات حداقل ۱۰ کاراکتر است.').max(500),
    categoryId: z.string().min(1, 'دسته‌بندی را انتخاب کنید.'),
    clientId: z.string().min(1, 'مشتری را انتخاب کنید.'),
    teamLeadId: z.string().min(1, 'تیم لید را انتخاب کنید.'),
    memberId: z.string().min(1, 'حداقل یک عضو تیم انتخاب کنید.'),
})

export async function createProject(formData: FormData) {
    const rawData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        categoryId: formData.get('categoryId') as string,
        clientId: formData.get('clientId') as string,
        teamLeadId: formData.get('teamLeadId') as string,
        memberId: formData.get('memberId') as string,
    }

    const result = projectSchema.safeParse(rawData)
    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }

    const { name, description, categoryId, clientId, teamLeadId, memberId } = result.data

    try {
        // ایجاد پروژه در دیتابیس
        await prisma.project.create({
            data: {
                name,
                description,
                categoryId,
                clientId,
                teamLeadId,
                memberId: memberId
            },
        })

        // به‌روزرسانی کش صفحه‌ی پروژه‌ها
        updateTag('projects-list')
        revalidatePath('/projects')

        return {
            success: true,
            message: 'پروژه با موفقیت ایجاد شد.',
        }
    } catch (error) {
        console.error('Error creating project:', error)
        return {
            success: false,
            message: 'خطا در ایجاد پروژه. لطفاً دوباره تلاش کنید.',
        }
    }
}

export async function updateProject(id: string, formData: FormData) {
    const rawData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        categoryId: formData.get('categoryId') as string,
        clientId: formData.get('clientId') as string,
        teamLeadId: formData.get('teamLeadId') as string,
        memberIds: formData.getAll('memberIds') as string[],
    }

    const result = projectSchema.safeParse(rawData)
    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { name, description, categoryId, clientId, teamLeadId, memberId } = result.data

    try {
        // بروزرسانی پروژه
        await prisma.project.update({
            where: { id },
            data: {
                name,
                description,
                categoryId,
                clientId,
                teamLeadId,
                memberId
            },
        })

        revalidatePath('/dashboard/projects')
        revalidatePath(`/dashboard/projects/${id}`)

        return {
            success: true,
            message: 'پروژه با موفقیت بروزرسانی شد.',
        }
    } catch (error) {
        console.error('Error updating project:', error)
        return {
            success: false,
            message: 'خطا در بروزرسانی پروژه.',
        }
    }
}

// ---------- حذف پروژه ----------
export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({
            where: { id },
        })

        revalidatePath('/dashboard/projects')
        return {
            success: true,
            message: 'پروژه با موفقیت حذف شد.',
        }
    } catch (error) {
        console.error('Error deleting project:', error)
        return {
            success: false,
            message: 'خطا در حذف پروژه.',
        }
    }
}

// ---------- دریافت یک پروژه برای ویرایش (اختیاری) ----------
export const getProjects = unstable_cache(
    async () => {
        console.log('🔵 Fetching projects from database...')
        return await prisma.project.findMany({
            select: {
                id: true,
                name: true,
                status: true,
                category: { select: { name: true } },
                client: { select: { name: true } },
                teamLead: { select: { name: true } },
                member: { select: { name: true } },
            },
            orderBy: { createdAt: 'desc' },
        })
    },
    ['projects-list'],
    { revalidate: 3600, tags: ['projects-list'] } // هر ۶۰ ثانیه یکبار کش به‌روز میشه
)