import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const playfair_display = Playfair_Display({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-playfair-display",
});

const lato = Lato({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lato",
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://wendisworminghallwhimsies.uk"),
	title: {
		default: "Wendi's Worminghall Whimsies",
		template: "%s | Wendi's Worminghall Whimsies",
	},
	description: "Poems by Wendi Coles",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${playfair_display.variable} ${lato.variable} h-full scroll-smooth`}
		>
			<body className="min-h-screen mx-auto flex flex-col justify-between antialiased transition-colors duration-300 ease-in-out">
				<Navbar />
				<main className="flex-1 flex items-center justify-between mx-auto w-full p-8">
					{children}
				</main>
			</body>
			<GoogleAnalytics gaId="G-DR6G4WVQ0J" />
		</html>
	);
}
