"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useTransition } from "react"
import { redirect } from "next/navigation"

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import { useCategories, useClients, useUsers } from "@/lib/queries"
import { createProject } from "@/app/actions/project.actions"
import { Button } from "@/components/ui/button"

// ---------- 1. تعریف Schema با فیلدهای کامل ----------
const formSchema = z.object({
    name: z
        .string()
        .min(3, "Project name must be at least 3 characters.")
        .max(64, "Project name must be at most 64 characters."),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters.")
        .max(500, "Description must be at most 500 characters."),
    categoryId: z.string().min(1, "Please select a category."),
    clientId: z.string().min(1, "Please select a client."),
    teamLeadId: z.string().min(1, "Please select a team lead."),
    memberId: z.string().min(1, "Please select a team member."),
})

type FormValues = z.infer<typeof formSchema>
type Client = { id: string; name: string; company?: string }
type User = { id: string; name: string; email: string; role: 'ADMIN' | 'TEAM_LEAD' | 'MEMBER' }

interface CreateProjectModalProps {
    onClose: () => void
}

// ---------- کامپوننت Skeleton برای سلکت‌باکس ----------
const SelectSkeleton = () => (
    <div className="w-full h-10 rounded-md border border-input bg-muted animate-pulse" />
)

const MultiSelectSkeleton = () => (
    <div className="w-full h-[100px] rounded-md border border-input bg-muted animate-pulse" />
)

// ---------- کامپوننت اصلی ----------
export default function CreateProjectPage() {
    const [isPending, startTransition] = useTransition()

    // دریافت داده‌ها
    const { data: categories = [], isPending: categoriesPending } = useCategories()
    const { data: clients = [], isPending: clientsPending } = useClients()
    const { data: users = [], isPending: usersPending } = useUsers()
    console.log(categories, clients, users)

    const teamLeads = users.filter((user: User) => user.role === 'TEAM_LEAD')
    const members = users.filter((user: User) => user.role === 'MEMBER')

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            clientId: "",
            memberId: "",
            teamLeadId: "",
        },
    })

    // ---------- تابع Submit با استفاده از Server Action ----------
    function onSubmit(values: FormValues) {
        startTransition(async () => {
            // تبدیل داده‌ها به FormData برای ارسال به Server Action
            console.log('values.memberId', values.memberId)
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("description", values.description)
            formData.append("categoryId", values.categoryId)
            formData.append("clientId", values.clientId)
            formData.append("memberId", values.memberId)
            formData.append("teamLeadId", values.teamLeadId)
            const result = await createProject(formData)

            if (result.success) {
                toast.success(result.message)
                redirect('/projects')
            } else {
                toast.error(result.message || "خطا در ایجاد پروژه")
                // اگر خطاهای اعتبارسنجی وجود دارد، می‌توانید آن‌ها را در فرم نمایش دهید
                if (result.errors) {
                    Object.entries(result.errors).forEach(([key, errors]) => {
                        form.setError(key as any, {
                            type: "manual",
                            message: errors?.[0] || "Invalid field",
                        })
                    })
                }
            }
        })
    }

    // ---------- وضعیت لودینگ کلی ----------
    const loading = categoriesPending || clientsPending || usersPending

    return (
        <form id="create-project-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="project-name">
                                Project Name <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                {...field}
                                id="project-name"
                                placeholder="e.g. E-commerce Platform"
                                aria-invalid={fieldState.invalid}
                                disabled={isPending}
                                className="bg-card"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Controller
                        name="categoryId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="project-category">
                                    Category <span className="text-destructive">*</span>
                                </FieldLabel>
                                {loading ? (
                                    <SelectSkeleton />
                                ) : (
                                    <select
                                        {...field}
                                        id="project-category"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-invalid={fieldState.invalid}
                                        disabled={isPending}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat: any) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="clientId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="project-client">
                                    Client <span className="text-destructive">*</span>
                                </FieldLabel>
                                {loading ? (
                                    <SelectSkeleton />
                                ) : (
                                    <select
                                        {...field}
                                        id="project-client"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-invalid={fieldState.invalid}
                                        disabled={isPending}
                                    >
                                        <option value="">Select a client</option>
                                        {clients.map((client: Client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name} {client.company ? `(${client.company})` : ""}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Controller
                        name="teamLeadId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="project-teamlead">
                                    Team Lead <span className="text-destructive">*</span>
                                </FieldLabel>
                                {loading ? (
                                    <SelectSkeleton />
                                ) : (
                                    <select
                                        {...field}
                                        id="project-teamlead"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-invalid={fieldState.invalid}
                                        disabled={isPending}
                                    >
                                        <option value="">Select a team lead</option>
                                        {teamLeads.map((lead: User) => (
                                            <option key={lead.id} value={lead.id}>
                                                {lead.name} ({lead.email})
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="memberId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="project-member">
                                    Team Member <span className="text-destructive">*</span>
                                </FieldLabel>
                                {loading ? (
                                    <SelectSkeleton />
                                ) : (
                                    <select
                                        {...field}
                                        id="project-member"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-invalid={fieldState.invalid}
                                        disabled={isPending}
                                    >
                                        <option value="">Select a team member</option>
                                        {members.map((member: User) => (
                                            <option key={member.id} value={member.id}>
                                                {member.name} ({member.email})
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="project-description">
                                Description <span className="text-destructive">*</span>
                            </FieldLabel>
                            <InputGroup className="bg-card">
                                <InputGroupTextarea
                                    {...field}
                                    id="project-description"
                                    placeholder="Brief description of the project..."
                                    rows={4}
                                    className="min-h-24 resize-none "
                                    aria-invalid={fieldState.invalid}
                                    disabled={isPending}
                                />
                                <InputGroupAddon align="block-end">
                                    <InputGroupText className="tabular-nums">
                                        {field.value.length}/500 characters
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                                Include the main goals and scope of the project.
                            </FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
            <div className="flex justify-end mt-5">
                <Button type="submit" size="lg">Submit</Button>
            </div>
        </form>
    )
}