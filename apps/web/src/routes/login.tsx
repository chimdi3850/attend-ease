import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@attend-ease/ui/components/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@attend-ease/ui/components/field";
import { Input } from "@attend-ease/ui/components/input";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth-client"
import { Button, buttonVariants } from "@attend-ease/ui/components/button";

const formSchema = z.object({
	email: z.email({ error: "Please input a valid email address" }),
	password: z.string().min(8),
});

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			toast.promise(authClient.signIn.email(value), {
				loading: "Signing you in...",
				error: "Failed to sign you in",
				success: "Welcome back",
			});
		},
	});
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Log in to your account</CardTitle>
					<CardDescription>
						Enter your email below to log in to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className="w-full"
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
                            <form.Field name="email">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											autoComplete="email"
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="work@example.com"
											type="email"
										/>
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						</form.Field>
                         <form.Field name="password">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name} className="flex items-center justify-between">
                                            <span>Password</span>
                                            <Link className={buttonVariants({variant: 'link'})} to="/">Forgot your password?</Link>
                                        </FieldLabel>
										<Input
											aria-invalid={isInvalid}
											autoComplete="new-password"
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Shh..."
											type="password"
										/>
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						</form.Field>
                        <FieldGroup>
                        <form.Subscribe selector={state => state.isSubmitting}>
                            {s => <Button type="submit" className={'w-full'} disabled={s}>Log in</Button>}
                        </form.Subscribe>
                        <Button variant={'outline'} className={'w-full'}>Log in with Google</Button>
                        </FieldGroup>
                        <FieldDescription className="text-center">Don't have an account? <Link to="/signup" className='underline underline-offset-4'>Sign up</Link></FieldDescription>
                        </FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
