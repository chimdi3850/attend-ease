import { authClient } from "@/lib/auth-client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@attend-ease/ui/components/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@attend-ease/ui/components/field";
import { Input} from "@attend-ease/ui/components/input";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from '@tanstack/react-router';
import { toast } from "sonner";
import { z } from "zod";
import{ Button,buttonVariants } from "@attend-ease/ui/components/button";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((values) => values.confirmPassword === values.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});

function RouteComponent() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: ({ value }) => {
            toast.promise(authClient.signUp.email(value), {
                loading: "Signing you up..",
                error: "Failed to sign up",
                success: "Signup is Successful!!",
            })
        }
    });
    return(
        <div className="flex h-screen flex-col items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form 
                    className="w-full"
                        onSubmit={(e) =>{
                            console.log(form.getAllErrors())
                            e.preventDefault();
                            form.handleSubmit();
                        }}>
                            <FieldGroup>
                                <form.Field name="name">
                                    {(field) => {
                                        const isInvalid = 
                                            field.state.meta.isTouched && !field.state.meta.isValid;
                                       return(
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                            <Input
											aria-invalid={isInvalid}
											autoComplete='name'
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Red John"
											type="text" className="rounded-sm"
										/>
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                       );
                                    }}
                                </form.Field>
                                <form.Field name="email">
                                    {(field) => {
                                        const isInvalid = 
                                            field.state.meta.isTouched && !field.state.meta.isValid;
                                        return(
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                                <Input
                                                    aria-invalid={isInvalid}
                                                    autoComplete="email"
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    placeholder="m@example.com"
                                                    type="email" className="rounded-sm"
										        />
                                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                                <FieldDescription>We'll use this to contact you. We will not share <br />your email with anyone else.</FieldDescription>
                                            </Field>
                                        );
                                    }}
                                </form.Field>
                                <form.Field name="password">
                                    {(field) =>{
                                        const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                        return(
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name} className="flex items-center justify-between">
                                                    <span>Password</span>
                                                </FieldLabel>
                                                <Input
                                                    aria-invalid={isInvalid}
                                                    autoComplete="new-password"
                                                    id={field.name}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    type="password" className="rounded-sm"
                                                    value={field.state.value}
                                                />
                                                 <FieldDescription>Password musg be at least 8 characters.</FieldDescription>
                                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                            </Field>
                                        );
                                    }}
                                </form.Field>
                                <form.Field name="confirmPassword">
                                    {(field) =>{
                                        const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                        return(
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name} className="flex items-center justify-between">
                                                    <span>Confirm password</span>
                                                </FieldLabel>
                                                <Input
                                                    aria-invalid={isInvalid}
                                                    autoComplete="new-password"
                                                    id={field.name}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    type="password" className="rounded-sm"
                                                    value={field.state.value}
                                                />
                                                 <FieldDescription>Please confirm your password.</FieldDescription>
                                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                            </Field>
                                        );
                                    }}
                                </form.Field>
                                <FieldGroup>
                                    <form.Subscribe selector={state => state.isSubmitting}>
                                        {s => <Button type="submit" className="w-full rounded-sm" disabled={s}>Create Account</Button>}
                                    </form.Subscribe>
                                    <Button variant={"outline"} className="w-full rounded-sm">Sign up with Google</Button>
                                </FieldGroup>
                                <FieldDescription className="text-center">Already have an account?  <Link to="/login" className='underline underline-offset-4'>Log In</Link></FieldDescription>
                            </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
