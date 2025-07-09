export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bottom-0 flex flex-col items-center justify-center w-full p-4">
			<p className="text-center text-[12px] font-display text-classy-mauve mb-2">
				© Wendi Coles {currentYear}
			</p>
			<a
				href="https://peafield.dev"
				target="_blank"
				rel="noopener noreferrer"
				className="text-center text-[12px] font-display text-classy-mauve"
			>
				Made by Peafield
			</a>
		</footer>
	);
}
