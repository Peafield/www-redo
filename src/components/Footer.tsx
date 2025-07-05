import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bottom-0 flex-row items-center justify-center p-4">
			<Link href="/admin/dashboard">
				<p className="text-center font-playfair_display">© Wendi Coles 2024</p>
			</Link>
		</footer>
	);
};

export default Footer;
