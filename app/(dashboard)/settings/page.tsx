"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// ---------- Zod Schema ----------
const settingsSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(50),
    lastName: z.string().min(1, "Last name is required").max(50),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    bio: z.string().max(300, "Bio must be at most 300 characters").optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

// ---------- Mock data (replace with real fetch) ----------
const DEFAULT_VALUES: SettingsFormValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    bio: "Full-stack developer & UI/UX enthusiast.",
};

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: DEFAULT_VALUES,
    });

    // ---------- File handling ----------
    const handleFile = (file: File) => {
        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file.");
            return;
        }
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // ---------- Drag & Drop handlers ----------
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    // ---------- Click upload handler ----------
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        // Reset input so same file can be re-uploaded
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // ---------- Submit handler ----------
    async function onSubmit(values: SettingsFormValues) {
        setIsLoading(true);
        try {
            // TODO: Call your API / server action
            // const formData = new FormData();
            // formData.append("firstName", values.firstName);
            // formData.append("lastName", values.lastName);
            // formData.append("email", values.email);
            // formData.append("phone", values.phone || "");
            // formData.append("bio", values.bio || "");
            // if (fileInputRef.current?.files?.[0]) {
            //   formData.append("avatar", fileInputRef.current.files[0]);
            // }
            // await updateProfile(formData);

            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // ---------- Reset form ----------
    const handleReset = () => {
        form.reset(DEFAULT_VALUES);
        setAvatarPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold tracking-tight mb-6">Settings</h1>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Update your personal information and avatar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Avatar Upload with Drag & Drop */}
                        <div
                            className={cn(
                                "flex items-center gap-6 p-4 rounded-md border-2 border-dashed transition-colors",
                                isDragging
                                    ? "border-primary bg-primary/5"
                                    : "border-muted-foreground/20 hover:border-muted-foreground/40"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <Avatar className="w-20 h-20 shrink-0">
                                <AvatarImage
                                    src={avatarPreview || "/placeholder-avatar.png"}
                                />
                                <AvatarFallback>
                                    {form.watch("firstName")?.[0]}
                                    {form.watch("lastName")?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isLoading}
                                >
                                    Upload Avatar
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                    disabled={isLoading}
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Drag & drop or click to upload. JPG, PNG or GIF. Max 5MB.
                                </p>
                            </div>
                        </div>

                        <FieldGroup className="space-y-4">
                            {/* First & Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Controller
                                    name="firstName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="firstName">
                                                First Name <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                id="firstName"
                                                {...field}
                                                placeholder="John"
                                                disabled={isLoading}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="lastName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="lastName">
                                                Last Name <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                id="lastName"
                                                {...field}
                                                placeholder="Doe"
                                                disabled={isLoading}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Email */}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="email">
                                                Email <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...field}
                                                placeholder="you@example.com"
                                                disabled={isLoading}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Phone */}
                                <Controller
                                    name="phone"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                            <Input
                                                id="phone"
                                                {...field}
                                                placeholder="+1 (555) 000-0000"
                                                disabled={isLoading}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <FieldDescription>
                                                Optional. We'll only use this for urgent contact.
                                            </FieldDescription>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* Bio with character count */}
                            <Controller
                                name="bio"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    const value = field.value || "";
                                    return (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="bio">Bio</FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    id="bio"
                                                    {...field}
                                                    placeholder="Tell us a little about yourself..."
                                                    rows={4}
                                                    className="min-h-24 resize-none"
                                                    aria-invalid={fieldState.invalid}
                                                    disabled={isLoading}
                                                />
                                                <InputGroupAddon align="block-end">
                                                    <InputGroupText className="tabular-nums">
                                                        {value.length}/300 characters
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            <FieldDescription>
                                                Brief description for your profile. Max 300 characters.
                                            </FieldDescription>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    );
                                }}
                            />
                        </FieldGroup>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}