"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormInputs {
	Admin: string;
	password: string;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async ({ Admin, password }: LoginFormInputs) => {
		setLoading(true);
		setError(null);

		const username = Admin;

		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				router.push("/admin/dashboard");
			} else {
				const data = await res.json();
				setError(data.message || "Invalid credentials");
			}
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again.");
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			{error && <p className="text-red-600">{error}</p>}
			<div className="flex w-96 flex-col items-center justify-center rounded-2xl bg-stone-100 p-8 shadow-lg">
				<h1 className="mb-4 text-3xl font-bold text-gray-900">Login</h1>
				<form
					onSubmit={handleSubmit(handleLogin)}
					className="flex flex-col gap-4"
				>
					<div>
						<label htmlFor="Admin" className="font-medium text-gray-800">
							Admin
						</label>
						<input
							type="text"
							id="Admin"
							className="w-full rounded-md bg-stone-200 px-4 py-2 text-gray-800"
							{...register("Admin", { required: "Admin username is required" })}
						/>
						{errors.Admin && (
							<p className="mt-1 text-sm text-red-600">
								{errors.Admin.message}
							</p>
						)}
					</div>
					<div>
						<label htmlFor="password" className="font-medium text-gray-800">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="w-full rounded-md bg-stone-200 px-4 py-2 text-gray-800"
							{...register("password", { required: "Password is required" })}
							autoComplete="current-password"
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-200 ease-in-out hover:bg-secondary"
					>
						Login
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
