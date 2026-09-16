"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

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
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "@/components/ui/input-group";

// ---------- Step 1 Schema ----------
const emailSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

// ---------- Step 2 Schema ----------
const codeSchema = z.object({
    code: z
        .string()
        .length(6, "Verification code must be exactly 6 digits")
        .regex(/^\d+$/, "Code must contain only numbers"),
});

type CodeFormValues = z.infer<typeof codeSchema>;

// ---------- Component ----------
export default function ForgotPasswordPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    // ---------- Form hooks ----------
    const emailForm = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    });

    const codeForm = useForm<CodeFormValues>({
        resolver: zodResolver(codeSchema),
        defaultValues: { code: "" },
    });

    // ---------- Timer logic ----------
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setIsResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    // ---------- Step 1: Submit email ----------
    async function onSubmitEmail(values: EmailFormValues) {
        setIsLoading(true);
        try {
            // TODO: Call API to send verification code
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmittedEmail(values.email);
            setStep(2);
            toast.success("Verification code sent to your email.");
        } catch (error) {
            toast.error("Failed to send code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // ---------- Step 2: Verify code ----------
    async function onSubmitCode(values: CodeFormValues) {
        setIsLoading(true);
        try {
            // TODO: Call API to verify code
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Code verified! You can now reset your password.");
            // Redirect to reset password page
        } catch (error) {
            toast.error("Invalid code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // ---------- Resend code ----------
    const handleResend = async () => {
        if (isResendDisabled) return;
        setIsResendDisabled(true);
        setResendTimer(90);
        try {
            // TODO: Call API to resend code
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("New verification code sent.");
        } catch (error) {
            toast.error("Failed to resend code.");
            setIsResendDisabled(false);
            setResendTimer(0);
        }
    };

    // ---------- Format timer ----------
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="h-12 w-12 relative">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">
                        {step === 1 ? "Forgot Password" : "Check Your Email"}
                    </CardTitle>
                    <CardDescription>
                        {step === 1
                            ? "Enter your email address and we'll send you a verification code."
                            : `We've sent a 6‑digit code to ${submittedEmail}`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 1 ? (
                        // ---------- Step 1: Email ----------
                        <form onSubmit={emailForm.handleSubmit(onSubmitEmail)}>
                            <FieldGroup className="space-y-4">
                                <Controller
                                    name="email"
                                    control={emailForm.control}
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
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Sending..." : "Send Code"}
                                </Button>
                            </FieldGroup>
                        </form>
                    ) : (
                        // ---------- Step 2: Verification Code ----------
                        <form onSubmit={codeForm.handleSubmit(onSubmitCode)}>
                            <FieldGroup className="space-y-4">
                                <Controller
                                    name="code"
                                    control={codeForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="code">Verification Code</FieldLabel>
                                            <InputGroup>
                                                <Input
                                                    id="code"
                                                    {...field}
                                                    placeholder="123456"
                                                    maxLength={6}
                                                    disabled={isLoading}
                                                    aria-invalid={fieldState.invalid}
                                                    className="text-center text-lg tracking-widest font-mono"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                />
                                                <InputGroupAddon align="block-end">
                                                    <InputGroupText>
                                                        {field.value.length}/6
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Verifying..." : "Verify"}
                                </Button>

                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={isResendDisabled || isLoading}
                                        className={cn(
                                            "text-primary hover:underline",
                                            (isResendDisabled || isLoading) && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        Didn't get the code? Resend
                                    </button>
                                    {isResendDisabled && (
                                        <span className="text-muted-foreground">
                                            {formatTime(resendTimer)}
                                        </span>
                                    )}
                                </div>
                            </FieldGroup>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link
                        href="/login"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sign In
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

// Add cn utility if not imported
import { cn } from "@/lib/utils";