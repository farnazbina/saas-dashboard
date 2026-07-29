"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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

import { useCategories, useClients, useTeamLeads, useUsers } from "@/lib/queries"
import { createProject } from "@/app/actions/project.actions"

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
type User = { id: string; name: string; email: string }

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
export default function CreateProjectModal({ onClose }: CreateProjectModalProps) {
    const [isPending, startTransition] = useTransition()

    // دریافت داده‌ها
    const { data: categories = [], isPending: categoriesPending } = useCategories()
    const { data: clients = [], isPending: clientsPending } = useClients()
    const { data: teamLeads = [], isPending: teamLeadsPending } = useTeamLeads()
    const { data: users = [], isPending: usersPending } = useUsers()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            clientId: "",
            teamLeadId: "",
            memberId: "",
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
            formData.append("teamLeadId", values.teamLeadId)
            formData.append("memberId", values.memberId)

            const result = await createProject(formData)

            if (result.success) {
                toast.success(result.message)
                onClose() // بستن مودال بعد از موفقیت
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
    const loading = categoriesPending || clientsPending || teamLeadsPending || usersPending

    return (
        <Card className="w-xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
                <CardTitle>Create New Project</CardTitle>
                <CardDescription>
                    Fill in the details to create a new project.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="create-project-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="space-y-4">
                        {/* ----- نام پروژه ----- */}
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
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* ----- دو ستونه برای سلکت‌باکس‌ها ----- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* ----- دسته‌بندی (Category) ----- */}
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

                            {/* ----- مشتری (Client) ----- */}
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

                        {/* ----- تیم لید (Team Lead) ----- */}
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

                        {/* ----- اعضای تیم (چند انتخابی) ----- */}
                        <Controller
                            name="memberId"   // ← نام فیلد تغییر کرد
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
                                            {users.map((member: User) => (
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

                        {/* ----- توضیحات ----- */}
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="project-description">
                                        Description <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="project-description"
                                            placeholder="Brief description of the project..."
                                            rows={4}
                                            className="min-h-24 resize-none"
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
                </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                    Cancel
                </Button>
                <Button type="submit" form="create-project-form" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Project"}
                </Button>
            </CardFooter>
        </Card>
    )
}