import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Next.js Super Simple Starter",
	description: "Maintained by Peafield.dev",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
