import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Newsreader, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const playfair_display = Playfair_Display({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-playfair-display",
});

const newsreader = Newsreader({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-newsreader",
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
			className={`${playfair_display.variable} ${newsreader.variable} h-full scroll-smooth`}
		>
			<body className="min-h-screen flex flex-col mx-auto antialiased transition-colors duration-300 ease-in-out">
				<Navbar />
				<main className="flex-1 flex items-center justify-between mx-auto w-full p-8">
					{children}
				</main>
			</body>
			<GoogleAnalytics gaId="G-DR6G4WVQ0J" />
		</html>
	);
}
