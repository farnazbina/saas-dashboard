"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

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

// ---------- 1. تعریف Schema (همانند پروژه) ----------
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
    memberIds: z.array(z.string()).min(1, "Select at least one team member."),
})

type FormValues = z.infer<typeof formSchema>

// ---------- 2. نوع داده‌ها ----------
type Category = { id: string; name: string }
type Client = { id: string; name: string; company?: string }

interface CreateProjectModalProps {
    data?: any
    onClose: () => void
}

export default function CreateProjectModal({ onClose }: CreateProjectModalProps) {
    // ---------- 3. State برای هر لیست به‌صورت جداگانه ----------
    const [categories, setCategories] = React.useState<Category[]>([])
    const [clients, setClients] = React.useState<Client[]>([])
    const [loading, setLoading] = React.useState(true)

    // ---------- 4. دریافت داده‌ها از APIهای جداگانه ----------
    React.useEffect(() => {
        const fetchAllData = async () => {
            try {
                // درخواست‌های همزمان با Promise.all
                const [categoriesRes, clientsRes] = await Promise.all([
                    fetch("/api/categories"),
                    fetch("/api/clients"),
                ])

                if (!categoriesRes.ok || !clientsRes.ok) {
                    throw new Error("Failed to fetch one or more data sources")
                }

                const categoriesData = await categoriesRes.json()
                const clientsData = await clientsRes.json()

                console.log('categoriesData', categoriesData)
                console.log('clientsData', clientsData)

                setCategories(categoriesData?.categories)
                setClients(clientsData?.clients)
            } catch (error) {
                console.error("Error fetching form data:", error)
                toast.error("Failed to load form data. Please refresh the page.")
            } finally {
                setLoading(false)
            }
        }

        fetchAllData()
    }, [])

    // ---------- 5. تنظیم React Hook Form ----------
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            clientId: "",
            teamLeadId: "",
            memberIds: [],
        },
    })

    // ---------- 6. تابع Submit (فعلاً لاگ) ----------
    function onSubmit(values: FormValues) {
        toast.success("Project created successfully!", {
            description: (
                <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                    <code>{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
        })
        // بعداً اینجا یک API call یا Server Action برای ایجاد پروژه اضافه می‌شود
        // onClose()
    }

    // ---------- 7. نمایش لودینگ ----------
    if (loading) {
        return (
            <Card className="w-xl">
                <CardContent className="flex items-center justify-center py-8">
                    <p className="text-muted-foreground">Loading form data...</p>
                </CardContent>
            </Card>
        )
    }

    // ---------- 8. رندر فرم ----------
    return (
        <Card className="w-xl">
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
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* ----- توضیحات ----- */}

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
                                        <select
                                            {...field}
                                            id="project-category"
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
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
                                        <select
                                            {...field}
                                            id="project-client"
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <option value="">Select a client</option>
                                            {clients.map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.name} {client.company ? `(${client.company})` : ""}
                                                </option>
                                            ))}
                                        </select>
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
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="project-description"
                                            placeholder="Brief description of the project..."
                                            rows={4}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
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
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" form="create-project-form">
                    Create Project
                </Button>
            </CardFooter>
        </Card>
    )
}