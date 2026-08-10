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
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// ---------- Zod Schema ----------
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// ---------- Component ----------
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    // ---------- Submit ----------
    async function onSubmit(values: LoginFormValues) {
        setIsLoading(true);
        try {
            // TODO: Call your API / server action
            // const result = await login(values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Welcome back! Redirecting...");
            // Redirect to dashboard or home
        } catch (error) {
            toast.error("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // ---------- Google Login ----------
    const handleGoogleLogin = () => {
        toast.info("Google login coming soon.");
        // Redirect to Google OAuth flow
    };

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
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Google Login Button */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center gap-2 mb-4"
                        onClick={handleGoogleLogin}
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
                        Continue with Google
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
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error?.message]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Keep me signed in */}
                            <Controller
                                name="rememberMe"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="rememberMe"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isLoading}
                                            />
                                            <label
                                                htmlFor="rememberMe"
                                                className="text-sm text-muted-foreground cursor-pointer"
                                            >
                                                Keep me signed in
                                            </label>
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error?.message]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}