"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// ---------- Zod Schema ----------
const signupSchema = z
    .object({
        firstName: z.string().min(1, "First name is required").max(50),
        lastName: z.string().min(1, "Last name is required").max(50),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        terms: z.boolean().refine((val) => val === true, {
            message: "You must agree to the terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignupFormValues = z.infer<typeof signupSchema>;

// ---------- Component ----------
export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    // ---------- Submit ----------
    async function onSubmit(values: SignupFormValues) {
        setIsLoading(true);
        try {
            // TODO: Call your API / server action
            // const result = await signup(values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Account created successfully! Please check your email.");
            form.reset();
        } catch (error) {
            toast.error("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // ---------- Google Signup ----------
    const handleGoogleSignup = () => {
        toast.info("Google sign-up coming soon.");
        // Redirect to Google OAuth flow
    };

    // ---------- Password strength indicator ----------
    const getPasswordStrength = (password: string) => {
        if (!password) return { score: 0, label: "Weak", color: "bg-muted" };
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        const map: Record<number, { label: string; color: string }> = {
            0: { label: "Weak", color: "bg-error" },
            1: { label: "Weak", color: "bg-error" },
            2: { label: "Fair", color: "bg-warning" },
            3: { label: "Good", color: "bg-info" },
            4: { label: "Strong", color: "bg-success" },
            5: { label: "Very Strong", color: "bg-success" },
        };
        return map[score] || map[0];
    };

    const passwordValue = form.watch("password");
    const strength = getPasswordStrength(passwordValue);

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    {/* Logo */}
                    <div className="flex justify-center mb-2">
                        <div className="h-12 w-12 relative">
                            <Image
                                src="/logo.png" // Replace with your actual logo
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Google Signup Button */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center gap-2 mb-4"
                        onClick={handleGoogleSignup}
                        disabled={isLoading}
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign up with Google
                    </Button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="space-y-4">
                            {/* First & Last Name */}
                            <div className="grid grid-cols-2 gap-3">
                                <Controller
                                    name="firstName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                            <Input
                                                id="firstName"
                                                {...field}
                                                placeholder="John"
                                                disabled={isLoading}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error?.message]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="lastName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                            <Input
                                                id="lastName"
                                                {...field}
                                                placeholder="Doe"
                                                disabled={isLoading}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error?.message]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* Email */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...field}
                                            placeholder="you@example.com"
                                            disabled={isLoading}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error?.message]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Password */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                {...field}
                                                placeholder="••••••••"
                                                disabled={isLoading}
                                                aria-invalid={fieldState.invalid}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                onClick={() => setShowPassword(!showPassword)}
                                                tabIndex={-1}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {/* Password Rules */}
                                        <FieldDescription>
                                            Use 8+ characters with letters, numbers & symbols.
                                        </FieldDescription>
                                        {/* Strength Indicator */}
                                        {passwordValue && (
                                            <div className="mt-1 space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-muted-foreground">
                                                        Strength:
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "font-medium",
                                                            strength.label === "Weak" && "text-error",
                                                            strength.label === "Fair" && "text-warning",
                                                            strength.label === "Good" && "text-info",
                                                            strength.label === "Strong" && "text-success",
                                                            strength.label === "Very Strong" &&
                                                            "text-success"
                                                        )}
                                                    >
                                                        {strength.label}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full rounded-full bg-muted">
                                                    <div
                                                        className={cn(
                                                            "h-1.5 rounded-full transition-all",
                                                            strength.color
                                                        )}
                                                        style={{
                                                            width: `${(strength.score / 5) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error?.message]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Confirm Password */}
                            <Controller
                                name="confirmPassword"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="confirmPassword">
                                            Confirm Password
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                {...field}
                                                placeholder="••••••••"
                                                disabled={isLoading}
                                                aria-invalid={fieldState.invalid}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                tabIndex={-1}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error?.message]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Terms Agreement */}
                            <Controller
                                name="terms"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="flex items-start gap-2">
                                            <Checkbox
                                                id="terms"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isLoading}
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm text-muted-foreground leading-tight"
                                            >
                                                I agree to the{" "}
                                                <Link
                                                    href="/terms"
                                                    className="text-primary hover:underline"
                                                >
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link
                                                    href="/privacy"
                                                    className="text-primary hover:underline"
                                                >
                                                    Privacy Policy
                                                </Link>
                                            </label>
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error?.message]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Create Account"}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}