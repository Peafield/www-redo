import PrimaryButton from "../buttons/PrimaryButton";

export default function Login() {
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
						<form className="space-y-6">
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
									title="Login"
									type="submit"
									className="w-full inline-flex justify-center items-center "
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
