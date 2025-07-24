"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import adminLogin from "@/app/actions/adminLogin";
import PrimaryButton from "../../buttons/PrimaryButton";
import ArrowIcon from "../../svgs/ArrowIcon";

export default function Login() {
	const router = useRouter();
	const [loginState, submitAction, isPending] = useActionState(
		adminLogin,
		null,
	);
	const formAction = (formData: FormData) => {
		submitAction(formData);
	};

	useEffect(() => {
		if (loginState?.success) {
			router.refresh();
		}
	}, [loginState, router]);

	return (
		<section className="flex-grow flex items-center justify-center">
			<div className="container mx-auto px-4 py-16">
				<div className="max-w-md mx-auto">
					<header className="text-center mb-12">
						<h1 className="text-4xl font-bold font-display text-shady-character">
							Admin Login
						</h1>
						<p className="text-lg text-gray-600 italic mt-2 font-serif">
							Poem creation and comment moderation
						</p>
					</header>
					<div className="bg-white/50 p-8 rounded-lg shadow-sm border border-gray-200">
						<form action={formAction} className="space-y-6">
							<div>
								<label
									htmlFor="username"
									className="block text-lg font-medium text-shady-character font-serif"
								>
									Username
								</label>
								<input
									className="block w-full font-serif placeholder:text-shady-character/50 p-2 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve bg-white/50"
									id="username"
									name="username"
									placeholder="Your username"
									type="text"
									required
									autoComplete="on"
								/>
							</div>
							<div>
								<label
									className="block text-lg font-medium text-shady-character font-serif"
									htmlFor="password"
								>
									Password
								</label>
								<input
									autoComplete="current-password"
									className="block w-full font-serif placeholder:text-shady-character/50 p-2 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve bg-white/50"
									id="password"
									name="password"
									placeholder="Your username"
									required
									type="password"
								/>
							</div>
							<div>
								<PrimaryButton
									title={isPending ? "Logging in..." : "Login"}
									type="submit"
									className="w-full inline-flex justify-center items-center "
								/>
							</div>
							{!loginState?.success && (
								<p className="font-serif font-bold text-sm text-classy-mauve">
									Invalid username or password
								</p>
							)}
						</form>
					</div>
					<div className="mt-8 text-center font-serif text-sm text-shady-character hover:text-classy-mauve cursor-pointer transition-colors duration-200 ease-in-out">
						<Link
							href={"/"}
							replace
							className="flex items-center justify-center"
						>
							Go back to homepage
							<ArrowIcon className="size-3 ml-2" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
